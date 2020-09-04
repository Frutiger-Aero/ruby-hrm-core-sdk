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

// TODO нужна отдельная ручка подписание ползь соглаш
// TODO: проверить в букинге верную подстановку ссоИД

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
    data: ExecutorDto,
    metadata?: Metadata,
    authTokenBody?: ITokenBody,
  ): Promise<ICreateExecutorResponse> {
    // TODO:question уточнить sso_id === tenantId , почему у них разный нейминг ?
    // Почему в тек реализации он назвывается iss, что означает это ?
    const id = await this.executorService.createExecutor(
      {executor: data, ssoId: authTokenBody.iss},
    );

    return { id };
  }

  @GrpcMethod(GRPC_SERVICE_NAME, 'Get')
  @UseFilters(RpcExceptionFilter.for(`${GRPC_SERVICE_NAME}::get`))
  @UsePipes(new ValidationPipe({ beforeLogLevel: 'debug' }))
  @PermissionKey(GRANTS.EXECUTOR_GET)
  async get(
    _: GetExecutor,
    metadata?: Metadata,
    authBodyToken?: ITokenBody,
  ): Promise<IGetExecutorResponse> {
    return this.executorService.getExecutor({
      ssoId: authBodyToken.iss
    });
  }

  @GrpcMethod(GRPC_SERVICE_NAME, 'Update')
  @UseFilters(RpcExceptionFilter.for(`${GRPC_SERVICE_NAME}::update`))
  @UsePipes(new ValidationPipe({ beforeLogLevel: 'debug' }))
  @PermissionKey(GRANTS.EXECUTOR_UPDATE)
  async update(
    data: UpdateExecutor,
    metadata?: Metadata,
    authBodyToken?: ITokenBody,
  ): Promise<IUpdateExecutorResponse> {
    await this.executorService.updateExecutor(
      data,
    );
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
    data: GetHistoryProfileDto,
    metadata?: Metadata,
    authBodyToken?: ITokenBody,
  ): Promise<IDisableExecutorResponse> {
    return this.executorService.getHistoryProfile(data);
  }

}
