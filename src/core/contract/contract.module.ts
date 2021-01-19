import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../../infrastructure';
import { BlockContractService } from './block-contract.service';
import { ContractService } from './contract.service';
import { CreateContractService } from './create-contract.service';

@Module({
  imports: [ InfrastructureModule ],
  exports: [ ContractService],
  providers: [ ContractService, BlockContractService, CreateContractService],
})
export class ContractModule {}
