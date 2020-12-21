import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecializationPersistenceModule } from './specialization';
import { ProductPersistenceModule } from './product';
import { PositionPersistenceModule } from './position';
import { WagePersistenceModule } from './wage';
import { ContractPersistenceModule } from './contract';
import { ContractorPersistenceModule } from './contractor';
import { ReasonPersistenceModule } from './reason';
import { RevisionHistoryModule } from './revision-history';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      keepConnectionAlive: true,
    }),
    SpecializationPersistenceModule,
    ProductPersistenceModule,
    PositionPersistenceModule,
    WagePersistenceModule,
    ContractPersistenceModule,
    ContractorPersistenceModule,
    ReasonPersistenceModule,
    RevisionHistoryModule
  ],
  exports: [
    TypeOrmModule,
    SpecializationPersistenceModule,
    ProductPersistenceModule,
    PositionPersistenceModule,
    WagePersistenceModule,
    ContractPersistenceModule,
    ContractorPersistenceModule,
    ReasonPersistenceModule,
    RevisionHistoryModule
  ],
})
export class PersistenceModule {}
