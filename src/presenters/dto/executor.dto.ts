import {
  ICreateExecutorRequest,
  IDisableExecutorRequest,
  IGetExecutorRequest,
  IGetHistoryProfileRequest,
  IPassport,
  IUpdateExecutorRequest,
  Status,
} from '../../core/interfaces';
import {
  IsArray,
  IsDate,
  IsDateString,
  IsEnum,
  IsNumber,
  IsObject,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { Passport } from '../../infrastructure/executor/executor.partial';
import { Type } from 'class-transformer';

export class ExecutorDto implements ICreateExecutorRequest {
  @IsString()
  address: string;

  @IsString()
  photo: string;

  @IsString()
  citizenshipId: string;

  @ValidateNested()
  @Type(() => Passport)
  passport?: Passport;
}

export class GetExecutor implements IGetExecutorRequest {
  @IsString()
  id: string;
}

export class UpdateExecutor implements IUpdateExecutorRequest {
  @IsString()
  id: string;

  @IsString()
  photo?: string;

  @IsString()
  citizenshipId?: string;

  @ValidateNested()
  @Type(() => Passport)
  passport?: Passport;

  @IsNumber()
  @Min(0)
  rating?: number;

  @IsDateString()
  acceptedUseTerms?: string;

  @IsString()
  citizenship?: string;

  // TODO не должно быть при обновлении
  @IsString()
  statusReason?: string;

  @IsDateString()
  statusDate?: string;

  @IsArray()
  specialization?: string[];

  @IsUUID('4')
  tariff?: string;
}

export class DisableExecutor implements IDisableExecutorRequest {
  @IsString()
  id: string;

  @IsString()
  statusReason: string;
}

export class GetHistoryProfileDto implements IGetHistoryProfileRequest {
  @IsString()
  id: string;

  @IsString()
  name?: string;

  @IsString()
  oldValue?: string;

  @IsString()
  newValue?: string;

  @IsDateString()
  dateFrom?: string;

  @IsDateString()
  dateTo?: string;

  @IsNumber()
  limit?: number;
}
