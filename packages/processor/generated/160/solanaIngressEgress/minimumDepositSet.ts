import { z } from 'zod';
import { cfPrimitivesChainsAssetsSolAsset, numberOrHex } from '../common';

export const solanaIngressEgressMinimumDepositSet = z.object({
  asset: cfPrimitivesChainsAssetsSolAsset,
  minimumDeposit: numberOrHex,
});
