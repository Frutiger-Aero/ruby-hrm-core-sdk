import { IBaseModel } from '@qlean/nestjs-typeorm-persistence-search';
import { IAddress } from './address.interface';
import { IFio } from './fio.interface';

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

  /**
   * Заблокированный исполнитель
   */
  BLOCKED = 3,
}

export interface IExecutor extends IBaseModel {

  /**
   * Статус персоны
   */
  status: PERSON_STATUS;

  /**
   * Ссылка на пользователя в SSO
   */
  userId: string;

  // /**
  //  * Фото для различных документов
  //  */
  // photo: string;

  /**
   * Официальное, полное имя
   */
  fio: IFio;

  /**
   * Адрес проживания
   */
  address: IAddress;

  /**
   * Рейтинг исполнителя, дробное число
   */
  rating: number;

}
