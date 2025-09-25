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

export const assetSymbols = ['USDC', 'USDT', 'FLIP', 'DOT', 'ETH', 'BTC', 'SOL'] as const;

export const priceAssets = ['Btc', 'Eth', 'Sol', 'Usdc', 'Usdt', 'Usd'] as const;
export type PriceAsset = (typeof priceAssets)[number];

/** @deprecated use `assetSymbols` instead */
export const rpcAssets = assetSymbols;
export type AssetSymbol = (typeof assetSymbols)[number];
/** @deprecated use `AssetSymbol` instead */
export type RpcAsset = AssetSymbol;

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

export type AssetOfChain<C extends Exclude<ChainflipChain, 'Polkadot'>> =
  (typeof chainConstants)[C]['assets'][number];

export type ChainAssetMap<T> = {
  [C in Exclude<ChainflipChain, 'Polkadot'>]: {
    [A in AssetOfChain<C>]: T;
  };
};

export type BaseChainAssetMap<T> = {
  [C in Exclude<ChainflipChain, 'Polkadot'>]: {
    [A in BaseChainflipAsset as Extract<(typeof assetConstants)[A], { chain: C }>['symbol']]: T;
  };
};

export type AssetAndChain = {
  [C in Exclude<ChainflipChain, 'Polkadot'>]: {
    [A in keyof ChainAssetMap<unknown>[C]]: { chain: C; asset: A };
  }[keyof ChainAssetMap<unknown>[C]];
}[Exclude<ChainflipChain, 'Polkadot'>];

export type BaseAssetAndChain = Exclude<AssetAndChain, { chain: 'Ethereum'; asset: 'USDC' }>;

export type ChainMap<T> = {
  [C in Exclude<ChainflipChain, 'Polkadot'>]: T;
};

export type InternalAssetMap<T> = {
  [A in Exclude<ChainflipAsset, 'Dot'>]: T;
};

export type UncheckedAssetAndChain = {
  chain: ChainflipChain;
  asset: AssetSymbol;
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
  const chainValues = map[assetConstants[asset].chain as Exclude<ChainflipChain, 'Polkadot'>];
  return chainValues[assetConstants[asset].symbol as keyof typeof chainValues];
}

export const assetConstants = {
  Eth: {
    chain: 'Ethereum',
    symbol: 'ETH',
    rpcAsset: 'ETH',
    decimals: 18,
  },
  Flip: {
    chain: 'Ethereum',
    symbol: 'FLIP',
    rpcAsset: 'FLIP',
    decimals: 18,
  },
  Usdc: {
    chain: 'Ethereum',
    symbol: 'USDC',
    rpcAsset: 'USDC',
    decimals: 6,
  },
  Usdt: {
    chain: 'Ethereum',
    symbol: 'USDT',
    rpcAsset: 'USDT',
    decimals: 6,
  },
  Dot: {
    chain: 'Polkadot',
    symbol: 'DOT',
    rpcAsset: 'DOT',
    decimals: 10,
  },
  Btc: {
    chain: 'Bitcoin',
    symbol: 'BTC',
    rpcAsset: 'BTC',
    decimals: 8,
  },
  ArbUsdc: {
    chain: 'Arbitrum',
    symbol: 'USDC',
    rpcAsset: 'USDC',
    decimals: 6,
  },
  ArbEth: {
    chain: 'Arbitrum',
    symbol: 'ETH',
    rpcAsset: 'ETH',
    decimals: 18,
  },
  Sol: {
    chain: 'Solana',
    symbol: 'SOL',
    rpcAsset: 'SOL',
    decimals: 9,
  },
  SolUsdc: {
    chain: 'Solana',
    symbol: 'USDC',
    rpcAsset: 'USDC',
    decimals: 6,
  },
  HubDot: {
    chain: 'Assethub',
    symbol: 'DOT',
    rpcAsset: 'DOT',
    decimals: 10,
  },
  HubUsdc: {
    chain: 'Assethub',
    symbol: 'USDC',
    rpcAsset: 'USDC',
    decimals: 6,
  },
  HubUsdt: {
    chain: 'Assethub',
    symbol: 'USDT',
    rpcAsset: 'USDT',
    decimals: 6,
  },
} as const satisfies InternalAssetMap<{
  chain: ChainflipChain;
  symbol: AssetSymbol;
  /** @deprecated use `symbol` instead */
  rpcAsset: AssetSymbol;
  decimals: number;
}> & {
  Dot: {
    chain: 'Polkadot';
    symbol: 'DOT';
    rpcAsset: 'DOT';
    decimals: 10;
  };
};

