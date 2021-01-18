import { IBaseModel } from "@qlean/nestjs-typeorm-persistence-search";
import { IBlockingReasonGroup } from "./blocking-reason-group.interface";
import { BLOCKING_TYPE } from "./status-type.enum";

export interface IBlockingReason extends IBaseModel {
  /**
   * @description наименование причины
   */
  readonly name: string;
  /**
   * @description тип блокировки
   */
  readonly type: BLOCKING_TYPE;
  /**
   * Перманентная ли блокировка, влияет на возможность снять блокировку
   */
  readonly isPermanent: boolean;

  /**
   * Доступность для исполнителя. Может ли исполнитель заблокировать себя по этой причине
   */
  readonly isAvailableForContractor: boolean;
  /**
   * Моментальная ли блокировка. По сути влияет на снятие уже назначенных заказов
   */
  readonly isInstant: boolean;
  /**
   * Нужно ли переобучение после блокировки
   */
  readonly isNeedRetraining: boolean;
  /**
   * Блокируется ли исполнитель после блокировки контракта
   */
  readonly isCommonBlock?: boolean;
  /**
   * 
   */
  readonly group: Partial<IBlockingReasonGroup>
}