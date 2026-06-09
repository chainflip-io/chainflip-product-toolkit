import { z } from 'zod';
import {
  cfPrimitivesChainsAssetsSolAsset,
  hexString,
  numberOrHex,
  palletCfSolanaIngressEgressDepositIgnoredReason,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const solanaIngressEgressDepositIgnored = z.object({
  depositAddress: hexString,
  asset: cfPrimitivesChainsAssetsSolAsset,
  amount: numberOrHex,
  reason: palletCfSolanaIngressEgressDepositIgnoredReason,
});

export const solanaIngressEgressDepositIgnoredEvent = defineEvent(
  'SolanaIngressEgress.DepositIgnored',
  solanaIngressEgressDepositIgnored,
);
