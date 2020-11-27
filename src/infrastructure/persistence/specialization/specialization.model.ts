import { Column, Entity, OneToMany } from 'typeorm';
import { BaseModel } from '@qlean/nestjs-typeorm-persistence-search';
import { ISpecialization } from '../../../core/interfaces';
import { IsString } from 'class-validator';
import { TariffModel } from '../tariff/tariff.model';
import { ContractModel } from '../contract/contract.model';

@Entity({
  name: 'specializations',
})
export class SpecializationModel extends BaseModel<ISpecialization> implements ISpecialization {
  @IsString()
  @Column({ length: 128 })
  title: string;

  @IsString()
  @Column({ length: 128, unique: true })
  name: string;

  @OneToMany(type => TariffModel, e => e.specialization)
  readonly tariffs: TariffModel[];

  @OneToMany(type => ContractModel, e => e.specialization)
  readonly contracts: ContractModel[];
}
