import { IBaseModel } from '@qlean/nestjs-typeorm-persistence-search';
import { IPosition } from './positions.interface';
import { ICompensation } from './compensation.interface';
import { IRate } from './rate.interface';

/**
 * @description Тарифная сетка в рамках рабочей позиции для тарифа
 *
 */
export interface IGrade extends IBaseModel {
  /**
   * @description Рабочая позиция
   */
  readonly position: IPosition;

  /**
   * @description Базовая ставка
   */
  readonly rate: IRate;

  /**
   * @description Матрица надбавок
   */
  readonly compensations: ICompensation[];
}
