import { z } from 'zod';
import {
  cfPrimitivesChainsAssetsDotAsset,
  hexString,
  numberOrHex,
  palletCfPolkadotIngressEgressDepositIgnoredReason,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const polkadotIngressEgressDepositIgnored = z.object({
  depositAddress: hexString,
  asset: cfPrimitivesChainsAssetsDotAsset,
  amount: numberOrHex,
  reason: palletCfPolkadotIngressEgressDepositIgnoredReason,
});

export const polkadotIngressEgressDepositIgnoredEvent = defineEvent(
  'PolkadotIngressEgress.DepositIgnored',
  polkadotIngressEgressDepositIgnored,
);
