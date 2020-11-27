import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecializationModule } from './specialization';
import { ProductModule } from './product';
import { PositionModule } from './position';
import { TariffModule } from './tariff';
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
    TariffModule,
    ExecutorModule,
    ContractModule,
  ],
  exports: [
    TypeOrmModule,
    SpecializationModule,
    ProductModule,
    PositionModule,
    TariffModule,
    ExecutorModule,
    ContractModule,
  ],
})
export class PersistenceModule {}
