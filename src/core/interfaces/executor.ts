export enum Status {
  CREATED = 0,
  ENABLED = 1,
  DISABLED = 2,
}

export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type WorkingDays = DayOfWeek[];

export interface ITimeRange {
  start?: Date;
  end?: Date;
}

export interface ITariff {
  name?: string;
  timeRange?: ITimeRange;
  workingDays?: WorkingDays[];
  maxOrderCount?: number;
}

export interface IPassport {
  // TODO: все поля как строки
  serial?: string;
  number?: string;
  dateStart?: string;
  issuePlace?: string;
  birthPlace?: string;
  registrationAddress?: string;
  lastFullName?: string;
}

export interface IExecutorProfileHistoryItem {
  date?: string;
  name?: string;
  oldValue?: string;
  newValue?: string;
}

export interface IExecutor {
  ssoId: string;
  address: string;
  photo: string;
  rating: number;
  acceptedUseTerms: string;
  citizenship: string;
  passport: IPassport;
  status: string;
  statusReason: string;
  statusDate: string;
  specialization: string[];
  tariff: string;
}
