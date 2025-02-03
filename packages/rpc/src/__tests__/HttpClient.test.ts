import { type HexString } from '@chainflip/utils/types';
import { Server } from 'http';
import { type AddressInfo } from 'net';
import { promisify } from 'util';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { type z } from 'zod';
import { type JsonRpcRequest, type RpcMethod } from '../common';
import { HttpClient } from '../index';
import {
  type AssetAndChain,
  type broker,
  type brokerRequestSwapDepositAddress,
  type cfEnvironment,
  type cfIngressEgressEnvironment,
  type cfPoolOrders,
  type cfPoolPriceV2,
  type cfPoolsEnvironment,
  type cfSwapRateV2,
  type cfSwappingEnvironment,
  type liquidityProvider,
  type unregistered,
  type validator,
  type cfFundingEnvironment,
  type cfSwapRate,
  type cfSwapRateV3,
  type brokerRequestSwapParameterEncoding,
} from '../parsers';

const supportedAssets = [
  { chain: 'Ethereum', asset: 'ETH' },
  { chain: 'Ethereum', asset: 'FLIP' },
  { chain: 'Ethereum', asset: 'USDC' },
  { chain: 'Ethereum', asset: 'USDT' },
  { chain: 'Polkadot', asset: 'DOT' },
  { chain: 'Bitcoin', asset: 'BTC' },
  { chain: 'Arbitrum', asset: 'ETH' },
  { chain: 'Arbitrum', asset: 'USDC' },
  // { chain: 'Solana', asset: 'SOL' },
];

const ingressEgressEnvironment: z.input<typeof cfIngressEgressEnvironment> = {
  minimum_deposit_amounts: {
    Ethereum: { ETH: '0x0', FLIP: '0x0', USDC: '0x0', USDT: '0x0' },
    Polkadot: { DOT: '0x0' },
    Bitcoin: { BTC: '0x0' },
    Arbitrum: { ETH: '0x0', USDC: '0x0' },
    // Solana: { SOL: '0x0' },
  },
  ingress_fees: {
    Ethereum: { ETH: '0x55730', FLIP: '0x0', USDC: '0x0', USDT: '0x0' },
    Polkadot: { DOT: '0xbc28f20' },
    Bitcoin: { BTC: '0x4e' },
    Arbitrum: { ETH: '0x574b457d400', USDC: '0x231b' },
    // Solana: { SOL: '0xb0' },
  },
  egress_fees: {
    Ethereum: { ETH: '0x77a10', FLIP: '0x0', USDC: '0x0', USDT: '0x0' },
    Polkadot: { DOT: '0xbc4d910' },
    Bitcoin: { BTC: '0xb0' },
    Arbitrum: { ETH: '0x74645ca7000', USDC: '0x2701' },
    // Solana: { SOL: '0xb0' },
  },
  witness_safety_margins: {
    Bitcoin: 2,
    Polkadot: null,
    Ethereum: 2,
    Arbitrum: 1,
    // Solana: 1,
  },
  egress_dust_limits: {
    Ethereum: { ETH: '0x1', FLIP: '0x1', USDC: '0x1', USDT: '0x1' },
    Polkadot: { DOT: '0x1' },
    Bitcoin: { BTC: '0x258' },
    Arbitrum: { ETH: '0x1', USDC: '0x1' },
    // Solana: { SOL: '0x1' },
  },
  channel_opening_fees: {
    Arbitrum: '0x0',
    Ethereum: '0x0',
    Polkadot: '0x0',
    Bitcoin: '0x0',
    // Solana: '0x0',
  },
  max_swap_retry_duration_blocks: {
    Arbitrum: 1,
    Ethereum: 1,
    Polkadot: 1,
    Bitcoin: 1,
    // Solana: 1,
  },
};

