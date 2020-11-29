/**
 * Описывает как интерпретировать числовое значение
 */
export enum AMOUNT_TYPE {
  /**
   * @description Фиксированное значение, например 100р
   */
  FIXED = 'fixed',

  /**
   * @description Процентное значение, например 100%
   */
  PERCENT = 'percent',
}
