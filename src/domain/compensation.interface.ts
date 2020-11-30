import { TModelID } from '@qlean/nestjs-typeorm-persistence-search';
import { AMOUNT_TYPE } from './amount-type.enum';

/**
 * @description Надбавка за выполнение опции
 */
export interface ICompensation {
  /**
   * @description Идентификатор записи в БД
   */
  readonly id: TModelID;

  /**
   * @description Размер вознаграждения
   */
  readonly amount: number;

  /**
   * @description Тип размера вознаграждения - проценты, число
   */
  readonly type: AMOUNT_TYPE;

  /**
   * @description Ссылка на уникальное имя опции
   */
  readonly option: string;
}
