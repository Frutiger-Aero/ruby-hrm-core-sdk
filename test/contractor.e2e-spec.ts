import { ContractorHrmApiAdapter } from '../sdk/nestjs/build'
import { AuthService, TestTokensource } from './auth.stubs';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { grpcClientOptions } from '../src/grpc-client.options';
import { cleanup } from './utils';
import { getConnection, Repository } from 'typeorm';
import { blockingReasonForBase1, contractForBase1, contractForBase2, contractForBase3, contractForBase4, contractorFixture1, contractorFixture2, contractorFixture4, contractorForBase1, contractorForBase2, freezingReasonForBase1, freezingReasonForBase2, gradeFixtureForBase1, gradeFixtureForBase2, positionFixtureForBase1, positionFixtureForBase2, productFixtureForBase1, productFixtureForBase2, skill1, specializationFixtureForBase1, specializationFixtureForBase2, wageFixtureForBase1, wageFixtureForBase2 } from './fixtures';
import { HrmCoreModule } from '../sdk/nestjs/build';
import { CONTRACT_STATUS, WORK_STATUS } from '../src/domain';
import { BlockingReasonModel } from '../src/infrastructure/persistence/reason/blocking-reason.model';
import { SpecializationModel } from '../src/infrastructure/persistence/specialization/specialization.model';
import { ProductModel } from '../src/infrastructure/persistence/product/product.model';
import { PositionModel } from '../src/infrastructure/persistence/position/position.model';
import { WageModel } from '../src/infrastructure/persistence/wage/wage.model';
import { ContractorModel } from '../src/infrastructure/persistence/contractor/contractor.model';
import { GradeModel } from '../src/infrastructure/persistence/wage/grade.model';
import { SkillModel } from '../src/infrastructure/persistence/skill/skill.model';
import { ContractModel } from '../src/infrastructure/persistence/contract/contract.model';

