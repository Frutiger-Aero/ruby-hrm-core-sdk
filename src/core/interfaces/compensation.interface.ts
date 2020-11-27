import { IBaseModel } from '@qlean/nestjs-typeorm-persistence-search';
import { AMOUNT_TYPE } from './amount-type.enum';

export interface ICompensation extends IBaseModel {
  readonly amount: number;

  readonly type: AMOUNT_TYPE;

  // Если UNIT = OPTION -> тут указываем за какую именно опцию
  readonly option: string;
}
