import {Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Logger} from '@qlean/nestjs-logger';
import {CrudStore, SearchHelper} from '@qlean/nestjs-typeorm-persistence-search';
import {SkillModel} from './skill.model';
import {ClassType} from 'class-transformer/ClassTransformer';

@Injectable()
export class SkillStore extends CrudStore<SkillModel>{
  protected readonly logger = new Logger(SkillStore.name);
  protected readonly helper = new SearchHelper<SkillModel>();
  protected readonly model: ClassType<SkillModel> = SkillModel;

  constructor(
    @InjectRepository(SkillModel)
    protected readonly repository: Repository<SkillModel>,
  ) {
    super();
  }
}
