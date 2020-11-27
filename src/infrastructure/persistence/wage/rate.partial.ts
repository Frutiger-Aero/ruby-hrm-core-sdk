import { Column } from 'typeorm';
import { IsEnum, IsNumber } from 'class-validator';
import { RATE_UNIT, RATE_TYPE, IRate } from '../../../core/interfaces';

export class RatePartial implements IRate {
  @IsNumber()
  @Column({ type: 'integer' })
  readonly amount: number;

  @IsEnum(RATE_TYPE)
  @Column({ type: 'string', default: RATE_TYPE.FIXED })
  readonly type: RATE_TYPE;

  @IsEnum(RATE_UNIT)
  @Column({ type: 'string', default: RATE_UNIT.SERVICE })
  readonly unit: RATE_UNIT;
}
