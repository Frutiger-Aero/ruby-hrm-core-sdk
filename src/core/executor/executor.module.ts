import { Module } from '@nestjs/common';
import { ExecutorService } from './executor.service';
import {ExecutorModuleInfra} from "../../infrastructure/executor";

@Module({
  imports: [ExecutorModuleInfra],
  providers: [ExecutorService],
  exports: [ExecutorService],
})
export class ExecutorModule {}
