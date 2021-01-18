import {EntityManager, Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Logger} from '@qlean/nestjs-logger';
import {CrudStore, SearchHelper} from '@qlean/nestjs-typeorm-persistence-search';
import {ClassType} from 'class-transformer/ClassTransformer';
import {ContractModel} from './contract.model';

@Injectable()
export class ContractStore extends CrudStore<ContractModel>{
  protected readonly logger = new Logger(ContractStore.name);
  protected readonly helper = new SearchHelper<ContractModel>();
  protected readonly model: ClassType<ContractModel> = ContractModel;

  constructor(
    @InjectRepository(ContractModel)
    protected readonly repository: Repository<ContractModel>,
  ) {
    super();
  }

  updateInTransaction(params: Partial<ContractModel>, payload: Partial<ContractModel>, entityManager: EntityManager ) {
    return entityManager.getRepository(ContractModel)
      .createQueryBuilder("contract")
      .update()
      .set(payload)
      .where(params)
      .execute()
  }
}
