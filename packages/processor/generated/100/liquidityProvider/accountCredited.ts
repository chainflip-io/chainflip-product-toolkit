import { z } from 'zod';
import { accountId, cfPrimitivesChainsAssetsAnyAsset, numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const liquidityProviderAccountCredited = z.object({
  accountId,
  asset: cfPrimitivesChainsAssetsAnyAsset,
  amountCredited: numberOrHex,
});

export const liquidityProviderAccountCreditedEvent = defineEvent(
  'LiquidityProvider.AccountCredited',
  liquidityProviderAccountCredited,
);
