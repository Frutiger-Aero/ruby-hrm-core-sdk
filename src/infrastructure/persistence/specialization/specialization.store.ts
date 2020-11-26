import {Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Logger} from '@qlean/nestjs-logger';
import {CrudStore, SearchHelper} from '@qlean/nestjs-typeorm-persistence-search';
import {SpecializationModel} from './specialization.model';
import {ClassType} from 'class-transformer/ClassTransformer';

@Injectable()
export class SpecializationStore extends CrudStore<SpecializationModel>{
  protected readonly logger = new Logger(SpecializationStore.name);
  protected readonly helper = new SearchHelper<SpecializationModel>();
  protected readonly model: ClassType<SpecializationModel> = SpecializationModel;

  constructor(
    @InjectRepository(SpecializationModel)
    protected readonly repository: Repository<SpecializationModel>,
  ) {
    super();
  }
}
