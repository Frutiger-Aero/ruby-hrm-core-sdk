import { Module } from '@nestjs/common';
import { CatalogModule } from './catalog';

@Module({
  imports: [CatalogModule],
  exports: [CatalogModule],
  providers: [],
})
export class CoreModule {}
