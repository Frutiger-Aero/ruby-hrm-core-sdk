import {Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Logger} from '@qlean/nestjs-logger';
import {RevisionHistoryModel} from './revision-history.model';
import { create } from 'lodash';
import { IRevisionHistory } from '../../../domain';

@Injectable()
export class RevisionHistoryStore {
  protected readonly logger = new Logger(RevisionHistoryStore.name);

  constructor(
    @InjectRepository(RevisionHistoryModel)
    protected readonly repository: Repository<RevisionHistoryModel>,
  ) {}
  create(args: Partial<IRevisionHistory>) {
    return this.repository.insert(args);
  }

  getLastChangeByEntityId(entityId: string) {
    return this.repository.createQueryBuilder()
      .where(`entity_id = '${entityId}'`)
      .orderBy('updated_at', 'ASC')
      .limit(1)
      .getOne()
  }
}
