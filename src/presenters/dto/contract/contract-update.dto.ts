import { Type } from "class-transformer";
import { IsEnum, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { hrm } from "../../../../proto/generated/app.proto";
import { CONTRACT_STATUS, IContract } from "../../../domain";
import { GradeDto } from "../common";
import { ProductRelationDto } from "../product";
import { SpecializationRelationDto } from "../specialization";
import { WageRelationDto } from "../wage";

export class ContractUpdateDto implements Partial<IContract>, hrm.core.IContractUpdateRequest {
  @IsUUID()
  readonly id: string;

  @IsOptional()
  @IsEnum(CONTRACT_STATUS)
  readonly status: CONTRACT_STATUS;

  @IsUUID()
  @IsOptional()
  readonly wageId: string;

  @IsUUID()
  @IsOptional()
  readonly gradeId: string;

  @IsUUID()
  @IsOptional()
  readonly productId: string;

  @IsUUID()
  @IsOptional()
  readonly specializationId: string
}