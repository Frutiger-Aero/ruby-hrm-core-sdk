import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { IAuthConfig, TokenSource } from '@qlean/sso-utils-sdk';
import { hrm, qlean } from '../../proto/generated/app.proto';
import { PACKAGE_API } from './hrm-core.options';
import { GrpcClientStats } from '@qlean/nestjs-stats';
import { CommonApiAdapter } from './common.adapter';
import ProductService = hrm.core.ProductService;
import UuidRequest = qlean.common.search.UuidRequest;
import IProductSearchRequest = hrm.core.IProductSearchRequest;
import IProductCreateRequest = hrm.core.IProductCreateRequest;
import IProductUpdateRequest = hrm.core.IProductUpdateRequest;
import IProductSearchResponse = hrm.core.IProductSearchResponse;
import IProductResponse = hrm.core.IProductResponse;
import IProduct = hrm.core.IProduct;


export {
  UuidRequest,
  IProductSearchRequest,
  IProductCreateRequest,
  IProductUpdateRequest,
  IProductSearchResponse,
  IProductResponse,
  IProduct
};

@Injectable()
export class ProductHrmApiAdapter extends CommonApiAdapter<ProductService> {

  constructor(
    @Inject(PACKAGE_API) client: ClientGrpc,
    @Inject('SSO_OPTIONS') config: IAuthConfig,
    @Inject('TOKEN_SOURCE') tokenSource: TokenSource
  ) {
    const api = client.getService<ProductService>(ProductService.name);
    super(client, config, api, tokenSource);
  }

  @GrpcClientStats({ grpc_method: 'Search', grpc_service: 'ProductService', grpc_type: 'unary'})
  search(args: IProductSearchRequest): Promise<IProductSearchResponse> {
    return this.call('search', args);
  }

  @GrpcClientStats({ grpc_method: 'Create', grpc_service: 'ProductService', grpc_type: 'unary'})
  create(args: IProductCreateRequest): Promise<IProductResponse> {
    return this.call('create', args);
  }

  @GrpcClientStats({ grpc_method: 'Update', grpc_service: 'ProductService', grpc_type: 'unary'})
  update(args: IProductUpdateRequest): Promise<IProductResponse> {
    return this.call('update', args);
  }

  @GrpcClientStats({ grpc_method: 'FindById', grpc_service: 'ProductService', grpc_type: 'unary'})
  findById(args: UuidRequest): Promise<IProductResponse> {
    return this.call('findById', args);
  }

  @GrpcClientStats({ grpc_method: 'Remove', grpc_service: 'ProductService', grpc_type: 'unary'})
  remove(args: UuidRequest): Promise<IProductResponse> {
    return this.call('remove', args);
  }

  @GrpcClientStats({ grpc_method: 'Restore', grpc_service: 'ProductService', grpc_type: 'unary'})
  restore(args: UuidRequest): Promise<IProductResponse> {
    return this.call('restore', args);
  }
}
