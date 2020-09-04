import { Injectable } from '@nestjs/common';
import { Logger } from '@qlean/nestjs-logger';
import { ExecutorModel, ExecutorStore } from '../../infrastructure/executor';
import * as typeorm from 'typeorm';
import _ from 'lodash';
import {
  ICreateExecutorRequest,
  IDisableExecutorRequest,
  IGetExecutorResponse,
  IGetHistoryProfileRequest,
  IGetHistoryProfileResponse,
  ILog,
  ISpecialization,
  IUpdateExecutorRequest,
  LogEntity,
  Status,
} from '../interfaces';
import { NotFoundException } from '@qlean/nestjs-exceptions';
import { ERRORS } from '../../const';
import { SpecializationModel } from '../../infrastructure/specialization/specialization.model';
import { TariffModel } from '../../infrastructure/tariff/tariff.model';
import { CitizenshipModel } from '../../infrastructure/citizenship/citizenship.model';
import { TariffStore } from '../../infrastructure/tariff/tariff.store';
import { SpecializationStore } from '../../infrastructure/specialization/specialization.store';
import { CitizenshipStore } from '../../infrastructure/citizenship/citizenship.store';
import { LogStore } from '../../infrastructure/log/log.store';
import { LogFieldsPickerUtil } from '../../lib/log-fields-picker.util';
import { LogModule } from '../../infrastructure/log/log.module';
import { LogModel } from '../../infrastructure/log/log.model';
import {Between, FindOperator, LessThanOrEqual, MoreThanOrEqual} from "typeorm";

type PreparedExecutor = Omit<
  IUpdateExecutorRequest,
  'specialization' | 'tariff' | 'citizenship'
>;

@Injectable()
export class ExecutorService {
  protected readonly logger = new Logger(ExecutorService.name);
  protected readonly logRepo = typeorm.getManager().getRepository(LogModel);

  constructor(
    private executorStore: ExecutorStore,
    private tariffStore: TariffStore,
    private specializationStore: SpecializationStore,
    private citizenshipStore: CitizenshipStore,
    private logStore: LogStore,
    private logFieldsPickerUtil: LogFieldsPickerUtil,
  ) {}

  async createExecutor({
    executor,
    ssoId,
  }: {
    executor: ICreateExecutorRequest;
    ssoId: string;
  }): Promise<string> {
    // TODO: вынести эту сборку в отдельный приват метод
    let { citizenship, ...others } = executor;

    const preparedData: PreparedExecutor & {
      specialization?: SpecializationModel[];
      tariff?: TariffModel;
      citizenship?: CitizenshipModel;
    } = { ...others };

    if (citizenship) {
      const citizenshipInDb = await this.citizenshipStore.findOneByCriteria({
        where: [{ name: citizenship }],
      });

      if (citizenshipInDb) {
        preparedData.citizenship = citizenshipInDb;
      }
    }

    const { id } = await this.executorStore.create({
      ...preparedData,
      ssoId,
      status: Status.CREATED,
    });

    return id;
  }

  async getExecutor({ ssoId }): Promise<IGetExecutorResponse> {
    const executor = await this.executorStore.findOneByCriteria({
      where: [{ ssoId, isDeleted: false }],
    });

    if (!executor) {
      throw new NotFoundException(ERRORS.EXECUTOR_NOT_FOUND);
    }

    const { specialization, citizenship, ...others } = executor;

    const preparedResponse: IGetExecutorResponse = { ...others };

    if (specialization && specialization.length) {
      preparedResponse.specialization = specialization.map(spec => spec.name);
    }

    if (citizenship) {
      preparedResponse.citizenship = executor.citizenship.name;
    }

    return preparedResponse;
  }

  async updateExecutor({
    id,
    ...newExecutorData
  }: IUpdateExecutorRequest): Promise<{}> {
    const model = await this.executorStore.findOneByCriteria({
      relations: ['specialization', 'citizenship', 'tariff'],
      where: [{ id }],
    });
    if (!model) {
      throw new NotFoundException(ERRORS.EXECUTOR_NOT_FOUND);
    }

    let { specialization, tariff, citizenship, ...others } = newExecutorData;

    const preparedData: PreparedExecutor & {
      specialization?: SpecializationModel[];
      tariff?: TariffModel;
      citizenship?: CitizenshipModel;
    } = { ...others };

    // TODO: запихнуть всё это в параллель
    // TODO: проверка в dto о пустых специализациях
    const oldSpecNames = model.specialization.map(spec => spec.name);

    if (specialization && _.difference(specialization, oldSpecNames).length) {
      const specWhere: ISpecialization[] = specialization.map(
        name => <ISpecialization>{ name },
      );
      const specializationInDb = await this.specializationStore.findByCriteria({
        where: specWhere,
      });

      if (specializationInDb.length)
        preparedData.specialization = [...specializationInDb];

      // TODO: валидация на не существующие специализации
    }
    if (tariff && tariff !== _.get(model, 'tariff.name', '')) {
      // TODO: depend injections
      const tariffInDb = await this.tariffStore.findOneByCriteria({
        where: [{ name: tariff }],
      });

      // TODO: validation if tariff does not exists
      if (tariffInDb) {
        preparedData.tariff = tariffInDb;
      }
    }

    if (citizenship && citizenship !== _.get(model, 'citizenship.name', '')) {
      const citizenshipInDb = await this.citizenshipStore.findOneByCriteria({
        where: [{ name: citizenship }],
      });

      if (citizenshipInDb) {
        preparedData.citizenship = citizenshipInDb;
      }
    }

    // TODO: history update model

    const preparedLogs = this.logFieldsPickerUtil.prepareLogCollection(
      ExecutorModel.name,
      id,
      LogEntity.EXECUTOR,
      model,
      preparedData,
    );

    await Promise.all(preparedLogs.map(log => this.logStore.create(log)));

    await this.executorStore.update({ id }, { ...model, ...preparedData });
    return null;
  }

  async disableExecutor({ id, statusReason }: IDisableExecutorRequest) {
    const model = await this.executorStore.findById(id);
    if (!model) {
      throw new NotFoundException(ERRORS.EXECUTOR_NOT_FOUND);
    }

    // TODO: history update model

    await this.executorStore.update(
      { id },
      { ...model, statusReason, status: Status.DISABLED },
    );
    await this.executorStore.logicRemove(id);
    return null;
  }

  async getHistoryProfile({
    id: entityId,
    name,
    oldValue,
    newValue,
    dateFrom,
    dateTo,
    limit,
  }: IGetHistoryProfileRequest): Promise<{history: LogModel[]}> {
    const query: {
      where: Partial<ILog> & {
        createdAt?: FindOperator<string>;
      },
      take?: number,
    } = {
      where: {},
    }

    const logModelFields = { entityId, name, oldValue, newValue };

    for (const key in logModelFields) {
      if (logModelFields[key]) {
        query.where[key] = logModelFields[key]
      }
    }

    if (dateFrom && dateTo) {
      query.where.createdAt = Between(dateFrom, dateTo);
    } else if (dateFrom) {
      query.where.createdAt = MoreThanOrEqual(dateFrom);
    } else if (dateTo) {
      query.where.createdAt = LessThanOrEqual(dateTo);
    }

    if (limit) {
      query.take = limit;
    }

    const history = await this.logRepo.find(query);
    return {history};
  }
}
