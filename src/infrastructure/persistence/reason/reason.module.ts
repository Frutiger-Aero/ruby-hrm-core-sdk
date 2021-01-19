import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockingReasonModel } from './blocking-reason.model';
import { BlockingReasonStore } from './reason.store';

@Module({
  imports: [TypeOrmModule.forFeature([BlockingReasonModel])],
  providers: [BlockingReasonStore],
  exports: [BlockingReasonStore],
})
export class ReasonPersistenceModule {}
