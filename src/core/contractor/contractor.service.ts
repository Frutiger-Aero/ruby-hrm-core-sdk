import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';
import { AlreadyExistsException, NotFoundException } from '@qlean/nestjs-exceptions';
import { IFindAndTotalResponse, IFindPaginateCriteria, TModelID } from '@qlean/nestjs-typeorm-persistence-search';
import { Logger } from '@qlean/nestjs-logger';

import { ContractorStore, BlockingReasonStore } from '../../infrastructure';
import { BlockContractorService } from './block-contractor.service';
import { FreezeContractorService } from './freeze-contractor.service';
import { ActivateContractorService } from './activate-contractor.service';

import { BLOCKING_TYPE, IContractor } from '../../domain';
import { IActivateContractor, IBlockContractor } from '../interfaces';


@Injectable()
export class ContractorService {
  private readonly logger = new Logger(ContractorService.name);
  constructor(
    private readonly store: ContractorStore,
    private readonly reasonStore: BlockingReasonStore,
    private readonly blockService: BlockContractorService,
    private readonly freezeService: FreezeContractorService,
    private readonly activateService: ActivateContractorService
  ) {}

  private relations: string[] = [];

  /**
   * Создает запись о новом исполнителе
   */
  async create(args: Partial<IContractor>): Promise<IContractor> {
    try {
      const { id } = await this.store.create(args);
      return this.findById(id);
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
    const { reason: { id: reasonId } } = args;

    const reason = await this.reasonStore.findById(reasonId);
    if (!reason) {
      throw new NotFoundException(`Reason id=${reasonId} doesn't exist`);
    }
  
    if (reason.type === BLOCKING_TYPE.BLOCK) {
      return this.blockService.execute(args, reason);
    }
    if (reason.type === BLOCKING_TYPE.FREEZE) {
      return this.freezeService.execute(args, reason);
    }
  }

  async activate(args: IActivateContractor): Promise<IContractor> {
    try {
      return this.activateService.execute(args, args.userId);
    } catch (err) {
      this.logger
      throw err;
    }
  }
}
