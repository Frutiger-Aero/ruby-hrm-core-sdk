import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Logger } from '@qlean/nestjs-logger';
import { BlockingReasonModel } from './blocking-reason.model';
import { CrudStore, SearchHelper } from '@qlean/nestjs-typeorm-persistence-search';
import { ClassType } from 'class-transformer/ClassTransformer';

@Injectable()
export class ReasonStore extends CrudStore<BlockingReasonModel>{
  protected readonly logger = new Logger(ReasonStore.name);
  protected readonly helper = new SearchHelper<BlockingReasonModel>();
  protected readonly model: ClassType<BlockingReasonModel> = BlockingReasonModel;

  constructor(
    @InjectRepository(BlockingReasonModel)
    protected readonly repository: Repository<BlockingReasonModel>,
  ) {
    super();
  }
}
