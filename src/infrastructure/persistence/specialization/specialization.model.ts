import { Column, Entity, OneToMany } from 'typeorm';
import { BaseModel } from '@qlean/nestjs-typeorm-persistence-search';
import { ISpecialization } from '../../../domain';
import { IsString } from 'class-validator';
import { ContractModel } from '../contract/contract.model';
import { WageModel } from '../wage/wage.model';

@Entity({
  name: 'specializations',
})
export class SpecializationModel extends BaseModel<ISpecialization> implements ISpecialization {
  @IsString()
  @Column({ length: 128 })
  readonly title: string;

  @IsString()
  @Column({ length: 128, unique: true })
  readonly name: string;

  @OneToMany(type => WageModel, e => e.specialization)
  readonly wages: WageModel[];

  @OneToMany(type => ContractModel, e => e.specialization)
  readonly contracts: ContractModel[];
}
