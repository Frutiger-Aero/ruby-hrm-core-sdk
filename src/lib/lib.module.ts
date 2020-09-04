import { DynamicModule, Module } from '@nestjs/common';
import {LogFieldsPickerUtil} from "./log-fields-picker.util";

@Module({})
export class LibModule {
  static register(props): DynamicModule {
    return {
      module: LibModule,
      providers: [
        LogFieldsPickerUtil,
      ],
      exports: [LogFieldsPickerUtil],
    };
  }
}
