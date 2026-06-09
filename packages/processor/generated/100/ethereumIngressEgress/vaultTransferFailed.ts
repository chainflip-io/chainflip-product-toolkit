import { z } from 'zod';
import { cfPrimitivesChainsAssetsEthAsset, hexString, numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumIngressEgressVaultTransferFailed = z.object({
  asset: cfPrimitivesChainsAssetsEthAsset,
  amount: numberOrHex,
  destinationAddress: hexString,
});

export const ethereumIngressEgressVaultTransferFailedEvent = defineEvent(
  'EthereumIngressEgress.VaultTransferFailed',
  ethereumIngressEgressVaultTransferFailed,
);
