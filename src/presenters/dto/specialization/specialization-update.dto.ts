import { IsString, IsOptional, IsUUID, Length } from 'class-validator';
import { hrm } from '../../../../proto/generated/app.proto';
import { ISpecialization } from '../../../domain';

export class SpecializationUpdateDto implements Partial<ISpecialization>, hrm.core.ISpecializationUpdateRequest {
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
