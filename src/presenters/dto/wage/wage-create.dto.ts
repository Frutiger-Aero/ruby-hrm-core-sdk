import { IsString, Length } from 'class-validator';
import { hrm } from '../../../../proto/generated/app.proto';
import { IWage } from '../../../domain';

export class WageCreateDto implements Partial<IWage>, hrm.core.IWageCreateRequest {
  @IsString()
  @Length(0, 128)
  readonly title: string;

  @IsString()
  @Length(0, 128)
  readonly name: string;

}
