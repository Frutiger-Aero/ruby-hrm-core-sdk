import { AMOUNT_TYPE, BLOCKING_TYPE, CONTRACT_STATUS, IBlockingReason, IContract, IGrade, ISkill, PERSON_STATUS, RATE_UNIT, WAGE_TYPE, WORK_STATUS } from "../../src/domain"

export const skill1: Partial<ISkill> = {
  id: 'd7191ca9-3b63-4f2c-92cb-0721bc5046d8',
  optionsSlugs: ['clean_furniture'],
  name: 'windows_skill',
  title: 'скилл окна'
}

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
  productSlug: 'cleaning_flat_standard',
  type: WAGE_TYPE.INDIVIDUAL
}

export const wageFixtureForBase2 = {
  id: '4c331df6-df0d-4fc6-b1b7-d08cf7f12f49',
  name: 'Тариф окна',
  regionId: '948050cf-9273-48d6-a111-178d029caefd',
  specialization: {
    id: specializationFixtureForBase2.id
  },
  productSlug: 'cleaning_flat_windows', 
  type: WAGE_TYPE.INDIVIDUAL
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
      optionSlug: 'carpet_cleaning',
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
      optionSlug: 'clean_furniture',
      type: AMOUNT_TYPE.PERCENT
    }
  ]
}

export const blockingReasonForBase1: Partial<IBlockingReason> = {
  id: 'a6586b34-0bbe-41e8-a4d0-7c6d9469d07d',
  name: 'testing permanent blocking reason1',
  isRecoverable: true,
  isInstant: true,
  isCommonBlock: true,
  type: BLOCKING_TYPE.BLOCK,
  isNeedRetraining: false,
  isAvailableForContractor: true
}

export const blockingReasonForBase2: Partial<IBlockingReason> = {
  id: '9f660de3-abd7-434e-9366-1c1610054149',
  name: 'testing permanent and non common blocking reason2',
  isRecoverable: true,
  isInstant: true,
  isCommonBlock: false,
  type: BLOCKING_TYPE.BLOCK,
  isNeedRetraining: false,
  isAvailableForContractor: true
}

export const freezingReasonForBase1 = {
  id: '4c124635-e40c-43e8-9013-4d4f7e627670',
  name: 'testing freezing reason1',
  isRecoverable: false,
  isInstant: true,
  isCommonBlock: true,
  type: BLOCKING_TYPE.FREEZE,
  isNeedRetraining: false,
  isAvailableForContractor: true
}

export const freezingReasonForBase2 = {
  id: '1ccd89fd-06af-4916-b242-e70c7eaa8631',
  name: 'testing non permanent blocking reason2',
  isRecoverable: false,
  isInstant: true,
  isCommonBlock: true,
  type: BLOCKING_TYPE.BLOCK,
  isNeedRetraining: false,
  isAvailableForContractor: true


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

export const contractorForBase3 = {
  id: '89519d18-5c3d-4bf3-9968-9659032184a2',
  rating: 2.2,
  userId: '2bf1ee82-b642-4636-a764-aff07e717e2d',
  regionId: 'a25b9a1d-1a2d-4549-9344-4394297eafb8',
  status: PERSON_STATUS.CREATED,
  workStatus: WORK_STATUS.ACTIVE
}

export const contractForBase1: Partial<IContract> = {
  id: 'bf6557b8-7a92-4dd3-8d13-2f1e8e592e1e',
  grade: {
    id: gradeFixtureForBase1.id
  },
  productSlug: 'cleaning_flat_standard',
  specialization: {
    id: specializationFixtureForBase1.id
  },
  wage: {
    id: wageFixtureForBase1.id
  },
  contractor: {
    id: contractorForBase1.id
  }
}


export const contractForBase2: Partial<IContract> = {
  id: 'c46a2d64-3f50-414d-844c-de7719e5cc7d',
  grade: {
    id: gradeFixtureForBase1.id
  },
  productSlug: 'cleaning_flat_standard',
  specialization: {
    id: specializationFixtureForBase1.id
  },
  wage: {
    id: wageFixtureForBase1.id
  },
  contractor: {
    id: contractorForBase1.id
  }
}

export const contractForBase3: Partial<IContract> = {
  id: 'da31093c-41fa-4b71-bfd4-94645c686062',
  grade: {
    id: gradeFixtureForBase1.id
  },
  productSlug: 'cleaning_flat_standard',
  specialization: {
    id: specializationFixtureForBase1.id
  },
  wage: {
    id: wageFixtureForBase1.id
  },
  contractor: {
    id: contractorForBase2.id
  }
}


export const contractForBase4: Partial<IContract> = {
  id: '76d1adec-20dd-45e2-9d89-fb0c7b8f073d',
  grade: {
    id: gradeFixtureForBase1.id
  },
  productSlug: 'cleaning_flat_standard',
  specialization: {
    id: specializationFixtureForBase1.id
  },
  wage: {
    id: wageFixtureForBase1.id
  },
  contractor: {
    id: contractorForBase2.id
  }
}

export const frozenContractForBase: Partial<IContract> = {
  id: '46a9d924-b1c8-4027-8ee9-da18aeacff6a',
  status: CONTRACT_STATUS.FROZEN,
  grade: {
    id: gradeFixtureForBase1.id
  },
  productSlug: 'cleaning_flat_windows',
  specialization: {
    id: specializationFixtureForBase1.id
  },
  wage: {
    id: wageFixtureForBase1.id
  },
  contractor: {
    id: contractorForBase3.id
  }
}

export const contractForBase5: Partial<IContract> = {
  id: 'dea7e6ff-53fa-4f95-9221-b067595c7a04',
  grade: {
    id: gradeFixtureForBase1.id
  },
  productSlug: 'cleaning_flat_windows',
  specialization: {
    id: specializationFixtureForBase1.id
  },
  wage: {
    id: wageFixtureForBase1.id
  },
  contractor: {
    id: contractorForBase3.id
  }
}

export const reasonGroupForBase1 = {
  id: '04ec58e7-6d4b-4214-acd3-ca55774bfe91',
  name: 'reasonGroupForBase1',
}

export const reasonGroupForBase2 = {
  id: 'cb4b43dd-141f-4cf8-9ca7-2576505ea4ac',
  name: 'reasonGroupForBase2'
}