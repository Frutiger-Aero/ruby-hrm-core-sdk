import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../../infrastructure';
import { ProductService } from './product.service';
import { PositionService } from './position.service';
import { SpecializationService } from './specialization.service';
import { ReasonService } from './reason.service';

@Module({
  imports: [InfrastructureModule],
  exports: [ProductService, PositionService, SpecializationService, ReasonService],
  providers: [ProductService, PositionService, SpecializationService, ReasonService],
})
export class CatalogModule {}
