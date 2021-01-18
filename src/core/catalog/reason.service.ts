import { Injectable } from "@nestjs/common";
import { IFindAndTotalResponse, IFindPaginateCriteria, TModelID } from "@qlean/nestjs-typeorm-persistence-search";
import { IBlockingReason } from "../../domain";
import { ReasonStore } from "../../infrastructure/persistence/reason";

@Injectable()
export class ReasonService {
  private relations = [];
  constructor(
    private readonly reasonStore: ReasonStore
  ) {}
  async create(args: Partial<IBlockingReason>): Promise<IBlockingReason> {
    const { id } = await this.reasonStore.create(args);
    return this.findById(id);
  }

  /**
   * Обновляет запись о существующем продукте
   */
  async update(args: Partial<IBlockingReason>): Promise<IBlockingReason> {
    await this.reasonStore.update({ id: args.id }, args);
    return this.findById(args.id);
  }

  /**
   * Удаляет запись о существующем продукте
   */
  async remove(args: Partial<IBlockingReason>): Promise<IBlockingReason> {
    await this.reasonStore.logicRemove(args.id);
    return this.findById(args.id);
  }

  /**
   * Восстанавливает запись о пользователе
   */
  async restore(args: Partial<IBlockingReason>): Promise<IBlockingReason> {
    await this.reasonStore.logicRestore(args.id);
    return this.findById(args.id);
  }

  /**
   * Находит запись о продукте по ID
   */
  async findById(id: TModelID): Promise<IBlockingReason> {
    return this.reasonStore.findById(id, {
      relations: this.relations,
    });
  }

  /**
   * Возвращает все продукты в виде пагинативного списка
   */
  async findPaginate(args: IFindPaginateCriteria<IBlockingReason>): Promise<IFindAndTotalResponse<IBlockingReason>> {
    return this.reasonStore.findAndTotalByCriteria({
      ...args,
      relations: this.relations,
    });
  }
}