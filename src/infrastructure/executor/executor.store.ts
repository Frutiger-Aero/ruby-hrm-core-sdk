import { Repository } from 'typeorm';
import { ClassType } from 'class-transformer/ClassTransformer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Logger } from '@qlean/nestjs-logger';
import {
  CrudStore,
  SearchHelper,
} from '@qlean/nestjs-typeorm-persistence-search';
import { ExecutorModel } from './executor.model';

@Injectable()
export class ExecutorStore extends CrudStore<ExecutorModel> {
  protected readonly logger = new Logger(ExecutorStore.name);
  protected readonly helper = new SearchHelper<ExecutorModel>();
  protected readonly model: ClassType<
    ExecutorModel
  > = ExecutorModel;

  constructor(
    @InjectRepository(ExecutorModel)
    protected readonly repository: Repository<ExecutorModel>,
  ) {
    super();
  }
}
