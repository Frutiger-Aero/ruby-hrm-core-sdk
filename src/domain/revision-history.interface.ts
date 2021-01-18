import { ENTITY_TYPE } from "./entity-type.enum";

export interface IRevisionHistory {
  /**
   * Идентификатор
   */
  readonly id: string;
  /**
   * user который внес изменения
   */
  readonly userId: string;

  /**
   * идентификатор сущности в которую внесли изменение
   */
  readonly entityId: string;

  /**
   * Тип сущности для которой внесли изменения
   */
  readonly entityType: ENTITY_TYPE;

  /**
   * Новое значение на которое изменили
   */
  readonly change: string;

  /**
   * Причина изменения
   */
  readonly reasonId: string;

  /**
   * Дата изменения
   */
  readonly createdAt: Date;
}