import { ISkillCreateRequest } from '../../sdk/nestjs';

export const skillFixture1: ISkillCreateRequest = {
  title: 'скилл окна',
  name: 'windowsSkill',
  optionsSlugs: ['windows', 'clean flor']
}

export const skillFixture2: ISkillCreateRequest = {
  title: 'скилл балконы',
  name: 'balconiesSkill',
  optionsSlugs: ['balconies', 'clean']
}