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
import { SkillPersistenceModule } from './skill';
import { ReasonGroupPersistenceModule } from './reason-group';

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
    SkillPersistenceModule,
    RevisionHistoryModule,
    ReasonGroupPersistenceModule
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
    RevisionHistoryModule,
    SkillPersistenceModule,
    ReasonGroupPersistenceModule
  ],
})
export class PersistenceModule {}
