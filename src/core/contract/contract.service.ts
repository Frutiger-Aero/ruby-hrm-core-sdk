import { ok } from 'assert';
import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';
import { InvalidArgumentException, NotFoundException } from '@qlean/nestjs-exceptions';
import { IFindAndTotalResponse, IFindPaginateCriteria, TModelID } from '@qlean/nestjs-typeorm-persistence-search';
import { ContractStore } from '../../infrastructure';
import { IContract } from '../../domain';

@Injectable()
export class ContractService {
  constructor(
    private readonly store: ContractStore,
  ) {}

  private relations: string[] = [];

  /**
   * Создает запись о новом контракте исполнителя
   */
  async create(args: Partial<IContract>): Promise<IContract> {
    return from(this.store.create(args))
      .pipe(mergeMap(({ id }) => this.findById(id)))
      .toPromise();
  }

  /**
   * Обновляет запись о существующем контракте исполнителя
   */
  async update(args: Partial<IContract>): Promise<IContract> {

    return from(this.store.update({ id: args.id }, args))
      .pipe(mergeMap(() => this.findById(args.id)))
      .toPromise();
  }

  /**
   * Удаляет запись о существующем контракте исполнителя
   */
  async remove(args: Partial<IContract>): Promise<IContract> {
    return from(this.store.logicRemove(args.id))
      .pipe(mergeMap(() => this.findById(args.id)))
      .toPromise();
  }

  /**
   * Восстанавливает запись о контракте исполнителя
   */
  async restore(args: Partial<IContract>): Promise<IContract> {
    return from(this.store.logicRestore(args.id))
      .pipe(mergeMap(() => this.findById(args.id)))
      .toPromise();
  }

  /**
   * Находит запись о контракте исполнителя по ID
   */
  async findById(id: TModelID): Promise<IContract> {
    return this.store.findById(id, {
      relations: this.relations,
    });
  }

  /**
   * Возвращает все контракты исполнителей в виде пагинативного списка
   */
  async findPaginate(args: IFindPaginateCriteria<IContract>): Promise<IFindAndTotalResponse<IContract>> {
    return this.store.findAndTotalByCriteria({
      ...args,
      relations: this.relations,
    });
  }
}
