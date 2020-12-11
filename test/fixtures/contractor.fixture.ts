import { IContractorCreateRequest } from "../../sdk/nestjs/build";
import { positionFixtureForBase2, productFixtureForBase1 } from "./base.fixture";

export const contractorFixture1: IContractorCreateRequest = {
  contracts: [
    {
      status: 'ACTIVE',
      // wage: {
      //   id: '75be18bc-1c74-4bb6-9923-7c06e915826e',
      // },
      product: {
        id: productFixtureForBase1.id
      },
      grade: {
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
          },
        }
    }
  ],
  rating: 4.4,
  regionId: '640c2b9c-f4c8-43b6-a34f-f4df60cba5e2',
  status: 'CANDIDATE',
  userId: '703182cf-b9cd-4676-b834-5d3b5d52a2e4',
  workStatus: 'ACTIVE'
}