import { Module } from "@nestjs/common";
import { OptionStoreModule } from "./option";
import { ProductStoreModule } from "./product";

@Module({
  imports: [ProductStoreModule, OptionStoreModule],
  exports: [ProductStoreModule, OptionStoreModule]
})
export class PltCoreModule {}