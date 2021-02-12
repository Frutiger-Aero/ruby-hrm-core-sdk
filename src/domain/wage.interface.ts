import { IGrade } from './grade.interface';
import { IProduct } from './product.interface';
import { ISpecialization } from './specialization.interface';
import { WAGE_TYPE } from './wage-type.enum';
import { IBaseModel, TModelID } from '@qlean/nestjs-typeorm-persistence-search';

export interface IWage extends IBaseModel {
  /**
   * @description Название тарифа
   */
  readonly name: string;

  /**
   * Идентификатор региона в сервисе Регионы присутствия.
   */
  readonly regionId?: TModelID;

  /**
   * @description Продукт в рамках тарифа
   */
  readonly productSlug: string;

  /**
   * @description Специализация в рамках тарифа
   */
  readonly specialization: Partial<ISpecialization>;

  /**
   * @description Тарифная сетка в рамках грейдов
   */
  readonly grades: IGrade[];

  /**
   * @description Тип контракта физ.лицо, самозанятый
   */

  readonly type: WAGE_TYPE
}
