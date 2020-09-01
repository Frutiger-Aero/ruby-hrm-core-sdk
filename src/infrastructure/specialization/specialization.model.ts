import { Column, Entity } from 'typeorm';
import { BaseModel } from '@qlean/nestjs-typeorm-persistence-search';
import { ISpecialization } from '../../core/interfaces';
import { IsString } from 'class-validator';

@Entity({
  name: 'specialization',
})
export class SpecializationModel extends BaseModel<ISpecialization> {
  @IsString()
  @Column({ unique: true })
  name: string;
}
