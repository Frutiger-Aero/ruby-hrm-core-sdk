import { IContractor, PERSON_STATUS, WORK_STATUS } from "../../../domain";
import { hrm } from '../../../../proto/generated/app.proto';
import { IsEnum, IsNumber, IsOptional, IsPositive, IsUUID } from "class-validator";

export class ContractorCreateDto implements Partial<IContractor>, hrm.core.IContractorCreateRequest {
}