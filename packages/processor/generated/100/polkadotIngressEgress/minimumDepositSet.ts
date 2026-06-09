import { z } from 'zod';
import { cfPrimitivesChainsAssetsDotAsset, numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const polkadotIngressEgressMinimumDepositSet = z.object({
  asset: cfPrimitivesChainsAssetsDotAsset,
  minimumDeposit: numberOrHex,
});

export const polkadotIngressEgressMinimumDepositSetEvent = defineEvent(
  'PolkadotIngressEgress.MinimumDepositSet',
  polkadotIngressEgressMinimumDepositSet,
);
