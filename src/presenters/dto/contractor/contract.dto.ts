import { Type } from "class-transformer";
import { IsEnum, IsOptional, IsString, ValidateNested } from "class-validator";
import { hrm } from "../../../../proto/generated/app.proto";
import { CONTRACT_STATUS, IContract } from "../../../domain";
import { GradeDto } from "../common";
import { ProductRelationDto } from "../product";
import { SpecializationRelationDto } from "../specialization";
import { WageRelationDto } from "../wage";

export class ContractDto implements Partial<IContract>, hrm.core.IContract {
  @IsEnum(CONTRACT_STATUS)
  readonly status: CONTRACT_STATUS;

  @ValidateNested()
  @Type(() => WageRelationDto)
  readonly wage: WageRelationDto;

  @ValidateNested()
  @Type(() => GradeDto)
  readonly grade: GradeDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ProductRelationDto)
  readonly product: ProductRelationDto;

  @ValidateNested()
  @Type(() => SpecializationRelationDto)
  readonly specialization: SpecializationRelationDto
}