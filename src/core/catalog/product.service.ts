import { ok } from 'assert';
import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';
import { InvalidArgumentException, NotFoundException } from '@qlean/nestjs-exceptions';
import { IFindAndTotalResponse, IFindPaginateCriteria, TModelID } from '@qlean/nestjs-typeorm-persistence-search';
import { ProductStore } from '../../infrastructure';
import { IProduct } from '../../domain';

@Injectable()
export class ProductService {
  constructor(
    private readonly store: ProductStore,
  ) {}

  private relations: string[] = [];

  /**
   * Создает запись о новом продукте
   */
  async create(args: Partial<IProduct>): Promise<IProduct> {
    return from(this.store.create(args))
      .pipe(mergeMap(({ id }) => this.findById(id)))
      .toPromise();
  }

  /**
   * Обновляет запись о существующем продукте
   */
  async update(args: Partial<IProduct>): Promise<IProduct> {

    return from(this.store.update({ id: args.id }, args))
      .pipe(mergeMap(() => this.findById(args.id)))
      .toPromise();
  }

  /**
   * Удаляет запись о существующем продукте
   */
  async remove(args: Partial<IProduct>): Promise<IProduct> {
    return from(this.store.logicRemove(args.id))
      .pipe(mergeMap(() => this.findById(args.id)))
      .toPromise();
  }

  /**
   * Восстанавливает запись о пользователе
   */
  async restore(args: Partial<IProduct>): Promise<IProduct> {
    return from(this.store.logicRestore(args.id))
      .pipe(mergeMap(() => this.findById(args.id)))
      .toPromise();
  }

  /**
   * Находит запись о продукте по ID
   */
  async findById(id: TModelID): Promise<IProduct> {
    return this.store.findById(id, {
      relations: this.relations,
    });
  }

  /**
   * Возвращает все продукты в виде пагинативного списка
   */
  async findPaginate(args: IFindPaginateCriteria<IProduct>): Promise<IFindAndTotalResponse<IProduct>> {
    return this.store.findAndTotalByCriteria({
      ...args,
      relations: this.relations,
    });
  }
}
