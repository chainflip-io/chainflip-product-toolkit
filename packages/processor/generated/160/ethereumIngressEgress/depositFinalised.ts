import { z } from 'zod';
import {
  cfChainsEvmDepositDetails,
  cfPrimitivesChainsAssetsEthAsset,
  hexString,
  numberOrHex,
  palletCfEthereumIngressEgressDepositAction,
} from '../common';

export const ethereumIngressEgressDepositFinalised = z.object({
  depositAddress: hexString,
  asset: cfPrimitivesChainsAssetsEthAsset,
  amount: numberOrHex,
  blockHeight: numberOrHex,
  depositDetails: cfChainsEvmDepositDetails,
  ingressFee: numberOrHex,
  action: palletCfEthereumIngressEgressDepositAction,
  channelId: numberOrHex,
});
