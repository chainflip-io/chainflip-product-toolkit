import { z } from 'zod';
import {
  cfChainsBtcScriptPubkey,
  cfChainsBtcUtxo,
  cfPrimitivesChainsAssetsBtcAsset,
  numberOrHex,
  palletCfBitcoinIngressEgressDepositAction,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const bitcoinIngressEgressDepositBoosted = z.object({
  depositAddress: cfChainsBtcScriptPubkey,
  asset: cfPrimitivesChainsAssetsBtcAsset,
  amounts: z.array(z.tuple([z.number(), numberOrHex])),
  depositDetails: cfChainsBtcUtxo,
  prewitnessedDepositId: numberOrHex,
  channelId: numberOrHex,
  blockHeight: numberOrHex,
  ingressFee: numberOrHex,
  boostFee: numberOrHex,
  action: palletCfBitcoinIngressEgressDepositAction,
});

export const bitcoinIngressEgressDepositBoostedEvent = defineEvent(
  'BitcoinIngressEgress.DepositBoosted',
  bitcoinIngressEgressDepositBoosted,
);
