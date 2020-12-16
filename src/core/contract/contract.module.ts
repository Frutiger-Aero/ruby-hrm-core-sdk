import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../../infrastructure';
import { ContractService } from './contract.service';

@Module({
  imports: [ InfrastructureModule ],
  exports: [ ContractService],
  providers: [ ContractService],
})
export class ContractModule {}
