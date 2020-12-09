import { SpecializationHrmApiAdapter } from '../sdk/nestjs/build'
import { AuthService, TestTokensource } from './auth.stubs';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { grpcClientOptions } from '../src/grpc-client.options';
import { cleanup } from './utils';
import { getConnection } from 'typeorm';
import { specializationFixture1, specializationFixture2 } from './fixtures';
import { HrmCoreModule } from '../sdk/nestjs';

describe('Specialization (e2e)', () => {
  let specializationApi: SpecializationHrmApiAdapter;
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
  
      specializationApi = app.get(SpecializationHrmApiAdapter);
  
      tokenSource._token = AuthService.allGrants({
        tenantId: 'test',
        clientId: 'testApp',
      });
  });

  afterAll(async () => {
    await app.close();
    await cleanup(getConnection());
  });

  describe('CREATE specialization', () => {
    it('Должен создать спeциализацию', async () => {
      const result = await specializationApi.create(specializationFixture1);
      expect(result.data?.id).not.toBeNull();
      expect(typeof result.data?.id).toBe('string');

      id = result.data.id;
    });
  });

  describe('CREATE duplicate name specialization', () => {
    it('Должен выбросить ошибку на дубль', async () => {
      let error;
      try {
        await specializationApi.create(specializationFixture1);
      } catch (err) {
        error = err;
      }
      expect(error.message).toMatch(/ALREADY_EXISTS/);
    });
  });

  describe('Update specialization', () => {
    it('Должен обновить специализацию', async () => {
      const res = await specializationApi.update({
        ...specializationFixture2,
        id
      });
      expect(res.data.title).toEqual(specializationFixture2.title);
      expect(res.data.name).toEqual(specializationFixture2.name);
      expect(res.data.id).toEqual(id);
    });
  });

  describe('Update duplicate name specialization', () => {
    it('Должен выбросить ошибку на дубль', async () => {
      let error;
      await specializationApi.create(specializationFixture1);
      try {
        await specializationApi.update({
          ...specializationFixture1,
          id
        });
      } catch (err) {
        error = err;
      }
      expect(error.message).toMatch(/ALREADY_EXISTS/);
    });
  });

  describe('get specialization by id', () => {
    it('Должен отдать специализацию по id', async () => {
      const res = await specializationApi.findById({id});
      expect(res.data.title).toEqual(specializationFixture2.title);
      expect(res.data.name).toEqual(specializationFixture2.name);
      expect(res.data.id).toEqual(id);
    });
  });

  describe('remove specialization', () => {
    it('Должен мягко удалить специализацию по id', async () => {
      const res = await specializationApi.remove({id});
      expect(res.data.id).toEqual(id);
      expect(res.data.isDeleted).toEqual(true);
      expect(res.data.deletedAt).toBeTruthy();
    });
  });

  describe('restore specialization', () => {
    it('Должен восстановить специализацию по id', async () => {
      const res = await specializationApi.restore({id});
      expect(res.data.id).toEqual(id);
      expect(res.data.isDeleted).toEqual(false);
    });
  });

  describe('search specialization', () => {
    it('Должен мягко удалить специализацию по id', async () => {
      const res = await specializationApi.search({
        limit: 2,
        page: 1
      });
      expect(res.data.length).toEqual(2);
    });
  });
})