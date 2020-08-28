import { Module } from '@nestjs/common';
import { PLTJWTModule } from '@qlean/sso-sdk';
import { authOptions } from '../../app.options';
import { ExecutorController } from './executor.controller';
import { ExecutorModule } from '../../core/executor/executor.module';
import { BookingModule } from '../../core/booking/booking.module';

@Module({
  imports: [
    ExecutorModule,
    BookingModule,
    PLTJWTModule.forRoot(authOptions),
  ],
  controllers: [ExecutorController],
  providers: [],
})
export class PlatformModule {}
