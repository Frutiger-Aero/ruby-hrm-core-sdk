import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TModelID } from '@qlean/nestjs-typeorm-persistence-search';
import { IsUUID, IsString } from 'class-validator';
import { IFreezingReason} from '../../../domain';

@Entity({
  name: 'freezing-reasons',
})
export class FreezingReasonModel implements IFreezingReason {
  /**
   * Идентификатор записи из БД
   */
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  readonly id: TModelID;

  @IsString()
  @Column({ length: 128, unique: true })
  readonly name: string;
}
