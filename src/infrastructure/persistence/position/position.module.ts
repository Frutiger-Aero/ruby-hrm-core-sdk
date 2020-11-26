import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PositionModel } from './position.model';
import { PositionStore } from './position.store';

@Module({
  imports: [TypeOrmModule.forFeature([PositionModel])],
  exports: [PositionStore],
  providers: [PositionStore],
})
export class PositionModule {}
