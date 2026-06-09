import { z } from 'zod';
import { cfPrimitivesChainsAssetsEthAsset, hexString, numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumIngressEgressDepositReceived = z.object({
  depositAddress: hexString,
  asset: cfPrimitivesChainsAssetsEthAsset,
  amount: numberOrHex,
});

export const ethereumIngressEgressDepositReceivedEvent = defineEvent(
  'EthereumIngressEgress.DepositReceived',
  ethereumIngressEgressDepositReceived,
);
