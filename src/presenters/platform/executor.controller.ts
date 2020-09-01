import { Controller, UseFilters, UseGuards, UsePipes } from '@nestjs/common';
import { ITokenBody } from '@qlean/sso-sdk';
import { PermissionKey, PLTJWTGuard } from '@qlean/sso-sdk/build';
import { ValidationPipe, RpcExceptionFilter } from '@qlean/nestjs-exceptions';
import { GrpcMethod } from '@nestjs/microservices';
import { GRANTS } from '../../app.options';
import { Metadata } from 'grpc';
import { ExecutorService } from '../../core/executor/executor.service';
import { Logger } from '@qlean/nestjs-logger';
import {
  ICreateExecutorResponse, IDisableExecutorResponse,
  IGetExecutorResponse,
  IHRMExecutorService,
  IUpdateExecutorResponse
} from "../../core/interfaces";
import {DisableExecutor, ExecutorDto, GetExecutor, GetHistoryProfileDto, UpdateExecutor} from "../dto/executor.dto";

const GRPC_SERVICE_NAME = 'HRMExecutorService';

@Controller()
@UseFilters(RpcExceptionFilter.for(GRPC_SERVICE_NAME))
@UseGuards(PLTJWTGuard)
export class ExecutorController implements IHRMExecutorService {
  private readonly logger = new Logger(ExecutorController.name);

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
    // TODO:question уточнить sso_id === tenantId , почему у них разный нейминг ?
    // Почему в тек реализации он назвывается iss, что означает это ?
    const id = await this.executorService.createExecutor(
      {...executor, ssoId: authTokenBody.iss},
    );

    return { id };
  }

  @GrpcMethod(GRPC_SERVICE_NAME, 'Get')
  @UseFilters(RpcExceptionFilter.for(`${GRPC_SERVICE_NAME}::get`))
  @UsePipes(new ValidationPipe({ beforeLogLevel: 'debug' }))
  @PermissionKey(GRANTS.EXECUTOR_GET)
  async get(
    id: GetExecutor,
    metadata?: Metadata,
    authBodyToken?: ITokenBody,
  ): Promise<IGetExecutorResponse> {
    const result = await this.executorService.getExecutor(id);
    this.logger.info('method get work time in sec', {
    });
    return result;
    return null
  }

  @GrpcMethod(GRPC_SERVICE_NAME, 'Update')
  @UseFilters(RpcExceptionFilter.for(`${GRPC_SERVICE_NAME}::update`))
  @UsePipes(new ValidationPipe({ beforeLogLevel: 'debug' }))
  @PermissionKey(GRANTS.EXECUTOR_UPDATE)
  async update(
    executor: UpdateExecutor,
    metadata?: Metadata,
    authBodyToken?: ITokenBody,
  ): Promise<IUpdateExecutorResponse> {
    const result = await this.executorService.updateExecutor(
      executor,
    );
    this.logger.info('method update work time in sec', {
    });
    return result;
    return null;
  }

  @GrpcMethod(GRPC_SERVICE_NAME, 'Disable')
  @UseFilters(RpcExceptionFilter.for(`${GRPC_SERVICE_NAME}::disable`))
  @UsePipes(new ValidationPipe({ beforeLogLevel: 'debug' }))
  @PermissionKey(GRANTS.EXECUTOR_DISABLE)
  async disable(
    id: DisableExecutor,
    metadata?: Metadata,
    authBodyToken?: ITokenBody,
  ): Promise<IDisableExecutorResponse> {
    await this.executorService.disableExecutor(id);
    this.logger.info('method disable work time in sec', {
    });
    return null;
  }

  @GrpcMethod(GRPC_SERVICE_NAME, 'GetHistoryProfile')
  @UseFilters(RpcExceptionFilter.for(`${GRPC_SERVICE_NAME}::getHistoryProfile`))
  @UsePipes(new ValidationPipe({ beforeLogLevel: 'debug' }))
  @PermissionKey(GRANTS.EXECUTOR_DISABLE)
  async getHistoryProfile(
    id: GetHistoryProfileDto,
    metadata?: Metadata,
    authBodyToken?: ITokenBody,
  ): Promise<IDisableExecutorResponse> {
    await this.executorService.getHistoryProfile(id);
    this.logger.info('method disable work time in sec', {});
    return null;
  }


}
