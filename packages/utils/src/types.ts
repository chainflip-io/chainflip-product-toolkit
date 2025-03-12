import { type ChainflipAsset } from './chainflip';

export type HexString = `0x${string}`;

export type Bytelike = Uint8Array | number[] | HexString;

// https://github.com/chainflip-io/chainflip-backend/blob/f9b281c1fa4862da0e8a9007214afa96de5eb6f1/api/bin/chainflip-ingress-egress-tracker/src/witnessing/state_chain.rs#L139
export type VaultSwapData<T = never> = {
  amount: bigint;
  destinationAddress: string;
  inputAsset: ChainflipAsset;
  outputAsset: ChainflipAsset;
  depositChainBlockHeight: number;
  brokerFee: number;
  affiliateFees: { account: string; commissionBps: number }[];
  maxBoostFee: number;
  dcaParams: {
    chunkInterval: number;
    numberOfChunks: number;
  } | null;
  refundParams: {
    refundAddress: string;
    minPrice: bigint;
    retryDuration: number;
  };
  ccmDepositMetadata: {
    channelMetadata: {
      message: HexString;
      gasBudget: HexString;
    };
    ccmAdditionalData: T;
  } | null;
};
