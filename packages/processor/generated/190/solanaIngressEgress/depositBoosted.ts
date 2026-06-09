import { z } from 'zod';
import {
  cfChainsDepositOriginType,
  cfPrimitivesChainsAssetsSolAsset,
  hexString,
  numberOrHex,
  palletCfSolanaIngressEgressDepositAction,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const solanaIngressEgressDepositBoosted = z.object({
  depositAddress: hexString.nullish(),
  asset: cfPrimitivesChainsAssetsSolAsset,
  amounts: z.array(z.tuple([z.number(), numberOrHex])),
  prewitnessedDepositId: numberOrHex,
  channelId: numberOrHex.nullish(),
  blockHeight: numberOrHex,
  ingressFee: numberOrHex,
  maxBoostFeeBps: z.number(),
  boostFee: numberOrHex,
  action: palletCfSolanaIngressEgressDepositAction,
  originType: cfChainsDepositOriginType,
});

export const solanaIngressEgressDepositBoostedEvent = defineEvent(
  'SolanaIngressEgress.DepositBoosted',
  solanaIngressEgressDepositBoosted,
);
