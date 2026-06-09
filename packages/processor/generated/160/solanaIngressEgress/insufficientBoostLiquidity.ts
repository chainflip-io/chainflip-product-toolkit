import { z } from 'zod';
import { cfPrimitivesChainsAssetsSolAsset, numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const solanaIngressEgressInsufficientBoostLiquidity = z.object({
  prewitnessedDepositId: numberOrHex,
  asset: cfPrimitivesChainsAssetsSolAsset,
  amountAttempted: numberOrHex,
  channelId: numberOrHex,
});

export const solanaIngressEgressInsufficientBoostLiquidityEvent = defineEvent(
  'SolanaIngressEgress.InsufficientBoostLiquidity',
  solanaIngressEgressInsufficientBoostLiquidity,
);
