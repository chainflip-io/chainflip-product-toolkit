import { z } from 'zod';
import {
  cfPrimitivesChainsAssetsDotAsset,
  hexString,
  numberOrHex,
  palletCfPolkadotIngressEgressDepositAction,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const polkadotIngressEgressDepositBoosted = z.object({
  depositAddress: hexString,
  asset: cfPrimitivesChainsAssetsDotAsset,
  amounts: z.array(z.tuple([z.number(), numberOrHex])),
  depositDetails: z.number(),
  prewitnessedDepositId: numberOrHex,
  channelId: numberOrHex,
  blockHeight: z.number(),
  ingressFee: numberOrHex,
  boostFee: numberOrHex,
  action: palletCfPolkadotIngressEgressDepositAction,
});

export const polkadotIngressEgressDepositBoostedEvent = defineEvent(
  'PolkadotIngressEgress.DepositBoosted',
  polkadotIngressEgressDepositBoosted,
);
