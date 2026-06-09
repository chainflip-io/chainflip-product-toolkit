import { z } from 'zod';
import {
  cfChainsBtcScriptPubkey,
  cfChainsBtcUtxoId,
  cfPrimitivesChainsAssetsBtcAsset,
  numberOrHex,
  palletCfBitcoinIngressEgressDepositAction,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const bitcoinIngressEgressDepositReceived = z.object({
  depositAddress: cfChainsBtcScriptPubkey,
  asset: cfPrimitivesChainsAssetsBtcAsset,
  amount: numberOrHex,
  depositDetails: cfChainsBtcUtxoId,
  ingressFee: numberOrHex,
  action: palletCfBitcoinIngressEgressDepositAction,
});

export const bitcoinIngressEgressDepositReceivedEvent = defineEvent(
  'BitcoinIngressEgress.DepositReceived',
  bitcoinIngressEgressDepositReceived,
);
