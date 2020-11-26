import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseModel } from '@qlean/nestjs-typeorm-persistence-search';
import { IsString } from 'class-validator';
import { ITariff } from '../../../core/interfaces';
import { SpecializationModel } from '../specialization/specialization.model';
import { ProductModel } from '../product/product.model';
import { GridModel } from './grid.model';

@Entity({
  name: 'tariffs',
})
export class TariffModel extends BaseModel<ITariff> {
  @IsString()
  @Column({ length: 128, unique: true })
  name: string;

  @ManyToOne(type => SpecializationModel, e => e.tariffs)
  @JoinColumn()
  readonly specialization: SpecializationModel;

  @ManyToOne(type => ProductModel, e => e.tariffs)
  @JoinColumn()
  readonly product: ProductModel;

  @OneToMany(type => GridModel, e => e.tariff, {
    eager: true,
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  readonly grids: GridModel[];
}
