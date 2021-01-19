import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../../infrastructure';
import { BlockContractorService } from './block-contractor.service';
import { FreezeContractorService } from './freeze-contractor.service';
import { ContractorService } from './contractor.service';
import { ActivateContractorService } from './activate-contractor.service';

@Module({
  imports: [ InfrastructureModule ],
  exports: [ ContractorService],
  providers: [ ContractorService, BlockContractorService, FreezeContractorService, ActivateContractorService],
})
export class ContractorModule {}
