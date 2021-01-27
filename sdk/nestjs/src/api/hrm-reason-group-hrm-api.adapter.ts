import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { IAuthConfig, TokenSource } from '@qlean/sso-utils-sdk';
import { hrm, qlean } from '../../proto/generated/app.proto';
import { PACKAGE_API } from './hrm-core.options';
import { GrpcClientStats } from '@qlean/nestjs-stats';
import { CommonApiAdapter } from './common.adapter';
import ReasonService = hrm.core.BlockingReasonGroupService;
import IBlockingReasonGroup = hrm.core.IBlockingReasonGroup;
import IBlockingReasonGroupResponse = hrm.core.IBlockingReasonGroupResponse;
import IBlockingReasonGroupCreateRequest = hrm.core.IBlockingReasonGroupCreateRequest;
import IBlockingReasonGroupUpdateRequest = hrm.core.IBlockingReasonGroupUpdateRequest;
import IBlockingReasonGroupSearchRequest = hrm.core.IBlockingReasonGroupSearchRequest;
import IBlockingReasonGroupSearchResponse = hrm.core.IBlockingReasonGroupSearchResponse;

import UuidRequest = qlean.common.search.UuidRequest;

export {
  IBlockingReasonGroup,
  IBlockingReasonGroupResponse,
  IBlockingReasonGroupCreateRequest,
  IBlockingReasonGroupUpdateRequest,
  IBlockingReasonGroupSearchRequest,
  IBlockingReasonGroupSearchResponse,
};

@Injectable()
export class BlockingReasonGroupHrmApiAdapter extends CommonApiAdapter<ReasonService> {

  constructor(
    @Inject(PACKAGE_API) client: ClientGrpc,
    @Inject('SSO_OPTIONS') config: IAuthConfig,
    @Inject('TOKEN_SOURCE') tokenSource: TokenSource
  ) {
    const api = client.getService<ReasonService>(ReasonService.name);
    super(client, config, api, tokenSource);
  }

  @GrpcClientStats({ grpc_method: 'Search', grpc_service: 'BlockingReasonGroupService', grpc_type: 'unary'})
  search(args: IBlockingReasonGroupSearchRequest): Promise<IBlockingReasonGroupSearchResponse> {
    return this.call('search', args);
  }

  @GrpcClientStats({ grpc_method: 'Create', grpc_service: 'BlockingReasonGroupService', grpc_type: 'unary'})
  create(args: IBlockingReasonGroupCreateRequest): Promise<IBlockingReasonGroupResponse> {
    return this.call('create', args);
  }

  @GrpcClientStats({ grpc_method: 'Update', grpc_service: 'BlockingReasonGroupService', grpc_type: 'unary'})
  update(args: IBlockingReasonGroupUpdateRequest): Promise<IBlockingReasonGroupResponse> {
    return this.call('update', args);
  }

  @GrpcClientStats({ grpc_method: 'FindById', grpc_service: 'BlockingReasonGroupService', grpc_type: 'unary'})
  findById(args: UuidRequest): Promise<IBlockingReasonGroupResponse> {
    return this.call('findById', args);
  }

  @GrpcClientStats({ grpc_method: 'Remove', grpc_service: 'BlockingReasonGroupService', grpc_type: 'unary'})
  remove(args: UuidRequest): Promise<IBlockingReasonGroupResponse> {
    return this.call('remove', args);
  }

  @GrpcClientStats({ grpc_method: 'Restore', grpc_service: 'BlockingReasonGroupService', grpc_type: 'unary'})
  restore(args: UuidRequest): Promise<IBlockingReasonGroupResponse> {
    return this.call('restore', args);
  }
}
