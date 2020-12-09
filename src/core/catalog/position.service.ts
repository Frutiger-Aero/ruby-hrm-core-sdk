import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';
import { AlreadyExistsException } from '@qlean/nestjs-exceptions';
import { IFindAndTotalResponse, IFindPaginateCriteria, TModelID } from '@qlean/nestjs-typeorm-persistence-search';
import { PositionStore } from '../../infrastructure';
import { IPosition } from '../../domain';

@Injectable()
export class PositionService {
  constructor(
    private readonly store: PositionStore,
  ) {}

  private relations: string[] = [];

  /**
   * Создает запись о новой должностной позиции
   */
  async create(args: Partial<IPosition>): Promise<IPosition> {
    try {
      const { id } = await this.store.create(args);
      return this.findById(id);
    } catch (error) {
      this.catchError(error, args);
    }
  }

  /**
   * Обновляет запись о существующей должностной позиции
   */
  async update(args: Partial<IPosition>): Promise<IPosition> {
    try {
      await this.store.update({ id: args.id }, args);
      return this.findById(args.id);
    } catch (error) {
      this.catchError(error, args);
    }
  }

  private catchError(error, args) {
    if (error.message.includes('duplicate key value')) {
      throw new AlreadyExistsException(`Specialization with name ${args.name} already exists`);
    }
    throw error;
  }

  /**
   * Удаляет запись о существующей должностной позиции
   */
  async remove(args: Partial<IPosition>): Promise<IPosition> {
    return from(this.store.logicRemove(args.id))
      .pipe(mergeMap(() => this.findById(args.id)))
      .toPromise();
  }

  /**
   * Восстанавливает запись о должностной позиции
   */
  async restore(args: Partial<IPosition>): Promise<IPosition> {
    return from(this.store.logicRestore(args.id))
      .pipe(mergeMap(() => this.findById(args.id)))
      .toPromise();
  }

  /**
   * Находит запись о должностной позиции по ID
   */
  async findById(id: TModelID): Promise<IPosition> {
    return this.store.findById(id, {
      relations: this.relations,
    });
  }

  /**
   * Возвращает все должностные позиции в виде пагинативного списка
   */
  async findPaginate(args: IFindPaginateCriteria<IPosition>): Promise<IFindAndTotalResponse<IPosition>> {
    return this.store.findAndTotalByCriteria({
      ...args,
      relations: this.relations,
    });
  }
}
