import { z } from 'zod';
import {
  cfChainsEvmDepositDetails,
  cfPrimitivesChainsAssetsEthAsset,
  hexString,
  numberOrHex,
  palletCfEthereumIngressEgressDepositAction,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumIngressEgressDepositBoosted = z.object({
  depositAddress: hexString,
  asset: cfPrimitivesChainsAssetsEthAsset,
  amounts: z.array(z.tuple([z.number(), numberOrHex])),
  depositDetails: cfChainsEvmDepositDetails,
  prewitnessedDepositId: numberOrHex,
  channelId: numberOrHex,
  blockHeight: numberOrHex,
  ingressFee: numberOrHex,
  boostFee: numberOrHex,
  action: palletCfEthereumIngressEgressDepositAction,
});

export const ethereumIngressEgressDepositBoostedEvent = defineEvent(
  'EthereumIngressEgress.DepositBoosted',
  ethereumIngressEgressDepositBoosted,
);
