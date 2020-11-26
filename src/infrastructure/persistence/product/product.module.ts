import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModel } from './product.model';
import { ProductStore } from './product.store';

@Module({
  imports: [TypeOrmModule.forFeature([ProductModel])],
  exports: [ProductStore],
  providers: [ProductStore],
})
export class ProductModule {}
