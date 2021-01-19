import { Injectable } from "@nestjs/common";
import { NotFoundException, FailedPreconditionException } from "@qlean/nestjs-exceptions";
import { Logger } from "@qlean/nestjs-logger";
import { TDeepPartial } from "@qlean/nestjs-typeorm-persistence-search";
import { EntityManager, getManager } from "typeorm";

import { BlockingReasonStore, ContractorStore, ContractStore, EventBusAdapterService, RevisionHistoryStore } from "../../infrastructure";

import { ENTITY_TYPE, IContract, WORK_STATUS } from "../../domain";

@Injectable()
export class CreateContractService {
  private readonly logger = new Logger(CreateContractService.name);
  constructor(
    private readonly contractStore: ContractStore,
    private readonly contractorStore: ContractorStore,
    private readonly revisionHistoryStore: RevisionHistoryStore,
    private readonly blockingReasonStore: BlockingReasonStore,
    private readonly eventBusService: EventBusAdapterService
  ) {}
  async execute(args: TDeepPartial<IContract>, userId: string) {
    const contractorId = args.contractor.id;
    const manager = await getManager();
    this.logger.info('start creating contract', {contractorId, userId, args})

    return manager.transaction('REPEATABLE READ', async (entityManager: EntityManager) => {
      const contractor = await this.contractorStore.blockingFindById(contractorId, entityManager);
      if (!contractor) {
        this.logger.warn('Contractor doesn\'t exist', {contractorId, userId, args});
        throw new NotFoundException(`Contractor id=${contractorId} doesn\'t exist`);
      }
      const reason = await this.blockingReasonStore.findById(contractor.changedStatusReasonId);

      if (reason.isPermanent) {
        this.logger.warn('Contractor permanently blocked!', {contractorId, userId, args});
        throw new FailedPreconditionException('Contractor permanently blocked!');
      }
      if (contractor.workStatus === WORK_STATUS.BLOCKED) {
        this.logger.info('Activate contractor', {contractorId, userId, args});
        await this.contractorStore.updateInTransaction( contractorId, { workStatus: WORK_STATUS.ACTIVE }, entityManager);

        this.revisionHistoryStore.create({
          entityId: contractorId,
          entityType: ENTITY_TYPE.CONTRACTOR,
          userId,
          change: WORK_STATUS.ACTIVE,
        });

        // внешние вызовы при активации исполнителя;
        this.eventBusService.publishContractorActivate();
      }
      const contract = await this.contractStore.createInTransaction(args, manager);
      // Другие внешние вызовы при активации контракта;
      this.eventBusService.publishNewContract();

      this.revisionHistoryStore.create({
        entityId: contract.id,
        entityType: ENTITY_TYPE.CONTRACT,
        userId,
        change: WORK_STATUS.ACTIVE
      });
      return contract;
    });
  }
}