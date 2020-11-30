import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TBaseModelArgs, TModelID } from '@qlean/nestjs-typeorm-persistence-search';
import { IGrade } from '../../../domain';
import { PositionModel } from '../position/position.model';
import { CompensationModel } from './compensation.model';
import { WageModel } from './wage.model';
import { ContractModel } from '../contract/contract.model';
import { IsObject, IsUUID, ValidateNested } from 'class-validator';
import { RatePartial } from './rate.partial';

@Entity({
  name: 'grades',
})
export class GradeModel implements IGrade {
  constructor(args?: TBaseModelArgs<IGrade>) {
    for (const prop of Object.keys(args || {})) {
      this[prop] = args[prop];
    }
  }

  /**
   * Идентификатор записи из БД
   */
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: TModelID;

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
