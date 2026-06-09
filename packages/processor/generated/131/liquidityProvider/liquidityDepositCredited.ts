import { z } from 'zod';
import { accountId, cfPrimitivesChainsAssetsAnyAsset, numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const liquidityProviderLiquidityDepositCredited = z.object({
  accountId,
  asset: cfPrimitivesChainsAssetsAnyAsset,
  amountCredited: numberOrHex,
});

export const liquidityProviderLiquidityDepositCreditedEvent = defineEvent(
  'LiquidityProvider.LiquidityDepositCredited',
  liquidityProviderLiquidityDepositCredited,
);
