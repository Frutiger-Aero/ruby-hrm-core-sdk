import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractorModel } from './contractor.model';
import { ContractorStore } from './contractor.store';

@Module({
  imports: [TypeOrmModule.forFeature([ContractorModel])],
  providers: [ContractorStore],
  exports: [ContractorStore],
})
export class ContractorPersistenceModule {}
