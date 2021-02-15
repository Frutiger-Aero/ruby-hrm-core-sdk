import { ContractHrmApiAdapter } from '../sdk/nestjs/build'
import { AuthService, TestTokensource } from './auth.stubs';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { grpcClientOptions } from '../src/grpc-client.options';
import { cleanup } from './utils';
import { getConnection, Repository } from 'typeorm';
import { blockingReasonForBase1, blockingReasonForBase2, contractFixture1, contractFixture2, contractForBase1, contractForBase2, contractForBase3, contractForBase4, contractForBase5, contractorForBase1, contractorForBase2, contractorForBase3, freezingReasonForBase1, freezingReasonForBase2, frozenContractForBase, gradeFixtureForBase1, gradeFixtureForBase2, positionFixtureForBase1, positionFixtureForBase2, skill1, specializationFixtureForBase1, specializationFixtureForBase2, wageFixtureForBase1, wageFixtureForBase2 } from './fixtures';
import { HrmCoreModule } from '../sdk/nestjs/build';
import { PositionModel } from '../src/infrastructure/persistence/position/position.model';
import { SpecializationModel } from '../src/infrastructure/persistence/specialization/specialization.model';
import { ContractorModel } from '../src/infrastructure/persistence/contractor/contractor.model';
import { WageModel } from '../src/infrastructure/persistence/wage/wage.model';
import { GradeModel } from '../src/infrastructure/persistence/wage/grade.model';
import { SkillModel } from '../src/infrastructure/persistence/skill/skill.model';
import { BlockingReasonModel } from '../src/infrastructure/persistence/reason/blocking-reason.model';
import { ContractModel } from '../src/infrastructure/persistence/contract/contract.model';
import { CONTRACT_STATUS, WORK_STATUS } from '../src/domain';

