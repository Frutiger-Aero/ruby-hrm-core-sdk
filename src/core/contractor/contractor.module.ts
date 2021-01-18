import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../../infrastructure';
import { BlockContractorService } from './block.service';
import { ContractorService } from './contractor.service';

@Module({
  imports: [ InfrastructureModule ],
  exports: [ ContractorService],
  providers: [ ContractorService, BlockContractorService],
})
export class ContractorModule {}
