import { IContractorCreateRequest } from "../../sdk/nestjs/build";

export const contractorFixture1: IContractorCreateRequest = {
  rating: 1.1,
  regionId: '640c2b9c-f4c8-43b6-a34f-f4df60cba5e2',
  status: 'CANDIDATE',
  userId: '703182cf-b9cd-4676-b834-5d3b5d52a2e4',
}

export const contractorFixture2: IContractorCreateRequest = {
  rating: 2.2,
  regionId: 'a25b9a1d-1a2d-4549-9344-4394297eafb8',
  status: 'EXECUTOR',
  workStatus: 'BLOCKED'
}

export const contractorFixture3: IContractorCreateRequest = {
  rating: 3.3,
  regionId: '7abd6901-cd57-4b4e-96b7-a3c9e5744021',
  status: 'CANDIDATE',
  userId: '00328664-67cf-4392-8a0c-66d9adeddb85',
  workStatus: 'ACTIVE'
}

export const contractorFixture4: IContractorCreateRequest = {
  rating: 4.4,
  regionId: '73e29d28-7c16-45c4-a164-27fbc4308cc3',
  status: 'CANDIDATE',
  userId: 'b1b6f3a4-e6a6-494c-b1a8-86fa7b66ab5d',
  workStatus: 'ACTIVE'
}

export const contractorFixture5: IContractorCreateRequest = {
  rating: 4.5,
  regionId: '676899a7-7f00-45c7-8231-5821a41be39c',
  status: 'CANDIDATE',
  userId: 'ad3dc0d5-61fb-4cff-a5c8-62cfd5a9648e',
  workStatus: 'ACTIVE'
}


