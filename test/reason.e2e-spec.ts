import { BlockingReasonHrmApiAdapter } from '../sdk/nestjs/build'
import { AuthService, TestTokensource } from './auth.stubs';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { grpcClientOptions } from '../src/grpc-client.options';
import { cleanup } from './utils';
import { getConnection, Repository } from 'typeorm';
import { reasonFixture1, reasonFixture2, reasonGroupForBase2, reasonGroupForBase1 } from './fixtures';
import { HrmCoreModule } from '../sdk/nestjs/build';
import { BlockingReasonGroupModel } from '../src/infrastructure/persistence/reason-group/blocking-reason-group.model';

describe('Reason (e2e)', () => {
  let reasonApi: BlockingReasonHrmApiAdapter;
  let id: string;
  let app = null;
  let blockingReasonGroupRepo:Repository<BlockingReasonGroupModel> = null;

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
  
      reasonApi = app.get(BlockingReasonHrmApiAdapter);
  
      tokenSource._token = AuthService.allGrants({
        tenantId: 'test',
        clientId: 'testApp',
      });

      blockingReasonGroupRepo = getConnection().getRepository(BlockingReasonGroupModel);

      blockingReasonGroupRepo.insert(reasonGroupForBase1);
      blockingReasonGroupRepo.insert(reasonGroupForBase2);
  });

  afterAll(async () => {
    await app.close();
    await cleanup(getConnection());
  });

  describe('CREATE reason', () => {
    it('Должен создать сущность', async () => {
      const result = await reasonApi.create(reasonFixture1);
      expect(result.data?.id).not.toBeNull();
      expect(typeof result.data?.id).toBe('string');
      id = result.data.id;
    });
  });

  describe('Update reason', () => {
    it('Должен обновить сущность', async () => {
      const res = await reasonApi.update({
        ...reasonFixture2,
        id
      });
      expect(res.data.name).toEqual(reasonFixture2.name);
      expect(res.data.isAvailableForContractor).toEqual(reasonFixture2.isAvailableForContractor);
      expect(res.data.isCommonBlock).toEqual(reasonFixture2.isCommonBlock);
      expect(res.data.isInstant).toEqual(reasonFixture2.isInstant);
      expect(res.data.isNeedRetraining).toEqual(reasonFixture2.isNeedRetraining);
      expect(res.data.isPermanent).toEqual(reasonFixture2.isPermanent);
      expect(res.data.type).toEqual(reasonFixture2.type);
      expect(res.data.id).toEqual(id);
    });
  });

  describe('get reason by id', () => {
    it('Должен отдать сущность по id', async () => {
      const res = await reasonApi.findById({id});
      expect(res.data.name).toEqual(reasonFixture2.name);
      expect(res.data.isAvailableForContractor).toEqual(reasonFixture2.isAvailableForContractor);
      expect(res.data.isCommonBlock).toEqual(reasonFixture2.isCommonBlock);
      expect(res.data.isInstant).toEqual(reasonFixture2.isInstant);
      expect(res.data.isNeedRetraining).toEqual(reasonFixture2.isNeedRetraining);
      expect(res.data.type).toEqual(reasonFixture2.type);
      expect(res.data.isPermanent).toEqual(reasonFixture2.isPermanent);
      expect(res.data.id).toEqual(id);
    });
  });

  describe('remove reason', () => {
    it('Должен мягко удалить сущность по id', async () => {
      const res = await reasonApi.remove({id});
      expect(res.data.id).toEqual(id);
      expect(res.data.isDeleted).toEqual(true);
      expect(res.data.deletedAt).toBeTruthy();
    });
  });

  describe('restore reason', () => {
    it('Должен восстановить сущность по id', async () => {
      const res = await reasonApi.restore({id});
      expect(res.data.id).toEqual(id);
      expect(res.data.isDeleted).toEqual(false);
    });
  });

  describe('search reason', () => {
    it('Должен отдать список сущностей', async () => {
      const res = await reasonApi.search({
        limit: 2,
        page: 1
      });
      expect(res.data.length).toEqual(1);
    });
  });
})