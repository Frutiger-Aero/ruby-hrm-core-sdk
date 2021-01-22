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
  @Column({ length: 128, unique: true })
  readonly name: string;

  @Column({ length: 128 })
  readonly option: string;
}
