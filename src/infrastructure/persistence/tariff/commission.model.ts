import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { BaseModel } from '@qlean/nestjs-typeorm-persistence-search';
import { COMMISSION_TYPE, COMMISSION_UNIT, ICommission } from '../../../core/interfaces';
import { GradeModel } from './grade.model';

@Entity({
  name: 'commissions',
})
export class CommissionModel extends BaseModel<ICommission> implements ICommission {
  @IsNumber()
  @Column({ type: 'integer' })
  amount: number;

  @IsEnum(COMMISSION_TYPE)
  @Column({ type: 'string', default: COMMISSION_TYPE.FIXED })
  type: COMMISSION_TYPE;

  @IsEnum(COMMISSION_UNIT)
  @Column({ type: 'string', default: COMMISSION_UNIT.SERVICE })
  unit: COMMISSION_UNIT;

  @IsString()
  @Column({ nullable: true })
  option?: string;

  @ManyToOne(type => GradeModel, e => e.commissions)
  @JoinColumn()
  readonly grade: GradeModel;
}
