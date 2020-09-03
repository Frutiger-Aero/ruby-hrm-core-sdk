import {Module} from "@nestjs/common";
import {TariffStore} from "./tariff.store";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TariffModel} from "./tariff.model";

@Module({
  imports: [TypeOrmModule.forFeature([TariffModel])],
  exports: [TariffStore],
  providers: [TariffStore],
})
export class TariffModule {}
