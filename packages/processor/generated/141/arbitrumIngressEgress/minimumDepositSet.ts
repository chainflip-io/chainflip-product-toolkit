import { z } from 'zod';
import { cfPrimitivesChainsAssetsArbAsset, numberOrHex } from '../common';

export const arbitrumIngressEgressMinimumDepositSet = z.object({
  asset: cfPrimitivesChainsAssetsArbAsset,
  minimumDeposit: numberOrHex,
});
