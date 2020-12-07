import { Module } from '@nestjs/common';
import { ContractorPersistenceModule } from '../../infrastructure';
import { ContractService } from './contract.service';

@Module({
  imports: [ ContractorPersistenceModule ],
  exports: [ ContractService],
  providers: [ ContractService],
})
export class ContractModule {}
