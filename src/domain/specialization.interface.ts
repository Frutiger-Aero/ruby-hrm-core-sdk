import { IBaseModel } from '@qlean/nestjs-typeorm-persistence-search';

/**
 * @description Сущность для хранения специализаций исполнителей
 * @example { title: 'Курьер', name: 'courier' }
 *
 */
export interface ISpecialization extends IBaseModel {
  /**
   * @description Человекочитаемое название специализации
   */
  readonly title: string;

  /**
   * @description Уникальный слаг специализации, если не передано -
   * будет автоматически сгенерировано из title.
   */
  readonly name: string;
}
