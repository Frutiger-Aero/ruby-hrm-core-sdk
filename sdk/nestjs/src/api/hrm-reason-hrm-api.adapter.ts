import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { IAuthConfig, TokenSource } from '@qlean/sso-sdk';
import { hrm, qlean } from '../../proto/generated/app.proto';
import { PACKAGE_API } from './hrm-core.options';
import { GrpcClientStats } from '@qlean/nestjs-stats';
import { CommonApiAdapter } from './common.adapter';
import ReasonService = hrm.core.ReasonService;
import IBlockingReason = hrm.core.IBlockingReason;
import IFreezingReason = hrm.core.IFreezingReason;
import IBlockingReasonsResponse = hrm.core.IBlockingReasonsResponse;
import IFreezingReasonsResponse = hrm.core.IFreezingReasonsResponse;


export {
  IBlockingReason,
  IFreezingReason,
  IBlockingReasonsResponse,
  IFreezingReasonsResponse
};

@Injectable()
export class ReasonHrmApiAdapter extends CommonApiAdapter<ReasonService> {

  constructor(
    @Inject(PACKAGE_API) client: ClientGrpc,
    @Inject('SSO_OPTIONS') config: IAuthConfig,
    @Inject('TOKEN_SOURCE') tokenSource: TokenSource
  ) {
    const api = client.getService<ReasonService>(ReasonService.name);
    super(client, config, api, tokenSource);
  }

  @GrpcClientStats({ grpc_method: 'GetBlockingReasons', grpc_service: 'ReasonService', grpc_type: 'unary'})
  getBlockingReasons(): Promise<IBlockingReasonsResponse> {
    return this.call('getBlockingReasons', {});
  }

  @GrpcClientStats({ grpc_method: 'GetFreezingReasons', grpc_service: 'ReasonService', grpc_type: 'unary'})
  getFreezingReasons(): Promise<IFreezingReasonsResponse> {
    return this.call('getFreezingReasons', {});
  }
}
