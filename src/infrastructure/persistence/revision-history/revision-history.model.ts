import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IRevisionHistory } from '../../../domain';
import { IsDate, IsString, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';

@Entity({
  name: 'revision-history',
})
export class RevisionHistoryModel implements IRevisionHistory {
    /**
   * Идентификатор
   */
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;
  /**
   * user который внес изменения
   */
  @IsUUID('4')
  @Column({ type: 'uuid', name: 'user_id' })
  readonly userId: string;

  /**
   * идентификатор сущности в которую внесли изменение
   */
  @IsUUID('4')
  @Column({ type: 'uuid', name: 'entity_id' })
  readonly entityId: string;

  /**
   * Новое значение на которое изменили
   */
  @IsString()
  @Column()
  readonly change: string;

  @IsUUID('4')
  @Column({ type: 'uuid', name: 'reason_id', nullable: true })
  readonly reasonId: string;
  /**
   * Дата изменения
   */
  @IsDate()
  @Transform((value: Date) => value.toISOString(), { toPlainOnly: true })
  @UpdateDateColumn({ type: 'timestamp with time zone',  name: 'updated_at' })
  readonly updatedAt: Date;
}
