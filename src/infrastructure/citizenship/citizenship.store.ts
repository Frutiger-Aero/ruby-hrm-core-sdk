import { Injectable } from '@nestjs/common';
import { CitizenshipModel } from './citizenship.model';
import {
  CrudStore,
  SearchHelper,
} from '@qlean/nestjs-typeorm-persistence-search';
import { Logger } from '@qlean/nestjs-logger';
import { ClassType } from 'class-transformer/ClassTransformer';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CitizenshipStore extends CrudStore<CitizenshipModel> {
  protected readonly logger = new Logger(CitizenshipStore.name);
  protected readonly helper = new SearchHelper<CitizenshipModel>();
  protected readonly model: ClassType<CitizenshipModel> = CitizenshipModel;

  constructor(
    @InjectRepository(CitizenshipModel)
    protected readonly repository: Repository<CitizenshipModel>,
  ) {
    super();
  }
}
