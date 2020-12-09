import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { PACKAGE_API, apiOptions, ssoOptions } from './hrm-core.options';
import { HrmExecutorApi } from './hrm-executor.api';
import { PositionHrmApiAdapter } from './hrm-position-hrm-api.adapter';
import { SpecializationHrmApiAdapter } from './hrm-specialization-hrm-api.adapter';
import { WageHrmApiAdapter } from './hrm-wage-hrm-api.adapter';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PACKAGE_API,
        ...apiOptions,
      },
    ]),
  ],
  exports: [
    HrmCoreModule,
    HrmExecutorApi,
    SpecializationHrmApiAdapter,
    PositionHrmApiAdapter,
    WageHrmApiAdapter
  ],
  providers: [
    {
      provide: 'SSO_OPTIONS',
      useValue: ssoOptions,
    },
    {
      provide: 'TOKEN_SOURCE',
      useValue: null,
    },
    HrmCoreModule,
    HrmExecutorApi,
    SpecializationHrmApiAdapter,
    PositionHrmApiAdapter,
    WageHrmApiAdapter
  ],
})
export class HrmCoreModule {}
