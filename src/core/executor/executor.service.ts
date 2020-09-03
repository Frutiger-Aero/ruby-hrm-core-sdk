import { Injectable } from '@nestjs/common';
import { Logger } from '@qlean/nestjs-logger';
import { ExecutorStore } from '../../infrastructure/executor';
import * as typeorm from 'typeorm';
import {
  ICreateExecutorRequest,
  IDisableExecutorRequest,
  IGetExecutorResponse,
  IGetHistoryProfileRequest,
  IGetHistoryProfileResponse,
  ISpecialization,
  IUpdateExecutorRequest,
  Status,
} from '../interfaces';
import { NotFoundException } from '@qlean/nestjs-exceptions';
import { ERRORS } from '../../const';
import { SpecializationModel } from '../../infrastructure/specialization/specialization.model';

type PreparedExecutor = Omit<IUpdateExecutorRequest, 'specialization'>;

@Injectable()
export class ExecutorService {
  protected readonly logger = new Logger(ExecutorService.name);
  protected readonly specializationRepo = typeorm
    .getManager()
    .getRepository(SpecializationModel);

  constructor(private executorStore: ExecutorStore) {}

  async createExecutor({
    executor,
    ssoId,
  }: {
    executor: ICreateExecutorRequest;
    ssoId: string;
  }): Promise<string> {
    const { id } = await this.executorStore.create({
      ...executor,
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

    if (executor.specialization && executor.specialization.length) {
      executor.specialization.map(spec => spec.name);
    }

    return executor;
  }

  async updateExecutor({
    id,
    ...newExecutorData
  }: IUpdateExecutorRequest): Promise<{}> {
    const model = await this.executorStore.findById(id);
    if (!model) {
      throw new NotFoundException(ERRORS.EXECUTOR_NOT_FOUND);
    }

    let { specialization, ...others } = newExecutorData;

    const preparedData: PreparedExecutor & {
      specialization?: SpecializationModel[];
    } = { ...others };

    if (specialization && specialization.length) {
      specialization = await this.specializationRepo
        .createQueryBuilder()
        .select('name')
        .where('name IN (:...names)', { names: specialization })
        .execute();

      if (specialization.length)
        preparedData.specialization = specialization.map(
          spec => new SpecializationModel({ name: spec }),
        );
    }

    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', newExecutorData);

    // TODO: history update model

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
    id,
  }: IGetHistoryProfileRequest): Promise<IGetHistoryProfileResponse> {
    return null;
  }
}
