import { z } from 'zod';
import {
  cfChainsDepositOriginType,
  cfPrimitivesChainsAssetsDotAsset,
  hexString,
  numberOrHex,
  palletCfPolkadotIngressEgressDepositAction,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const polkadotIngressEgressDepositBoosted = z.object({
  depositAddress: hexString.nullish(),
  asset: cfPrimitivesChainsAssetsDotAsset,
  amounts: z.array(z.tuple([z.number(), numberOrHex])),
  depositDetails: z.number(),
  prewitnessedDepositId: numberOrHex,
  channelId: numberOrHex.nullish(),
  blockHeight: z.number(),
  ingressFee: numberOrHex,
  maxBoostFeeBps: z.number(),
  boostFee: numberOrHex,
  action: palletCfPolkadotIngressEgressDepositAction,
  originType: cfChainsDepositOriginType,
});

export const polkadotIngressEgressDepositBoostedEvent = defineEvent(
  'PolkadotIngressEgress.DepositBoosted',
  polkadotIngressEgressDepositBoosted,
);
