import { Module } from '@nestjs/common';
import { EventBusModule } from './event-bus';
import { PersistenceModule } from './persistence';

@Module({
  imports: [PersistenceModule, EventBusModule],
  exports: [PersistenceModule, EventBusModule],
  providers: [],
})
export class InfrastructureModule {}
