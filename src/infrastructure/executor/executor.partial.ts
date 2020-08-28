import {IPassport, ITimeRange} from '../../core/interfaces';
import {IsDateString, IsString} from 'class-validator';

export class TimeRange implements ITimeRange {
  @IsDateString()
  start?: Date;

  @IsDateString()
  end?: Date;
}

export class Passport implements IPassport {
  @IsString()
  serial: string;

  @IsString()
  number: string;

  @IsDateString()
  dateStart: string;

  @IsString()
  issuePlace: string;

  @IsString()
  birthPlace: string;

  @IsString()
  registrationAddress: string;

  @IsString()
  lastFullName: string;
}
