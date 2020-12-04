import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import {
  BaseWhereFieldsDto,
  StringConditionDto,
  TWhereCriteria, UuidConditionDto,
} from '@qlean/nestjs-typeorm-persistence-search';
import { hrm } from '../../../../proto/generated/app.proto';
import { IWage } from '../../../domain';

export class WhereFieldsDto extends BaseWhereFieldsDto
  implements TWhereCriteria<IWage>, hrm.core.WageSearchRequest.IWhereFields {

  @IsOptional()
  @ValidateNested()
  @Type(() => StringConditionDto)
  readonly name?: StringConditionDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => UuidConditionDto)
  readonly productId?: UuidConditionDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => UuidConditionDto)
  readonly specializationId?: UuidConditionDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => UuidConditionDto)
  readonly regionId?: UuidConditionDto;

}
