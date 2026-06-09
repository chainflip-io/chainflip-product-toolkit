import { z } from 'zod';
import { cfPrimitivesChainsAssetsEthAsset, numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumIngressEgressMinimumDepositSet = z.object({
  asset: cfPrimitivesChainsAssetsEthAsset,
  minimumDeposit: numberOrHex,
});

export const ethereumIngressEgressMinimumDepositSetEvent = defineEvent(
  'EthereumIngressEgress.MinimumDepositSet',
  ethereumIngressEgressMinimumDepositSet,
);
