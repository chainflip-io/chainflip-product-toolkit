import { z } from 'zod';
import {
  cfPrimitivesChainsAssetsArbAsset,
  hexString,
  numberOrHex,
  palletCfArbitrumIngressEgressDepositAction,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const arbitrumIngressEgressDepositFinalised = z.object({
  depositAddress: hexString,
  asset: cfPrimitivesChainsAssetsArbAsset,
  amount: numberOrHex,
  ingressFee: numberOrHex,
  action: palletCfArbitrumIngressEgressDepositAction,
  channelId: numberOrHex,
});

export const arbitrumIngressEgressDepositFinalisedEvent = defineEvent(
  'ArbitrumIngressEgress.DepositFinalised',
  arbitrumIngressEgressDepositFinalised,
);
