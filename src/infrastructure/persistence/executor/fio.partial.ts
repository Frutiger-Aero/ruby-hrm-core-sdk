import { Column } from 'typeorm';
import { GenderEnum, IDadataFIO, IFio } from '../../../domain';

export class FioPartial implements IFio {

  @Column({ type: 'character varying', name: '_full_name', nullable: false })
  readonly fullName: string;

  @Column({ type: 'character varying', name: '_last_name', nullable: true })
  readonly lastName?: string;

  @Column({ type: 'character varying', name: '_middle_name', nullable: true })
  readonly middleName?: string;

  @Column({ type: 'character varying', name: '_first_name', nullable: true })
  readonly firstName?: string;

  @Column({ type: 'boolean', name: '_is_valid', nullable: true })
  readonly isValid?: boolean;

  @Column({ type: 'int', name: '_gender', nullable: true })
  readonly gender?: GenderEnum;

  /**
   * Структура с детализацией из Dadata, храним как jsonb
   */
  @Column({ name: '_object', type: 'jsonb', nullable: true })
  readonly object?: IDadataFIO;
}
