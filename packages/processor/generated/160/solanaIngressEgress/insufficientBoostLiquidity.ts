import { z } from 'zod';
import { cfPrimitivesChainsAssetsSolAsset, numberOrHex } from '../common';

export const solanaIngressEgressInsufficientBoostLiquidity = z.object({
  prewitnessedDepositId: numberOrHex,
  asset: cfPrimitivesChainsAssetsSolAsset,
  amountAttempted: numberOrHex,
  channelId: numberOrHex,
});
