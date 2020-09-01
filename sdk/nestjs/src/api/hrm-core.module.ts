import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { PACKAGE_API, apiOptions, ssoOptions } from './hrm-core.options';
import { HrmExecutorApi } from './hrm-executor.api';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PACKAGE_API,
        ...apiOptions,
      },
    ]),
  ],
  exports: [HrmCoreModule, HrmExecutorApi],
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
  ],
})
export class HrmCoreModule {}
