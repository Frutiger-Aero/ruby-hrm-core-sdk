import { Entity, Column } from 'typeorm';
import { BaseModel } from '@qlean/nestjs-typeorm-persistence-search';
import { Type } from 'class-transformer';
import {
  IsNumber,
  IsBoolean,
  IsEnum,
  ValidateNested,
  IsString,
  IsObject,
  IsArray,
  IsUUID,
} from 'class-validator';
import { IBookablePerson, WorkingDays, DebtLevel } from '../../core/interfaces';
import { TimeRange } from './executor.partial';

export const weekDaysTransformer = {
  to: (days: number[]): string => `{${days.join(',')}}`,
  from: (weekDaysString: string): number[] =>
    weekDaysString
      .replace(/\{|\}/g, '')
      .split(',')
      .map(item => +item),
};

@Entity({
  name: 'bookable_person',
})
export class ExecutorModel extends BaseModel<IBookablePerson>
  implements IBookablePerson {
  @IsUUID('4')
  @Column({ nullable: false, name: 'sso_id' })
  ssoId: string;

  @IsString()
  @Column({ nullable: false })
  name: string;

  @IsNumber()
  @Column({ name: 'region_id', nullable: false })
  regionId: number;

  @IsArray()
  @Column({ type: 'text', array: true, name: 'working_days' })
  workingDays?: WorkingDays;

  @IsObject()
  @ValidateNested()
  @Type(() => TimeRange)
  @Column('simple-json', { name: 'time_range', nullable: false })
  timeRange: TimeRange;

  @IsBoolean()
  @Column({ default: false, name: 'is_active' })
  isActive: boolean;

  @IsNumber()
  @Column('integer', { default: 0, name: 'max_blocked_intervals_per_day' })
  maxBlockedIntervalsPerDay: number;

  @IsEnum(DebtLevel)
  @Column('smallint', { default: DebtLevel.FREE, name: 'debt_level' })
  debtLevel: DebtLevel;

  @IsNumber()
  @Column('double precision', { default: 0 })
  rating: number;

  @IsNumber()
  @Column({ default: 0, name: 'completed_orders_count' })
  completedOrdersCount: number;
}
