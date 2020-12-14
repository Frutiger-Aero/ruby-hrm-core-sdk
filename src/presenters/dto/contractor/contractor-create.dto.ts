import { IContractor, PERSON_STATUS, WORK_STATUS } from "../../../domain";
import { hrm } from '../../../../proto/generated/app.proto';
import { IsEnum, IsNumber, IsOptional, IsPositive, IsUUID, ValidateNested } from "class-validator";

export class ContractorCreateDto implements Partial<IContractor>, hrm.core.IContractorCreateRequest {
  @IsOptional()
  @IsEnum(WORK_STATUS)
  readonly workStatus?: WORK_STATUS;

  @IsOptional()
  @IsEnum(PERSON_STATUS)
  readonly status?: PERSON_STATUS;

  @IsUUID()
  readonly userId: string;

  @IsUUID()
  @IsOptional()
  readonly regionId: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly rating: number;
}