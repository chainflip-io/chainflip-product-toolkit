import { describe, expect, it } from 'vitest';
import { buildChainAssetMap, buildChainBaseAssetMap, buildChainMap, check, spyOn } from '..';

describe(check, () => {
  it('returns whatever value you pass in', () => {
    const value = { foo: 'bar' };
    const result = check(value);
    expect(result).toEqual(value);
  });

  it('checks the type', () => {
    const value = { foo: 'bar' };
    const result = check(value);
    expect(result === value).toBe(true);
    expect(
      // @ts-expect-error -- should be a type error (will be checkd by tsc)
      check<{ foo: number }>({ foo: 'bar' }),
    ).toEqual({ foo: 'bar' });
  });
});

describe(spyOn, () => {
  it('can spy on a method more than once', () => {
    spyOn(Math, 'random').mockReturnValueOnce(0.5);
    spyOn(Math, 'random').mockReturnValueOnce(0.4);
    expect(Math.random()).toBe(0.5);
    expect(Math.random()).toBe(0.4);
  });
});

describe(buildChainAssetMap, () => {
  it('builds a chain asset map with a default value', () => {
    expect(buildChainAssetMap(null)).toMatchInlineSnapshot(`
      {
        "Arbitrum": {
          "ETH": null,
          "USDC": null,
          "USDT": null,
        },
        "Assethub": {
          "DOT": null,
          "USDC": null,
          "USDT": null,
        },
        "Bitcoin": {
          "BTC": null,
        },
        "Ethereum": {
          "ETH": null,
          "FLIP": null,
          "USDC": null,
          "USDT": null,
          "WBTC": null,
        },
        "Solana": {
          "SOL": null,
          "USDC": null,
          "USDT": null,
        },
      }
    `);
  });

  it('builds a chain asset map with overrides', () => {
    expect(
      buildChainAssetMap(null, {
        ArbEth: 1,
        ArbUsdc: 2,
        Btc: 3,
        Dot: 4,
        Eth: 5,
        Flip: 6,
        HubDot: 7,
        HubUsdc: 8,
        HubUsdt: 9,
        Sol: 10,
        SolUsdc: 11,
        Usdc: 12,
        Usdt: 13,
      }),
    ).toMatchInlineSnapshot(`
      {
        "Arbitrum": {
          "ETH": 1,
          "USDC": 2,
          "USDT": null,
        },
        "Assethub": {
          "DOT": 7,
          "USDC": 8,
          "USDT": 9,
        },
        "Bitcoin": {
          "BTC": 3,
        },
        "Ethereum": {
          "ETH": 5,
          "FLIP": 6,
          "USDC": 12,
          "USDT": 13,
          "WBTC": null,
        },
        "Solana": {
          "SOL": 10,
          "USDC": 11,
          "USDT": null,
        },
      }
    `);
  });
});

describe(buildChainBaseAssetMap, () => {
  it('builds a chain asset map with a default value', () => {
    expect(buildChainBaseAssetMap(null)).toMatchInlineSnapshot(`
      {
        "Arbitrum": {
          "ETH": null,
          "USDC": null,
          "USDT": null,
        },
        "Assethub": {
          "DOT": null,
          "USDC": null,
          "USDT": null,
        },
        "Bitcoin": {
          "BTC": null,
        },
        "Ethereum": {
          "ETH": null,
          "FLIP": null,
          "USDT": null,
          "WBTC": null,
        },
        "Solana": {
          "SOL": null,
          "USDC": null,
          "USDT": null,
        },
      }
    `);
  });

  it('builds a chain asset map with overrides', () => {
    expect(
      buildChainBaseAssetMap(null, {
        ArbEth: 1,
        ArbUsdc: 2,
        Btc: 3,
        Dot: 4,
        Eth: 5,
        Flip: 6,
        HubDot: 7,
        HubUsdc: 8,
        HubUsdt: 9,
        Sol: 10,
        SolUsdc: 11,
        Usdt: 13,
      }),
    ).toMatchInlineSnapshot(`
      {
        "Arbitrum": {
          "ETH": 1,
          "USDC": 2,
          "USDT": null,
        },
        "Assethub": {
          "DOT": 7,
          "USDC": 8,
          "USDT": 9,
        },
        "Bitcoin": {
          "BTC": 3,
        },
        "Ethereum": {
          "ETH": 5,
          "FLIP": 6,
          "USDT": 13,
          "WBTC": null,
        },
        "Solana": {
          "SOL": 10,
          "USDC": 11,
          "USDT": null,
        },
      }
    `);
  });
});

describe(buildChainMap, () => {
  it('builds a chain map with a default value', () => {
    expect(buildChainMap(null)).toMatchInlineSnapshot(`
      {
        "Arbitrum": null,
        "Assethub": null,
        "Bitcoin": null,
        "Ethereum": null,
        "Solana": null,
      }
    `);
  });

  it('builds a chain map with overrides', () => {
    expect(
      buildChainMap(null, {
        Ethereum: 'Ethereum',
        Solana: 'Solana',
        Bitcoin: 'Bitcoin',
        Polkadot: 'Polkadot',
        Arbitrum: 'Arbitrum',
        Assethub: 'Assethub',
      }),
    ).toMatchInlineSnapshot(`
      {
        "Arbitrum": "Arbitrum",
        "Assethub": "Assethub",
        "Bitcoin": "Bitcoin",
        "Ethereum": "Ethereum",
        "Solana": "Solana",
      }
    `);
  });
});
