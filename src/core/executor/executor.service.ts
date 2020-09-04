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
import {
  InvalidArgumentException,
  NotFoundException,
} from '@qlean/nestjs-exceptions';
import { ERRORS } from '../../const';
import { SpecializationModel } from '../../infrastructure/specialization/specialization.model';
import { TariffModel } from '../../infrastructure/tariff/tariff.model';
import { CitizenshipModel } from '../../infrastructure/citizenship/citizenship.model';
import { TariffStore } from '../../infrastructure/tariff/tariff.store';
import { SpecializationStore } from '../../infrastructure/specialization/specialization.store';
import { CitizenshipStore } from '../../infrastructure/citizenship/citizenship.store';
import { LogStore } from '../../infrastructure/log/log.store';
import { LogFieldsPickerUtil } from '../../lib/log-fields-picker.util';
import { LogModel } from '../../infrastructure/log/log.model';
import {
  Between,
  FindOperator,
  LessThanOrEqual,
  MoreThanOrEqual,
} from 'typeorm';

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

    preparedData.citizenship = await this.getCitizenship(citizenship, '');

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

    preparedData.specialization = await this.getSpecialization(
      specialization,
      model.specialization.map(spec => spec.name),
    );
    preparedData.tariff = await this.getTariff(
      tariff,
      _.get(model, 'tariff.name', ''),
    );
    preparedData.citizenship = await this.getCitizenship(
      citizenship,
      _.get(model, 'citizenship.name', null),
    );

    await this.executorStore.update({ id }, { ...model, ...preparedData });
    await this.logUpdates(id, model, preparedData);
    return null;
  }

  async disableExecutor({ id, statusReason }: IDisableExecutorRequest) {
    const model = await this.executorStore.findById(id);
    if (!model) {
      throw new NotFoundException(ERRORS.EXECUTOR_NOT_FOUND);
    }

    const preparedData = { statusReason, status: Status.DISABLED };

    await this.executorStore.update({ id }, { ...model, ...preparedData });
    await this.logUpdates(id, model, preparedData);
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
  }: IGetHistoryProfileRequest): Promise<{ history: LogModel[] }> {
    const query: {
      where: Partial<ILog> & {
        createdAt?: FindOperator<string>;
      };
      take?: number;
    } = {
      where: {},
    };

    const logModelFields = { entityId, name, oldValue, newValue };

    for (const key in logModelFields) {
      if (logModelFields[key]) {
        query.where[key] = logModelFields[key];
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
    return { history };
  }

  private async getCitizenship(
    citizenship: string,
    oldVal: string,
  ): Promise<CitizenshipModel> {
    if (citizenship && citizenship !== oldVal) {
      const citizenshipInDb = await this.citizenshipStore.findOneByCriteria({
        where: [{ name: citizenship }],
      });

      if (citizenshipInDb) {
        return citizenshipInDb;
      } else {
        throw new InvalidArgumentException(ERRORS.CITIZENSHIP_NOT_FOUND);
      }
    }
    return null;
  }

  private async getTariff(
    tariff: string,
    oldVal: string,
  ): Promise<TariffModel> {
    if (tariff && tariff !== oldVal) {
      const tariffInDb = await this.tariffStore.findOneByCriteria({
        where: [{ name: tariff }],
      });

      if (tariffInDb) {
        return tariffInDb;
      } else {
        throw new InvalidArgumentException(ERRORS.TARIFF_NOT_FOUND);
      }
    }
    return null;
  }

  private async getSpecialization(
    specialization: string[],
    oldVal: string[],
  ): Promise<SpecializationModel[]> {
    if (specialization && _.difference(specialization, oldVal).length) {
      const specWhere: ISpecialization[] = specialization.map(
        name => <ISpecialization>{ name },
      );
      const specializationInDb = await this.specializationStore.findByCriteria({
        where: specWhere,
      });

      if (specializationInDb.length !== specialization.length) {
        throw new InvalidArgumentException(ERRORS.SPECIALIZATION_NOT_FOUND);
      }

      if (specializationInDb.length) return specializationInDb;
    }
    return null;
  }

  private async logUpdates(entityId: string, oldData: {}, newData: {}) {
    const preparedLogs = this.logFieldsPickerUtil.prepareLogCollection(
      ExecutorModel.name,
      entityId,
      LogEntity.EXECUTOR,
      oldData,
      newData,
    );

    await Promise.all(preparedLogs.map(log => this.logStore.create(log)));
  }
}
