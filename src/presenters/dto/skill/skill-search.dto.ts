import { Transform, Type } from 'class-transformer';
import { IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { IFindPaginateCriteria, SortFieldDto } from '@qlean/nestjs-typeorm-persistence-search';
import { hrm } from '../../../../proto/generated/app.proto';
import { ISkill } from '../../../domain';
import { WhereFieldsDto } from './where-fields.dto';

export class SkillSearchDto implements IFindPaginateCriteria<ISkill>, hrm.core.ISkillSearchRequest {
  @IsNumber()
  @Transform(Number)
  readonly page: number;

  @IsOptional()
  @IsNumber()
  @Transform(Number)
  readonly limit?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => SortFieldDto)
  readonly sort?: Array<SortFieldDto<ISkill>>;

  @IsOptional()
  @ValidateNested()
  @Type(() => WhereFieldsDto)
  readonly where?: WhereFieldsDto[];
}
