import { Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsString, Length, ValidateNested } from 'class-validator';
import { hrm } from '../../../../proto/generated/app.proto';
import { BLOCKING_TYPE, IBlockingReason } from '../../../domain';
import { RelationDto } from '../common';

export class BlockingReasonCreateDto implements Partial<IBlockingReason>, hrm.core.IBlockingReasonCreateRequest {
  @IsString()
  @Length(0, 128)
  readonly name: string;

  @IsEnum(BLOCKING_TYPE)
  readonly type: BLOCKING_TYPE;

  @IsBoolean()
  readonly isAvailableForContractor: boolean;

  @IsBoolean()
  readonly isInstant: boolean;

  @IsBoolean()
  readonly isNeedRetraining?: boolean;

  @IsBoolean()
  readonly isCommonBlock?: boolean;

  @IsBoolean()
  readonly isPermanent?: boolean;

  /** BlockingReasonCreateRequest group */
  @ValidateNested({ each: true })
  @Type(() => RelationDto)
  readonly group: RelationDto
}
