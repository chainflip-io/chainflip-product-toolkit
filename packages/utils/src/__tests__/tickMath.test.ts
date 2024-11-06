import { describe, it, expect } from 'vitest';
import {
  MAX_TICK,
  MIN_TICK,
  rateToTick,
  priceX128ToPrice,
  tickToRate,
  sqrtPriceX96ToPrice,
} from '../tickMath';

describe(tickToRate, () => {
  it.each([
    [-211594, 'Eth' as const, 647.2153062413026],
    [-45848, 'Dot' as const, 102.08130429456655],
    [154543, 'Btc' as const, 514495580.0824737],
  ])('returns the rate for the tick and asset', (tick, asset, expected) => {
    expect(tickToRate(tick, asset)).toBe(expected);
  });
});

describe(rateToTick, () => {
  // expected results returned from "cf_pool_price" rpc
  it.each([
    [647.2153062413026, 'Eth' as const, -211594],
    [999.90199267, 'Eth' as const, -207244],
    [552021.12138, 'Eth' as const, -144104],
    [7617.42728517, 'Eth' as const, -186938],
    [1000, 'Eth' as const, -207244],
    [0, 'Eth' as const, MIN_TICK],
    [1e-100, 'Eth' as const, MIN_TICK],
    [1e100, 'Eth' as const, MAX_TICK],
    [102.08130429456655, 'Dot' as const, -45848],
    [89.02699526411715, 'Dot' as const, -47217],
    [514495580.0824737, 'Btc' as const, 154543],
    [396.6561082507816, 'Btc' as const, 13779],
    [102.47090724, 'Flip' as const, -230026],
  ])('returns the rate for the tick and asset', (tick, asset, expectedTick) => {
    expect(rateToTick(tick, asset)).toBe(expectedTick);
  });
});

describe(priceX128ToPrice, () => {
  it('converts sqrt price to price', () => {
    expect(priceX128ToPrice('340282366920938463463374607431768211456').toFixed()).toBe('1');
  });
});

describe(sqrtPriceX96ToPrice, () => {
  it('converts sqrt price to price', () => {
    expect(sqrtPriceX96ToPrice('0x35c82c71f1f121c098c73').toFixed()).toBe(
      '0.0000000026307096037125100789283861900481',
    );
  });
});
