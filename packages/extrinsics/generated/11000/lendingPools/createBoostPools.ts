import { type ChainflipAsset } from '../common';

export type LendingPoolsCreateBoostPools = [
  newPools: {
    asset: ChainflipAsset;
    tier: number;
  }[],
];
