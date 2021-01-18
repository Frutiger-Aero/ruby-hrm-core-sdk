import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockingReasonModel } from './blocking-reason.model';
import { ReasonStore } from './reason.store';

@Module({
  imports: [TypeOrmModule.forFeature([BlockingReasonModel])],
  providers: [ReasonStore],
  exports: [ReasonStore],
})
export class ReasonPersistenceModule {}
