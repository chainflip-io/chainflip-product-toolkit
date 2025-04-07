import {
  type InternalAssetMap,
  type ChainAssetMap,
  type BaseChainAssetMap,
  ChainMap,
} from '@chainflip/utils/chainflip';
import { vi } from 'vitest';

/**
 * Using `as` or `satisfies` does not ensure that the type completely matches
 * the expected type. This function is used to ensure that the type is exactly
 * the same as the expected type.
 *
 * This is useful for being automatically notified in tests when we have to
 * update test fixtures, e.g. for event handlers.
 */
export const check = <T>(value: T): T => value;

/**
 * vitest now discards previous mocks if you call `vi.spyOn` on the same method
 * more than once.
 */
export const spyOn: typeof vi.spyOn = (
  // @ts-expect-error -- overloaded function
  obj,
  // @ts-expect-error -- overloaded function
  method,
) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (vi.isMockFunction(obj[method])) return obj[method];
  return vi.spyOn(obj, method);
};

export const buildChainAssetMap = <T>(
  defaultValue: T,
  overrides?: Partial<InternalAssetMap<T>>,
): ChainAssetMap<T> => ({
  Ethereum: {
    ETH: overrides?.Eth ?? defaultValue,
    USDC: overrides?.Usdc ?? defaultValue,
    USDT: overrides?.Usdt ?? defaultValue,
    FLIP: overrides?.Flip ?? defaultValue,
  },
  Bitcoin: {
    BTC: overrides?.Btc ?? defaultValue,
  },
  Polkadot: {
    DOT: overrides?.Dot ?? defaultValue,
  },
  Solana: {
    SOL: overrides?.Sol ?? defaultValue,
    USDC: overrides?.SolUsdc ?? defaultValue,
  },
  Arbitrum: {
    ETH: overrides?.ArbEth ?? defaultValue,
    USDC: overrides?.ArbUsdc ?? defaultValue,
  },
  Assethub: {
    DOT: overrides?.HubDot ?? defaultValue,
    USDC: overrides?.HubUsdc ?? defaultValue,
    USDT: overrides?.HubUsdt ?? defaultValue,
  },
});

export const buildChainBaseAssetMap = <T>(
  defaultValue: T,
  overrides?: Partial<Omit<InternalAssetMap<T>, 'Usdc'>>,
): BaseChainAssetMap<T> => ({
  Ethereum: {
    ETH: overrides?.Eth ?? defaultValue,
    USDT: overrides?.Usdt ?? defaultValue,
    FLIP: overrides?.Flip ?? defaultValue,
  },
  Bitcoin: {
    BTC: overrides?.Btc ?? defaultValue,
  },
  Polkadot: {
    DOT: overrides?.Dot ?? defaultValue,
  },
  Solana: {
    SOL: overrides?.Sol ?? defaultValue,
    USDC: overrides?.SolUsdc ?? defaultValue,
  },
  Arbitrum: {
    ETH: overrides?.ArbEth ?? defaultValue,
    USDC: overrides?.ArbUsdc ?? defaultValue,
  },
  Assethub: {
    DOT: overrides?.HubDot ?? defaultValue,
    USDC: overrides?.HubUsdc ?? defaultValue,
    USDT: overrides?.HubUsdt ?? defaultValue,
  },
});

export const buildChainMap = <T>(
  defaultValue: T,
  overrides?: Partial<ChainMap<T>>,
): ChainMap<T> => ({
  Ethereum: overrides?.Ethereum ?? defaultValue,
  Bitcoin: overrides?.Bitcoin ?? defaultValue,
  Polkadot: overrides?.Polkadot ?? defaultValue,
  Solana: overrides?.Solana ?? defaultValue,
  Arbitrum: overrides?.Arbitrum ?? defaultValue,
  Assethub: overrides?.Assethub ?? defaultValue,
});
