import { describe, it, expect } from 'vitest';
import BigNumber from 'bignumber.js';
import {
  calculateRequiredLiquidityRatio,
  liquidityToTokenAmounts,
  MAX_TICK,
  MIN_TICK,
  rateToTick,
  tickToRate,
} from '../prices';

describe(tickToRate, () => {
  it.each([
    [-211594, { chain: 'Ethereum', asset: 'ETH' }, 647.2153062413026],
    [-45848, { chain: 'Polkadot', asset: 'DOT' }, 102.08130429456654],
    [154543, { chain: 'Bitcoin', asset: 'BTC' }, 514495580.0824737],
  ])('returns the rate for the tick and asset', (tick, asset, expectedRate) => {
    expect(tickToRate(tick, asset)).toBe(expectedRate);
  });
});

describe(rateToTick, () => {
  // expected results returned from "cf_pool_price" rpc
  it.each([
    [647.2153062413026, { chain: 'Ethereum', asset: 'ETH' }, -211594],
    [999.90199267, { chain: 'Ethereum', asset: 'ETH' }, -207244],
    [552021.12138, { chain: 'Ethereum', asset: 'ETH' }, -144104],
    [7617.42728517, { chain: 'Ethereum', asset: 'ETH' }, -186938],
    [1000, { chain: 'Ethereum', asset: 'ETH' }, -207244],
    [0, { chain: 'Ethereum', asset: 'ETH' }, MIN_TICK],
    [1e-100, { chain: 'Ethereum', asset: 'ETH' }, MIN_TICK],
    [1e100, { chain: 'Ethereum', asset: 'ETH' }, MAX_TICK],
    [102.08130429456655, { chain: 'Polkadot', asset: 'DOT' }, -45848],
    [89.02699526411715, { chain: 'Polkadot', asset: 'DOT' }, -47217],
    [514495580.0824737, { chain: 'Bitcoin', asset: 'BTC' }, 154543],
    [396.6561082507816, { chain: 'Bitcoin', asset: 'BTC' }, 13779],
    [102.47090724, { chain: 'Ethereum', asset: 'ETH' }, -230026],
  ])('returns the rate for the tick and asset', (tick, asset, expectedTick) => {
    expect(rateToTick(tick, asset)).toBe(expectedTick);
  });
});

describe(calculateRequiredLiquidityRatio, () => {
  // expected result calculated via "cf_required_asset_ratio_for_range_order" rpc
  it.each([
    [113, -23027, -16095, { chain: 'Polkadot', asset: 'DOT' }, 0], // range above current price
    [113, -69081, -52986, { chain: 'Polkadot', asset: 'DOT' }, Number.POSITIVE_INFINITY], // range below current price
    [2495, MIN_TICK, MAX_TICK, { chain: 'Ethereum', asset: 'ETH' }, 2494.9999999999973],
    [113.17141623785562, -52986, -39122, { chain: 'Polkadot', asset: 'DOT' }, 153.1592296156416],
    [1596.91151972, -207243, -200311, { chain: 'Ethereum', asset: 'ETH' }, 3130.4345956677016],
    [1596.91151972, -203188, -202543, { chain: 'Ethereum', asset: 'ETH' }, 51624.73474265046],
    [89.027, -47216, MAX_TICK, { chain: 'Polkadot', asset: 'DOT' }, 0], // current tick one below range
    [89.027, -47217, MAX_TICK, { chain: 'Polkadot', asset: 'DOT' }, 0.0028155800064541864], // current tick at start of range
    [89.027, MIN_TICK, -47216, { chain: 'Polkadot', asset: 'DOT' }, 4846142.094206663], // current tick one before end of range
    [89.027, MIN_TICK, -47217, { chain: 'Polkadot', asset: 'DOT' }, Number.POSITIVE_INFINITY], // current tick at end of range
    [89.027, MIN_TICK, -47218, { chain: 'Polkadot', asset: 'DOT' }, Number.POSITIVE_INFINITY], // current tick one above range
  ])(
    'returns the rate for the tick and asset',
    (currentRate, lowerTick, upperTick, baseAsset, expectedRatio) => {
      expect(calculateRequiredLiquidityRatio(currentRate, lowerTick, upperTick, baseAsset)).toBe(
        expectedRatio,
      );
    },
  );
});

describe(liquidityToTokenAmounts, () => {
  it.each([
    [
      {
        liquidity: '9998244120702',
        currentRate: 8.34753400705333 ** 2,
        lowerTick: -887272,
        upperTick: 887272,
        asset: { chain: 'Ethereum', asset: 'FLIP' },
      },
      ['83460682', '1197748234658748969'],
    ],
    [
      {
        liquidity: '1808868423070',
        currentRate: 99.99508849818339 ** 2,
        lowerTick: -191148,
        upperTick: -168121,
        asset: { chain: 'Ethereum', asset: 'ETH' },
      },
      ['52972693', '999999996560455'],
    ],
    [
      {
        liquidity: '4999754423029',
        currentRate: 99.99508849818339 ** 2,
        lowerTick: -887272,
        upperTick: 887272,
        asset: { chain: 'Ethereum', asset: 'ETH' },
      },
      ['499950885', '49999999981197376'],
    ],
    [
      {
        liquidity: '790608158687',
        currentRate: 99.99508849818339 ** 2,
        lowerTick: -887272,
        upperTick: -207244,
        asset: { chain: 'Ethereum', asset: 'ETH' },
      },
      ['25000000', '0'],
    ],
    [
      {
        liquidity: '236585570607967',
        currentRate: 99.99508849818339 ** 2,
        lowerTick: -138163,
        upperTick: -127176,
        asset: { chain: 'Ethereum', asset: 'ETH' },
      },
      ['0', '99999999999915245'],
    ],
    [
      {
        liquidity: '14832444',
        currentRate: BigNumber('748625985715070437857442007779744937091104296')
          .div(2 ** 128)
          .shiftedBy(2)
          .toFixed(),
        lowerTick: -887272,
        upperTick: 887272,
        asset: { chain: 'Bitcoin', asset: 'BTC' },
      },
      ['22000139964', '9999'],
    ],
    [
      {
        liquidity: '2526732755',
        currentRate: BigNumber('8689965600633561080236442693417833022480')
          .div(2 ** 128)
          .shiftedBy(4)
          .toFixed(),
        lowerTick: -887272,
        upperTick: 887272,
        asset: { chain: 'Polkadot', asset: 'DOT' },
      },
      ['12768756835', '499999999'],
    ],
  ])('returns the token amounts for the given liquidity position', (params, results) => {
    expect(Object.values(liquidityToTokenAmounts(params))).toEqual(results);
  });
});
