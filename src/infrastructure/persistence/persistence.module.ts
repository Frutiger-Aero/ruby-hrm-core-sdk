import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecializationModule } from './specialization';
import { ProductModule } from './product';
import { GradeModule } from './grade';
import { CommissionModule } from './commission';
import { TariffModule } from './tariff';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      keepConnectionAlive: true,
    }),
    SpecializationModule,
    ProductModule,
    GradeModule,
    CommissionModule,
    TariffModule,
  ],
  exports: [
    TypeOrmModule,
    SpecializationModule,
    ProductModule,
    GradeModule,
    CommissionModule,
    TariffModule,
  ],
})
export class PersistenceModule {}
