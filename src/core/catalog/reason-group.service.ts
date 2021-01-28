import { Injectable } from "@nestjs/common";
import { AlreadyExistsException } from "@qlean/nestjs-exceptions";
import { IFindAndTotalResponse, IFindPaginateCriteria, TModelID } from "@qlean/nestjs-typeorm-persistence-search";
import { IBlockingReasonGroup } from "../../domain";
import { ReasonGroupStore } from "../../infrastructure";

@Injectable()
export class ReasonGroupService {
  private relations = [];
  constructor(
    private readonly reasonGroupStore: ReasonGroupStore
  ) {}
  async create(args: Partial<IBlockingReasonGroup>): Promise<IBlockingReasonGroup> {
    try {
      const { id } = await this.reasonGroupStore.create(args);
      return this.findById(id);
    } catch (error) {
      this.catchError(error, args);
    }
  }

  /**
   * Обновляет запись о существующем продукте
   */
  async update(args: Partial<IBlockingReasonGroup>): Promise<IBlockingReasonGroup> {
    try {
      await this.reasonGroupStore.update({ id: args.id }, args);
      return this.findById(args.id);
    } catch (error) {
      this.catchError(error, args);
    }
  }

  private catchError(error, args) {
    if (error.message.includes('duplicate key value')) {
      throw new AlreadyExistsException(`Reason group with name ${args.name} already exists`);
    }
    throw error;
  }

  /**
   * Удаляет запись о существующем продукте
   */
  async remove(args: Partial<IBlockingReasonGroup>): Promise<IBlockingReasonGroup> {
    await this.reasonGroupStore.logicRemove(args.id);
    return this.findById(args.id);
  }

  /**
   * Восстанавливает запись о пользователе
   */
  async restore(args: Partial<IBlockingReasonGroup>): Promise<IBlockingReasonGroup> {
    await this.reasonGroupStore.logicRestore(args.id);
    return this.findById(args.id);
  }

  /**
   * Находит запись о продукте по ID
   */
  async findById(id: TModelID): Promise<IBlockingReasonGroup> {
    return this.reasonGroupStore.findById(id, {
      relations: this.relations,
    });
  }

  /**
   * Возвращает все продукты в виде пагинативного списка
   */
  async findPaginate(args: IFindPaginateCriteria<IBlockingReasonGroup>): Promise<IFindAndTotalResponse<IBlockingReasonGroup>> {
    return this.reasonGroupStore.findAndTotalByCriteria({
      ...args,
      relations: this.relations,
    });
  }
}