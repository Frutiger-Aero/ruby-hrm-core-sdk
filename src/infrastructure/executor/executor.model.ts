import {Entity, Column, ManyToMany} from 'typeorm';
import { BaseModel } from '@qlean/nestjs-typeorm-persistence-search';
import { Type } from 'class-transformer';
import {
  IsNumber,
  IsEnum,
  ValidateNested,
  IsString,
  IsObject,
  IsArray,
  IsUUID, IsDateString,
} from 'class-validator';
import {Passport} from './executor.partial';
import {IExecutor, Status} from "../../core/interfaces";

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
export class ExecutorModel extends BaseModel<IExecutor>
  implements IExecutor {

  // TODO: добавить в ТР
  // TODO: проверить в букинге верную подстановку ссоИД
  @IsUUID('4')
  @Column({ nullable: false, name: 'sso_id' })
  ssoId: string;

  @IsString()
  @Column({ nullable: false })
  address: string;

  @IsString()
  @Column()
  photo: string;

  @IsDateString()
  @Column({name: 'accepted_use_terms'})
  acceptedUseTerms: string;

  @IsString()
  @Column()
  citizenship: string;

  @IsObject()
  @ValidateNested()
  @Type(() => Passport)
  @Column('simple-json')
  passport: Passport;


  @IsEnum(Status)
  @Column()
  status: string;

  @IsString()
  @Column({name: 'status_reason'})
  statusReason: string;

  @IsDateString()
  @Column({name: 'status_date'})
  statusDate: string;

  @IsArray()
  @Column()
  specialization: string[];

  @IsUUID('4')
  @Column({name: 'tariff_id'})
  tariff: string;

  @IsNumber()
  @Column('double precision', { default: 0 })
  rating: number;
}
