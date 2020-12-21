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
  readonly updatedAt: Date;
}