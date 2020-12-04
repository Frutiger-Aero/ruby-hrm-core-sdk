import { Module } from '@nestjs/common';
import { ProductPersistenceModule, SpecializationPersistenceModule, PositionPersistenceModule, WagePersistenceModule } from '../../infrastructure';
import { ProductService } from './product.service';
import { PositionService } from './position.service';
import { SpecializationService } from './specialization.service';
import { WageService } from './wage.service';

@Module({
  imports: [ProductPersistenceModule, SpecializationPersistenceModule, PositionPersistenceModule, WagePersistenceModule],
  exports: [ProductService, PositionService, SpecializationService, WageService],
  providers: [ProductService, PositionService, SpecializationService, WageService],
})
export class CatalogModule {}
