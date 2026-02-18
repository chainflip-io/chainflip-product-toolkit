export const chainflipAssets = [
  // Ethereum
  'Usdc',
  'Usdt',
  'Wbtc',
  'Flip',
  'Eth',
  // Bitcoin
  'Btc',
  // Arbitrum
  'ArbUsdc',
  'ArbUsdt',
  'ArbEth',
  // Solana
  'Sol',
  'SolUsdc',
  'SolUsdt',
  // Assethub
  'HubDot',
  'HubUsdt',
  'HubUsdc',
] as const;

export const legacyChainflipAssets = [
  // Polkadot
  'Dot',
] as const;

export type ChainflipAsset = (typeof chainflipAssets)[number];

export type LegacyChainflipAsset = (typeof legacyChainflipAssets)[number];

export type AnyChainflipAsset = ChainflipAsset | LegacyChainflipAsset;

export const priceAssets = [
  'Btc',
  'Eth',
  'Sol',
  'Usdc',
  'Usdt',
  'Usd',
  'Fine', // not used
] as const;
export type PriceAsset = (typeof priceAssets)[number];

export type BaseChainflipAsset = Exclude<ChainflipAsset, 'Usdc'>;
export type AnyBaseChainflipAsset = Exclude<AnyChainflipAsset, 'Usdc'>;

export type NonDeprecatedBaseChainflipAsset = Exclude<BaseChainflipAsset, LegacyChainflipAsset>;

export const baseChainflipAssets = chainflipAssets.filter(
  (asset): asset is BaseChainflipAsset => asset !== 'Usdc',
);

export const chainflipEvmChains = ['Ethereum', 'Arbitrum'] as const;
export type ChainflipEvmChain = (typeof chainflipEvmChains)[number];

export const chainflipChains = [...chainflipEvmChains, 'Bitcoin', 'Solana', 'Assethub'] as const;
export type ChainflipChain = (typeof chainflipChains)[number];

export const legacyChainflipChains = ['Polkadot'] as const;
export type LegacyChainflipChain = (typeof legacyChainflipChains)[number];

export type AnyChainflipChain = ChainflipChain | LegacyChainflipChain;

export const chainflipNetworks = ['backspin', 'sisyphos', 'perseverance', 'mainnet'] as const;
export type ChainflipNetwork = (typeof chainflipNetworks)[number];

export const addressTypes = ['Eth', 'Btc', 'Arb', 'Sol', 'Hub'] as const;
export type AddressType = (typeof addressTypes)[number];

export const legacyAddressTypes = ['Dot'] as const;
export type LegacyAddressType = (typeof legacyAddressTypes)[number];
export type AnyAddressType = AddressType | LegacyAddressType;

export type AssetOfChain<C extends ChainflipChain> = (typeof chainConstants)[C]['assets'][number];
export type AnyAssetOfChain<C extends AnyChainflipChain> =
  (typeof anyChainConstants)[C]['assets'][number];

export type ChainAssetMap<T> = {
  [C in ChainflipChain]: {
    [A in AssetOfChain<C>]: T;
  };
};

export type AnyChainAssetMap<T> = {
  [C in AnyChainflipChain]: {
    [A in AnyAssetOfChain<C>]: T;
  };
};

export type BaseChainAssetMap<T> = {
  [C in ChainflipChain]: {
    [A in BaseChainflipAsset as Extract<(typeof assetConstants)[A], { chain: C }>['symbol']]: T;
  };
};

export type AnyBaseChainAssetMap<T> = {
  [C in AnyChainflipChain]: {
    [A in BaseChainflipAsset as Extract<(typeof anyAssetConstants)[A], { chain: C }>['symbol']]: T;
  };
};

export type AssetAndChain = {
  [C in ChainflipChain]: {
    [A in keyof ChainAssetMap<unknown>[C]]: { chain: C; asset: A };
  }[keyof ChainAssetMap<unknown>[C]];
}[ChainflipChain];

export type AnyAssetAndChain = {
  [C in AnyChainflipChain]: {
    [A in keyof AnyChainAssetMap<unknown>[C]]: { chain: C; asset: A };
  }[keyof AnyChainAssetMap<unknown>[C]];
}[AnyChainflipChain];

export type BaseAssetAndChain = Exclude<AssetAndChain, { chain: 'Ethereum'; asset: 'USDC' }>;
export type AnyBaseAssetAndChain = Exclude<AnyAssetAndChain, { chain: 'Ethereum'; asset: 'USDC' }>;

export type ChainMap<T> = {
  [C in ChainflipChain]: T;
};

