import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseModel } from '@qlean/nestjs-typeorm-persistence-search';
import { IsString } from 'class-validator';
import { IWage } from '../../../domain';
import { SpecializationModel } from '../specialization/specialization.model';
import { ContractModel } from '../contract/contract.model';
import { ProductModel } from '../product/product.model';
import { GradeModel } from './grade.model';

@Entity({
  name: 'wages',
})
export class WageModel extends BaseModel<IWage> implements IWage {
  @IsString()
  @Column({ length: 128, unique: true })
  readonly name: string;

  @ManyToOne(type => SpecializationModel, e => e.wages)
  @JoinColumn()
  readonly specialization: SpecializationModel;

  @ManyToOne(type => ProductModel, e => e.wages)
  @JoinColumn()
  readonly product: ProductModel;

  @OneToMany(type => GradeModel, e => e.wage, {
    eager: true,
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  readonly grades: GradeModel[];

  @OneToMany(type => ContractModel, e => e.wage)
  readonly contracts: ContractModel[];

}
