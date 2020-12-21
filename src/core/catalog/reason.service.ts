import { Injectable } from "@nestjs/common";
import { ReasonStore } from "../../infrastructure/persistence/reason";

@Injectable()
export class ReasonService {
  constructor(
    private readonly reasonStore: ReasonStore
  ) {}
  getBlockingReasons() {
    return this.reasonStore.getBlockingReasons();
  }
  getFreezingReasons() {
    return this.reasonStore.getFreezingReasons();
  }
}