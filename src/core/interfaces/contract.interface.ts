import { IBaseModel } from '@qlean/nestjs-typeorm-persistence-search';
import { ITariff } from './tariff.interface';
import { IGrid } from './grid.interface';
import { IProduct } from './product.interface';
import { ISpecialization } from './specialization.interface';

export enum WORK_STATUS {
  /**
   * Активный, может выполнять работу
   */
  ACTIVE = 0,
  /**
   * Заблокирован, не может брать заказы
   */
  BLOCKED = 1,
  /**
   * Заморожен, не может брать заказы
   */
  FROZEN = 2,
}

export interface IContract extends IBaseModel {
  /**
   * @description Рабочий сатус исполнителя в рамках текущего договора
   */
  status: WORK_STATUS;

  /**
   * @description Текущий тариф исполнителя
   */
  tariff: ITariff;

  /**
   * @description Текущий грейд исполнителя
   */
  grade: IGrid;

  /**
   * @description Продукт в рамках тарифа
   */
  product: IProduct;

  /**
   * @description Специализация в рамках тарифа
   */
  specialization: ISpecialization;

}
