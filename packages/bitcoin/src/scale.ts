import {
  assetConstants,
  type ChainflipAsset,
  type ChainflipChain,
} from '@chainflip/utils/chainflip';
import { Struct, Bytes, u16, u128, u8, Vector } from 'scale-ts';

const addressByteLengths: Record<ChainflipChain, number | undefined> = {
  Bitcoin: undefined,
  Arbitrum: 20,
  Ethereum: 20,
  Solana: 32,
  Polkadot: 32,
  Assethub: 32,
};

export const createSwapDataCodec = (asset: ChainflipAsset) =>
  Struct({
    version: u8,
    destinationAsset: u8,
    destinationAddress: Bytes(addressByteLengths[assetConstants[asset].chain]),
    parameters: Struct({
      retryDuration: u16,
      minOutputAmount: u128,
      numberOfChunks: u16,
      chunkInterval: u16,
      boostFee: u8,
      brokerFee: u8,
      affiliates: Vector(Struct({ accountIndex: u8, commissionBps: u8 })),
    }),
  });
