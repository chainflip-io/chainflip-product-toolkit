import { z } from 'zod';
import {
  cfChainsEvmDepositDetails,
  cfPrimitivesChainsAssetsEthAsset,
  hexString,
  numberOrHex,
  palletCfEthereumIngressEgressDepositIgnoredReason,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumIngressEgressDepositIgnored = z.object({
  depositAddress: hexString,
  asset: cfPrimitivesChainsAssetsEthAsset,
  amount: numberOrHex,
  depositDetails: cfChainsEvmDepositDetails,
  reason: palletCfEthereumIngressEgressDepositIgnoredReason,
});

export const ethereumIngressEgressDepositIgnoredEvent = defineEvent(
  'EthereumIngressEgress.DepositIgnored',
  ethereumIngressEgressDepositIgnored,
);
