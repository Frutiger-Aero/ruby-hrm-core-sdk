import { ok } from 'assert';
import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';
import { AlreadyExistsException, InvalidArgumentException, NotFoundException } from '@qlean/nestjs-exceptions';
import { IFindAndTotalResponse, IFindPaginateCriteria, TModelID } from '@qlean/nestjs-typeorm-persistence-search';
import { SpecializationStore } from '../../infrastructure';
import { ISpecialization } from '../../domain';

@Injectable()
export class SpecializationService {
  constructor(
    private readonly store: SpecializationStore,
  ) {}

  private relations: string[] = [];

  /**
   * Создает запись о новом продукте
   */
  async create(args: Partial<ISpecialization>): Promise<ISpecialization> {
    try {
      const { id } = await this.store.create(args);
      return this.findById(id);
    } catch (error) {
      this.catchError(error, args);
    }
  }

  /**
   * Обновляет запись о существующем продукте
   */
  async update(args: Partial<ISpecialization>): Promise<ISpecialization> {
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
   * Удаляет запись о существующем продукте
   */
  async remove(args: Partial<ISpecialization>): Promise<ISpecialization> {
    return from(this.store.logicRemove(args.id))
      .pipe(mergeMap(() => this.findById(args.id)))
      .toPromise();
  }

  /**
   * Восстанавливает запись о пользователе
   */
  async restore(args: Partial<ISpecialization>): Promise<ISpecialization> {
    return from(this.store.logicRestore(args.id))
      .pipe(mergeMap(() => this.findById(args.id)))
      .toPromise();
  }

  /**
   * Находит запись о продукте по ID
   */
  async findById(id: TModelID): Promise<ISpecialization> {
    return this.store.findById(id, {
      relations: this.relations,
    });
  }

  /**
   * Возвращает все продукты в виде пагинативного списка
   */
  async findPaginate(args: IFindPaginateCriteria<ISpecialization>): Promise<IFindAndTotalResponse<ISpecialization>> {
    return this.store.findAndTotalByCriteria({
      ...args,
      relations: this.relations,
    });
  }
}
