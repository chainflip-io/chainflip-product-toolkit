import { BigNumber } from 'bignumber.js';
import { assetConstants, ChainflipAsset } from './chainflip';

export const MIN_TICK = -887272;
export const MAX_TICK = -MIN_TICK;
export const FULL_TICK_RANGE = { start: MIN_TICK, end: MAX_TICK };

export const tickToRate = (tick: number, baseAsset: ChainflipAsset): number => {
  // https://blog.uniswap.org/uniswap-v3-math-primer
  const baseRate = 1.0001 ** tick;
  const rateDecimals = assetConstants.Usdc.decimals - assetConstants[baseAsset].decimals;

  return baseRate / 10 ** rateDecimals;
};

export const rateToTick = (rate: BigNumber.Value, baseAsset: ChainflipAsset): number => {
  const rateDecimals = assetConstants.Usdc.decimals - assetConstants[baseAsset].decimals;
  const rawRate = new BigNumber(rate).shiftedBy(rateDecimals);

  let tick = Math.log(rawRate.toNumber()) / Math.log(1.0001);
  tick = Math.round(tick * 1e6) / 1e6; // prevent flooring results like -207244.0000000557 to -207245
  tick = Math.floor(tick);

  return Math.max(MIN_TICK, Math.min(tick, MAX_TICK));
};

export const sqrtPriceX96ToPrice = (amount: string) =>
  new BigNumber(amount).div(new BigNumber(2).pow(96)).pow(2);

export const priceX128ToPrice = (amount: string) =>
  new BigNumber(amount).div(new BigNumber(2).pow(128));
