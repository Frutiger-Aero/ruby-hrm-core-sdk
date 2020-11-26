import {Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Logger} from '@qlean/nestjs-logger';
import {CrudStore, SearchHelper} from '@qlean/nestjs-typeorm-persistence-search';
import {ClassType} from 'class-transformer/ClassTransformer';
import {TariffModel} from './tariff.model';

@Injectable()
export class TariffStore extends CrudStore<TariffModel>{
  protected readonly logger = new Logger(TariffStore.name);
  protected readonly helper = new SearchHelper<TariffModel>();
  protected readonly model: ClassType<TariffModel> = TariffModel;

  constructor(
    @InjectRepository(TariffModel)
    protected readonly repository: Repository<TariffModel>,
  ) {
    super();
  }
}
