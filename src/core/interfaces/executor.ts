import {ITariff} from "./tariff";
import {ICitizenship} from "./citizenship";
import {ISpecialization} from "./specialization";

export enum Status {
  CREATED = 1,
  ENABLED = 2,
  DISABLED = 3,
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
