import { chainflipAssets, internalAssetToRpcAsset } from '@chainflip/utils/chainflip';
import { describe, expect, it } from 'vitest';
import {
  cfBoostPoolDetails,
  cfBoostPoolPendingFees,
  cfEnvironment,
  numberOrHex,
  cfPoolsEnvironment,
  cfPoolDepth,
  cfAccounts,
  cfGetTradingStrategies,
  cfGetTradingStrategyLimits,
  cfSwappingEnvironment,
  cfAccountInfo,
  cfOraclePrices,
  cfLendingPools,
  cfLendingConfig,
  cfLoanAccounts,
  cfMonitoringSimulateAuction,
  cfSafeModeStatuses,
  cfLendingPoolSupplyBalances,
} from '../parsers';
import {
  cfAccountInfoOperator,
  cfOraclePrice,
  emptyChainAssetMap,
  lendingConfig,
  lendingPools,
  lendingPoolSupplyBalances,
  liquidityProviderAccount,
  loanAccounts,
  monitoringSimulateAuction,
  safeModeStatuses,
  tradingStrategies,
  tradingStrategiesLimits,
} from './fixtures';

describe('parsers', () => {
  describe('numberOrHex', () => {
    it.each([1, '0x1'])('transforms %s into a bigint', (value) => {
      expect(numberOrHex.parse(value)).toBe(BigInt(value));
    });
  });

  describe('cfBoostPoolDetails', () => {
    it('parses boost pool details', () => {
      cfBoostPoolDetails.parse([
        {
          fee_tier: 5,
          chain: 'Bitcoin',
          asset: 'BTC',
          available_amounts: [
            {
              account_id: 'cFL8fmgKZcchhtLagBH2GKfsuWxBqUaD5CYE1m7DFb8DBSLJ1',
              amount: '0xbed6146',
            },
          ],
          deposits_pending_finalization: [
            {
              deposit_id: 11,
              owed_amounts: [
                {
                  account_id: 'cFL8fmgKZcchhtLagBH2GKfsuWxBqUaD5CYE1m7DFb8DBSLJ1',
                  amount: '0xf4240',
                },
              ],
            },
          ],
          pending_withdrawals: [],
        },
        {
          fee_tier: 10,
          chain: 'Bitcoin',
          asset: 'BTC',
          available_amounts: [],
          deposits_pending_finalization: [],
          pending_withdrawals: [],
        },
      ]);
    });
  });

  describe('cfBoostPoolPendingFees', () => {
    it('parses boost pool pending fees', () => {
      cfBoostPoolPendingFees.parse([
        {
          fee_tier: 5,
          chain: 'Bitcoin',
          asset: 'BTC',
          pending_fees: [
            {
              deposit_id: 3,
              fees: [
                {
                  account_id: 'cFL8fmgKZcchhtLagBH2GKfsuWxBqUaD5CYE1m7DFb8DBSLJ1',
                  amount: '0x1f4',
                },
              ],
            },
            {
              deposit_id: 11,
              fees: [
                {
                  account_id: 'cFL8fmgKZcchhtLagBH2GKfsuWxBqUaD5CYE1m7DFb8DBSLJ1',
                  amount: '0x1f4',
                },
              ],
            },
          ],
        },
        {
          fee_tier: 10,
          chain: 'Bitcoin',
          asset: 'BTC',
          pending_fees: [],
        },
        {
          fee_tier: 30,
          chain: 'Bitcoin',
          asset: 'BTC',
          pending_fees: [],
        },
      ]);
    });
  });

  describe('cfEnvironment', () => {
    it('parses the cfEnvironment response', () => {
      const result = cfEnvironment.parse({
        ingress_egress: {
          minimum_deposit_amounts: emptyChainAssetMap,
          ingress_fees: {
            Ethereum: {
              ETH: '0x55730',
              FLIP: '0x2db7b25',
              USDC: '0x0',
              USDT: '0x0',
            },
            Polkadot: {
              DOT: '0xbc28f20',
            },
            Bitcoin: {
              BTC: '0x4f',
            },
            Arbitrum: {
              ETH: '0x574b457d400',
              USDC: '0x150e',
            },
            Solana: {
              SOL: '0x2f62d048',
              USDC: '0x0',
            },
            Assethub: {
              DOT: '0x0',
              USDC: '0x0',
              USDT: '0x0',
            },
          },
          egress_fees: {
            Ethereum: {
              ETH: '0x77a10',
              FLIP: '0x336ea89',
              USDC: '0x0',
              USDT: '0x0',
            },
            Polkadot: {
              DOT: '0xbc4d910',
            },
            Bitcoin: {
              BTC: '0xb3',
            },
            Arbitrum: {
              ETH: '0x74645ca7000',
              USDC: '0x1765',
            },
            Solana: {
              SOL: '0x4787c48',
              USDC: '0x0',
            },
            Assethub: {
              DOT: '0x0',
              USDC: '0x0',
              USDT: '0x0',
            },
          },
          witness_safety_margins: {
            Arbitrum: 1,
            Ethereum: 2,
            Solana: 1,
            Bitcoin: 2,
            Polkadot: null,
            Assethub: null,
          },
          egress_dust_limits: {
            Ethereum: {
              ETH: '0x1',
              FLIP: '0x1',
              USDC: '0x1',
              USDT: '0x1',
            },
            Polkadot: {
              DOT: '0x1',
            },
            Bitcoin: {
              BTC: '0x258',
            },
            Arbitrum: {
              ETH: '0x1',
              USDC: '0x1',
            },
            Solana: {
              SOL: '0x1',
              USDC: '0x1',
            },
            Assethub: {
              DOT: '0x1',
              USDC: '0x1',
              USDT: '0x1',
            },
          },
          channel_opening_fees: {
            Ethereum: '0x0',
            Bitcoin: '0x0',
            Arbitrum: '0x0',
            Polkadot: '0x0',
            Solana: '0x0',
            Assethub: '0x0',
          },
          ingress_delays: {
            Ethereum: 0,
            Bitcoin: 0,
            Arbitrum: 0,
            Polkadot: 0,
            Solana: 10,
            Assethub: 0,
          },
          boost_delays: {
            Ethereum: 0,
            Bitcoin: 0,
            Arbitrum: 0,
            Polkadot: 0,
            Solana: 0,
            Assethub: 0,
          },
        },
        swapping: {
          maximum_swap_amounts: {
            Ethereum: {
              ETH: null,
              FLIP: null,
              USDC: null,
              USDT: null,
            },
            Polkadot: {
              DOT: null,
            },
            Bitcoin: {
              BTC: null,
            },
            Arbitrum: {
              ETH: null,
              USDC: null,
            },
            Solana: {
              SOL: null,
              USDC: null,
            },
            Assethub: {
              DOT: null,
              USDC: null,
              USDT: null,
            },
          },
          network_fee_hundredth_pips: 1000,
          swap_retry_delay_blocks: 5,
          max_swap_retry_duration_blocks: 600,
          max_swap_request_duration_blocks: 14400,
          minimum_chunk_size: {
            Ethereum: {
              ETH: '0x2c68af0bb140000',
              FLIP: '0x3635c9adc5dea00000',
              USDC: '0x3b9aca00',
              USDT: '0x3b9aca00',
            },
            Polkadot: {
              DOT: '0x1d1a94a2000',
            },
            Bitcoin: {
              BTC: '0x1e8480',
            },
            Arbitrum: {
              ETH: '0x2c68af0bb140000',
              USDC: '0x3b9aca00',
            },
            Solana: {
              SOL: '0x12a05f200',
              USDC: '0x3b9aca00',
            },
            Assethub: {
              DOT: '0x1d1a94a2000',
              USDC: '0x3b9aca00',
              USDT: '0x3b9aca00',
            },
          },
          network_fees: {
            regular_network_fee: {
              standard_rate_and_minimum: {
                rate: 0,
                minimum: 0,
              },
              rates: {
                Ethereum: {
                  ETH: 0,
                  FLIP: 0,
                  USDC: 0,
                  USDT: 0,
                },
                Polkadot: {
                  DOT: 0,
                },
                Bitcoin: {
                  BTC: 0,
                },
                Arbitrum: {
                  ETH: 0,
                  USDC: 0,
                },
                Solana: {
                  SOL: 0,
                  USDC: 0,
                },
                Assethub: {
                  DOT: 0,
                  USDT: 0,
                  USDC: 0,
                },
              },
            },
            internal_swap_network_fee: {
              standard_rate_and_minimum: {
                rate: 0,
                minimum: 0,
              },
              rates: {
                Ethereum: {
                  ETH: 0,
                  FLIP: 0,
                  USDC: 0,
                  USDT: 0,
                },
                Polkadot: {
                  DOT: 0,
                },
                Bitcoin: {
                  BTC: 0,
                },
                Arbitrum: {
                  ETH: 0,
                  USDC: 0,
                },
                Solana: {
                  SOL: 0,
                  USDC: 0,
                },
                Assethub: {
                  DOT: 0,
                  USDT: 0,
                  USDC: 0,
                },
              },
            },
          },
        },
        funding: {
          redemption_tax: '0x4563918244f40000',
          minimum_funding_amount: '0x8ac7230489e80000',
        },
        pools: {
          fees: {
            Ethereum: {
              ETH: {
                limit_order_fee_hundredth_pips: 20,
                range_order_fee_hundredth_pips: 20,
                range_order_total_fees_earned: {
                  base: '0x60df5e33d7020d',
                  quote: '0x84b113',
                },
                limit_order_total_fees_earned: {
                  base: '0x210317f6bb404',
                  quote: '0x0',
                },
                range_total_swap_inputs: {
                  base: '0x49e809af8ec5e4686d',
                  quote: '0x653bc61c72',
                },
                limit_total_swap_inputs: {
                  base: '0x192f8b3555c5aae8e',
                  quote: '0x0',
                },
                quote_asset: {
                  chain: 'Ethereum',
                  asset: 'USDC',
                },
              },
              FLIP: {
                limit_order_fee_hundredth_pips: 20,
                range_order_fee_hundredth_pips: 20,
                range_order_total_fees_earned: {
                  base: '0x8fe2c5138911193',
                  quote: '0x1ad471',
                },
                limit_order_total_fees_earned: {
                  base: '0x0',
                  quote: '0x0',
                },
                range_total_swap_inputs: {
                  base: '0x6dc62318b26f5210b65',
                  quote: '0x1478117200',
                },
                limit_total_swap_inputs: {
                  base: '0x0',
                  quote: '0x0',
                },
                quote_asset: {
                  chain: 'Ethereum',
                  asset: 'USDC',
                },
              },
              USDC: null,
              USDT: {
                limit_order_fee_hundredth_pips: 20,
                range_order_fee_hundredth_pips: 20,
                range_order_total_fees_earned: {
                  base: '0x8ae06',
                  quote: '0x1bf876',
                },
                limit_order_total_fees_earned: {
                  base: '0x0',
                  quote: '0x0',
                },
                range_total_swap_inputs: {
                  base: '0x69f36e6b2',
                  quote: '0x1556dc0dcb',
                },
                limit_total_swap_inputs: {
                  base: '0x0',
                  quote: '0x0',
                },
                quote_asset: {
                  chain: 'Ethereum',
                  asset: 'USDC',
                },
              },
            },
            Polkadot: {
              DOT: {
                limit_order_fee_hundredth_pips: 20,
                range_order_fee_hundredth_pips: 20,
                range_order_total_fees_earned: {
                  base: '0x1264878c',
                  quote: '0x111676',
                },
                limit_order_total_fees_earned: {
                  base: '0x0',
                  quote: '0x0',
                },
                range_total_swap_inputs: {
                  base: '0xe084044b0fc',
                  quote: '0xd095d91a1',
                },
                limit_total_swap_inputs: {
                  base: '0x0',
                  quote: '0x0',
                },
                quote_asset: {
                  chain: 'Ethereum',
                  asset: 'USDC',
                },
              },
            },
            Bitcoin: {
              BTC: {
                limit_order_fee_hundredth_pips: 20,
                range_order_fee_hundredth_pips: 20,
                range_order_total_fees_earned: {
                  base: '0x8961',
                  quote: '0xda0f22',
                },
                limit_order_total_fees_earned: {
                  base: '0x0',
                  quote: '0xac0c',
                },
                range_total_swap_inputs: {
                  base: '0x68cedbea',
                  quote: '0xa65ccd0506',
                },
                limit_total_swap_inputs: {
                  base: '0x0',
                  quote: '0x8341e381',
                },
                quote_asset: {
                  chain: 'Ethereum',
                  asset: 'USDC',
                },
              },
            },
            Arbitrum: {
              ETH: {
                limit_order_fee_hundredth_pips: 20,
                range_order_fee_hundredth_pips: 20,
                range_order_total_fees_earned: {
                  base: '0x1a96a7c9901240',
                  quote: '0x210230',
                },
                limit_order_total_fees_earned: {
                  base: '0x0',
                  quote: '0x0',
                },
                range_total_swap_inputs: {
                  base: '0x1448f64c4ff15c61c0',
                  quote: '0x192ecd80a2',
                },
                limit_total_swap_inputs: {
                  base: '0x0',
                  quote: '0x0',
                },
                quote_asset: {
                  chain: 'Ethereum',
                  asset: 'USDC',
                },
              },
              USDC: {
                limit_order_fee_hundredth_pips: 20,
                range_order_fee_hundredth_pips: 20,
                range_order_total_fees_earned: {
                  base: '0xaa9c1',
                  quote: '0x1b1d4b',
                },
                limit_order_total_fees_earned: {
                  base: '0x0',
                  quote: '0x0',
                },
                range_total_swap_inputs: {
                  base: '0x8228e1e3c',
                  quote: '0x14afa63498',
                },
                limit_total_swap_inputs: {
                  base: '0x0',
                  quote: '0x0',
                },
                quote_asset: {
                  chain: 'Ethereum',
                  asset: 'USDC',
                },
              },
            },
            Solana: {
              SOL: {
                limit_order_fee_hundredth_pips: 20,
                range_order_fee_hundredth_pips: 20,
                range_order_total_fees_earned: {
                  base: '0x1a96a7c9901240',
                  quote: '0x210230',
                },
                limit_order_total_fees_earned: {
                  base: '0x0',
                  quote: '0x0',
                },
                range_total_swap_inputs: {
                  base: '0x1448f64c4ff15c61c0',
                  quote: '0x192ecd80a2',
                },
                limit_total_swap_inputs: {
                  base: '0x0',
                  quote: '0x0',
                },
                quote_asset: {
                  chain: 'Ethereum',
                  asset: 'USDC',
                },
              },
              USDC: {
                limit_order_fee_hundredth_pips: 20,
                range_order_fee_hundredth_pips: 20,
                range_order_total_fees_earned: {
                  base: '0xaa9c1',
                  quote: '0x1b1d4b',
                },
                limit_order_total_fees_earned: {
                  base: '0x0',
                  quote: '0x0',
                },
                range_total_swap_inputs: {
                  base: '0x8228e1e3c',
                  quote: '0x14afa63498',
                },
                limit_total_swap_inputs: {
                  base: '0x0',
                  quote: '0x0',
                },
                quote_asset: {
                  chain: 'Ethereum',
                  asset: 'USDC',
                },
              },
              Assethub: {
                DOT: null,
                USDC: null,
                USDT: null,
              },
            },
            Assethub: {
              DOT: {
                limit_order_fee_hundredth_pips: 20,
                range_order_fee_hundredth_pips: 20,
                range_order_total_fees_earned: {
                  base: '0x6ff3',
                  quote: '0x0',
                },
                limit_order_total_fees_earned: {
                  base: '0x3fb505a',
                  quote: '0xeb53',
                },
                range_total_swap_inputs: {
                  base: '0x5568199c',
                  quote: '0x0',
                },
                limit_total_swap_inputs: {
                  base: '0x309a8bce81d',
                  quote: '0xb383d1fa',
                },
                quote_asset: {
                  chain: 'Ethereum',
                  asset: 'USDC',
                },
              },
              USDC: null,
              USDT: {
                limit_order_fee_hundredth_pips: 5,
                range_order_fee_hundredth_pips: 5,
                range_order_total_fees_earned: {
                  base: '0x18ac',
                  quote: '0x42c17',
                },
                limit_order_total_fees_earned: {
                  base: '0x19d',
                  quote: '0xfb',
                },
                range_total_swap_inputs: {
                  base: '0x4b195890',
                  quote: '0xcbb6eea1b',
                },
                limit_total_swap_inputs: {
                  base: '0x4e400a2',
                  quote: '0x2fadcfb',
                },
                quote_asset: {
                  chain: 'Ethereum',
                  asset: 'USDC',
                },
              },
            },
          },
        },
      });
      expect(result).toMatchInlineSnapshot(`
        {
          "funding": {
            "minimum_funding_amount": 10000000000000000000n,
            "redemption_tax": 5000000000000000000n,
          },
          "ingress_egress": {
            "boost_delays": {
              "Arbitrum": 0,
              "Assethub": 0,
              "Bitcoin": 0,
              "Ethereum": 0,
              "Solana": 0,
            },
            "channel_opening_fees": {
              "Arbitrum": 0n,
              "Assethub": 0n,
              "Bitcoin": 0n,
              "Ethereum": 0n,
              "Solana": 0n,
            },
            "egress_fees": {
              "Arbitrum": {
                "ETH": 7998400000000n,
                "USDC": 5989n,
              },
              "Assethub": {
                "DOT": 0n,
                "USDC": 0n,
                "USDT": 0n,
              },
              "Bitcoin": {
                "BTC": 179n,
              },
              "Ethereum": {
                "ETH": 490000n,
                "FLIP": 53930633n,
                "USDC": 0n,
                "USDT": 0n,
              },
              "Solana": {
                "SOL": 75005000n,
                "USDC": 0n,
              },
            },
            "ingress_delays": {
              "Arbitrum": 0,
              "Assethub": 0,
              "Bitcoin": 0,
              "Ethereum": 0,
              "Solana": 10,
            },
            "ingress_fees": {
              "Arbitrum": {
                "ETH": 5998800000000n,
                "USDC": 5390n,
              },
              "Assethub": {
                "DOT": 0n,
                "USDC": 0n,
                "USDT": 0n,
              },
              "Bitcoin": {
                "BTC": 79n,
              },
              "Ethereum": {
                "ETH": 350000n,
                "FLIP": 47938341n,
                "USDC": 0n,
                "USDT": 0n,
              },
              "Solana": {
                "SOL": 795005000n,
                "USDC": 0n,
              },
            },
            "minimum_deposit_amounts": {
              "Arbitrum": {
                "ETH": 0n,
                "USDC": 0n,
              },
              "Assethub": {
                "DOT": 0n,
                "USDC": 0n,
                "USDT": 0n,
              },
              "Bitcoin": {
                "BTC": 0n,
              },
              "Ethereum": {
                "ETH": 0n,
                "FLIP": 0n,
                "USDC": 0n,
                "USDT": 0n,
              },
              "Solana": {
                "SOL": 0n,
                "USDC": 0n,
              },
            },
            "minimum_egress_amounts": {
              "Arbitrum": {
                "ETH": 1n,
                "USDC": 1n,
              },
              "Assethub": {
                "DOT": 1n,
                "USDC": 1n,
                "USDT": 1n,
              },
              "Bitcoin": {
                "BTC": 600n,
              },
              "Ethereum": {
                "ETH": 1n,
                "FLIP": 1n,
                "USDC": 1n,
                "USDT": 1n,
              },
              "Solana": {
                "SOL": 1n,
                "USDC": 1n,
              },
            },
            "witness_safety_margins": {
              "Arbitrum": 1,
              "Assethub": null,
              "Bitcoin": 2,
              "Ethereum": 2,
              "Solana": 1,
            },
          },
          "pools": {
            "fees": {
              "Arbitrum": {
                "ETH": {
                  "limit_order_fee_hundredth_pips": 20,
                  "limit_order_total_fees_earned": {
                    "base": 0n,
                    "quote": 0n,
                  },
                  "limit_total_swap_inputs": {
                    "base": 0n,
                    "quote": 0n,
                  },
                  "quote_asset": {
                    "asset": "USDC",
                    "chain": "Ethereum",
                  },
                  "range_order_fee_hundredth_pips": 20,
                  "range_order_total_fees_earned": {
                    "base": 7483996779844160n,
                    "quote": 2163248n,
                  },
                  "range_total_swap_inputs": {
                    "base": 374192354995428155840n,
                    "quote": 108159402146n,
                  },
                },
                "USDC": {
                  "limit_order_fee_hundredth_pips": 20,
                  "limit_order_total_fees_earned": {
                    "base": 0n,
                    "quote": 0n,
                  },
                  "limit_total_swap_inputs": {
                    "base": 0n,
                    "quote": 0n,
                  },
                  "quote_asset": {
                    "asset": "USDC",
                    "chain": "Ethereum",
                  },
                  "range_order_fee_hundredth_pips": 20,
                  "range_order_total_fees_earned": {
                    "base": 698817n,
                    "quote": 1776971n,
                  },
                  "range_total_swap_inputs": {
                    "base": 34939477564n,
                    "quote": 88846251160n,
                  },
                },
              },
              "Assethub": {
                "DOT": {
                  "limit_order_fee_hundredth_pips": 20,
                  "limit_order_total_fees_earned": {
                    "base": 66801754n,
                    "quote": 60243n,
                  },
                  "limit_total_swap_inputs": {
                    "base": 3340020541469n,
                    "quote": 3011760634n,
                  },
                  "quote_asset": {
                    "asset": "USDC",
                    "chain": "Ethereum",
                  },
                  "range_order_fee_hundredth_pips": 20,
                  "range_order_total_fees_earned": {
                    "base": 28659n,
                    "quote": 0n,
                  },
                  "range_total_swap_inputs": {
                    "base": 1432885660n,
                    "quote": 0n,
                  },
                },
                "USDC": {
                  "limit_order_fee_hundredth_pips": 0,
                  "limit_order_total_fees_earned": {
                    "base": "0x0",
                    "quote": "0x0",
                  },
                  "limit_total_swap_inputs": {
                    "base": "0x0",
                    "quote": "0x0",
                  },
                  "quote_asset": {
                    "asset": "USDC",
                    "chain": "Ethereum",
                  },
                  "range_order_fee_hundredth_pips": 0,
                  "range_order_total_fees_earned": {
                    "base": "0x0",
                    "quote": "0x0",
                  },
                  "range_total_swap_inputs": {
                    "base": "0x0",
                    "quote": "0x0",
                  },
                },
                "USDT": {
                  "limit_order_fee_hundredth_pips": 5,
                  "limit_order_total_fees_earned": {
                    "base": 413n,
                    "quote": 251n,
                  },
                  "limit_total_swap_inputs": {
                    "base": 82051234n,
                    "quote": 49995003n,
                  },
                  "quote_asset": {
                    "asset": "USDC",
                    "chain": "Ethereum",
                  },
                  "range_order_fee_hundredth_pips": 5,
                  "range_order_total_fees_earned": {
                    "base": 6316n,
                    "quote": 273431n,
                  },
                  "range_total_swap_inputs": {
                    "base": 1259952272n,
                    "quote": 54684215835n,
                  },
                },
              },
              "Bitcoin": {
                "BTC": {
                  "limit_order_fee_hundredth_pips": 20,
                  "limit_order_total_fees_earned": {
                    "base": 0n,
                    "quote": 44044n,
                  },
                  "limit_total_swap_inputs": {
                    "base": 0n,
                    "quote": 2202133377n,
                  },
                  "quote_asset": {
                    "asset": "USDC",
                    "chain": "Ethereum",
                  },
                  "range_order_fee_hundredth_pips": 20,
                  "range_order_total_fees_earned": {
                    "base": 35169n,
                    "quote": 14290722n,
                  },
                  "range_total_swap_inputs": {
                    "base": 1758387178n,
                    "quote": 714521511174n,
                  },
                },
              },
              "Ethereum": {
                "ETH": {
                  "limit_order_fee_hundredth_pips": 20,
                  "limit_order_total_fees_earned": {
                    "base": 580754730628100n,
                    "quote": 0n,
                  },
                  "limit_total_swap_inputs": {
                    "base": 29037155776674311822n,
                    "quote": 0n,
                  },
                  "quote_asset": {
                    "asset": "USDC",
                    "chain": "Ethereum",
                  },
                  "range_order_fee_hundredth_pips": 20,
                  "range_order_total_fees_earned": {
                    "base": 27267193453871629n,
                    "quote": 8696083n,
                  },
                  "range_total_swap_inputs": {
                    "base": 1363332405500127242349n,
                    "quote": 434794536050n,
                  },
                },
                "FLIP": {
                  "limit_order_fee_hundredth_pips": 20,
                  "limit_order_total_fees_earned": {
                    "base": 0n,
                    "quote": 0n,
                  },
                  "limit_total_swap_inputs": {
                    "base": 0n,
                    "quote": 0n,
                  },
                  "quote_asset": {
                    "asset": "USDC",
                    "chain": "Ethereum",
                  },
                  "range_order_fee_hundredth_pips": 20,
                  "range_order_total_fees_earned": {
                    "base": 648004123740934547n,
                    "quote": 1758321n,
                  },
                  "range_total_swap_inputs": {
                    "base": 32399558182922985999205n,
                    "quote": 87913755136n,
                  },
                },
                "USDT": {
                  "limit_order_fee_hundredth_pips": 20,
                  "limit_order_total_fees_earned": {
                    "base": 0n,
                    "quote": 0n,
                  },
                  "limit_total_swap_inputs": {
                    "base": 0n,
                    "quote": 0n,
                  },
                  "quote_asset": {
                    "asset": "USDC",
                    "chain": "Ethereum",
                  },
                  "range_order_fee_hundredth_pips": 20,
                  "range_order_total_fees_earned": {
                    "base": 568838n,
                    "quote": 1833078n,
                  },
                  "range_total_swap_inputs": {
                    "base": 28440979122n,
                    "quote": 91651575243n,
                  },
                },
              },
              "Solana": {
                "SOL": {
                  "limit_order_fee_hundredth_pips": 20,
                  "limit_order_total_fees_earned": {
                    "base": 0n,
                    "quote": 0n,
                  },
                  "limit_total_swap_inputs": {
                    "base": 0n,
                    "quote": 0n,
                  },
                  "quote_asset": {
                    "asset": "USDC",
                    "chain": "Ethereum",
                  },
                  "range_order_fee_hundredth_pips": 20,
                  "range_order_total_fees_earned": {
                    "base": 7483996779844160n,
                    "quote": 2163248n,
                  },
                  "range_total_swap_inputs": {
                    "base": 374192354995428155840n,
                    "quote": 108159402146n,
                  },
                },
                "USDC": {
                  "limit_order_fee_hundredth_pips": 20,
                  "limit_order_total_fees_earned": {
                    "base": 0n,
                    "quote": 0n,
                  },
                  "limit_total_swap_inputs": {
                    "base": 0n,
                    "quote": 0n,
                  },
                  "quote_asset": {
                    "asset": "USDC",
                    "chain": "Ethereum",
                  },
                  "range_order_fee_hundredth_pips": 20,
                  "range_order_total_fees_earned": {
                    "base": 698817n,
                    "quote": 1776971n,
                  },
                  "range_total_swap_inputs": {
                    "base": 34939477564n,
                    "quote": 88846251160n,
                  },
                },
              },
            },
          },
          "swapping": {
            "max_swap_request_duration_blocks": 14400,
            "max_swap_retry_duration_blocks": 600,
            "maximum_swap_amounts": {
              "Arbitrum": {
                "ETH": null,
                "USDC": null,
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
              },
              "Solana": {
                "SOL": null,
                "USDC": null,
              },
            },
            "minimum_chunk_size": {
              "Arbitrum": {
                "ETH": 200000000000000000n,
                "USDC": 1000000000n,
              },
              "Assethub": {
                "DOT": 2000000000000n,
                "USDC": 1000000000n,
                "USDT": 1000000000n,
              },
              "Bitcoin": {
                "BTC": 2000000n,
              },
              "Ethereum": {
                "ETH": 200000000000000000n,
                "FLIP": 1000000000000000000000n,
                "USDC": 1000000000n,
                "USDT": 1000000000n,
              },
              "Solana": {
                "SOL": 5000000000n,
                "USDC": 1000000000n,
              },
            },
            "network_fee_hundredth_pips": 1000,
            "network_fees": {
              "internal_swap_network_fee": {
                "rates": {
                  "Arbitrum": {
                    "ETH": 0n,
                    "USDC": 0n,
                  },
                  "Assethub": {
                    "DOT": 0n,
                    "USDC": 0n,
                    "USDT": 0n,
                  },
                  "Bitcoin": {
                    "BTC": 0n,
                  },
                  "Ethereum": {
                    "ETH": 0n,
                    "FLIP": 0n,
                    "USDC": 0n,
                    "USDT": 0n,
                  },
                  "Solana": {
                    "SOL": 0n,
                    "USDC": 0n,
                  },
                },
                "standard_rate_and_minimum": {
                  "minimum": 0n,
                  "rate": 0n,
                },
              },
              "regular_network_fee": {
                "rates": {
                  "Arbitrum": {
                    "ETH": 0n,
                    "USDC": 0n,
                  },
                  "Assethub": {
                    "DOT": 0n,
                    "USDC": 0n,
                    "USDT": 0n,
                  },
                  "Bitcoin": {
                    "BTC": 0n,
                  },
                  "Ethereum": {
                    "ETH": 0n,
                    "FLIP": 0n,
                    "USDC": 0n,
                    "USDT": 0n,
                  },
                  "Solana": {
                    "SOL": 0n,
                    "USDC": 0n,
                  },
                },
                "standard_rate_and_minimum": {
                  "minimum": 0n,
                  "rate": 0n,
                },
              },
            },
            "swap_retry_delay_blocks": 5,
          },
        }
      `);
    });
  });

  describe('cfSwappingEnvironment', () => {
    it('parses the cfSwappingEnvironment response', () => {
      cfSwappingEnvironment.parse({
        maximum_swap_amounts: {
          Ethereum: {
            ETH: null,
            FLIP: null,
            USDC: null,
            USDT: null,
          },
          Polkadot: {
            DOT: null,
          },
          Bitcoin: {
            BTC: null,
          },
          Arbitrum: {
            ETH: null,
            USDC: null,
          },
          Solana: {
            SOL: null,
            USDC: null,
          },
          Assethub: {
            DOT: null,
            USDC: null,
            USDT: null,
          },
        },
        network_fee_hundredth_pips: 1000,
        swap_retry_delay_blocks: 5,
        max_swap_retry_duration_blocks: 600,
        max_swap_request_duration_blocks: 14400,
        minimum_chunk_size: {
          Ethereum: {
            ETH: '0x2c68af0bb140000',
            FLIP: '0x3635c9adc5dea00000',
            USDC: '0x3b9aca00',
            USDT: '0x3b9aca00',
          },
          Polkadot: {
            DOT: '0x1d1a94a2000',
          },
          Bitcoin: {
            BTC: '0x1e8480',
          },
          Arbitrum: {
            ETH: '0x2c68af0bb140000',
            USDC: '0x3b9aca00',
          },
          Solana: {
            SOL: '0x12a05f200',
            USDC: '0x3b9aca00',
          },
          Assethub: {
            DOT: '0x1d1a94a2000',
            USDC: '0x3b9aca00',
            USDT: '0x3b9aca00',
          },
        },
        network_fees: {
          regular_network_fee: {
            standard_rate_and_minimum: {
              rate: 0,
              minimum: 0,
            },
            rates: {
              Ethereum: {
                ETH: 0,
                FLIP: 0,
                USDC: 0,
                USDT: 0,
              },
              Polkadot: {
                DOT: 0,
              },
              Bitcoin: {
                BTC: 0,
              },
              Arbitrum: {
                ETH: 0,
                USDC: 0,
              },
              Solana: {
                SOL: 0,
                USDC: 0,
              },
              Assethub: {
                DOT: 0,
                USDT: 0,
                USDC: 0,
              },
            },
          },
          internal_swap_network_fee: {
            standard_rate_and_minimum: {
              rate: 0,
              minimum: 0,
            },
            rates: {
              Ethereum: {
                ETH: 0,
                FLIP: 0,
                USDC: 0,
                USDT: 0,
              },
              Polkadot: {
                DOT: 0,
              },
              Bitcoin: {
                BTC: 0,
              },
              Arbitrum: {
                ETH: 0,
                USDC: 0,
              },
              Solana: {
                SOL: 0,
                USDC: 0,
              },
              Assethub: {
                DOT: 0,
                USDT: 0,
                USDC: 0,
              },
            },
          },
        },
      });
    });
  });

  describe('cfPoolsEnvironment', () => {
    it('parses the cfPoolsEnvironment response', () => {
      const result = cfPoolsEnvironment.parse({
        fees: {
          Ethereum: {
            ETH: {
              limit_order_fee_hundredth_pips: 20,
              range_order_fee_hundredth_pips: 20,
              range_order_total_fees_earned: {
                base: '0x86f0428ea65',
                quote: '0x996fb',
              },
              limit_order_total_fees_earned: {
                base: '0xa8cfbac89ee8',
                quote: '0x1275e',
              },
              range_total_swap_inputs: {
                base: '0x66f2a6d7322ee91',
                quote: '0x750e7a0f1',
              },
              limit_total_swap_inputs: {
                base: '0x80ca536174e92eb0',
                quote: '0xe13dd2e6',
              },
              quote_asset: {
                chain: 'Ethereum',
                asset: 'USDC',
              },
            },
            FLIP: {
              limit_order_fee_hundredth_pips: 20,
              range_order_fee_hundredth_pips: 20,
              range_order_total_fees_earned: {
                base: '0xccb9a0f848e',
                quote: '0x0',
              },
              limit_order_total_fees_earned: {
                base: '0x4c52d7d621a2d',
                quote: '0x468d7',
              },
              range_total_swap_inputs: {
                base: '0x9c3092e5cc1a8e5',
                quote: '0x0',
              },
              limit_total_swap_inputs: {
                base: '0x3a3aa7f8b6b2b6b51',
                quote: '0x35cf87380',
              },
              quote_asset: {
                chain: 'Ethereum',
                asset: 'USDC',
              },
            },
            USDT: {
              limit_order_fee_hundredth_pips: 5,
              range_order_fee_hundredth_pips: 5,
              range_order_total_fees_earned: {
                base: '0x18ac',
                quote: '0x42c17',
              },
              limit_order_total_fees_earned: {
                base: '0x19d',
                quote: '0xfb',
              },
              range_total_swap_inputs: {
                base: '0x4b195890',
                quote: '0xcbb6eea1b',
              },
              limit_total_swap_inputs: {
                base: '0x4e400a2',
                quote: '0x2fadcfb',
              },
              quote_asset: {
                chain: 'Ethereum',
                asset: 'USDC',
              },
            },
          },
          Polkadot: {
            DOT: {
              limit_order_fee_hundredth_pips: 20,
              range_order_fee_hundredth_pips: 20,
              range_order_total_fees_earned: {
                base: '0x6ff3',
                quote: '0x0',
              },
              limit_order_total_fees_earned: {
                base: '0x3fb505a',
                quote: '0xeb53',
              },
              range_total_swap_inputs: {
                base: '0x5568199c',
                quote: '0x0',
              },
              limit_total_swap_inputs: {
                base: '0x309a8bce81d',
                quote: '0xb383d1fa',
              },
              quote_asset: {
                chain: 'Ethereum',
                asset: 'USDC',
              },
            },
          },
          Bitcoin: {
            BTC: {
              limit_order_fee_hundredth_pips: 20,
              range_order_fee_hundredth_pips: 20,
              range_order_total_fees_earned: {
                base: '0x70',
                quote: '0x91aa0',
              },
              limit_order_total_fees_earned: {
                base: '0xab',
                quote: '0x49a9a',
              },
              range_total_swap_inputs: {
                base: '0x5356ca',
                quote: '0x6f212e4ff',
              },
              limit_total_swap_inputs: {
                base: '0x7fb017',
                quote: '0x3832ba417',
              },
              quote_asset: {
                chain: 'Ethereum',
                asset: 'USDC',
              },
            },
          },
          Arbitrum: {
            ETH: {
              limit_order_fee_hundredth_pips: 20,
              range_order_fee_hundredth_pips: 20,
              range_order_total_fees_earned: {
                base: '0xf3288bb9446',
                quote: '0x5ef8b',
              },
              limit_order_total_fees_earned: {
                base: '0x0',
                quote: '0x0',
              },
              range_total_swap_inputs: {
                base: '0xb982ebf13d4139a',
                quote: '0x487437e83',
              },
              limit_total_swap_inputs: {
                base: '0x0',
                quote: '0x0',
              },
              quote_asset: {
                chain: 'Ethereum',
                asset: 'USDC',
              },
            },
            USDC: {
              limit_order_fee_hundredth_pips: 20,
              range_order_fee_hundredth_pips: 20,
              range_order_total_fees_earned: {
                base: '0x18da0',
                quote: '0xe9203',
              },
              limit_order_total_fees_earned: {
                base: '0x0',
                quote: '0x0',
              },
              range_total_swap_inputs: {
                base: '0x12f561efa',
                quote: '0xb1db4cae8',
              },
              limit_total_swap_inputs: {
                base: '0x0',
                quote: '0x0',
              },
              quote_asset: {
                chain: 'Ethereum',
                asset: 'USDC',
              },
            },
          },
          Solana: {
            SOL: {
              limit_order_fee_hundredth_pips: 20,
              range_order_fee_hundredth_pips: 20,
              range_order_total_fees_earned: {
                base: '0x18da0',
                quote: '0xe9203',
              },
              limit_order_total_fees_earned: {
                base: '0x0',
                quote: '0x0',
              },
              range_total_swap_inputs: {
                base: '0x12f561efa',
                quote: '0xb1db4cae8',
              },
              limit_total_swap_inputs: {
                base: '0x0',
                quote: '0x0',
              },
              quote_asset: {
                chain: 'Ethereum',
                asset: 'USDC',
              },
            },
            USDC: {
              limit_order_fee_hundredth_pips: 20,
              range_order_fee_hundredth_pips: 20,
              range_order_total_fees_earned: {
                base: '0x18da0',
                quote: '0xe9203',
              },
              limit_order_total_fees_earned: {
                base: '0x0',
                quote: '0x0',
              },
              range_total_swap_inputs: {
                base: '0x12f561efa',
                quote: '0xb1db4cae8',
              },
              limit_total_swap_inputs: {
                base: '0x0',
                quote: '0x0',
              },
              quote_asset: {
                chain: 'Ethereum',
                asset: 'USDC',
              },
            },
          },
          Assethub: {
            DOT: {
              limit_order_fee_hundredth_pips: 20,
              range_order_fee_hundredth_pips: 20,
              range_order_total_fees_earned: {
                base: '0x6ff3',
                quote: '0x0',
              },
              limit_order_total_fees_earned: {
                base: '0x3fb505a',
                quote: '0xeb53',
              },
              range_total_swap_inputs: {
                base: '0x5568199c',
                quote: '0x0',
              },
              limit_total_swap_inputs: {
                base: '0x309a8bce81d',
                quote: '0xb383d1fa',
              },
              quote_asset: {
                chain: 'Ethereum',
                asset: 'USDC',
              },
            },
            USDC: {
              limit_order_fee_hundredth_pips: 5,
              range_order_fee_hundredth_pips: 5,
              range_order_total_fees_earned: {
                base: '0x18ac',
                quote: '0x42c17',
              },
              limit_order_total_fees_earned: {
                base: '0x19d',
                quote: '0xfb',
              },
              range_total_swap_inputs: {
                base: '0x4b195890',
                quote: '0xcbb6eea1b',
              },
              limit_total_swap_inputs: {
                base: '0x4e400a2',
                quote: '0x2fadcfb',
              },
              quote_asset: {
                chain: 'Ethereum',
                asset: 'USDC',
              },
            },
            USDT: {
              limit_order_fee_hundredth_pips: 5,
              range_order_fee_hundredth_pips: 5,
              range_order_total_fees_earned: {
                base: '0x18ac',
                quote: '0x42c17',
              },
              limit_order_total_fees_earned: {
                base: '0x19d',
                quote: '0xfb',
              },
              range_total_swap_inputs: {
                base: '0x4b195890',
                quote: '0xcbb6eea1b',
              },
              limit_total_swap_inputs: {
                base: '0x4e400a2',
                quote: '0x2fadcfb',
              },
              quote_asset: {
                chain: 'Ethereum',
                asset: 'USDC',
              },
            },
          },
        },
      });

      expect(result.fees.Solana.SOL).not.toBeNull();
      expect(result.fees.Solana.USDC).not.toBeNull();
    });
  });

  describe('cfPoolDepth', () => {
    it('parses the cfPoolDepth response', () => {
      const result = cfPoolDepth.parse({
        asks: {
          limit_orders: {
            price: null,
            depth: '0x0',
          },
          range_orders: {
            price: '0x44b82fa09b5a53ffffffd38ad',
            depth: '0x363466684d81170047',
          },
        },
        bids: {
          limit_orders: {
            price: null,
            depth: '0x0',
          },
          range_orders: {
            price: '0x44b82fa09b5a53ffffffd38ad',
            depth: '0xe8ceaf2eff',
          },
        },
      });

      expect(result?.asks.limit_orders.depth).not.toBeNull();
      expect(result?.asks.range_orders.depth).not.toBeNull();
      expect(result?.bids.limit_orders.depth).not.toBeNull();
      expect(result?.bids.range_orders.depth).not.toBeNull();
    });
  });

  describe('cfAccounts', () => {
    it('parses the cfAccounts response', () => {
      const result = cfAccounts.parse([
        ['cFL8fmgKZcchhtLagBH2GKfsuWxBqUaD5CYE1m7DFb8DBSLJ1', 'Chainflip Testnet LP BOOST'],
        ['cFNYfLm7YEjWenMB7pBRGMTaawyhYLcRxgrNUqsvZBrKNXvfw', ''],
        ['cFPdef3hF5zEwbWUG6ZaCJ3X7mTvEeAog7HxZ8QyFcCgDVGDM', 'Chainflip Testnet LP 1'],
        ['cFLxadYLtGwLKA4QZ7XM7KEtmwEohJJy4rVGCG6XK6qS1reye', ''],
        ['cFM8kRvLBXagj6ZXvrt7wCM4jGmHvb5842jTtXXg3mRHjrvKy', 'Chainflip Testnet Broker 1'],
      ]);

      expect(result.length).toEqual(5);
      expect(result[0]).toEqual([
        'cFL8fmgKZcchhtLagBH2GKfsuWxBqUaD5CYE1m7DFb8DBSLJ1',
        'Chainflip Testnet LP BOOST',
      ]);
      expect(result[1]).toEqual(['cFNYfLm7YEjWenMB7pBRGMTaawyhYLcRxgrNUqsvZBrKNXvfw', '']);
    });
  });

  describe('cfGetTradingStrategies', () => {
    it('parses the cfGetTradingStrategies response', () => {
      const result = cfGetTradingStrategies.parse(tradingStrategies);

      expect(result.length).toEqual(4);
    });
  });
  describe('cfGetTradingStrategyLimits', () => {
    it('parses the cfGetTradingStrategyLimits response', () => {
      const result = cfGetTradingStrategyLimits.parse(tradingStrategiesLimits);

      expect(result.minimum_deployment_amount.Arbitrum.USDC).toEqual(20000000000);
      expect(result.minimum_deployment_amount.Bitcoin.BTC).toEqual(null);

      expect(result.minimum_added_funds_amount.Solana.USDC).toEqual(10000000);
      expect(result.minimum_added_funds_amount.Ethereum.ETH).toEqual(null);
    });
  });

  describe('cfAccountInfo', () => {
    it('parses the cfAccountInfo for an operator', () => {
      const result = cfAccountInfo.parse(cfAccountInfoOperator);

      expect(result).toMatchInlineSnapshot(`
        {
          "active_delegation": {
            "delegation_fee_bps": 1500,
            "delegators": {
              "cFHsUq1uK5opJudRDczt7w4baiRDHR6Kdezw77u2JnRnCGKcs": 1000000000000000000000n,
            },
            "operator": "cFMjXCTxTHVkSqbKzeVwJ25TJxLqc1Vn9usPgUGmZhsyvHRQZ",
            "validators": {
              "cFNkiayhWvppDY5zSzG8rAYMaqbunLBAAbBQcAgFF4x1jaMSy": 5003891662143612383478n,
            },
          },
          "allowed": [],
          "asset_balances": {
            "Arbitrum": {
              "ETH": 0n,
              "USDC": 0n,
            },
            "Assethub": {
              "DOT": 0n,
              "USDC": 0n,
              "USDT": 0n,
            },
            "Bitcoin": {
              "BTC": 0n,
            },
            "Ethereum": {
              "ETH": 0n,
              "FLIP": 0n,
              "USDC": 0n,
              "USDT": 0n,
            },
            "Solana": {
              "SOL": 0n,
              "USDC": 0n,
            },
          },
          "blocked": [
            "cFNfitvPd2acNNFgijVN3Ls4gG112PZPq7sY2FGtPgEk25wV9",
          ],
          "bond": 0n,
          "estimated_redeemable_balance": 1000164110353054811846n,
          "flip_balance": 1000164110353054811846n,
          "role": "operator",
          "upcoming_delegation": {
            "delegation_acceptance": "Allow",
            "delegation_fee_bps": 1500,
            "delegators": {
              "cFHsUq1uK5opJudRDczt7w4baiRDHR6Kdezw77u2JnRnCGKcs": 900000000000000000000n,
            },
            "validators": {
              "cFNkiayhWvppDY5zSzG8rAYMaqbunLBAAbBQcAgFF4x1jaMSy": 9999996796922000000n,
            },
          },
          "vanity_name": "Buttoness",
        }
      `);
    });

    it("parses the latest cfAccountInfo schema for an lp on networks that haven't been upgraded yet", () => {
      const result = cfAccountInfo.parse({
        ...liquidityProviderAccount,
        lending_positions: undefined,
        collateral_balances: undefined,
      });

      expect(result).toMatchSnapshot();
    });

    it('parses the latest cfAccountInfo schema for an lp', () => {
      const result = cfAccountInfo.parse(liquidityProviderAccount);

      expect(result).toMatchSnapshot();
    });
  });

  describe('cfOraclePrices', () => {
    it('parses the cfOraclePrices response', () => {
      const result = cfOraclePrices.parse(cfOraclePrice);
      expect(result.length).toEqual(5);
    });
  });

  describe('cfLendingPools', () => {
    it('parses the cfLendingPools response', () => {
      const result = cfLendingPools.parse(lendingPools);
      expect(result.length).toEqual(2);
      expect(result).toMatchInlineSnapshot(`
        [
          {
            "asset": {
              "asset": "BTC",
              "chain": "Bitcoin",
            },
            "available_amount": 200000000n,
            "current_interest_rate": 200,
            "interest_rate_curve": {
              "interest_at_junction_utilisation": 80000,
              "interest_at_max_utilisation": 500000,
              "interest_at_zero_utilisation": 20000,
              "junction_utilisation": 900000,
            },
            "liquidation_fee": 500,
            "origination_fee": 100,
            "total_amount": 200000000n,
            "utilisation_rate": 0,
          },
          {
            "asset": {
              "asset": "USDC",
              "chain": "Solana",
            },
            "available_amount": 0n,
            "current_interest_rate": 5000,
            "interest_rate_curve": {
              "interest_at_junction_utilisation": 80000,
              "interest_at_max_utilisation": 500000,
              "interest_at_zero_utilisation": 20000,
              "junction_utilisation": 900000,
            },
            "liquidation_fee": 500,
            "origination_fee": 100,
            "total_amount": 0n,
            "utilisation_rate": 10000,
          },
        ]
      `);
    });
  });
  describe('cfLendingConfig', () => {
    it('parses the cfLendingConfig response', () => {
      const result = cfLendingConfig.parse(lendingConfig);
      expect(result).toMatchInlineSnapshot(`
        {
          "fee_swap_interval_blocks": 10,
          "fee_swap_max_oracle_slippage": 50,
          "fee_swap_threshold_usd": 20000000n,
          "hard_liquidation_max_oracle_slippage": 500,
          "interest_collection_threshold_usd": 100000n,
          "interest_payment_interval_blocks": 10,
          "liquidation_swap_chunk_size_usd": 10000000000n,
          "ltv_thresholds": {
            "hard_liquidation": 950000,
            "hard_liquidation_abort": 930000,
            "low_ltv": 500000,
            "soft_liquidation": 900000,
            "soft_liquidation_abort": 880000,
            "target": 800000,
            "topup": 850000,
          },
          "minimum_loan_amount_usd": 100000000n,
          "minimum_update_collateral_amount_usd": 10000000n,
          "minimum_update_loan_amount_usd": 10000000n,
          "network_fee_contributions": {
            "extra_interest": 10000,
            "from_liquidation_fee": 200000,
            "from_origination_fee": 200000,
            "low_ltv_penalty_max": 10000,
          },
          "soft_liquidation_max_oracle_slippage": 50,
        }
      `);
    });
  });

  describe('cfLoanAccounts', () => {
    it('parses the cfLoanAccounts response', () => {
      const result = cfLoanAccounts.parse(loanAccounts);
      expect(result).toMatchInlineSnapshot(`
        [
          {
            "account": "cFL8fmgKZcchhtLagBH2GKfsuWxBqUaD5CYE1m7DFb8DBSLJ1",
            "collateral": [
              {
                "amount": 3n,
                "asset": "BTC",
                "chain": "Bitcoin",
              },
            ],
            "liquidation_status": {
              "is_hard": true,
              "liquidation_swaps": [
                {
                  "loan_id": 1,
                  "swap_request_id": 1,
                },
              ],
            },
            "loans": [
              {
                "asset": {
                  "asset": "USDC",
                  "chain": "Ethereum",
                },
                "loan_id": 1,
                "principal_amount": 1000n,
              },
            ],
            "ltv_ratio": 1333333333n,
            "primary_collateral_asset": {
              "asset": "BTC",
              "chain": "Bitcoin",
            },
          },
        ]
      `);
    });
  });

  describe('cfLendingPoolSupplyBalances', () => {
    it('parses the cfLendingPoolSupplyBalances response', () => {
      const result = cfLendingPoolSupplyBalances.parse(lendingPoolSupplyBalances);
      expect(result).toMatchInlineSnapshot(`
        [
          {
            "asset": "BTC",
            "chain": "Bitcoin",
            "positions": [
              {
                "lp_id": "cFKKYDgKLHgKRfHEwTPsGj2SJmmha5mGqajHEPXo1Chaqa96Q",
                "total_amount": 1999040000n,
              },
              {
                "lp_id": "cFL8fmgKZcchhtLagBH2GKfsuWxBqUaD5CYE1m7DFb8DBSLJ1",
                "total_amount": 200000000n,
              },
            ],
          },
          {
            "asset": "ETH",
            "chain": "Ethereum",
            "positions": [
              {
                "lp_id": "cFKKYDgKLHgKRfHEwTPsGj2SJmmha5mGqajHEPXo1Chaqa96Q",
                "total_amount": 100000000000000000000n,
              },
            ],
          },
          {
            "asset": "SOL",
            "chain": "Solana",
            "positions": [
              {
                "lp_id": "cFKKYDgKLHgKRfHEwTPsGj2SJmmha5mGqajHEPXo1Chaqa96Q",
                "total_amount": 100000000000n,
              },
            ],
          },
          {
            "asset": "USDT",
            "chain": "Ethereum",
            "positions": [
              {
                "lp_id": "cFKKYDgKLHgKRfHEwTPsGj2SJmmha5mGqajHEPXo1Chaqa96Q",
                "total_amount": 10000000000n,
              },
            ],
          },
          {
            "asset": "USDC",
            "chain": "Ethereum",
            "positions": [
              {
                "lp_id": "cFKKYDgKLHgKRfHEwTPsGj2SJmmha5mGqajHEPXo1Chaqa96Q",
                "total_amount": 10000096000n,
              },
            ],
          },
        ]
      `);
    });
  });

  describe('cfMonitoringSimulateAuction', () => {
    it('parses the cfMonitoringSimulateAuction response', () => {
      const result = cfMonitoringSimulateAuction.parse(monitoringSimulateAuction);
      expect(result).toMatchSnapshot();
    });
  });

  describe('cfSafeModeStatuses', () => {
    it('parses the 1.11 cfSafeModeStatuses response', () => {
      const result = cfSafeModeStatuses.parse(safeModeStatuses);
      expect(result).toMatchInlineSnapshot(`
        {
          "asset_balances": {
            "reconciliation_enabled": true,
          },
          "broadcast_arbitrum": {
            "egress_witnessing_enabled": true,
            "retry_enabled": true,
          },
          "broadcast_assethub": {
            "egress_witnessing_enabled": true,
            "retry_enabled": true,
          },
          "broadcast_bitcoin": {
            "egress_witnessing_enabled": true,
            "retry_enabled": true,
          },
          "broadcast_ethereum": {
            "egress_witnessing_enabled": true,
            "retry_enabled": true,
          },
          "broadcast_polkadot": {
            "egress_witnessing_enabled": true,
            "retry_enabled": true,
          },
          "broadcast_solana": {
            "egress_witnessing_enabled": true,
            "retry_enabled": true,
          },
          "elections_generic": {
            "oracle_price_elections": true,
          },
          "emissions": {
            "emissions_sync_enabled": true,
          },
          "funding": {
            "redeem_enabled": true,
          },
          "ingress_egress_arbitrum": {
            "boost_deposits_enabled": true,
            "deposit_channel_creation_enabled": true,
            "deposit_channel_witnessing_enabled": true,
            "vault_deposit_witnessing_enabled": true,
          },
          "ingress_egress_assethub": {
            "boost_deposits_enabled": true,
            "deposit_channel_creation_enabled": true,
            "deposit_channel_witnessing_enabled": true,
            "vault_deposit_witnessing_enabled": true,
          },
          "ingress_egress_bitcoin": {
            "boost_deposits_enabled": true,
            "deposit_channel_creation_enabled": true,
            "deposit_channel_witnessing_enabled": true,
            "vault_deposit_witnessing_enabled": true,
          },
          "ingress_egress_ethereum": {
            "boost_deposits_enabled": true,
            "deposit_channel_creation_enabled": true,
            "deposit_channel_witnessing_enabled": true,
            "vault_deposit_witnessing_enabled": true,
          },
          "ingress_egress_polkadot": {
            "boost_deposits_enabled": true,
            "deposit_channel_creation_enabled": true,
            "deposit_channel_witnessing_enabled": true,
            "vault_deposit_witnessing_enabled": true,
          },
          "ingress_egress_solana": {
            "boost_deposits_enabled": true,
            "deposit_channel_creation_enabled": true,
            "deposit_channel_witnessing_enabled": true,
            "vault_deposit_witnessing_enabled": true,
          },
          "lending_pools": {
            "add_boost_funds_enabled": true,
            "stop_boosting_enabled": true,
          },
          "liquidity_provider": {
            "deposit_enabled": true,
            "internal_swaps_enabled": true,
            "withdrawal_enabled": true,
          },
          "pools": {
            "limit_order_update_enabled": true,
            "range_order_update_enabled": true,
          },
          "reputation": {
            "reporting_enabled": true,
          },
          "swapping": {
            "broker_registration_enabled": true,
            "swaps_enabled": true,
            "withdrawals_enabled": true,
          },
          "threshold_signature_bitcoin": {
            "slashing_enabled": true,
          },
          "threshold_signature_evm": {
            "slashing_enabled": true,
          },
          "threshold_signature_polkadot": {
            "slashing_enabled": true,
          },
          "threshold_signature_solana": {
            "slashing_enabled": true,
          },
          "trading_strategies": {
            "strategy_closure_enabled": true,
            "strategy_execution_enabled": true,
            "strategy_updates_enabled": true,
          },
          "validator": {
            "authority_rotation_enabled": true,
            "start_bidding_enabled": true,
            "stop_bidding_enabled": true,
          },
          "witnesser": "CodeGreen",
        }
      `);
    });

    it('parses the 1.12 cfSafeModeStatuses response', () => {
      const lendingPoolEnabledRpcAssets = chainflipAssets
        .filter((asset) => asset !== 'Dot')
        .map((asset) => internalAssetToRpcAsset[asset]);

      const result = cfSafeModeStatuses.parse({
        ...safeModeStatuses,
        lending_pools: {
          ...safeModeStatuses.lending_pools,
          borrowing_enabled: lendingPoolEnabledRpcAssets,
          add_lender_funds_enabled: lendingPoolEnabledRpcAssets,
          withdraw_lender_funds_enabled: lendingPoolEnabledRpcAssets,
          add_collateral_enabled: lendingPoolEnabledRpcAssets,
          remove_collateral_enabled: lendingPoolEnabledRpcAssets,
        },
      });
      expect(result).toMatchInlineSnapshot(`
        {
          "asset_balances": {
            "reconciliation_enabled": true,
          },
          "broadcast_arbitrum": {
            "egress_witnessing_enabled": true,
            "retry_enabled": true,
          },
          "broadcast_assethub": {
            "egress_witnessing_enabled": true,
            "retry_enabled": true,
          },
          "broadcast_bitcoin": {
            "egress_witnessing_enabled": true,
            "retry_enabled": true,
          },
          "broadcast_ethereum": {
            "egress_witnessing_enabled": true,
            "retry_enabled": true,
          },
          "broadcast_polkadot": {
            "egress_witnessing_enabled": true,
            "retry_enabled": true,
          },
          "broadcast_solana": {
            "egress_witnessing_enabled": true,
            "retry_enabled": true,
          },
          "elections_generic": {
            "oracle_price_elections": true,
          },
          "emissions": {
            "emissions_sync_enabled": true,
          },
          "funding": {
            "redeem_enabled": true,
          },
          "ingress_egress_arbitrum": {
            "boost_deposits_enabled": true,
            "deposit_channel_creation_enabled": true,
            "deposit_channel_witnessing_enabled": true,
            "vault_deposit_witnessing_enabled": true,
          },
          "ingress_egress_assethub": {
            "boost_deposits_enabled": true,
            "deposit_channel_creation_enabled": true,
            "deposit_channel_witnessing_enabled": true,
            "vault_deposit_witnessing_enabled": true,
          },
          "ingress_egress_bitcoin": {
            "boost_deposits_enabled": true,
            "deposit_channel_creation_enabled": true,
            "deposit_channel_witnessing_enabled": true,
            "vault_deposit_witnessing_enabled": true,
          },
          "ingress_egress_ethereum": {
            "boost_deposits_enabled": true,
            "deposit_channel_creation_enabled": true,
            "deposit_channel_witnessing_enabled": true,
            "vault_deposit_witnessing_enabled": true,
          },
          "ingress_egress_polkadot": {
            "boost_deposits_enabled": true,
            "deposit_channel_creation_enabled": true,
            "deposit_channel_witnessing_enabled": true,
            "vault_deposit_witnessing_enabled": true,
          },
          "ingress_egress_solana": {
            "boost_deposits_enabled": true,
            "deposit_channel_creation_enabled": true,
            "deposit_channel_witnessing_enabled": true,
            "vault_deposit_witnessing_enabled": true,
          },
          "lending_pools": {
            "add_boost_funds_enabled": true,
            "add_collateral_enabled": [
              {
                "asset": "USDC",
                "chain": "Ethereum",
              },
              {
                "asset": "USDT",
                "chain": "Ethereum",
              },
              {
                "asset": "FLIP",
                "chain": "Ethereum",
              },
              {
                "asset": "ETH",
                "chain": "Ethereum",
              },
              {
                "asset": "BTC",
                "chain": "Bitcoin",
              },
              {
                "asset": "USDC",
                "chain": "Arbitrum",
              },
              {
                "asset": "ETH",
                "chain": "Arbitrum",
              },
              {
                "asset": "SOL",
                "chain": "Solana",
              },
              {
                "asset": "USDC",
                "chain": "Solana",
              },
              {
                "asset": "DOT",
                "chain": "Assethub",
              },
              {
                "asset": "USDT",
                "chain": "Assethub",
              },
              {
                "asset": "USDC",
                "chain": "Assethub",
              },
            ],
            "add_lender_funds_enabled": [
              {
                "asset": "USDC",
                "chain": "Ethereum",
              },
              {
                "asset": "USDT",
                "chain": "Ethereum",
              },
              {
                "asset": "FLIP",
                "chain": "Ethereum",
              },
              {
                "asset": "ETH",
                "chain": "Ethereum",
              },
              {
                "asset": "BTC",
                "chain": "Bitcoin",
              },
              {
                "asset": "USDC",
                "chain": "Arbitrum",
              },
              {
                "asset": "ETH",
                "chain": "Arbitrum",
              },
              {
                "asset": "SOL",
                "chain": "Solana",
              },
              {
                "asset": "USDC",
                "chain": "Solana",
              },
              {
                "asset": "DOT",
                "chain": "Assethub",
              },
              {
                "asset": "USDT",
                "chain": "Assethub",
              },
              {
                "asset": "USDC",
                "chain": "Assethub",
              },
            ],
            "borrowing_enabled": [
              {
                "asset": "USDC",
                "chain": "Ethereum",
              },
              {
                "asset": "USDT",
                "chain": "Ethereum",
              },
              {
                "asset": "FLIP",
                "chain": "Ethereum",
              },
              {
                "asset": "ETH",
                "chain": "Ethereum",
              },
              {
                "asset": "BTC",
                "chain": "Bitcoin",
              },
              {
                "asset": "USDC",
                "chain": "Arbitrum",
              },
              {
                "asset": "ETH",
                "chain": "Arbitrum",
              },
              {
                "asset": "SOL",
                "chain": "Solana",
              },
              {
                "asset": "USDC",
                "chain": "Solana",
              },
              {
                "asset": "DOT",
                "chain": "Assethub",
              },
              {
                "asset": "USDT",
                "chain": "Assethub",
              },
              {
                "asset": "USDC",
                "chain": "Assethub",
              },
            ],
            "remove_collateral_enabled": [
              {
                "asset": "USDC",
                "chain": "Ethereum",
              },
              {
                "asset": "USDT",
                "chain": "Ethereum",
              },
              {
                "asset": "FLIP",
                "chain": "Ethereum",
              },
              {
                "asset": "ETH",
                "chain": "Ethereum",
              },
              {
                "asset": "BTC",
                "chain": "Bitcoin",
              },
              {
                "asset": "USDC",
                "chain": "Arbitrum",
              },
              {
                "asset": "ETH",
                "chain": "Arbitrum",
              },
              {
                "asset": "SOL",
                "chain": "Solana",
              },
              {
                "asset": "USDC",
                "chain": "Solana",
              },
              {
                "asset": "DOT",
                "chain": "Assethub",
              },
              {
                "asset": "USDT",
                "chain": "Assethub",
              },
              {
                "asset": "USDC",
                "chain": "Assethub",
              },
            ],
            "stop_boosting_enabled": true,
            "withdraw_lender_funds_enabled": [
              {
                "asset": "USDC",
                "chain": "Ethereum",
              },
              {
                "asset": "USDT",
                "chain": "Ethereum",
              },
              {
                "asset": "FLIP",
                "chain": "Ethereum",
              },
              {
                "asset": "ETH",
                "chain": "Ethereum",
              },
              {
                "asset": "BTC",
                "chain": "Bitcoin",
              },
              {
                "asset": "USDC",
                "chain": "Arbitrum",
              },
              {
                "asset": "ETH",
                "chain": "Arbitrum",
              },
              {
                "asset": "SOL",
                "chain": "Solana",
              },
              {
                "asset": "USDC",
                "chain": "Solana",
              },
              {
                "asset": "DOT",
                "chain": "Assethub",
              },
              {
                "asset": "USDT",
                "chain": "Assethub",
              },
              {
                "asset": "USDC",
                "chain": "Assethub",
              },
            ],
          },
          "liquidity_provider": {
            "deposit_enabled": true,
            "internal_swaps_enabled": true,
            "withdrawal_enabled": true,
          },
          "pools": {
            "limit_order_update_enabled": true,
            "range_order_update_enabled": true,
          },
          "reputation": {
            "reporting_enabled": true,
          },
          "swapping": {
            "broker_registration_enabled": true,
            "swaps_enabled": true,
            "withdrawals_enabled": true,
          },
          "threshold_signature_bitcoin": {
            "slashing_enabled": true,
          },
          "threshold_signature_evm": {
            "slashing_enabled": true,
          },
          "threshold_signature_polkadot": {
            "slashing_enabled": true,
          },
          "threshold_signature_solana": {
            "slashing_enabled": true,
          },
          "trading_strategies": {
            "strategy_closure_enabled": true,
            "strategy_execution_enabled": true,
            "strategy_updates_enabled": true,
          },
          "validator": {
            "authority_rotation_enabled": true,
            "start_bidding_enabled": true,
            "stop_bidding_enabled": true,
          },
          "witnesser": "CodeGreen",
        }
      `);
    });
  });
});
