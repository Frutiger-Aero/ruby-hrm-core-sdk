import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseModel } from '@qlean/nestjs-typeorm-persistence-search';
import { IsEnum, IsString, IsUUID } from 'class-validator';
import { IWage, WAGE_TYPE } from '../../../domain';
import { SpecializationModel } from '../specialization/specialization.model';
import { ContractModel } from '../contract/contract.model';
import { GradeModel } from './grade.model';

@Entity({
  name: 'wages',
})
export class WageModel extends BaseModel<IWage> implements IWage {
  @IsString()
  @Column({ length: 128, unique: true })
  readonly name: string;

  @IsUUID('4')
  @Column({ type: 'uuid', nullable: true, name: 'region_id' })
  readonly regionId?: string;

  @ManyToOne(type => SpecializationModel, e => e.wages, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'specialization_id' })
  @Index('idx-wages-specialization_id')
  readonly specialization: SpecializationModel;

  @Column({ name: 'product_slug' })
  readonly productSlug: string;

  @OneToMany(type => GradeModel, e => e.wage, {
    eager: true,
    cascade: true,
  })
  readonly grades: GradeModel[];

  @OneToMany(type => ContractModel, e => e.wage)
  readonly contracts: ContractModel[];

  @IsEnum(WAGE_TYPE)
  @Column({ type: 'character varying' })
  readonly type: WAGE_TYPE
}
