import { Module } from '@nestjs/common';
import { CatalogModule } from './catalog';
import { WageModule } from './wage';

@Module({
  imports: [CatalogModule, WageModule],
  exports: [CatalogModule, WageModule],
  providers: [],
})
export class CoreModule {}
