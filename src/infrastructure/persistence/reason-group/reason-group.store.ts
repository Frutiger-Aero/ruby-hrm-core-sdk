import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Logger } from '@qlean/nestjs-logger';
import { CrudStore, SearchHelper } from '@qlean/nestjs-typeorm-persistence-search';
import { ClassType } from 'class-transformer/ClassTransformer';
import { BlockingReasonGroupModel } from './blocking-reason-group.model';

@Injectable()
export class ReasonGroupStore extends CrudStore<BlockingReasonGroupModel>{
  protected readonly logger = new Logger(ReasonGroupStore.name);
  protected readonly helper = new SearchHelper<BlockingReasonGroupModel>();
  protected readonly model: ClassType<BlockingReasonGroupModel> = BlockingReasonGroupModel;

  constructor(
    @InjectRepository(BlockingReasonGroupModel)
    protected readonly repository: Repository<BlockingReasonGroupModel>,
  ) {
    super();
  }
}
