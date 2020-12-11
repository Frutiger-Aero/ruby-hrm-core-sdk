import { IsEnum, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { hrm } from '../../../../proto/generated/app.proto';
import { AMOUNT_TYPE, ICompensation } from '../../../domain';

export class CompensationDto implements Partial<ICompensation>, hrm.core.ICompensation {
  @IsOptional()
  @IsUUID()
  readonly id: string;

  @IsNumber()
  readonly amount: number;

  @IsEnum(AMOUNT_TYPE)
  readonly type: AMOUNT_TYPE;

  @IsString()
  readonly option: string;
}
