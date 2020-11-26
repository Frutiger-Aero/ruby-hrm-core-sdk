import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { BaseModel } from '@qlean/nestjs-typeorm-persistence-search';
import { COMMISSION_TYPE, COMMISSION_UNIT, ICommission } from '../../../core/interfaces';
import { GridModel } from '../grid/grid.model';

@Entity({
  name: 'commissions',
})
export class CommissionModel extends BaseModel<ICommission> {
  @IsNumber()
  @Column({ type: 'integer' })
  amount: number;

  @IsEnum(COMMISSION_TYPE)
  @Column({ type: 'string', default: COMMISSION_TYPE.FIXED })
  type: COMMISSION_TYPE;

  @IsEnum(COMMISSION_UNIT)
  @Column({ type: 'string', default: COMMISSION_UNIT.SERVICE })
  unit?: COMMISSION_UNIT;

  @IsString()
  @Column({ nullable: true })
  option?: string;

  @ManyToOne(type => GridModel, e => e.commissions)
  @JoinColumn()
  readonly grid: GridModel;
}
