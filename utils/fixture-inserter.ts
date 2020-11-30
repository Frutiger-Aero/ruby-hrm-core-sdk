import { AppModule } from '../src/app.module';
import { Logger } from '@qlean/nestjs-logger';
import { NestFactory } from '@nestjs/core';
import { getConnection } from 'typeorm';
// import { CitizenshipModel } from '../src/infrastructure/citizenship/citizenship.model';
// import { SpecializationModel } from '../src/infrastructure/specialization/specialization.model';
// import { TariffModel } from '../src/infrastructure/tariff/tariff.model';
import _ from 'lodash';
import fs from 'fs';
import path from 'path';

const CONSTRAINT_FIELDS = {
  citizenship: 'name',
  specialization: 'name',
  tariff: 'name',
};

async function bootstrap() {
  const logger = new Logger('system');

  try {
    let fixturesFiles = fs.readdirSync(path.join(__dirname, '../data'));
    fixturesFiles = fixturesFiles.filter(file => file.match(/.json$/));

    const app = await NestFactory.create(AppModule, {
      cors: true,
    });

    const connection = getConnection();

    const [citizenshipDb, specializationDb, tariffDb] = await Promise.all(
      [].map(model =>
        connection
          .createQueryBuilder()
          .select()
          .from(model, model.name)
          .execute(),
      ),
    );

    const dbDataMap = {
      citizenship: citizenshipDb,
      specialization: specializationDb,
      tariff: tariffDb,
    };

    await Promise.all(
      fixturesFiles.map(async filename => {
        const data = require(`../data/${filename}`);
        filename = filename.replace(/\.json/, '');

        const model = [].find(
          model =>
            model.name.toLocaleLowerCase().replace(/model/, '') === filename,
        );

        if (!model) return;

        const newData = data.filter(isUniq => {
          const value = _.get(isUniq, CONSTRAINT_FIELDS[filename], null);

          if (value) {
            const isRepeated = dbDataMap[filename].find(
              item => item[CONSTRAINT_FIELDS[filename]] === value,
            );

            if (!isRepeated)
              return isUniq;
          }
        });

        if (!newData.length)
          return;

        logger.info(`insert fixtures in ${filename} table`, newData);

        return connection
          .createQueryBuilder()
          .insert()
          .into(model)
          .values(newData)
          .execute();
      }),
    );

    await app.close();
    process.exit(0);
  } catch (error) {
    logger.error(error);
    logger.error('error by insert fixtures', error);
  }
}

bootstrap();
