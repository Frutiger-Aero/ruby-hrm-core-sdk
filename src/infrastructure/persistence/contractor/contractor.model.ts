import { Entity, Column, OneToMany } from 'typeorm';
import { BaseModel } from '@qlean/nestjs-typeorm-persistence-search';
import { IsNumber, IsEnum, IsUUID } from 'class-validator';
import { IContractor, PERSON_STATUS, WORK_STATUS } from '../../../domain';
import { ContractModel } from '../contract/contract.model';

@Entity({
  name: 'contractors',
})
export class ContractorModel extends BaseModel<IContractor> implements IContractor {
  @IsUUID('4')
  @Column({ type: 'uuid', nullable: true, name: 'user_id', unique: true })
  readonly userId?: string;

  @IsEnum(PERSON_STATUS)
  @Column({ type: 'character varying', default: PERSON_STATUS.CREATED })
  readonly status: PERSON_STATUS;

  @IsEnum(WORK_STATUS)
  @Column({ type: 'character varying', name: 'work_status', default: WORK_STATUS.ACTIVE })
  readonly workStatus: WORK_STATUS;

  @IsNumber()
  @Column('double precision', { default: 0 })
  readonly rating: number;

  @OneToMany(type => ContractModel, e => e.contractor)
  readonly contracts: ContractModel[];
}
