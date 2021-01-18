import { Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional, ValidateNested } from 'class-validator';
import {
  BaseWhereFieldsDto,
  StringConditionDto,
  TWhereCriteria,
} from '@qlean/nestjs-typeorm-persistence-search';
import { hrm } from '../../../../proto/generated/app.proto';
import { IBlockingReason } from '../../../domain';

export class WhereFieldsDto extends BaseWhereFieldsDto
  implements TWhereCriteria<IBlockingReason>, hrm.core.BlockingReasonSearchRequest.IWhereFields {

  @IsOptional()
  @ValidateNested()
  @Type(() => StringConditionDto)
  readonly name?: StringConditionDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => StringConditionDto)
  readonly type?: StringConditionDto;

  @IsOptional()
  @IsBoolean()
  readonly isDeleted?: boolean;

  @IsOptional()
  @IsBoolean()
  isRecoverable?: boolean;

  @IsOptional()
  @IsBoolean()
  isAvailableForContractor?: boolean;

  @IsOptional()
  @IsBoolean()
  isInstant?: boolean;

  @IsOptional()
  @IsBoolean()
  isNeedRetraining?: boolean;

  @IsOptional()
  @IsBoolean()
  isCommonBlock?: boolean;
}
