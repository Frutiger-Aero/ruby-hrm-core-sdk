import { IProductCreateRequest } from '../../sdk/nestjs';

export const productFixture1: IProductCreateRequest = {
  title: 'Уборка в квартире',
  name: 'flat-cleansing'
}


export const productFixture2: IProductCreateRequest = {
  title: 'Уборка в гараже',
  name: 'garage-cleansing'
}