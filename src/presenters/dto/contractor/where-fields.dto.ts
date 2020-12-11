
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
  @Type(() => UuidConditionDto)
  readonly userId?: UuidConditionDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => StringConditionDto)
  readonly workStatus?: StringConditionDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => StringConditionDto)
  readonly status?: StringConditionDto;
}
