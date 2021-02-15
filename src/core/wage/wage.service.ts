import { ok } from 'assert';
import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';
import { InvalidArgumentException, NotFoundException } from '@qlean/nestjs-exceptions';
import { IFindAndTotalResponse, IFindPaginateCriteria, TModelID } from '@qlean/nestjs-typeorm-persistence-search';
import { ProductStore, WageStore } from '../../infrastructure';
import { IWage, IWageResponse } from '../../domain';

@Injectable()
export class WageService {
  constructor(
    private readonly store: WageStore,
    private readonly productStore: ProductStore
  ) {}

  private relations: string[] = ['grades'];

  /**
   * Создает запись о новой должностной позиции
   */
  async create(args: Partial<IWage>): Promise<IWageResponse> {
    const product =  await this.productStore.findBySlug(args.productSlug);
    if (!product) {
      throw new InvalidArgumentException(`Product ${args.productSlug} doesn't exist`);
    }
    const { id } = await this.store.create(args);
    const wage = await this.findById(id);
    return {
      ...wage,
      product
    }
  }

  /**
   * Обновляет запись о существующей должностной позиции
   */
  async update(args: Partial<IWage>): Promise<IWageResponse> {
    let product;
    if (args.productSlug) {
      product = await this.productStore.findBySlug(args.productSlug);
      if (!product) {
        throw new InvalidArgumentException(`Product ${args.productSlug} doesn't exist`);
      }
    }
    await this.store.update({ id: args.id }, args);
    const wage = await this.findById(args.id);
    return {
      ...wage,
      product: product ? product : await this.productStore.findBySlug(args.productSlug)
    }
  }

  /**
   * Удаляет запись о существующей должностной позиции
   */
  async remove(args: Partial<IWage>): Promise<IWage> {
    return from(this.store.logicRemove(args.id))
      .pipe(mergeMap(() => this.findById(args.id)))
      .toPromise();
  }

  /**
   * Восстанавливает запись о должностной позиции
   */
  async restore(args: Partial<IWage>): Promise<IWage> {
    return from(this.store.logicRestore(args.id))
      .pipe(mergeMap(() => this.findById(args.id)))
      .toPromise();
  }

  /**
   * Находит запись о должностной позиции по ID
   */
  async findById(id: TModelID): Promise<IWage> {
    return this.store.findById(id, {
      relations: this.relations,
    });
  }

  /**
   * Возвращает все должностные позиции в виде пагинативного списка
   */
  async findPaginate(args: IFindPaginateCriteria<IWage>): Promise<IFindAndTotalResponse<IWage>> {
    return this.store.findAndTotalByCriteria({
      ...args,
      relations: this.relations,
    });
  }
}
