import { Type } from "class-transformer";
import { IsEnum, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { hrm } from "../../../../proto/generated/app.proto";
import { CONTRACT_STATUS, IContract } from "../../../domain";
import { GradeRelationDto } from "../common";
import { WageRelationDto } from "../wage";
import { RelationDto } from "../common/relation.dto";

export class ContractUpdateDto implements Partial<IContract>, hrm.core.IContractUpdateRequest {
  @IsUUID()
  readonly id: string;

  @IsOptional()
  @IsEnum(CONTRACT_STATUS)
  readonly status: CONTRACT_STATUS;

  @ValidateNested()
  @Type(() => WageRelationDto)
  @IsOptional()
  readonly wage: WageRelationDto;

  @ValidateNested()
  @Type(() => GradeRelationDto)
  @IsOptional()
  readonly grade: GradeRelationDto;

  @ValidateNested()
  @Type(() => RelationDto)
  @IsOptional()
  readonly contractor: RelationDto
}