import { Metadata } from 'grpc';
import { IPassport, ITariff, IExecutorProfileHistoryItem } from './executor';

export interface IGetExecutorRequest {
  id?: string;
}

export interface IGetExecutorResponse {
  address?: string;
  photo?: string;
  rating?: number;
  acceptedUseTerms?: string;
  // TODO: это обычное перечисление заменить на unique name
  citizenship?: string;
  passport?: IPassport;
  status?: string;
  statusReason?: string;
  statusDate?: string;
  specialization?: string[];
  tariff?: ITariff;
}

export interface ICreateExecutorRequest {
  // TODO: добавить ssoId
  ssoId?: string;
  address?: string;
  photo?: string;
  // TODO: статус не нужен, это зона ответственности бэка
  citizenshipId?: string;
  passport?: IPassport;
}

export interface ICreateExecutorResponse {
  id?: string;
}

export interface IUpdateExecutorRequest {
  id?: string;
  // TODO: from SSO-source to remove
  address?: string;
  photo?: string;
  rating?: number;
  acceptedUseTerms?: string;
  citizenship?: string;
  passport?: IPassport;
  status?: string;
  statusReason?: string;
  statusDate?: string;
  specialization?: string[];
  // TODO: TR tariffName
  tariff?: string;
}

export interface IUpdateExecutorResponse {}

export interface IDisableExecutorRequest {
  id?: string;
  statusReason?: string;
}

export interface IDisableExecutorResponse {}

export interface IGetHistoryProfileRequest {
  id?: string;
  name?: string;
  oldValue?: string;
  newValue?: string;
  dateFrom?: string;
  dateTo?: string;
  limit?: number;
}

export interface IGetHistoryProfileResponse {
  history?: IExecutorProfileHistoryItem[];
}

export interface IHRMExecutorService {
  create(
    args: ICreateExecutorRequest,
    metadata?: Metadata,
  ): Promise<ICreateExecutorResponse>;
  get(
    args: IGetExecutorRequest,
    metadata?: Metadata,
  ): Promise<IGetExecutorResponse>;
  update(
    args: IUpdateExecutorRequest,
    metadata?: Metadata,
  ): Promise<IUpdateExecutorResponse>;
  disable(
    args: IDisableExecutorRequest,
    metadata?: Metadata,
  ): Promise<IDisableExecutorResponse>;
  getHistoryProfile(
    args: IGetHistoryProfileRequest,
    metadata?: Metadata,
  ): Promise<IGetHistoryProfileResponse>;
}
