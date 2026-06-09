import { z } from 'zod';
import { cfPrimitivesChainsAssetsDotAsset, hexString, numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const polkadotIngressEgressDepositReceived = z.object({
  depositAddress: hexString,
  asset: cfPrimitivesChainsAssetsDotAsset,
  amount: numberOrHex,
});

export const polkadotIngressEgressDepositReceivedEvent = defineEvent(
  'PolkadotIngressEgress.DepositReceived',
  polkadotIngressEgressDepositReceived,
);
