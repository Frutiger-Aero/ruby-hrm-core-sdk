
import { Type } from 'class-transformer';
import { IsBoolean, IsEmail, IsEnum, IsOptional, ValidateNested } from 'class-validator';
import {
  BaseWhereFieldsDto,
  StringConditionDto,
  TWhereCriteria, UuidConditionDto,
} from '@qlean/nestjs-typeorm-persistence-search';
import { hrm } from '../../../../proto/generated/app.proto';
import { IWage, PERSON_STATUS, WORK_STATUS } from '../../../domain';

export class WhereFieldsDto extends BaseWhereFieldsDto
  implements TWhereCriteria<IWage>, hrm.core.ContractorSearchRequest.IWhereFields {

  @IsOptional()
  @ValidateNested()
  @Type(() => UuidConditionDto)
  readonly id?: UuidConditionDto;

  @IsOptional()
  @IsBoolean()
  readonly isDeleted?: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => StringConditionDto)
  readonly status?: StringConditionDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => UuidConditionDto)
  readonly productId?: UuidConditionDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => UuidConditionDto)
  readonly specializationId?: UuidConditionDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => UuidConditionDto)
  readonly gradeId?: UuidConditionDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => UuidConditionDto)
  readonly wageId?: UuidConditionDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => UuidConditionDto)
  readonly contractorId?: UuidConditionDto;
}