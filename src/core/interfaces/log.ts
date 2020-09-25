export enum LogEntity {
  EXECUTOR = 1,
}

export interface ILog {
  type: LogEntity;
  name: string;
  oldValue: string | null
  newValue: string;
  entityId: string;
}
