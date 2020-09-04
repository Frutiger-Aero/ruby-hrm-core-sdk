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
  IsObject, IsOptional,
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
  citizenship: string;

  @ValidateNested()
  @Type(() => Passport)
  passport?: Passport;
}

export class GetExecutor implements IGetExecutorRequest {}

export class UpdateExecutor implements IUpdateExecutorRequest {
  @IsString()
  id: string;

  @IsString()
  @IsOptional()
  photo?: string;

  @IsString()
  @IsOptional()
  citizenship?: string;

  @ValidateNested()
  @Type(() => Passport)
  @IsOptional()
  passport?: Passport;

  @IsNumber()
  @IsOptional()
  @Min(0)
  rating?: number;

  @IsDateString()
  @IsOptional()
  acceptedUseTerms?: string;

  @IsDateString()
  @IsOptional()
  statusDate?: string;

  @IsArray()
  @IsOptional()
  specialization?: string[];

  // TODO: чекнуть по какому полю будет привязка, после накатывания статики
  @IsString()
  @IsOptional()
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
  @IsOptional()
  id: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  oldValue?: string;

  @IsString()
  @IsOptional()
  newValue?: string;

  @IsDateString()
  @IsOptional()
  dateFrom?: string;

  @IsDateString()
  @IsOptional()
  dateTo?: string;

  @IsNumber()
  @IsOptional()
  limit?: number;
}
