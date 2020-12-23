import { IBaseModel } from "@qlean/nestjs-typeorm-persistence-search";

export interface ISkill extends IBaseModel {
  /**
   * @description Человекочитаемое название скилла
   */
  readonly title: string;

  /**
   * @description ссылка на уникальное имя опции 
   */
  readonly option: string;
}