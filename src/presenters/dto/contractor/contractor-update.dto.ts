import { IsEnum, IsNumber, IsOptional, IsPositive, IsUUID, ValidateNested } from "class-validator";
import { hrm } from "../../../../proto/generated/app.proto";
import { IContractor, PERSON_STATUS, WORK_STATUS } from "../../../domain";

export class ContractorUpdateDto implements Partial<IContractor>, hrm.core.IContractorCreateRequest {
  @IsUUID()
  readonly id: string;

  @IsOptional()
  @IsEnum(WORK_STATUS)
  readonly workStatus?: WORK_STATUS;

  @IsOptional()
  @IsEnum(PERSON_STATUS)
  readonly status?: PERSON_STATUS;

  @IsUUID()
  @IsOptional()
  readonly userId: string;

  @IsUUID()
  @IsOptional()
  readonly regionId: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly rating: number;
}

