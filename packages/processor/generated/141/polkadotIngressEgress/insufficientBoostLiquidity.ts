import { z } from 'zod';
import { cfPrimitivesChainsAssetsDotAsset, numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const polkadotIngressEgressInsufficientBoostLiquidity = z.object({
  prewitnessedDepositId: numberOrHex,
  asset: cfPrimitivesChainsAssetsDotAsset,
  amountAttempted: numberOrHex,
  channelId: numberOrHex,
});

export const polkadotIngressEgressInsufficientBoostLiquidityEvent = defineEvent(
  'PolkadotIngressEgress.InsufficientBoostLiquidity',
  polkadotIngressEgressInsufficientBoostLiquidity,
);
