import { ITimeRange } from '../../core/interfaces';
import { IsDateString } from 'class-validator';

export class TimeRange implements ITimeRange {
  @IsDateString()
  start?: Date;

  @IsDateString()
  end?: Date;
}
