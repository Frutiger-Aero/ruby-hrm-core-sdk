import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { BaseModel, TModelID } from '@qlean/nestjs-typeorm-persistence-search';
import { IContract, CONTRACT_STATUS } from '../../../domain';
import { IsEnum, IsUUID } from 'class-validator';
import { WageModel } from '../wage/wage.model';
import { ProductModel } from '../product/product.model';
import { SpecializationModel } from '../specialization/specialization.model';
import { GradeModel } from '../wage/grade.model';
import { ContractorModel } from '../contractor/contractor.model';
import { SkillModel } from '../skill/skill.model';

@Entity({
  name: 'contracts',
})
export class ContractModel extends BaseModel<IContract> implements IContract {
  @IsEnum(CONTRACT_STATUS)
  @Column({ type: 'character varying', default: CONTRACT_STATUS.ACTIVE })
  readonly status: CONTRACT_STATUS;

  @ManyToOne(type => ProductModel, e => e.contracts)
  @JoinColumn({ name: 'product_id' })
  @Index('idx-contracts-product_id')
  readonly product: ProductModel;

  @Column({ name: 'product_id' })
  readonly productId: string;

  @ManyToOne(type => SpecializationModel, e => e.contracts)
  @JoinColumn({ name: 'specialization_id' })
  @Index('idx-contracts-specialization_id')
  readonly specialization: SpecializationModel;

  @Column({ name: 'specialization_id' })
  readonly specializationId: string;

  @ManyToOne(type => GradeModel, e => e.contracts)
  @JoinColumn({ name: 'grade_id' })
  @Index('idx-contracts-grade_id')
  readonly grade: GradeModel;

  @Column({ name: 'grade_id' })
  readonly gradeId: string;

  @ManyToOne(type => WageModel, e => e.contracts)
  @JoinColumn({ name: 'wage_id' })
  @Index('idx-contracts-wage_id')
  readonly wage: WageModel;

  @Column({ name: 'wage_id' })
  readonly wageId: string;

  @ManyToOne(type => ContractorModel, e => e.contracts)
  @JoinColumn({ name: 'contractor_id' })
  @Index('idx-contracts-contractor_id')
  readonly contractor: ContractorModel;

  @Column({ name: 'contractor_id' })
  readonly contractorId: string;

  @ManyToMany(() => SkillModel)
  @JoinTable({ name: 'contracts_skills'})
  readonly skills: SkillModel[]
}
