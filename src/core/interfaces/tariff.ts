export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type WorkingDays = DayOfWeek[];

export interface ITimeRange {
  start?: Date;
  end?: Date;
}

export interface ITariff {
  name?: string;
  timeRange?: ITimeRange;
  workingDays?: WorkingDays;
  maxOrderCount?: number;
}