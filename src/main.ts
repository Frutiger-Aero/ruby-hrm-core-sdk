import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { StatsService } from '@qlean/nestjs-stats';
import { Logger } from '@qlean/nestjs-logger';
import { grpcOptions } from './app.options';
import { urlencoded, json } from 'express';
import {StatsModule} from "./stats.module";

const { GRPC_PORT, HTTP_PORT, HOST = 'localhost' } = process.env;

async function bootstrap() {
  const logger = new Logger('system');

  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  const statsApp = await NestFactory.create(StatsModule);

  app.use(json({ limit: '1mb' }));
  app.use(urlencoded({ extended: true, limit: '1mb' }));

  const stats = app.get(StatsService);

  stats.scan(app);
  await stats.connect(statsApp);
  await statsApp.listen(process.env.STATS_PORT, HOST);

  const host = HOST;
  app.connectMicroservice(grpcOptions);

  await app.startAllMicroservicesAsync();
  await app.listen(HTTP_PORT, host);
  logger.info(`Listening http: ${host}:${HTTP_PORT}, grpc: ${GRPC_PORT}`);

  process.on('unhandledRejection', (reason, p) => {
    logger.error('Fatal unhandled error', { reason, p });
    stats.hit({
      method: 'unhandledRejection',
      module: 'System',
      label: 'error',
    });
  });
}

bootstrap().catch(err => console.error(`Fatal error`, err.message, err.stack));
