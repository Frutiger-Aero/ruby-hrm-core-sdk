
import { Controller, UseFilters, UseGuards, UsePipes } from '@nestjs/common';
import { ITokenBody } from '@qlean/sso-sdk';
import { PermissionKey, PLTJWTGuard } from '@qlean/sso-sdk/build';
import { ValidationPipe, RpcExceptionFilter } from '@qlean/nestjs-exceptions';
import { GrpcMethod } from '@nestjs/microservices';
import { GRANTS } from '../../app.options';
import { Metadata } from 'grpc';

import { ExecutorService } from '../../core/executor/executor.service';
import { Logger } from '@qlean/nestjs-logger';
import { bench } from '../../utils';

const GRPC_SERVICE_NAME = 'HRMExecutorService';

@Controller()
@UseFilters(RpcExceptionFilter.for(GRPC_SERVICE_NAME))
@UseGuards(PLTJWTGuard)
export class ExecutorController implements IHRMExecutorService {
  private readonly logger = new Logger(ExecutorController.name);
  protected readonly bench = bench();

  constructor(private executorService: ExecutorService) {}

  @GrpcMethod(GRPC_SERVICE_NAME, 'Create')
  @UseFilters(RpcExceptionFilter.for(`${GRPC_SERVICE_NAME}::create`))
  @UsePipes(new ValidationPipe({ beforeLogLevel: 'debug' }))
  @PermissionKey(GRANTS.EXECUTOR_CREATE)
  async create(
    executor: ExecutorDto,
    metadata?: Metadata,
    authTokenBody?: ITokenBody,
  ): Promise<ICreateExecutorResponse> {
    this.bench.start();
    const result = await this.executorService.createExecutor(
      executor,
    );
    this.logger.info('method create work time in sec', {
      time: this.bench.stop(),
    });
    return result;
  }

  @GrpcMethod(GRPC_SERVICE_NAME, 'Get')
  @UseFilters(RpcExceptionFilter.for(`${GRPC_SERVICE_NAME}::get`))
  @UsePipes(new ValidationPipe({ beforeLogLevel: 'debug' }))
  @PermissionKey(GRANTS.EXECUTOR_GET)
  async get(
    id: ExecutorIdDto,
    metadata?: Metadata,
    authBodyToken?: ITokenBody,
  ): Promise<IGetExecutorResponse> {
    this.bench.start();
    const result = await this.executorService.getExecutor(id);
    this.logger.info('method get work time in sec', {
      time: this.bench.stop(),
    });
    return result;
  }

  @GrpcMethod(GRPC_SERVICE_NAME, 'Update')
  @UseFilters(RpcExceptionFilter.for(`${GRPC_SERVICE_NAME}::update`))
  @UsePipes(new ValidationPipe({ beforeLogLevel: 'debug' }))
  @PermissionKey(GRANTS.EXECUTOR_UPDATE)
  async update(
    executor: ExecutorWithOwnIdDto,
    metadata?: Metadata,
    authBodyToken?: ITokenBody,
  ): Promise<IUpdateExecutorResponse> {
    this.bench.start();
    const result = await this.executorService.updateExecutor(
      executor,
    );
    this.logger.info('method update work time in sec', {
      time: this.bench.stop(),
    });
    return result;
  }

  @GrpcMethod(GRPC_SERVICE_NAME, 'Remove')
  @UseFilters(RpcExceptionFilter.for(`${GRPC_SERVICE_NAME}::remove`))
  @UsePipes(new ValidationPipe({ beforeLogLevel: 'debug' }))
  @PermissionKey(GRANTS.EXECUTOR_REMOVE)
  async remove(
    id: ExecutorIdDto,
    metadata?: Metadata,
    authBodyToken?: ITokenBody,
  ): Promise<IRemoveExecutorResponse> {
    this.bench.start();
    await this.executorService.removeExecutor(id);
    this.logger.info('method remove work time in sec', {
      time: this.bench.stop(),
    });
    return null;
  }
}
