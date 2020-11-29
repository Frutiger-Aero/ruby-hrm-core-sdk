import { AMOUNT_TYPE } from './amount-type.enum';

export enum RATE_UNIT {
  /**
   * Ставка за сервис
   * Сервисом может быть любая верхнеуровневая сущность, например заказ
   */
  SERVICE = 'SERVICE',

  /**
   * Ставка за час
   */
  HOUR = 'HOUR',

  /**
   * Ставка за день
   */
  DAY = 'DAY',

  /**
   * Ставка за месяц
   */
  MONTH = 'MONTH',
}

/**
 * @description Базовая ставка
 */
export interface IRate {
  /**
   * @description Размер баовой ставки
   */
  readonly amount: number;

  /**
   * @description Тип размера базовой ставки - проценты, число
   */
  readonly type: AMOUNT_TYPE;

  /**
   * @description Единица измерения базовой ставки
   */
  readonly unit: RATE_UNIT;
}
