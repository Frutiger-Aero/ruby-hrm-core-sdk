import { IsString, IsOptional, IsUUID, Length } from 'class-validator';
import { hrm } from '../../../../proto/generated/app.proto';
import { IPosition } from '../../../domain';

export class PositionUpdateDto implements Partial<IPosition>, hrm.core.IPositionUpdateRequest {
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
