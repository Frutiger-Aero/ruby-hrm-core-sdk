export interface IFreezeContractor {
  readonly id: string;
  readonly reason: {
    id: string;
  }
  readonly userId: string;
}