import { z } from 'zod';
import {
  cfChainsAddressEncodedAddress,
  cfChainsCcmChannelMetadata,
  cfChainsChannelRefundParameters,
  cfPrimitivesBeneficiary,
  cfPrimitivesChainsAssetsAnyAsset,
  numberOrHex,
} from '../common';

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
  refundParameters: cfChainsChannelRefundParameters.nullish(),
});
