import { classToPlain } from 'class-transformer';
import { Controller, UseFilters, UsePipes, UseGuards, UseInterceptors } from '@nestjs/common';
import { PermissionKey, PLTJWTGuard } from '@qlean/sso-utils-sdk';
import { GrpcMethod } from '@nestjs/microservices';
import { SentryInterceptor } from '@qlean/nestjs-sentry';
import { RpcExceptionFilter, ValidationPipe } from '@qlean/nestjs-exceptions';
import { UuidRequestDto } from '@qlean/nestjs-typeorm-persistence-search';
import { StatsInterceptor } from '@qlean/nestjs-stats';
import { PACKAGE_NAME } from '../../constance';
import { SkillService } from '../../core';
import { SkillCreateDto, SkillSearchDto, SkillUpdateDto } from '../dto';
import { hrm } from '../../../proto/generated/app.proto';
import { GRANTS } from '../../sso.options';

const PROTO_SVS_NAME = 'SkillService';

@Controller(PACKAGE_NAME)
@UseGuards(PLTJWTGuard)
@UseInterceptors(StatsInterceptor)
@UseInterceptors(SentryInterceptor)
export class SkillController {
  constructor(private readonly svs: SkillService) {}

  @GrpcMethod(PROTO_SVS_NAME)
  @PermissionKey(GRANTS.CATALOG_WRITE)
  @UseFilters(RpcExceptionFilter.for(`${SkillController.name}::create`))
  @UsePipes(new ValidationPipe())
  async create(args: SkillCreateDto): Promise<hrm.core.SkillResponse> {
    const result = await this.svs.create(args);

    return new hrm.core.SkillResponse({
      data: classToPlain(result),
    });
  }

  @GrpcMethod(PROTO_SVS_NAME)
  @PermissionKey(GRANTS.CATALOG_WRITE)
  @UseFilters(RpcExceptionFilter.for(`${SkillController.name}::update`))
  @UsePipes(new ValidationPipe())
  async update(args: SkillUpdateDto): Promise<hrm.core.SkillResponse> {
    const result = await this.svs.update(args);
    return new hrm.core.SkillResponse({
      data: classToPlain(result),
    });
  }

  @GrpcMethod(PROTO_SVS_NAME)
  @PermissionKey(GRANTS.CATALOG_WRITE)
  @UseFilters(RpcExceptionFilter.for(`${SkillController.name}::remove`))
  @UsePipes(new ValidationPipe())
  async remove(args: UuidRequestDto): Promise<hrm.core.SkillResponse> {
    const result = await this.svs.remove(args);
    return new hrm.core.SkillResponse({
      data: classToPlain(result),
    });
  }

  @GrpcMethod(PROTO_SVS_NAME)
  @PermissionKey(GRANTS.CATALOG_WRITE)
  @UseFilters(RpcExceptionFilter.for(`${SkillController.name}::restore`))
  @UsePipes(new ValidationPipe())
  async restore(args: UuidRequestDto): Promise<hrm.core.SkillResponse> {
    const result = await this.svs.restore(args);
    return new hrm.core.SkillResponse({
      data: classToPlain(result),
    });
  }

  @GrpcMethod(PROTO_SVS_NAME)
  @PermissionKey(GRANTS.CATALOG_READ)
  @UseFilters(RpcExceptionFilter.for(`${SkillController.name}::search`))
  @UsePipes(new ValidationPipe())
  async search(args: SkillSearchDto): Promise<hrm.core.SkillSearchResponse> {
    const { data, ...rest } = await this.svs.findPaginate(args);
    return new hrm.core.SkillSearchResponse({
      ...rest,
      data: data.map(m => classToPlain(m)),
    });
  }

  @GrpcMethod(PROTO_SVS_NAME)
  @PermissionKey(GRANTS.CATALOG_READ)
  @UseFilters(RpcExceptionFilter.for(`${SkillController.name}::findById`))
  @UsePipes(new ValidationPipe())
  async findById(args: UuidRequestDto): Promise<hrm.core.SkillResponse> {
    const result = await this.svs.findById(args.id);
    return new hrm.core.SkillResponse({
      data: classToPlain(result),
    });
  }
}
