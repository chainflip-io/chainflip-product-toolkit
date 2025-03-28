import { z } from 'zod';
import { cfPrimitivesChainsAssetsHubAsset, numberOrHex } from '../common';

export const assethubIngressEgressMinimumDepositSet = z.object({
  asset: cfPrimitivesChainsAssetsHubAsset,
  minimumDeposit: numberOrHex,
});
