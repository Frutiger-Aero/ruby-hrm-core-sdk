export enum Status {
  CREATED = 0,
  ENABLED = 1,
  DISABLED = 2,
}

export enum LogEntity {
  EXECUTOR = 0,
}

export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type WorkingDays = DayOfWeek[];

export interface ITimeRange {
  start?: Date;
  end?: Date;
}

// TODO: разделить интерфейсы по файлам-моделям

export interface ITariff {
  name?: string;
  timeRange?: ITimeRange;
  workingDays?: WorkingDays;
  maxOrderCount?: number;
}

export interface ISpecialization {
  name: string;
}

export interface ICitizenship {
  name: string;
}

export interface IPassport {
  serial?: string;
  number?: string;
  dateStart?: string;
  issuePlace?: string;
  birthPlace?: string;
  registrationAddress?: string;
  lastFullName?: string[];
}

export interface ILog {
  type: LogEntity;
  name: string;
  oldValue: string | null
  newValue: string;
  entityId: string;
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
  citizenship: ICitizenship;
  passport: IPassport;
  status: Status;
  statusReason: string;
  statusDate: string;
  specialization: ISpecialization[];
  tariff: ITariff;
}
