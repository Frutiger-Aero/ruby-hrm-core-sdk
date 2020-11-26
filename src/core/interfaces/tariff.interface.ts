import { ITariffGrade } from './tariff-grade.interface';
import { IProduct } from './product.interface';
import { ISpecialization } from './specialization.interface';
import { IBaseModel } from '@qlean/nestjs-typeorm-persistence-search';

export interface ITariff extends IBaseModel {
  /**
   * @description Название тарифа
   */
  name?: string;

  /**
   * @description Продукт в рамках тарифа
   */
  product: IProduct;

  /**
   * @description Специализация в рамках тарифа
   */
  specialization: ISpecialization;

  /**
   * @description Массив грейдов тарифа
   */
  grades: ITariffGrade[];
}
