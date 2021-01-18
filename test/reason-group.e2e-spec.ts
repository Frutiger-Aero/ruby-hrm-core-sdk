import { BlockingReasonGroupHrmApiAdapter } from '../sdk/nestjs/build'
import { AuthService, TestTokensource } from './auth.stubs';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { grpcClientOptions } from '../src/grpc-client.options';
import { cleanup } from './utils';
import { getConnection } from 'typeorm';
import { reasonGroupFixture1, reasonGroupFixture2 } from './fixtures';
import { HrmCoreModule } from '../sdk/nestjs/build';

describe('Reason Group (e2e)', () => {
  let reasonGroupApi: BlockingReasonGroupHrmApiAdapter;
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
  
      reasonGroupApi = app.get(BlockingReasonGroupHrmApiAdapter);
  
      tokenSource._token = AuthService.allGrants({
        tenantId: 'test',
        clientId: 'testApp',
      });
  });

  afterAll(async () => {
    await app.close();
    await cleanup(getConnection());
  });

  describe('CREATE reasonGroup', () => {
    it('Должен создать сущность', async () => {
      const result = await reasonGroupApi.create(reasonGroupFixture1);
      expect(result.data?.id).not.toBeNull();
      expect(typeof result.data?.id).toBe('string');

      id = result.data.id;
    });
  });

  describe('Update reasonGroup', () => {
    it('Должен обновить сущность', async () => {
      const res = await reasonGroupApi.update({
        ...reasonGroupFixture2,
        id
      });
      expect(res.data.name).toEqual(reasonGroupFixture2.name);
      expect(res.data.id).toEqual(id);
    });
  });

  describe('get reasonGroup by id', () => {
    it('Должен отдать сущность по id', async () => {
      const res = await reasonGroupApi.findById({id});
      expect(res.data.name).toEqual(reasonGroupFixture2.name);
      expect(res.data.id).toEqual(id);
    });
  });

  describe('remove reasonGroup', () => {
    it('Должен мягко удалить сущность по id', async () => {
      const res = await reasonGroupApi.remove({id});
      expect(res.data.id).toEqual(id);
      expect(res.data.isDeleted).toEqual(true);
      expect(res.data.deletedAt).toBeTruthy();
    });
  });

  describe('restore reasonGroup', () => {
    it('Должен восстановить сущность по id', async () => {
      const res = await reasonGroupApi.restore({id});
      expect(res.data.id).toEqual(id);
      expect(res.data.isDeleted).toEqual(false);
    });
  });

  describe('search reasonGroup', () => {
    it('Должен мягко удалить сущность по id', async () => {
      const res = await reasonGroupApi.search({
        limit: 2,
        page: 1
      });
      expect(res.data.length).toEqual(1);
    });
  });
})