const swappingEnvironment: z.input<typeof cfSwappingEnvironment> = {
  maximum_swap_amounts: {
    Ethereum: {
      ETH: '0x10000',
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
    // Solana: {
    //   SOL: null,
    // },
  },
  network_fee_hundredth_pips: 1000,
};

const fundingEnvironment: z.input<typeof cfFundingEnvironment> = {
  redemption_tax: '0x4563918244f40000',
  minimum_funding_amount: '0x8ac7230489e80000',
};

const poolsEnvironment: z.input<typeof cfPoolsEnvironment> = {
  fees: {
    Ethereum: {
      ETH: {
        limit_order_fee_hundredth_pips: 20,
        range_order_fee_hundredth_pips: 20,
        range_order_total_fees_earned: {
          base: '0x125f2dd30ff2',
          quote: '0x462c',
        },
        limit_order_total_fees_earned: {
          base: '0x0',
          quote: '0x0',
        },
        range_total_swap_inputs: {
          base: '0xe042b46e94741ae',
          quote: '0x35856b6b',
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
      FLIP: {
        limit_order_fee_hundredth_pips: 20,
        range_order_fee_hundredth_pips: 20,
        range_order_total_fees_earned: {
          base: '0x4ef',
          quote: '0xc8',
        },
        limit_order_total_fees_earned: {
          base: '0x0',
          quote: '0x0',
        },
        range_total_swap_inputs: {
          base: '0x3c2d2cc',
          quote: '0x987d11',
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
      // @ts-expect-error we want to make sure we ignore this field
      USDC: null,
      USDT: {
        limit_order_fee_hundredth_pips: 20,
        range_order_fee_hundredth_pips: 20,
        range_order_total_fees_earned: {
          base: '0x0',
          quote: '0x0',
        },
        limit_order_total_fees_earned: {
          base: '0x0',
          quote: '0x0',
        },
        range_total_swap_inputs: {
          base: '0x0',
          quote: '0x0',
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
          base: '0x0',
          quote: '0x0',
        },
        limit_order_total_fees_earned: {
          base: '0x0',
          quote: '0x0',
        },
        range_total_swap_inputs: {
          base: '0x0',
          quote: '0x0',
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
          base: '0xb4',
          quote: '0x4e1c',
        },
        limit_order_total_fees_earned: {
          base: '0x0',
          quote: '0x0',
        },
        range_total_swap_inputs: {
          base: '0x89470a',
          quote: '0x3b96bc30',
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
    Arbitrum: {
      ETH: {
        limit_order_fee_hundredth_pips: 20,
        range_order_fee_hundredth_pips: 20,
        range_order_total_fees_earned: {
          base: '0x0',
          quote: '0x0',
        },
        limit_order_total_fees_earned: {
          base: '0x0',
          quote: '0x0',
        },
        range_total_swap_inputs: {
          base: '0x0',
          quote: '0x0',
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
          base: '0x0',
          quote: '0x0',
        },
        limit_order_total_fees_earned: {
          base: '0x0',
          quote: '0x0',
        },
        range_total_swap_inputs: {
          base: '0x0',
          quote: '0x0',
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
          base: '0xb4',
          quote: '0x4e1c',
        },
        limit_order_total_fees_earned: {
          base: '0x0',
          quote: '0x0',
        },
        range_total_swap_inputs: {
          base: '0x89470a',
          quote: '0x3b96bc30',
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
  },
};

const environment: z.input<typeof cfEnvironment> = {
  ingress_egress: ingressEgressEnvironment,
  swapping: swappingEnvironment,
  funding: fundingEnvironment,
  pools: poolsEnvironment,
};

const runtimeVersion = {
  specName: 'chainflip-node',
  implName: 'chainflip-node',
  authoringVersion: 1,
  specVersion: 141,
  implVersion: 1,
  apis: [
    ['0xb7fb30db9d96703a', 1],
    ['0xdf6acb689907609b', 4],
    ['0x37e397fc7c91f5e4', 2],
    ['0x40fe3ad401f8959a', 6],
    ['0xd2bc9897eed08f15', 3],
    ['0xf78b278be53f454c', 2],
    ['0xdd718d5cc53262d4', 1],
    ['0xab3c0572291feb8b', 1],
    ['0xed99c5acb25eedf5', 3],
    ['0xbc9d89904f5b923f', 1],
    ['0x37c8bb1350a9a2a8', 4],
    ['0xf3ff14d5ab527059', 3],
    ['0xfbc577b9d747efd6', 1],
  ],
  transactionVersion: 12,
  stateVersion: 1,
};

const boostPoolsDepth = [
  { chain: 'Bitcoin', asset: 'BTC', tier: 5, available_amount: '0x98e888' },
  { chain: 'Bitcoin', asset: 'BTC', tier: 30, available_amount: '0x989680' },
  { chain: 'Bitcoin', asset: 'BTC', tier: 10, available_amount: '0x989680' },
];

const swapRateV2: z.input<typeof cfSwapRateV2> = {
  intermediary: null,
  output: '0xffbc',
  network_fee: { chain: 'Ethereum', asset: 'USDC', amount: '0x42' },
  ingress_fee: { chain: 'Ethereum', asset: 'USDT', amount: '0x0' },
  egress_fee: { chain: 'Ethereum', asset: 'USDC', amount: '0x0' },
};

const swapRateV3: z.input<typeof cfSwapRateV3> = {
  intermediary: null,
  output: '0xffbc',
  network_fee: { chain: 'Ethereum', asset: 'USDC', amount: '0x42' },
  ingress_fee: { chain: 'Ethereum', asset: 'USDT', amount: '0x0' },
  egress_fee: { chain: 'Ethereum', asset: 'USDC', amount: '0x0' },
  broker_commission: { chain: 'Ethereum', asset: 'USDC', amount: '0x0' },
};

const swapParameterEncodingBitcoin: z.input<typeof brokerRequestSwapParameterEncoding> = {
  intermediary: null,
  output: '0xffbc',
  network_fee: { chain: 'Ethereum', asset: 'USDC', amount: '0x42' },
  ingress_fee: { chain: 'Ethereum', asset: 'USDT', amount: '0x0' },
  egress_fee: { chain: 'Ethereum', asset: 'USDC', amount: '0x0' },
  broker_commission: { chain: 'Ethereum', asset: 'USDC', amount: '0x0' },
};

const swapParameterEncodingEthereum: z.input<typeof brokerRequestSwapParameterEncoding> = {
  intermediary: null,
  output: '0xffbc',
  network_fee: { chain: 'Ethereum', asset: 'USDC', amount: '0x42' },
  ingress_fee: { chain: 'Ethereum', asset: 'USDT', amount: '0x0' },
  egress_fee: { chain: 'Ethereum', asset: 'USDC', amount: '0x0' },
  broker_commission: { chain: 'Ethereum', asset: 'USDC', amount: '0x0' },
};

const swapParameterEncodingSolana: z.input<typeof brokerRequestSwapParameterEncoding> = {
  intermediary: null,
  output: '0xffbc',
  network_fee: { chain: 'Ethereum', asset: 'USDC', amount: '0x42' },
  ingress_fee: { chain: 'Ethereum', asset: 'USDT', amount: '0x0' },
  egress_fee: { chain: 'Ethereum', asset: 'USDC', amount: '0x0' },
  broker_commission: { chain: 'Ethereum', asset: 'USDC', amount: '0x0' },
};

const swapDepositAddress: z.input<typeof brokerRequestSwapDepositAddress> = {
  channel_id: 1,
  address: '0x1234',
  issued_block: 1,
  channel_opening_fee: '0x0',
  source_chain_expiry_block: 1,
};

const unregisteredAccount: z.input<typeof unregistered> = {
  role: 'unregistered',
  flip_balance: '0x0',
};

const liquidityProviderAccount: z.input<typeof liquidityProvider> = {
  role: 'liquidity_provider',
  balances: {
    Ethereum: { ETH: '0x0', FLIP: '0x0', USDC: '0x0', USDT: '0x0' },
    Polkadot: { DOT: '0x0' },
    Bitcoin: { BTC: '0x0' },
    Arbitrum: { ETH: '0x0', USDC: '0x0' },
    // Solana: { SOL: '0x0' },
  },
  refund_addresses: {
    Ethereum: '0xacd7c0481fc71dce9e3e8bd4cca5828ce8302629',
    Polkadot: null,
    Bitcoin: 'bc1qqt3juqef9azhd0zeuamu9c30pg5xdllvmks2ja',
    Arbitrum: null,
    // Solana: '7zLEfU3nQKqnfrN2A5yNEiFd1Vt9D7maVaoSAV8invMT',
  },
  flip_balance: '0x456306aa68edbb80',
  earned_fees: {
    Ethereum: { ETH: 0, FLIP: 0, USDC: 0, USDT: 0 },
    Polkadot: { DOT: 0 },
    Bitcoin: { BTC: 0 },
    Arbitrum: { ETH: 0, USDC: 0 },
    // Solana: { SOL: 0 },
  },
  boost_balances: {
    Ethereum: {
      ETH: [],
      FLIP: [],
      USDC: [],
      USDT: [],
    },
    Polkadot: {
      DOT: [],
    },
    Bitcoin: {
      BTC: [
        {
          fee_tier: 5,
          total_balance: '0x885192',
          available_balance: '0x885192',
          in_use_balance: '0x0',
          is_withdrawing: false,
        },
      ],
    },
    Arbitrum: {
      ETH: [],
      USDC: [],
    },
    Solana: {
      SOL: [],
    },
  },
};

const brokerAccount: z.input<typeof broker> = {
  role: 'broker',
  flip_balance: '0x123dd89c5bb3f5009',
  earned_fees: {
    Ethereum: {
      ETH: '0x149e76e0f91d2546',
      FLIP: '0x2233cf5b9f41af4fe',
      USDC: '0x7293c1a9',
      USDT: '0x2b7b6186',
    },
    Polkadot: {
      DOT: '0x48b7018d8',
    },
    Bitcoin: {
      BTC: '0xbcbf36',
    },
    Arbitrum: {
      ETH: 0,
      USDC: 0,
    },
    // Solana: {
    //   SOL: 0,
    // },
  },
  btc_vault_deposit_address: 'tb1pqyqszqgpqyqszqgpqyqszqgpqyqszqgpqyqszqgpqyqszqgpqyqsn60vlk',
};

const validatorAccount: z.input<typeof validator> = {
  role: 'validator',
  flip_balance: '0x35670aa54a62ccedacab',
  bond: '0x2fa71622a7b77fdf4d10',
  last_heartbeat: 2930096,
  reputation_points: 2880,
  keyholder_epochs: [197, 198],
  is_current_authority: true,
  is_current_backup: false,
  is_qualified: true,
  is_online: true,
  is_bidding: true,
  bound_redeem_address: '0x9a449133c6a8b4e117840b69e2a1d43634f562d3',
  apy_bp: 970,
  restricted_balances: {},
};

const poolOrders: z.input<typeof cfPoolOrders> = {
  limit_orders: {
    asks: [
      {
        lp: 'cFLGvPhhrribWCx9id5kLVqwiFK4QiVNjQ6ViyaRFF2Nrgq7j',
        id: '0x0',
        tick: -193955,
        sell_amount: '0x24b61784bb05ec04',
        fees_earned: '0x0',
        original_sell_amount: '0x24b61784bb05ec04',
      },
    ],
    bids: [
      {
        lp: 'cFLvCBxThPho4LP8iSP54B1iHdEtJhTHniUW5yyNcwDBGSe1X',
        id: '0x18dbe9c5baf',
        tick: -196947,
        sell_amount: '0x17456b9e',
        fees_earned: '0x0',
        original_sell_amount: '0x17456b9e',
      },
    ],
  },
  range_orders: [
    {
      lp: 'cFM63NFq2MiujSSXUz1AfZgb4aZrkv5aWggdLkyufyTcpkrf2',
      id: '0x1',
      range: {
        start: -198197,
        end: -192004,
      },
      liquidity: 4115587651042067,
      fees_earned: {
        base: '0x7fd89c53a56ae1',
        quote: '0x7bfd0f4',
      },
    },
  ],
};

const poolPriceV2: z.input<typeof cfPoolPriceV2> = {
  base_asset: {
    chain: 'Ethereum',
    asset: 'ETH',
  },
  quote_asset: {
    chain: 'Ethereum',
    asset: 'USDC',
  },
  sell: '0x406ee3d54ffe019efa326',
  buy: '0x404979711cbb0b1702a0b',
  range_order: '0x404979711cbb0b1702a0b',
};

const isHexString = (value: unknown): value is HexString =>
  typeof value === 'string' && value.startsWith('0x');

describe(HttpClient, () => {
  it('returns all methods', () => {
    expect(new HttpClient('http://localhost:8080').methods()).toMatchInlineSnapshot(`
      [
        "broker_requestSwapDepositAddress",
        "broker_request_swap_parameter_encoding",
        "cf_account_info",
        "cf_accounts",
        "cf_boost_pool_details",
        "cf_boost_pool_pending_fees",
        "cf_boost_pools_depth",
        "cf_environment",
        "cf_funding_environment",
        "cf_ingress_egress_environment",
        "cf_pool_depth",
        "cf_pool_orders",
        "cf_pool_price_v2",
        "cf_pools_environment",
        "cf_supported_assets",
        "cf_swap_rate",
        "cf_swap_rate_v2",
        "cf_swap_rate_v3",
        "cf_swapping_environment",
        "chain_getBlockHash",
        "state_getMetadata",
        "state_getRuntimeVersion",
      ]
    `);
  });

  const LP_ACCOUNT_ID = 'cFMVtnPTJFYFvnHXK14HZ6XWDSCAByTPZDWrTeFEc2B8A3m7M';
  const BROKER_ACCOUNT_ID = 'cFJjZKzA5rUTb9qkZMGfec7piCpiAQKr15B4nALzriMGQL8BE';
  const VALIDATOR_ACCOUNT_ID = 'cFKzr7DwLCRtSkou5H5moKri7g9WwJ4tAbVJv6dZGhLb811Tc';

  describe('with server', () => {
    let server: Server;
    let callCounter = 0;

    let client: HttpClient;

    function handleRequest(body: JsonRpcRequest<RpcMethod>) {
      const specialMethod = body.method as string;

      if (specialMethod === 'malformed_response') {
        return { result: 1, id: body.id };
      }

      if (specialMethod === 'missing_id') {
        return { jsonrpc: '2.0', result: 1 };
      }

      const respond = (result: unknown) => ({
        id: body.id,
        jsonrpc: '2.0',
        result,
      });

      if (body.method === 'cf_swap_rate') {
        const { chain, asset } = body.params[1] as AssetAndChain;

        if (!isHexString(body.params.at(-1))) {
          return {
            id: body.id,
            jsonrpc: '2.0',
            error: { code: -32602, message: 'invalid parameter type' },
          };
        }

        return respond({
          intermediary: chain === 'Ethereum' && asset === 'USDC' ? null : '0x1',
          output: '0x1',
        } as z.input<typeof cfSwapRate>);
      }

      switch (body.method) {
        case 'cf_account_info':
          switch (body.params[0]) {
            case LP_ACCOUNT_ID:
              return respond(liquidityProviderAccount);
            case BROKER_ACCOUNT_ID:
              return respond(brokerAccount);
            case VALIDATOR_ACCOUNT_ID:
              return respond(validatorAccount);
            default:
              return respond(unregisteredAccount);
          }
        case 'broker_request_swap_parameter_encoding':
          switch (body.params[0]) {
            case 'Ethereum':
              return respond(swapParameterEncodingEthereum);
            case 'Solana':
              return respond(swapParameterEncodingSolana);
            default:
              return respond(swapParameterEncodingBitcoin);
          }
        case 'broker_requestSwapDepositAddress':
          return respond(swapDepositAddress);
        case 'cf_boost_pools_depth':
          return respond(boostPoolsDepth);
        case 'cf_environment':
          return respond(environment);
        case 'cf_funding_environment':
          return respond(fundingEnvironment);
        case 'cf_ingress_egress_environment':
          return respond(ingressEgressEnvironment);
        case 'cf_pool_orders':
          return respond(poolOrders);
        case 'cf_pool_price_v2':
          return respond(poolPriceV2);
        case 'cf_pools_environment':
          return respond(poolsEnvironment);
        case 'cf_supported_assets':
          return respond(supportedAssets);
        case 'cf_swap_rate_v2':
          return respond(swapRateV2);
        case 'cf_swap_rate_v3':
          return respond(swapRateV3);
        case 'cf_swapping_environment':
          return respond(swappingEnvironment);
        case 'chain_getBlockHash':
          return respond('0x5678');
        case 'state_getMetadata':
          return respond('0x1234');
        case 'state_getRuntimeVersion':
          return respond(runtimeVersion);
        default:
          console.error('Method not found:', body.method);
          return {
            id: body.id,
            jsonrpc: '2.0',
            error: { code: 1, message: `Method not found: "${body.method as string}"` },
          };
      }
    }

    beforeEach(() => {
      callCounter = 0;
      server = new Server(async (req, res) => {
        callCounter++;
        if (req.headers['content-type'] !== 'application/json') {
          return res.writeHead(400).end();
        }

        const chunks = [] as Buffer[];

        let length = 0;

        for await (const chunk of req as AsyncIterable<Buffer>) {
          chunks.push(chunk);
          length += chunk.length;
        }

        const body = JSON.parse(
          Buffer.concat(chunks, length).toString(),
        ) as JsonRpcRequest<RpcMethod>[];

        const response = [];
        for (const item of body) {
          if ((item.method as string) === 'non_200') {
            return res.writeHead(404).end();
          }
          if ((item.method as string) === 'malformed_json') {
            return res.end('{');
          }
          response.push(handleRequest(item));
        }
        return res.writeHead(200).end(JSON.stringify(response));
      }).listen(0);

      client = new HttpClient(`http://localhost:${(server.address() as AddressInfo).port}`);
    });

    afterEach(async () => {
      await promisify(server.close.bind(server))();
    });

    it('gets the swap rate with intermediary', async () => {
      expect(
        await client.sendRequest(
          'cf_swap_rate',
          { asset: 'BTC', chain: 'Bitcoin' },
          { asset: 'ETH', chain: 'Ethereum' },
          '0x1',
        ),
      ).toMatchInlineSnapshot(`
        {
          "intermediary": 1n,
          "output": 1n,
        }
      `);
    });

    it('gets the swap rate without intermediary', async () => {
      expect(
        await client.sendRequest(
          'cf_swap_rate',
          { asset: 'BTC', chain: 'Bitcoin' },
          { asset: 'USDC', chain: 'Ethereum' },
          '0x1',
        ),
      ).toMatchInlineSnapshot(`
        {
          "intermediary": null,
          "output": 1n,
        }
      `);
    });

    it('gets the funding environment', async () => {
      expect(await client.sendRequest('cf_funding_environment')).toMatchInlineSnapshot(`
        {
          "minimum_funding_amount": 10000000000000000000n,
          "redemption_tax": 5000000000000000000n,
        }
      `);
    });

    it('gets the ingress/egress environment', async () => {
      expect(await client.sendRequest('cf_ingress_egress_environment')).toMatchSnapshot();
    });

    it('gets the swapping environment', async () => {
      expect(await client.sendRequest('cf_swapping_environment')).toMatchInlineSnapshot(`
        {
          "maximum_swap_amounts": {
            "Arbitrum": {
              "ETH": null,
              "USDC": null,
            },
            "Bitcoin": {
              "BTC": null,
            },
            "Ethereum": {
              "ETH": 65536n,
              "FLIP": null,
              "USDC": null,
              "USDT": null,
            },
            "Polkadot": {
              "DOT": null,
            },
            "Solana": {
              "SOL": null,
              "USDC": null,
            },
          },
          "network_fee_hundredth_pips": 1000,
        }
      `);
    });

    it('gets the environment', async () => {
      expect(await client.sendRequest('cf_environment')).toMatchSnapshot();
    });

    it('gets the metadata', async () => {
      expect(await client.sendRequest('state_getMetadata')).toBe('0x1234');
    });

    it('gets the supported assets', async () => {
      expect(await client.sendRequest('cf_supported_assets')).toEqual(supportedAssets);
    });

    it('gets the block hash', async () => {
      expect(await client.sendRequest('chain_getBlockHash')).toEqual('0x5678');
    });

    it('gets the runtime version', async () => {
      expect(await client.sendRequest('state_getRuntimeVersion')).toEqual(runtimeVersion);
    });

    it('gets the boost pools', async () => {
      expect(await client.sendRequest('cf_boost_pools_depth')).toMatchInlineSnapshot(`
        [
          {
            "asset": "BTC",
            "available_amount": 10021000n,
            "chain": "Bitcoin",
            "tier": 5,
          },
          {
            "asset": "BTC",
            "available_amount": 10000000n,
            "chain": "Bitcoin",
            "tier": 30,
          },
          {
            "asset": "BTC",
            "available_amount": 10000000n,
            "chain": "Bitcoin",
            "tier": 10,
          },
        ]
      `);
    });

    it('does the swap rate v2', async () => {
      expect(
        await client.sendRequest(
          'cf_swap_rate_v2',
          { asset: 'USDT', chain: 'Ethereum' },
          { asset: 'USDC', chain: 'Ethereum' },
          '0x10000',
          [
            {
              LimitOrder: {
                base_asset: { asset: 'USDT', chain: 'Ethereum' },
                quote_asset: { asset: 'USDC', chain: 'Ethereum' },
                side: 'buy',
                tick: 0,
                sell_amount: '0x10000',
              },
            },
          ],
        ),
      ).toMatchInlineSnapshot(`
        {
          "egress_fee": {
            "amount": 0n,
            "asset": "USDC",
            "chain": "Ethereum",
          },
          "ingress_fee": {
            "amount": 0n,
            "asset": "USDT",
            "chain": "Ethereum",
          },
          "intermediary": null,
          "network_fee": {
            "amount": 66n,
            "asset": "USDC",
            "chain": "Ethereum",
          },
          "output": 65468n,
        }
      `);
    });

    it('does the swap rate v3', async () => {
      expect(
        await client.sendRequest(
          'cf_swap_rate_v3',
          { asset: 'USDT', chain: 'Ethereum' },
          { asset: 'USDC', chain: 'Ethereum' },
          '0x10000',
          10,
          {
            number_of_chunks: 10,
            chunk_interval: 2,
          },
          [
            {
              LimitOrder: {
                base_asset: { asset: 'USDT', chain: 'Ethereum' },
                quote_asset: { asset: 'USDC', chain: 'Ethereum' },
                side: 'buy',
                tick: 0,
                sell_amount: '0x10000',
              },
            },
          ],
        ),
      ).toMatchInlineSnapshot(`
        {
          "broker_commission": {
            "amount": 0n,
            "asset": "USDC",
            "chain": "Ethereum",
          },
          "egress_fee": {
            "amount": 0n,
            "asset": "USDC",
            "chain": "Ethereum",
          },
          "ingress_fee": {
            "amount": 0n,
            "asset": "USDT",
            "chain": "Ethereum",
          },
          "intermediary": null,
          "network_fee": {
            "amount": 66n,
            "asset": "USDC",
            "chain": "Ethereum",
          },
          "output": 65468n,
        }
      `);
    });

    it('does the swap rate v3 with ccm_data and exclude_fees fields', async () => {
      expect(
        await client.sendRequest(
          'cf_swap_rate_v3',
          { asset: 'USDT', chain: 'Ethereum' },
          { asset: 'USDC', chain: 'Ethereum' },
          '0x10000',
          10,
          {
            number_of_chunks: 10,
            chunk_interval: 2,
          },
          {
            gas_budget: '0x',
            message_length: 0,
          },
          ['Ingress'],
          [
            {
              LimitOrder: {
                base_asset: { asset: 'USDT', chain: 'Ethereum' },
                quote_asset: { asset: 'USDC', chain: 'Ethereum' },
                side: 'buy',
                tick: 0,
                sell_amount: '0x10000',
              },
            },
          ],
        ),
      ).toMatchInlineSnapshot(`
        {
          "broker_commission": {
            "amount": 0n,
            "asset": "USDC",
            "chain": "Ethereum",
          },
          "egress_fee": {
            "amount": 0n,
            "asset": "USDC",
            "chain": "Ethereum",
          },
          "ingress_fee": {
            "amount": 0n,
            "asset": "USDT",
            "chain": "Ethereum",
          },
          "intermediary": null,
          "network_fee": {
            "amount": 66n,
            "asset": "USDC",
            "chain": "Ethereum",
          },
          "output": 65468n,
        }
      `);
    });

    it('gets validator account info', async () => {
      expect(await client.sendRequest('cf_account_info', VALIDATOR_ACCOUNT_ID)).toMatchSnapshot();
    });

    it('gets lp account info', async () => {
      expect(await client.sendRequest('cf_account_info', LP_ACCOUNT_ID)).toMatchSnapshot();
    });

    it('gets broker account info', async () => {
      expect(await client.sendRequest('cf_account_info', BROKER_ACCOUNT_ID)).toMatchSnapshot();
    });

    it('gets unregistered account info', async () => {
      expect(
        await client.sendRequest(
          'cf_account_info',
          'cFNz3kSjvCHubkrtfYtBkzY2WpACDmXqQ9YGxbMgRD2iu1LCc',
        ),
      ).toMatchSnapshot();
    });

    it('gets pools orders', async () => {
      expect(
        await client.sendRequest(
          'cf_pool_orders',
          { chain: 'Ethereum', asset: 'ETH' },
          { asset: 'USDC', chain: 'Ethereum' },
        ),
      ).toMatchSnapshot();
    });

    it('requests deposit addresses', async () => {
      expect(
        await client.sendRequest(
          'broker_requestSwapDepositAddress',
          { asset: 'BTC', chain: 'Bitcoin' },
          { asset: 'ETH', chain: 'Ethereum' },
          '0x4567',
          100,
          { gas_budget: '0x0', message: '0x0' },
          30,
          [{ account: '0x1234', bps: 0 }],
        ),
      ).toMatchInlineSnapshot(`
        {
          "address": "0x1234",
          "channel_id": 1,
          "channel_opening_fee": 0n,
          "issued_block": 1,
          "source_chain_expiry_block": 1n,
        }
      `);
      expect(callCounter).toEqual(1);
    });

    it('handles multiple requests with 1 call', async () => {
      const [r1, r2] = await Promise.all([
        client.sendRequest(
          'cf_pool_orders',
          { chain: 'Ethereum', asset: 'ETH' },
          { asset: 'USDC', chain: 'Ethereum' },
        ),
        client.sendRequest(
          'broker_requestSwapDepositAddress',
          { asset: 'BTC', chain: 'Bitcoin' },
          { asset: 'ETH', chain: 'Ethereum' },
          '0x4567',
          100,
          { gas_budget: '0x0', message: '0x0' },
          30,
          [{ account: '0x1234', bps: 0 }],
        ),
      ]);
      expect(r1).toMatchSnapshot();

      expect(r2).toMatchInlineSnapshot(`
        {
          "address": "0x1234",
          "channel_id": 1,
          "channel_opening_fee": 0n,
          "issued_block": 1,
          "source_chain_expiry_block": 1n,
        }
      `);
      expect(callCounter).toEqual(1);
    });

    it('handles multiple requests separately if they are sent far apart', async () => {
      const r1 = await client.sendRequest(
        'cf_pool_orders',
        { chain: 'Ethereum', asset: 'ETH' },
        { asset: 'USDC', chain: 'Ethereum' },
      );

      const r2 = await client.sendRequest(
        'broker_requestSwapDepositAddress',
        { asset: 'BTC', chain: 'Bitcoin' },
        { asset: 'ETH', chain: 'Ethereum' },
        '0x4567',
        100,
        { gas_budget: '0x0', message: '0x0' },
        30,
        [{ account: '0x1234', bps: 0 }],
      );
      expect(r1).toMatchSnapshot();

      expect(r2).toMatchInlineSnapshot(`
        {
          "address": "0x1234",
          "channel_id": 1,
          "channel_opening_fee": 0n,
          "issued_block": 1,
          "source_chain_expiry_block": 1n,
        }
      `);
      expect(callCounter).toEqual(2);
    });

    it('throws on invalid response', async () => {
      const method = 'malformed_response' as RpcMethod;

      await expect(client.sendRequest(method)).rejects.toThrowErrorMatchingInlineSnapshot(
        `[Error: Malformed RPC response received]`,
      );
    });

    it('throws on missing id on response', async () => {
      const method = 'missing_id' as RpcMethod;

      await expect(client.sendRequest(method)).rejects.toThrowErrorMatchingInlineSnapshot(
        `[Error: Could not find the result for the request]`,
      );
    });

    it('throws on a non-200 response', async () => {
      const method = 'non_200' as RpcMethod;
      await expect(client.sendRequest(method)).rejects.toThrow('HTTP error: 404');
    });

    it('returns the rejected error message', async () => {
      await expect(
        client.sendRequest(
          'cf_swap_rate',
          { asset: 'BTC', chain: 'Bitcoin' },
          { asset: 'ETH', chain: 'Ethereum' },
          '0x1',
          1 as unknown as HexString,
        ),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `[Error: RPC error [-32602]: invalid parameter type]`,
      );
    });

    it('handles malformed json', async () => {
      const method = 'malformed_json' as RpcMethod;
      await expect(client.sendRequest(method)).rejects.toThrow('Invalid JSON response');
    });
  });
});
