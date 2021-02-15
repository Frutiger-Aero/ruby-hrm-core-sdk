import { Module } from '@nestjs/common';
import { OptionStore } from './option.store';

@Module({
  exports: [OptionStore],
  providers: [OptionStore],
})
export class OptionStoreModule {}
