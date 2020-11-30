import { IsString, IsOptional, IsUUID, Length } from 'class-validator';
import { hrm } from '../../../../proto/generated/app.proto';
import { IProduct } from '../../../domain';

export class ProductUpdateDto implements Partial<IProduct>, hrm.core.IProductUpdateRequest {
  @IsUUID()
  readonly id: string;

  @IsOptional()
  @IsString()
  @Length(0, 128)
  readonly title: string;

  @IsOptional()
  @IsString()
  @Length(0, 128)
  readonly name: string;
}
