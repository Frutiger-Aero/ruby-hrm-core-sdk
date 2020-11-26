import { Column } from 'typeorm';
import { IAddress, IAddressDetail, IAddressObject, IMetro, IPoint } from '../../../core/interfaces';
import { IsString } from 'class-validator';

export class AddressPartial implements IAddress {

  @IsString()
  @Column({ type: 'character varying', name: '_value', nullable: true })
  readonly value: string;

  @IsString()
  @Column({ type: 'character varying', name: '_unrestricted_value', nullable: true })
  readonly unrestrictedValue: string;

  /**
   * Структура с детализацией из Dadata, храним как jsonb
   */
  @Column({ name: '_object', type: 'jsonb', nullable: true })
  readonly object?: IAddressObject;

  /**
   * Структура с адресом из Dadata, храним как jsonb
   */
  @Column({
    name: '_detail',
    type: 'jsonb',
    nullable: true,
  })
  readonly detail?: IAddressDetail;

  /**
   * Координаты - долгота и широта
   */
  @Column({
    name: '_coordinate',
    type: 'point',
    nullable: true,
    transformer: {
      from: v => (v ? { lat: v.x, lng: v.y } : null),
      to: v => (v ? `${v.lat},${v.lng}` : null),
    },
  })
  readonly coordinate?: IPoint;

  /**
   * Массив станций метро храним как обычную строку
   */
  @Column({
    name: '_metro',
    type: 'simple-json',
    nullable: true,
  })
  readonly metro?: IMetro[];
}
