import { ISkillCreateRequest } from '../../sdk/nestjs';

export const skillFixture1: ISkillCreateRequest = {
  title: 'скилл окна',
  name: 'windowsSkill',
  option: 'windows'
}

export const skillFixture2: ISkillCreateRequest = {
  title: 'скилл балконы',
  name: 'balconiesSkill',
  option: 'balconies'
}