import { z } from 'zod';
import { cfPrimitivesChainsAssetsDotAsset, hexString, numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const polkadotIngressEgressVaultTransferFailed = z.object({
  asset: cfPrimitivesChainsAssetsDotAsset,
  amount: numberOrHex,
  destinationAddress: hexString,
});

export const polkadotIngressEgressVaultTransferFailedEvent = defineEvent(
  'PolkadotIngressEgress.VaultTransferFailed',
  polkadotIngressEgressVaultTransferFailed,
);
