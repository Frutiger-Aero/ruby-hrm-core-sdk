import { Type } from "class-transformer";
import { IsDateString, IsOptional, IsUUID, ValidateNested } from "class-validator";
import { hrm } from "../../../../proto/generated/app.proto";
import { IContract } from "../../../domain"
import { RelationDto } from "../common/relation.dto";

export class ContractBlockDto implements Partial<IContract>, hrm.core.IContractorBlockRequest {
  @IsUUID()
  readonly id: string;

  @IsDateString()
  @IsOptional()
  readonly startBlockDate: string;

  @IsDateString()
  @IsOptional()
  readonly endBlockDate: string;

  @ValidateNested()
  @Type(() => RelationDto)
  readonly reason: RelationDto;
}