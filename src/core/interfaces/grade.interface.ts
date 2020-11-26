import { IBaseModel } from '@qlean/nestjs-typeorm-persistence-search';
import { IPosition } from './positions.interface';
import { ICommission } from './commission.interface';

/**
 * @description Тарифная сетка в рамках рабочей позиции для тарифа
 *
 */
export interface IGrade extends IBaseModel {
  /**
   * @description Рабочая позиция
   */
  position: IPosition;

  /**
   * @description Матрица коммиссий
   */
  commissions: ICommission[];
}
