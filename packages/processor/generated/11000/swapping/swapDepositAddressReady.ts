import { z } from 'zod';
import {
  accountId,
  cfChainsAddressEncodedAddress,
  cfChainsCcmChannelMetadataDecodedCcmAdditionalData,
  cfChainsChannelRefundParametersEncodedAddress,
  cfPrimitivesBeneficiaryAccountId32,
  cfPrimitivesChainsAssetsAnyAsset,
  cfPrimitivesDcaParameters,
  numberOrHex,
} from '../common';

export const swappingSwapDepositAddressReady = z.object({
  depositAddress: cfChainsAddressEncodedAddress,
  destinationAddress: cfChainsAddressEncodedAddress,
  sourceAsset: cfPrimitivesChainsAssetsAnyAsset,
  destinationAsset: cfPrimitivesChainsAssetsAnyAsset,
  channelId: numberOrHex,
  brokerId: accountId,
  brokerCommissionRate: z.number(),
  channelMetadata: cfChainsCcmChannelMetadataDecodedCcmAdditionalData.nullish(),
  sourceChainExpiryBlock: numberOrHex,
  boostFee: z.number(),
  channelOpeningFee: numberOrHex,
  affiliateFees: z.array(cfPrimitivesBeneficiaryAccountId32),
  refundParameters: cfChainsChannelRefundParametersEncodedAddress,
  dcaParameters: cfPrimitivesDcaParameters.nullish(),
});
