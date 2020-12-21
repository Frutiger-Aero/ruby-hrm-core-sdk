import { classToPlain } from 'class-transformer';
import { Controller, UseFilters, UsePipes, UseGuards, UseInterceptors } from '@nestjs/common';
import { ITokenBody, PermissionKey, PLTJWTGuard } from '@qlean/sso-utils-sdk';
import { GrpcMethod } from '@nestjs/microservices';
import { SentryInterceptor } from '@qlean/nestjs-sentry';
import { RpcExceptionFilter, ValidationPipe } from '@qlean/nestjs-exceptions';
import { UuidRequestDto } from '@qlean/nestjs-typeorm-persistence-search';
import { StatsInterceptor } from '@qlean/nestjs-stats';
import { PACKAGE_NAME } from '../../constance';
import { ContractorService } from '../../core';
import { ActivateDto, BlockDto, ContractorCreateDto, ContractorSearchDto, ContractorUpdateDto, FreezeDto } from '../dto';
import { hrm } from '../../../proto/generated/app.proto';
import { GRANTS } from '../../sso.options';

const PROTO_SVS_NAME = 'ContractorService';

@Controller(PACKAGE_NAME)
// @UseGuards(PLTJWTGuard)
@UseInterceptors(StatsInterceptor)
@UseInterceptors(SentryInterceptor)
export class ContractorController {
  constructor(private readonly svs: ContractorService) {}

  @GrpcMethod(PROTO_SVS_NAME)
  @PermissionKey(GRANTS.CONTRACT_WRITE)
  @UseFilters(RpcExceptionFilter.for(`${ContractorController.name}::create`))
  @UsePipes(new ValidationPipe())
  async create(args: ContractorCreateDto): Promise<hrm.core.ContractorResponse> {
    const result = await this.svs.create(args);

    return new hrm.core.ContractorResponse({
      data: classToPlain(result),
    });
  }

  @GrpcMethod(PROTO_SVS_NAME)
  @PermissionKey(GRANTS.CONTRACT_WRITE)
  @UseFilters(RpcExceptionFilter.for(`${ContractorController.name}::update`))
  @UsePipes(new ValidationPipe())
  async update(args: ContractorUpdateDto): Promise<hrm.core.ContractorResponse> {
    const result = await this.svs.update(args);
    return new hrm.core.ContractorResponse({
      data: classToPlain(result),
    });
  }

  @GrpcMethod(PROTO_SVS_NAME)
  @PermissionKey(GRANTS.CONTRACT_WRITE)
  @UseFilters(RpcExceptionFilter.for(`${ContractorController.name}::remove`))
  @UsePipes(new ValidationPipe())
  async remove(args: UuidRequestDto): Promise<hrm.core.ContractorResponse> {
    const result = await this.svs.remove(args);
    return new hrm.core.ContractorResponse({
      data: classToPlain(result),
    });
  }

  @GrpcMethod(PROTO_SVS_NAME)
  @PermissionKey(GRANTS.CONTRACT_WRITE)
  @UseFilters(RpcExceptionFilter.for(`${ContractorController.name}::restore`))
  @UsePipes(new ValidationPipe())
  async restore(args: UuidRequestDto): Promise<hrm.core.ContractorResponse> {
    const result = await this.svs.restore(args);
    return new hrm.core.ContractorResponse({
      data: classToPlain(result),
    });
  }

  @GrpcMethod(PROTO_SVS_NAME)
  @PermissionKey(GRANTS.CONTRACT_WRITE)
  @UseFilters(RpcExceptionFilter.for(`${ContractorController.name}::search`))
  @UsePipes(new ValidationPipe())
  async search(args: ContractorSearchDto): Promise<hrm.core.ContractorSearchResponse> {
    const { data, ...rest } = await this.svs.findPaginate(args);
    return new hrm.core.ContractorSearchResponse({
      ...rest,
      data: data.map(m => classToPlain(m)),
    });
  }

  @GrpcMethod(PROTO_SVS_NAME)
  @PermissionKey(GRANTS.CONTRACT_WRITE)
  @UseFilters(RpcExceptionFilter.for(`${ContractorController.name}::findById`))
  @UsePipes(new ValidationPipe())
  async findById(args: UuidRequestDto): Promise<hrm.core.ContractorResponse> {
    const result = await this.svs.findById(args.id);
    return new hrm.core.ContractorResponse({
      data: classToPlain(result),
    });
  }

  @GrpcMethod(PROTO_SVS_NAME)
  @PermissionKey(GRANTS.CONTRACT_WRITE)
  @UseFilters(RpcExceptionFilter.for(`${ContractorController.name}::block`))
  @UsePipes(new ValidationPipe())
  async block(
    args: BlockDto,
    authTokenBody?: ITokenBody
    ): Promise<hrm.core.ContractorResponse> {
    const userId = this.getUserIdFromToken(authTokenBody);
    const result = await this.svs.block({...args, userId});
    return new hrm.core.ContractorResponse({
      data: classToPlain(result),
    });
  }

  @GrpcMethod(PROTO_SVS_NAME)
  @PermissionKey(GRANTS.CONTRACT_WRITE)
  @UseFilters(RpcExceptionFilter.for(`${ContractorController.name}::freeze`))
  @UsePipes(new ValidationPipe())
  async freeze(
    args: FreezeDto,
    authTokenBody?: ITokenBody
    ): Promise<hrm.core.ContractorResponse> {
    const userId = this.getUserIdFromToken(authTokenBody);
    const result = await this.svs.freeze({...args, userId});
    return new hrm.core.ContractorResponse({
      data: classToPlain(result),
    });
  }

  @GrpcMethod(PROTO_SVS_NAME)
  @PermissionKey(GRANTS.CONTRACT_WRITE)
  @UseFilters(RpcExceptionFilter.for(`${ContractorController.name}::activate`))
  @UsePipes(new ValidationPipe())
  async activate(
    args: ActivateDto,
    authTokenBody?: ITokenBody
    ): Promise<hrm.core.ContractorResponse> {
    const userId = this.getUserIdFromToken(authTokenBody);
    const result = await this.svs.activate({...args, userId});
    return new hrm.core.ContractorResponse({
      data: classToPlain(result),
    });
  }

  private getUserIdFromToken(authTokenBody: ITokenBody) {
    return 'f3ca9207-71b8-4812-92cd-80e771dbf223' //TODO: сделать вытаскивание из token
  }
}
