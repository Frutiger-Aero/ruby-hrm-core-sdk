import { Column, Entity, OneToMany } from 'typeorm';
import { BaseModel } from '@qlean/nestjs-typeorm-persistence-search';
import { IProduct } from '../../../core/interfaces';
import { IsString } from 'class-validator';
import { TariffModel } from '../tariff/tariff.model';

@Entity({
  name: 'products',
})
export class ProductModel extends BaseModel<IProduct> {
  @IsString()
  @Column({ length: 128 })
  title: string;

  @IsString()
  @Column({ length: 128, unique: true })
  name: string;

  @OneToMany(type => TariffModel, e => e.product)
  readonly tariffs: TariffModel[];
}