export type AnyChainMap<T> = {
  [C in AnyChainflipChain]: T;
};

export type InternalAssetMap<T> = {
  [A in ChainflipAsset]: T;
};

export type AnyInternalAssetMap<T> = {
  [A in AnyChainflipAsset]: T;
};

export type UncheckedAssetAndChain = {
  chain: ChainflipChain;
  asset: AssetSymbol;
};

export type AnyUncheckedAssetAndChain = {
  chain: AnyChainflipChain;
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
  const chainValues = map[assetConstants[asset].chain];
  return chainValues[assetConstants[asset].symbol as keyof typeof chainValues];
}

export const assetConstants = {
  Eth: { chain: 'Ethereum', symbol: 'ETH', decimals: 18 },
  Flip: { chain: 'Ethereum', symbol: 'FLIP', decimals: 18 },
  Usdc: { chain: 'Ethereum', symbol: 'USDC', decimals: 6 },
  Usdt: { chain: 'Ethereum', symbol: 'USDT', decimals: 6 },
  Wbtc: { chain: 'Ethereum', symbol: 'WBTC', decimals: 8 },
  Btc: { chain: 'Bitcoin', symbol: 'BTC', decimals: 8 },
  ArbUsdc: { chain: 'Arbitrum', symbol: 'USDC', decimals: 6 },
  ArbUsdt: { chain: 'Arbitrum', symbol: 'USDT', decimals: 6 },
  ArbEth: { chain: 'Arbitrum', symbol: 'ETH', decimals: 18 },
  Sol: { chain: 'Solana', symbol: 'SOL', decimals: 9 },
  SolUsdc: { chain: 'Solana', symbol: 'USDC', decimals: 6 },
  SolUsdt: { chain: 'Solana', symbol: 'USDT', decimals: 6 },
  HubDot: { chain: 'Assethub', symbol: 'DOT', decimals: 10 },
  HubUsdc: { chain: 'Assethub', symbol: 'USDC', decimals: 6 },
  HubUsdt: { chain: 'Assethub', symbol: 'USDT', decimals: 6 },
} as const satisfies InternalAssetMap<{
  chain: ChainflipChain;
  symbol: string;
  decimals: number;
}>;

export const anyAssetConstants = {
  ...assetConstants,
  Dot: { chain: 'Polkadot', symbol: 'DOT', decimals: 10 },
} as const satisfies AnyInternalAssetMap<{
  chain: AnyChainflipChain;
  symbol: string;
  decimals: number;
}>;

export const assetSymbols = Object.values(assetConstants)
  .map((a) => a.symbol)
  .filter((s, i, arr) => arr.indexOf(s) === i);
export type AssetSymbol = (typeof assetSymbols)[number];

