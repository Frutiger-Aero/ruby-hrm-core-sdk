import { ISkillCreateRequest } from '../../sdk/nestjs';

export const skillFixture1: ISkillCreateRequest = {
  title: 'скилл уборка1',
  name: 'cleanSkill1',
  optionsSlugs: ['rooms', 'bathrooms']
}

export const skillFixture2: ISkillCreateRequest = {
  title: 'скилл уборка2',
  name: 'cleanSkill2',
  optionsSlugs: ['bathrooms', 'floor_cleaning', 'clean_furniture']
}