import { z } from 'zod';
import { cfPrimitivesChainsAssetsDotAsset, hexString, numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const polkadotIngressEgressDepositIgnored = z.object({
  depositAddress: hexString,
  asset: cfPrimitivesChainsAssetsDotAsset,
  amount: numberOrHex,
});

export const polkadotIngressEgressDepositIgnoredEvent = defineEvent(
  'PolkadotIngressEgress.DepositIgnored',
  polkadotIngressEgressDepositIgnored,
);
