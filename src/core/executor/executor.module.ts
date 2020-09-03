import { Module } from '@nestjs/common';
import { ExecutorService } from './executor.service';
import { ExecutorModuleInfra } from '../../infrastructure/executor';
import { TariffModule } from '../../infrastructure/tariff/tariff.module';
import { SpecializationModule } from '../../infrastructure/specialization/specialization.module';
import { CitizenshipModule } from '../../infrastructure/citizenship/citizenship.module';
import {LogModule} from "../../infrastructure/log/log.module";

@Module({
  imports: [
    ExecutorModuleInfra,
    TariffModule,
    SpecializationModule,
    CitizenshipModule,
    LogModule,
  ],
  providers: [ExecutorService],
  exports: [ExecutorService],
})
export class ExecutorModule {}
