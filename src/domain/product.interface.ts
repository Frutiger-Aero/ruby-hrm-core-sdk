import { IBaseModel } from '@qlean/nestjs-typeorm-persistence-search';

/**
 * @description Наши продукты, поступает из внешней системы
 *
 */
export interface IProduct {
  id: string;
  /**
   * @description Человекочитаемое название продукта
   */
  title: string;

  /**
   * @description Уникальный слаг продукта.
   */
  name: string;
}
