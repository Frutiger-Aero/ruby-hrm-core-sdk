import {EntityManager, Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Logger} from '@qlean/nestjs-logger';
import {CrudStore, SearchHelper, TDeepPartial} from '@qlean/nestjs-typeorm-persistence-search';
import {ClassType} from 'class-transformer/ClassTransformer';
import {ContractModel} from './contract.model';
import { IContract } from '../../../domain';

@Injectable()
export class ContractStore extends CrudStore<ContractModel>{
  private relations: string[] = ['specialization', 'grade', 'wage', 'contractor', 'skills'];

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

  findByIdInTransaction(id: string, entityManager: EntityManager) {
    return entityManager.findOne(ContractModel, id, {relations: this.relations });
  }

  async createInTransaction(params: TDeepPartial<IContract>, entityManager: EntityManager) {
    return entityManager.save(ContractModel, params);
  }

  blockingFindById(id: string, entityManager: EntityManager) {
    return entityManager.getRepository(ContractModel)
      .createQueryBuilder("contracts")
      .useTransaction(true)
      .setLock("pessimistic_write")
      .where("contracts.id = :id", { id })
      .getOne();
  }

  findByContractorIdInTransaction(contractorId: string, entityManager: EntityManager) {
    return entityManager.getRepository(ContractModel)
    .createQueryBuilder("contracts")
    .where(`contracts.contractor_id = '${contractorId}'`)
    .getMany()
  }
}
