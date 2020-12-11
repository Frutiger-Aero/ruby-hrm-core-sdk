import { IBaseModel } from '@qlean/nestjs-typeorm-persistence-search';
import { IWage } from './wage.interface';
import { IGrade } from './grade.interface';
import { IProduct } from './product.interface';
import { ISpecialization } from './specialization.interface';
import { IContractor } from './contractor.interface';

export enum CONTRACT_STATUS {
  /**
   * Активный, может выполнять работу
   */
  ACTIVE = 'ACTIVE',
  /**
   * Заблокирован, не может брать заказы
   */
  BLOCKED = 'BLOCKED',
  /**
   * Заморожен, не может брать заказы
   */
  FROZEN = 'FROZEN',
}

export interface IContract extends IBaseModel {
  /**
   * @description Рабочий статус исполнителя в рамках текущего договора
   */
  status: CONTRACT_STATUS;

  /**
   * @description Текущий тариф исполнителя
   */
  wage: Partial<IWage>;

  /**
   * @description Текущий грейд исполнителя
   */
  grade: IGrade;

  /**
   * @description Продукт в рамках тарифа
   */
  product: Partial<IProduct>;

  /**
   * @description Специализация в рамках тарифа
   */
  specialization: Partial<ISpecialization>;

  /**
   * @description Исполнитель, владелец контракта
   */
  contractor: IContractor;

}
