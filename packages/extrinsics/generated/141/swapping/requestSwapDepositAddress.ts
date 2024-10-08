import { type ChainflipAsset, type EncodedAddress } from '../common';

export type SwappingRequestSwapDepositAddress = [
  sourceAsset: ChainflipAsset,
  destinationAsset: ChainflipAsset,
  destinationAddress: EncodedAddress,
  brokerCommission: number,
  channelMetadata: {
    message: `0x${string}`;
    gasBudget: `0x${string}`;
    cfParameters: `0x${string}`;
  } | null,
  boostFee: number,
];
