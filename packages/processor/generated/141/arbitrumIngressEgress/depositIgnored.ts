import { z } from 'zod';
import {
  cfPrimitivesChainsAssetsArbAsset,
  hexString,
  numberOrHex,
  palletCfArbitrumIngressEgressDepositIgnoredReason,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const arbitrumIngressEgressDepositIgnored = z.object({
  depositAddress: hexString,
  asset: cfPrimitivesChainsAssetsArbAsset,
  amount: numberOrHex,
  reason: palletCfArbitrumIngressEgressDepositIgnoredReason,
});

export const arbitrumIngressEgressDepositIgnoredEvent = defineEvent(
  'ArbitrumIngressEgress.DepositIgnored',
  arbitrumIngressEgressDepositIgnored,
);
