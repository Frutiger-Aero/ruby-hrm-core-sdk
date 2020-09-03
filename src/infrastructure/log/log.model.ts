import {Column, Entity} from "typeorm";
import {BaseModel} from "@qlean/nestjs-typeorm-persistence-search";
import {ILog, LogEntity} from "../../core/interfaces";
import {IsEnum, IsString} from "class-validator";

@Entity({
  name: 'log',
})
export class LogModel extends BaseModel<ILog> {
  @IsEnum(LogEntity)
  @Column('smallint', { nullable: false })
  type: LogEntity;

  @IsString()
  @Column({nullable: false})
  name: string;

  @IsString()
  @Column({name: 'old_value', nullable: true })
  oldValue: string;

  @IsString()
  @Column({name: 'new_value', nullable: false})
  newValue: string;

  @IsString()
  @Column({name: 'entity_id', nullable: false})
  entityId: string;
}
