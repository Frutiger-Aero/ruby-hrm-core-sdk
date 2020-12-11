import { IsString, IsOptional, IsUUID, Length } from 'class-validator';
import { hrm } from '../../../../proto/generated/app.proto';
import { IWage } from '../../../domain';

export class WageRelationDto implements Partial<IWage>, hrm.core.IWageRelation {
  @IsUUID()
  readonly id: string;

  @IsOptional()
  @IsString()
  @Length(0, 128)
  readonly name: string;
}