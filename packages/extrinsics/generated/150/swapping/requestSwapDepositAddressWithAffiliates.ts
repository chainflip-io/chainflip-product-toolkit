import { type ChainflipAsset, type EncodedAddress, type ForeignChainAddress } from '../common';

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
  refundParameters: {
    retry_duration: number;
    refund_address: ForeignChainAddress;
    min_price: `0x${string}`;
  } | null,
];
