import { IBaseModel } from '@qlean/nestjs-typeorm-persistence-search';
import { IWage } from './tariff.interface';
import { IGrade } from './grade.interface';
import { IProduct } from './product.interface';
import { ISpecialization } from './specialization.interface';
import { IExecutor } from './executor.interface';

export enum CONTRACT_STATUS {
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
  status: CONTRACT_STATUS;

  /**
   * @description Текущий тариф исполнителя
   */
  wage: IWage;

  /**
   * @description Текущий грейд исполнителя
   */
  grade: IGrade;

  /**
   * @description Продукт в рамках тарифа
   */
  product: IProduct;

  /**
   * @description Специализация в рамках тарифа
   */
  specialization: ISpecialization;

  /**
   * @description Исполнитель, владелец контракта
   */
  executor: IExecutor;

}
