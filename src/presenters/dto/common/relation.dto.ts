import { IsUUID } from 'class-validator';
import { hrm } from '../../../../proto/generated/app.proto';

export class RelationDto implements hrm.core.IPositionRelation, hrm.core.ISpecializationRelation {
  @IsUUID()
  readonly id: string;
}
