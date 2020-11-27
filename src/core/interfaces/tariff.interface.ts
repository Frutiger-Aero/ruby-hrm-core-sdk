import { IGrade } from './grade.interface';
import { IProduct } from './product.interface';
import { ISpecialization } from './specialization.interface';
import { IBaseModel } from '@qlean/nestjs-typeorm-persistence-search';

export interface IWage extends IBaseModel {
  /**
   * @description Название тарифа
   */
  readonly name?: string;

  /**
   * @description Продукт в рамках тарифа
   */
  readonly product: IProduct;

  /**
   * @description Специализация в рамках тарифа
   */
  readonly specialization: ISpecialization;

  /**
   * @description Тарифная сетка в рамках грейдов
   */
  readonly grades: IGrade[];
}
