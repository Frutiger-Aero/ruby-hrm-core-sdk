import { Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseModel } from '@qlean/nestjs-typeorm-persistence-search';
import { IGrade } from '../../../core/interfaces';
import { PositionModel } from '../position/position.model';
import { CommissionModel } from '../commission/commission.model';
import { TariffModel } from './tariff.model';

@Entity({
  name: 'grades',
})
export class GradeModel extends BaseModel<IGrade> {
  @ManyToOne(type => TariffModel, e => e.grades)
  @JoinColumn()
  readonly tariff: TariffModel;

  @ManyToOne(type => PositionModel, e => e.grades)
  @JoinColumn()
  readonly position: PositionModel;

  @OneToMany(type => CommissionModel, e => e.grade, {
    eager: true,
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  readonly commissions: CommissionModel[];
}
