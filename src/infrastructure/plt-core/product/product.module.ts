import { Module } from '@nestjs/common';
import { ProductStore } from './product.store';

@Module({
  exports: [ProductStore],
  providers: [ProductStore],
})
export class ProductStoreModule {}
