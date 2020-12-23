import { Module } from '@nestjs/common';
import { PLTJWTModule } from '@qlean/sso-utils-sdk';
import { ssoOptions } from '../../sso.options';
import { CoreModule } from '../../core';
import { ProductController } from './product.controller';
import { PositionController } from './position.controller';
import { SpecializationController } from './specialization.controller';
import { WageController } from './wage.controller';
import { ContractorController } from './contractor.controller';
import { ContractController } from './contract.controller';
import { ReasonsController } from './reason.controller';
import { SkillController } from './skill.controller';

@Module({
  imports: [
    CoreModule,
    PLTJWTModule.forRoot(ssoOptions),
  ],
  controllers: [
    ProductController,
    PositionController,
    SpecializationController,
    WageController,
    ContractorController,
    ReasonsController,
    ContractController,
    SkillController
  ],
  providers: [],
})
export class ApiModule {}
