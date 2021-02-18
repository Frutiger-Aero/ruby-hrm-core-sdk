import {Injectable} from '@nestjs/common';
import {Logger} from '@qlean/nestjs-logger';
import { IOption } from '../../../domain';
import { PltCoreOptionApiAdapter, IOptionSearchRequest, IOption as PltOption } from '@qlean/plt-core-sdk';

@Injectable()
export class OptionStore {
  protected readonly logger = new Logger(OptionStore.name);
  private storeMock: IOption[] = [
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
    private store: PltCoreOptionApiAdapter
  ) {
  }

  async findBySlug(slug: string) {
    const request: IOptionSearchRequest = {
      limit: 1,
      page: 1,
      where: [
        {
          name: {
            eq: slug
          }
        }
      ]
    }
    const res = await this.store.search(request);
    return res.data[0];
  }

  async findAllBySlugs(slugs: string[]) {
    const request: IOptionSearchRequest = {
      limit: 100,
      page: 1,
      where: [
        {
          name: {
            in: slugs
          }
        }
      ]
    }
  
    const options = await this.store.search(request);

    const obj = options.data.reduce<{[key: string]: IOption}>((map, obj) => {
      map[obj.name] = obj;
      return map;
    }, {});

    return obj;
  }
}
