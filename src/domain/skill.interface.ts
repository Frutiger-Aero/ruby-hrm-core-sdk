import { IBaseModel } from "@qlean/nestjs-typeorm-persistence-search";
import { IOption } from "./option.interface";

export interface ISkill extends IBaseModel {
  readonly name: string;
  /**
   * @description Человекочитаемое название скилла
   */
  readonly title: string;

  /**
   * @description ссылка на уникальное имя опции 
   */
  readonly optionsSlugs: string[];
}

export interface ISkillResponse extends ISkill {
  readonly options: IOption[]
}