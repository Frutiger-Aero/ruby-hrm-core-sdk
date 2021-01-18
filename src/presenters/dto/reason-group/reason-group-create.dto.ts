import {  IsString, Length } from 'class-validator';
import { hrm } from '../../../../proto/generated/app.proto';
import { IBlockingReasonGroup } from '../../../domain';

export class BlockingReasonGroupCreateDto implements Partial<IBlockingReasonGroup>, hrm.core.IBlockingReasonGroupCreateRequest {
  @IsString()
  @Length(0, 128)
  readonly name: string;
}
