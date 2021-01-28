import { Controller, UseFilters, UseGuards, UseInterceptors, UsePipes } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { RpcExceptionFilter, ValidationPipe } from "@qlean/nestjs-exceptions";
import { SentryInterceptor } from "@qlean/nestjs-sentry";
import { StatsInterceptor } from "@qlean/nestjs-stats";
import { UuidRequestDto } from "@qlean/nestjs-typeorm-persistence-search";
import { PermissionKey, PLTJWTGuard } from "@qlean/sso-utils-sdk";
import { classToPlain } from "class-transformer";
import { hrm } from "../../../proto/generated/app.proto";
import { PACKAGE_NAME } from "../../constance";
import { ReasonService } from "../../core/";
import { GRANTS } from '../../sso.options';
import { BlockingReasonCreateDto, BlockingReasonSearchDto, BlockingReasonUpdateDto } from "../dto";

const PROTO_SVS_NAME = 'BlockingReasonService';

@Controller(PACKAGE_NAME)
@UseGuards(PLTJWTGuard)
@UseInterceptors(StatsInterceptor)
@UseInterceptors(SentryInterceptor)
export class ReasonsController {
  constructor(private readonly svs: ReasonService) {

  }
  @GrpcMethod(PROTO_SVS_NAME)
  @PermissionKey(GRANTS.CATALOG_WRITE)
  @UseFilters(RpcExceptionFilter.for(`${ReasonsController.name}::create`))
  @UsePipes(new ValidationPipe())
  async create(args: BlockingReasonCreateDto): Promise<hrm.core.BlockingReasonResponse> {
    const result = await this.svs.create(args);

    return new hrm.core.BlockingReasonResponse({
      data: classToPlain(result),
    });
  }

  @GrpcMethod(PROTO_SVS_NAME)
  @PermissionKey(GRANTS.CATALOG_WRITE)
  @UseFilters(RpcExceptionFilter.for(`${ReasonsController.name}::update`))
  @UsePipes(new ValidationPipe())
  async update(args: BlockingReasonUpdateDto): Promise<hrm.core.BlockingReasonResponse> {
    const result = await this.svs.update(args);
    return new hrm.core.BlockingReasonResponse({
      data: classToPlain(result),
    });
  }

  @GrpcMethod(PROTO_SVS_NAME)
  @PermissionKey(GRANTS.CATALOG_WRITE)
  @UseFilters(RpcExceptionFilter.for(`${ReasonsController.name}::remove`))
  @UsePipes(new ValidationPipe())
  async remove(args: UuidRequestDto): Promise<hrm.core.BlockingReasonResponse> {
    const result = await this.svs.remove(args);
    return new hrm.core.BlockingReasonResponse({
      data: classToPlain(result),
    });
  }

  @GrpcMethod(PROTO_SVS_NAME)
  @PermissionKey(GRANTS.CATALOG_WRITE)
  @UseFilters(RpcExceptionFilter.for(`${ReasonsController.name}::restore`))
  @UsePipes(new ValidationPipe())
  async restore(args: UuidRequestDto): Promise<hrm.core.BlockingReasonResponse> {
    const result = await this.svs.restore(args);
    return new hrm.core.BlockingReasonResponse({
      data: classToPlain(result),
    });
  }

  @GrpcMethod(PROTO_SVS_NAME)
  @PermissionKey(GRANTS.CATALOG_READ)
  @UseFilters(RpcExceptionFilter.for(`${ReasonsController.name}::search`))
  @UsePipes(new ValidationPipe())
  async search(args: BlockingReasonSearchDto): Promise<hrm.core.BlockingReasonSearchResponse> {
    const { data, ...rest } = await this.svs.findPaginate(args);
    return new hrm.core.BlockingReasonSearchResponse({
      ...rest,
      data: data.map(m => classToPlain(m)),
    });
  }

  @GrpcMethod(PROTO_SVS_NAME)
  @PermissionKey(GRANTS.CATALOG_READ)
  @UseFilters(RpcExceptionFilter.for(`${ReasonsController.name}::findById`))
  @UsePipes(new ValidationPipe())
  async findById(args: UuidRequestDto): Promise<hrm.core.BlockingReasonResponse> {
    const result = await this.svs.findById(args.id);
    return new hrm.core.BlockingReasonResponse({
      data: classToPlain(result),
    });
  }
}