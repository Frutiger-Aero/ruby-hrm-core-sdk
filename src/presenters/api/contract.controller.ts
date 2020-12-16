import { classToPlain } from 'class-transformer';
import { Controller, UseFilters, UsePipes, UseGuards, UseInterceptors } from '@nestjs/common';
import { PermissionKey, PLTJWTGuard } from '@qlean/sso-utils-sdk';
import { GrpcMethod } from '@nestjs/microservices';
import { SentryInterceptor } from '@qlean/nestjs-sentry';
import { RpcExceptionFilter, ValidationPipe } from '@qlean/nestjs-exceptions';
import { UuidRequestDto } from '@qlean/nestjs-typeorm-persistence-search';
import { StatsInterceptor } from '@qlean/nestjs-stats';
import { PACKAGE_NAME } from '../../constance';
import { ContractService } from '../../core';
import { ContractCreateDto, ContractSearchDto, ContractUpdateDto } from '../dto';
import { hrm } from '../../../proto/generated/app.proto';
import { GRANTS } from '../../sso.options';

const PROTO_SVS_NAME = 'ContractService';

@Controller(PACKAGE_NAME)
@UseGuards(PLTJWTGuard)
@UseInterceptors(StatsInterceptor)
@UseInterceptors(SentryInterceptor)
export class ContractController {
  constructor(private readonly svs: ContractService) {}

  @GrpcMethod(PROTO_SVS_NAME)
  @PermissionKey(GRANTS.CONTRACT_WRITE)
  @UseFilters(RpcExceptionFilter.for(`${ContractController.name}::create`))
  @UsePipes(new ValidationPipe())
  async create(args: ContractCreateDto): Promise<hrm.core.ContractResponse> {
    const result = await this.svs.create(args);

    return new hrm.core.ContractResponse({
      data: classToPlain(result),
    });
  }

  @GrpcMethod(PROTO_SVS_NAME)
  @PermissionKey(GRANTS.CONTRACT_WRITE)
  @UseFilters(RpcExceptionFilter.for(`${ContractController.name}::update`))
  @UsePipes(new ValidationPipe())
  async update(args: ContractUpdateDto): Promise<hrm.core.ContractResponse> {
    const result = await this.svs.update(args);
    return new hrm.core.ContractResponse({
      data: classToPlain(result),
    });
  }

  @GrpcMethod(PROTO_SVS_NAME)
  @PermissionKey(GRANTS.CONTRACT_WRITE)
  @UseFilters(RpcExceptionFilter.for(`${ContractController.name}::remove`))
  @UsePipes(new ValidationPipe())
  async remove(args: UuidRequestDto): Promise<hrm.core.ContractResponse> {
    const result = await this.svs.remove(args);
    return new hrm.core.ContractResponse({
      data: classToPlain(result),
    });
  }

  @GrpcMethod(PROTO_SVS_NAME)
  @PermissionKey(GRANTS.CONTRACT_WRITE)
  @UseFilters(RpcExceptionFilter.for(`${ContractController.name}::restore`))
  @UsePipes(new ValidationPipe())
  async restore(args: UuidRequestDto): Promise<hrm.core.ContractResponse> {
    const result = await this.svs.restore(args);
    return new hrm.core.ContractResponse({
      data: classToPlain(result),
    });
  }

  @GrpcMethod(PROTO_SVS_NAME)
  @PermissionKey(GRANTS.CONTRACT_READ)
  @UseFilters(RpcExceptionFilter.for(`${ContractController.name}::search`))
  @UsePipes(new ValidationPipe())
  async search(args: ContractSearchDto): Promise<hrm.core.ContractSearchResponse> {
    const { data, ...rest } = await this.svs.findPaginate(args);
    return new hrm.core.ContractSearchResponse({
      ...rest,
      data: data.map(m => classToPlain(m)),
    });
  }

  @GrpcMethod(PROTO_SVS_NAME)
  @PermissionKey(GRANTS.CONTRACT_READ)
  @UseFilters(RpcExceptionFilter.for(`${ContractController.name}::findById`))
  @UsePipes(new ValidationPipe())
  async findById(args: UuidRequestDto): Promise<hrm.core.ContractResponse> {
    const result = await this.svs.findById(args.id);
    return new hrm.core.ContractResponse({
      data: classToPlain(result),
    });
  }
}
