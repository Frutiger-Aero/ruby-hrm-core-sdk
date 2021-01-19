export interface IBlockContract {
  readonly id: string;
  readonly reason: {
    id: string;
  },
  readonly startBlockDate: string;
  readonly endBlockDate: string;
  readonly userId: string;
}