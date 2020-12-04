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
  readonly workStatus: WORK_STATUS;

  /**
   * Статус персоны
   */
  readonly status: PERSON_STATUS;

  /**
   * Идентификатор пользователя в сервисе SSO
   */
  readonly userId?: TModelID;

  /**
   * Идентификатор региона в сервисе Регионы присутствия.
   */
  readonly regionId?: TModelID;

  /**
   * Рейтинг исполнителя, дробное число
   */
  readonly rating: number;

}
