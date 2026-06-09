import { z } from 'zod';
import {
  cfPrimitivesChainsAssetsEthAsset,
  hexString,
  numberOrHex,
  palletCfEthereumIngressEgressDepositAction,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumIngressEgressDepositReceived = z.object({
  depositAddress: hexString,
  asset: cfPrimitivesChainsAssetsEthAsset,
  amount: numberOrHex,
  ingressFee: numberOrHex,
  action: palletCfEthereumIngressEgressDepositAction,
});

export const ethereumIngressEgressDepositReceivedEvent = defineEvent(
  'EthereumIngressEgress.DepositReceived',
  ethereumIngressEgressDepositReceived,
);
