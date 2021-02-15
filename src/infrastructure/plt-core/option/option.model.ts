
import { IOption } from '../../../domain';
import { IsString } from 'class-validator';

export class OptionModel implements IOption {
  @IsString()
  readonly id: string;

  @IsString()
  readonly title: string;

  @IsString()
  readonly name: string;
}
