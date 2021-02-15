import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../../infrastructure';
import { WageService } from './wage.service';

@Module({
  imports: [ InfrastructureModule ],
  exports: [ WageService],
  providers: [ WageService],
})
export class WageModule {}
