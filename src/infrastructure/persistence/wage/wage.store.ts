import {Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Logger} from '@qlean/nestjs-logger';
import {CrudStore, SearchHelper} from '@qlean/nestjs-typeorm-persistence-search';
import {ClassType} from 'class-transformer/ClassTransformer';
import {WageModel} from './wage.model';

@Injectable()
export class WageStore extends CrudStore<WageModel>{
  protected readonly logger = new Logger(WageStore.name);
  protected readonly helper = new SearchHelper<WageModel>();
  protected readonly model: ClassType<WageModel> = WageModel;

  constructor(
    @InjectRepository(WageModel)
    protected readonly repository: Repository<WageModel>,
  ) {
    super();
  }
}
