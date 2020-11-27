import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from '@qlean/nestjs-typeorm-persistence-search';
import { IContract, CONTRACT_STATUS } from '../../../core/interfaces';
import { IsEnum } from 'class-validator';
import { TariffModel } from '../tariff/tariff.model';
import { ProductModel } from '../product/product.model';
import { SpecializationModel } from '../specialization/specialization.model';
import { GradeModel } from '../tariff/grade.model';
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

  @ManyToOne(type => TariffModel, e => e.contracts)
  @JoinColumn()
  readonly tariff: TariffModel;

  @ManyToOne(type => ExecutorModel, e => e.contracts)
  @JoinColumn()
  readonly executor: ExecutorModel;
}
