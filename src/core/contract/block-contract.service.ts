import { Injectable } from "@nestjs/common";
import { NotFoundException } from "@qlean/nestjs-exceptions";
import { Logger } from "@qlean/nestjs-logger";
import { EntityManager, getManager } from "typeorm";

import { BlockingReasonStore, ContractorStore, ContractStore, EventBusAdapterService, RevisionHistoryStore } from "../../infrastructure";

import { CONTRACT_STATUS, ENTITY_TYPE, WORK_STATUS } from "../../domain";
import { IBlockContract } from "../interfaces";

@Injectable()
export class BlockContractService {
  private readonly logger = new Logger(BlockContractService.name);
  constructor(
    private readonly contractStore: ContractStore,
    private readonly contractorStore: ContractorStore,
    private readonly revisionHistoryStore: RevisionHistoryStore,
    private readonly reasonStore: BlockingReasonStore,
    private readonly eventBusService: EventBusAdapterService
  ) {}
  async execute(args: IBlockContract) {

    const { id: contractId, reason: { id: reasonId }, userId } = args; 
    this.logger.info('start contract blocking', {contractId, reasonId, userId});

    const manager = await getManager();

    return manager.transaction('REPEATABLE READ', async (entityManager: EntityManager) => {
      const contract = await this.contractStore.blockingFindById(contractId, entityManager);
      if (!contract) {
        this.logger.warn('Contract doesn\'t exist', {contractId, reasonId, userId});
        throw new NotFoundException(`Contract id=${contractId} doesn\'t exist`);
      }
      const contractorId = contract.contractorId;
      const contractor = await this.contractorStore.blockingFindById(contract.id, entityManager);
      if (!contractor) {
        this.logger.warn('Contractor doesn\'t exist', {contractId, reasonId, userId});
        throw new NotFoundException(`Contractor id=${contract.id} doesn\'t exist`);
      }

      if (contract.status === CONTRACT_STATUS.BLOCKED) {
        this.logger.info('Contract is already blocked', {contractId, reasonId, userId});
        return contract;
      }

      const reason = await this.reasonStore.findById(reasonId);

      const contracts = await this.contractStore.findByCriteria({ where: [ { contractorId }]})

      // если блокировка основная, то блокируем исполнителя и все его контракты
      if (reason.isCommonBlock) {
        this.logger.info('Permanent blocking', {contractId, reasonId, userId});
        await this.blockContractor(contractorId, userId, reasonId, entityManager);

        await this.contractStore.updateInTransaction({ contractorId }, { status: CONTRACT_STATUS.BLOCKED }, entityManager);
        contracts.forEach(contract => this.logContractChanging(contract.id, userId, CONTRACT_STATUS.BLOCKED));
        return contract;
      }

      await this.contractStore.updateInTransaction({ id: contractId }, { status: CONTRACT_STATUS.BLOCKED }, entityManager);
      this.logContractChanging(contract.id, userId, CONTRACT_STATUS.BLOCKED);

      // Если есть хоть один активный контракт выходим
      if (contracts.some(item => item.status === CONTRACT_STATUS.ACTIVE)) {
        // Отсылаем события если заблокирован только один контракт
        this.eventBusService.publishContractBlocked();
        return contract;
      }
      // В остальных случаях надо решить какой статус ставим исполнителю

      // Если есть хоть один замороженный контракт, то надо чтобы исполнитель был заморожен
      if (contracts.some(item => item.status === CONTRACT_STATUS.FROZEN)) {
        // Если исполнитель не заморожен, то замораживаем его
        if (contractor.workStatus !== WORK_STATUS.FROZEN) {
          await this.freezeContractor(contractorId, userId, reasonId, entityManager);
        }
      }

      // Если нет активных или замороженных контрактов, то блокируем исполнителя
      await this.blockContractor(contractorId, userId, reasonId, entityManager);
    });
  }

  private async freezeContractor(contractorId: string, userId: string, reasonId: string, entityManager: EntityManager) {
    this.logger.info('Freeze contractor', {contractorId, reasonId, userId});
    await this.contractorStore.updateInTransaction( contractorId, { workStatus: WORK_STATUS.FROZEN, changedStatusReasonId: reasonId }, entityManager);
    this.logContractorChanging(contractorId, userId, WORK_STATUS.FROZEN);
    this.eventBusService.publishContractorFrozen();
  }

  private async blockContractor(contractorId: string, userId: string, reasonId: string, entityManager: EntityManager) {
    this.logger.info('Block contractor', {contractorId, reasonId, userId});
    await this.contractorStore.updateInTransaction( contractorId, { workStatus: WORK_STATUS.BLOCKED, changedStatusReasonId: reasonId }, entityManager);
    this.logContractorChanging(contractorId, userId, WORK_STATUS.BLOCKED);
    this.eventBusService.publishContractorBlocked();
  }

  private logContractChanging(contractId: string, userId: string, status: CONTRACT_STATUS) {
    this.revisionHistoryStore.create({
      entityId: contractId,
      entityType: ENTITY_TYPE.CONTRACT,
      userId,
      change: status
    });
  }

  private logContractorChanging(contractorId: string, userId: string, status: WORK_STATUS) {
    this.revisionHistoryStore.create({
      entityId: contractorId,
      entityType: ENTITY_TYPE.CONTRACT,
      userId,
      change: status
    });
  }
}