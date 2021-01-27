import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { IAuthConfig, TokenSource } from '@qlean/sso-utils-sdk';
import { hrm, qlean } from '../../proto/generated/app.proto';
import { PACKAGE_API } from './hrm-core.options';
import { GrpcClientStats } from '@qlean/nestjs-stats';
import { CommonApiAdapter } from './common.adapter';
import PositionService = hrm.core.PositionService;
import UuidRequest = qlean.common.search.UuidRequest;
import IPositionSearchRequest = hrm.core.IPositionSearchRequest;
import IPositionCreateRequest = hrm.core.IPositionCreateRequest;
import IPositionUpdateRequest = hrm.core.IPositionUpdateRequest;
import IPositionSearchResponse = hrm.core.IPositionSearchResponse;
import IPositionResponse = hrm.core.IPositionResponse;
import IPosition = hrm.core.IPosition;


export {
  UuidRequest,
  IPositionSearchRequest,
  IPositionCreateRequest,
  IPositionUpdateRequest,
  IPositionSearchResponse,
  IPositionResponse,
  IPosition
};

@Injectable()
export class PositionHrmApiAdapter extends CommonApiAdapter<PositionService> {

  constructor(
    @Inject(PACKAGE_API) client: ClientGrpc,
    @Inject('SSO_OPTIONS') config: IAuthConfig,
    @Inject('TOKEN_SOURCE') tokenSource: TokenSource
  ) {
    const api = client.getService<PositionService>(PositionService.name);
    super(client, config, api, tokenSource);
  }

  @GrpcClientStats({ grpc_method: 'Search', grpc_service: 'PositionService', grpc_type: 'unary'})
  search(args: IPositionSearchRequest): Promise<IPositionSearchResponse> {
    return this.call('search', args);
  }

  @GrpcClientStats({ grpc_method: 'Create', grpc_service: 'PositionService', grpc_type: 'unary'})
  create(args: IPositionCreateRequest): Promise<IPositionResponse> {
    return this.call('create', args);
  }

  @GrpcClientStats({ grpc_method: 'Update', grpc_service: 'PositionService', grpc_type: 'unary'})
  update(args: IPositionUpdateRequest): Promise<IPositionResponse> {
    return this.call('update', args);
  }

  @GrpcClientStats({ grpc_method: 'FindById', grpc_service: 'PositionService', grpc_type: 'unary'})
  findById(args: UuidRequest): Promise<IPositionResponse> {
    return this.call('findById', args);
  }

  @GrpcClientStats({ grpc_method: 'Remove', grpc_service: 'PositionService', grpc_type: 'unary'})
  remove(args: UuidRequest): Promise<IPositionResponse> {
    return this.call('remove', args);
  }

  @GrpcClientStats({ grpc_method: 'Restore', grpc_service: 'PositionService', grpc_type: 'unary'})
  restore(args: UuidRequest): Promise<IPositionResponse> {
    return this.call('restore', args);
  }
}
