import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecializationModule } from './specialization';
import { ProductModule } from './product';
import { PositionModule } from './position';
import { WageModule } from './wage';
import { ExecutorModule } from '../../core/executor/executor.module';
import { ContractModule } from './contract';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      keepConnectionAlive: true,
    }),
    SpecializationModule,
    ProductModule,
    PositionModule,
    WageModule,
    ExecutorModule,
    ContractModule,
  ],
  exports: [
    TypeOrmModule,
    SpecializationModule,
    ProductModule,
    PositionModule,
    WageModule,
    ExecutorModule,
    ContractModule,
  ],
})
export class PersistenceModule {}
