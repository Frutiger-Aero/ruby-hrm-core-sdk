import {Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Logger} from '@qlean/nestjs-logger';
import {CrudStore, SearchHelper} from '@qlean/nestjs-typeorm-persistence-search';
import {ClassType} from 'class-transformer/ClassTransformer';
import {GradeModel} from './grade.model';

@Injectable()
export class GradeStore extends CrudStore<GradeModel>{
  protected readonly logger = new Logger(GradeStore.name);
  protected readonly helper = new SearchHelper<GradeModel>();
  protected readonly model: ClassType<GradeModel> = GradeModel;

  constructor(
    @InjectRepository(GradeModel)
    protected readonly repository: Repository<GradeModel>,
  ) {
    super();
  }
}
