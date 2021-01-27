import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { IAuthConfig, TokenSource } from '@qlean/sso-utils-sdk';
import { hrm, qlean } from '../../proto/generated/app.proto';
import { PACKAGE_API } from './hrm-core.options';
import { GrpcClientStats } from '@qlean/nestjs-stats';
import { CommonApiAdapter } from './common.adapter';
import WageService = hrm.core.WageService;
import UuidRequest = qlean.common.search.UuidRequest;
import IWageSearchRequest = hrm.core.IWageSearchRequest;
import IWageCreateRequest = hrm.core.IWageCreateRequest;
import IWageUpdateRequest = hrm.core.IWageUpdateRequest;
import IWageSearchResponse = hrm.core.IWageSearchResponse;
import IWageResponse = hrm.core.IWageResponse;
import IWage = hrm.core.IWage;


export {
  UuidRequest,
  IWageSearchRequest,
  IWageCreateRequest,
  IWageUpdateRequest,
  IWageSearchResponse,
  IWageResponse,
  IWage
};

@Injectable()
export class WageHrmApiAdapter extends CommonApiAdapter<WageService> {

  constructor(
    @Inject(PACKAGE_API) client: ClientGrpc,
    @Inject('SSO_OPTIONS') config: IAuthConfig,
    @Inject('TOKEN_SOURCE') tokenSource: TokenSource
  ) {
    const api = client.getService<WageService>(WageService.name);
    super(client, config, api, tokenSource);
  }

  @GrpcClientStats({ grpc_method: 'Search', grpc_service: 'WageService', grpc_type: 'unary'})
  search(args: IWageSearchRequest): Promise<IWageSearchResponse> {
    return this.call('search', args);
  }

  @GrpcClientStats({ grpc_method: 'Create', grpc_service: 'WageService', grpc_type: 'unary'})
  create(args: IWageCreateRequest): Promise<IWageResponse> {
    return this.call('create', args);
  }

  @GrpcClientStats({ grpc_method: 'Update', grpc_service: 'WageService', grpc_type: 'unary'})
  update(args: IWageUpdateRequest): Promise<IWageResponse> {
    return this.call('update', args);
  }

  @GrpcClientStats({ grpc_method: 'FindById', grpc_service: 'WageService', grpc_type: 'unary'})
  findById(args: UuidRequest): Promise<IWageResponse> {
    return this.call('findById', args);
  }

  @GrpcClientStats({ grpc_method: 'Remove', grpc_service: 'WageService', grpc_type: 'unary'})
  remove(args: UuidRequest): Promise<IWageResponse> {
    return this.call('remove', args);
  }

  @GrpcClientStats({ grpc_method: 'Restore', grpc_service: 'WageService', grpc_type: 'unary'})
  restore(args: UuidRequest): Promise<IWageResponse> {
    return this.call('restore', args);
  }
}
