import { Injectable } from "@nestjs/common";
import { NotFoundException } from "@qlean/nestjs-exceptions";
import { EntityManager, getManager } from "typeorm";
import { CONTRACT_STATUS, ENTITY_TYPE, WORK_STATUS } from "../../domain";
import { ContractorStore, ContractStore, ReasonStore, RevisionHistoryStore} from '../../infrastructure';
import { ContractModel } from "../../infrastructure/persistence/contract/contract.model";
import { IBlockContractor } from "../interfaces";

@Injectable()
export class BlockContractorService {
  constructor(
    private readonly contractorStore: ContractorStore,
    private readonly contractStore: ContractStore,
    private readonly reasonStore: ReasonStore,
    private readonly revisionHistoryStore: RevisionHistoryStore
  ){}

  async execute(args: IBlockContractor) {
    const { id: contractorId, reason: { id: reasonId }, userId } = args;
    const manager = await getManager();

    const reason = this.reasonStore.findById(reasonId);
    if (!reason) {
      throw new NotFoundException(`Reason id=${reasonId} doesn't exist`);
    }
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

      this.log(args, contracts);

      return this.contractorStore.blockingFindById(contractorId, entityManager); 
    });
  }

  private log(args: IBlockContractor, contracts: ContractModel[]) {
    const { id: contractorId, reason: { id: reasonId }, userId } = args;

    this.revisionHistoryStore.create({
      entityId: contractorId,
      entityType: ENTITY_TYPE.CONTRACTOR,
      reasonId,
      userId,
      change: WORK_STATUS.BLOCKED,
    });
    Promise.all(contracts.map(contract => this.revisionHistoryStore.create({
      entityId: contract.id,
      entityType: ENTITY_TYPE.CONTRACTOR,
      reasonId,
      userId,
      change: CONTRACT_STATUS.BLOCKED
    })));
  }
}