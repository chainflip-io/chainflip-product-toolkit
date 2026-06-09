import { z } from 'zod';
import {
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
  prewitnessedDepositId: numberOrHex,
  channelId: numberOrHex,
  ingressFee: numberOrHex,
  boostFee: numberOrHex,
  action: palletCfArbitrumIngressEgressDepositAction,
});

export const arbitrumIngressEgressDepositBoostedEvent = defineEvent(
  'ArbitrumIngressEgress.DepositBoosted',
  arbitrumIngressEgressDepositBoosted,
);