export const chainConstants = {
  Ethereum: {
    chainflipAssets: ['Eth', 'Flip', 'Usdc', 'Usdt', 'Wbtc'],
    assets: ['ETH', 'FLIP', 'USDC', 'USDT', 'WBTC'],
    rpcAssets: ['ETH', 'FLIP', 'USDC', 'USDT', 'WBTC'],
    gasAsset: 'Eth',
    addressType: 'Eth',
    blockTimeSeconds: 12,
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
    chainflipAssets: ['ArbUsdc', 'ArbUsdt', 'ArbEth'],
    assets: ['USDC', 'USDT', 'ETH'],
    rpcAssets: ['USDC', 'USDT', 'ETH'],
    gasAsset: 'ArbEth',
    addressType: 'Arb',
    blockTimeSeconds: 0.26,
  },
  Solana: {
    chainflipAssets: ['Sol', 'SolUsdc', 'SolUsdt'],
    assets: ['SOL', 'USDC', 'USDT'],
    rpcAssets: ['SOL', 'USDC', 'USDT'],
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
}>;

export const anyChainConstants = {
  ...chainConstants,
  Polkadot: {
    chainflipAssets: ['Dot'],
    assets: ['DOT'],
    rpcAssets: ['DOT'],
    gasAsset: 'Dot',
    addressType: 'Dot',
    blockTimeSeconds: 6,
  },
} as const satisfies AnyChainMap<{
  chainflipAssets: AnyChainflipAsset[];
  assets: AssetSymbol[];
  /** @deprecated use `assets` instead */
  rpcAssets: AssetSymbol[];
  gasAsset: AnyChainflipAsset;
  addressType: AnyAddressType;
  blockTimeSeconds: number;
}>;

export const internalAssetToRpcAsset: InternalAssetMap<AssetAndChain> = {
  Eth: { chain: 'Ethereum', asset: 'ETH' },
  Flip: { chain: 'Ethereum', asset: 'FLIP' },
  Usdc: { chain: 'Ethereum', asset: 'USDC' },
  Usdt: { chain: 'Ethereum', asset: 'USDT' },
  Wbtc: { chain: 'Ethereum', asset: 'WBTC' },
  Btc: { chain: 'Bitcoin', asset: 'BTC' },
  ArbUsdc: { chain: 'Arbitrum', asset: 'USDC' },
  ArbUsdt: { chain: 'Arbitrum', asset: 'USDT' },
  ArbEth: { chain: 'Arbitrum', asset: 'ETH' },
  Sol: { chain: 'Solana', asset: 'SOL' },
  SolUsdc: { chain: 'Solana', asset: 'USDC' },
  SolUsdt: { chain: 'Solana', asset: 'USDT' },
  HubDot: { chain: 'Assethub', asset: 'DOT' },
  HubUsdt: { chain: 'Assethub', asset: 'USDT' },
  HubUsdc: { chain: 'Assethub', asset: 'USDC' },
};

export const anyInternalAssetToRpcAsset: AnyInternalAssetMap<AnyAssetAndChain> = {
  ...internalAssetToRpcAsset,
  Dot: { chain: 'Polkadot', asset: 'DOT' },
};

export const chainContractId: ChainMap<number> = {
  Ethereum: 1,
  // Polkadot: 2, keeping for legacy reasons
  Bitcoin: 3,
  Arbitrum: 4,
  Solana: 5,
  Assethub: 6,
};

export const assetContractId: InternalAssetMap<number> = {
  Eth: 1,
  Flip: 2,
  Usdc: 3,
  // Dot: 4, keeping for legacy reasons
  Usdt: 8,
  Btc: 5,
  ArbEth: 6,
  ArbUsdc: 7,
  Sol: 9,
  SolUsdc: 10,
  HubDot: 11,
  HubUsdt: 12,
  HubUsdc: 13,
  Wbtc: 14,
  ArbUsdt: 15,
  SolUsdt: 16,
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
      WBTC: 'Wbtc',
    },
    Bitcoin: {
      BTC: 'Btc',
    },
    Arbitrum: {
      USDC: 'ArbUsdc',
      USDT: 'ArbUsdt',
      ETH: 'ArbEth',
    },
    Solana: {
      SOL: 'Sol',
      USDC: 'SolUsdc',
      USDT: 'SolUsdt',
    },
    Assethub: {
      USDC: 'HubUsdc',
      USDT: 'HubUsdt',
      DOT: 'HubDot',
    },
  };

  const chain = map[asset.chain];
  const internalAsset = chain?.[asset.asset as keyof typeof chain] as ChainflipAsset | undefined;

  if (internalAsset) return internalAsset;
  if (assert) throw new Error(`invalid asset and chain combination: ${JSON.stringify(asset)}`);
  return null;
}

export function getAnyInternalAsset(asset: AnyUncheckedAssetAndChain): AnyChainflipAsset;
export function getAnyInternalAsset(
  asset: AnyUncheckedAssetAndChain,
  assert: true,
): AnyChainflipAsset;
export function getAnyInternalAsset(
  asset: AnyUncheckedAssetAndChain,
  assert: boolean,
): AnyChainflipAsset | null;
export function getAnyInternalAsset(asset: AnyUncheckedAssetAndChain, assert = true) {
  switch (asset.chain) {
    case 'Polkadot':
      if (asset.asset === 'DOT') return 'Dot';
    // eslint-disable-next-line no-fallthrough -- explicitly allow fallthrough
    default:
      return getInternalAsset(asset as UncheckedAssetAndChain, assert);
  }
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
  ArbUsdt: 'Usdt',
  SolUsdc: 'Usdc',
  SolUsdt: 'Usdt',
  HubUsdc: 'Usdc',
  Usdt: 'Usdt',
  HubUsdt: 'Usdt',
  Flip: null,
  HubDot: null,
  Wbtc: 'Btc',
};

export function isChainflipAsset(asset: string): asset is ChainflipAsset {
  return (chainflipAssets as readonly string[]).includes(asset);
}

export function isLegacyChainflipAsset(asset: string): asset is LegacyChainflipAsset {
  return (legacyChainflipAssets as readonly string[]).includes(asset);
}

export function isAnyChainflipAsset(asset: string): asset is AnyChainflipAsset {
  return isChainflipAsset(asset) || isLegacyChainflipAsset(asset);
}
