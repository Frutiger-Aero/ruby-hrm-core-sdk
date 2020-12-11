import { PositionHrmApiAdapter } from '../sdk/nestjs/build'
import { AuthService, TestTokensource } from './auth.stubs';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { grpcClientOptions } from '../src/grpc-client.options';
import { cleanup } from './utils';
import { getConnection } from 'typeorm';
import { positionFixture1, positionFixture2 } from './fixtures';
import { HrmCoreModule } from '../sdk/nestjs/build';

describe.skip('Position (e2e)', () => {
  let positionApi: PositionHrmApiAdapter;
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
  
      positionApi = app.get(PositionHrmApiAdapter);
  
      tokenSource._token = AuthService.allGrants({
        tenantId: 'test',
        clientId: 'testApp',
      });
  });

  afterAll(async () => {
    await app.close();
    // await cleanup(getConnection());
  });

  describe('CREATE position', () => {
    it('Должен создать позицию', async () => {
      const result = await positionApi.create(positionFixture1);
      expect(result.data?.id).not.toBeNull();
      expect(typeof result.data?.id).toBe('string');

      id = result.data.id;
    });
  });

  describe('CREATE duplicate name position', () => {
    it('Должен выбросить ошибку на дубль', async () => {
      let error;
      try {
        await positionApi.create(positionFixture1);
      } catch (err) {
        error = err;
      }
      expect(error.message).toMatch(/ALREADY_EXISTS/);
    });
  });

  describe('Update position', () => {
    it('Должен обновить позицию', async () => {
      const res = await positionApi.update({
        ...positionFixture2,
        id
      });
      expect(res.data.title).toEqual(positionFixture2.title);
      expect(res.data.name).toEqual(positionFixture2.name);
      expect(res.data.id).toEqual(id);
    });
  });

  describe('Update duplicate name position', () => {
    it('Должен выбросить ошибку на дубль', async () => {
      let error;
      await positionApi.create(positionFixture1);
      try {
        await positionApi.update({
          ...positionFixture1,
          id
        });
      } catch (err) {
        error = err;
      }
      expect(error.message).toMatch(/ALREADY_EXISTS/);
    });
  });

  describe('get position by id', () => {
    it('Должен отдать позицию по id', async () => {
      const res = await positionApi.findById({id});
      expect(res.data.title).toEqual(positionFixture2.title);
      expect(res.data.name).toEqual(positionFixture2.name);
      expect(res.data.id).toEqual(id);
    });
  });

  describe('remove position', () => {
    it('Должен мягко удалить позицию по id', async () => {
      const res = await positionApi.remove({id});
      expect(res.data.id).toEqual(id);
      expect(res.data.isDeleted).toEqual(true);
      expect(res.data.deletedAt).toBeTruthy();
    });
  });

  describe('restore position', () => {
    it('Должен восстановить позицию по id', async () => {
      const res = await positionApi.restore({id});
      expect(res.data.id).toEqual(id);
      expect(res.data.isDeleted).toEqual(false);
    });
  });

  describe('search position', () => {
    it('Должен мягко удалить позицию по id', async () => {
      const res = await positionApi.search({
        limit: 2,
        page: 1
      });
      expect(res.data.length).toEqual(2);
    });
  });
})