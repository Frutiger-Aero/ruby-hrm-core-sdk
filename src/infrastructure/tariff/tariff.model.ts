import { Column, Entity } from 'typeorm';
import { BaseModel } from '@qlean/nestjs-typeorm-persistence-search';
import { ITariff, WorkingDays } from '../../core/interfaces';
import {
  IsArray,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TimeRange } from '../executor/executor.partial';

@Entity({
  name: 'tariff',
})
export class TariffModel extends BaseModel<ITariff> {
  @IsString()
  @Column({ unique: true })
  name: string;

  @IsObject()
  @ValidateNested()
  @Type(() => TimeRange)
  @Column('simple-json', { name: 'time_range', nullable: false })
  timeRange: TimeRange;

  @IsArray()
  @Column({ type: 'text', array: true, name: 'working_days' })
  workingDays?: WorkingDays;

  @IsNumber()
  @Column({ name: 'max_order_count' })
  maxOrderCount: number;

}
