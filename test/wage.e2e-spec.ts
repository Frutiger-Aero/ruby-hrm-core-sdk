import { WageHrmApiAdapter } from '../sdk/nestjs/build'
import { AuthService, TestTokensource } from './auth.stubs';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { grpcClientOptions } from '../src/grpc-client.options';
import { cleanup } from './utils';
import { getConnection, Repository } from 'typeorm';
import { 
  positionFixtureForBase1,
  positionFixtureForBase2,
  productFixtureForBase1,
  productFixtureForBase2,
  specializationFixtureForBase1,
  specializationFixtureForBase2,
  wageFixture1,
  wageFixture2
} from './fixtures';
import { HrmCoreModule } from '../sdk/nestjs/build';
import { SpecializationModel } from '../src/infrastructure/persistence/specialization/specialization.model';
import { ProductModel } from '../src/infrastructure/persistence/product/product.model';
import { PositionModel } from '../src/infrastructure/persistence/position/position.model';

describe('Wage (e2e)', () => {
  let wageApi: WageHrmApiAdapter;
  let id: string;
  let app = null;
  let specializationRepo:Repository<SpecializationModel> = null;
  let productRepo:Repository<ProductModel> = null;
  let positionRepo: Repository<PositionModel> = null;

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
  
      wageApi = app.get(WageHrmApiAdapter);
  
      tokenSource._token = AuthService.allGrants({
        tenantId: 'test',
        clientId: 'testApp',
      });

      specializationRepo = getConnection().getRepository(SpecializationModel);
      productRepo = getConnection().getRepository(ProductModel);
      positionRepo = getConnection().getRepository(PositionModel);
      const inserts = [
        productRepo.insert(productFixtureForBase1),
        productRepo.insert(productFixtureForBase2),
        positionRepo.insert(positionFixtureForBase1),
        positionRepo.insert(positionFixtureForBase2),
        specializationRepo.insert(specializationFixtureForBase1),
        specializationRepo.insert(specializationFixtureForBase2),
      ]
      await Promise.all(inserts);
  });

  afterAll(async () => {
    await app.close();
    await cleanup(getConnection());
  });

  describe('CREATE wage', () => {
    it('Должен создать тариф', async () => {
      const result = await wageApi.create(wageFixture1);
      expect(result.data?.id).not.toBeNull();
      expect(result.data.grades[0].compensations[0].amount).toEqual(wageFixture1.grades[0].compensations[0].amount);
      expect(result.data.grades[0].compensations[0].type).toEqual(wageFixture1.grades[0].compensations[0].type);
      expect(result.data.grades[0].compensations[0].option).toEqual(wageFixture1.grades[0].compensations[0].option);

      expect(result.data.grades[0].rate.amount).toEqual(wageFixture1.grades[0].rate.amount);
      expect(result.data.grades[0].rate.type).toEqual(wageFixture1.grades[0].rate.type);
      expect(result.data.grades[0].rate.unit).toEqual(wageFixture1.grades[0].rate.unit);

      expect(result.data.product.id).toEqual(wageFixture1.product.id);
      expect(result.data.specialization.id).toEqual(wageFixture1.specialization.id);

      expect(result.data.regionId).toEqual(wageFixture1.regionId);

      expect(typeof result.data?.id).toBe('string');

      id = result.data.id;
    });
  });

  describe('Update position', () => {
    it('Должен обновить ставку тариф', async () => {
      const result = await wageApi.update({
        id,
        ...wageFixture2
      });
      expect(result.data?.id).not.toBeNull();
      expect(result.data.grades[0].compensations[0].amount).toEqual(wageFixture2.grades[0].compensations[0].amount);
      expect(result.data.grades[0].compensations[0].type).toEqual(wageFixture2.grades[0].compensations[0].type);
      expect(result.data.grades[0].compensations[0].option).toEqual(wageFixture2.grades[0].compensations[0].option);
      expect(result.data.grades[0].position.id).toEqual(wageFixture2.grades[0].position.id);

      expect(result.data.grades[0].rate.amount).toEqual(wageFixture2.grades[0].rate.amount);
      expect(result.data.grades[0].rate.type).toEqual(wageFixture2.grades[0].rate.type);
      expect(result.data.grades[0].rate.unit).toEqual(wageFixture2.grades[0].rate.unit);
      expect(result.data.product.id).toEqual(wageFixture2.product.id);
      expect(result.data.specialization.id).toEqual(wageFixture2.specialization.id);
      
    });
  });

  describe('Remove wage', () => {
    it('Должен мягко удалить тариф', async () => {
      const result = await wageApi.remove({
        id
      });

      expect(result.data.id).toEqual(id);
      expect(result.data.isDeleted).toEqual(true);
      expect(result.data.deletedAt).toBeTruthy();
    });
  });

  describe('Restore wage', () => {
    it('Должен восстановить тариф', async () => {
      const result = await wageApi.restore({
        id
      });

      expect(result.data.id).toEqual(id);
      expect(result.data.isDeleted).toEqual(false);
    });
  });


  describe('get wage by id', () => {
    it('Должен отдать тариф по id', async () => {
      const res = await wageApi.findById({id});
      expect(res.data.id).toEqual(id);
    });
  });

  describe('search position', () => {
    it('Должен вывести список с 1 ставкой', async () => {
      const res = await wageApi.search({
        limit: 2,
        page: 1
      });
      expect(res.data.length).toEqual(1);
      expect(res.data[0].id).toEqual(id);
    });
  });
});