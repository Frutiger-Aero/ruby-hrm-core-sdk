import { IBaseModel } from '@qlean/nestjs-typeorm-persistence-search';

export enum COMMISSION_TYPE {
  FIXED = 'fixed',
  PERCENT = 'percent',
}

export enum COMMISSION_UNIT {
  SERVICE = 'SERVICE',
  HOUR = 'HOUR',
  OPTION = 'OPTION',
}

export interface ICommission extends IBaseModel {
  amount: number;

  type: COMMISSION_TYPE;

  unit: COMMISSION_UNIT;

  // Если UNIT = OPTION -> тут указываем за какую именно опцию
  option?: string;
}
