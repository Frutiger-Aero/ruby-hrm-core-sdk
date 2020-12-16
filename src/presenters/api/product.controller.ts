import { classToPlain } from 'class-transformer';
import { Controller, UseFilters, UsePipes, UseInterceptors, UseGuards } from '@nestjs/common';
import { PermissionKey, PLTJWTGuard } from '@qlean/sso-utils-sdk';
import { GrpcMethod } from '@nestjs/microservices';
import { SentryInterceptor } from '@qlean/nestjs-sentry';
import { RpcExceptionFilter, ValidationPipe } from '@qlean/nestjs-exceptions';
import { UuidRequestDto } from '@qlean/nestjs-typeorm-persistence-search';
import { StatsInterceptor } from '@qlean/nestjs-stats';
import { PACKAGE_NAME } from '../../constance';
import { ProductService } from '../../core';
import { ProductCreateDto, ProductSearchDto, ProductUpdateDto } from '../dto';
import { hrm } from '../../../proto/generated/app.proto';
import { GRANTS } from '../../sso.options';

const PROTO_SVS_NAME = 'ProductService';

@Controller(PACKAGE_NAME)
@UseGuards(PLTJWTGuard)
@UseInterceptors(StatsInterceptor)
@UseInterceptors(SentryInterceptor)
export class ProductController {
  constructor(private readonly svs: ProductService) {}

  @GrpcMethod(PROTO_SVS_NAME)
  @PermissionKey(GRANTS.CATALOG_WRITE)
  @UseFilters(RpcExceptionFilter.for(`${ProductController.name}::create`))
  @UsePipes(new ValidationPipe())
  async create(args: ProductCreateDto): Promise<hrm.core.ProductResponse> {
    const result = await this.svs.create(args);

    return new hrm.core.ProductResponse({
      data: classToPlain(result),
    });
  }

  @GrpcMethod(PROTO_SVS_NAME)
  @PermissionKey(GRANTS.CATALOG_WRITE)
  @UseFilters(RpcExceptionFilter.for(`${ProductController.name}::update`))
  @UsePipes(new ValidationPipe())
  async update(args: ProductUpdateDto): Promise<hrm.core.ProductResponse> {
    const result = await this.svs.update(args);
    return new hrm.core.ProductResponse({
      data: classToPlain(result),
    });
  }

  @GrpcMethod(PROTO_SVS_NAME)
  @PermissionKey(GRANTS.CATALOG_WRITE)
  @UseFilters(RpcExceptionFilter.for(`${ProductController.name}::remove`))
  @UsePipes(new ValidationPipe())
  async remove(args: UuidRequestDto): Promise<hrm.core.ProductResponse> {
    const result = await this.svs.remove(args);
    return new hrm.core.ProductResponse({
      data: classToPlain(result),
    });
  }

  @GrpcMethod(PROTO_SVS_NAME)
  @PermissionKey(GRANTS.CATALOG_WRITE)
  @UseFilters(RpcExceptionFilter.for(`${ProductController.name}::restore`))
  @UsePipes(new ValidationPipe())
  async restore(args: UuidRequestDto): Promise<hrm.core.ProductResponse> {
    const result = await this.svs.restore(args);
    return new hrm.core.ProductResponse({
      data: classToPlain(result),
    });
  }

  @GrpcMethod(PROTO_SVS_NAME)
  @PermissionKey(GRANTS.CATALOG_READ)
  @UseFilters(RpcExceptionFilter.for(`${ProductController.name}::search`))
  @UsePipes(new ValidationPipe())
  async search(args: ProductSearchDto): Promise<hrm.core.ProductSearchResponse> {
    const { data, ...rest } = await this.svs.findPaginate(args);
    return new hrm.core.ProductSearchResponse({
      ...rest,
      data: data.map(m => classToPlain(m)),
    });
  }

  @GrpcMethod(PROTO_SVS_NAME)
  @PermissionKey(GRANTS.CATALOG_READ)
  @UseFilters(RpcExceptionFilter.for(`${ProductController.name}::findById`))
  @UsePipes(new ValidationPipe())
  async findById(args: UuidRequestDto): Promise<hrm.core.ProductResponse> {
    const result = await this.svs.findById(args.id);
    return new hrm.core.ProductResponse({
      data: classToPlain(result),
    });
  }
}
