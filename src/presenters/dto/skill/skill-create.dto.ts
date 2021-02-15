import { IsArray, IsString, Length } from 'class-validator';
import { hrm } from '../../../../proto/generated/app.proto';
import { ISkill } from '../../../domain';

export class SkillCreateDto implements Partial<ISkill>, hrm.core.ISkillCreateRequest {
  @IsString()
  @Length(0, 128)
  readonly title: string;

  @IsString()
  @Length(0, 128)
  readonly name: string;

  @IsString({each: true})
  readonly optionsSlugs: string[];
}
