import { Entity, Column, } from 'typeorm';
import { BaseModel } from '@qlean/nestjs-typeorm-persistence-search';
import { IsNumber, IsEnum, ValidateNested, IsObject, IsUUID, } from 'class-validator';
import { IExecutor, PERSON_STATUS } from '../../../core/interfaces';
import { AddressPartial } from './address.partial';
import { FioPartial } from './fio.partial';

@Entity({
  name: 'executors',
})
export class ExecutorModel extends BaseModel<IExecutor> implements IExecutor {
  @IsUUID('4')
  @Column({ nullable: false, name: 'user_id', unique: true })
  userId: string;

  @IsObject()
  @ValidateNested()
  @Column(type => FioPartial)
  fio: FioPartial;

  @IsObject()
  @ValidateNested()
  @Column(type => AddressPartial)
  address: AddressPartial;

  @IsEnum(PERSON_STATUS)
  @Column({ default: PERSON_STATUS.CREATED })
  status: PERSON_STATUS;

  @IsNumber()
  @Column('double precision', { default: 0 })
  rating: number;
}
