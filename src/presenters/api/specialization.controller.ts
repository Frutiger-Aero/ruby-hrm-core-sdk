import { classToPlain } from 'class-transformer';
import { Controller, UseFilters, UsePipes, UseGuards, UseInterceptors } from '@nestjs/common';
import { PermissionKey, PLTJWTGuard } from '@qlean/sso-utils-sdk';
import { GrpcMethod } from '@nestjs/microservices';
import { SentryInterceptor } from '@qlean/nestjs-sentry';
import { RpcExceptionFilter, ValidationPipe } from '@qlean/nestjs-exceptions';
import { UuidRequestDto } from '@qlean/nestjs-typeorm-persistence-search';
import { StatsInterceptor } from '@qlean/nestjs-stats';
import { PACKAGE_NAME } from '../../constance';
import { SpecializationService } from '../../core';
import { SpecializationCreateDto, SpecializationSearchDto, SpecializationUpdateDto } from '../dto';
import { hrm } from '../../../proto/generated/app.proto';

const PROTO_SVS_NAME = 'SpecializationService';

@Controller(PACKAGE_NAME)
// @UseGuards(PLTJWTGuard)
@UseInterceptors(StatsInterceptor)
@UseInterceptors(SentryInterceptor)
export class SpecializationController {
  constructor(private readonly svs: SpecializationService) {}

  @GrpcMethod(PROTO_SVS_NAME)
  // @PermissionKey('kosmos-catalog')
  @UseFilters(RpcExceptionFilter.for(`${SpecializationController.name}::create`))
  @UsePipes(new ValidationPipe())
  async create(args: SpecializationCreateDto): Promise<hrm.core.SpecializationResponse> {
    const result = await this.svs.create(args);

    return new hrm.core.SpecializationResponse({
      data: classToPlain(result),
    });
  }

  @GrpcMethod(PROTO_SVS_NAME)
  // @PermissionKey('kosmos-catalog')
  @UseFilters(RpcExceptionFilter.for(`${SpecializationController.name}::update`))
  @UsePipes(new ValidationPipe())
  async update(args: SpecializationUpdateDto): Promise<hrm.core.SpecializationResponse> {
    const result = await this.svs.update(args);
    return new hrm.core.SpecializationResponse({
      data: classToPlain(result),
    });
  }

  @GrpcMethod(PROTO_SVS_NAME)
  // @PermissionKey('kosmos-catalog')
  @UseFilters(RpcExceptionFilter.for(`${SpecializationController.name}::remove`))
  @UsePipes(new ValidationPipe())
  async remove(args: UuidRequestDto): Promise<hrm.core.SpecializationResponse> {
    const result = await this.svs.remove(args);
    return new hrm.core.SpecializationResponse({
      data: classToPlain(result),
    });
  }

  @GrpcMethod(PROTO_SVS_NAME)
  // @PermissionKey('kosmos-catalog')
  @UseFilters(RpcExceptionFilter.for(`${SpecializationController.name}::restore`))
  @UsePipes(new ValidationPipe())
  async restore(args: UuidRequestDto): Promise<hrm.core.SpecializationResponse> {
    const result = await this.svs.restore(args);
    return new hrm.core.SpecializationResponse({
      data: classToPlain(result),
    });
  }

  @GrpcMethod(PROTO_SVS_NAME)
  // @PermissionKey('kosmos-catalog')
  @UseFilters(RpcExceptionFilter.for(`${SpecializationController.name}::search`))
  @UsePipes(new ValidationPipe())
  async search(args: SpecializationSearchDto): Promise<hrm.core.SpecializationSearchResponse> {
    const { data, ...rest } = await this.svs.findPaginate(args);
    return new hrm.core.SpecializationSearchResponse({
      ...rest,
      data: data.map(m => classToPlain(m)),
    });
  }

  @GrpcMethod(PROTO_SVS_NAME)
  // @PermissionKey('kosmos-catalog')
  @UseFilters(RpcExceptionFilter.for(`${SpecializationController.name}::findById`))
  @UsePipes(new ValidationPipe())
  async findById(args: UuidRequestDto): Promise<hrm.core.SpecializationResponse> {
    const result = await this.svs.findById(args.id);
    return new hrm.core.SpecializationResponse({
      data: classToPlain(result),
    });
  }
}
