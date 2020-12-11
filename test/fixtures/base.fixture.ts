import { IWage } from "../../sdk/nestjs/build"
import { AMOUNT_TYPE, IContract, IGrade, RATE_UNIT } from "../../src/domain"
import { WageModel } from "../../src/infrastructure/persistence/wage/wage.model"
import { wageFixture1 } from "./wage.fixture"

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

export const gradeFixtureForBase1: Partial<IGrade> = {
  id: 'dd8cac77-78f2-4e57-99be-9f06e5ac3acc',
  position: {
    id: productFixtureForBase1.id
  },
  rate: {
    amount: 33,
    type: AMOUNT_TYPE.FIXED,
    unit: RATE_UNIT.DAY
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

export const wageFixtureForBase1: Partial<IWage> = {
  id: 'ff9bd9a0-b991-47ad-881b-8f3c2055b1c7',
  name: 'Тариф для уборки',
  regionId: '948050cf-9273-48d6-a111-178d029caefd',
  specialization: {
    id: specializationFixtureForBase1.id
  },
  product: {
    id: productFixtureForBase1.id
  }
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