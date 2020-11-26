import {Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Logger} from '@qlean/nestjs-logger';
import {CrudStore, SearchHelper} from '@qlean/nestjs-typeorm-persistence-search';
import {ClassType} from 'class-transformer/ClassTransformer';
import {ProductModel} from './product.model';

@Injectable()
export class ProductStore extends CrudStore<ProductModel>{
  protected readonly logger = new Logger(ProductStore.name);
  protected readonly helper = new SearchHelper<ProductModel>();
  protected readonly model: ClassType<ProductModel> = ProductModel;

  constructor(
    @InjectRepository(ProductModel)
    protected readonly repository: Repository<ProductModel>,
  ) {
    super();
  }
}
