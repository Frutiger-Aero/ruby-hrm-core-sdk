import { Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseModel } from '@qlean/nestjs-typeorm-persistence-search';
import { IGrid } from '../../../core/interfaces';
import { GradeModel } from '../grade/grade.model';
import { CommissionModel } from '../commission/commission.model';
import { TariffModel } from './tariff.model';

@Entity({
  name: 'grids',
})
export class GridModel extends BaseModel<IGrid> {
  @ManyToOne(type => TariffModel, e => e.grids)
  @JoinColumn()
  readonly tariff: TariffModel;

  @ManyToOne(type => GradeModel, e => e.grids)
  @JoinColumn()
  readonly grade: GradeModel;

  @OneToMany(type => CommissionModel, e => e.grid, {
    eager: true,
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  readonly commissions: CommissionModel[];
}
