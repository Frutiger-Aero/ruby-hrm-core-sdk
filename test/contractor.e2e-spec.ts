import { ContractorHrmApiAdapter } from '../sdk/nestjs/build'
import { AuthService, TestTokensource } from './auth.stubs';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { grpcClientOptions } from '../src/grpc-client.options';
import { cleanup } from './utils';
import { getConnection } from 'typeorm';
import { contractorFixture1, contractorFixture2 } from './fixtures';
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

      expect(result.data.rating).toEqual(contractorFixture1.rating);
      expect(result.data.workStatus).toEqual(contractorFixture1.workStatus);
      expect(result.data.userId).toEqual(contractorFixture1.userId);
      expect(result.data.status).toEqual(contractorFixture1.status);
      expect(result.data.regionId).toEqual(contractorFixture1.regionId);

      expect(result.data?.id).not.toBeNull();
      expect(typeof result.data?.id).toBe('string');
      id = result.data.id;
    });
  });

  describe('CREATE contractor', () => {
    it('Должен выбросить ошибку на дубль', async () => {
      let error;
      try {
        await contractorApi.create(contractorFixture1);
      } catch (err) {
        error = err;
      }
      expect(error.message).toMatch(/ALREADY_EXISTS/);
    });
  });

  describe('Update contractor', () => {
    it('Должен изменить исполнителя', async () => {
      const result = await contractorApi.update({
        id,
        ...contractorFixture2
      });

      expect(result.data.rating).toEqual(contractorFixture2.rating);
      expect(result.data.workStatus).toEqual(contractorFixture2.workStatus);
      expect(result.data.userId).toEqual(contractorFixture1.userId);
      expect(result.data.status).toEqual(contractorFixture2.status);
      expect(result.data.regionId).toEqual(contractorFixture2.regionId);
    });
  });

  describe('get contractor by id', () => {
    it('Должен отдать исполнителя по id', async () => {
      const result = await contractorApi.findById({id});
      expect(result.data.rating).toEqual(contractorFixture2.rating);
      expect(result.data.workStatus).toEqual(contractorFixture2.workStatus);
      expect(result.data.userId).toEqual(contractorFixture1.userId);
      expect(result.data.status).toEqual(contractorFixture2.status);
      expect(result.data.regionId).toEqual(contractorFixture2.regionId);
      expect(result.data.id).toEqual(id);
    });
  });

  describe('remove specialization', () => {
    it('Должен мягко удалить исполнителя по id', async () => {
      const res = await contractorApi.remove({id});
      expect(res.data.id).toEqual(id);
      expect(res.data.isDeleted).toEqual(true);
      expect(res.data.deletedAt).toBeTruthy();
    });
  });

  describe('restore contractor', () => {
    it('Должен восстановить исполнителя по id', async () => {
      const res = await contractorApi.restore({id});
      expect(res.data.id).toEqual(id);
      expect(res.data.isDeleted).toEqual(false);
    });
  });

  describe('search contractor', () => {
    it('Должен вывести список исполнителей', async () => {
      const res = await contractorApi.search({
        limit: 2,
        page: 1
      });
      expect(res.data.length).toEqual(1);
    });
  });

})