import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TariffModel } from './tariff.model';
import { TariffStore } from './tariff.store';
import { GridModel } from './grid.model';

@Module({
  imports: [TypeOrmModule.forFeature([GridModel, TariffModel])],
  exports: [TariffStore],
  providers: [TariffStore],
})
export class TariffModule {}
