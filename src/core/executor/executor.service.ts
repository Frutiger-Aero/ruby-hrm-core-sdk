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
  ICreateExecutorRequest, IDisableExecutorRequest,
  IGetExecutorRequest,
  IGetExecutorResponse, IGetHistoryProfileRequest, IGetHistoryProfileResponse, IUpdateExecutorRequest,
} from '../interfaces';
import { NotFoundException } from '@qlean/nestjs-exceptions';
import { ERRORS } from '../../const';
import moment from 'moment';
import * as typeorm from 'typeorm';

@Injectable()
export class ExecutorService {
  protected readonly logger = new Logger(ExecutorService.name);

  constructor(
    private executorStore: ExecutorStore,
  ) {}

  async createExecutor(
    element: ICreateExecutorRequest,
  ): Promise<string> {


    return null;
  }

  async getExecutor({
    id,
  }: IGetExecutorRequest): Promise<IGetExecutorResponse> {
    return null;
  }

  async updateExecutor({
    id,
    ...newPersonData
  }: IUpdateExecutorRequest): Promise<{}> {
    return null;
  }

  async disableExecutor({ id, statusReason }: IDisableExecutorRequest) {
    return null;
  }

  async getHistoryProfile({ id }: IGetHistoryProfileRequest): Promise<IGetHistoryProfileResponse> {
    return null;
  }
}
