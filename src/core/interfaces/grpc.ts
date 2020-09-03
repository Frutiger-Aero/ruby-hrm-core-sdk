import { Metadata } from 'grpc';
import {
  IPassport,
  ITariff,
  IExecutorProfileHistoryItem,
  Status,
} from './executor';

export interface IGetExecutorRequest {}

export interface IGetExecutorResponse {
  address?: string;
  photo?: string;
  rating?: number;
  acceptedUseTerms?: string;
  citizenship?: string;
  passport?: IPassport;
  status?: Status;
  statusReason?: string;
  statusDate?: string;
  specialization?: string[];
  tariff?: ITariff;
}

export interface ICreateExecutorRequest {
  address?: string;
  photo?: string;
  citizenship?: string;
  passport?: IPassport;
}

export interface ICreateExecutorResponse {
  id?: string;
}

export interface IUpdateExecutorRequest {
  id?: string;
  address?: string;
  photo?: string;
  rating?: number;
  acceptedUseTerms?: string;
  citizenship?: string;
  passport?: IPassport;
  specialization?: string[];
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
