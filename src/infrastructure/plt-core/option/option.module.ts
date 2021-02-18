import { Module } from '@nestjs/common';
import { OptionStore } from './option.store';
import { PltCoreModule } from '@qlean/plt-core-sdk';

@Module({
  imports: [PltCoreModule],
  exports: [OptionStore],
  providers: [OptionStore],
})
export class OptionStoreModule {}
