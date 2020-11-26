import { IBaseModel } from '@qlean/nestjs-typeorm-persistence-search';
import { IGrade } from './grade.interface';
import { ICommission } from './commission.interface';

/**
 * @description Тарифная сетка в рамках грейда
 *
 */
export interface IGrid extends IBaseModel {
  /**
   * @description Исспользуемый грейд
   */
  grade: IGrade;

  /**
   * @description Матрица коммиссий
   */
  commissions: ICommission[];
}
