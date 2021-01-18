import { Type } from "class-transformer";
import { IsDateString, IsOptional, IsUUID, ValidateNested } from "class-validator";
import { hrm } from "../../../../proto/generated/app.proto";
import { RelationDto } from "../common/relation.dto";

export class BlockDto implements hrm.core.IContractorBlockRequest {
  @ValidateNested()
  @Type(() => RelationDto)
  readonly reason: RelationDto;

  @IsUUID()
  readonly id: string;

  @IsOptional()
  @IsDateString()
  readonly startBlockDate: string;

  @IsOptional()
  @IsDateString()
  readonly endBlockDate: string;
}