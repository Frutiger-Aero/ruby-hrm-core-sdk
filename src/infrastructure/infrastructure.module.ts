import { Module } from '@nestjs/common';
import { EventBusModule } from './event-bus';
import { PersistenceModule } from './persistence';
import { PltCoreModule } from './plt-core';

@Module({
  imports: [PersistenceModule, EventBusModule, PltCoreModule],
  exports: [PersistenceModule, EventBusModule, PltCoreModule],
  providers: [],
})
export class InfrastructureModule {}
