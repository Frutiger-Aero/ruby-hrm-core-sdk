import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../../infrastructure';
import { ContractorService } from './contractor.service';

@Module({
  imports: [ InfrastructureModule ],
  exports: [ ContractorService],
  providers: [ ContractorService],
})
export class ContractorModule {}
