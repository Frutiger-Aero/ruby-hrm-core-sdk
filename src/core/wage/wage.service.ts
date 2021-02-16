import { ok } from 'assert';
import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';
import { InvalidArgumentException, NotFoundException } from '@qlean/nestjs-exceptions';
import { IFindAndTotalResponse, IFindPaginateCriteria, TModelID } from '@qlean/nestjs-typeorm-persistence-search';
import { OptionStore, ProductStore, WageStore } from '../../infrastructure';
import { IOption, IProduct, IWage, IWageResponse } from '../../domain';
import { WageModel } from '../../infrastructure/persistence/wage/wage.model';

@Injectable()
export class WageService {
  constructor(
    private readonly store: WageStore,
    private readonly productStore: ProductStore,
    private readonly optionsStore: OptionStore
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
    const options = await this.getOptionsAndCheck(args);
    const { id } = await this.store.create(args);
    const wage = await this.findById(id);
    return this.createResponseModel(wage, options, product)
  }

  

  /**
   * Обновляет запись о существующей должностной позиции
   */
  async update(args: Partial<IWage>): Promise<IWageResponse> {
    let product;
    await this.getOptionsAndCheck(args);
    if (args.productSlug) {
      product = await this.productStore.findBySlug(args.productSlug);
      if (!product) {
        throw new InvalidArgumentException(`Product ${args.productSlug} doesn't exist`);
      }
    }
    await this.store.update({ id: args.id }, args);
    const wage = await this.findById(args.id);
    const options = await this.getOptionsAndCheck(wage);
    return this.createResponseModel(wage, options, product);
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
    const wage = await this.store.findById(id, {
      relations: this.relations,
    });
    const options = await this.getOptionsAndCheck(wage);
    const product = await this.productStore.findBySlug(wage.productSlug);
    return this.createResponseModel(wage, options, product);
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

  private async createResponseModel(wage: IWage, options: {[key: string]: IOption}, product: IProduct) {
    return {
      ...wage,
      grades: wage.grades.map(grade => ({
        ...grade,
        compensations: grade.compensations.map(compensation => ({
          ...compensation,
          option: options[compensation.optionSlug]
        }))
      })),
      product: product || await this.productStore.findBySlug(wage.productSlug)
    }
  }

  private async getOptionsAndCheck(args: Partial<IWage>) {
    const optionsSlugs = [
      ...new Set<string>([].concat.apply([], args.grades.map(grade => 
          [].concat.apply([], grade.compensations.map(compensation => compensation.optionSlug))
        ))
      )];
    const options = await this.optionsStore.findAllBySlugs(optionsSlugs);
    let difference = optionsSlugs.filter(x => !Object.keys(options).includes(x));
    if (difference.length) {
      throw new InvalidArgumentException(`options ${difference.join(',')} don't exist`);
    }
    return options;
  }
}
