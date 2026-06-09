import { z } from 'zod';
import {
  cfChainsEvmDepositDetails,
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
  blockHeight: numberOrHex,
  depositDetails: cfChainsEvmDepositDetails,
  ingressFee: numberOrHex,
  action: palletCfArbitrumIngressEgressDepositAction,
  channelId: numberOrHex,
});

export const arbitrumIngressEgressDepositFinalisedEvent = defineEvent(
  'ArbitrumIngressEgress.DepositFinalised',
  arbitrumIngressEgressDepositFinalised,
);
