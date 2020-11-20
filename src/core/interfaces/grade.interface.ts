import { IBaseModel } from '@qlean/nestjs-typeorm-persistence-search';

/**
 * @description Справочник грейдов - младший, старший, наставник
 *
 */
export interface IGrade extends IBaseModel {
  /**
   * @description Человекочитаемое название грейда
   */
  title: string;

  /**
   * @description Уникальный слаг грейда, если не передано -
   * будет автоматически сгенерировано из title.
   */
  name: string;
}
