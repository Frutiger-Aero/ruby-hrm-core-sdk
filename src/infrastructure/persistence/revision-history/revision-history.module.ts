import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RevisionHistoryModel } from './revision-history.model';
import { RevisionHistoryStore } from './revision-history.store';

@Module({
  imports: [TypeOrmModule.forFeature([RevisionHistoryModel])],
  exports: [RevisionHistoryStore],
  providers: [RevisionHistoryStore],
})
export class RevisionHistoryModule {}
