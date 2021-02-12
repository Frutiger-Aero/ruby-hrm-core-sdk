import { Module } from "@nestjs/common";
import { ProductStoreModule } from "./product";

@Module({
  imports: [ProductStoreModule],
  exports: [ProductStoreModule]
})
export class PltCoreModule {}