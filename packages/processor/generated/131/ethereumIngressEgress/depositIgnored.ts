import { z } from 'zod';
import {
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
  reason: palletCfEthereumIngressEgressDepositIgnoredReason,
});

export const ethereumIngressEgressDepositIgnoredEvent = defineEvent(
  'EthereumIngressEgress.DepositIgnored',
  ethereumIngressEgressDepositIgnored,
);
