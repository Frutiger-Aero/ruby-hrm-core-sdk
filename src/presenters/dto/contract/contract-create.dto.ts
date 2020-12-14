import { Type } from "class-transformer";
import { IsEnum, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { hrm } from "../../../../proto/generated/app.proto";
import { CONTRACT_STATUS, IContract } from "../../../domain";
import { GradeDto } from "../common";
import { ProductRelationDto } from "../product";
import { SpecializationRelationDto } from "../specialization";
import { WageRelationDto } from "../wage";

export class ContractCreateDto implements Partial<IContract>, hrm.core.IContractCreateRequest {
  @IsEnum(CONTRACT_STATUS)
  readonly status: CONTRACT_STATUS;

  @IsUUID()
  readonly wageId: string;

  @IsUUID()
  readonly gradeId: string;

  @IsUUID()
  readonly productId: string;

  @IsUUID()
  readonly specializationId: string

  @IsUUID()
  readonly contractorId: string
}