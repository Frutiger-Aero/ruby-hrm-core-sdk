import { Metadata } from 'grpc';
import { Token, SIGNING_ALGORITHM, ITokenSource, IAuthConfig } from '@qlean/sso-sdk/build';
import { JWKSSource } from '@qlean/sso-sdk/build/plt-sso-sdk/plt-jwt.guard/jwks-source.service';
import { GRANTS } from '../src/app.options';

export class TestTokensource implements ITokenSource {
  constructor(config: IAuthConfig) {
  }

  _token: string;

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
    const token = new Token({
      alg: SIGNING_ALGORITHM.RS256,
    }, {
      iss: tenantId,
      cli: clientId,
      tfn: '1234',
      uid,
      per: Object.entries(GRANTS).map(([, value]) => value),
      exp: Date.now() + 1000 * 60,
    }, 'test');

    return token.compact();
  }

}
