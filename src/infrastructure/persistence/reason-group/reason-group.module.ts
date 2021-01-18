import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockingReasonGroupModel } from './blocking-reason-group.model';
import { ReasonGroupStore } from './reason-group.store';

@Module({
  imports: [TypeOrmModule.forFeature([BlockingReasonGroupModel])],
  providers: [ReasonGroupStore],
  exports: [ReasonGroupStore],
})
export class ReasonGroupPersistenceModule {}
