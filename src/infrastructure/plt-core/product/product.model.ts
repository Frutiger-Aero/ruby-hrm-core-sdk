import { Column, Entity, OneToMany } from 'typeorm';
import { BaseModel } from '@qlean/nestjs-typeorm-persistence-search';
import { IProduct } from '../../../domain';
import { IsString } from 'class-validator';

export class ProductModel implements IProduct {
  @IsString()
  readonly id: string;

  @IsString()
  readonly title: string;

  @IsString()
  readonly name: string;
}
