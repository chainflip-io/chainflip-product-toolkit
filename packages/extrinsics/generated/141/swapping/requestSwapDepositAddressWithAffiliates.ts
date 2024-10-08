import { type ChainflipAsset, type EncodedAddress } from '../common';

export type SwappingRequestSwapDepositAddressWithAffiliates = [
  sourceAsset: ChainflipAsset,
  destinationAsset: ChainflipAsset,
  destinationAddress: EncodedAddress,
  brokerCommission: number,
  channelMetadata: {
    message: Uint8Array | `0x${string}`;
    gas_budget: `0x${string}`;
    cf_parameters: Uint8Array | `0x${string}`;
  } | null,
  boostFee: number,
  affiliateFees: {
    account: `0x${string}`;
    bps: number;
  }[],
];
