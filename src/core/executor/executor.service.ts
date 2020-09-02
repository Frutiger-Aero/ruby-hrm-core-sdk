import { Injectable } from '@nestjs/common';
import { Logger } from '@qlean/nestjs-logger';
import { ExecutorStore } from '../../infrastructure/executor';
import {
  getRepository,
  Repository,
  Transaction,
  TransactionRepository,
} from 'typeorm';
import {
  ICreateExecutorRequest,
  IDisableExecutorRequest,
  IGetExecutorRequest,
  IGetExecutorResponse,
  IGetHistoryProfileRequest,
  IGetHistoryProfileResponse,
  IUpdateExecutorRequest,
  Status,
} from '../interfaces';
import { NotFoundException } from '@qlean/nestjs-exceptions';
import { ERRORS } from '../../const';
import moment from 'moment';
import * as typeorm from 'typeorm';

@Injectable()
export class ExecutorService {
  protected readonly logger = new Logger(ExecutorService.name);

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

    // TODO: history update model

    await this.executorStore.update({ id }, { ...model, ...newExecutorData });
    return null;
  }

  async disableExecutor({ id, statusReason }: IDisableExecutorRequest) {
    const model = await this.executorStore.findById(id);
    if (!model) {
      throw new NotFoundException(ERRORS.EXECUTOR_NOT_FOUND);
    }

    // TODO: history update model

    await this.executorStore.update({ id }, { ...model, statusReason, status: Status.DISABLED });
    await this.executorStore.logicRemove(id);
    return null;
  }

  async getHistoryProfile({
    id,
  }: IGetHistoryProfileRequest): Promise<IGetHistoryProfileResponse> {

    return null;
  }
}
