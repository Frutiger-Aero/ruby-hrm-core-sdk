import { Column, Entity, OneToMany } from 'typeorm';
import { BaseModel } from '@qlean/nestjs-typeorm-persistence-search';
import { IProduct } from '../../../domain';
import { IsString } from 'class-validator';
import { WageModel } from '../wage/wage.model';
import { ContractModel } from '../contract/contract.model';

@Entity({
  name: 'products',
})
export class ProductModel extends BaseModel<IProduct> implements IProduct {
  @IsString()
  @Column({ length: 128 })
  readonly title: string;

  @IsString()
  @Column({ length: 128, unique: true })
  readonly name: string;

  @OneToMany(type => WageModel, e => e.product)
  readonly wages: WageModel[];

  @OneToMany(type => ContractModel, e => e.product)
  readonly contracts: ContractModel[];
}
