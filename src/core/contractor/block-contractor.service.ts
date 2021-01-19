import { Injectable } from "@nestjs/common";
import { NotFoundException } from "@qlean/nestjs-exceptions";
import { EntityManager, getManager } from "typeorm";
import * as moment from 'moment';

import { ContractorStore, ContractStore, RevisionHistoryStore} from '../../infrastructure';

import { ContractModel } from "../../infrastructure/persistence/contract/contract.model";
import { IBlockContractor } from "../interfaces";
import { CONTRACT_STATUS, ENTITY_TYPE, IBlockingReason, WORK_STATUS } from "../../domain";

@Injectable()
export class BlockContractorService {
  constructor(
    private readonly contractorStore: ContractorStore,
    private readonly contractStore: ContractStore,
    private readonly revisionHistoryStore: RevisionHistoryStore
  ){}

  async execute(args: IBlockContractor, reason: IBlockingReason) {
    const { id: contractorId } = args;
    const { id: reasonId } = reason;
    const manager = await getManager();

    return manager.transaction('REPEATABLE READ', async (entityManager: EntityManager) => {
      const contractor = await this.contractorStore.blockingFindById(contractorId, entityManager);
      if (!contractor) {
        throw new NotFoundException(`Contractor id=${contractorId} doesn\'t exist`);
      }
      if (contractor.workStatus === WORK_STATUS.BLOCKED) {
        return contractor;
      }
      const contracts = await this.contractStore.findByCriteria({ where: [{ contractorId: contractor.id }]});
      await this.contractorStore.updateInTransaction( contractorId, { workStatus: WORK_STATUS.BLOCKED, changedStatusReasonId: reasonId }, entityManager);
      await this.contractStore.updateInTransaction({ contractorId }, { status: CONTRACT_STATUS.BLOCKED }, entityManager);

      // Здесь также должна быть отсылка задач во внешние сервисы

      this.log(args, WORK_STATUS.BLOCKED, contracts);

      return this.contractorStore.blockingFindById(contractorId, entityManager); 
    });
  }

  private log(args: IBlockContractor, type: WORK_STATUS, contracts: ContractModel[]) {
    const { id: contractorId, reason: { id: reasonId }, userId } = args;

    this.revisionHistoryStore.create({
      entityId: contractorId,
      entityType: ENTITY_TYPE.CONTRACTOR,
      reasonId,
      userId,
      change: type,
    });
    Promise.all(contracts.map(contract => this.revisionHistoryStore.create({
      entityId: contract.id,
      entityType: ENTITY_TYPE.CONTRACTOR,
      reasonId,
      userId,
      change: type
    })));
  }
}