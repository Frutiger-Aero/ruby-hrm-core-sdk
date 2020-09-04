import { Injectable } from '@nestjs/common';
import _ from 'lodash';
import { ILog, LogEntity } from '../core/interfaces';
import {ExecutorModel} from "../infrastructure/executor";

const EXECUTOR_NAME = ExecutorModel.name;

@Injectable()
export class LogFieldsPickerUtil {
  private readonly serveFields = [
    'id',
    'createdAt',
    'updatedAt',
    'isDeleted',
    'deletedAt',
  ];
  private fieldMap: { [key: string]: (field: string, data: {}) => string } = {
    [EXECUTOR_NAME]: (field: string, data: {}): string => {
      switch (field) {
        case 'tariff':
        case 'citizenship': {
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
  private logMap: {
    [key: string]: (field: string, oldData: {}, newData: {}) => ILog[];
  } = {
    [EXECUTOR_NAME]: (field: string, oldData: {}, newData: {}): ILog[] => {
      const result: ILog[] = [];

      if (
        typeof newData[field] === 'object' &&
        !Array.isArray(newData[field]) &&
        !['tariff', 'citizenship'].includes(field)
      ) {
        const difference = this.checkDiff(newData, oldData);
        if (!Object.keys(difference).length) return result;
        Object.keys(difference[field]).forEach(diffKey => {
          result.push({
            entityId: null,
            type: null,
            name: `${field}.${diffKey}`,
            oldValue: !oldData[field]
              ? null
              : this.pick(EXECUTOR_NAME, diffKey, oldData[field]),
            newValue: this.pick(
              EXECUTOR_NAME,
              diffKey,
              newData[field],
            ),
          });
        });
      } else {
        result.push({
          entityId: null,
          type: null,
          name: field,
          oldValue: this.pick(EXECUTOR_NAME, field, oldData),
          newValue: this.pick(EXECUTOR_NAME, field, newData),
        });
      }

      return result;
    },
  };

  constructor() {}

  private checkDiff(compared: {}, base: {}) {
    function changes(compared: {}, base: {}) {
      return _.transform(compared, function(result, value, key) {
        if (!_.isEqual(value, base[key])) {
          result[key] =
            _.isObject(value) && _.isObject(base[key])
              ? changes(value, base[key])
              : value;
        }
      });
    }
    return changes(compared, base);
  }

  private deleteServeFields(data: {}): {} {
    for (const key in data) {
      if (this.serveFields.includes(key)) {
        delete data[key];
      } else if (typeof data[key] === 'object' && !Array.isArray(data[key])) {
        this.deleteServeFields(data[key]);
      }
    }
    return data;
  }

  public prepareLogCollection(
    model: string,
    entityId: string,
    type: LogEntity,
    oldData: {},
    newData: {},
  ): ILog[] {
    if (!this.logMap[model]) return null;
    const result: ILog[] = [];
    const cleanOldData: {} = this.deleteServeFields(JSON.parse(JSON.stringify(oldData)));
    const cleanNewData: {} = this.deleteServeFields(JSON.parse(JSON.stringify(newData)));

    Object.keys(cleanNewData).forEach(key => {
      let logs: ILog[] = this.logMap[model](key, cleanOldData, cleanNewData);
      logs = logs.map(log => ({ ...log, entityId, type }));
      logs && result.push(...logs);
    });

    return result;
  }

  public pick(model: string, field: string, data: {}): string {
    if (!this.fieldMap[model]) return null;
    return this.fieldMap[model](field, data);
  }
}
