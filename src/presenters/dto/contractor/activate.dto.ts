import { IsUUID } from "class-validator";
import { hrm } from "../../../../proto/generated/app.proto";

export class ActivateDto implements hrm.core.IContractorActivateRequest {
  @IsUUID()
  readonly id: string;
}