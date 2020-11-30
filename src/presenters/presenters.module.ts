import { Module } from '@nestjs/common';
import { ApiModule } from './api';

@Module({
  imports: [ApiModule],
  exports: [ApiModule],
  providers: [],
})
export class PresentersModule {}
