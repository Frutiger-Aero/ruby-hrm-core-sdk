import { IBaseModel } from "@qlean/nestjs-typeorm-persistence-search";

export interface IBlockingReasonGroup extends IBaseModel {
  readonly name: string
}