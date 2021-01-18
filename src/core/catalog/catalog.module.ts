import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../../infrastructure';
import { ProductService } from './product.service';
import { PositionService } from './position.service';
import { SpecializationService } from './specialization.service';
import { ReasonService } from './reason.service';
import { SkillService } from './skill.service';
import { ReasonGroupService } from './reason-group.service';

@Module({
  imports: [InfrastructureModule],
  exports: [ProductService, PositionService, SpecializationService, ReasonService, SkillService, ReasonGroupService],
  providers: [ProductService, PositionService, SpecializationService, ReasonService, SkillService, ReasonGroupService],
})
export class CatalogModule {}
