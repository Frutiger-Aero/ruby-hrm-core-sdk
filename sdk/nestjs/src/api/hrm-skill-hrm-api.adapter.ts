import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { IAuthConfig, TokenSource } from '@qlean/sso-sdk';
import { hrm, qlean } from '../../proto/generated/app.proto';
import { PACKAGE_API } from './hrm-core.options';
import { GrpcClientStats } from '@qlean/nestjs-stats';
import { CommonApiAdapter } from './common.adapter';
import SkillService = hrm.core.SkillService;
import UuidRequest = qlean.common.search.UuidRequest;
import ISkillSearchRequest = hrm.core.ISkillSearchRequest;
import ISkillCreateRequest = hrm.core.ISkillCreateRequest;
import ISkillUpdateRequest = hrm.core.ISkillUpdateRequest;
import ISkillSearchResponse = hrm.core.ISkillSearchResponse;
import ISkillResponse = hrm.core.ISkillResponse;
import ISkill = hrm.core.ISkill;


export {
  UuidRequest,
  ISkillSearchRequest,
  ISkillCreateRequest,
  ISkillUpdateRequest,
  ISkillSearchResponse,
  ISkillResponse,
  ISkill
};

@Injectable()
export class SkillHrmApiAdapter extends CommonApiAdapter<SkillService> {

  constructor(
    @Inject(PACKAGE_API) client: ClientGrpc,
    @Inject('SSO_OPTIONS') config: IAuthConfig,
    @Inject('TOKEN_SOURCE') tokenSource: TokenSource
  ) {
    const api = client.getService<SkillService>(SkillService.name);
    super(client, config, api, tokenSource);
  }

  @GrpcClientStats({ grpc_method: 'Search', grpc_service: 'SkillService', grpc_type: 'unary'})
  search(args: ISkillSearchRequest): Promise<ISkillSearchResponse> {
    return this.call('search', args);
  }

  @GrpcClientStats({ grpc_method: 'Create', grpc_service: 'SkillService', grpc_type: 'unary'})
  create(args: ISkillCreateRequest): Promise<ISkillResponse> {
    return this.call('create', args);
  }

  @GrpcClientStats({ grpc_method: 'Update', grpc_service: 'SkillService', grpc_type: 'unary'})
  update(args: ISkillUpdateRequest): Promise<ISkillResponse> {
    return this.call('update', args);
  }

  @GrpcClientStats({ grpc_method: 'FindById', grpc_service: 'SkillService', grpc_type: 'unary'})
  findById(args: UuidRequest): Promise<ISkillResponse> {
    return this.call('findById', args);
  }

  @GrpcClientStats({ grpc_method: 'Remove', grpc_service: 'SkillService', grpc_type: 'unary'})
  remove(args: UuidRequest): Promise<ISkillResponse> {
    return this.call('remove', args);
  }

  @GrpcClientStats({ grpc_method: 'Restore', grpc_service: 'SkillService', grpc_type: 'unary'})
  restore(args: UuidRequest): Promise<ISkillResponse> {
    return this.call('restore', args);
  }
}
