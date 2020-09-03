import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogModel } from './log.model';
import { LogStore } from './log.store';

@Module({
  imports: [TypeOrmModule.forFeature([LogModel])],
  exports: [LogStore],
  providers: [LogStore],
})
export class LogModule {}
