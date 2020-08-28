export enum DebtLevel {
  FREE = 0,
  LOW = 1,
  MIDDLE = 2,
  HIGHT = 3,
}

export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type WorkingDays = DayOfWeek[];

export interface ITimeRange {
  start?: Date;
  end?: Date;
}

export interface IBookablePersonWithId
  extends IBookablePersonId,
    IBookablePerson {}

export interface IBookablePersonId {
  id: string;
}

export interface IBookablePerson {
  /**
   * Идентификатор исполнителя в SSO
   * */
  ssoId: string;

  /**
   * Имя исполнителя
   * */
  name: string;

  /**
   * Идентификатор региона
   * */
  regionId: number;

  /**
   * Рабочие дни
   * */
  workingDays?: WorkingDays;

  /**
   * Время начала\конца рабочего дня
   * */
  timeRange: ITimeRange;

  /**
   * Состояние, что исполнитель доступен
   * */
  isActive: boolean;

  /**
   * Максимальное количество заблокированых интервалов
   * */
  maxBlockedIntervalsPerDay: number;

  /**
   * Градация долга исполнителя перед системой
   * */
  debtLevel: DebtLevel;

  /**
   * Рейтинг исполнителя в системе
   * */
  rating: number;

  /**
   * Количество завершенных заказов
   * */
  completedOrdersCount: number;
}
