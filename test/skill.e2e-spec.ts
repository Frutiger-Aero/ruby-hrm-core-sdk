import { SkillHrmApiAdapter } from '../sdk/nestjs/build'
import { AuthService, TestTokensource } from './auth.stubs';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { grpcClientOptions } from '../src/grpc-client.options';
import { cleanup } from './utils';
import { getConnection } from 'typeorm';
import { skillFixture1, skillFixture2 } from './fixtures';
import { HrmCoreModule } from '../sdk/nestjs/build';

describe('Skill (e2e)', () => {
  let skillApi: SkillHrmApiAdapter;
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
  
      skillApi = app.get(SkillHrmApiAdapter);
  
      tokenSource._token = AuthService.allGrants({
        tenantId: 'test',
        clientId: 'testApp',
      });
  });

  afterAll(async () => {
    await app.close();
    await cleanup(getConnection());
  });

  describe('CREATE skill', () => {
    it('Должен создать скилл', async () => {
      const result = await skillApi.create(skillFixture1);
      expect(result.data?.id).not.toBeNull();
      expect(typeof result.data?.id).toBe('string');
      expect(result.data.options.map(opt => opt.name)).toEqual(skillFixture1.optionsSlugs)

      id = result.data.id;
    });
    it('Должен выбросить ошибку на дубль', async () => {
      let error;
      try {
        await skillApi.create(skillFixture1);
      } catch (err) {
        error = err;
      }
      expect(error.message).toMatch(/ALREADY_EXISTS/);
    });
    it('Должен выбросить ошибку на отсутствующие опции', async () => {
      let error;
      const badOptionSlugs = ['test', 'test1']
      try {
        await skillApi.create({
          ...skillFixture1,
          name: 'testwewrwerwrew',
          optionsSlugs: badOptionSlugs
        });
      } catch (err) {
        error = err;
      }
      expect(error.message).toMatch(`400: INVALID_ARGUMENT - options ${badOptionSlugs.join(',')} don't exist`);
    });
  });

  describe('Update skill', () => {
    it('Должен обновить скилл', async () => {
      const res = await skillApi.update({
        ...skillFixture2,
        id
      });
      expect(res.data.title).toEqual(skillFixture2.title);
      expect(res.data.name).toEqual(skillFixture2.name);
      expect(res.data.options.map(opt => opt.name)).toEqual(skillFixture2.optionsSlugs)
      expect(res.data.id).toEqual(id);
    });
    it('Должен выбросить ошибку на дубль', async () => {
      let error;
      await skillApi.create(skillFixture1);
      try {
        await skillApi.update({
          ...skillFixture1,
          id
        });
      } catch (err) {
        error = err;
      }
      expect(error.message).toMatch(/ALREADY_EXISTS/);
    });
    it('Должен выбросить ошибку на отсутствующие опции', async () => {
      let error;
      const badOptionSlugs = ['test', 'test1']
      try {
        await skillApi.update({
          id,
          optionsSlugs: badOptionSlugs
        });
      } catch (err) {
        error = err;
      }
      expect(error.message).toMatch(`400: INVALID_ARGUMENT - options ${badOptionSlugs.join(',')} don't exist`);
    });
  });

  describe('get skill by id', () => {
    it('Должен отдать скилл по id', async () => {
      const res = await skillApi.findById({id});
      expect(res.data.title).toEqual(skillFixture2.title);
      expect(res.data.name).toEqual(skillFixture2.name);
      expect(res.data.options.map(opt => opt.name)).toEqual(skillFixture2.optionsSlugs)
      expect(res.data.id).toEqual(id);
    });
  });

  describe('remove skill', () => {
    it('Должен мягко удалить скилл по id', async () => {
      const res = await skillApi.remove({id});
      expect(res.data.id).toEqual(id);
      expect(res.data.isDeleted).toEqual(true);
      expect(res.data.deletedAt).toBeTruthy();
    });
  });

  describe('restore skill', () => {
    it('Должен восстановить скилл по id', async () => {
      const res = await skillApi.restore({id});
      expect(res.data.id).toEqual(id);
      expect(res.data.isDeleted).toEqual(false);
    });
  });

  describe('search skill', () => {
    it('Должен вывести список скилов', async () => {
      const res = await skillApi.search({
        limit: 2,
        page: 1
      });
      expect(res.data.length).toEqual(2);
    });
  });
})