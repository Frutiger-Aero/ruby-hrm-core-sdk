import {Injectable} from '@nestjs/common';
import {Logger} from '@qlean/nestjs-logger';
import { IOption } from '../../../domain';

@Injectable()
export class OptionStore {
  protected readonly logger = new Logger(OptionStore.name);
  private store: IOption[] = [
    {
      id: '5d2857b9-07dc-430a-8fa5-c8800952d156',
      name: 'rooms',
      title: 'Комнатность'
    },
    {
      id: '45139d71-7193-4dc1-a2f9-d360b09ccdda',
      name: 'bathrooms',
      title: 'Ванные'
    },
    {
      id: 'b097ef96-23ec-4b35-b1b0-e5f9671bad60',
      name: 'floor_cleaning',
      title: 'Помыть пол'
    },
    {
      id: '5ae8657e-5c91-438e-9176-e1dd5288160e',
      name: 'carpet_cleaning',
      title: 'Почистить ковёр'
    },
    {
      id: '0cb9fb85-6008-408b-9fa2-ed3af855ba71',
      name: 'clean_furniture',
      title: 'Почистить мебель'
    }
  ];
  constructor(
  ) {
  }

  findBySlug(slug: string) {
    return this.store.find(option => option.name === slug);
  }

  findAllBySlugs(slugs: string[]) {
    const options = this.store.filter(option => slugs.find(slug => slug === option.name));

    return options.reduce(function(map, obj) {
      map[obj.name] = obj;
      return map;
  }, {});
  }
}
