import { Module } from '@nestjs/common';
import { ContractorPersistenceModule } from '../../infrastructure';
import { ContractorService } from './contractor.service';

@Module({
  imports: [ ContractorPersistenceModule ],
  exports: [ ContractorService],
  providers: [ ContractorService],
})
export class ContractorModule {}
