import { IsOptional, IsUUID } from 'class-validator';
import { hrm } from '../../../../proto/generated/app.proto';
import { IGrade } from '../../../domain';

export class GradeRelationDto implements Partial<IGrade>, hrm.core.IGrade {
  @IsOptional()
  @IsUUID()
  readonly id: string;
}
