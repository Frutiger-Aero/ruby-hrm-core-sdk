import { IsString, IsOptional, IsUUID, Length } from 'class-validator';
import { hrm } from '../../../../proto/generated/app.proto';
import { IPosition } from '../../../domain';

export class PositionRelationDto implements Partial<IPosition>, hrm.core.IPositionRelation {
  @IsUUID()
  readonly id: string;

  @IsOptional()
  @IsString()
  @Length(0, 128)
  readonly title: string;

  @IsOptional()
  @IsString()
  @Length(0, 128)
  readonly name: string;
}
