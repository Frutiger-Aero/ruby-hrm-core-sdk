import { IsString, IsOptional, IsUUID, Length, ValidateNested, IsEnum } from 'class-validator';
import { hrm } from '../../../../proto/generated/app.proto';
import { IWage, WAGE_TYPE } from '../../../domain';
import { Type } from 'class-transformer';
import { GradeDto } from '../common';
import { ProductRelationDto } from '../product';
import { SpecializationRelationDto } from '../specialization';

export class WageUpdateDto implements Partial<IWage>, hrm.core.IWageUpdateRequest {
  @IsUUID()
  readonly id: string;

  @IsOptional()
  @IsString()
  @Length(0, 128)
  readonly name: string;

  @ValidateNested()
  @Type(() => ProductRelationDto)
  readonly product: ProductRelationDto;

  @ValidateNested()
  @Type(() => SpecializationRelationDto)
  readonly specialization: SpecializationRelationDto;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GradeDto)
  readonly grades: GradeDto[];

  @IsOptional()
  @IsUUID()
  readonly regionId: string;

  @IsEnum(WAGE_TYPE)
  @IsOptional()
  readonly type: WAGE_TYPE;
}
