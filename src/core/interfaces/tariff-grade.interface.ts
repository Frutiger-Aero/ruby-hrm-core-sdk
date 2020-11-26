import { IBaseModel } from '@qlean/nestjs-typeorm-persistence-search';
import { IGrade } from './grade.interface';
import { ICommission } from './commission.interface';

/**
 * @description Справочник грейдов - младший, старший, наставник
 *
 */
export interface ITariffGrade extends IBaseModel {
  /**
   * @description Исспользуемый грейд
   */
  grade: IGrade;

  /**
   * @description Матрица коммиссий
   */
  commissions: ICommission[];
}
