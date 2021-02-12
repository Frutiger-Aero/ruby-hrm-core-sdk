import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { PACKAGE_API, apiOptions, ssoOptions } from './hrm-core.options';
import { ContractHrmApiAdapter } from './hrm-contract-hrm-api.adapter';
import { ContractorHrmApiAdapter } from './hrm-contractor-hrm-api.adapter';
import { PositionHrmApiAdapter } from './hrm-position-hrm-api.adapter';
import { SpecializationHrmApiAdapter } from './hrm-specialization-hrm-api.adapter';
import { WageHrmApiAdapter } from './hrm-wage-hrm-api.adapter';
import { BlockingReasonHrmApiAdapter } from './hrm-reason-hrm-api.adapter';
import { SkillHrmApiAdapter } from './hrm-skill-hrm-api.adapter';
import { BlockingReasonGroupHrmApiAdapter } from './hrm-reason-group-hrm-api.adapter';

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
    ContractorHrmApiAdapter,
    SpecializationHrmApiAdapter,
    PositionHrmApiAdapter,
    WageHrmApiAdapter,
    ContractHrmApiAdapter,
    BlockingReasonHrmApiAdapter,
    SkillHrmApiAdapter,
    BlockingReasonGroupHrmApiAdapter
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
    ContractorHrmApiAdapter,
    SpecializationHrmApiAdapter,
    PositionHrmApiAdapter,
    WageHrmApiAdapter,
    ContractHrmApiAdapter,
    BlockingReasonHrmApiAdapter,
    SkillHrmApiAdapter,
    BlockingReasonGroupHrmApiAdapter
  ],
})
export class HrmCoreModule {}
