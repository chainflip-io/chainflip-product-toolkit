import { z } from 'zod';
import { cfPrimitivesChainsAssetsAnyAsset, numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const swappingMinimumChunkSizeSet = z.object({
  asset: cfPrimitivesChainsAssetsAnyAsset,
  amount: numberOrHex,
});

export const swappingMinimumChunkSizeSetEvent = defineEvent(
  'Swapping.MinimumChunkSizeSet',
  swappingMinimumChunkSizeSet,
);
