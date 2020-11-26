import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExecutorModel } from './executor.model';
import { ExecutorStore } from './executor.store';

@Module({
  imports: [TypeOrmModule.forFeature([ExecutorModel])],
  providers: [ExecutorStore],
  exports: [ExecutorStore],
})
export class ExecutorModuleInfra {}
