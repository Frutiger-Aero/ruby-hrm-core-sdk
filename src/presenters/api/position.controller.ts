import { classToPlain } from 'class-transformer';
import { Controller, UseFilters, UsePipes, UseGuards, UseInterceptors } from '@nestjs/common';
import { PermissionKey, PLTJWTGuard } from '@qlean/sso-sdk';
import { GrpcMethod } from '@nestjs/microservices';
import { SentryInterceptor } from '@qlean/nestjs-sentry';
import { RpcExceptionFilter, ValidationPipe } from '@qlean/nestjs-exceptions';
import { UuidRequestDto } from '@qlean/nestjs-typeorm-persistence-search';
import { StatsInterceptor } from '@qlean/nestjs-stats';
import { PACKAGE_NAME } from '../../constance';
import { PositionService } from '../../core';
import { PositionCreateDto, PositionSearchDto, PositionUpdateDto } from '../dto';
import { hrm } from '../../../proto/generated/app.proto';

const PROTO_SVS_NAME = 'PositionService';

@Controller(PACKAGE_NAME)
@UseGuards(PLTJWTGuard)
@UseInterceptors(StatsInterceptor)
@UseInterceptors(SentryInterceptor)
export class PositionController {
  constructor(private readonly svs: PositionService) {}

  @GrpcMethod(PROTO_SVS_NAME)
  // @PermissionKey('kosmos-catalog')
  @UseFilters(RpcExceptionFilter.for(`${PositionController.name}::create`))
  @UsePipes(new ValidationPipe())
  async create(args: PositionCreateDto): Promise<hrm.core.PositionResponse> {
    const result = await this.svs.create(args);

    return new hrm.core.PositionResponse({
      data: classToPlain(result),
    });
  }

  @GrpcMethod(PROTO_SVS_NAME)
  // @PermissionKey('kosmos-catalog')
  @UseFilters(RpcExceptionFilter.for(`${PositionController.name}::update`))
  @UsePipes(new ValidationPipe())
  async update(args: PositionUpdateDto): Promise<hrm.core.PositionResponse> {
    const result = await this.svs.update(args);
    return new hrm.core.PositionResponse({
      data: classToPlain(result),
    });
  }

  @GrpcMethod(PROTO_SVS_NAME)
  // @PermissionKey('kosmos-catalog')
  @UseFilters(RpcExceptionFilter.for(`${PositionController.name}::remove`))
  @UsePipes(new ValidationPipe())
  async remove(args: UuidRequestDto): Promise<hrm.core.PositionResponse> {
    const result = await this.svs.remove(args);
    return new hrm.core.PositionResponse({
      data: classToPlain(result),
    });
  }

  @GrpcMethod(PROTO_SVS_NAME)
  // @PermissionKey('kosmos-catalog')
  @UseFilters(RpcExceptionFilter.for(`${PositionController.name}::restore`))
  @UsePipes(new ValidationPipe())
  async restore(args: UuidRequestDto): Promise<hrm.core.PositionResponse> {
    const result = await this.svs.restore(args);
    return new hrm.core.PositionResponse({
      data: classToPlain(result),
    });
  }

  @GrpcMethod(PROTO_SVS_NAME)
  // @PermissionKey('kosmos-catalog')
  @UseFilters(RpcExceptionFilter.for(`${PositionController.name}::search`))
  @UsePipes(new ValidationPipe())
  async search(args: PositionSearchDto): Promise<hrm.core.PositionSearchResponse> {
    const { data, ...rest } = await this.svs.findPaginate(args);
    return new hrm.core.PositionSearchResponse({
      ...rest,
      data: data.map(m => classToPlain(m)),
    });
  }

  @GrpcMethod(PROTO_SVS_NAME)
  // @PermissionKey('kosmos-catalog')
  @UseFilters(RpcExceptionFilter.for(`${PositionController.name}::findById`))
  @UsePipes(new ValidationPipe())
  async findById(args: UuidRequestDto): Promise<hrm.core.PositionResponse> {
    const result = await this.svs.findById(args.id);
    return new hrm.core.PositionResponse({
      data: classToPlain(result),
    });
  }
}
