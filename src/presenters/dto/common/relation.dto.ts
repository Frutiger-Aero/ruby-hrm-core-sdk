import { IsUUID } from 'class-validator';
import { hrm } from '../../../../proto/generated/app.proto';

export class RelationDto implements hrm.core.IProductRelation, hrm.core.IPositionRelation, hrm.core.ISpecializationRelation, hrm.core.IContractRelation, hrm.core.IContractorRelation {
  @IsUUID()
  readonly id: string;
}
