import { z } from 'zod';
import {
  cfPrimitivesChainsAssetsEthAsset,
  hexString,
  numberOrHex,
  palletCfEthereumIngressEgressDepositAction,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumIngressEgressDepositFinalised = z.object({
  depositAddress: hexString,
  asset: cfPrimitivesChainsAssetsEthAsset,
  amount: numberOrHex,
  ingressFee: numberOrHex,
  action: palletCfEthereumIngressEgressDepositAction,
  channelId: numberOrHex,
});

export const ethereumIngressEgressDepositFinalisedEvent = defineEvent(
  'EthereumIngressEgress.DepositFinalised',
  ethereumIngressEgressDepositFinalised,
);
