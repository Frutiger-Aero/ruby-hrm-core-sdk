import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from '@qlean/nestjs-typeorm-persistence-search';
import { IContract, CONTRACT_STATUS } from '../../../domain';
import { IsEnum } from 'class-validator';
import { WageModel } from '../wage/wage.model';
import { ProductModel } from '../product/product.model';
import { SpecializationModel } from '../specialization/specialization.model';
import { GradeModel } from '../wage/grade.model';
import { ExecutorModel } from '../executor/executor.model';

@Entity({
  name: 'contracts',
})
export class ContractModel extends BaseModel<IContract> implements IContract {
  @IsEnum(CONTRACT_STATUS)
  @Column({ default: CONTRACT_STATUS.ACTIVE })
  readonly status: CONTRACT_STATUS;

  @ManyToOne(type => ProductModel, e => e.contracts)
  @JoinColumn()
  readonly product: ProductModel;

  @ManyToOne(type => SpecializationModel, e => e.contracts)
  @JoinColumn()
  readonly specialization: SpecializationModel;

  @ManyToOne(type => GradeModel, e => e.contracts)
  readonly grade: GradeModel;

  @ManyToOne(type => WageModel, e => e.contracts)
  @JoinColumn()
  readonly wage: WageModel;

  @ManyToOne(type => ExecutorModel, e => e.contracts)
  @JoinColumn()
  readonly executor: ExecutorModel;
}
