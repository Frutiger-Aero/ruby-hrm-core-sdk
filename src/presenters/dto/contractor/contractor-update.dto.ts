import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsPositive, IsUUID, ValidateNested } from "class-validator";
import { hrm } from "../../../../proto/generated/app.proto";
import { IContractor, PERSON_STATUS, WORK_STATUS } from "../../../domain";
import { ContractDto } from "./contract.dto";

export class ContractorUpdateDto implements Partial<IContractor>, hrm.core.IContractorCreateRequest {
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

  @IsOptional()
  @Type(() => ContractDto)
  @ValidateNested({ each: true })
  readonly contracts: ContractDto[]
}

