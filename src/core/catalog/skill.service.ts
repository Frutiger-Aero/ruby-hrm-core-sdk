import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';
import { AlreadyExistsException, InvalidArgumentException } from '@qlean/nestjs-exceptions';
import { IFindAndTotalResponse, IFindPaginateCriteria, TModelID } from '@qlean/nestjs-typeorm-persistence-search';
import { OptionStore, SkillStore } from '../../infrastructure';
import { ISkill, ISkillResponse } from '../../domain';

@Injectable()
export class SkillService {
  constructor(
    private readonly store: SkillStore,
    private readonly optionsStore: OptionStore
  ) {}

  private relations: string[] = [];

  /**
   * Создает запись о новой должностной позиции
   */
  async create(args: Partial<ISkill>): Promise<ISkillResponse> {
    try {
      const options = await this.getOptionsAndCheck(args.optionsSlugs);
      const { id } = await this.store.create(args);
      const skill = await this.store.findById(id);
      return {
        ...skill,
        options
      }
    } catch (error) {
      this.catchError(error, args);
    }
  }

  private async getOptionsAndCheck(optionsSlugs: string[]) {
    const options = await this.optionsStore.findAllBySlugs(optionsSlugs);
    let difference = optionsSlugs.filter(x => !Object.keys(options).includes(x));
    if (difference.length) {
      throw new InvalidArgumentException(`options ${difference.join(',')} don't exist`);
    }
    return optionsSlugs.map(optionSlug => options[optionSlug]);
  }

  /**
   * Обновляет запись о существующей должностной позиции
   */
  async update(args: Partial<ISkill>): Promise<ISkillResponse> {
    try {
      let options;
      if (args.optionsSlugs) {
        options = await this.getOptionsAndCheck(args.optionsSlugs)
      }
      await this.store.update({ id: args.id }, args);
      const skill = await this.store.findById(args.id);
      return {
        ...skill,
        options: options || await this.getOptionsAndCheck(args.optionsSlugs)
      }
    } catch (error) {
      this.catchError(error, args);
    }
  }

  private catchError(error, args) {
    if (error.message.includes('duplicate key value')) {
      throw new AlreadyExistsException(`ISkill with name ${args.name} already exists`);
    }
    throw error;
  }

  /**
   * Удаляет запись о существующей должностной позиции
   */
  async remove(args: Partial<ISkill>): Promise<ISkill> {
    return from(this.store.logicRemove(args.id))
      .pipe(mergeMap(() => this.findById(args.id)))
      .toPromise();
  }

  /**
   * Восстанавливает запись о должностной позиции
   */
  async restore(args: Partial<ISkill>): Promise<ISkill> {
    return from(this.store.logicRestore(args.id))
      .pipe(mergeMap(() => this.findById(args.id)))
      .toPromise();
  }

  /**
   * Находит запись о должностной позиции по ID
   */
  async findById(id: TModelID): Promise<ISkillResponse> {
    const skill = await this.store.findById(id, {
      relations: this.relations,
    });
    return {
      ...skill,
      options: await this.getOptionsAndCheck(skill.optionsSlugs)
    }
  }

  /**
   * Возвращает все должностные позиции в виде пагинативного списка
   */
  async findPaginate(args: IFindPaginateCriteria<ISkill>): Promise<IFindAndTotalResponse<ISkillResponse>> {
    const storaged = await this.store.findAndTotalByCriteria({
      ...args,
      relations: this.relations,
    });
    const optionsSlugs = [...new Set<string>([].concat.apply([], storaged.data.map(skill => skill.optionsSlugs)))]
    const options = this.optionsStore.findAllBySlugs(optionsSlugs);
    return {
      ...storaged,
      data: storaged.data.map(skill => ({
        ...skill,
        options: skill.optionsSlugs.map(strOpt => options[strOpt])
      }))
    }
  }
}
