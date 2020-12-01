import { IBaseModel, TModelID } from '@qlean/nestjs-typeorm-persistence-search';

export enum PERSON_STATUS {
  /**
   * Промежуточный, для значения по умолчанию
   */
  CREATED = 0,

  /**
   * Находится в процессе онбординга на работу
   */
  CANDIDATE = 1,

  /**
   * Полноценный исполнитель
   */
  EXECUTOR = 2,
}

export enum WORK_STATUS {
  ACTIVE = 0,

  BLOCKED = 3,

  FRIZING = 3,
}

export interface IContractor extends IBaseModel {

  /**
   * Рабочий статус
   */
  workStatus: WORK_STATUS;

  /**
   * Статус персоны
   */
  status: PERSON_STATUS;

  /**
   * Ссылка на пользователя в SSO
   */
  userId?: TModelID;

  /**
   * Рейтинг исполнителя, дробное число
   */
  rating: number;

}
