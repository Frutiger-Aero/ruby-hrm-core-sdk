import { ContractorHrmApiAdapter } from '../sdk/nestjs/build'
import { AuthService, TestTokensource } from './auth.stubs';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { grpcClientOptions } from '../src/grpc-client.options';
import { cleanup } from './utils';
import { getConnection, Repository } from 'typeorm';
import { blockingReasonForBase1, blockingReasonForBase2, contractorFixture1, contractorFixture2, contractorFixture3, contractorFixture4, contractorFixture5, freezingReasonForBase1 } from './fixtures';
import { HrmCoreModule } from '../sdk/nestjs/build';
import { WORK_STATUS } from '../src/domain';
import { BlockingReasonModel } from '../src/infrastructure/persistence/reason/blocking-reason.model';
import { FreezingReasonModel } from '../src/infrastructure/persistence/reason/freezing-reason.model';

describe('Contract (e2e)', () => {
  let contractorApi: ContractorHrmApiAdapter;
  let id: string;
  let app = null;
  let blockingReasonRepo: Repository<BlockingReasonModel> = null;
  let freezingReasonRepo: Repository<FreezingReasonModel> = null;


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
      blockingReasonRepo = getConnection().getRepository(BlockingReasonModel);
      freezingReasonRepo = getConnection().getRepository(FreezingReasonModel);

      await blockingReasonRepo.insert(blockingReasonForBase1);
      await blockingReasonRepo.insert(blockingReasonForBase2);
      await freezingReasonRepo.insert(freezingReasonForBase1);
  });

  afterAll(async () => {
    await app.close();
    await cleanup(getConnection());
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

  describe('block contractor', () => {
    it('Должен изменить статус на blocked', async () => {
      const res = await contractorApi.block({
        id,
        reason: {
          id: blockingReasonForBase1.id
        }
      });
      expect(res.data.workStatus).toEqual(WORK_STATUS.BLOCKED);
      expect(res.data.id).toEqual(id);
    });
  });

  describe('activate contractor', () => {
    it('Должен изменить статус на active', async () => {
      const res = await contractorApi.activate({
        id
      });
      expect(res.data.workStatus).toEqual(WORK_STATUS.ACTIVE);
      expect(res.data.id).toEqual(id);
    });
  });

  describe('activate permanently blocked contractor', () => {
    it('Должен выдать ошибку', async () => {
      let error;
      const {data: {id: contractorId}} = await contractorApi.create(contractorFixture3);
      await contractorApi.block({
        id: contractorId,
        reason: {
          id: blockingReasonForBase2.id
        }
      });
      try {
        await contractorApi.activate({
          id: contractorId
        });
      } catch (err) {
        error = err.message;
      }
      const res = await contractorApi.findById({ id: contractorId });
      expect(error).toMatch(/Can\'t activate contractor because of blocking reason/);
      expect(res.data.workStatus).toEqual(WORK_STATUS.BLOCKED);
    });
  });

  describe('block with not exited reason', () => {
    it('Должен выдать ошибку', async () => {
      let error;
      const {data: {id: contractorId}} = await contractorApi.create(contractorFixture4);
      try {
        await contractorApi.block({
          id: contractorId,
          reason: {
            id: '8adcc108-0f41-4dcd-9c31-9ae7f4888ceb'
          }
        });
      } catch (err) {
        error = err.message;
      }
      expect(error).toMatch(/404: NOT_FOUND - Reason id=8adcc108-0f41-4dcd-9c31-9ae7f4888ceb doesn't exist/);
    });
  });

  describe('freeze contractor', async () => {
    let contractorId;
    it('Должен вернуть ошибку отсутствия исполнителя', async () => {
      let error;
      try {
        await contractorApi.freeze({ 
          id: '5f7b80aa-4fe7-4ac1-9e27-389baf3c02f8',
          reason: {
            id: freezingReasonForBase1.id
          }
        });
      } catch (err) {
        error = err.message;
      }
      expect(error).toMatch(/404: NOT_FOUND - Contractor id=5f7b80aa-4fe7-4ac1-9e27-389baf3c02f8 doesn't exist/);
    });

    it('Должен заморозить исполнителя', async () => {
      const {data: {id}} = await contractorApi.create(contractorFixture5);
      contractorId = id;
      const res = await contractorApi.freeze({ 
        id,
        reason: {
          id: freezingReasonForBase1.id
        }
      });
      expect(res.data.workStatus).toEqual(WORK_STATUS.FROZEN);
    });

    it('Должен вернуть замороженного исполнителя', async () => {
      contractorId = id;
      const res = await contractorApi.freeze({ 
        id,
        reason: {
          id: freezingReasonForBase1.id
        }
      });
      expect(res.data.workStatus).toEqual(WORK_STATUS.FROZEN);
    });

    it('Должен разморозить исполнителя', async () => {
      const res = await contractorApi.activate({ id: contractorId });
      expect(res.data.workStatus).toEqual(WORK_STATUS.ACTIVE);
    });

    it('Должен вернуть ошибку отсутствия причины', async () => {
      let error;
      try {
        await contractorApi.freeze({ 
          id: contractorId,
          reason: {
            id: '430db34b-8e3f-40d9-b2ac-5c1a339a7ff5'
          }
        });
      } catch (err) {
        error = err.message;
      }
      expect(error).toMatch(/404: NOT_FOUND - Reason id=430db34b-8e3f-40d9-b2ac-5c1a339a7ff5 doesn't exist/);
    });
  });
});