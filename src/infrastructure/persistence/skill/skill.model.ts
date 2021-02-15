import { Column, Entity } from 'typeorm';
import { BaseModel } from '@qlean/nestjs-typeorm-persistence-search';
import { IsString } from 'class-validator';
import { ISkill } from '../../../domain/skill.interface';

@Entity({
  name: 'skills',
})
export class SkillModel extends BaseModel<ISkill> implements ISkill {
  @IsString()
  @Column({ length: 128 })
  readonly title: string;

  @IsString()
  @Column({ unique: true, length: 128 })
  readonly name: string;

  @Column('varchar', { array: true, name: 'options_slugs' })
  readonly optionsSlugs: string[];
}
