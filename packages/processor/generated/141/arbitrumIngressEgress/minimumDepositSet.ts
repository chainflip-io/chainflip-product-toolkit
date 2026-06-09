import { z } from 'zod';
import { cfPrimitivesChainsAssetsArbAsset, numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const arbitrumIngressEgressMinimumDepositSet = z.object({
  asset: cfPrimitivesChainsAssetsArbAsset,
  minimumDeposit: numberOrHex,
});

export const arbitrumIngressEgressMinimumDepositSetEvent = defineEvent(
  'ArbitrumIngressEgress.MinimumDepositSet',
  arbitrumIngressEgressMinimumDepositSet,
);
