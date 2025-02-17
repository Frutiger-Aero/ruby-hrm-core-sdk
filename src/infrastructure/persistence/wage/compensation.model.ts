import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsEnum, IsNumber, IsString, IsUUID } from 'class-validator';
import { TBaseModelArgs, TModelID } from '@qlean/nestjs-typeorm-persistence-search';
import { AMOUNT_TYPE, ICompensation } from '../../../domain';
import { GradeModel } from './grade.model';

@Entity({
  name: 'compensations',
})
export class CompensationModel implements ICompensation {
  constructor(args?: TBaseModelArgs<ICompensation>) {
    for (const prop of Object.keys(args || {})) {
      this[prop] = args[prop];
    }
  }

  /**
   * Идентификатор записи из БД
   */
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: TModelID;

  @IsNumber()
  @Column({ type: 'integer' })
  readonly amount: number;

  @IsEnum(AMOUNT_TYPE)
  @Column({ type: 'character varying', default: AMOUNT_TYPE.FIXED })
  readonly type: AMOUNT_TYPE;

  @IsString()
  @Column({ length: 256, name: 'option_slug' })
  readonly optionSlug: string;

  @ManyToOne(type => GradeModel, e => e.compensations, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'grade_id' })
  @Index('idx-compensations-grade_id')
  readonly grade: GradeModel;
}
