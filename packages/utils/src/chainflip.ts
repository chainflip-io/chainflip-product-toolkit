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

export type AssetOfChain<C extends ChainflipChain> = (typeof chainConstants)[C]['assets'][number];

export type ChainAssetMap<T> = {
  [C in ChainflipChain]: {
    [A in (typeof assetConstants)[AssetOfChain<C>]['rpcAsset']]: T;
  };
};
export const readAssetValue = <T>(value: ChainAssetMap<T>, asset: ChainflipAsset): T => {
  const chainValues = value[assetConstants[asset].chain];
  return chainValues[assetConstants[asset].rpcAsset as keyof typeof chainValues];
};

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
    blockTimeSeconds: 12,
  },
  Polkadot: {
    assets: ['Dot'],
    gasAsset: 'Dot',
    blockTimeSeconds: 6,
  },
  Bitcoin: {
    assets: ['Btc'],
    gasAsset: 'Btc',
    blockTimeSeconds: 10 * 60,
  },
  Arbitrum: {
    assets: ['ArbUsdc', 'ArbEth'],
    gasAsset: 'ArbEth',
    blockTimeSeconds: 0.26,
  },
  Solana: {
    assets: ['Sol', 'SolUsdc'],
    gasAsset: 'Sol',
    blockTimeSeconds: 0.8,
  },
} as const satisfies Record<
  ChainflipChain,
  {
    assets: ChainflipAsset[];
    gasAsset: ChainflipAsset;
    blockTimeSeconds: number;
  }
>;
