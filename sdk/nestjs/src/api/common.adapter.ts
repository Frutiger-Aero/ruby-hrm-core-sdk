import { OnModuleInit } from "@nestjs/common";
import { IAuthConfig, TokenSource } from "@qlean/sso-sdk";
import { prepareError } from '../utils';
import { ClientGrpc } from "@nestjs/microservices";

import { Metadata } from "grpc";
import { catchError, tap, flatMap } from "rxjs/operators";
import { Logger } from "@qlean/nestjs-logger";
import { from } from "rxjs";

export class CommonApiAdapter<S> implements OnModuleInit{
  private name = this.constructor.name;
  private readonly logger: Logger = new Logger(this.name);
  constructor(
    private readonly client: ClientGrpc,
    private readonly config: IAuthConfig,
    private readonly api: S,
    private tokenSource: TokenSource,
  ) {
  }
  async onModuleInit() {
    if (!this.tokenSource) {
      this.tokenSource = new TokenSource(this.config);
    }
    this.logger.debug(`Create client for "${this.name}"`);
    // init token sso
    await this.getSsoTokenMetadata();
  }

  protected async call<T extends object, R extends object>(method: string, args: T): Promise<R> {
    this.logger.debug(`External call method "${this.name}/${method}"`, args);
    return from(this.getSsoTokenMetadata())
      .pipe(
        flatMap(metadata => this.api[method](args, metadata)),
        tap((result: R) =>
          this.logger.debug(`External call method ` +
            `"${this.name}/${method}" response`, result)),
        catchError(prepareError(this.logger, `${this.name}/${method}`)),
      ).toPromise()
  }

  private async getSsoTokenMetadata() {
    try {
      const metadata = new Metadata();
      await this.tokenSource.patchMetadata(metadata);
      return metadata;
    } catch (error) {
      console.log(error)
      this.logger.error('Get sso token error', error);
      throw error;
    }
  }
}