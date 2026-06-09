import { z } from 'zod';
import {
  cfChainsAddressEncodedAddress,
  cfChainsCcmChannelMetadata,
  cfPrimitivesBeneficiary,
  cfPrimitivesChainsAssetsAnyAsset,
  numberOrHex,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const swappingSwapDepositAddressReady = z.object({
  depositAddress: cfChainsAddressEncodedAddress,
  destinationAddress: cfChainsAddressEncodedAddress,
  sourceAsset: cfPrimitivesChainsAssetsAnyAsset,
  destinationAsset: cfPrimitivesChainsAssetsAnyAsset,
  channelId: numberOrHex,
  brokerCommissionRate: z.number(),
  channelMetadata: cfChainsCcmChannelMetadata.nullish(),
  sourceChainExpiryBlock: numberOrHex,
  boostFee: z.number(),
  channelOpeningFee: numberOrHex,
  affiliateFees: z.array(cfPrimitivesBeneficiary),
});

export const swappingSwapDepositAddressReadyEvent = defineEvent(
  'Swapping.SwapDepositAddressReady',
  swappingSwapDepositAddressReady,
);
