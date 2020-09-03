import { Injectable } from '@nestjs/common';
import _ from 'lodash';
import {ILog} from "../core/interfaces";

@Injectable()
export class LogFieldsPickerUtil {
  private fieldMap: { [key: string]: (field: string, data: {}) => string } = {
    ExecutorModel: (field: string, data: {}): string => {
      switch (field) {
        case 'tariff' || 'citizenship': {
          return _.get(data, `${field}.name`, null);
        }

        case 'specialization': {
          const val = [];
          if (data[field] && data[field].length) {
            data[field].forEach(item => {
              val.push(item.name);
            });

            return val.join(', ');
          } else {
            return null;
          }
        }

        default: {
          return data[field];
        }
      }
    },
  };
  private logMap

  constructor() {}

  public prepareLogCollection(
    model: string,
    field: string,
    oldData: {},
    newData: {},
  ): ILog[] {
    const result: ILog[] = [];

    Object.keys(newData).forEach(key => {
      this.logMap
    });

    return result;
  }

  public pick(model: string, field: string, data: {}): string {
    if (!this.fieldMap[model]) return null;

    let result: string;

    this.fieldMap[model](field, data);

    return null;
  }
}
