import { type ChainflipAsset, type EncodedAddress } from '../common';

export type SwappingRequestSwapDepositAddress = [
  sourceAsset: ChainflipAsset,
  destinationAsset: ChainflipAsset,
  destinationAddress: EncodedAddress,
  brokerCommissionBps: number,
  channelMetadata: {
    message: Uint8Array | `0x${string}`;
    gas_budget: `0x${string}`;
    cf_parameters: Uint8Array | `0x${string}`;
  } | null,
  boostFee: number,
];
