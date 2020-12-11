import { ok } from 'assert';
import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';
import { InvalidArgumentException, NotFoundException } from '@qlean/nestjs-exceptions';
import { IFindAndTotalResponse, IFindPaginateCriteria, TModelID } from '@qlean/nestjs-typeorm-persistence-search';
import { ContractorStore } from '../../infrastructure';
import { IContractor } from '../../domain';

@Injectable()
export class ContractorService {
  constructor(
    private readonly store: ContractorStore,
  ) {}

  private relations: string[] = [];

  /**
   * Создает запись о новом исполнителе
   */
  async create(args: Partial<IContractor>): Promise<IContractor> {
    console.log(JSON.stringify(args, null, 4));
    return from(this.store.create(args))
      .pipe(mergeMap(({ id }) => this.findById(id)))
      .toPromise();
  }

  /**
   * Обновляет запись о существующем исполнителе
   */
  async update(args: Partial<IContractor>): Promise<IContractor> {

    return from(this.store.update({ id: args.id }, args))
      .pipe(mergeMap(() => this.findById(args.id)))
      .toPromise();
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
}
