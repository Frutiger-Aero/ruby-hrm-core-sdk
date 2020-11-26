import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GradeModel } from './grade.model';
import { GradeStore } from './grade.store';

@Module({
  imports: [TypeOrmModule.forFeature([GradeModel])],
  exports: [GradeStore],
  providers: [GradeStore],
})
export class GradeModule {}
