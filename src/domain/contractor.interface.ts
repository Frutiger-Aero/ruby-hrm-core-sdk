import { IBaseModel, TModelID } from '@qlean/nestjs-typeorm-persistence-search';
import { IContract } from './contract.interface';

export enum PERSON_STATUS {
  /**
   * Промежуточный, для значения по умолчанию
   */
  CREATED = 'CREATED',

  /**
   * Находится в процессе онбординга на работу
   */
  CANDIDATE = 'CANDIDATE',

  /**
   * Полноценный исполнитель
   */
  EXECUTOR = 'EXECUTOR',
}

export enum WORK_STATUS {
  ACTIVE = 'ACTIVE',

  BLOCKED = 'BLOCKED',

  FROZEN = 'FROZEN',
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

  /**
   * Контракты исполнителя
   */
  readonly contracts: Partial<IContract>[]
}
