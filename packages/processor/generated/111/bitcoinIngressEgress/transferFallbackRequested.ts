import { z } from 'zod';
import { cfChainsBtcScriptPubkey, cfPrimitivesChainsAssetsBtcAsset, numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const bitcoinIngressEgressTransferFallbackRequested = z.object({
  asset: cfPrimitivesChainsAssetsBtcAsset,
  amount: numberOrHex,
  destinationAddress: cfChainsBtcScriptPubkey,
  broadcastId: z.number(),
});

export const bitcoinIngressEgressTransferFallbackRequestedEvent = defineEvent(
  'BitcoinIngressEgress.TransferFallbackRequested',
  bitcoinIngressEgressTransferFallbackRequested,
);
