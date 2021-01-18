import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { BaseModel, TModelID } from '@qlean/nestjs-typeorm-persistence-search';
import { IsUUID, IsString } from 'class-validator';
import { BLOCKING_TYPE, IBlockingReason} from '../../../domain';
import { BlockingReasonGroupModel } from '../reason-group/blocking-reason-group.model';

@Entity({
  name: 'blocking-reasons',
})
export class BlockingReasonModel extends BaseModel<IBlockingReason> implements IBlockingReason {
  @IsString()
  @Column({ length: 128, unique: true })
  readonly name: string;

  @Column({ type: 'character varying' })
  readonly type: BLOCKING_TYPE;

  @Column({ name: 'is_permanent' })
  readonly isPermanent: boolean;

  @Column({ name: 'is_available_for_contractor' })
  readonly isAvailableForContractor: boolean;

  @Column({ name: 'is_instant' })
  readonly isInstant: boolean;

  @Column({ name: 'is_need_retraining' })
  readonly isNeedRetraining: boolean;

  @Column({ name: 'is_common_block' })
  readonly isCommonBlock?: boolean;

  @ManyToOne(() => BlockingReasonGroupModel)
  @JoinColumn({ name: 'group_id' })
  readonly group: BlockingReasonGroupModel;
}
