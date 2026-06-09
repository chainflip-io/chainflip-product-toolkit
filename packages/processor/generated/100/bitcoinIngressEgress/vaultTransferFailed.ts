import { z } from 'zod';
import { cfChainsBtcScriptPubkey, cfPrimitivesChainsAssetsBtcAsset, numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const bitcoinIngressEgressVaultTransferFailed = z.object({
  asset: cfPrimitivesChainsAssetsBtcAsset,
  amount: numberOrHex,
  destinationAddress: cfChainsBtcScriptPubkey,
});

export const bitcoinIngressEgressVaultTransferFailedEvent = defineEvent(
  'BitcoinIngressEgress.VaultTransferFailed',
  bitcoinIngressEgressVaultTransferFailed,
);
