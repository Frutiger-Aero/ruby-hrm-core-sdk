import { Module } from '@nestjs/common';
import { ContractPersistenceModule } from '../../infrastructure';
import { ContractService } from './contract.service';

@Module({
  imports: [ ContractPersistenceModule ],
  exports: [ ContractService],
  providers: [ ContractService],
})
export class ContractModule {}
