import { Metadata } from 'grpc';
import { Token, SIGNING_ALGORITHM, ITokenSource, IAuthConfig } from '@qlean/sso-utils-sdk';
import { JWKSSource } from '@qlean/sso-utils-sdk/build/plt-sso-sdk/plt-jwt.guard/jwks-source.service';

import { env } from 'process';

export class TestTokensource implements ITokenSource {
  constructor(config: IAuthConfig) {
  }

  _token: string = '123';

  patchMetadata(metadata: Metadata): Promise<Metadata> {
    metadata.set('token', this._token);
    return Promise.resolve(metadata);
  }
}

const jwksService = {
  getJWKS: jest.fn(async (...args) => {
    return [];
  }),
};

Token.prototype.verify = async () => {
  return true;
};

export class AuthService {

  static inject(testModule) {
    return testModule.overrideProvider(JWKSSource).useValue(jwksService);
  }

  static allGrants({tenantId, clientId, uid = null }) {
    const permissions = [
      'hrm-core:catalog:write',
      'hrm-core:catalog:read',
      'hrm-core:wage:read',
      'hrm-core:wage:write',
      'hrm-core:contract:write',
      'hrm-core:contract:read'
    ]
    const token = new Token({
      alg: SIGNING_ALGORITHM.RS256,
    }, {
      iss: tenantId,
      cli: clientId,
      tfn: '1234',
      uid,
      per: permissions,
      exp: Date.now() + 1000 * 60,
    }, 'test');

    return token.compact();
  }

}
