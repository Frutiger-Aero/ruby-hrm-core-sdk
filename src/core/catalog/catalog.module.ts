import { Module } from '@nestjs/common';
import { ProductPersistenceModule, SpecializationPersistenceModule, PositionPersistenceModule } from '../../infrastructure';
import { ProductService } from './product.service';
import { PositionService } from './position.service';
import { SpecializationService } from './specialization.service';

@Module({
  imports: [ProductPersistenceModule, SpecializationPersistenceModule, PositionPersistenceModule],
  exports: [ProductService, PositionService, SpecializationService],
  providers: [ProductService, PositionService, SpecializationService],
})
export class CatalogModule {}
