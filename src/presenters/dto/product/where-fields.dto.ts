import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import {
  BaseWhereFieldsDto,
  StringConditionDto,
  TWhereCriteria,
} from '@qlean/nestjs-typeorm-persistence-search';
import { hrm } from '../../../../proto/generated/app.proto';
import { IProduct } from '../../../domain';

export class WhereFieldsDto extends BaseWhereFieldsDto
  implements TWhereCriteria<IProduct>, hrm.core.ProductSearchRequest.IWhereFields {

  @IsOptional()
  @ValidateNested()
  @Type(() => StringConditionDto)
  readonly title?: StringConditionDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => StringConditionDto)
  readonly name?: StringConditionDto;

}
