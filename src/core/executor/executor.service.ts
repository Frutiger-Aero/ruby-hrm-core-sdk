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
  IExecutor,
  IExecutorId,
  IExecutorWithId,
  IGetExecutorResponse,
  ITimeRange,
  IWorkingDayInterval,
  WorkingDays,
} from '../interfaces';
import { NotFoundException } from '@qlean/nestjs-exceptions';
import { ERRORS } from '../../const';
import {
  WorkingDayIntervalModel,
  WorkingDayIntervalStore,
} from '../../infrastructure/working-day-interval';
import moment from 'moment';
import * as typeorm from 'typeorm';

@Injectable()
export class ExecutorService {
  protected readonly logger = new Logger(ExecutorService.name);
  protected readonly wdiRepo = typeorm
    .getManager()
    .getRepository(WorkingDayIntervalModel);

  constructor(
    private executorStore: ExecutorStore,
    private workingDayIntervalStore: WorkingDayIntervalStore,
  ) {}

  async createExecutor(
    element: IExecutor,
  ): Promise<IExecutorId> {
    const roundUpTimeRange = {
      start: moment(element.timeRange.start)
        .startOf('minutes')
        .toISOString(),
      end: moment(element.timeRange.end)
        .startOf('minutes')
        .toISOString(),
    };
    const {
      id,
      timeRange,
      workingDays,
    } = await this.executorStore.create({
      ...element,
      timeRange: roundUpTimeRange,
    });

    await this.planingWDI(id, timeRange, workingDays);

    return { id };
  }

  async getExecutor({
    id,
  }: IExecutorId): Promise<IGetExecutorResponse> {

  }

  async updateExecutor({
    id,
    ...newPersonData
  }: IExecutorWithId): Promise<IExecutorWithId> {

  }

  async disableExecutor({ id }: IExecutorId) {

  }

  async getHistoryProfile({ id }: IExecutorId) {

  }
}
