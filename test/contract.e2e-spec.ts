import { ContractHrmApiAdapter } from '../sdk/nestjs/build'
import { AuthService, TestTokensource } from './auth.stubs';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { grpcClientOptions } from '../src/grpc-client.options';
import { cleanup } from './utils';
import { getConnection, Repository } from 'typeorm';
import { contractFixture1, contractFixture2, contractorForBase1, contractorForBase2, gradeFixtureForBase1, gradeFixtureForBase2, positionFixtureForBase1, positionFixtureForBase2, productFixtureForBase1, productFixtureForBase2, specializationFixtureForBase1, specializationFixtureForBase2, wageFixtureForBase1, wageFixtureForBase2 } from './fixtures';
import { HrmCoreModule } from '../sdk/nestjs/build';
import { PositionModel } from '../src/infrastructure/persistence/position/position.model';
import { ProductModel } from '../src/infrastructure/persistence/product/product.model';
import { SpecializationModel } from '../src/infrastructure/persistence/specialization/specialization.model';
import { ContractorModel } from '../src/infrastructure/persistence/contractor/contractor.model';
import { WageModel } from '../src/infrastructure/persistence/wage/wage.model';
import { GradeModel } from '../src/infrastructure/persistence/wage/grade.model';

describe('Contract (e2e)', () => {
  let contractApi: ContractHrmApiAdapter;
  let id: string;
  let app = null;

  let specializationRepo:Repository<SpecializationModel> = null;
  let productRepo:Repository<ProductModel> = null;
  let positionRepo: Repository<PositionModel> = null;
  let contractorRepo: Repository<ContractorModel> = null;
  let wageRepo: Repository<WageModel> = null;
  let gradeRepo: Repository<GradeModel> = null;

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

      await cleanup(getConnection());

      specializationRepo = getConnection().getRepository(SpecializationModel);
      productRepo = getConnection().getRepository(ProductModel);
      positionRepo = getConnection().getRepository(PositionModel);
      wageRepo = getConnection().getRepository(WageModel);
      contractorRepo = getConnection().getRepository(ContractorModel);
      gradeRepo = getConnection().getRepository(GradeModel);
      await  productRepo.insert(productFixtureForBase1),
      await  productRepo.insert(productFixtureForBase2),
      await  positionRepo.insert(positionFixtureForBase1),
      await  positionRepo.insert(positionFixtureForBase2),
      await  specializationRepo.insert(specializationFixtureForBase1),
      await  specializationRepo.insert(specializationFixtureForBase2),
      await  wageRepo.insert(wageFixtureForBase1),
      await  wageRepo.insert(wageFixtureForBase2),
      await  gradeRepo.insert(gradeFixtureForBase1),
      await  gradeRepo.insert(gradeFixtureForBase2),
      await  contractorRepo.insert(contractorForBase1)
      await  contractorRepo.insert(contractorForBase2)

  });

  afterAll(async () => {
    await app.close();
    await cleanup(getConnection());
  });

  describe('CREATE contract', () => {
    it('Должен создать контракт', async () => {
      const result = await contractApi.create(contractFixture1);
      expect(result.data.product.id).toEqual(productFixtureForBase1.id);
      expect(result.data.status).toEqual(contractFixture1.status);
      expect(result.data.specialization.id).toEqual(specializationFixtureForBase1.id);
      expect(result.data.wage.id).toEqual(contractFixture1.wage.id);
      expect(result.data.grade.id).toEqual(contractFixture1.grade.id);
      expect(result.data.contractor.id).toEqual(contractFixture1.contractor.id);
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
      expect(result.data.product.id).toEqual(productFixtureForBase1.id);
      expect(result.data.status).toEqual(contractFixture2.status);
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
      expect(result.data.product.id).toEqual(productFixtureForBase1.id);
      expect(result.data.status).toEqual(contractFixture2.status);
      expect(result.data.specialization.id).toEqual(specializationFixtureForBase1.id);
      expect(result.data.wage.id).toEqual(contractFixture2.wage.id);
      expect(result.data.grade.id).toEqual(contractFixture2.grade.id);
      expect(result.data.contractor.id).toEqual(contractFixture2.contractor.id);
      expect(result.data.id).toEqual(id);
    });
  });

  describe('remove contract', () => {
    it('Должен мягко удалить исполнителя по id', async () => {
      const res = await contractApi.remove({id});
      expect(res.data.id).toEqual(id);
      expect(res.data.isDeleted).toEqual(true);
      expect(res.data.deletedAt).toBeTruthy();
    });
  });

  describe('restore contract', () => {
    it('Должен восстановить исполнителя по id', async () => {
      const res = await contractApi.restore({id});
      expect(res.data.id).toEqual(id);
      expect(res.data.isDeleted).toEqual(false);
    });
  });

  describe('search contract', () => {
    it('Должен вывести список контрактов', async () => {
      const res = await contractApi.search({
        limit: 2,
        page: 1
      });
      expect(res.data.length).toEqual(1);
    });
  });

})