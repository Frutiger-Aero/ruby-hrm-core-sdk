import { HrmExecutorApi, HrmCoreModule } from '../sdk/nestjs/src';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { grpcClientOptions } from '../src/grpc-client.options';
import { AuthService, TestTokensource } from './auth.stubs';
import { cleanup } from './utils';
import { getConnection } from 'typeorm';
import { executorFixture } from './fixtures';
import moment from "moment";

describe('Executor (e2e)', () => {
  let executorApi: HrmExecutorApi;
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

    executorApi = app.get(HrmExecutorApi);

    tokenSource._token = AuthService.allGrants({
      tenantId: 'test',
      clientId: 'testApp',
    });
  });

  afterAll(async () => {
    await app.close();
    await cleanup(getConnection());
  });

  describe('CREATE executor', () => {
    it('Должен создать исполнителя', async () => {
      const result = await executorApi.create(executorFixture);
      expect(result.id).not.toBeNull();
      expect(typeof result.id).toBe('string');

      id = result.id;
    });
  });

  describe('GET executor', () => {
    it('Должен вернуть исполнителя', async () => {
      const result = await executorApi.get({});
      expect(result.address).toEqual(executorFixture.address);
    });
  });

  describe('UPDATE executor', () => {
    it('Должен обновить данные исполнителя', async () => {
      const newExecutorData = {
        address: 'New Mega Address, 44',
        specialization: ['окна', 'квартиры'],
        tariff: 'Пятидневка',
        citizenship: 'Беларусь',
      };

      await executorApi.update({ id, ...newExecutorData });
      const updatedExecutor = await executorApi.get({ id });
      expect(newExecutorData.address).toEqual(updatedExecutor.address);
    });
  });

  describe('Disable executor', () => {
    it('Должен удалить исполнителя', async () => {
      await executorApi.disable({ id, statusReason: 'nevermore!' });
      let isExists = undefined;
      try {
        isExists = await executorApi.get({ id });
      } catch (error) {
        expect(error.code).toEqual(404);
      }
      expect(isExists).toBeUndefined();
    });
  });

  describe('Get History Profile of Executor', () => {
    it('Должен вернуть историю изменений профиля исполнителя', async () => {
      const issuePlace = 'УФМС №666 России';
      // Тестируем по связанной модели
      await executorApi.update({ id, ...{ citizenship: 'Киргизия' } });
      // Тестируем по вложенной структуре (отличаются два поля)
      await executorApi.update({
        id,
        ...{
          passport: {
            ...executorFixture.passport,
            serial: '6666',
            issuePlace,
          },
        },
      });
      // Тестируем по одиночному полю
      await executorApi.update({ id, ...{ citizenship: 'Киргизия' } });

      // Получаем логи по id
      const historyById = await executorApi.getHistoryProfile({ id });
      expect(historyById.history.length > 4).toBe(true);

      // Получаем логи по временному диапазону
      const historyByDate = await executorApi.getHistoryProfile({ dateFrom: moment().subtract(1, 'hour').toISOString(),
        dateTo: moment().toISOString(),
        limit: 2, });
      expect(historyByDate.history.length === 2).toBe(true);

      const historyByField = await executorApi.getHistoryProfile({
        name: 'passport.issuePlace',
      });
      expect(historyByField.history.length === 1).toBe(true);
      expect(historyByField.history[0].newValue === issuePlace).toBe(true);
    });
  });
});
