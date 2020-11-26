import {Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Logger} from '@qlean/nestjs-logger';
import {CrudStore, SearchHelper} from '@qlean/nestjs-typeorm-persistence-search';
import {CommissionModel} from './commission.model';
import {ClassType} from 'class-transformer/ClassTransformer';

@Injectable()
export class CommissionStore extends CrudStore<CommissionModel>{
  protected readonly logger = new Logger(CommissionStore.name);
  protected readonly helper = new SearchHelper<CommissionModel>();
  protected readonly model: ClassType<CommissionModel> = CommissionModel;

  constructor(
    @InjectRepository(CommissionModel)
    protected readonly repository: Repository<CommissionModel>,
  ) {
    super();
  }
}
