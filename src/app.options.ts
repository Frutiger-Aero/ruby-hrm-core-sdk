import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

/**
 * SSO гранты для работы c сервисом
 */
export const GRANTS = {
  /**
   * можно создавать исполнителя
   */
  EXECUTOR_CREATE: 'hrm:core:executor:create',

  /**
   * можно получать исполнителя
   */
  EXECUTOR_GET: 'hrm:core:executor:get',

  /**
   * можно изменять исполнителя
   */
  EXECUTOR_UPDATE: 'hrm:core:executor:update',

  /**
   * можно отключать исполнителя
   */
  EXECUTOR_DISABLE: 'hrm:core:executor:disable',

  /**
   * можно получать список изменений профиля исполнителя
   * */
  GET_HISTORY_PROFILE: 'hrm:core:history-profile:get',
};

const { GRPC_PORT = 5000 } = process.env;

export const grpcOptions: GrpcOptions = {
  transport: Transport.GRPC,
  options: {
    url: `0.0.0.0:${GRPC_PORT}`,
    package: 'hrm.core',
    protoPath: join(__dirname, '../proto/hrm-core.proto'),
  },
};

/**
 * Настройки авторизации
 */
export const authOptions = {
  url: process.env.PLT_JWT_URL,
  audiences: [],
};
