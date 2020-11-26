import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TariffModel } from './tariff.model';
import { TariffStore } from './tariff.store';
import { GradeModel } from './grade.model';

@Module({
  imports: [TypeOrmModule.forFeature([GradeModel, TariffModel])],
  exports: [TariffStore],
  providers: [TariffStore],
})
export class TariffModule {}
