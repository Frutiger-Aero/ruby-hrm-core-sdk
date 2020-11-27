import { Column, Entity, OneToMany } from 'typeorm';
import { BaseModel } from '@qlean/nestjs-typeorm-persistence-search';
import { IProduct } from '../../../core/interfaces';
import { IsString } from 'class-validator';
import { TariffModel } from '../tariff/tariff.model';
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

  @OneToMany(type => TariffModel, e => e.product)
  readonly tariffs: TariffModel[];

  @OneToMany(type => ContractModel, e => e.product)
  readonly contracts: ContractModel[];
}
