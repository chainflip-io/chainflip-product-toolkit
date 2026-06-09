import { z } from 'zod';
import { cfPrimitivesChainsAssetsAnyAsset, numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const swappingMinimumSwapAmountSet = z.object({
  asset: cfPrimitivesChainsAssetsAnyAsset,
  amount: numberOrHex,
});

export const swappingMinimumSwapAmountSetEvent = defineEvent(
  'Swapping.MinimumSwapAmountSet',
  swappingMinimumSwapAmountSet,
);
