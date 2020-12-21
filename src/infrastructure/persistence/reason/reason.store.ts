import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Logger } from '@qlean/nestjs-logger';
import { BlockingReasonModel } from './blocking-reason.model';
import { FreezingReasonModel } from './freezing-reason.model';

@Injectable()
export class ReasonStore {
  protected readonly logger = new Logger(ReasonStore.name);

  constructor(
    @InjectRepository(BlockingReasonModel)
    protected readonly blockingReasonRepository: Repository<BlockingReasonModel>,
    @InjectRepository(FreezingReasonModel)
    protected readonly freezingReasonRepository: Repository<FreezingReasonModel>,
  ) {
  }
  getBlockingReasons() {
    return this.blockingReasonRepository.find();
  }

  getBlockingReasonById(id: string) {
    return this.blockingReasonRepository.findOne({ id });
  }

  getFreezingReasons() {
    return this.freezingReasonRepository.find();
  }

  getFreezingReasonById(id: string) {
    return this.freezingReasonRepository.findOne({ id });
  }
}
