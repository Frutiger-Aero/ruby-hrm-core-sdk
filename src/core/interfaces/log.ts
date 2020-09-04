export enum LogEntity {
  EXECUTOR = 0,
}

export interface ILog {
  type: LogEntity;
  name: string;
  oldValue: string | null
  newValue: string;
  entityId: string;
}
