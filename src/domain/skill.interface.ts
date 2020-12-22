import { IBaseModel } from "@qlean/nestjs-typeorm-persistence-search";
import { IOption } from "./option.interface";

export interface ISkill extends IBaseModel {
  /**
   * @description Человекочитаемое название опции
   */
  readonly title: string;

  /**
   * @description опция 
   */
  readonly option: IOption;
}