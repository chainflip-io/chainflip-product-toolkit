import { z } from 'zod';
import {
  cfPrimitivesChainsAssetsSolAsset,
  hexString,
  numberOrHex,
  palletCfSolanaIngressEgressDepositAction,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const solanaIngressEgressDepositBoosted = z.object({
  depositAddress: hexString,
  asset: cfPrimitivesChainsAssetsSolAsset,
  amounts: z.array(z.tuple([z.number(), numberOrHex])),
  prewitnessedDepositId: numberOrHex,
  channelId: numberOrHex,
  blockHeight: numberOrHex,
  ingressFee: numberOrHex,
  boostFee: numberOrHex,
  action: palletCfSolanaIngressEgressDepositAction,
});

export const solanaIngressEgressDepositBoostedEvent = defineEvent(
  'SolanaIngressEgress.DepositBoosted',
  solanaIngressEgressDepositBoosted,
);
