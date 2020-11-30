import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatsModule, StatsTransportEnum } from '@qlean/nestjs-stats';
import { InfrastructureModule } from './infrastructure';
import { CoreModule } from './core';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    InfrastructureModule,
    CoreModule,
    StatsModule.forRoot({
      transport: StatsTransportEnum.PROMETHEUS,
      scrapedUrl: '/metrics',
    }),
  ],
})
export class AppModule {}
