import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { IAuthConfig, TokenSource } from '@qlean/sso-utils-sdk';
import { hrm, qlean } from '../../proto/generated/app.proto';
import { PACKAGE_API } from './hrm-core.options';
import { GrpcClientStats } from '@qlean/nestjs-stats';
import { CommonApiAdapter } from './common.adapter';
import ReasonService = hrm.core.BlockingReasonService;
import IBlockingReason = hrm.core.IBlockingReason;
import IBlockingReasonResponse = hrm.core.IBlockingReasonResponse;
import IBlockingReasonCreateRequest = hrm.core.IBlockingReasonCreateRequest;
import IBlockingReasonUpdateRequest = hrm.core.IBlockingReasonUpdateRequest;
import IBlockingReasonSearchRequest = hrm.core.IBlockingReasonSearchRequest;
import IBlockingReasonSearchResponse = hrm.core.IBlockingReasonSearchResponse;
import IBlockingReasonGroup = hrm.core.IBlockingReasonGroup;

import UuidRequest = qlean.common.search.UuidRequest;

export {
  IBlockingReason,
  IBlockingReasonResponse,
  IBlockingReasonCreateRequest,
  IBlockingReasonUpdateRequest,
  IBlockingReasonSearchRequest,
  IBlockingReasonSearchResponse,
  IBlockingReasonGroup
};

@Injectable()
export class BlockingReasonHrmApiAdapter extends CommonApiAdapter<ReasonService> {

  constructor(
    @Inject(PACKAGE_API) client: ClientGrpc,
    @Inject('SSO_OPTIONS') config: IAuthConfig,
    @Inject('TOKEN_SOURCE') tokenSource: TokenSource
  ) {
    const api = client.getService<ReasonService>(ReasonService.name);
    super(client, config, api, tokenSource);
  }

  @GrpcClientStats({ grpc_method: 'Search', grpc_service: 'BlockingReasonService', grpc_type: 'unary'})
  search(args: IBlockingReasonSearchRequest): Promise<IBlockingReasonSearchResponse> {
    return this.call('search', args);
  }

  @GrpcClientStats({ grpc_method: 'Create', grpc_service: 'BlockingReasonService', grpc_type: 'unary'})
  create(args: IBlockingReasonCreateRequest): Promise<IBlockingReasonResponse> {
    return this.call('create', args);
  }

  @GrpcClientStats({ grpc_method: 'Update', grpc_service: 'BlockingReasonService', grpc_type: 'unary'})
  update(args: IBlockingReasonUpdateRequest): Promise<IBlockingReasonResponse> {
    return this.call('update', args);
  }

  @GrpcClientStats({ grpc_method: 'FindById', grpc_service: 'BlockingReasonService', grpc_type: 'unary'})
  findById(args: UuidRequest): Promise<IBlockingReasonResponse> {
    return this.call('findById', args);
  }

  @GrpcClientStats({ grpc_method: 'Remove', grpc_service: 'BlockingReasonService', grpc_type: 'unary'})
  remove(args: UuidRequest): Promise<IBlockingReasonResponse> {
    return this.call('remove', args);
  }

  @GrpcClientStats({ grpc_method: 'Restore', grpc_service: 'BlockingReasonService', grpc_type: 'unary'})
  restore(args: UuidRequest): Promise<IBlockingReasonResponse> {
    return this.call('restore', args);
  }
}
