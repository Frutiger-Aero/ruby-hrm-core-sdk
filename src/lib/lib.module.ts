import { DynamicModule, Module } from '@nestjs/common';

@Module({})
export class LibModule {
  static register(props): DynamicModule {
    return {
      module: LibModule,
      providers: [

      ],
      exports: [],
    };
  }
}
