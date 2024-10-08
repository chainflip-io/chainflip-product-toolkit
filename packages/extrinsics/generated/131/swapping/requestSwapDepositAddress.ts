import { type ChainflipAsset, type EncodedAddress } from '../common';

export type SwappingRequestSwapDepositAddress = [
  sourceAsset: ChainflipAsset,
  destinationAsset: ChainflipAsset,
  destinationAddress: EncodedAddress,
  brokerCommissionBps: number,
  channelMetadata: {
    message: `0x${string}`;
    gasBudget: `0x${string}`;
    cfParameters: `0x${string}`;
  } | null,
  boostFee: number,
];
