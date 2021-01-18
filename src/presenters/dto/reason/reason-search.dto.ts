import { Transform, Type } from 'class-transformer';
import { IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { IFindPaginateCriteria, SortFieldDto } from '@qlean/nestjs-typeorm-persistence-search';
import { hrm } from '../../../../proto/generated/app.proto';
import { IBlockingReason } from '../../../domain';
import { WhereFieldsDto } from './where-fields.dto';

export class BlockingReasonSearchDto implements IFindPaginateCriteria<IBlockingReason>, hrm.core.IBlockingReasonSearchRequest {
  @IsNumber()
  @Transform(Number)
  readonly page: number;

  @IsOptional()
  @IsNumber()
  @Transform(Number)
  readonly limit?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => WhereFieldsDto)
  readonly where?: WhereFieldsDto[];
}
