import { z } from 'zod';
import { cfPrimitivesChainsAssetsBtcAsset, numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const bitcoinIngressEgressMinimumDepositSet = z.object({
  asset: cfPrimitivesChainsAssetsBtcAsset,
  minimumDeposit: numberOrHex,
});

export const bitcoinIngressEgressMinimumDepositSetEvent = defineEvent(
  'BitcoinIngressEgress.MinimumDepositSet',
  bitcoinIngressEgressMinimumDepositSet,
);
