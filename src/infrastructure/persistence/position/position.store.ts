import {Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Logger} from '@qlean/nestjs-logger';
import {CrudStore, SearchHelper} from '@qlean/nestjs-typeorm-persistence-search';
import {ClassType} from 'class-transformer/ClassTransformer';
import {PositionModel} from './position.model';

@Injectable()
export class PositionStore extends CrudStore<PositionModel>{
  protected readonly logger = new Logger(PositionStore.name);
  protected readonly helper = new SearchHelper<PositionModel>();
  protected readonly model: ClassType<PositionModel> = PositionModel;

  constructor(
    @InjectRepository(PositionModel)
    protected readonly repository: Repository<PositionModel>,
  ) {
    super();
  }
}
