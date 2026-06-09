import { z } from 'zod';
import { cfPrimitivesChainsAssetsAnyAsset, numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const swappingMaximumSwapAmountSet = z.object({
  asset: cfPrimitivesChainsAssetsAnyAsset,
  amount: numberOrHex.nullish(),
});

export const swappingMaximumSwapAmountSetEvent = defineEvent(
  'Swapping.MaximumSwapAmountSet',
  swappingMaximumSwapAmountSet,
);
