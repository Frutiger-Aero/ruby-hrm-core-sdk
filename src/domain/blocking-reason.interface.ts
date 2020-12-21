export interface IBlockingReason {
  /**
   * @description идентификатор
   */
  readonly id:string;
  /**
   * @description наименование причины
   */
  readonly name: string;
  /**
   * @description флаг может ли восстановится
   */
  readonly isRecoverable: boolean;
}