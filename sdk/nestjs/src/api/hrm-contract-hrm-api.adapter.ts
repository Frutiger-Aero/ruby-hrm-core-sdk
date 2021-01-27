import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { IAuthConfig, TokenSource } from '@qlean/sso-utils-sdk';
import { hrm, qlean } from '../../proto/generated/app.proto';
import { PACKAGE_API } from './hrm-core.options';
import { GrpcClientStats } from '@qlean/nestjs-stats';
import { CommonApiAdapter } from './common.adapter';
import ContractService = hrm.core.ContractService;
import UuidRequest = qlean.common.search.UuidRequest;
import IContractSearchRequest = hrm.core.IContractSearchRequest;
import IContractCreateRequest = hrm.core.IContractCreateRequest;
import IContractUpdateRequest = hrm.core.IContractUpdateRequest;
import IContractSearchResponse = hrm.core.IContractSearchResponse;
import IContractResponse = hrm.core.IContractResponse;
import IContractBlockRequest = hrm.core.IContractBlockRequest;
import IContract = hrm.core.IContract;


export {
  UuidRequest,
  IContractSearchRequest,
  IContractCreateRequest,
  IContractUpdateRequest,
  IContractSearchResponse,
  IContractResponse,
  IContract
};

@Injectable()
export class ContractHrmApiAdapter extends CommonApiAdapter<ContractService> {

  constructor(
    @Inject(PACKAGE_API) client: ClientGrpc,
    @Inject('SSO_OPTIONS') config: IAuthConfig,
    @Inject('TOKEN_SOURCE') tokenSource: TokenSource
  ) {
    const api = client.getService<ContractService>(ContractService.name);
    super(client, config, api, tokenSource);
  }

  @GrpcClientStats({ grpc_method: 'Search', grpc_service: 'ContractService', grpc_type: 'unary'})
  search(args: IContractSearchRequest): Promise<IContractSearchResponse> {
    return this.call('search', args);
  }

  @GrpcClientStats({ grpc_method: 'Create', grpc_service: 'ContractService', grpc_type: 'unary'})
  create(args: IContractCreateRequest): Promise<IContractResponse> {
    return this.call('create', args);
  }

  @GrpcClientStats({ grpc_method: 'Update', grpc_service: 'ContractService', grpc_type: 'unary'})
  update(args: IContractUpdateRequest): Promise<IContractResponse> {
    return this.call('update', args);
  }

  @GrpcClientStats({ grpc_method: 'FindById', grpc_service: 'ContractService', grpc_type: 'unary'})
  findById(args: UuidRequest): Promise<IContractResponse> {
    return this.call('findById', args);
  }

  @GrpcClientStats({ grpc_method: 'Remove', grpc_service: 'ContractService', grpc_type: 'unary'})
  remove(args: UuidRequest): Promise<IContractResponse> {
    return this.call('remove', args);
  }

  @GrpcClientStats({ grpc_method: 'Restore', grpc_service: 'ContractService', grpc_type: 'unary'})
  restore(args: UuidRequest): Promise<IContractResponse> {
    return this.call('restore', args);
  }

  @GrpcClientStats({ grpc_method: 'Block', grpc_service: 'ContractService', grpc_type: 'unary'})
  block(args: IContractBlockRequest): Promise<IContractResponse> {
    return this.call('block', args);
  }
}
