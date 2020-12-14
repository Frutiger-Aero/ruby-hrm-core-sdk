import { TModelID } from '@qlean/nestjs-typeorm-persistence-search';
import { IPosition } from './position.interface';
import { ICompensation } from './compensation.interface';
import { IRate } from './rate.interface';
import { IWage } from './wage.interface';

/**
 * @description Тарифная сетка в рамках рабочей позиции для тарифа
 *
 */
export interface IGrade {
  /**
   * @description Идентификатор записи в БД
   */
  readonly id: TModelID;

  /**
   * @description Рабочая позиция
   */
  readonly position: Partial<IPosition>;

  /**
   * @description тариф
   */
  readonly wage: Partial<IWage>;

  /**
   * @description Базовая ставка
   */
  readonly rate: IRate;

  /**
   * @description Матрица надбавок
   */
  readonly compensations: ICompensation[];
}
