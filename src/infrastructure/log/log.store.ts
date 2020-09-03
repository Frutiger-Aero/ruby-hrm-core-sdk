import { Injectable } from '@nestjs/common';
import { LogModel } from './log.model';
import {
  CrudStore,
  SearchHelper,
} from '@qlean/nestjs-typeorm-persistence-search';
import { Logger } from '@qlean/nestjs-logger';
import { ClassType } from 'class-transformer/ClassTransformer';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LogStore extends CrudStore<LogModel> {
  protected readonly logger = new Logger(LogStore.name);
  protected readonly helper = new SearchHelper<LogModel>();
  protected readonly model: ClassType<LogModel> = LogModel;

  constructor(
    @InjectRepository(LogModel)
    protected readonly repository: Repository<LogModel>,
  ) {
    super();
  }
}
