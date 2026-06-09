import { z } from 'zod';
import { accountId, cfPrimitivesChainsAssetsAnyAsset, numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const liquidityProviderAccountDebited = z.object({
  accountId,
  asset: cfPrimitivesChainsAssetsAnyAsset,
  amountDebited: numberOrHex,
});

export const liquidityProviderAccountDebitedEvent = defineEvent(
  'LiquidityProvider.AccountDebited',
  liquidityProviderAccountDebited,
);
