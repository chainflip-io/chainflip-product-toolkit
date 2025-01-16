import { z } from 'zod';
import {
  cfChainsEvmDepositDetails,
  cfPrimitivesChainsAssetsArbAsset,
  hexString,
  numberOrHex,
  palletCfArbitrumIngressEgressDepositAction,
} from '../common';

export const arbitrumIngressEgressDepositFinalised = z.object({
  depositAddress: hexString,
  asset: cfPrimitivesChainsAssetsArbAsset,
  amount: numberOrHex,
  blockHeight: numberOrHex,
  depositDetails: cfChainsEvmDepositDetails,
  ingressFee: numberOrHex,
  action: palletCfArbitrumIngressEgressDepositAction,
  channelId: numberOrHex,
});
