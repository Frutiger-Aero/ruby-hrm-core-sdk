import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel, TModelID } from '@qlean/nestjs-typeorm-persistence-search';
import { IContract, CONTRACT_STATUS } from '../../../domain';
import { IsEnum, IsUUID } from 'class-validator';
import { WageModel } from '../wage/wage.model';
import { ProductModel } from '../product/product.model';
import { SpecializationModel } from '../specialization/specialization.model';
import { GradeModel } from '../wage/grade.model';
import { ContractorModel } from '../contractor/contractor.model';

@Entity({
  name: 'contracts',
})
export class ContractModel extends BaseModel<IContract> implements IContract {
  @IsEnum(CONTRACT_STATUS)
  @Column({ type: 'character varying', default: CONTRACT_STATUS.ACTIVE })
  readonly status: CONTRACT_STATUS;

  @ManyToOne(type => ProductModel, e => e.contracts)
  @JoinColumn({ name: 'product_id' })
  readonly product: ProductModel;

  @ManyToOne(type => SpecializationModel, e => e.contracts)
  @JoinColumn({ name: 'specialization_id' })
  readonly specialization: SpecializationModel;

  @ManyToOne(type => GradeModel, e => e.contracts)
  @JoinColumn({ name: 'grade_id' })
  readonly grade: GradeModel;

  @ManyToOne(type => WageModel, e => e.contracts)
  @JoinColumn({ name: 'wage_id' })
  readonly wage: WageModel;

  @ManyToOne(type => ContractorModel, e => e.contracts)
  @JoinColumn({ name: 'contractor_id' })
  readonly contractor: ContractorModel;
}
