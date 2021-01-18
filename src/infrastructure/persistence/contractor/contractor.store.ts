import { EntityManager, Repository } from 'typeorm';
import { ClassType } from 'class-transformer/ClassTransformer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Logger } from '@qlean/nestjs-logger';
import { CrudStore, SearchHelper } from '@qlean/nestjs-typeorm-persistence-search';
import { ContractorModel } from './contractor.model';

@Injectable()
export class ContractorStore extends CrudStore<ContractorModel> {
  protected readonly logger = new Logger(ContractorStore.name);
  protected readonly helper = new SearchHelper<ContractorModel>();
  protected readonly model: ClassType<ContractorModel> = ContractorModel;

  constructor(
    @InjectRepository(ContractorModel)
    protected readonly repository: Repository<ContractorModel>,
  ) {
    super();
  }


  blockingFindById(id: string, entityManager: EntityManager) {
    return entityManager.getRepository(ContractorModel)
      .createQueryBuilder("contractors")
      .useTransaction(true)
      .setLock("pessimistic_write")
      .where("contractors.id = :id", { id })
      .getOne();
  }

  updateInTransaction(id: string, params: Partial<ContractorModel> ,entityManager: EntityManager) {
    return entityManager.getRepository(ContractorModel)
      .createQueryBuilder("contractors")
      .update()
      .set(params)
      .where("contractors.id = :id", { id })
      .execute()
  }
}
