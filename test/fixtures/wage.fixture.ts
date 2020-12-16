import { IWageCreateRequest, IWageUpdateRequest } from '../../sdk/nestjs';
import { positionFixtureForBase1, positionFixtureForBase2, productFixtureForBase1, productFixtureForBase2, specializationFixtureForBase1, specializationFixtureForBase2 } from './base.fixture';

export const wageFixture2: IWageUpdateRequest = {
  grades: [
    {
      compensations: [
        {
          amount: 37,
          option: 'honor',
          type: 'PERCENT'
        }
      ],
      position: {
        id: positionFixtureForBase2.id
      },
      rate: {
        amount: 13,
        type: 'FIXED',
        unit: 'SERVICE'
      }
    }
  ],
  specialization: {
    id: specializationFixtureForBase2.id
  },
  product: {
    id: productFixtureForBase2.id
  }
}

export const wageFixture1: IWageCreateRequest = {
  grades: [
    {
      compensations: [
        {
          amount: 32,
          option: 'honor',
          type: 'FIXED'
        }
      ],
      position: {
        id: positionFixtureForBase1.id
      },
      rate: {
        amount: 33,
        type: 'FIXED',
        unit: 'MONTH'
      }
    }
  ],
  name: 'тариф1',
  product: {
    id: productFixtureForBase1.id
  },
  regionId: '24601ff4-36d9-45f3-8f81-0d3d79262e63',
  specialization: {
    id: specializationFixtureForBase1.id
  }
}
