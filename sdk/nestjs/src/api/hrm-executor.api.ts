import { catchError, tap } from 'rxjs/operators';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Metadata } from 'grpc';
import { ClientGrpc } from '@nestjs/microservices';
import { Logger } from '@qlean/nestjs-logger';
import { hrm } from '../../proto/generated/app.proto';
import { prepareError } from '../utils';
import { IAuthConfig, TokenSource } from '@qlean/sso-sdk';

import HRMExecutorService = hrm.core.HRMExecutorService;
import GetExecutorRequest = hrm.core.GetExecutorRequest;
import GetExecutorResponse = hrm.core.GetExecutorResponse;
import CreateExecutorRequest = hrm.core.CreateExecutorRequest;
import CreateExecutorResponse = hrm.core.CreateExecutorResponse;
import UpdateExecutorRequest = hrm.core.UpdateExecutorRequest;
import UpdateExecutorResponse = hrm.core.UpdateExecutorResponse;
import DisableExecutorRequest = hrm.core.DisableExecutorRequest;
import DisableExecutorResponse = hrm.core.DisableExecutorResponse;
import GetHistoryProfileRequest = hrm.core.GetHistoryProfileRequest;
import GetHistoryProfileResponse = hrm.core.GetHistoryProfileResponse;
import { PACKAGE_API } from './hrm-core.options';

@Injectable()
export class HrmExecutorApi implements OnModuleInit {
  private readonly logger: Logger = new Logger(HrmExecutorApi.name);

  private api: HRMExecutorService;

  constructor(
    @Inject(PACKAGE_API) private readonly client: ClientGrpc,
    @Inject('SSO_OPTIONS') private readonly config: IAuthConfig,
    @Inject('TOKEN_SOURCE') private tokenSource: TokenSource,
  ) {}

  onModuleInit() {
    const name = HRMExecutorService.name;

    if (!this.tokenSource) {
      this.tokenSource = new TokenSource(this.config);
    }

    this.logger.debug(`Create client for "${name}"`);
    this.api = this.client.getService<HRMExecutorService>(name);
  }

  public create(
    args: CreateExecutorRequest,
  ): Promise<CreateExecutorResponse> {
    return this.call('create', args);
  }

  public get(
    args: GetExecutorRequest,
  ): Promise<GetExecutorResponse> {
    return this.call('get', args);
  }

  public update(
    args: UpdateExecutorRequest,
  ): Promise<UpdateExecutorResponse> {
    return this.call('update', args);
  }

  public disable(
    args: DisableExecutorRequest,
  ): Promise<DisableExecutorResponse> {
    return this.call('disable', args);
  }

  public getHistoryProfile(
    args: GetHistoryProfileRequest,
  ): Promise<GetHistoryProfileResponse> {
    return this.call('getHistoryProfile', args);
  }

  private async call<T extends object, R extends object>(
    method: string,
    args: T,
  ): Promise<R> {
    this.logger.debug(
      `External call method "${HRMExecutorService.name}/${method}"`,
    );
    const metadata = new Metadata();
    await this.tokenSource.patchMetadata(metadata);
    return this.api[method](args, metadata)
      .pipe(
        tap((result: R) =>
          this.logger.debug(
            `External call method "${HRMExecutorService.name}/${method}" response`,
            result,
          ),
        ),
        catchError(
          prepareError(
            this.logger,
            `${HRMExecutorService.name}/${method}`,
          ),
        ),
      )
      .toPromise();
  }
}
