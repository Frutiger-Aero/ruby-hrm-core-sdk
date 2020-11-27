import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseModel } from '@qlean/nestjs-typeorm-persistence-search';
import { IGrade } from '../../../core/interfaces';
import { PositionModel } from '../position/position.model';
import { CompensationModel } from './compensation.model';
import { WageModel } from './wage.model';
import { ContractModel } from '../contract/contract.model';
import { IsObject, ValidateNested } from 'class-validator';
import { RatePartial } from './rate.partial';

@Entity({
  name: 'grades',
})
export class GradeModel extends BaseModel<IGrade> implements IGrade {
  @ManyToOne(type => PositionModel, e => e.grades)
  @JoinColumn()
  readonly position: PositionModel;

  @IsObject()
  @ValidateNested()
  @Column(type => RatePartial)
  readonly rate: RatePartial;

  @OneToMany(type => CompensationModel, e => e.grade, {
    eager: true,
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  readonly compensations: CompensationModel[];

  @ManyToOne(type => WageModel, e => e.grades)
  @JoinColumn()
  readonly wage: WageModel;

  @OneToMany(type => ContractModel, e => e.grade)
  readonly contracts: ContractModel[];
}
