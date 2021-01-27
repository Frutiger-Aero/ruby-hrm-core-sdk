import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { IAuthConfig, TokenSource } from '@qlean/sso-utils-sdk';
import { hrm, qlean } from '../../proto/generated/app.proto';
import { PACKAGE_API } from './hrm-core.options';
import { GrpcClientStats } from '@qlean/nestjs-stats';
import { CommonApiAdapter } from './common.adapter';
import SpecializationService = hrm.core.SpecializationService;
import UuidRequest = qlean.common.search.UuidRequest;
import ISpecializationSearchRequest = hrm.core.ISpecializationSearchRequest;
import ISpecializationCreateRequest = hrm.core.ISpecializationCreateRequest;
import ISpecializationUpdateRequest = hrm.core.ISpecializationUpdateRequest;
import ISpecializationSearchResponse = hrm.core.ISpecializationSearchResponse;
import ISpecializationResponse = hrm.core.ISpecializationResponse;
import ISpecialization = hrm.core.ISpecialization;


export {
  UuidRequest,
  ISpecializationSearchRequest,
  ISpecializationCreateRequest,
  ISpecializationUpdateRequest,
  ISpecializationSearchResponse,
  ISpecializationResponse,
  ISpecialization
};

@Injectable()
export class SpecializationHrmApiAdapter extends CommonApiAdapter<SpecializationService> {

  constructor(
    @Inject(PACKAGE_API) client: ClientGrpc,
    @Inject('SSO_OPTIONS') config: IAuthConfig,
    @Inject('TOKEN_SOURCE') tokenSource: TokenSource
  ) {
    const api = client.getService<SpecializationService>(SpecializationService.name);
    super(client, config, api, tokenSource);
  }

  @GrpcClientStats({ grpc_method: 'Search', grpc_service: 'SpecializationService', grpc_type: 'unary'})
  search(args: ISpecializationSearchRequest): Promise<ISpecializationSearchResponse> {
    return this.call('search', args);
  }

  @GrpcClientStats({ grpc_method: 'Create', grpc_service: 'SpecializationService', grpc_type: 'unary'})
  create(args: ISpecializationCreateRequest): Promise<ISpecializationResponse> {
    return this.call('create', args);
  }

  @GrpcClientStats({ grpc_method: 'Update', grpc_service: 'SpecializationService', grpc_type: 'unary'})
  update(args: ISpecializationUpdateRequest): Promise<ISpecializationResponse> {
    return this.call('update', args);
  }

  @GrpcClientStats({ grpc_method: 'FindById', grpc_service: 'SpecializationService', grpc_type: 'unary'})
  findById(args: UuidRequest): Promise<ISpecializationResponse> {
    return this.call('findById', args);
  }

  @GrpcClientStats({ grpc_method: 'Remove', grpc_service: 'SpecializationService', grpc_type: 'unary'})
  remove(args: UuidRequest): Promise<ISpecializationResponse> {
    return this.call('remove', args);
  }

  @GrpcClientStats({ grpc_method: 'Restore', grpc_service: 'SpecializationService', grpc_type: 'unary'})
  restore(args: UuidRequest): Promise<ISpecializationResponse> {
    return this.call('restore', args);
  }
}
