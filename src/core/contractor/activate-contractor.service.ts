import { Injectable } from "@nestjs/common";
import { NotFoundException, FailedPreconditionException } from "@qlean/nestjs-exceptions";
import { Logger } from "@qlean/nestjs-logger";
import { TDeepPartial } from "@qlean/nestjs-typeorm-persistence-search";
import { EntityManager, getManager } from "typeorm";

import { ContractorStore, ContractStore, EventBusAdapterService, RevisionHistoryStore } from "../../infrastructure";

import { CONTRACT_STATUS, ENTITY_TYPE, IContract, WORK_STATUS } from "../../domain";

@Injectable()
export class ActivateContractorService {
  private readonly logger = new Logger(ActivateContractorService.name);
  constructor(
    private readonly contractStore: ContractStore,
    private readonly contractorStore: ContractorStore,
    private readonly revisionHistoryStore: RevisionHistoryStore,
    private readonly eventBusService: EventBusAdapterService
  ) {}
  async execute(args: TDeepPartial<IContract>, userId: string) {
    const contractorId = args.contractor.id;
    const manager = await getManager();
    this.logger.info('start activating contractor', {contractorId, userId, args})

    return manager.transaction('REPEATABLE READ', async (entityManager: EntityManager) => {
      const contractor = await this.contractorStore.blockingFindById(contractorId, entityManager);
      if (!contractor) {
        this.logger.warn('Contractor doesn\'t exist', {contractorId, userId, args});
        throw new NotFoundException(`Contractor id=${contractorId} doesn\'t exist`);
      }
      if (contractor.workStatus === WORK_STATUS.ACTIVE) {
        return contractor;
      }
      if (contractor.workStatus === WORK_STATUS.BLOCKED) {
        this.logger.warn('Contractor is blocked!', {contractorId, userId, args});
        throw new FailedPreconditionException('Contractor blocked!');
      }
      this.logger.info('Activate contractor', {contractorId, userId, args});
      await this.contractorStore.updateInTransaction( contractorId, { workStatus: WORK_STATUS.ACTIVE }, entityManager);

      this.revisionHistoryStore.create({
        entityId: contractorId,
        entityType: ENTITY_TYPE.CONTRACTOR,
        userId,
        change: WORK_STATUS.ACTIVE,
      });

      const contracts = await this.contractStore.findByCriteria({ where: [ { contractorId }]})
 
      const frozenContracts = contracts.filter(item => item.status === CONTRACT_STATUS.FROZEN);
      if (frozenContracts.length) {
        this.logger.info('Activate contracts', { frozenContracts: frozenContracts.map(item => `${item.id}`).join(',')});
        await this.contractStore.updateInTransaction({ contractorId,  status: CONTRACT_STATUS.FROZEN }, { status: CONTRACT_STATUS.ACTIVE }, entityManager);
        frozenContracts.forEach(contract => {
          this.revisionHistoryStore.create({
            entityId: contract.id,
            entityType: ENTITY_TYPE.CONTRACT,
            userId,
            change: WORK_STATUS.ACTIVE
          });
        })
      }

      // внешние вызовы при активации исполнителя;
      this.eventBusService.publishContractorActivate();
      return contractor;
    });
  }
}