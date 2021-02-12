import {Injectable} from '@nestjs/common';
import {Logger} from '@qlean/nestjs-logger';
import { IProduct } from '../../../domain';

@Injectable()
export class ProductStore {
  protected readonly logger = new Logger(ProductStore.name);
  private store: IProduct[] = [
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
  ) {
  }

  findBySlug(slug: string) {
    return this.store.find(product => product.name === slug);
  }

  findAllBySlugs(slugs: string[]) {
    const products = this.store.filter(product => slugs.find(slug => slug === product.name));

    return products.reduce(function(map, obj) {
      map[obj.name] = obj;
      return map;
  }, {});
  }
}
