import { Column, Entity, OneToMany } from 'typeorm';
import { BaseModel } from '@qlean/nestjs-typeorm-persistence-search';
import { ISpecialization } from '../../../core/interfaces';
import { IsString } from 'class-validator';
import { TariffModel } from '../tariff/tariff.model';

@Entity({
  name: 'specializations',
})
export class SpecializationModel extends BaseModel<ISpecialization> {
  @IsString()
  @Column({ length: 128 })
  title: string;

  @IsString()
  @Column({ length: 128, unique: true })
  name: string;

  @OneToMany(type => TariffModel, e => e.specialization)
  readonly tariffs: TariffModel[];
}
