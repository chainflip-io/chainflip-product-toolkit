import { type ChainflipAsset, type EncodedAddress, type ForeignChainAddress } from '../common';

export type SwappingRequestSwapDepositAddressWithAffiliates = [
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
  affiliateFees: {
    account: `0x${string}`;
    bps: number;
  }[],
  refundParameters: {
    retryDuration: number;
    refundAddress: ForeignChainAddress;
    minPrice: `0x${string}`;
  } | null,
];
