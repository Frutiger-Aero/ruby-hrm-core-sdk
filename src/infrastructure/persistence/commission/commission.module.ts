import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommissionModel } from './commission.model';
import { CommissionStore } from './commission.store';

@Module({
  imports: [TypeOrmModule.forFeature([CommissionModel])],
  exports: [CommissionStore],
  providers: [CommissionStore],
})
export class CommissionModule {}
