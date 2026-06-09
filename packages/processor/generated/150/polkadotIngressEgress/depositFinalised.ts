import { z } from 'zod';
import {
  cfPrimitivesChainsAssetsDotAsset,
  hexString,
  numberOrHex,
  palletCfPolkadotIngressEgressDepositAction,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const polkadotIngressEgressDepositFinalised = z.object({
  depositAddress: hexString,
  asset: cfPrimitivesChainsAssetsDotAsset,
  amount: numberOrHex,
  blockHeight: z.number(),
  depositDetails: z.number(),
  ingressFee: numberOrHex,
  action: palletCfPolkadotIngressEgressDepositAction,
  channelId: numberOrHex,
});

export const polkadotIngressEgressDepositFinalisedEvent = defineEvent(
  'PolkadotIngressEgress.DepositFinalised',
  polkadotIngressEgressDepositFinalised,
);
