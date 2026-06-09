import { z } from 'zod';
import {
  cfChainsBtcScriptPubkey,
  cfPrimitivesChainsAssetsBtcAsset,
  cfPrimitivesChainsForeignChain,
  numberOrHex,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const bitcoinIngressEgressEgressScheduled = z.object({
  id: z.tuple([cfPrimitivesChainsForeignChain, numberOrHex]),
  asset: cfPrimitivesChainsAssetsBtcAsset,
  amount: numberOrHex,
  destinationAddress: cfChainsBtcScriptPubkey,
});

export const bitcoinIngressEgressEgressScheduledEvent = defineEvent(
  'BitcoinIngressEgress.EgressScheduled',
  bitcoinIngressEgressEgressScheduled,
);
