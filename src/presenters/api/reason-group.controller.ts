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
import { ReasonGroupService } from "../../core";
import { GRANTS } from '../../sso.options';
import { BlockingReasonGroupCreateDto, BlockingReasonGroupSearchDto, BlockingReasonGroupUpdateDto } from "../dto";

const PROTO_SVS_NAME = 'BlockingReasonGroupService';

@Controller(PACKAGE_NAME)
// @UseGuards(PLTJWTGuard)
@UseInterceptors(StatsInterceptor)
@UseInterceptors(SentryInterceptor)
export class ReasonGroupController {
  constructor(private readonly svs: ReasonGroupService) {

  }
  @GrpcMethod(PROTO_SVS_NAME)
  // @PermissionKey(GRANTS.CONTRACT_WRITE)
  @UseFilters(RpcExceptionFilter.for(`${ReasonGroupController.name}::create`))
  @UsePipes(new ValidationPipe())
  async create(args: BlockingReasonGroupCreateDto): Promise<hrm.core.BlockingReasonGroupResponse> {
    const result = await this.svs.create(args);

    return new hrm.core.BlockingReasonGroupResponse({
      data: classToPlain(result),
    });
  }

  @GrpcMethod(PROTO_SVS_NAME)
  // @PermissionKey(GRANTS.CONTRACT_WRITE)
  @UseFilters(RpcExceptionFilter.for(`${ReasonGroupController.name}::update`))
  @UsePipes(new ValidationPipe())
  async update(args: BlockingReasonGroupUpdateDto): Promise<hrm.core.BlockingReasonGroupResponse> {
    const result = await this.svs.update(args);
    return new hrm.core.BlockingReasonGroupResponse({
      data: classToPlain(result),
    });
  }

  @GrpcMethod(PROTO_SVS_NAME)
  // @PermissionKey(GRANTS.CONTRACT_WRITE)
  @UseFilters(RpcExceptionFilter.for(`${ReasonGroupController.name}::remove`))
  @UsePipes(new ValidationPipe())
  async remove(args: UuidRequestDto): Promise<hrm.core.BlockingReasonGroupResponse> {
    const result = await this.svs.remove(args);
    return new hrm.core.BlockingReasonGroupResponse({
      data: classToPlain(result),
    });
  }

  @GrpcMethod(PROTO_SVS_NAME)
  @PermissionKey(GRANTS.CONTRACT_WRITE)
  @UseFilters(RpcExceptionFilter.for(`${ReasonGroupController.name}::restore`))
  @UsePipes(new ValidationPipe())
  async restore(args: UuidRequestDto): Promise<hrm.core.BlockingReasonGroupResponse> {
    const result = await this.svs.restore(args);
    return new hrm.core.BlockingReasonGroupResponse({
      data: classToPlain(result),
    });
  }

  @GrpcMethod(PROTO_SVS_NAME)
  @PermissionKey(GRANTS.CONTRACT_READ)
  @UseFilters(RpcExceptionFilter.for(`${ReasonGroupController.name}::search`))
  @UsePipes(new ValidationPipe())
  async search(args: BlockingReasonGroupSearchDto): Promise<hrm.core.BlockingReasonGroupSearchResponse> {
    const { data, ...rest } = await this.svs.findPaginate(args);
    return new hrm.core.BlockingReasonGroupSearchResponse({
      ...rest,
      data: data.map(m => classToPlain(m)),
    });
  }

  @GrpcMethod(PROTO_SVS_NAME)
  @PermissionKey(GRANTS.CONTRACT_READ)
  @UseFilters(RpcExceptionFilter.for(`${ReasonGroupController.name}::findById`))
  @UsePipes(new ValidationPipe())
  async findById(args: UuidRequestDto): Promise<hrm.core.BlockingReasonGroupResponse> {
    const result = await this.svs.findById(args.id);
    return new hrm.core.BlockingReasonGroupResponse({
      data: classToPlain(result),
    });
  }
}