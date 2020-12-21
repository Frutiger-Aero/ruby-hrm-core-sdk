import { Module } from '@nestjs/common';
import { CatalogModule, ReasonService } from './catalog';
import { WageModule } from './wage';
import { ContractModule } from './contract';
import { ContractorModule } from './contractor';

@Module({
  imports: [CatalogModule, WageModule, ContractModule, ContractorModule],
  exports: [CatalogModule, WageModule, ContractModule, ContractorModule],
  providers: [],
})
export class CoreModule {}
