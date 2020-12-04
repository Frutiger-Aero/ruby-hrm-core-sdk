import { classToPlain } from 'class-transformer';
import { Controller, UseFilters, UsePipes, UseGuards, UseInterceptors } from '@nestjs/common';
import { PermissionKey, PLTJWTGuard } from '@qlean/sso-utils-sdk';
import { GrpcMethod } from '@nestjs/microservices';
import { SentryInterceptor } from '@qlean/nestjs-sentry';
import { RpcExceptionFilter, ValidationPipe } from '@qlean/nestjs-exceptions';
import { UuidRequestDto } from '@qlean/nestjs-typeorm-persistence-search';
import { StatsInterceptor } from '@qlean/nestjs-stats';
import { PACKAGE_NAME } from '../../constance';
import { WageService } from '../../core';
import { WageCreateDto, WageSearchDto, WageUpdateDto } from '../dto';
import { hrm } from '../../../proto/generated/app.proto';

const PROTO_SVS_NAME = 'WageService';

@Controller(PACKAGE_NAME)
// @UseGuards(PLTJWTGuard)
@UseInterceptors(StatsInterceptor)
@UseInterceptors(SentryInterceptor)
export class WageController {
  constructor(private readonly svs: WageService) {}

  @GrpcMethod(PROTO_SVS_NAME)
  // @PermissionKey('kosmos-catalog')
  @UseFilters(RpcExceptionFilter.for(`${WageController.name}::create`))
  @UsePipes(new ValidationPipe())
  async create(args: WageCreateDto): Promise<hrm.core.WageResponse> {
    const result = await this.svs.create(args);

    return new hrm.core.WageResponse({
      data: classToPlain(result),
    });
  }

  @GrpcMethod(PROTO_SVS_NAME)
  // @PermissionKey('kosmos-catalog')
  @UseFilters(RpcExceptionFilter.for(`${WageController.name}::update`))
  @UsePipes(new ValidationPipe())
  async update(args: WageUpdateDto): Promise<hrm.core.WageResponse> {
    const result = await this.svs.update(args);
    return new hrm.core.WageResponse({
      data: classToPlain(result),
    });
  }

  @GrpcMethod(PROTO_SVS_NAME)
  // @PermissionKey('kosmos-catalog')
  @UseFilters(RpcExceptionFilter.for(`${WageController.name}::remove`))
  @UsePipes(new ValidationPipe())
  async remove(args: UuidRequestDto): Promise<hrm.core.WageResponse> {
    const result = await this.svs.remove(args);
    return new hrm.core.WageResponse({
      data: classToPlain(result),
    });
  }

  @GrpcMethod(PROTO_SVS_NAME)
  // @PermissionKey('kosmos-catalog')
  @UseFilters(RpcExceptionFilter.for(`${WageController.name}::restore`))
  @UsePipes(new ValidationPipe())
  async restore(args: UuidRequestDto): Promise<hrm.core.WageResponse> {
    const result = await this.svs.restore(args);
    return new hrm.core.WageResponse({
      data: classToPlain(result),
    });
  }

  @GrpcMethod(PROTO_SVS_NAME)
  // @PermissionKey('kosmos-catalog')
  @UseFilters(RpcExceptionFilter.for(`${WageController.name}::search`))
  @UsePipes(new ValidationPipe())
  async search(args: WageSearchDto): Promise<hrm.core.WageSearchResponse> {
    const { data, ...rest } = await this.svs.findPaginate(args);
    return new hrm.core.WageSearchResponse({
      ...rest,
      data: data.map(m => classToPlain(m)),
    });
  }

  @GrpcMethod(PROTO_SVS_NAME)
  // @PermissionKey('kosmos-catalog')
  @UseFilters(RpcExceptionFilter.for(`${WageController.name}::findById`))
  @UsePipes(new ValidationPipe())
  async findById(args: UuidRequestDto): Promise<hrm.core.WageResponse> {
    const result = await this.svs.findById(args.id);
    return new hrm.core.WageResponse({
      data: classToPlain(result),
    });
  }
}
