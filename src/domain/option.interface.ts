import { IBaseModel } from "@qlean/nestjs-typeorm-persistence-search";

export interface IOption extends IBaseModel {
  /**
   * @description Человекочитаемое название опции
   */
  title: string;

  /**
   * @description Уникальный слаг опции, если не передано -
   * будет автоматически сгенерировано из title.
   */
  name: string;
}