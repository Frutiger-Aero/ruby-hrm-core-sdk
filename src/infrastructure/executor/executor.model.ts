import {Entity, Column, ManyToMany, JoinTable, OneToMany, ManyToOne, JoinColumn} from 'typeorm';
import { BaseModel } from '@qlean/nestjs-typeorm-persistence-search';
import { Type } from 'class-transformer';
import {
  IsNumber,
  IsEnum,
  ValidateNested,
  IsString,
  IsObject,
  IsArray,
  IsUUID,
  IsDateString,
} from 'class-validator';
import { Passport } from './executor.partial';
import { IExecutor, Status } from '../../core/interfaces';
import { SpecializationModel } from '../specialization/specialization.model';
import {TariffModel} from "../tariff/tariff.model";

export const weekDaysTransformer = {
  to: (days: number[]): string => `{${days.join(',')}}`,
  from: (weekDaysString: string): number[] =>
    weekDaysString
      .replace(/\{|\}/g, '')
      .split(',')
      .map(item => +item),
};

@Entity({
  name: 'executor',
})
export class ExecutorModel extends BaseModel<IExecutor> implements IExecutor {
  // TODO: добавить в ТР
  // TODO: проверить в букинге верную подстановку ссоИД
  @IsUUID('4')
  @Column({ nullable: false, name: 'sso_id', unique: true })
  ssoId: string;

  @IsString()
  @Column({ nullable: false })
  address: string;

  @IsString()
  @Column({nullable: true})
  photo: string;

  @IsDateString()
  @Column({ name: 'accepted_use_terms', nullable: true })
  acceptedUseTerms: string;

  @IsString()
  @Column({nullable: true})
  citizenship: string;

  @IsObject()
  @ValidateNested()
  @Type(() => Passport)
  @Column('simple-json', { nullable: false })
  passport: Passport;

  @IsEnum(Status)
  @Column('smallint', {nullable: false})
  status: Status;

  @IsString()
  @Column({ name: 'status_reason', nullable: true })
  statusReason: string;

  @IsDateString()
  @Column({ name: 'status_date', nullable: true })
  statusDate: string;

  @ManyToMany(_ => SpecializationModel)
  @JoinTable()
  specialization: SpecializationModel[];

  @ManyToOne(_ => TariffModel, tariff => tariff.name, {nullable: true})
  @JoinColumn({ name: 'tariff_id' })
  tariff: TariffModel;

  @IsNumber()
  @Column('double precision', { default: 0 })
  rating: number;
}
