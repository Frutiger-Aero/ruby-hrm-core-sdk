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
  readonly isRecoverable?: boolean;

  @IsOptional()
  @IsBoolean()
  readonly isAvailableForContractor?: boolean;

  @IsOptional()
  @IsBoolean()
  readonly isInstant?: boolean;

  @IsOptional()
  @IsBoolean()
  readonly isNeedRetraining?: boolean;

  @IsOptional()
  @IsBoolean()
  readonly isCommonBlock?: boolean;
}
