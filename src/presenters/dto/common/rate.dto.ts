import { IsEnum, IsNumber } from 'class-validator';
import { hrm } from '../../../../proto/generated/app.proto';
import { IRate, AMOUNT_TYPE, RATE_UNIT } from '../../../domain';

export class RateDto implements Partial<IRate>, hrm.core.IRate {
  @IsNumber()
  readonly amount: number;

  @IsEnum(AMOUNT_TYPE)
  readonly type: AMOUNT_TYPE;

  @IsEnum(RATE_UNIT)
  readonly unit: RATE_UNIT;
}
