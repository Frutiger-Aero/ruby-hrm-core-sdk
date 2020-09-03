import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitizenshipModel } from './citizenship.model';
import { CitizenshipStore } from './citizenship.store';

@Module({
  imports: [TypeOrmModule.forFeature([CitizenshipModel])],
  exports: [CitizenshipStore],
  providers: [CitizenshipStore],
})
export class CitizenshipModule {}
