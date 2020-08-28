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
  IBookablePerson,
  IBookablePersonId,
  IBookablePersonWithId,
  IGetBookablePersonResponse,
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
    private bookablePersonStore: ExecutorStore,
    private workingDayIntervalStore: WorkingDayIntervalStore,
  ) {}

  private async planingWDI(
    id: string,
    timeRange: ITimeRange,
    workingDays: WorkingDays,
  ): Promise<null> {
    const availableFutureWorkDays: IWorkingDayInterval[] = this.workingDayIntervalStore.planingWDI(
      id,
      timeRange,
      workingDays,
    );

    const WDIRepo = getRepository(WorkingDayIntervalModel);

    await WDIRepo.createQueryBuilder()
      .insert()
      .into(WorkingDayIntervalModel)
      .values(availableFutureWorkDays)
      .execute();

    return;
  }

  async createBookablePerson(
    element: IBookablePerson,
  ): Promise<IBookablePersonId> {
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
    } = await this.bookablePersonStore.create({
      ...element,
      timeRange: roundUpTimeRange,
    });

    await this.planingWDI(id, timeRange, workingDays);

    return { id };
  }

  async getBookablePerson({
    id,
  }: IBookablePersonId): Promise<IGetBookablePersonResponse> {
    const [model] = await this.bookablePersonStore.findByCriteria({
      where: [
        {
          isDeleted: false,
          id,
        },
      ],
    });

    if (!model) {
      throw new NotFoundException(ERRORS.BOOKABLE_PERSON_NOT_FOUND);
    }

    return model;
  }

  async updateBookablePerson({
    id,
    ...newPersonData
  }: IBookablePersonWithId): Promise<IBookablePersonWithId> {
    const model = await this.bookablePersonStore.findById(id);
    const mergedData = { ...model, ...newPersonData };
    await this.bookablePersonStore.update({ id }, mergedData);

    if (newPersonData.workingDays || newPersonData.timeRange) {
      await this.rePlaningWDI(
        id,
        mergedData.timeRange,
        mergedData.workingDays,
        this.wdiRepo,
      );
    }

    return { id, ...mergedData };
  }

  async removeBookablePerson({ id }: IBookablePersonId) {
    await this.bookablePersonStore.logicRemove(id);
    const relatedWdi = await this.workingDayIntervalStore.findByCriteria({
      where: [{ bookablePersonId: id }],
    });
    const wdiIds = relatedWdi.map(wdi => wdi.id);
    await Promise.all(
      wdiIds.map(async id => this.workingDayIntervalStore.remove(id)),
    );
  }

  @Transaction({ isolation: 'SERIALIZABLE' })
  private async rePlaningWDI(
    id: string,
    timeRange: ITimeRange,
    workingDays: WorkingDays,
    @TransactionRepository(WorkingDayIntervalModel)
    WDIRepo: Repository<WorkingDayIntervalModel>,
  ): Promise<null> {
    await WDIRepo.createQueryBuilder()
      .delete()
      .where('bookable_person_id = :id', { id })
      .execute();

    const availableFutureWorkDays: IWorkingDayInterval[] = this.workingDayIntervalStore.planingWDI(
      id,
      timeRange,
      workingDays,
    );

    await WDIRepo.createQueryBuilder()
      .insert()
      .into(WorkingDayIntervalModel)
      .values(availableFutureWorkDays)
      .execute();

    return;
  }
}
