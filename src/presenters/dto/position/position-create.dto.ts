import { IsString, Length } from 'class-validator';
import { hrm } from '../../../../proto/generated/app.proto';
import { IPosition } from '../../../domain';

export class PositionCreateDto implements Partial<IPosition>, hrm.core.IPositionCreateRequest {
  @IsString()
  @Length(0, 128)
  readonly title: string;

  @IsString()
  @Length(0, 128)
  readonly name: string;

}
