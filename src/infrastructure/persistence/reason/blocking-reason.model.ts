import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TModelID } from '@qlean/nestjs-typeorm-persistence-search';
import { IsUUID, IsString, IsBoolean } from 'class-validator';
import { IBlockingReason } from '../../../domain';

@Entity({
  name: 'blocking-reasons',
})
export class BlockingReasonModel implements IBlockingReason {
  /**
   * Идентификатор записи из БД
   */
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  readonly id: TModelID;

  @IsString()
  @Column({ length: 128, unique: true })
  readonly name: string;

  @IsBoolean()
  @Column({ name: 'is_recoverable' })
  readonly isRecoverable: boolean;
}
