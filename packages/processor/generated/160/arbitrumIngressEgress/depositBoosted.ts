import { z } from 'zod';
import {
  cfChainsEvmDepositDetails,
  cfPrimitivesChainsAssetsArbAsset,
  hexString,
  numberOrHex,
  palletCfArbitrumIngressEgressDepositAction,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const arbitrumIngressEgressDepositBoosted = z.object({
  depositAddress: hexString,
  asset: cfPrimitivesChainsAssetsArbAsset,
  amounts: z.array(z.tuple([z.number(), numberOrHex])),
  depositDetails: cfChainsEvmDepositDetails,
  prewitnessedDepositId: numberOrHex,
  channelId: numberOrHex,
  blockHeight: numberOrHex,
  ingressFee: numberOrHex,
  boostFee: numberOrHex,
  action: palletCfArbitrumIngressEgressDepositAction,
});

export const arbitrumIngressEgressDepositBoostedEvent = defineEvent(
  'ArbitrumIngressEgress.DepositBoosted',
  arbitrumIngressEgressDepositBoosted,
);
