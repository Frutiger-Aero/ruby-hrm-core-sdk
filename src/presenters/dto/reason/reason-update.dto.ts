
import { Type } from 'class-transformer';
import { IsString, IsOptional, IsUUID, Length, IsEnum, IsBoolean, ValidateNested } from 'class-validator';
import { RelationDto } from '../common';
import { hrm } from '../../../../proto/generated/app.proto';
import { BLOCKING_TYPE, IBlockingReason } from '../../../domain';

export class BlockingReasonUpdateDto implements Partial<IBlockingReason>, hrm.core.IBlockingReasonUpdateRequest {
  @IsUUID()
  readonly id: string;

  @IsString()
  @Length(0, 128)
  @IsOptional()
  readonly name: string;

  @IsEnum(BLOCKING_TYPE)
  @IsOptional()
  readonly type: BLOCKING_TYPE;

  @IsBoolean()
  @IsOptional()
  readonly isAvailableForContractor: boolean;

  @IsBoolean()
  @IsOptional()
  readonly isInstant: boolean;

  @IsBoolean()
  @IsOptional()
  readonly isNeedRetraining?: boolean;

  @IsBoolean()
  @IsOptional()
  readonly isCommonBlock?: boolean;

  @IsBoolean()
  @IsOptional()
  readonly isRecoverable?: boolean;

  /** BlockingReasonCreateRequest group */
  @ValidateNested({ each: true })
  @Type(() => RelationDto)
  @IsOptional()
  readonly group: RelationDto
}
