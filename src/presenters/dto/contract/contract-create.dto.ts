import { Type } from "class-transformer";
import { IsEnum, IsOptional, IsUUID, ValidateNested } from "class-validator";
import { hrm } from "../../../../proto/generated/app.proto";
import { CONTRACT_STATUS, IContract } from "../../../domain";
import { GradeRelationDto } from "../common";
import { WageRelationDto } from "../wage";
import { RelationDto } from "../common/relation.dto";

export class ContractCreateDto implements Partial<IContract>, hrm.core.IContractCreateRequest {
  // @IsEnum(CONTRACT_STATUS)
  // @IsOptional()
  // readonly status: CONTRACT_STATUS;

  @ValidateNested()
  @Type(() => WageRelationDto)
  readonly wage: WageRelationDto;

  @ValidateNested()
  @Type(() => GradeRelationDto)
  readonly grade: GradeRelationDto;

  @ValidateNested()
  @Type(() => RelationDto)
  readonly contractor: RelationDto


  @ValidateNested({ each: true })
  @Type(() => RelationDto)
  readonly skill: RelationDto
}