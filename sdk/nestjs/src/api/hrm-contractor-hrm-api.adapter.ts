import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { IAuthConfig, TokenSource } from '@qlean/sso-sdk';
import { hrm, qlean } from '../../proto/generated/app.proto';
import { PACKAGE_API } from './hrm-core.options';
import { GrpcClientStats } from '@qlean/nestjs-stats';
import { CommonApiAdapter } from './common.adapter';
import ContractorService = hrm.core.ContractorService;
import UuidRequest = qlean.common.search.UuidRequest;
import IContractorSearchRequest = hrm.core.IContractorSearchRequest;
import IContractorCreateRequest = hrm.core.IContractorCreateRequest;
import IContractorUpdateRequest = hrm.core.IContractorUpdateRequest;
import IContractorSearchResponse = hrm.core.IContractorSearchResponse;
import IContractorResponse = hrm.core.IContractorResponse;
import IContractor = hrm.core.IContractor;


export {
  UuidRequest,
  IContractorSearchRequest,
  IContractorCreateRequest,
  IContractorUpdateRequest,
  IContractorSearchResponse,
  IContractorResponse,
  IContractor
};

@Injectable()
export class ContractorHrmApiAdapter extends CommonApiAdapter<ContractorService> {

  constructor(
    @Inject(PACKAGE_API) client: ClientGrpc,
    @Inject('SSO_OPTIONS') config: IAuthConfig,
    @Inject('TOKEN_SOURCE') tokenSource: TokenSource
  ) {
    const api = client.getService<ContractorService>(ContractorService.name);
    super(client, config, api, tokenSource);
  }

  @GrpcClientStats({ grpc_method: 'Search', grpc_service: 'ContractorService', grpc_type: 'unary'})
  search(args: IContractorSearchRequest): Promise<IContractorSearchResponse> {
    return this.call('search', args);
  }

  @GrpcClientStats({ grpc_method: 'Create', grpc_service: 'ContractorService', grpc_type: 'unary'})
  create(args: IContractorCreateRequest): Promise<IContractorResponse> {
    return this.call('create', args);
  }

  @GrpcClientStats({ grpc_method: 'Update', grpc_service: 'ContractorService', grpc_type: 'unary'})
  update(args: IContractorUpdateRequest): Promise<IContractorResponse> {
    return this.call('update', args);
  }

  @GrpcClientStats({ grpc_method: 'FindById', grpc_service: 'ContractorService', grpc_type: 'unary'})
  findById(args: UuidRequest): Promise<IContractorResponse> {
    return this.call('findById', args);
  }

  @GrpcClientStats({ grpc_method: 'Remove', grpc_service: 'ContractorService', grpc_type: 'unary'})
  remove(args: UuidRequest): Promise<IContractorResponse> {
    return this.call('remove', args);
  }

  @GrpcClientStats({ grpc_method: 'Restore', grpc_service: 'ContractorService', grpc_type: 'unary'})
  restore(args: UuidRequest): Promise<IContractorResponse> {
    return this.call('restore', args);
  }
}
