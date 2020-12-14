import { AMOUNT_TYPE, IContract, IGrade, PERSON_STATUS, RATE_UNIT, WORK_STATUS } from "../../src/domain"

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

export const wageFixtureForBase1 = {
  id: 'ff9bd9a0-b991-47ad-881b-8f3c2055b1c7',
  name: 'Тариф уборка',
  regionId: '948050cf-9273-48d6-a111-178d029caefd',
  specialization: {
    id: specializationFixtureForBase1.id
  },
  product: {
    id: productFixtureForBase1.id
  }
}

export const wageFixtureForBase2 = {
  id: '4c331df6-df0d-4fc6-b1b7-d08cf7f12f49',
  name: 'Тариф доставка',
  regionId: '948050cf-9273-48d6-a111-178d029caefd',
  specialization: {
    id: specializationFixtureForBase2.id
  },
  product: {
    id: productFixtureForBase2.id
  }
}

export const gradeFixtureForBase1: Partial<IGrade> = {
  id: 'dd8cac77-78f2-4e57-99be-9f06e5ac3acc',
  position: {
    id: positionFixtureForBase1.id
  },
  rate: {
    amount: 33,
    type: AMOUNT_TYPE.PERCENT,
    unit: RATE_UNIT.DAY
  },
  wage: {
    id: wageFixtureForBase1.id
  },
  compensations: [
    {
      id: 'b27158db-d48b-4bb4-a0e4-c8ea0c9f7ce7',
      amount: 32,
      option: 'honor',
      type: AMOUNT_TYPE.FIXED
    }
  ]
}

export const gradeFixtureForBase2 : Partial<IGrade> =  {
  id: '395bf977-bd08-46af-8e3d-820a054639aa',
  position: {
    id: positionFixtureForBase2.id
  },
  rate: {
    amount: 11,
    type: AMOUNT_TYPE.FIXED,
    unit: RATE_UNIT.HOUR
  },
  wage: {
    id: wageFixtureForBase2.id
  },
  compensations: [
    {
      id: 'eb0a9510-91e1-482d-a3a0-fc7cf5ccd127',
      amount: 65,
      option: 'compensation_option',
      type: AMOUNT_TYPE.PERCENT
    }
  ]
}



export const contractForBase: Partial<IContract> = {
  id: 'bf6557b8-7a92-4dd3-8d13-2f1e8e592e1e',
  grade: {
    id: gradeFixtureForBase1.id
  },
  product: {
    id: productFixtureForBase1.id
  },
  specialization: {
    id: specializationFixtureForBase1.id
  },
  wage: {
    id: wageFixtureForBase1.id
  }
}

export const contractorForBase1 = {
  id: '9a5b7730-d367-4a64-97cb-cd7dc4098687',
  rating: 4.2,
  userId: '4785ad32-b731-4a2c-bd0c-0c943f39a10b',
  regionId: 'a25b9a1d-1a2d-4549-9344-4394297eafb8',
  status: PERSON_STATUS.CREATED,
  workStatus: WORK_STATUS.ACTIVE
}

export const contractorForBase2 = {
  id: '793fe32a-1ec6-4e9e-a0b1-64c9ec2970a4',
  rating: 2.2,
  userId: '5a1a2208-d6f5-4547-8542-b01770c82103',
  regionId: 'a25b9a1d-1a2d-4549-9344-4394297eafb8',
  status: PERSON_STATUS.CREATED,
  workStatus: WORK_STATUS.ACTIVE
}