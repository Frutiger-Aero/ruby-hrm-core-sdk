import { join } from 'path';
import { ClientOptions, Transport } from '@nestjs/microservices';
import { PACKAGE_NAME } from './constance';
const { GRPC_PORT = 5000 } = process.env;

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: `0.0.0.0:${GRPC_PORT}`,
    package: PACKAGE_NAME,
    protoPath: join(__dirname, '../proto/hrm-core.proto'),
    loader: {
      includeDirs: [process.env.PWD, join(__dirname, '../proto')],
    },
  },
};
