import { Column, Entity, OneToMany } from 'typeorm';
import { BaseModel } from '@qlean/nestjs-typeorm-persistence-search';
import { IPosition } from '../../../domain';
import { IsString } from 'class-validator';
import { GradeModel } from '../wage/grade.model';

@Entity({
  name: 'positions',
})
export class PositionModel extends BaseModel<IPosition> implements IPosition {
  @IsString()
  @Column({ length: 128 })
  readonly title: string;

  @IsString()
  @Column({ length: 128, unique: true })
  readonly name: string;

  @OneToMany(type => GradeModel, e => e.position)
  readonly grades: GradeModel[];
}
