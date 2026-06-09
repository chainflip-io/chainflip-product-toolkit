import { z } from 'zod';
import { cfPrimitivesChainsAssetsSolAsset, numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const solanaIngressEgressMinimumDepositSet = z.object({
  asset: cfPrimitivesChainsAssetsSolAsset,
  minimumDeposit: numberOrHex,
});

export const solanaIngressEgressMinimumDepositSetEvent = defineEvent(
  'SolanaIngressEgress.MinimumDepositSet',
  solanaIngressEgressMinimumDepositSet,
);