describe('Contract (e2e)', () => {
  let contractApi: ContractHrmApiAdapter;
  let id: string;
  let app = null;

  let specializationRepo:Repository<SpecializationModel> = null;
  let positionRepo: Repository<PositionModel> = null;
  let wageRepo: Repository<WageModel> = null;
  let gradeRepo: Repository<GradeModel> = null;
  let skillRepo: Repository<SkillModel> = null;
  let blockingReasonRepo: Repository<BlockingReasonModel> = null;
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
  
      contractApi = app.get(ContractHrmApiAdapter);
  
      tokenSource._token = AuthService.allGrants({
        tenantId: 'test',
        clientId: 'testApp',
      });


      specializationRepo = getConnection().getRepository(SpecializationModel);
      positionRepo = getConnection().getRepository(PositionModel);
      wageRepo = getConnection().getRepository(WageModel);
      contractorRepo = getConnection().getRepository(ContractorModel);
      gradeRepo = getConnection().getRepository(GradeModel);
      skillRepo = getConnection().getRepository(SkillModel);
      blockingReasonRepo = getConnection().getRepository(BlockingReasonModel);
      contractRepo = getConnection().getRepository(ContractModel);

      await positionRepo.insert(positionFixtureForBase1);
      await positionRepo.insert(positionFixtureForBase2);
      await specializationRepo.insert(specializationFixtureForBase1);
      await specializationRepo.insert(specializationFixtureForBase2);
      await wageRepo.insert(wageFixtureForBase1);
      await wageRepo.insert(wageFixtureForBase2);
      await gradeRepo.insert(gradeFixtureForBase1);
      await gradeRepo.insert(gradeFixtureForBase2);
      await contractorRepo.insert(contractorForBase1);
      await contractorRepo.insert(contractorForBase2);
      await contractorRepo.insert(contractorForBase3);
      
      await skillRepo.insert(skill1);

      await blockingReasonRepo.insert(blockingReasonForBase1);
      await blockingReasonRepo.insert(blockingReasonForBase2);

      await blockingReasonRepo.insert(freezingReasonForBase1);
      await blockingReasonRepo.insert(freezingReasonForBase2);

      await contractRepo.insert(contractForBase1);
      await contractRepo.insert(contractForBase2);
      await contractRepo.insert(contractForBase3);
      await contractRepo.insert(contractForBase4);
      await contractRepo.insert(frozenContractForBase);
      await contractRepo.insert(contractForBase5);

  });

  afterAll(async () => {
    await app.close();
    await cleanup(getConnection());
  });

  describe('CREATE contract', () => {
    it('Должен создать контракт', async () => {
      const result = await contractApi.create(contractFixture1);
      expect(result.data.product.name).toEqual(wageFixtureForBase1.productSlug);
      expect(result.data.status).toEqual('ACTIVE');
      expect(result.data.specialization.id).toEqual(specializationFixtureForBase1.id);
      expect(result.data.wage.id).toEqual(contractFixture1.wage.id);
      expect(result.data.grade.id).toEqual(contractFixture1.grade.id);
      expect(result.data.contractor.id).toEqual(contractFixture1.contractor.id);
      expect(result.data.skills[0].id).toEqual(skill1.id);
      // expect(result.data.skills[0].option).toEqual(skill1.option);
      expect(result.data.skills[0].name).toEqual(skill1.name);
      expect(result.data.skills[0].title).toEqual(skill1.title);
      expect(result.data?.id).not.toBeNull();
      expect(typeof result.data?.id).toBe('string');
      id = result.data.id;
    });

    it('Должен выдать ошибку при создании отсутствие wage', async () => {
      let error;
      try {
        await contractApi.create({
          ...contractFixture1,
          wage: {
            id: '709ec173-5de0-479a-bf85-5a31ad71456b'
          }
        });
      } catch (err) {
        error = err;
      }
      expect(error.message).toMatch(/INVALID_ARGUMENT - wage id=709ec173-5de0-479a-bf85-5a31ad71456b doesn't exist/);
    });
  });

  describe('Update contract', () => {
    it('Должен изменить контракт', async () => {
      const result = await contractApi.update({
        id,
        ...contractFixture2
      });
      expect(result.data.product.name).toEqual(wageFixtureForBase1.productSlug);
      expect(result.data.status).toEqual('ACTIVE');
      expect(result.data.specialization.id).toEqual(specializationFixtureForBase1.id);
      expect(result.data.wage.id).toEqual(contractFixture2.wage.id);
      expect(result.data.grade.id).toEqual(contractFixture2.grade.id);
      expect(result.data.contractor.id).toEqual(contractFixture2.contractor.id);
    });

    it('Должен выдать ошибку при создании отсутствие wage', async () => {
      let error;
      try {
        await contractApi.update({
          id,
          wage: {
            id: '709ec173-5de0-479a-bf85-5a31ad71456b'
          }
        });
      } catch (err) {
        error = err;
      }
      expect(error.message).toMatch(/INVALID_ARGUMENT - wage id=709ec173-5de0-479a-bf85-5a31ad71456b doesn't exist/);
    });
  });

  describe('get contract by id', () => {
    it('Должен отдать контракт по id', async () => {
      const result = await contractApi.findById({id});
      expect(result.data.product.name).toEqual(wageFixtureForBase1.productSlug);
      expect(result.data.status).toEqual('ACTIVE');
      expect(result.data.specialization.id).toEqual(specializationFixtureForBase1.id);
      expect(result.data.wage.id).toEqual(contractFixture2.wage.id);
      expect(result.data.grade.id).toEqual(contractFixture2.grade.id);
      expect(result.data.contractor.id).toEqual(contractFixture2.contractor.id);
      expect(result.data.id).toEqual(id);
    });
  });

  describe('remove contract', () => {
    it('Должен мягко удалить контракт по id', async () => {
      const res = await contractApi.remove({id});
      expect(res.data.id).toEqual(id);
      expect(res.data.isDeleted).toEqual(true);
      expect(res.data.deletedAt).toBeTruthy();
    });
  });

  describe('restore contract', () => {
    it('Должен восстановить контракт по id', async () => {
      const res = await contractApi.restore({id});
      expect(res.data.id).toEqual(id);
      expect(res.data.isDeleted).toEqual(false);
    });
  });

  describe('search contract', () => {
    it('Должен вывести список контрактов', async () => {
      const res = await contractApi.search({
        limit: 10,
        page: 1
      });
      expect(res.data.length).toEqual(7);
    });
  });

  describe('block contract', () => {
    it('Должен выдать ошибку отсутствия причины', async () => {
      let error;
      try {
        await contractApi.block({
          id,
          reason: {
            id: '709ec173-5de0-479a-bf85-5a31ad71456b'
          }
        });
      } catch (err) {
        error = err;
      }
      expect(error.message).toMatch(/INVALID_ARGUMENT - reason id=709ec173-5de0-479a-bf85-5a31ad71456b doesn't exist/);
    });
    it('Должен выдать ошибку отсутствия контракта', async () => {
      let error;
      try {
        await contractApi.block({
          id: '709ec173-5de0-479a-bf85-5a31ad71456b',
          reason: {
            id: blockingReasonForBase1.id
          }
        });
      } catch (err) {
        error = err;
      }
      expect(error.message).toMatch(/404: NOT_FOUND - Contract id=709ec173-5de0-479a-bf85-5a31ad71456b doesn't exist/);
    });

    it('Должен заблокировать контакт,но не пользователя который имеет другой активный контракт, так как причина не общая', async () => {
      const res = await contractApi.block({
        id: contractForBase1.id,
        reason: {
          id: blockingReasonForBase2.id
        }
      });
      expect(res.data.status).toEqual(CONTRACT_STATUS.BLOCKED);
      expect(res.data.contractor.workStatus).toEqual(WORK_STATUS.ACTIVE);
    });
    it('Должен заблокировать контакт,и пользователя который имеет другой заблокированный контракт', async () => {
      const res = await contractApi.block({
        id: contractForBase2.id,
        reason: {
          id: blockingReasonForBase2.id
        }
      });
      expect(res.data.status).toEqual(CONTRACT_STATUS.BLOCKED);
      expect(res.data.contractor.workStatus).toEqual(WORK_STATUS.BLOCKED);
    });
    it('Должен отдать заблокированный ранее контакт', async () => {
      const res = await contractApi.block({
        id: contractForBase2.id,
        reason: {
          id: blockingReasonForBase2.id
        }
      });
      expect(res.data.status).toEqual(CONTRACT_STATUS.BLOCKED);
      expect(res.data.contractor.workStatus).toEqual(WORK_STATUS.BLOCKED);
    });
    it('Должен заблокировать контакт,и заморозить пользователя который имеет другой замороженный контракт', async () => {
      const res = await contractApi.block({
        id: contractForBase5.id,
        reason: {
          id: freezingReasonForBase1.id
        }
      });
      expect(res.data.status).toEqual(CONTRACT_STATUS.BLOCKED);
      expect(res.data.contractor.workStatus).toEqual(WORK_STATUS.FROZEN);
    });
    it('Должен заблокировать контакт,и заблокировать пользователя', async () => {
      const res = await contractApi.block({
        id: frozenContractForBase.id,
        reason: {
          id: blockingReasonForBase1.id
        }
      });
      expect(res.data.status).toEqual(CONTRACT_STATUS.BLOCKED);
      expect(res.data.contractor.workStatus).toEqual(WORK_STATUS.BLOCKED);
    });
    it('Должен заблокировать контракт и исполнителя по общей причине', async () => {
      const res = await contractApi.block({
        id: contractForBase3.id,
        reason: {
          id: blockingReasonForBase1.id
        }
      });
      const contract = await contractApi.findById({id:contractForBase3.id});
      expect(res.data.status).toEqual(CONTRACT_STATUS.BLOCKED);
      expect(res.data.contractor.workStatus).toEqual(WORK_STATUS.BLOCKED);
      expect(contract.data.status).toEqual(CONTRACT_STATUS.BLOCKED);
    });
  });
})