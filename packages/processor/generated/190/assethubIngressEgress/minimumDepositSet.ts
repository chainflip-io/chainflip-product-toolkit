import { z } from 'zod';
import { cfPrimitivesChainsAssetsHubAsset, numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const assethubIngressEgressMinimumDepositSet = z.object({
  asset: cfPrimitivesChainsAssetsHubAsset,
  minimumDeposit: numberOrHex,
});

export const assethubIngressEgressMinimumDepositSetEvent = defineEvent(
  'AssethubIngressEgress.MinimumDepositSet',
  assethubIngressEgressMinimumDepositSet,
);