describe('Contract (e2e)', () => {
  let contractorApi: ContractorHrmApiAdapter;
  let OuterId: string;
  let app = null;
  let blockingReasonRepo: Repository<BlockingReasonModel> = null;
  let specializationRepo:Repository<SpecializationModel> = null;
  let productRepo:Repository<ProductModel> = null;
  let positionRepo: Repository<PositionModel> = null;
  let wageRepo: Repository<WageModel> = null;
  let gradeRepo: Repository<GradeModel> = null;
  let skillRepo: Repository<SkillModel> = null;
  let contractRepo: Repository<ContractModel> = null;
  let contractorRepo: Repository<ContractorModel> = null;


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
      specializationRepo = getConnection().getRepository(SpecializationModel);
      productRepo = getConnection().getRepository(ProductModel);
      positionRepo = getConnection().getRepository(PositionModel);
      wageRepo = getConnection().getRepository(WageModel);
      gradeRepo = getConnection().getRepository(GradeModel);
      skillRepo = getConnection().getRepository(SkillModel);
      contractRepo = getConnection().getRepository(ContractModel);
      contractorRepo = getConnection().getRepository(ContractorModel);
      await cleanup(getConnection());

      await blockingReasonRepo.insert(blockingReasonForBase1);
      await blockingReasonRepo.insert(freezingReasonForBase1);
      await blockingReasonRepo.insert(freezingReasonForBase2);

      await productRepo.insert(productFixtureForBase1);
      await productRepo.insert(productFixtureForBase2);
      await positionRepo.insert(positionFixtureForBase1);
      await positionRepo.insert(positionFixtureForBase2);
      await specializationRepo.insert(specializationFixtureForBase1);
      await specializationRepo.insert(specializationFixtureForBase2);
      await wageRepo.insert(wageFixtureForBase1);
      await wageRepo.insert(wageFixtureForBase2);
      await gradeRepo.insert(gradeFixtureForBase1);
      await gradeRepo.insert(gradeFixtureForBase2);
      await skillRepo.insert(skill1);

      await contractorRepo.insert(contractorForBase1);
      await contractorRepo.insert(contractorForBase2);

      await contractRepo.insert(contractForBase1);
      await contractRepo.insert(contractForBase2);
      await contractRepo.insert(contractForBase3);
      await contractRepo.insert(contractForBase4);
  });

  afterAll(async () => {
    await app.close();
    await cleanup(getConnection());
  });

  describe('CREATE contractor', () => {
    it('Должен создать исполнителя', async () => {
      const result = await contractorApi.create(contractorFixture1);
      expect(result.data.rating).toEqual(contractorFixture1.rating);
      expect(result.data.workStatus).toEqual(WORK_STATUS.ACTIVE);
      expect(result.data.userId).toEqual(contractorFixture1.userId);
      expect(result.data.status).toEqual(contractorFixture1.status);
      expect(result.data.regionId).toEqual(contractorFixture1.regionId);

      expect(result.data?.id).not.toBeNull();
      expect(typeof result.data?.id).toBe('string');
      OuterId = result.data.id;
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
        id: OuterId,
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
      const result = await contractorApi.findById({id: OuterId});
      expect(result.data.rating).toEqual(contractorFixture2.rating);
      expect(result.data.workStatus).toEqual(contractorFixture2.workStatus);
      expect(result.data.userId).toEqual(contractorFixture1.userId);
      expect(result.data.status).toEqual(contractorFixture2.status);
      expect(result.data.regionId).toEqual(contractorFixture2.regionId);
      expect(result.data.id).toEqual(OuterId);
    });
  });

  describe('remove specialization', () => {
    it('Должен мягко удалить исполнителя по id', async () => {
      const res = await contractorApi.remove({id: OuterId});
      expect(res.data.id).toEqual(OuterId);
      expect(res.data.isDeleted).toEqual(true);
      expect(res.data.deletedAt).toBeTruthy();
    });
  });

  describe('restore contractor', () => {
    it('Должен восстановить исполнителя по id', async () => {
      const res = await contractorApi.restore({id: OuterId});
      expect(res.data.id).toEqual(OuterId);
      expect(res.data.isDeleted).toEqual(false);
    });
  });

  describe('search contractor', () => {
    it('Должен вывести список исполнителей', async () => {
      const res = await contractorApi.search({
        limit: 10,
        page: 1
      });
      expect(res.data.length).toEqual(3);
    });
  });

  describe('block contractor', () => {
    it('Должен изменить статус на blocked', async () => {
      const res = await contractorApi.block({
        id: contractorForBase1.id,
        reason: {
          id: blockingReasonForBase1.id
        }
      });
      expect(res.data.contracts).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            status : CONTRACT_STATUS.BLOCKED
          })
        ])
      )
      expect(res.data.workStatus).toEqual(WORK_STATUS.BLOCKED);
      expect(res.data.id).toEqual(contractorForBase1.id);
    });
  });

  describe('block with not exited reason', () => {
    it('Должен выдать ошибку', async () => {
      let error;
      const {data: {id}} = await contractorApi.create(contractorFixture4);
      try {
        await contractorApi.block({
          id,
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

  describe('block already blocked contractor', async () => {
    it('Статусы не должны поменяться', async () => {
      const res = await contractorApi.block({
        id: contractorForBase1.id,
        reason: {
          id: blockingReasonForBase1.id
        }
      });
      expect(res.data.contracts).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            status : CONTRACT_STATUS.BLOCKED
          })
        ])
      )
      expect(res.data.workStatus).toEqual(WORK_STATUS.BLOCKED);
      expect(res.data.id).toEqual(contractorForBase1.id);
    });
  });


  describe('block not existed contractor', async () => {
    it('Должен вернуть ошибку отсутствия исполнителя', async () => {
      let error;
      try {
        await contractorApi.block({ 
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
  });
  describe('freeze contractor', async () => {
    it('Должен заморозить исполнителя и все его контракты', async () => {
      const res = await contractorApi.block({ 
        id: contractorForBase2.id,
        reason: {
          id: freezingReasonForBase1.id
        }
      });
      expect(res.data.workStatus).toEqual(WORK_STATUS.FROZEN);
      expect(res.data.contracts).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            status : CONTRACT_STATUS.FROZEN
          })
        ])
      )
    });

    it('Должен отдать уже замороженного исполнителя исполнителя и все его замороженные контракты', async () => {
      const res = await contractorApi.block({ 
        id: contractorForBase2.id,
        reason: {
          id: freezingReasonForBase1.id
        }
      });
      expect(res.data.workStatus).toEqual(WORK_STATUS.FROZEN);
      expect(res.data.contracts).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            status : CONTRACT_STATUS.FROZEN
          })
        ])
      )
    });
  });
});