import { IWageCreateRequest, IWageUpdateRequest } from '../../sdk/nestjs';

export const specializationFixtureForBase1 = {
  title: 'Доярка',
  name: 'Doyarka',
  id: '24601ff4-36d9-45f3-8f81-0d3d79262e63'
}

export const specializationFixtureForBase2 = {
  title: 'Пастух',
  name: 'Pastuch',
  id: '206a9635-70bf-4bd8-a83e-de568225b589'
}

export const productFixtureForBase1 = {
  title: 'Уборка',
  name: 'Uborka',
  id: '608dd6da-9eed-4114-8ea9-f8ddb635f7e8'
}

export const productFixtureForBase2 = {
  title: 'Спил деревьев',
  name: 'spil_buchnul',
  id: 'a484c282-c752-42f9-8917-86ef1452d6a9'
}

export const positionFixtureForBase1 = {
  title: 'Уборщик',
  name: 'Cleaner',
  id: 'e27364a7-0393-4d9d-bcec-04740e276884'
}

export const positionFixtureForBase2 = {
  title: 'Разнорабочий',
  name: 'Worker',
  id: '9f8bd5ee-928c-4bf5-b45e-854c5ae321f0'
}

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
