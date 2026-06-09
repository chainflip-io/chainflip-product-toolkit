import { z } from 'zod';
import {
  cfChainsEvmDepositDetails,
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
  depositDetails: cfChainsEvmDepositDetails,
  reason: palletCfArbitrumIngressEgressDepositIgnoredReason,
});

export const arbitrumIngressEgressDepositIgnoredEvent = defineEvent(
  'ArbitrumIngressEgress.DepositIgnored',
  arbitrumIngressEgressDepositIgnored,
);
