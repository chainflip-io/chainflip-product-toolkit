import { assetConstants, type ChainMap, type ChainflipAsset } from '@chainflip/utils/chainflip';
import { Struct, Bytes, u16, u128, u8, Vector, CodecType } from 'scale-ts';

const addressByteLengths: ChainMap<number | undefined> = {
  Bitcoin: undefined,
  Arbitrum: 20,
  Ethereum: 20,
  Solana: 32,
  Assethub: 32,
};

// TODO: remove after 1.11 is live on all networks
export const createSwapDataCodecV0 = (asset: ChainflipAsset) =>
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

export const createSwapDataCodecV1 = (asset: ChainflipAsset) =>
  Struct({
    version: u8,
    destinationAsset: u8,
    destinationAddress: Bytes(addressByteLengths[assetConstants[asset].chain]),
    parameters: Struct({
      retryDuration: u16,
      minOutputAmount: u128,
      maxOraclePriceSlippage: u8,
      numberOfChunks: u16,
      chunkInterval: u16,
      boostFee: u8,
      brokerFee: u8,
      affiliates: Vector(Struct({ accountIndex: u8, commissionBps: u8 })),
    }),
  });

export type UtxoDataV0 = CodecType<ReturnType<typeof createSwapDataCodecV0>>['parameters'];
export type UtxoDataV1 = CodecType<ReturnType<typeof createSwapDataCodecV1>>['parameters'];
