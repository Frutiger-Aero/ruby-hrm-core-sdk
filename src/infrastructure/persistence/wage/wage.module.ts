import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WageModel } from './wage.model';
import { WageStore } from './wage.store';
import { GradeModel } from './grade.model';
import { CompensationModel } from './compensation.model';

@Module({
  imports: [TypeOrmModule.forFeature([CompensationModel, GradeModel, WageModel])],
  exports: [WageStore],
  providers: [WageStore],
})
export class WageModule {}
