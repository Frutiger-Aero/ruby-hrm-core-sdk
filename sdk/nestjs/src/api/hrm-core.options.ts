import { join } from 'path';
import { ok } from 'assert';
import * as grpc from 'grpc';
import { ClientOptions, Transport } from '@nestjs/microservices';
import { InvalidArgumentException } from '@qlean/nestjs-exceptions';
import { IAuthConfig } from '@qlean/sso-utils-sdk';

const {
  PLT_JWT_URL,
  HRM_CORE_URL,
  SSO_M2M_CLIENT_ID,
  SSO_M2M_CLIENT_SECRET,
  SSO_M2M_PERMISSIONS,
  SSO_M2M_IS_SECURE,
} = process.env;

ok(
  typeof PLT_JWT_URL === 'string',
  new InvalidArgumentException(
    `Argument "process.env.PLT_JWT_URL" must be a "string"`,
  ),
);

ok(
  typeof HRM_CORE_URL === 'string',
  new InvalidArgumentException(
    `Argument "process.env.HRM_CORE_URL" must be a "string"`,
  ),
);

ok(
  typeof SSO_M2M_CLIENT_ID === 'string',
  new InvalidArgumentException(
    `Argument "process.env.SSO_M2M_CLIENT_ID" must be a "string"`,
  ),
);
ok(
  typeof SSO_M2M_CLIENT_SECRET === 'string',
  new InvalidArgumentException(
    `Argument "process.env.SSO_M2M_CLIENT_SECRET" must be a "string"`,
  ),
);

export const PACKAGE_API = 'HRM_CORE_API_PACKAGE';

export const apiOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: HRM_CORE_URL,
    package: 'hrm.core',
    protoPath: join(__dirname, '../../proto/hrm-core.proto'),
    credentials: HRM_CORE_URL.includes(':443')
      ? grpc.credentials.createSsl()
      : grpc.credentials.createInsecure(),
    loader: {
      arrays: true,
      includeDirs: [process.env.PWD],
    },
  },
};

export const ssoOptions: IAuthConfig = {
  clientId: SSO_M2M_CLIENT_ID,
  clientSecret: SSO_M2M_CLIENT_SECRET,
  isSecure: SSO_M2M_IS_SECURE ? SSO_M2M_IS_SECURE === 'true' : false,
  permissions: SSO_M2M_PERMISSIONS?.split(','),
  url: PLT_JWT_URL,
};
