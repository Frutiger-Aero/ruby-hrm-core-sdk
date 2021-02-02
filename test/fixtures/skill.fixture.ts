import { ISkillCreateRequest } from '../../sdk/nestjs';

export const skillFixture1: ISkillCreateRequest = {
  title: 'скилл окна',
  name: 'windowsSkill',
  option: ['windows', 'clean flor']
}

export const skillFixture2: ISkillCreateRequest = {
  title: 'скилл балконы',
  name: 'balconiesSkill',
  option: ['balconies', 'clean']
}