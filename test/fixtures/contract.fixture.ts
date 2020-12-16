import { IContractCreateRequest } from "../../sdk/nestjs/build";
import { contractorForBase1, contractorForBase2, gradeFixtureForBase1, wageFixtureForBase1, gradeFixtureForBase2 } from "./base.fixture";

export const contractFixture1: IContractCreateRequest = {
  status: 'ACTIVE',
  contractor: {
    id: contractorForBase1.id
  },
  grade: {
    id: gradeFixtureForBase1.id
  },
  wage: { 
    id: wageFixtureForBase1.id
  }
}

export const contractFixture2: IContractCreateRequest = {
  status: 'ACTIVE',
  contractor: { 
    id: contractorForBase2.id
  },
  grade: { 
    id: gradeFixtureForBase2.id
  },
  wage: {
    id: wageFixtureForBase1.id
  },
}