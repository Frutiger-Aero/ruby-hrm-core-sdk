import { IsString, Length } from 'class-validator';
import { hrm } from '../../../../proto/generated/app.proto';
import { IProduct } from '../../../domain';

export class ProductCreateDto implements Partial<IProduct>, hrm.core.IProductCreateRequest {
  @IsString()
  @Length(0, 128)
  readonly title: string;

  @IsString()
  @Length(0, 128)
  readonly name: string;

}
