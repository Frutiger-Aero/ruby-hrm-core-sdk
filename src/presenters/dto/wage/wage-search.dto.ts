import { Transform, Type } from 'class-transformer';
import { IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { IFindPaginateCriteria, SortFieldDto } from '@qlean/nestjs-typeorm-persistence-search';
import { hrm } from '../../../../proto/generated/app.proto';
import { IWage } from '../../../domain';
import { WhereFieldsDto } from './where-fields.dto';

export class WageSearchDto implements IFindPaginateCriteria<IWage>, hrm.core.IWageSearchRequest {
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
  readonly sort?: Array<SortFieldDto<IWage>>;

  @IsOptional()
  @ValidateNested()
  @Type(() => WhereFieldsDto)
  readonly where?: WhereFieldsDto[];
}
