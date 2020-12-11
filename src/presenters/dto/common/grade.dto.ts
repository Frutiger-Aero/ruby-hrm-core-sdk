import { IsOptional, IsUUID, ValidateNested } from 'class-validator';
import { hrm } from '../../../../proto/generated/app.proto';
import { IGrade } from '../../../domain';
import { Type } from 'class-transformer';
import { PositionRelationDto } from '../position';
import { CompensationDto } from './compensation.dto';
import { RateDto } from './rate.dto';

export class GradeDto implements Partial<IGrade>, hrm.core.IGrade {
  @IsOptional()
  @IsUUID()
  readonly id: string;

  @ValidateNested()
  @Type(() => PositionRelationDto)
  readonly position: PositionRelationDto;

  @ValidateNested()
  @Type(() => RateDto)
  readonly rate: RateDto;

  @ValidateNested({ each: true })
  @Type(() => CompensationDto)
  readonly compensations: CompensationDto[];
}
