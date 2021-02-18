import { Module } from '@nestjs/common';
import { EventBusModule } from './event-bus';
import { PersistenceModule } from './persistence';
import { PlatformCoreModule } from './plt-core';

@Module({
  imports: [PersistenceModule, EventBusModule, PlatformCoreModule],
  exports: [PersistenceModule, EventBusModule, PlatformCoreModule],
  providers: [],
})
export class InfrastructureModule {}
