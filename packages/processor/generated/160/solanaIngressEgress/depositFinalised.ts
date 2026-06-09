import { z } from 'zod';
import {
  cfPrimitivesChainsAssetsSolAsset,
  hexString,
  numberOrHex,
  palletCfSolanaIngressEgressDepositAction,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const solanaIngressEgressDepositFinalised = z.object({
  depositAddress: hexString,
  asset: cfPrimitivesChainsAssetsSolAsset,
  amount: numberOrHex,
  blockHeight: numberOrHex,
  ingressFee: numberOrHex,
  action: palletCfSolanaIngressEgressDepositAction,
  channelId: numberOrHex,
});

export const solanaIngressEgressDepositFinalisedEvent = defineEvent(
  'SolanaIngressEgress.DepositFinalised',
  solanaIngressEgressDepositFinalised,
);
