import { BigNumber } from 'bignumber.js';

export const MIN_TICK = -887272;
export const MAX_TICK = -MIN_TICK;

type Asset = { asset: string; chain: string };
type EthereumAsset = { asset: 'FLIP' | 'ETH' | 'USDC' | 'USDT'; chain: 'Ethereum' };
type ArbitrumAsset = { asset: 'ETH' | 'USDC'; chain: 'Ethereum' };
type PolkadotAsset = { asset: 'DOT'; chain: 'Polkadot' };
type BitcoinAsset = { asset: 'BTC'; chain: 'Bitcoin' };
type ChainflipAsset = EthereumAsset | ArbitrumAsset | PolkadotAsset | BitcoinAsset;

const decimals = {
  Ethereum: {
    FLIP: 18,
    ETH: 18,
    USDC: 6,
    USDT: 6,
  },
  Arbitrum: {
    ETH: 18,
    USDC: 6,
  },
  Polkadot: {
    DOT: 10,
  },
  Bitcoin: {
    BTC: 8,
  },
} as const;

function assertAsset(asset: Asset): asserts asset is ChainflipAsset {
  if (!(asset.chain in decimals)) {
    throw new Error(`Invalid chain: "${asset.chain}"`);
  }
  const assets = decimals[asset.chain as keyof typeof decimals];
  if (!(asset.asset in assets)) {
    throw new Error(`Invalid asset: "${asset.asset}"`);
  }
}

export function tickToRate<A extends ChainflipAsset>(tick: number, asset: A): number;
export function tickToRate<A extends Asset>(tick: number, asset: A): number;
export function tickToRate(tick: number, asset: Asset): number {
  assertAsset(asset);
  // https://blog.uniswap.org/uniswap-v3-math-primer
  const rawRate = BigNumber(1.0001 ** tick);

  const chainDecimals = decimals[asset.chain];

  const rateDecimals =
    decimals.Ethereum.USDC - chainDecimals[asset.asset as keyof typeof chainDecimals];

  return rawRate.shiftedBy(-rateDecimals).toNumber();
}

export function rateToTick<A extends ChainflipAsset>(rate: string | number, asset: A): number;
export function rateToTick<A extends Asset>(rate: string | number, asset: A): number;
export function rateToTick(rate: string | number, asset: Asset): number {
  assertAsset(asset);
  const chainDecimals = decimals[asset.chain];
  const rateDecimals =
    decimals.Ethereum.USDC - chainDecimals[asset.asset as keyof typeof chainDecimals];

  const rawRate = BigNumber(rate).shiftedBy(rateDecimals);

  let tick = Math.log(rawRate.toNumber()) / Math.log(1.0001);
  tick = Math.round(tick * 1e6) / 1e6; // prevent flooring results like -207244.0000000557 to -207245
  tick = Math.floor(tick);

  return Math.max(MIN_TICK, Math.min(tick, MAX_TICK));
}

export function calculateRequiredLiquidityRatio<A extends ChainflipAsset>(
  _currentRate: string | number,
  lowerTick: number,
  upperTick: number,
  asset: A,
): number;
export function calculateRequiredLiquidityRatio<A extends Asset>(
  _currentRate: string | number,
  lowerTick: number,
  upperTick: number,
  asset: A,
): number;
export function calculateRequiredLiquidityRatio(
  _currentRate: string | number,
  lowerTick: number,
  upperTick: number,
  asset: Asset,
): number {
  // when adding liquidity to a pool, the ratio of added assets must match the asset distribution in the given range
  const currentRate = BigNumber(_currentRate).toNumber();
  const currentTick = rateToTick(currentRate, asset);

  if (currentTick < lowerTick) return 0; // range above current price has only base assets
  if (currentTick >= upperTick) return Number.POSITIVE_INFINITY; // range below current price has only quote assets

  // we want to calculate the ratio Δy/Δx. rearranging the formulas of the blog post leads to:
  // Δy/Δx = sqrt(Pc * Pc * Pb) - sqrt(Pc * Pb * Pa) / (sqrt(Pb) - sqrt(Pc))
  // https://uniswapv3book.com/docs/milestone_1/calculating-liquidity/
  const lowerRate = tickToRate(lowerTick, asset);
  const upperRate = tickToRate(upperTick, asset);
  const numerator =
    Math.sqrt(currentRate * currentRate * upperRate) -
    Math.sqrt(currentRate * upperRate * lowerRate);
  const denominator = Math.sqrt(upperRate) - Math.sqrt(currentRate);

  return numerator / denominator;
}

export function liquidityToTokenAmounts<A extends ChainflipAsset>(args: {
  liquidity: string | number;
  currentRate: string | number;
  lowerTick: number;
  upperTick: number;
  asset: A;
}): { quoteAsset: string; baseAsset: string };
export function liquidityToTokenAmounts<A extends Asset>(args: {
  liquidity: string | number;
  currentRate: string | number;
  lowerTick: number;
  upperTick: number;
  asset: A;
}): { quoteAsset: string; baseAsset: string };
export function liquidityToTokenAmounts({
  liquidity,
  currentRate,
  lowerTick,
  upperTick,
  asset,
}: {
  liquidity: string | number;
  currentRate: string | number;
  lowerTick: number;
  upperTick: number;
  asset: Asset;
}): { quoteAsset: string; baseAsset: string } {
  assertAsset(asset);
  const chainDecimals = decimals[asset.chain];
  const assetDecimals = chainDecimals[asset.asset as keyof typeof chainDecimals];

  const rateDecimals = decimals.Ethereum.USDC - assetDecimals;

  const rawRate = BigNumber(currentRate).shiftedBy(rateDecimals).toNumber();

  const _liquidity = BigNumber(liquidity);

  const currentRawSqrtRate = Math.sqrt(rawRate);
  const currentPriceTick = rateToTick(currentRate, asset);
  const rawSqrtRateLower = Math.sqrt(1.0001 ** lowerTick);
  const rawSqrtRateUpper = Math.sqrt(1.0001 ** upperTick);

  let quoteAssetAmount = BigNumber(0);
  let baseAssetAmount = BigNumber(0);

  // https://blog.uniswap.org/uniswap-v3-math-primer-2#how-to-calculate-current-holdings
  if (currentPriceTick < lowerTick) {
    const numerator = rawSqrtRateUpper - rawSqrtRateLower;
    const denominator = rawSqrtRateLower * rawSqrtRateUpper;

    baseAssetAmount = _liquidity.multipliedBy(numerator / denominator);
  } else if (currentPriceTick >= upperTick) {
    quoteAssetAmount = _liquidity.multipliedBy(rawSqrtRateUpper - rawSqrtRateLower);
  } else if (currentPriceTick >= lowerTick && currentPriceTick < upperTick) {
    const numerator = rawSqrtRateUpper - currentRawSqrtRate;
    const denominator = currentRawSqrtRate * rawSqrtRateUpper;

    baseAssetAmount = _liquidity.multipliedBy(numerator / denominator);
    quoteAssetAmount = _liquidity.multipliedBy(currentRawSqrtRate - rawSqrtRateLower);
  }

  return { quoteAsset: quoteAssetAmount.toFixed(0), baseAsset: baseAssetAmount.toFixed(0) };
}
