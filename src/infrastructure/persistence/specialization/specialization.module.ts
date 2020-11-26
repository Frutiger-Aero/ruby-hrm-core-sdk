import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecializationModel } from './specialization.model';
import { SpecializationStore } from './specialization.store';

@Module({
  imports: [TypeOrmModule.forFeature([SpecializationModel])],
  exports: [SpecializationStore],
  providers: [SpecializationStore],
})
export class SpecializationModule {}
