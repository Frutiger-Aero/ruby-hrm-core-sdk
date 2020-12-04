import { IGrade } from './grade.interface';
import { IProduct } from './product.interface';
import { ISpecialization } from './specialization.interface';
import { IBaseModel, TModelID } from '@qlean/nestjs-typeorm-persistence-search';

export interface IWage extends IBaseModel {
  /**
   * @description Название тарифа
   */
  readonly name: string;

  /**
   * Идентификатор региона в сервисе Регионы присутствия.
   */
  readonly regionId?: TModelID;

  /**
   * @description Продукт в рамках тарифа
   */
  readonly product: Partial<IProduct>;

  /**
   * @description Специализация в рамках тарифа
   */
  readonly specialization: Partial<ISpecialization>;

  /**
   * @description Тарифная сетка в рамках грейдов
   */
  readonly grades: IGrade[];
}
