import { Module } from '@nestjs/common';
import { PersistenceModule } from './persistence';

@Module({
  imports: [PersistenceModule],
  exports: [PersistenceModule],
  providers: [],
})
export class InfrastructureModule {}
