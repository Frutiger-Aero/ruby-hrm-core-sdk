import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { BaseModel } from '@qlean/nestjs-typeorm-persistence-search';
import { AMOUNT_TYPE, ICompensation } from '../../../core/interfaces';
import { GradeModel } from './grade.model';

@Entity({
  name: 'compensations',
})
export class CompensationModel extends BaseModel<ICompensation> implements ICompensation {
  @IsNumber()
  @Column({ type: 'integer' })
  readonly amount: number;

  @IsEnum(AMOUNT_TYPE)
  @Column({ type: 'string', default: AMOUNT_TYPE.FIXED })
  readonly type: AMOUNT_TYPE;

  @IsString()
  @Column()
  readonly option: string;

  @ManyToOne(type => GradeModel, e => e.compensations)
  @JoinColumn()
  readonly grade: GradeModel;
}
