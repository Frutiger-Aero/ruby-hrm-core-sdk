import { ok } from 'assert';
import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';
import { IFindAndTotalResponse, IFindPaginateCriteria, TDeepPartial, TModelID } from '@qlean/nestjs-typeorm-persistence-search';
import { ContractStore, WageStore } from '../../infrastructure';
import { IContract } from '../../domain';
import { InvalidArgumentException } from '@qlean/nestjs-exceptions';

@Injectable()
export class ContractService {
  constructor(
    private readonly store: ContractStore,
    private readonly wageStore: WageStore
  ) {}

  private relations: string[] = ['product', 'specialization', 'grade', 'wage', 'contractor', 'skills'];

  /**
   * Создает запись о новом контракте исполнителя
   */
  async create(args: Partial<IContract>): Promise<IContract> {
    const wage = await this.wageStore.findById(args.wage.id);
    if (!wage) {
      throw new InvalidArgumentException(`wage id=${args.wage.id} doesn't exist`);
    }
    const model: TDeepPartial<IContract> = {
      ...args,
      specialization: {
        id: wage.specialization.id
      },
      product: {
        id: wage.product.id
      }
    }
    return from(this.store.create(model))
      .pipe(mergeMap(({ id }) => this.findById(id)))
      .toPromise();
  }

  /**
   * Обновляет запись о существующем контракте исполнителя
   */
  async update(args: Partial<IContract>): Promise<IContract> {
    const model: TDeepPartial<IContract> = {
      ...args
    }
    if (args.wage) {
      const wage = await this.wageStore.findById(args.wage.id);
      if (!wage) {
        throw new InvalidArgumentException(`wage id=${args.wage.id} doesn't exist`);
      }
      model.specialization = {
        id: wage.specialization.id
      };
      model.product = {
        id: wage.product.id
      }
    }
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
