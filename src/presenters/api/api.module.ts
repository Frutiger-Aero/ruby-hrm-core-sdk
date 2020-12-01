import { Module } from '@nestjs/common';
import { PLTJWTModule } from '@qlean/sso-utils-sdk';
import { ssoOptions } from '../../sso.options';
import { CatalogModule } from '../../core';
import { ProductController } from './product.controller';
import { PositionController } from './position.controller';
import { SpecializationController } from './specialization.controller';

@Module({
  imports: [
    CatalogModule,
    PLTJWTModule.forRoot(ssoOptions),
  ],
  controllers: [
    ProductController,
    PositionController,
    SpecializationController,
  ],
  providers: [],
})
export class ApiModule {}
