import { IsEnum, IsOptional, IsString, IsUUID, Length, ValidateNested } from 'class-validator';
import { hrm } from '../../../../proto/generated/app.proto';
import { IWage, WAGE_TYPE } from '../../../domain';
import { Type } from 'class-transformer';
import { GradeDto } from '../common';
import { ProductRelationDto } from '../product';
import { SpecializationRelationDto } from '../specialization';

export class WageCreateDto implements Partial<IWage>, hrm.core.IWageCreateRequest {
  @IsString()
  @Length(0, 128)
  readonly name: string;

  @ValidateNested()
  @Type(() => ProductRelationDto)
  readonly product: ProductRelationDto;

  @ValidateNested()
  @Type(() => SpecializationRelationDto)
  readonly specialization: SpecializationRelationDto;

  @ValidateNested({ each: true })
  @Type(() => GradeDto)
  readonly grades: GradeDto[];

  @IsOptional()
  @IsUUID()
  readonly regionId: string;

  @IsEnum(WAGE_TYPE)
  readonly type: WAGE_TYPE;
}
