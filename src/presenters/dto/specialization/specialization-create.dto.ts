import { IsString, Length } from 'class-validator';
import { hrm } from '../../../../proto/generated/app.proto';
import { ISpecialization } from '../../../domain';

export class SpecializationCreateDto implements Partial<ISpecialization>, hrm.core.ISpecializationCreateRequest {
  @IsString()
  @Length(0, 128)
  readonly title: string;

  @IsString()
  @Length(0, 128)
  readonly name: string;

}
