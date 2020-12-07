import { Module } from '@nestjs/common';
import { WagePersistenceModule } from '../../infrastructure';
import { WageService } from './wage.service';

@Module({
  imports: [ WagePersistenceModule ],
  exports: [ WageService],
  providers: [ WageService],
})
export class WageModule {}
