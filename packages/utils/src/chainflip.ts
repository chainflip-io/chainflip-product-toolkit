export const chainflipAssets = [
  // Ethereum
  'Usdc',
  'Usdt',
  'Flip',
  'Eth',
  // Polkadot
  'Dot',
  // Bitcoin
  'Btc',
  // Arbitrum
  'ArbUsdc',
  'ArbEth',
  // Solana
  'Sol',
  'SolUsdc',
  // Assethub
  'HubDot',
  'HubUsdt',
  'HubUsdc',
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

export const chainflipChains = [
  ...chainflipEvmChains,
  'Bitcoin',
  'Polkadot',
  'Solana',
  'Assethub',
] as const;
export type ChainflipChain = (typeof chainflipChains)[number];

export const chainflipNetworks = ['backspin', 'sisyphos', 'perseverance', 'mainnet'] as const;
export type ChainflipNetwork = (typeof chainflipNetworks)[number];

export const addressTypes = ['Eth', 'Btc', 'Dot', 'Arb', 'Sol', 'Hub'] as const;
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

export type AssetAndChain = {
  [C in ChainflipChain]: { chain: C; asset: keyof ChainAssetMap<unknown>[C] };
}[ChainflipChain];

export type UncheckedAssetAndChain = {
  chain: ChainflipChain;
  asset: RpcAsset;
};

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
  HubDot: {
    chain: 'Assethub',
    rpcAsset: 'DOT',
    decimals: 10,
  },
  HubUsdc: {
    chain: 'Assethub',
    rpcAsset: 'USDC',
    decimals: 6,
  },
  HubUsdt: {
    chain: 'Assethub',
    rpcAsset: 'USDT',
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
    rpcAssets: ['ETH', 'FLIP', 'USDC', 'USDT'],
    gasAsset: 'Eth',
    addressType: 'Eth',
    blockTimeSeconds: 12,
  },
  Polkadot: {
    assets: ['Dot'],
    rpcAssets: ['DOT'],
    gasAsset: 'Dot',
    addressType: 'Dot',
    blockTimeSeconds: 6,
  },
  Bitcoin: {
    assets: ['Btc'],
    rpcAssets: ['BTC'],
    gasAsset: 'Btc',
    addressType: 'Btc',
    blockTimeSeconds: 10 * 60,
  },
  Arbitrum: {
    assets: ['ArbUsdc', 'ArbEth'],
    rpcAssets: ['USDC', 'ETH'],
    gasAsset: 'ArbEth',
    addressType: 'Arb',
    blockTimeSeconds: 0.26,
  },
  Solana: {
    assets: ['Sol', 'SolUsdc'],
    rpcAssets: ['SOL', 'USDC'],
    gasAsset: 'Sol',
    addressType: 'Sol',
    blockTimeSeconds: 0.8,
  },
  Assethub: {
    assets: ['HubDot', 'HubUsdt', 'HubUsdc'],
    rpcAssets: ['DOT', 'USDT', 'USDC'],
    gasAsset: 'HubDot',
    addressType: 'Hub',
    blockTimeSeconds: 12,
  },
} as const satisfies Record<
  ChainflipChain,
  {
    assets: ChainflipAsset[];
    rpcAssets: RpcAsset[];
    gasAsset: ChainflipAsset;
    addressType: AddressType;
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
  HubDot: { chain: 'Assethub', asset: 'DOT' },
  HubUsdt: { chain: 'Assethub', asset: 'USDT' },
  HubUsdc: { chain: 'Assethub', asset: 'USDC' },
};

export const chainContractId: Record<ChainflipChain, number> = {
  Ethereum: 1,
  Polkadot: 2,
  Bitcoin: 3,
  Arbitrum: 4,
  Solana: 5,
  Assethub: 6,
};

export const assetContractId: Record<ChainflipAsset, number> = {
  Eth: 1,
  Flip: 2,
  Usdc: 3,
  Usdt: 8,
  Dot: 4,
  Btc: 5,
  ArbEth: 6,
  ArbUsdc: 7,
  Sol: 9,
  SolUsdc: 10,
  HubDot: 11,
  HubUsdt: 12,
  HubUsdc: 13,
};

export function isValidAssetAndChain(
  assetAndChain: UncheckedAssetAndChain,
): assetAndChain is AssetAndChain {
  const { asset, chain } = assetAndChain;
  if (!(chain in chainConstants)) return false;

  const validAssets = chainConstants[chain].rpcAssets as string[];
  return validAssets.includes(asset);
}

export function getInternalAsset(asset: UncheckedAssetAndChain): ChainflipAsset;
export function getInternalAsset(asset: UncheckedAssetAndChain, assert: true): ChainflipAsset;
export function getInternalAsset(
  asset: UncheckedAssetAndChain,
  assert: boolean,
): ChainflipAsset | null;
export function getInternalAsset(asset: UncheckedAssetAndChain, assert = true) {
  if (!isValidAssetAndChain(asset)) {
    if (assert) {
      throw new Error(`invalid asset and chain combination: ${JSON.stringify(asset)}`);
    }

    return null;
  }

  const map: ChainAssetMap<ChainflipAsset> = {
    Ethereum: {
      USDC: 'Usdc',
      FLIP: 'Flip',
      ETH: 'Eth',
      USDT: 'Usdt',
    },
    Bitcoin: {
      BTC: 'Btc',
    },
    Polkadot: {
      DOT: 'Dot',
    },
    Arbitrum: {
      USDC: 'ArbUsdc',
      ETH: 'ArbEth',
    },
    Solana: {
      SOL: 'Sol',
      USDC: 'SolUsdc',
    },
    Assethub: {
      USDC: 'HubUsdc',
      USDT: 'HubUsdt',
      DOT: 'HubDot',
    },
  };

  const chain = map[asset.chain];
  return chain[asset.asset as keyof typeof chain] as ChainflipAsset;
}

export function getInternalAssets(data: {
  srcAsset: RpcAsset;
  srcChain: ChainflipChain;
  destAsset: RpcAsset;
  destChain: ChainflipChain;
}): { srcAsset: ChainflipAsset; destAsset: ChainflipAsset };
export function getInternalAssets(
  data: {
    srcAsset: RpcAsset;
    srcChain: ChainflipChain;
    destAsset: RpcAsset;
    destChain: ChainflipChain;
  },
  assert: true,
): { srcAsset: ChainflipAsset; destAsset: ChainflipAsset };
export function getInternalAssets(
  data: {
    srcAsset: RpcAsset;
    srcChain: ChainflipChain;
    destAsset: RpcAsset;
    destChain: ChainflipChain;
  },
  assert: boolean,
): { srcAsset: ChainflipAsset | null; destAsset: ChainflipAsset | null };
export function getInternalAssets(
  {
    srcAsset,
    srcChain,
    destAsset,
    destChain,
  }: {
    srcAsset: RpcAsset;
    srcChain: ChainflipChain;
    destAsset: RpcAsset;
    destChain: ChainflipChain;
  },
  assert = true,
) {
  return {
    srcAsset: getInternalAsset({ asset: srcAsset, chain: srcChain }, assert),
    destAsset: getInternalAsset({ asset: destAsset, chain: destChain }, assert),
  };
}
