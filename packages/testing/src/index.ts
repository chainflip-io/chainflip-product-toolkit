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
export const spyOn = ((obj: object, method: string) => {
  if (vi.isMockFunction((obj as Record<string, unknown>)[method])) {
    return (obj as Record<string, unknown>)[method];
  }
  return vi.spyOn(obj, method as never);
}) as typeof vi.spyOn;

export const buildChainAssetMap = <T>(
  defaultValue: T,
  overrides?: Partial<InternalAssetMap<T>>,
): ChainAssetMap<T> => ({
  Ethereum: {
    ETH: overrides?.Eth ?? defaultValue,
    USDC: overrides?.Usdc ?? defaultValue,
    USDT: overrides?.Usdt ?? defaultValue,
    FLIP: overrides?.Flip ?? defaultValue,
    WBTC: overrides?.Wbtc ?? defaultValue,
  },
  Bitcoin: {
    BTC: overrides?.Btc ?? defaultValue,
  },
  Solana: {
    SOL: overrides?.Sol ?? defaultValue,
    USDC: overrides?.SolUsdc ?? defaultValue,
    USDT: overrides?.SolUsdt ?? defaultValue,
  },
  Arbitrum: {
    ETH: overrides?.ArbEth ?? defaultValue,
    USDC: overrides?.ArbUsdc ?? defaultValue,
    USDT: overrides?.ArbUsdt ?? defaultValue,
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
    WBTC: overrides?.Wbtc ?? defaultValue,
  },
  Bitcoin: {
    BTC: overrides?.Btc ?? defaultValue,
  },
  Solana: {
    SOL: overrides?.Sol ?? defaultValue,
    USDC: overrides?.SolUsdc ?? defaultValue,
    USDT: overrides?.SolUsdt ?? defaultValue,
  },
  Arbitrum: {
    ETH: overrides?.ArbEth ?? defaultValue,
    USDC: overrides?.ArbUsdc ?? defaultValue,
    USDT: overrides?.ArbUsdt ?? defaultValue,
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
  Solana: overrides?.Solana ?? defaultValue,
  Arbitrum: overrides?.Arbitrum ?? defaultValue,
  Assethub: overrides?.Assethub ?? defaultValue,
});
