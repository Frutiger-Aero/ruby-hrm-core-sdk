import { Controller, UseFilters, UseGuards, UseInterceptors, UsePipes } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { RpcExceptionFilter, ValidationPipe } from "@qlean/nestjs-exceptions";
import { SentryInterceptor } from "@qlean/nestjs-sentry";
import { StatsInterceptor } from "@qlean/nestjs-stats";
import { PermissionKey, PLTJWTGuard } from "@qlean/sso-utils-sdk";
import { classToPlain } from "class-transformer";
import { hrm } from "../../../proto/generated/app.proto";
import { PACKAGE_NAME } from "../../constance";
import { ReasonService } from "../../core/";
import { GRANTS } from '../../sso.options';

const PROTO_SVS_NAME = 'ReasonService';

@Controller(PACKAGE_NAME)
// @UseGuards(PLTJWTGuard)
@UseInterceptors(StatsInterceptor)
@UseInterceptors(SentryInterceptor)
export class ReasonsController {
  constructor(private readonly svs: ReasonService) {

  }

  @GrpcMethod(PROTO_SVS_NAME)
  // @PermissionKey(GRANTS.CATALOG_WRITE)
  @UseFilters(RpcExceptionFilter.for(`${ReasonsController.name}::getBlockingReasons`))
  @UsePipes(new ValidationPipe())
  async getBlockingReasons(): Promise<hrm.core.IBlockingReasonsResponse> {
    const result = await this.svs.getBlockingReasons();

    return new hrm.core.BlockingReasonsResponse({
      data: result.map(item => classToPlain(item)),
    });
  }

  @GrpcMethod(PROTO_SVS_NAME)
  // @PermissionKey(GRANTS.CATALOG_WRITE)
  @UseFilters(RpcExceptionFilter.for(`${ReasonsController.name}::getFreezingReasons`))
  @UsePipes(new ValidationPipe())
  async getFreezingReasons(): Promise<hrm.core.IFreezingReasonsResponse> {
    const result = await this.svs.getFreezingReasons();

    return new hrm.core.FreezingReasonsResponse({
      data: result.map(item => classToPlain(item))
    });
  }
}