import { ProductHrmApiAdapter } from '../sdk/nestjs/build'
import { AuthService, TestTokensource } from './auth.stubs';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { grpcClientOptions } from '../src/grpc-client.options';
import { cleanup } from './utils';
import { getConnection } from 'typeorm';
import { productFixture1, productFixture2 } from './fixtures';
import { HrmCoreModule } from '../sdk/nestjs/build';

describe('Product (e2e)', () => {
  let productApi: ProductHrmApiAdapter;
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
  
      productApi = app.get(ProductHrmApiAdapter);
  
      tokenSource._token = AuthService.allGrants({
        tenantId: 'test',
        clientId: 'testApp',
      });
  });

  afterAll(async () => {
    await app.close();
    await cleanup(getConnection());
  });

  describe('CREATE product', () => {
    it('Должен создать продукт', async () => {
      const result = await productApi.create(productFixture1);
      expect(result.data?.id).not.toBeNull();
      expect(typeof result.data?.id).toBe('string');

      id = result.data.id;
    });
  });

  describe('CREATE duplicate name product', () => {
    it('Должен выбросить ошибку на дубль', async () => {
      let error;
      try {
        await productApi.create(productFixture1);
      } catch (err) {
        error = err;
      }
      expect(error.message).toMatch(/ALREADY_EXISTS/);
    });
  });

  describe('Update product', () => {
    it('Должен обновить продукт', async () => {
      const res = await productApi.update({
        ...productFixture2,
        id
      });
      expect(res.data.title).toEqual(productFixture2.title);
      expect(res.data.name).toEqual(productFixture2.name);
      expect(res.data.id).toEqual(id);
    });
  });

  describe('Update duplicate name product', () => {
    it('Должен выбросить ошибку на дубль', async () => {
      let error;
      await productApi.create(productFixture1);
      try {
        await productApi.update({
          ...productFixture1,
          id
        });
      } catch (err) {
        error = err;
      }
      expect(error.message).toMatch(/ALREADY_EXISTS/);
    });
  });

  describe('get product by id', () => {
    it('Должен отдать продукт по id', async () => {
      const res = await productApi.findById({id});
      expect(res.data.title).toEqual(productFixture2.title);
      expect(res.data.name).toEqual(productFixture2.name);
      expect(res.data.id).toEqual(id);
    });
  });

  describe('remove product', () => {
    it('Должен мягко удалить продукт по id', async () => {
      const res = await productApi.remove({id});
      expect(res.data.id).toEqual(id);
      expect(res.data.isDeleted).toEqual(true);
      expect(res.data.deletedAt).toBeTruthy();
    });
  });

  describe('restore product', () => {
    it('Должен восстановить продукт по id', async () => {
      const res = await productApi.restore({id});
      expect(res.data.id).toEqual(id);
      expect(res.data.isDeleted).toEqual(false);
    });
  });

  describe('search product', () => {
    it('Должен мягко удалить продукт по id', async () => {
      const res = await productApi.search({
        limit: 2,
        page: 1
      });
      expect(res.data.length).toEqual(2);
    });
  });
})