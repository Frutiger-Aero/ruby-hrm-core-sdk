import {Injectable} from '@nestjs/common';
import {Logger} from '@qlean/nestjs-logger';
import { IProduct } from '../../../domain';
import { PltCoreRegulationsApiAdapter, IRegulationsSearchRequest } from '@qlean/plt-core-sdk';

@Injectable()
export class ProductStore {
  protected readonly logger = new Logger(ProductStore.name);
  private mockStore: IProduct[] = [
    {
      id: '72b378c3-49f4-459e-a4d3-5ea1b0d014a0',
      name: 'cleaning_flat_standard',
      title: 'Стандартная уборка'
    },
    {
      id: 'f3200011-0deb-4beb-8c9b-a1038d57377f',
      name: 'cleaning_flat_windows',
      title: 'Окна'
    },
    {
      id: 'b7935e23-fc25-4625-ba6f-0f64ae28010b',
      name: 'cleaning_flat_deep',
      title: 'Генеральная уборка'
    }
  ];
  constructor(
    private store: PltCoreRegulationsApiAdapter
  ) {
  }

  async findBySlug(slug: string) {
    const request: IRegulationsSearchRequest = {
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
    const request: IRegulationsSearchRequest = {
      limit: 1,
      page: 1,
      where: [
        {
          name: {
            in: slugs
          }
        }
      ]
    }
    const res = await this.store.search(request);

    return res.data.reduce(function(map, obj) {
      map[obj.name] = obj;
      return map;
  }, {});
  }
}
