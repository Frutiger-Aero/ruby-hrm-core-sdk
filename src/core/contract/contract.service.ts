import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';

import { CreateContractService } from './create-contract.service';
import { BlockContractService } from './block-contract.service';
import { ContractStore, ProductStore, WageStore } from '../../infrastructure';

import { IFindAndTotalResponse, IFindPaginateCriteria, TDeepPartial, TModelID } from '@qlean/nestjs-typeorm-persistence-search';
import { IContract, IContractResponse } from '../../domain';
import { InvalidArgumentException } from '@qlean/nestjs-exceptions';
import { IBlockContract } from '../interfaces';


@Injectable()
export class ContractService {
  constructor(
    private readonly store: ContractStore,
    private readonly wageStore: WageStore,
    private readonly productStore: ProductStore,
    private readonly createContractService: CreateContractService,
    private readonly blockContractService: BlockContractService
  ) {}

  private relations: string[] = ['specialization', 'grade', 'wage', 'contractor', 'skills'];

  /**
   * Создает запись о новом контракте исполнителя
   */
  async create(args: Partial<IContract>, userId: string) {
    console.log('create args', args)
    const wage = await this.wageStore.findById(args.wage.id);
    if (!wage) {
      throw new InvalidArgumentException(`wage id=${args.wage.id} doesn't exist`);
    }
    const product = await this.productStore.findBySlug(wage.productSlug);
    const model: TDeepPartial<IContract> = {
      ...args,
      specialization: {
        id: wage.specialization.id
      },
      productSlug: wage.productSlug
    }
    const contract = await this.createContractService.execute(model, userId); 
    return {
      ...contract,
      product
    }
  }

  /**
   * Обновляет запись о существующем контракте исполнителя
   */
  async update(args: Partial<IContract>): Promise<IContractResponse> {
    const model: TDeepPartial<IContract> = {
      ...args
    }

    if (args.wage) {
      const wage = await this.wageStore.findById(args.wage.id);
      if (!wage) {
        throw new InvalidArgumentException(`wage id=${args.wage.id} doesn't exist`);
      }
      model.specialization = {
        id: wage.specialization.id
      };
    }
    await this.store.update({ id: args.id }, args);
    const contract = await this.findById(args.id);
    return {
      ...contract,
      product: await this.productStore.findBySlug(contract.productSlug)
    }
  }

  /**
   * Удаляет запись о существующем контракте исполнителя
   */
  async remove(args: Partial<IContract>): Promise<IContractResponse> {
    await this.store.logicRemove(args.id)
    const contract = await this.findById(args.id);
    return {
      ...contract,
      product: await this.productStore.findBySlug(contract.productSlug)
    }
  }

  /**
   * Восстанавливает запись о контракте исполнителя
   */
  async restore(args: Partial<IContract>): Promise<IContractResponse> {
    await this.store.logicRestore(args.id);
    const contract = await this.findById(args.id);
    return {
      ...contract,
      product: await this.productStore.findBySlug(contract.productSlug)
    }
  }

  /**
   * Находит запись о контракте исполнителя по ID
   */
  async findById(id: TModelID): Promise<IContractResponse> {
    const contract = await this.store.findById(id, {
      relations: this.relations,
    });
    return {
      ...contract,
      product: await this.productStore.findBySlug(contract.productSlug)
    }
  }

  /**
   * Возвращает все контракты исполнителей в виде пагинативного списка
   */
  async findPaginate(args: IFindPaginateCriteria<IContract>): Promise<IFindAndTotalResponse<IContractResponse>> {
    const contracts = await this.store.findAndTotalByCriteria({
      ...args,
      relations: this.relations,
    });

    const products = this.productStore.findAllBySlugs(contracts.data.map(contract => contract.productSlug));

    return {
      ...contracts,
      data: contracts.data.map(contract => ({
        ...contract,
        product: products[contract.productSlug]
      }))
    }
  }

  async block(args: IBlockContract) {
    const contract = await this.blockContractService.execute(args);
    return {
      ...contract,
      product: await this.productStore.findBySlug(contract.productSlug)
    }
  }
}
