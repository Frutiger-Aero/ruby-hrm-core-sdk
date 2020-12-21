import { Type } from "class-transformer";
import { IsUUID, ValidateNested } from "class-validator";
import { hrm } from "../../../../proto/generated/app.proto";
import { RelationDto } from "../common/relation.dto";

export class FreezeDto implements hrm.core.IContractorFreezeRequest {
  @ValidateNested()
  @Type(() => RelationDto)
  readonly reason: RelationDto;

  @IsUUID()
  readonly id: string;
}