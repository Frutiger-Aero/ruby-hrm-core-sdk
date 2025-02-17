import { BaseModel } from "@qlean/nestjs-typeorm-persistence-search";
import { Column, Entity } from "typeorm";
import { IBlockingReasonGroup } from "../../../domain";


@Entity({
  name: 'blocking-reasons-groups',
})
export class BlockingReasonGroupModel extends BaseModel<IBlockingReasonGroup> implements IBlockingReasonGroup {
  @Column({length: 128, unique: true})
  readonly name: string;
}