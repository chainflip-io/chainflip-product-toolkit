import { z } from 'zod';
import {
  cfChainsBtcScriptPubkey,
  cfChainsBtcUtxoId,
  cfPrimitivesChainsAssetsBtcAsset,
  numberOrHex,
  palletCfBitcoinIngressEgressDepositIgnoredReason,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const bitcoinIngressEgressDepositIgnored = z.object({
  depositAddress: cfChainsBtcScriptPubkey,
  asset: cfPrimitivesChainsAssetsBtcAsset,
  amount: numberOrHex,
  depositDetails: cfChainsBtcUtxoId,
  reason: palletCfBitcoinIngressEgressDepositIgnoredReason,
});

export const bitcoinIngressEgressDepositIgnoredEvent = defineEvent(
  'BitcoinIngressEgress.DepositIgnored',
  bitcoinIngressEgressDepositIgnored,
);
