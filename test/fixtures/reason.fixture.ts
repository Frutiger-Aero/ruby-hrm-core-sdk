import {IBlockingReasonCreateRequest} from '../../sdk/nestjs';
import { BLOCKING_TYPE } from '../../src/domain';
import { reasonGroupForBase1, reasonGroupForBase2 } from './base.fixture';

export const reasonFixture1: IBlockingReasonCreateRequest = {
  group: reasonGroupForBase1,
  isAvailableForContractor: true,
  isCommonBlock: true,
  isInstant: true,
  isNeedRetraining: true,
  isPermanent: true,
  name: 'reasonFixture1', 
  type: BLOCKING_TYPE.BLOCK
}

export const reasonFixture2: IBlockingReasonCreateRequest = {
  group: reasonGroupForBase2,
  isAvailableForContractor: false,
  isCommonBlock: false,
  isInstant: false,
  isNeedRetraining: false,
  isPermanent: false,
  name: 'reasonFixture2', 
  type: BLOCKING_TYPE.FREEZE
}