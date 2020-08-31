import { CrmExecutorApi } from '../sdk/nestjs/build';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { grpcOptions } from '../src/app.options';
import { AuthService, TestTokensource } from './auth.stubs';
import { cleanup } from './utils';
import { getConnection } from 'typeorm';
import { executorFixture } from './fixtures';
import moment from "moment";

describe('Executor (e2e)', () => {
  let executorApi: CrmExecutorApi;
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

    const moduleFixture = await AuthService.inject(Test.createTestingModule({
      imports: [ AppModule ],
    }))
      .overrideProvider('TOKEN_SOURCE').useValue(tokenSource)
      .compile();

    app = moduleFixture.createNestApplication();
    app.connectMicroservice(grpcOptions);
    await app.startAllMicroservicesAsync();
    await app.init();

    executorApi = app.get(CrmExecutorApi);

    tokenSource._token = AuthService.allGrants({
      tenantId: 'test',
      clientId: 'testApp',
    });


  });

  afterAll(async () => {
    await app.close();
    await cleanup(getConnection());
  })

  describe('CREATE executor', () => {
    it('Должен создать исполнителя', async () => {
      const result = await executorApi.create(executorFixture);
      console.log('CREATE result', result)
      // expect(result.id).not.toBeNull();
      // expect(typeof result.id).toBe('string');

      id = result.id;
    });
  });

  describe('GET executor', () => {
    it('Должен вернуть исполнителя', async () => {
      const result = await executorApi.get({ id });
      console.log('GET result', result)
      // expect(result.workingDays).toEqual(executorFixture.workingDays)
    });
  });

  describe('UPDATE executor', () => {
    it('Должен обновить данные исполнителя', async () => {
      const newExecutorData = {
        workingDays: null,
        timeRange: null,
        ...executorFixture };
      newExecutorData.workingDays = [5,6];
      newExecutorData.timeRange = {
        start: moment().set({ hour: 12, minute: 0}).toISOString(),
        end: moment().set({ hour: 19, minute: 0}).toISOString(),
      }



      const result = await executorApi.update({ id, ...newExecutorData});
      console.log('UPDATE result', result)
    });
  });

  describe('Disable executor', () => {
    it('Должен удалить исполнителя', async () => {
      await executorApi.disable({ id });
      let isExists = undefined;
      try {
        isExists = await executorApi.get({ id });
      } catch (error) {
        expect(error.code).toEqual(404)
      }
      expect(isExists).toBeUndefined();
    });
  });

});
