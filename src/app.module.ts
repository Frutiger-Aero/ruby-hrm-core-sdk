import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatsModule, StatsTransportEnum } from '@qlean/nestjs-stats';
import { PlatformModule } from './presenters/platform/platform.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    PlatformModule,
    StatsModule.forRoot({
      transport: StatsTransportEnum.PROMETHEUS,
      scrapedUrl: '/metrics'
    }),
  ],
})
export class AppModule {}
