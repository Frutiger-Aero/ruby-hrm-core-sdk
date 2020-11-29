import { Controller, UseFilters, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { ITokenBody } from '@qlean/sso-sdk';
import { PermissionKey, PLTJWTGuard } from '@qlean/sso-sdk/build';
import { ValidationPipe, RpcExceptionFilter } from '@qlean/nestjs-exceptions';
import { GrpcMethod } from '@nestjs/microservices';
import { GRANTS } from '../../app.options';
import { Metadata } from 'grpc';
import { Logger } from '@qlean/nestjs-logger';
import { StatsInterceptor } from '@qlean/nestjs-stats';
import { ExecutorService } from '../../core/executor/executor.service';
// import {DisableExecutor, ExecutorDto, GetExecutor, GetHistoryProfileDto, UpdateExecutor} from "../dto/executor.dto";

const GRPC_SERVICE_NAME = 'HRMExecutorService';

@Controller()
@UseFilters(RpcExceptionFilter.for(GRPC_SERVICE_NAME))
@UseGuards(PLTJWTGuard)
@UseInterceptors(StatsInterceptor)
export class ExecutorController {
  private readonly logger = new Logger(ExecutorController.name);

  constructor(private executorService: ExecutorService) {}

  @GrpcMethod(GRPC_SERVICE_NAME, 'Create')
  @UseFilters(RpcExceptionFilter.for(`${GRPC_SERVICE_NAME}::create`))
  @UsePipes(new ValidationPipe({ beforeLogLevel: 'debug' }))
  @PermissionKey(GRANTS.EXECUTOR_CREATE)
  async create(
    data: ExecutorDto,
    metadata?: Metadata,
    authTokenBody?: ITokenBody,
  ): Promise<ICreateExecutorResponse> {
    const id = await this.executorService.createExecutor(
      {executor: data, ssoId: authTokenBody.iss},
    );

    return { id };
  }

}
