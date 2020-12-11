import { ContractorHrmApiAdapter } from '../sdk/nestjs/build'
import { AuthService, TestTokensource } from './auth.stubs';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { grpcClientOptions } from '../src/grpc-client.options';
import { cleanup } from './utils';
import { getConnection } from 'typeorm';
import { contractorFixture1 } from './fixtures';
import { HrmCoreModule } from '../sdk/nestjs/build';

describe('Position (e2e)', () => {
  let contractorApi: ContractorHrmApiAdapter;
  let id: string;
  let app = null;

  beforeAll(async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;

    const tokenSource = new TestTokensource({
      url: '',
      isSecure: false,
      clientId: '',
      clientSecret: '',
      permissions: [],
    });

    const moduleFixture = await AuthService.inject(
      Test.createTestingModule({
        imports: [AppModule, HrmCoreModule],
      }),
    )
      .overrideProvider('TOKEN_SOURCE')
      .useValue(tokenSource)
      .compile();

      app = moduleFixture.createNestApplication();
      app.connectMicroservice(grpcClientOptions);
      await app.startAllMicroservicesAsync();
      await app.init();
  
      contractorApi = app.get(ContractorHrmApiAdapter);
  
      tokenSource._token = AuthService.allGrants({
        tenantId: 'test',
        clientId: 'testApp',
      });

      await cleanup(getConnection());
  });

  afterAll(async () => {
    await app.close();
    // await cleanup(getConnection());
  });

  describe('CREATE contractor', () => {
    it('Должен создать исполнителя', async () => {
      const result = await contractorApi.create(contractorFixture1);
      expect(result.data?.id).not.toBeNull();
      expect(typeof result.data?.id).toBe('string');

      id = result.data.id;
    });
  });

})