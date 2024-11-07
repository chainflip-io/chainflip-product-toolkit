export const chainflipAssets = [
  'Usdc',
  'Usdt',
  'Flip',
  'Dot',
  'Eth',
  'Btc',
  'ArbUsdc',
  'ArbEth',
  'Sol',
  'SolUsdc',
] as const;

export type ChainflipAsset = (typeof chainflipAssets)[number];

export const rpcAssets = ['USDC', 'USDT', 'FLIP', 'DOT', 'ETH', 'BTC', 'SOL'] as const;
type RpcAsset = (typeof rpcAssets)[number];

export type BaseChainflipAsset = Exclude<ChainflipAsset, 'Usdc'>;

export const baseChainflipAssets = chainflipAssets.filter(
  (asset): asset is BaseChainflipAsset => asset !== 'Usdc',
);

export const chainflipEvmChains = ['Ethereum', 'Arbitrum'] as const;
export type ChainflipEvmChain = (typeof chainflipEvmChains)[number];

export const chainflipChains = [...chainflipEvmChains, 'Bitcoin', 'Polkadot', 'Solana'] as const;
export type ChainflipChain = (typeof chainflipChains)[number];

export const chainflipNetworks = ['backspin', 'sisyphos', 'perseverance', 'mainnet'] as const;
export type ChainflipNetwork = (typeof chainflipNetworks)[number];

export const addressTypes = ['Eth', 'Btc', 'Dot', 'Arb', 'Sol'] as const;
export type AddressType = (typeof addressTypes)[number];

export type AssetOfChain<C extends ChainflipChain> = (typeof chainConstants)[C]['assets'][number];

export type ChainAssetMap<T> = {
  [C in ChainflipChain]: {
    [A in (typeof assetConstants)[AssetOfChain<C>]['rpcAsset']]: T;
  };
};

export type BaseChainAssetMap<T> = {
  [C in ChainflipChain]: {
    [A in (typeof assetConstants)[Exclude<AssetOfChain<C>, 'Usdc'>]['rpcAsset']]: T;
  };
};

type AssetAndChain = {
  [C in ChainflipChain]: { chain: C; asset: keyof ChainAssetMap<unknown>[C] };
}[ChainflipChain];

export function readAssetValue<T>(
  map: ChainAssetMap<T>,
  asset: ChainflipAsset | BaseChainflipAsset,
): T;
// a BaseChainAssetMap can only be safely used with base assets
export function readAssetValue<T>(map: BaseChainAssetMap<T>, asset: BaseChainflipAsset): T;
// a BaseChainAssetMap can only be safely used with base assets
export function readAssetValue<T>(
  map: ChainAssetMap<T> | BaseChainAssetMap<T>,
  asset: BaseChainflipAsset,
): T;
export function readAssetValue<T>(
  map: ChainAssetMap<T> | BaseChainAssetMap<T>,
  asset: ChainflipAsset | BaseChainflipAsset,
): T {
  const chainValues = map[assetConstants[asset].chain];
  return chainValues[assetConstants[asset].rpcAsset as keyof typeof chainValues];
}

export const assetConstants = {
  Eth: {
    chain: 'Ethereum',
    rpcAsset: 'ETH',
    decimals: 18,
  },
  Flip: {
    chain: 'Ethereum',
    rpcAsset: 'FLIP',
    decimals: 18,
  },
  Usdc: {
    chain: 'Ethereum',
    rpcAsset: 'USDC',
    decimals: 6,
  },
  Usdt: {
    chain: 'Ethereum',
    rpcAsset: 'USDT',
    decimals: 6,
  },
  Dot: {
    chain: 'Polkadot',
    rpcAsset: 'DOT',
    decimals: 10,
  },
  Btc: {
    chain: 'Bitcoin',
    rpcAsset: 'BTC',
    decimals: 8,
  },
  ArbUsdc: {
    chain: 'Arbitrum',
    rpcAsset: 'USDC',
    decimals: 6,
  },
  ArbEth: {
    chain: 'Arbitrum',
    rpcAsset: 'ETH',
    decimals: 18,
  },
  Sol: {
    chain: 'Solana',
    rpcAsset: 'SOL',
    decimals: 9,
  },
  SolUsdc: {
    chain: 'Solana',
    rpcAsset: 'USDC',
    decimals: 6,
  },
} as const satisfies Record<
  ChainflipAsset,
  {
    chain: ChainflipChain;
    rpcAsset: RpcAsset;
    decimals: number;
  }
>;

export const chainConstants = {
  Ethereum: {
    assets: ['Eth', 'Flip', 'Usdc', 'Usdt'],
    gasAsset: 'Eth',
    addressType: 'Eth',
    blockTimeSeconds: 12,
  },
  Polkadot: {
    assets: ['Dot'],
    gasAsset: 'Dot',
    addressType: 'Dot',
    blockTimeSeconds: 6,
  },
  Bitcoin: {
    assets: ['Btc'],
    gasAsset: 'Btc',
    addressType: 'Btc',
    blockTimeSeconds: 10 * 60,
  },
  Arbitrum: {
    assets: ['ArbUsdc', 'ArbEth'],
    gasAsset: 'ArbEth',
    addressType: 'Arb',
    blockTimeSeconds: 0.26,
  },
  Solana: {
    assets: ['Sol', 'SolUsdc'],
    gasAsset: 'Sol',
    addressType: 'Sol',
    blockTimeSeconds: 0.8,
  },
} as const satisfies Record<
  ChainflipChain,
  {
    assets: ChainflipAsset[];
    gasAsset: ChainflipAsset;
    addressType: 'Eth' | 'Dot' | 'Btc' | 'Arb' | 'Sol';
    blockTimeSeconds: number;
  }
>;

export const internalAssetToRpcAsset: Record<ChainflipAsset, AssetAndChain> = {
  Eth: { chain: 'Ethereum', asset: 'ETH' },
  Flip: { chain: 'Ethereum', asset: 'FLIP' },
  Usdc: { chain: 'Ethereum', asset: 'USDC' },
  Usdt: { chain: 'Ethereum', asset: 'USDT' },
  Dot: { chain: 'Polkadot', asset: 'DOT' },
  Btc: { chain: 'Bitcoin', asset: 'BTC' },
  ArbUsdc: { chain: 'Arbitrum', asset: 'USDC' },
  ArbEth: { chain: 'Arbitrum', asset: 'ETH' },
  Sol: { chain: 'Solana', asset: 'SOL' },
  SolUsdc: { chain: 'Solana', asset: 'USDC' },
};
