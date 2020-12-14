import { IContractCreateRequest } from "../../sdk/nestjs/build";
import { contractorForBase1, contractorForBase2, gradeFixtureForBase1, productFixtureForBase1, specializationFixtureForBase1, wageFixtureForBase1, gradeFixtureForBase2 } from "./base.fixture";

export const contractFixture1: IContractCreateRequest = {
  status: 'ACTIVE',
  contractorId: contractorForBase1.id,
  gradeId: gradeFixtureForBase1.id,
  specializationId: specializationFixtureForBase1.id,
  wageId: wageFixtureForBase1.id,
  productId: productFixtureForBase1.id
}

export const contractFixture2: IContractCreateRequest = {
  status: 'ACTIVE',
  contractorId: contractorForBase2.id,
  gradeId: gradeFixtureForBase2.id,
  specializationId: specializationFixtureForBase1.id,
  wageId: wageFixtureForBase1.id,
  productId: productFixtureForBase1.id
}