import { Column } from 'typeorm';
import { IsEnum, IsNumber } from 'class-validator';
import { RATE_UNIT, IRate, AMOUNT_TYPE } from '../../../domain';

export class RatePartial implements IRate {
  @IsNumber()
  @Column({ type: 'integer', name: '_amount' })
  readonly amount: number;

  @IsEnum(AMOUNT_TYPE)
  @Column({ type: 'character varying', name: '_type', default: AMOUNT_TYPE.FIXED })
  readonly type: AMOUNT_TYPE;

  @IsEnum(RATE_UNIT)
  @Column({ type: 'character varying', name: '_unit', default: RATE_UNIT.SERVICE })
  readonly unit: RATE_UNIT;
}
