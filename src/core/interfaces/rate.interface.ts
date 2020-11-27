import { AMOUNT_TYPE } from './amount-type.enum';

export enum RATE_UNIT {
  SERVICE = 'SERVICE',
  HOUR = 'HOUR',
  DAY = 'DAY',
  MOUNTH = 'MOUNTH',
}

export interface IRate {
  readonly amount: number;

  readonly type: AMOUNT_TYPE;

  readonly unit: RATE_UNIT;
}
