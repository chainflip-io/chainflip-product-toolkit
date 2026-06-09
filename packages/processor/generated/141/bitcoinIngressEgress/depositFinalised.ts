import { z } from 'zod';
import {
  cfChainsBtcScriptPubkey,
  cfChainsBtcUtxoId,
  cfPrimitivesChainsAssetsBtcAsset,
  numberOrHex,
  palletCfBitcoinIngressEgressDepositAction,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const bitcoinIngressEgressDepositFinalised = z.object({
  depositAddress: cfChainsBtcScriptPubkey,
  asset: cfPrimitivesChainsAssetsBtcAsset,
  amount: numberOrHex,
  depositDetails: cfChainsBtcUtxoId,
  ingressFee: numberOrHex,
  action: palletCfBitcoinIngressEgressDepositAction,
  channelId: numberOrHex,
});

export const bitcoinIngressEgressDepositFinalisedEvent = defineEvent(
  'BitcoinIngressEgress.DepositFinalised',
  bitcoinIngressEgressDepositFinalised,
);
