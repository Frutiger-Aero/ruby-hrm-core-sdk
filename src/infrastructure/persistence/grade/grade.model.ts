import { Column, Entity, OneToMany } from 'typeorm';
import { BaseModel } from '@qlean/nestjs-typeorm-persistence-search';
import { IGrade } from '../../../core/interfaces';
import { IsString } from 'class-validator';
import { GridModel } from '../grid/grid.model';

@Entity({
  name: 'grades',
})
export class GradeModel extends BaseModel<IGrade> {
  @IsString()
  @Column({ length: 128 })
  readonly title: string;

  @IsString()
  @Column({ length: 128, unique: true })
  readonly name: string;

  @OneToMany(type => GridModel, e => e.grade)
  readonly grids: GridModel[];
}
