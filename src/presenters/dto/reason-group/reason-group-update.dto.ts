import { IsString, IsOptional, IsUUID, Length} from 'class-validator';
import { hrm } from '../../../../proto/generated/app.proto';
import { IBlockingReasonGroup } from '../../../domain';

export class BlockingReasonGroupUpdateDto implements Partial<IBlockingReasonGroup>, hrm.core.IBlockingReasonGroupUpdateRequest {
  @IsUUID()
  readonly id: string;

  @IsString()
  @Length(0, 128)
  @IsOptional()
  readonly name: string;
}