export const chainConstants = {
  Ethereum: {
    chainflipAssets: ['Eth', 'Flip', 'Usdc', 'Usdt'],
    assets: ['ETH', 'FLIP', 'USDC', 'USDT'],
    rpcAssets: ['ETH', 'FLIP', 'USDC', 'USDT'],
    gasAsset: 'Eth',
    addressType: 'Eth',
    blockTimeSeconds: 12,
  },
  Polkadot: {
    chainflipAssets: ['Dot'],
    assets: ['DOT'],
    rpcAssets: ['DOT'],
    gasAsset: 'Dot',
    addressType: 'Dot',
    blockTimeSeconds: 6,
  },
  Bitcoin: {
    chainflipAssets: ['Btc'],
    assets: ['BTC'],
    rpcAssets: ['BTC'],
    gasAsset: 'Btc',
    addressType: 'Btc',
    blockTimeSeconds: 10 * 60,
  },
  Arbitrum: {
    chainflipAssets: ['ArbUsdc', 'ArbEth'],
    assets: ['USDC', 'ETH'],
    rpcAssets: ['USDC', 'ETH'],
    gasAsset: 'ArbEth',
    addressType: 'Arb',
    blockTimeSeconds: 0.26,
  },
  Solana: {
    chainflipAssets: ['Sol', 'SolUsdc'],
    assets: ['SOL', 'USDC'],
    rpcAssets: ['SOL', 'USDC'],
    gasAsset: 'Sol',
    addressType: 'Sol',
    blockTimeSeconds: 0.8,
  },
  Assethub: {
    chainflipAssets: ['HubDot', 'HubUsdt', 'HubUsdc'],
    assets: ['DOT', 'USDT', 'USDC'],
    rpcAssets: ['DOT', 'USDT', 'USDC'],
    gasAsset: 'HubDot',
    addressType: 'Hub',
    blockTimeSeconds: 12,
  },
} as const satisfies ChainMap<{
  chainflipAssets: ChainflipAsset[];
  assets: AssetSymbol[];
  /** @deprecated use `assets` instead */
  rpcAssets: AssetSymbol[];
  gasAsset: ChainflipAsset;
  addressType: AddressType;
  blockTimeSeconds: number;
}> & {
  Polkadot: {
    chainflipAssets: ['Dot'];
    assets: ['DOT'];
    rpcAssets: ['DOT'];
    gasAsset: 'Dot';
    addressType: 'Dot';
    blockTimeSeconds: 6;
  };
};

export const internalAssetToRpcAsset: InternalAssetMap<AssetAndChain> = {
  Eth: { chain: 'Ethereum', asset: 'ETH' },
  Flip: { chain: 'Ethereum', asset: 'FLIP' },
  Usdc: { chain: 'Ethereum', asset: 'USDC' },
  Usdt: { chain: 'Ethereum', asset: 'USDT' },
  Btc: { chain: 'Bitcoin', asset: 'BTC' },
  ArbUsdc: { chain: 'Arbitrum', asset: 'USDC' },
  ArbEth: { chain: 'Arbitrum', asset: 'ETH' },
  Sol: { chain: 'Solana', asset: 'SOL' },
  SolUsdc: { chain: 'Solana', asset: 'USDC' },
  HubDot: { chain: 'Assethub', asset: 'DOT' },
  HubUsdt: { chain: 'Assethub', asset: 'USDT' },
  HubUsdc: { chain: 'Assethub', asset: 'USDC' },
};

export const chainContractId: ChainMap<number> & { Polkadot: 2 } = {
  Ethereum: 1,
  Polkadot: 2,
  Bitcoin: 3,
  Arbitrum: 4,
  Solana: 5,
  Assethub: 6,
};

export const assetContractId: InternalAssetMap<number> & { Dot: 4 } = {
  Eth: 1,
  Flip: 2,
  Usdc: 3,
  Dot: 4,
  Usdt: 8,
  Btc: 5,
  ArbEth: 6,
  ArbUsdc: 7,
  Sol: 9,
  SolUsdc: 10,
  HubDot: 11,
  HubUsdt: 12,
  HubUsdc: 13,
};

export function getInternalAsset(asset: BaseAssetAndChain): BaseChainflipAsset;
export function getInternalAsset(asset: AssetAndChain): ChainflipAsset;
export function getInternalAsset(asset: UncheckedAssetAndChain): ChainflipAsset;
export function getInternalAsset(asset: UncheckedAssetAndChain, assert: true): ChainflipAsset;
export function getInternalAsset(
  asset: UncheckedAssetAndChain,
  assert: boolean,
): ChainflipAsset | null;
export function getInternalAsset(asset: UncheckedAssetAndChain, assert = true) {
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

  const chain = map[asset.chain as Exclude<ChainflipChain, 'Polkadot'>];
  const internalAsset = chain?.[asset.asset as keyof typeof chain] as ChainflipAsset | undefined;

  if (internalAsset) return internalAsset;
  if (assert) throw new Error(`invalid asset and chain combination: ${JSON.stringify(asset)}`);
  return null;
}

export function isValidAssetAndChain(
  assetAndChain: UncheckedAssetAndChain,
): assetAndChain is AssetAndChain {
  const asset = getInternalAsset(assetAndChain, false);
  return asset !== null;
}

export function getInternalAssets(data: {
  srcAsset: AssetSymbol;
  srcChain: ChainflipChain;
  destAsset: AssetSymbol;
  destChain: ChainflipChain;
}): { srcAsset: ChainflipAsset; destAsset: ChainflipAsset };
export function getInternalAssets(
  data: {
    srcAsset: AssetSymbol;
    srcChain: ChainflipChain;
    destAsset: AssetSymbol;
    destChain: ChainflipChain;
  },
  assert: true,
): { srcAsset: ChainflipAsset; destAsset: ChainflipAsset };
export function getInternalAssets(
  data: {
    srcAsset: AssetSymbol;
    srcChain: ChainflipChain;
    destAsset: AssetSymbol;
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
    srcAsset: AssetSymbol;
    srcChain: ChainflipChain;
    destAsset: AssetSymbol;
    destChain: ChainflipChain;
  },
  assert = true,
) {
  return {
    srcAsset: getInternalAsset({ asset: srcAsset, chain: srcChain }, assert),
    destAsset: getInternalAsset({ asset: destAsset, chain: destChain }, assert),
  };
}

export const chainflipAssetToPriceAssetMap: Record<
  ChainflipAsset,
  Exclude<PriceAsset, 'Usd'> | null
> = {
  Btc: 'Btc',
  Sol: 'Sol',
  Eth: 'Eth',
  ArbEth: 'Eth',
  Usdc: 'Usdc',
  ArbUsdc: 'Usdc',
  SolUsdc: 'Usdc',
  HubUsdc: 'Usdc',
  Usdt: 'Usdt',
  HubUsdt: 'Usdt',
  Dot: null,
  Flip: null,
  HubDot: null,
};
