import { z } from 'zod';
import {
  cfPrimitivesChainsAssetsDotAsset,
  hexString,
  numberOrHex,
  palletCfPolkadotIngressEgressDepositAction,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const polkadotIngressEgressDepositReceived = z.object({
  depositAddress: hexString,
  asset: cfPrimitivesChainsAssetsDotAsset,
  amount: numberOrHex,
  ingressFee: numberOrHex,
  action: palletCfPolkadotIngressEgressDepositAction,
});

export const polkadotIngressEgressDepositReceivedEvent = defineEvent(
  'PolkadotIngressEgress.DepositReceived',
  polkadotIngressEgressDepositReceived,
);
