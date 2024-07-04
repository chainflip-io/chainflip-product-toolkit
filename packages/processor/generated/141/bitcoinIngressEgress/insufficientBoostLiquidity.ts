import { z } from 'zod';
import { cfPrimitivesChainsAssetsBtcAsset, numberOrHex } from '../common';

export const bitcoinIngressEgressInsufficientBoostLiquidity = z.object({
  prewitnessedDepositId: numberOrHex,
  asset: cfPrimitivesChainsAssetsBtcAsset,
  amountAttempted: numberOrHex,
  channelId: numberOrHex,
});
