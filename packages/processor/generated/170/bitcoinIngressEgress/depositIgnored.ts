import { z } from 'zod';
import {
  cfChainsBtcScriptPubkey,
  cfChainsBtcUtxo,
  cfPrimitivesChainsAssetsBtcAsset,
  numberOrHex,
  palletCfBitcoinIngressEgressDepositIgnoredReason,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const bitcoinIngressEgressDepositIgnored = z.object({
  depositAddress: cfChainsBtcScriptPubkey,
  asset: cfPrimitivesChainsAssetsBtcAsset,
  amount: numberOrHex,
  depositDetails: cfChainsBtcUtxo,
  reason: palletCfBitcoinIngressEgressDepositIgnoredReason,
});

export const bitcoinIngressEgressDepositIgnoredEvent = defineEvent(
  'BitcoinIngressEgress.DepositIgnored',
  bitcoinIngressEgressDepositIgnored,
);
