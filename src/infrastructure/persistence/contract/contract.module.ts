import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractModel } from './contract.model';
import { ContractStore } from './contract.store';

@Module({
  imports: [TypeOrmModule.forFeature([ContractModel])],
  exports: [ContractStore],
  providers: [ContractStore],
})
export class ContractModule {}
