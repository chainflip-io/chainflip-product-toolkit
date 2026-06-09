import { z } from 'zod';
import { cfPrimitivesChainsAssetsEthAsset, hexString, numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumIngressEgressDepositIgnored = z.object({
  depositAddress: hexString,
  asset: cfPrimitivesChainsAssetsEthAsset,
  amount: numberOrHex,
});

export const ethereumIngressEgressDepositIgnoredEvent = defineEvent(
  'EthereumIngressEgress.DepositIgnored',
  ethereumIngressEgressDepositIgnored,
);
