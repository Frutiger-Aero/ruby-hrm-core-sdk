import { IsString, IsOptional, IsUUID, Length } from 'class-validator';
import { hrm } from '../../../../proto/generated/app.proto';
import { ISkill } from '../../../domain';

export class SkillUpdateDto implements Partial<ISkill>, hrm.core.ISkillUpdateRequest {
  @IsUUID()
  readonly id: string;

  @IsOptional()
  @IsString()
  @Length(0, 128)
  readonly title: string;

  @IsOptional()
  @IsString()
  @Length(0, 128)
  readonly name: string;

  @IsOptional()
  @IsString({each: true})
  readonly optionsSlugs: string[];
}
