import { IBaseModel } from '@qlean/nestjs-typeorm-persistence-search';

export enum COST_TYPE {
  FIXED = 'fixed',
  PERCENT = 'percent',
}

export enum COST_UNIT {
  SERVICE = 'SERVICE',
  HOUR = 'HOUR',
  OPTION = 'OPTION',
}

export interface ICommission extends IBaseModel {
  amount: number;

  type: COST_TYPE;

  // Если UNIT не указан - цена per Service
  unit?: COST_UNIT;

  // Если UNIT = OPTION -> тут указываем за какую именно опцию
  option?: string;
}
