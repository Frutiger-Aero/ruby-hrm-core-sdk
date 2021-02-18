import { Module } from '@nestjs/common';
import { ProductStore } from './product.store';
import { PltCoreModule } from '@qlean/plt-core-sdk';
@Module({
  imports: [PltCoreModule],
  exports: [ProductStore],
  providers: [ProductStore],
})
export class ProductStoreModule {}
