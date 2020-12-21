import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';
import { AlreadyExistsException, FailedPreconditionException, InvalidArgumentException, NotFoundException } from '@qlean/nestjs-exceptions';
import { IFindAndTotalResponse, IFindPaginateCriteria, TModelID } from '@qlean/nestjs-typeorm-persistence-search';
import { ContractorStore, ReasonStore } from '../../infrastructure';
import { IContractor, WORK_STATUS } from '../../domain';
import { IActivateContractor, IBlockContractor, IFreezeContractor } from '../interfaces';
import { RevisionHistoryStore } from '../../infrastructure/persistence/revision-history';

@Injectable()
export class ContractorService {
  constructor(
    private readonly store: ContractorStore,
    private readonly reasonStore: ReasonStore,
    private readonly revisionHistoryStore: RevisionHistoryStore
  ) {}

  private relations: string[] = [];

  /**
   * Создает запись о новом исполнителе
   */
  async create(args: Partial<IContractor>): Promise<IContractor> {
    try {
      await this.store.create(args);
      return this.findById(args.id);
    } catch (error) {
      this.catchError(error, args);
    }
  }

  /**
   * Обновляет запись о существующем исполнителе
   */
  async update(args: Partial<IContractor>): Promise<IContractor> {
    try {
      await this.store.update({ id: args.id }, args);
      return this.findById(args.id);
    } catch (error) {
      this.catchError(error, args);
    }
  }

  catchError(error, args) {
    if (error.message.includes('duplicate key value')) {
      throw new AlreadyExistsException(`Contractor with userId ${args.userId} already exists`);
    }
    throw error;
  }

  /**
   * Удаляет запись о существующем исполнителе
   */
  async remove(args: Partial<IContractor>): Promise<IContractor> {
    return from(this.store.logicRemove(args.id))
      .pipe(mergeMap(() => this.findById(args.id)))
      .toPromise();
  }

  /**
   * Восстанавливает запись о исполнителе
   */
  async restore(args: Partial<IContractor>): Promise<IContractor> {
    return from(this.store.logicRestore(args.id))
      .pipe(mergeMap(() => this.findById(args.id)))
      .toPromise();
  }

  /**
   * Находит запись о исполнителе по ID
   */
  async findById(id: TModelID): Promise<IContractor> {
    return this.store.findById(id, {
      relations: this.relations,
    });
  }

  /**
   * Возвращает всех исполнителей в виде пагинативного списка
   */
  async findPaginate(args: IFindPaginateCriteria<IContractor>): Promise<IFindAndTotalResponse<IContractor>> {
    return this.store.findAndTotalByCriteria({
      ...args,
      relations: this.relations,
    });
  }

  async block(args: IBlockContractor): Promise<IContractor> {
    const {userId, reason: {id: reasonId}, id: contractorId } = args;
    const reason = await this.reasonStore.getBlockingReasonById(reasonId);
    if (!reason) {
      throw new NotFoundException(`Reason id=${reasonId} doesn't exist`);
    }
    const contractor = await this.store.findById(contractorId);
    if (!contractor) {
      throw new NotFoundException(`Contractor id=${contractorId} doesn\'t exist`);
    }
    if (contractor.workStatus === WORK_STATUS.BLOCKED) {
      return contractor;
    }
    await this.store.update({ id: contractorId }, { workStatus: WORK_STATUS.BLOCKED, id: contractorId, changedStatusReasonId: reasonId });
    await this.revisionHistoryStore.create({
      entityId: contractorId,
      reasonId,
      userId,
      change: WORK_STATUS.BLOCKED
    })
    return this.store.findById(contractorId);
  }

  async activate(args: IActivateContractor): Promise<IContractor> {
    const {userId, id: contractorId } = args;
    const contractor = await this.store.findById(contractorId);
    if (!contractor) {
      throw new NotFoundException(`Contractor id=${contractorId} doesn't exist`);
    }
    if (contractor.workStatus === WORK_STATUS.ACTIVE) {
      return contractor;
    }
    if (contractor.workStatus === WORK_STATUS.BLOCKED && contractor.changedStatusReasonId) {
      const reason = await this.reasonStore.getBlockingReasonById(contractor.changedStatusReasonId);
      if (!reason.isRecoverable) {
        throw new FailedPreconditionException('Can\'t activate contractor because of blocking reason');
      }
    }
    await this.store.update({ id: contractorId }, { workStatus: WORK_STATUS.ACTIVE, id: contractorId });
    await this.revisionHistoryStore.create({
      entityId: contractorId,
      userId,
      change: WORK_STATUS.ACTIVE
    });
    return this.store.findById(contractorId);
  }


  async freeze(args: IFreezeContractor): Promise<IContractor> {
    const {userId, reason: {id: reasonId}, id: contractorId } = args;
    const reason = await this.reasonStore.getFreezingReasonById(reasonId);
    if (!reason) {
      throw new NotFoundException(`Reason id=${reasonId} doesn't exist`);
    }
    const contractor = await this.store.findById(contractorId);
    if (!contractor) {
      throw new NotFoundException(`Contractor id=${contractorId} doesn't exist`);
    }
    if (contractor.workStatus === WORK_STATUS.FROZEN) {
      return contractor;
    }
    if (contractor.workStatus === WORK_STATUS.BLOCKED) {
      throw new InvalidArgumentException('Contractor is blocked');
    } 
    await this.store.update({ id: contractorId }, { workStatus: WORK_STATUS.FROZEN, id: contractorId, changedStatusReasonId: reasonId });
    await this.revisionHistoryStore.create({
      entityId: contractorId,
      reasonId,
      userId,
      change: WORK_STATUS.FROZEN
    });
    return this.store.findById(contractorId);
  }
}
