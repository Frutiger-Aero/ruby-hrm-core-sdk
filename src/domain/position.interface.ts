import { IBaseModel } from '@qlean/nestjs-typeorm-persistence-search';

/**
 * @description Рабочая позиция - младший, старший, наставник
 *
 */
export interface IPosition extends IBaseModel {
  /**
   * @description Человекочитаемое название позиции
   */
  title: string;

  /**
   * @description Уникальный слаг позиции, если не передано -
   * будет автоматически сгенерировано из title.
   */
  name: string;
}
