import { z } from 'zod';
import {
  cfAccountInfo,
  cfAuctionState,
  cfGetTradingStrategies,
  cfGetTradingStrategyLimits,
  cfLendingConfig,
  cfLendingPoolSupplyBalances,
  cfLoanAccounts,
  cfMonitoringSimulateAuction,
  cfOraclePrices,
  cfSafeModeStatuses,
} from '../parsers';
import {
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
  type cfSwapRateV3,
  type requestSwapParameterEncoding,
  type cfFailedCallEvm,
  type cfPoolOrderbook,
} from '../parsers';
import { CfAvailablePools } from '../types';
import { cfLendingPools } from './../parsers';

export const supportedAssets = [
  { chain: 'Ethereum', asset: 'ETH' },
  { chain: 'Ethereum', asset: 'FLIP' },
  { chain: 'Ethereum', asset: 'USDC' },
  { chain: 'Ethereum', asset: 'USDT' },
  { chain: 'Bitcoin', asset: 'BTC' },
  { chain: 'Arbitrum', asset: 'ETH' },
  { chain: 'Arbitrum', asset: 'USDC' },
  { chain: 'Solana', asset: 'SOL' },
  { chain: 'Solana', asset: 'USDC' },
];

export const ingressEgressEnvironment: z.input<typeof cfIngressEgressEnvironment> = {
  minimum_deposit_amounts: {
    Ethereum: { ETH: '0x0', FLIP: '0x0', USDC: '0x0', USDT: '0x0' },
    Bitcoin: { BTC: '0x0' },
    Arbitrum: { ETH: '0x0', USDC: '0x0' },
    Solana: { SOL: '0x0', USDC: '0x0' },
    Assethub: { DOT: '0x0', USDC: '0x0', USDT: '0x0' },
  },
  ingress_fees: {
    Ethereum: { ETH: '0x55730', FLIP: '0x0', USDC: '0x0', USDT: '0x0' },
    Bitcoin: { BTC: '0x4e' },
    Arbitrum: { ETH: '0x574b457d400', USDC: '0x231b' },
    Solana: { SOL: '0xb0', USDC: '0x0' },
    Assethub: { DOT: '0x0', USDC: '0x0', USDT: '0x0' },
  },
  egress_fees: {
    Ethereum: { ETH: '0x77a10', FLIP: '0x0', USDC: '0x0', USDT: '0x0' },
    Bitcoin: { BTC: '0xb0' },
    Arbitrum: { ETH: '0x74645ca7000', USDC: '0x2701' },
    Solana: { SOL: '0xb0', USDC: '0x0' },
    Assethub: { DOT: '0x0', USDC: '0x0', USDT: '0x0' },
  },
  witness_safety_margins: {
    Bitcoin: 2,
    Ethereum: 2,
    Arbitrum: 1,
    Solana: 1,
    Assethub: null,
  },
  egress_dust_limits: {
    Ethereum: { ETH: '0x1', FLIP: '0x1', USDC: '0x1', USDT: '0x1' },
    Bitcoin: { BTC: '0x258' },
    Arbitrum: { ETH: '0x1', USDC: '0x1' },
    Solana: { SOL: '0x1', USDC: '0x1' },
    Assethub: { DOT: '0x0', USDC: '0x0', USDT: '0x0' },
  },
  channel_opening_fees: {
    Arbitrum: '0x0',
    Ethereum: '0x0',
    Bitcoin: '0x0',
    Solana: '0x0',
    Assethub: '0x0',
  },
};

export const swappingEnvironment: z.input<typeof cfSwappingEnvironment> = {
  maximum_swap_amounts: {
    Ethereum: {
      ETH: '0x10000',
      FLIP: null,
      USDC: null,
      USDT: null,
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
      DOT: '0x0',
      USDC: '0x0',
      USDT: '0x0',
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
};

export const fundingEnvironment: z.input<typeof cfFundingEnvironment> = {
  redemption_tax: '0x4563918244f40000',
  minimum_funding_amount: '0x8ac7230489e80000',
};

export const poolsEnvironment: z.input<typeof cfPoolsEnvironment> = {
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
      USDC: null,
    },
    Assethub: {
      DOT: null,
      USDC: null,
      USDT: null,
    },
  },
};

export const environment: z.input<typeof cfEnvironment> = {
  ingress_egress: ingressEgressEnvironment,
  swapping: swappingEnvironment,
  funding: fundingEnvironment,
  pools: poolsEnvironment,
};

export const runtimeVersion = {
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

export const boostPoolsDepth = [
  { chain: 'Bitcoin', asset: 'BTC', tier: 5, available_amount: '0x98e888' },
  { chain: 'Bitcoin', asset: 'BTC', tier: 30, available_amount: '0x989680' },
  { chain: 'Bitcoin', asset: 'BTC', tier: 10, available_amount: '0x989680' },
];

export const swapRateV2: z.input<typeof cfSwapRateV2> = {
  intermediary: null,
  output: '0xffbc',
  network_fee: { chain: 'Ethereum', asset: 'USDC', amount: '0x42' },
  ingress_fee: { chain: 'Ethereum', asset: 'USDT', amount: '0x0' },
  egress_fee: { chain: 'Ethereum', asset: 'USDC', amount: '0x0' },
};

export const swapRateV3: z.input<typeof cfSwapRateV3> = {
  intermediary: null,
  output: '0xffbc',
  network_fee: { chain: 'Ethereum', asset: 'USDC', amount: '0x42' },
  ingress_fee: { chain: 'Ethereum', asset: 'USDT', amount: '0x0' },
  egress_fee: { chain: 'Ethereum', asset: 'USDC', amount: '0x0' },
  broker_commission: { chain: 'Ethereum', asset: 'USDC', amount: '0x0' },
};

export const swapParameterEncodingBitcoin: z.input<typeof requestSwapParameterEncoding> = {
  chain: 'Bitcoin',
  nulldata_payload:
    '0x0003656623d865425c0a4955ef7e7a39d09f58554d0800000000000000000000000000000000000001000200000100',
  deposit_address: 'bcrt1pmrhjpvq2w7cgesrcrvuhqw6n6j487l6uc7tmwtx9jen7ezesunhqllvzxx',
};

export const swapParameterEncodingEthereum: z.input<typeof requestSwapParameterEncoding> = {
  chain: 'Ethereum',
  calldata:
    '0xdd68734500000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000014b5fb203bd12f528813b512408b374a8f0f44367a000000000000000000000000000000000000000000000000000000000000000000000000000000000000005f0000000000004cd85eb477b4820bbf10dc4689d8b344c2722eac000000000000000000000000000000000000000000000000000000000000000000009059e6d854b769a505d01148af212bf8cb7f8469a7153edce8dcaedd9d29912501000000',
  value: '0x4563918244f40000',
  to: '0xb7a5bd0345ef1cc5e66bf61bdec17d2461fbd968',
  source_token_address: '0x10c6e9530f1c1af873a391030a1d9e8ed0630d26',
};

export const swapParameterEncodingSolana: z.input<typeof requestSwapParameterEncoding> = {
  chain: 'Solana',
  program_id: '35uYgHdfZQT4kHkaaXQ6ZdCkK5LFrsk43btTLbGCRCNT',
  accounts: [
    {
      pubkey: 'Gm4QT3aC9YZtyZAFjMNTVEMB4otEY1JW2dVEBFbGfr9p',
      is_signer: true,
      is_writable: true,
    },
    {
      pubkey: '2tmtGLQcBd11BMiE9B1tAkQXwmPNgR79Meki2Eme4Ec9',
      is_signer: false,
      is_writable: true,
    },
    {
      pubkey: '11111111111111111111111111111111',
      is_signer: false,
      is_writable: false,
    },
  ],
  data: '0xa3265ce2f3698dc400e876481700000001000000140000004d2c78895c0fb2dbc04ecb98345f7b5e30bbd5f203000000006b000000000000000004f79d5e026f12edc6443a534b2cdd5072233989b415d7596573e743f3e5b386fb000000000000000000000000000000000000000000000000000000000000000000009059e6d854b769a505d01148af212bf8cb7f8469a7153edce8dcaedd9d299125010000',
};

export const swapDepositAddress: z.input<typeof brokerRequestSwapDepositAddress> = {
  channel_id: 1,
  address: '0x1234',
  issued_block: 1,
  channel_opening_fee: '0x0',
  source_chain_expiry_block: 1,
};

export const emptyChainAssetMap = {
  Ethereum: { ETH: '0x0', FLIP: '0x0', USDC: '0x0', USDT: '0x0' },
  Bitcoin: { BTC: '0x0' },
  Arbitrum: { ETH: '0x0', USDC: '0x0' },
  Solana: { SOL: '0x0', USDC: '0x0' },
  Assethub: { DOT: '0x0', USDT: '0x0', USDC: '0x0' },
};

export const unregisteredAccount: z.input<typeof unregistered> = {
  role: 'unregistered',
  flip_balance: '0x0',
  asset_balances: {
    Ethereum: { ETH: '0x0', FLIP: '0x0', USDC: '0x0', USDT: '0x0' },
    Bitcoin: { BTC: '0x0' },
    Arbitrum: { ETH: '0x0', USDC: '0x0' },
    Solana: { SOL: '0x0', USDC: '0x0' },
    Assethub: { DOT: '0x0', USDC: '0x0', USDT: '0x0' },
  },
  bond: '0x0',
  estimated_redeemable_balance: '0x0',
};

export const liquidityProviderAccount: z.input<typeof liquidityProvider> = {
  vanity_name: 'Chainflip Testnet LP BOOST',
  flip_balance: '0x56bc747ee70ef7e80',
  asset_balances: {
    Ethereum: {
      ETH: '0x0',
      FLIP: '0x0',
      USDC: '0x0',
      USDT: '0x0',
    },
    Bitcoin: {
      BTC: '0x4d82',
    },
    Arbitrum: {
      ETH: '0x0',
      USDC: '0x0',
    },
    Solana: {
      SOL: '0x0',
      USDC: '0x0',
    },
    Assethub: {
      DOT: '0x0',
      USDT: '0x0',
      USDC: '0x0',
    },
  },
  bond: '0x0',
  estimated_redeemable_balance: '0x56bc747ee70ef7e80',
  role: 'liquidity_provider',
  refund_addresses: {
    Ethereum: '0xacd7c0481fc71dce9e3e8bd4cca5828ce8302629',
    Bitcoin: 'bc1qqt3juqef9azhd0zeuamu9c30pg5xdllvmks2ja',
    Arbitrum: null,
    Solana: '7zLEfU3nQKqnfrN2A5yNEiFd1Vt9D7maVaoSAV8invMT',
    Assethub: null,
  },
  earned_fees: {
    Ethereum: {
      ETH: '0x0',
      FLIP: '0x0',
      USDC: '0x0',
      USDT: '0x0',
    },
    Bitcoin: {
      BTC: '0x0',
    },
    Arbitrum: {
      ETH: '0x0',
      USDC: '0x0',
    },
    Solana: {
      SOL: '0x0',
      USDC: '0x0',
    },
    Assethub: {
      DOT: '0x0',
      USDT: '0x0',
      USDC: '0x0',
    },
  },
  boost_balances: {
    Ethereum: {
      ETH: [],
      FLIP: [],
      USDC: [],
      USDT: [],
    },
    Bitcoin: {
      BTC: [
        {
          fee_tier: 5,
          total_balance: '0xbebc200',
          available_balance: '0xbebc200',
          in_use_balance: '0x0',
          is_withdrawing: false,
        },
        {
          fee_tier: 10,
          total_balance: '0xbebc200',
          available_balance: '0xbebc200',
          in_use_balance: '0x0',
          is_withdrawing: false,
        },
        {
          fee_tier: 30,
          total_balance: '0xbebc200',
          available_balance: '0xbebc200',
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
      USDC: [],
    },
    Assethub: {
      DOT: [],
      USDT: [],
      USDC: [],
    },
  },
  lending_positions: [
    {
      chain: 'Bitcoin',
      asset: 'BTC',
      total_amount: '0xbebc200',
      available_amount: '0xbebc200',
    },
  ],
  collateral_balances: [],
};

export const brokerAccount: z.input<typeof broker> = {
  role: 'broker',
  flip_balance: '0x123dd89c5bb3f5009',
  estimated_redeemable_balance: '0x123dd89c5bb3f5009',
  bond: '0x0',
  asset_balances: emptyChainAssetMap,
  earned_fees: {
    Ethereum: {
      ETH: '0x149e76e0f91d2546',
      FLIP: '0x2233cf5b9f41af4fe',
      USDC: '0x7293c1a9',
      USDT: '0x2b7b6186',
    },
    Bitcoin: { BTC: '0xbcbf36' },
    Arbitrum: { ETH: 0, USDC: 0 },
    Solana: { SOL: 0, USDC: 0 },
    Assethub: { DOT: 0, USDC: 0, USDT: 0 },
  },
  btc_vault_deposit_address: 'tb1pqyqszqgpqyqszqgpqyqszqgpqyqszqgpqyqszqgpqyqszqgpqyqsn60vlk',
  affiliates: [
    {
      account_id: 'cFJjZKzA5rUTb9qkZMGfec7piCpiAQKr15B4nALzriMGQL8BE',
      short_id: 1,
      withdrawal_address: '0x9a449133c6a8b4e117840b69e2a1d43634f562d3',
    },
  ],
};

export const brokerAccountNoAffiliates: z.input<typeof broker> = {
  role: 'broker',
  flip_balance: '0x123dd89c5bb3f5009',
  earned_fees: {
    Ethereum: {
      ETH: '0x149e76e0f91d2546',
      FLIP: '0x2233cf5b9f41af4fe',
      USDC: '0x7293c1a9',
      USDT: '0x2b7b6186',
    },
    Bitcoin: {
      BTC: '0xbcbf36',
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
      USDC: 0,
      USDT: 0,
    },
  },
  bond: '0x0',
  asset_balances: emptyChainAssetMap,
  estimated_redeemable_balance: '0x123dd89c5bb3f5009',
};

export const validatorAccount: z.input<typeof validator> = {
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
  estimated_redeemable_balance: '0x0',
  asset_balances: emptyChainAssetMap,
};

export const validatorAccount2: z.input<typeof validator> = {
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
  estimated_redeemable_balance: '0x0',
  operator: 'cFM7AjUFjqtrRStbEuNRYzEpjAqKEWP3om8FydieAhbqpqRKz',
  asset_balances: emptyChainAssetMap,
};

const delegator1: z.input<typeof unregistered> = {
  flip_balance: '0x3635c9adc5dea00000',
  asset_balances: emptyChainAssetMap,
  bond: '0x0',
  estimated_redeemable_balance: '0x3635c9adc5dea00000',
  upcoming_delegation_status: {
    operator: 'cFMjXCTxTHVkSqbKzeVwJ25TJxLqc1Vn9usPgUGmZhsyvHRQZ',
    bid: '0x3635c9adc5dea00000',
  },
  role: 'unregistered',
};

const delegator2: z.input<typeof unregistered> = {
  role: 'unregistered',
  flip_balance: '0x363756d3e8a67a7fec',
  asset_balances: emptyChainAssetMap,
  bond: '0x3635c9adc5dea00000',
  estimated_redeemable_balance: '0x0',
  current_delegation_status: {
    operator: 'cFMjXCTxTHVkSqbKzeVwJ25TJxLqc1Vn9usPgUGmZhsyvHRQZ',
    bid: '0x3635c9adc5dea00000',
  },
  upcoming_delegation_status: {
    operator: 'cFMjXCTxTHVkSqbKzeVwJ25TJxLqc1Vn9usPgUGmZhsyvHRQZ',
    bid: '0x3635c9adc5dea00000',
  },
};

export const cfAccountInfoOperator: z.input<typeof cfAccountInfo> = {
  vanity_name: 'Buttoness',
  flip_balance: '0x363810b745006bc6c6',
  asset_balances: emptyChainAssetMap,
  bond: '0x0',
  estimated_redeemable_balance: '0x363810b745006bc6c6',
  role: 'operator',
  managed_validators: {
    cFNkiayhWvppDY5zSzG8rAYMaqbunLBAAbBQcAgFF4x1jaMSy: '0x8ac7201ac3947280',
  },
  settings: {
    fee_bps: 1500,
    delegation_acceptance: 'Allow',
  },
  delegators: {
    cFHsUq1uK5opJudRDczt7w4baiRDHR6Kdezw77u2JnRnCGKcs: '0x30ca024f987b900000',
  },
  blocked: ['cFNfitvPd2acNNFgijVN3Ls4gG112PZPq7sY2FGtPgEk25wV9'],
  active_delegation: {
    operator: 'cFMjXCTxTHVkSqbKzeVwJ25TJxLqc1Vn9usPgUGmZhsyvHRQZ',
    validators: {
      cFNkiayhWvppDY5zSzG8rAYMaqbunLBAAbBQcAgFF4x1jaMSy: '0x10f42f25af720f9f0f6',
    },
    delegators: {
      cFHsUq1uK5opJudRDczt7w4baiRDHR6Kdezw77u2JnRnCGKcs: '0x3635c9adc5dea00000',
    },
    delegation_fee_bps: 1500,
  },
};

export const VALIDATOR_ACCOUNT_ID = 'cFKzr7DwLCRtSkou5H5moKri7g9WwJ4tAbVJv6dZGhLb811Tc';
export const VALIDATOR_ACCOUNT_ID2 = 'cFJ6qQZ3ybhMDPt7KXDUUj3aLC2DXaPm8rCLCfLEsyMRH2AXK';
export const LP_ACCOUNT_ID = 'cFMVtnPTJFYFvnHXK14HZ6XWDSCAByTPZDWrTeFEc2B8A3m7M';
export const BROKER_ACCOUNT_ID = 'cFJjZKzA5rUTb9qkZMGfec7piCpiAQKr15B4nALzriMGQL8BE';
export const BROKER_ACCOUNT_ID2 = 'cFMmWJ1U3x1wZFo4qf36XKG8BxejtMvkKE9DZEt2UtASGMBMf';
export const DELEGATOR_ACCOUNT_ID = 'cFNzMM63izeZ2zqKiUpUVWLEd6YqzbVEAHgPtgHLDtAVG4Hmv';
export const DELEGATOR_ACCOUNT_ID2 = 'cFKvKKCcScNcWyrJRASocm7vZq5vU8QpQhqdVGU8PnMEwgud5';

export const accounts: Record<`cF${string}`, z.input<typeof cfAccountInfo>> = {
  [VALIDATOR_ACCOUNT_ID]: validatorAccount,
  [VALIDATOR_ACCOUNT_ID2]: validatorAccount2,
  [LP_ACCOUNT_ID]: liquidityProviderAccount,
  [BROKER_ACCOUNT_ID]: brokerAccount,
  [BROKER_ACCOUNT_ID2]: brokerAccountNoAffiliates,
  [DELEGATOR_ACCOUNT_ID]: delegator1,
  [DELEGATOR_ACCOUNT_ID2]: delegator2,
};

export const poolOrders: z.input<typeof cfPoolOrders> = {
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

export const poolPriceV2: z.input<typeof cfPoolPriceV2> = {
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

export const failedCallEvm: z.input<typeof cfFailedCallEvm> = {
  contract: '0xdeadbeef',
  data: 'some data i guess',
};

export const poolOrderbook: z.input<typeof cfPoolOrderbook> = {
  bids: [
    { amount: '0x55f851e2d7bc83c14ad', sqrt_price: '0xd15f0592be94b466145' },
    { amount: '0x589daadcee894407589', sqrt_price: '0xcb1eaa2d98bc8ed9ced' },
    { amount: '0x5b57dc9506f840eadc5', sqrt_price: '0xc50e175451756ece1ae' },
    { amount: '0x5118880a126114ef2d4', sqrt_price: '0xbf83a578338b26ebcf7' },
    { amount: '0x2d17f67c7061204192b', sqrt_price: '0xb976a138141cc2d4e57' },
    { amount: '0x2e7b4004b903bcb2466', sqrt_price: '0xb3ed03dede60dac4ce7' },
    { amount: '0x2fe978d13eb00cb0fa0', sqrt_price: '0xae8dba40861a1065d49' },
    { amount: '0x3162f709195ec1d25b7', sqrt_price: '0xa95780d4deed136e29a' },
    { amount: '0x32e8137a2a890f4f93d', sqrt_price: '0xa4491dbbe4c9b741213' },
    { amount: '0x20b98ea8ae40d986cfb', sqrt_price: '0xa04892715869b95d147' },
  ],
  asks: [
    { amount: '0x9e67d06b0f3e2988624', sqrt_price: '0xdafa4e4bc5946cf0be6' },
    { amount: '0x956b0816a8d5ae06614', sqrt_price: '0xe82630212f398be742e' },
    { amount: '0x8cf0c9c982b458bcc93', sqrt_price: '0xf61ce32b833bdad2777' },
    { amount: '0xbbe31cbe858d103b227', sqrt_price: '0x1051d334bf2b575c1551' },
    { amount: '0xb6685679f25cef1217a', sqrt_price: '0x1149c44de7289ef29bfa' },
    { amount: '0xac2207bc44a193896b7', sqrt_price: '0x1254020e76deec05c8f7' },
    { amount: '0xa274b6c69122e0a17f5', sqrt_price: '0x136e31e5bd5e157dede5' },
    { amount: '0x7d6d1e8f4010f8320bb', sqrt_price: '0x1489d68d729ee77fb616' },
    { amount: '0x5b41b64d55c3cc4ab83', sqrt_price: '0x15d6943663112a5dde44' },
    { amount: '0x5613b9aec02a7fce539', sqrt_price: '0x1726da8a7ff3641e3917' },
    { amount: '0x51317ccc716271e6dcd', sqrt_price: '0x188b59ee0bc46a243b61' },
    { amount: '0x4c962f29e57c0f3210c', sqrt_price: '0x1a054ac59254f2de9fa4' },
    { amount: '0x483dca7aa20094b28a6', sqrt_price: '0x1b95f740a9191f0c5cb9' },
    { amount: '0x442482e6e34054905c3', sqrt_price: '0x1d3ebd6ca0f580c73196' },
    { amount: '0x4046c3ba8f4da873524', sqrt_price: '0x1f011063248bc3f4048b' },
    { amount: '0x2e73af47b06bc716f57', sqrt_price: '0x20b5fee70a60f6c7c5de' },
    { amount: '0x1c4850ee85e22e80163', sqrt_price: '0x22d89a0fb17970737aa1' },
    { amount: '0x1aad85fa1dd498be69d', sqrt_price: '0x24f12c0a55c8776fbeb6' },
    { amount: '0x192a09a3529bc53e8b5', sqrt_price: '0x272a04484cee5c40936e' },
    { amount: '0x11d53c587e5404793d6', sqrt_price: '0x2936741b0557415b0308' },
    { amount: '0xf', sqrt_price: '0x1279a74590331c4d218f81e4a' },
    { amount: '0x6', sqrt_price: '0x14a7e9cb8a349120fc9aafb5a' },
    { amount: '0xd', sqrt_price: '0x11c01aa03be895c58926a5822' },
    { amount: '0x3', sqrt_price: '0x16a09e667f3bcc908b2fb1366' },
    { amount: '0x8f5fa7ed76d1087d', sqrt_price: '0x8bd088b7657ea2996f61' },
  ],
};

export const tradingStrategies: z.input<typeof cfGetTradingStrategies> = [
  {
    lp_id: 'cFL8fmgKZcchhtLagBH2GKfsuWxBqUaD5CYE1m7DFb8DBSLJ1',
    strategy_id: 'cFLR4dN8x2vz3Vbcye1wMJfikfFFuUT7M9DiY58W82bEqdgvX',
    strategy: {
      TickZeroCentered: {
        spread_tick: 1,
        base_asset: {
          chain: 'Ethereum',
          asset: 'USDT',
        },
      },
    },
    balance: [
      [
        {
          chain: 'Ethereum',
          asset: 'USDC',
        },
        '0xba140837d',
      ],
      [
        {
          chain: 'Ethereum',
          asset: 'USDT',
        },
        '0x8af035ee3',
      ],
    ],
  },
  {
    lp_id: 'cFPdef3hF5zEwbWUG6ZaCJ3X7mTvEeAog7HxZ8QyFcCgDVGDM',
    strategy_id: 'cFJu7R6mEVwbkDJr9ttC1LwpqHmQH6GnmqSgY9trQvHvuBYwp',
    strategy: {
      TickZeroCentered: {
        spread_tick: 1,
        base_asset: {
          chain: 'Ethereum',
          asset: 'USDT',
        },
      },
    },
    balance: [
      [
        {
          chain: 'Ethereum',
          asset: 'USDC',
        },
        '0x0',
      ],
      [
        {
          chain: 'Ethereum',
          asset: 'USDT',
        },
        '0x55ae82600',
      ],
    ],
  },
  {
    lp_id: 'cFJt3kyUdXvaoarfxJDLrFmHFqkXUgnVZ4zqqDLLTRjbJosmK',
    strategy_id: 'cFNz3kSjvCHubkrtfYtBkzY2WpACDmXqQ9YGxbMgRD2iu1LCc',
    strategy: {
      SimpleBuySell: {
        buy_tick: -10,
        sell_tick: 2,
        base_asset: {
          chain: 'Ethereum',
          asset: 'USDT',
        },
      },
    },
    balance: [
      [
        {
          chain: 'Ethereum',
          asset: 'USDC',
        },
        '0x0',
      ],
      [
        {
          chain: 'Ethereum',
          asset: 'USDT',
        },
        '0x55ae82600',
      ],
    ],
  },
  {
    lp_id: 'cFJt3kyUdXvaoarfxJDLrFmHFqkXUgnVZ4zqqDLLTRjbJosmK',
    strategy_id: 'cFJr8vEYc1mr1CEsdRugUJqdyBnyNdq8idNFKmQ2AaYbDz1Zm',
    strategy: {
      InventoryBased: {
        min_sell_tick: 2,
        max_sell_tick: 8,
        min_buy_tick: -10,
        max_buy_tick: -1,
        base_asset: {
          chain: 'Ethereum',
          asset: 'USDT',
        },
      },
    },
    balance: [
      [
        {
          chain: 'Ethereum',
          asset: 'USDC',
        },
        '0x0',
      ],
      [
        {
          chain: 'Ethereum',
          asset: 'USDT',
        },
        '0x55ae82600',
      ],
    ],
  },
];

export const tradingStrategiesLimits: z.input<typeof cfGetTradingStrategyLimits> = {
  minimum_deployment_amount: {
    Ethereum: {
      ETH: null,
      FLIP: null,
      USDC: 20000000000,
      USDT: 20000000000,
    },
    Bitcoin: {
      BTC: null,
    },
    Arbitrum: {
      ETH: null,
      USDC: 20000000000,
    },
    Solana: {
      SOL: null,
      USDC: 20000000000,
    },
    Assethub: {
      DOT: null,
      USDT: null,
      USDC: null,
    },
  },
  minimum_added_funds_amount: {
    Ethereum: {
      ETH: null,
      FLIP: null,
      USDC: 10000000,
      USDT: 10000000,
    },
    Bitcoin: {
      BTC: null,
    },
    Arbitrum: {
      ETH: null,
      USDC: 10000000,
    },
    Solana: {
      SOL: null,
      USDC: 10000000,
    },
    Assethub: {
      DOT: null,
      USDT: null,
      USDC: null,
    },
  },
};

export const availablePools: CfAvailablePools = [
  { base: { chain: 'Ethereum', asset: 'ETH' }, quote: { chain: 'Ethereum', asset: 'USDC' } },
  { base: { chain: 'Arbitrum', asset: 'USDC' }, quote: { chain: 'Ethereum', asset: 'USDC' } },
  { base: { chain: 'Solana', asset: 'USDC' }, quote: { chain: 'Ethereum', asset: 'USDC' } },
  { base: { chain: 'Ethereum', asset: 'FLIP' }, quote: { chain: 'Ethereum', asset: 'USDC' } },
  { base: { chain: 'Arbitrum', asset: 'ETH' }, quote: { chain: 'Ethereum', asset: 'USDC' } },
  { base: { chain: 'Bitcoin', asset: 'BTC' }, quote: { chain: 'Ethereum', asset: 'USDC' } },
  { base: { chain: 'Solana', asset: 'SOL' }, quote: { chain: 'Ethereum', asset: 'USDC' } },
  { base: { chain: 'Ethereum', asset: 'USDT' }, quote: { chain: 'Ethereum', asset: 'USDC' } },
  { base: { chain: 'Assethub', asset: 'DOT' }, quote: { chain: 'Ethereum', asset: 'USDC' } },
  { base: { chain: 'Assethub', asset: 'USDT' }, quote: { chain: 'Ethereum', asset: 'USDC' } },
  { base: { chain: 'Assethub', asset: 'USDC' }, quote: { chain: 'Ethereum', asset: 'USDC' } },
];

export const safeModeStatuses: z.input<typeof cfSafeModeStatuses> = {
  emissions: {
    emissions_sync_enabled: true,
  },
  funding: {
    redeem_enabled: true,
  },
  swapping: {
    swaps_enabled: true,
    withdrawals_enabled: true,
    broker_registration_enabled: true,
  },
  liquidity_provider: {
    deposit_enabled: true,
    withdrawal_enabled: true,
    internal_swaps_enabled: true,
  },
  validator: {
    authority_rotation_enabled: true,
    start_bidding_enabled: true,
    stop_bidding_enabled: true,
  },
  pools: {
    range_order_update_enabled: true,
    limit_order_update_enabled: true,
  },
  trading_strategies: {
    strategy_updates_enabled: true,
    strategy_closure_enabled: true,
    strategy_execution_enabled: true,
  },
  lending_pools: {
    add_boost_funds_enabled: true,
    stop_boosting_enabled: true,
  },
  reputation: {
    reporting_enabled: true,
  },
  asset_balances: {
    reconciliation_enabled: true,
  },
  threshold_signature_evm: {
    slashing_enabled: true,
  },
  threshold_signature_bitcoin: {
    slashing_enabled: true,
  },
  threshold_signature_polkadot: {
    slashing_enabled: true,
  },
  threshold_signature_solana: {
    slashing_enabled: true,
  },
  broadcast_ethereum: {
    retry_enabled: true,
    egress_witnessing_enabled: true,
  },
  broadcast_bitcoin: {
    retry_enabled: true,
    egress_witnessing_enabled: true,
  },
  broadcast_polkadot: {
    retry_enabled: true,
    egress_witnessing_enabled: true,
  },
  broadcast_arbitrum: {
    retry_enabled: true,
    egress_witnessing_enabled: true,
  },
  broadcast_solana: {
    retry_enabled: true,
    egress_witnessing_enabled: true,
  },
  broadcast_assethub: {
    retry_enabled: true,
    egress_witnessing_enabled: true,
  },
  witnesser: 'CodeGreen',
  ingress_egress_ethereum: {
    boost_deposits_enabled: true,
    deposit_channel_creation_enabled: true,
    deposit_channel_witnessing_enabled: true,
    vault_deposit_witnessing_enabled: true,
  },
  ingress_egress_bitcoin: {
    boost_deposits_enabled: true,
    deposit_channel_creation_enabled: true,
    deposit_channel_witnessing_enabled: true,
    vault_deposit_witnessing_enabled: true,
  },
  ingress_egress_polkadot: {
    boost_deposits_enabled: true,
    deposit_channel_creation_enabled: true,
    deposit_channel_witnessing_enabled: true,
    vault_deposit_witnessing_enabled: true,
  },
  ingress_egress_arbitrum: {
    boost_deposits_enabled: true,
    deposit_channel_creation_enabled: true,
    deposit_channel_witnessing_enabled: true,
    vault_deposit_witnessing_enabled: true,
  },
  ingress_egress_solana: {
    boost_deposits_enabled: true,
    deposit_channel_creation_enabled: true,
    deposit_channel_witnessing_enabled: true,
    vault_deposit_witnessing_enabled: true,
  },
  ingress_egress_assethub: {
    boost_deposits_enabled: true,
    deposit_channel_creation_enabled: true,
    deposit_channel_witnessing_enabled: true,
    vault_deposit_witnessing_enabled: true,
  },
  elections_generic: {
    oracle_price_elections: true,
  },
};

export const auctionState: z.input<typeof cfAuctionState> = {
  epoch_duration: 1200,
  current_epoch_started_at: 7062012,
  redemption_period_as_percentage: 50,
  min_funding: '0x8ac7230489e80000',
  min_bid: '0x0',
  auction_size_range: [2, 150],
  min_active_bid: '0x74e4528aafe6e30c3e8',
};

export const monitoringSimulateAuction: z.input<typeof cfMonitoringSimulateAuction> = {
  auction_outcome: {
    winners: [
      'cFJsekrfdseaawit8QfawEWRvD5ypJmLpfFtjpVEcLA2v7bnw',
      'cFM8di6AYc4G8xw651A2dBeeQk4bitasmoukjQQDZZiH84FvC',
      'cFNGw7pdYv18TSNtMMq3LjbpwryNtXnhkbESTLPMvxpMLDa54',
      'cFNQUoqZSCiMkSYnpyqY7FecsmbBWKtSad2JTFdx5CGhuBwst',
      'cFNyy169p7yCy3F9p4bb7mW27Tse3F1v8hw8yTv21Qzwq23xW',
      'cFKzr7DwLCRtSkou5H5moKri7g9WwJ4tAbVJv6dZGhLb811Tc',
      'cFP2cGErEhxzJfVUxk1gHVuE1ALxHJQx335o19bT7QoSWwjhU',
      'cFNzzoURRFHx2fw2EmsCvTc7hBFP34EaP2B23oUcFdbp1FMvx',
      'cFJ1nYWjLSkCR5VRSe772dT4g9LdUXkwaY7NeJ88Pxbs3JSng',
      'cFN6WZTWr2LDpVKb9r4PYwJjXiVSG2CGfPSe5W3FrxKtNbw5B',
      'cFKTjtJ6AhUeVXbneHGNBJaSv9dutqtLZStWKn1bLD2Q2HYD3',
      'cFKbFLbr6HfsXWSVuDvGumsPfzUFq83GaYzKR2Lo7nUo1ERU8',
      'cFNJaJY6mhN1tW5EsquPrF6i84VXfJTKcCJUvXs8cA2na4NyX',
      'cFLgNE8F5DgnPQYyCz5QVHtkqACnSpier99FVpQ8dvsUxMJH1',
      'cFJut1N2voqFyTkyS9pvLHU8hAjoW3DhtJwu1nBViDg5UJpmr',
      'cFKFTjma1tAC6uUiQNi945ZaRZmuvUHStZiaB3sGE9FGtzzMP',
      'cFLvGaVfM14RsENmMmBhbZ2xojWd9Yw34EkN5KSTbtaySDMpk',
      'cFPJHm4J2JB9PiSGzznqR1bSH5TLLBuhbobGBG8JeaZKPQpsB',
      'cFNbDVH1VvmyXxiePc1gUNoK5qUBY1p9vciG4csjQytPs4A9s',
      'cFJ4JRTEibZsr6syJUNrcCzutk8geCyK1r6QAYDNhBFeu4hWX',
      'cFLZ2u7X95WWmnttZRmE5NRK5YF2QVx2zjw9b9ecYY7LZTYey',
      'cFJFhb2foTmKytTm3cBfNSpmuZq98qN2sJSgUp6Jc7bpcsYoa',
      'cFJeBpvLSsRjP2EqepVrQ2YEjbpWuKMcLEbTUitsVnK1AYMn7',
      'cFLGYzkSMpNpwXCxcPFMF75mnpdVcfjFYPfBGmu2FejD89Gqs',
      'cFNmXo3vR6m3tgST1XxtF5qj3zFhX8PjkBioQhrfSLHD61c2G',
      'cFJALYBpteTbTxiSXY4yTqeFSUk9gu3msnGLzYtRqkATax2ML',
      'cFNoNzN3Fs3LA6X51QeWpkCUyTTQh1dm5bQZjr9Foa3LcMJPg',
      'cFMdwXDRcw7473DZfu5rbbGVXWuH9g8PWEjsKpLFXXAfj4f26',
      'cFMEJC2M9St9DNioRhHxzW1cztZWbgLYQcBMpa3XNL55vwdge',
      'cFJ28hBV2oB9QFpLXPTvSnxQZUoK9d7enhBvVg5ePNtqBZYxS',
      'cFNGozRV7gmgaqYy1cRkWoekT7twozEvZvSLUs8fJ5KshhPFH',
      'cFJ7XCcJWQVNcqBq9VvuGJFzFzBc7JAZsS3AUwSgpvn69hTJe',
      'cFNMGMKwbVvXfRb2ajow2UAGSbwqF27buJjAZsJLmm89TcnFK',
      'cFKHRAXwya68XKsLt38nXvAQuvVLrvcQQXqVqWW4Xwgoy3K24',
      'cFLmzdkYF3srdEgw63ZyLDgC1GaNGmJANtLq7FpZhXgcHgXtu',
      'cFMbMvLCJ8EcP5dMdDGQQzugsuNA8fPacCNnP2kFnFQfxbSsF',
      'cFK6rfXbcQpFtr2i3SVnUb3zyzAvFPjcnNfc7cjU9h8pRCPxK',
      'cFJ1RVHBMeDBPmTeUHASV8KecsMjoMuw8YtbuXDUYzT81j58L',
      'cFJS97PZpzotGcVSEEXz2kd9SasoVwSv36jVhj4AV1K7zckWM',
      'cFMmKTs7v3mB26Es69bqXi5BzY7wX3w3Qku2pWERodFeretFc',
      'cFKt3QuFWMu1qi9ALQGM1xMEnyG1audLGHxA8owAHtJSkkDxZ',
      'cFMR1aY13XXcT2c2Tw5iZjXK2weSu17ciKN1opyqjp27EyJWC',
      'cFJvKR8kksK5hQVV8VvDZMPhqWv1PGMgAucd78jDaYrteVnpz',
      'cFMujS4pmKEHNBLv3MBFdYhHrXEdZSqC1dC8gDpbLfTSXkm7Q',
      'cFJsWiyENNhf6Ecz4mLrRdNSukWQ5gTFmm5QD4xp1Y2KMDZrx',
      'cFPSK6NHHHjikURRVDYaqWrubF3upooBHZP6SsfzQFtSwZny8',
      'cFLYYq49rwcXpBB4NZGp5gbygczC17PwHXfXd661ZBaCuj8Ej',
      'cFL4anfBihmuU8CA76SPsgqpqnFzEUWofvPDaBCHXvzNWCdiH',
      'cFJnhCKD6bTZUEoR5XWVENxLLAEaHE3FFHqiEukPKgSZ6JpPk',
      'cFKj1axChhNCf6sK3vDQFUcG47kzASxgKA2kk4MLAeCUhbCzK',
      'cFK731N7CtYBMMP1XVqZwDmdXkws5h1pTX5znTZfCyYGerXfj',
      'cFLRBhSqFP6WcM22WFDCYUAMCYVfs8yeE2BQsQRTnDvFkaWXp',
      'cFPS8Hyg7DNRdB4K2wa4r91VQUUk87ju6BPrPHBX5G1JXzHVg',
      'cFJRMMBQKkHPRAdYqKsmYjn5bJkpMsBBFvZAFGoHagWKRwt7k',
      'cFJ9S4bNQA9xwSJ77aJL3zF7KDZ8wY5374D5vzy4fTJNcEDK8',
      'cFNyzTAXBDKrwYbVt92B8xms8v9iWQR7mqF3eKtVF5EwsveUD',
      'cFMzeRz3HPcQjGLZVZgJgMB2U9omuFese2fevA2txnFBz7W8D',
      'cFKmjxksziUY7NqVtHwmwYkrqMkoCZqmCSrUm8ou2coU8eZCN',
      'cFNxRCi9pMkRBFNnqRwf2NfkWMydD3jsPYQ6jpzmTfML4vMaK',
      'cFK7A8ifq8Sa84z37ecAUyQcXA2JN5oCp5RCXJRRJb7epNs1a',
      'cFNpZZ3Vrs42WWn5N5WeMWiQnEzVrE7bP19fBi74eQZaHzp1c',
      'cFKPDtjPAkJXwzjvAwECptcj4G7qa4YhufjDbtSRNKdoEGDTU',
      'cFK8xyWtqeJQmgAprXJmdwQfPivp48ZpY3ADT7arBGZviGpoY',
      'cFLHaJXsxqXKe4KRSYh7sCXFwgxH8WyWpHXyUfssFgpVB6GTz',
      'cFMK7CdXJ5HxXxm7Purbsy4uaSSHMS9H9SxZ5GqNVsGJ9vbqY',
      'cFNpUERkeV3G9jFVHFY5RZ1Fdnzk73RWnTx2Wh2FVgnmGfPAA',
      'cFHtajnc4AtU8hUxreVox1cdtps5iFSEjBjYWWmJ2KbiwknG6',
      'cFL4VXtbCF1Qb4zcn1fuxFsXKSVikTdm8SnbjMjz2zKWBgagk',
      'cFNDLvLfWQtXGxpyvLCJq3HFQ7bmGPzsoCADBvooq9d5WoJCu',
      'cFHxoRsDtuBjiehbXXoJU4gSbzKyzxpFQHyDKLC8kx5sZx137',
      'cFPVFJj8pyyKaUfVcU9rxociqo9hfdR8U9VwkKLMPpuyb3Y39',
      'cFKvnYcqWdDWsr4s7hkqkhZBFnDGw2njoptsDquj3tWbearpE',
      'cFM9J9Q1sdyGeLEbTwYwQjZ1DKfeuLWtBxh3mRYTxUJNTJCkU',
      'cFM6rbhVdzxbxQJLuhmB93S1rnFdV6ZBw6xoGCGctDoQ7wPii',
      'cFLGdfyeHVFkszsXvEe5bRzyR3jmhNoJRhs5R7TPjnBktpnU9',
      'cFMYeqjpvcp5aMiPoPXpPGr1NPh4rwAuueeTg42UPTxq4GYKM',
      'cFLvTNQnLQzGG1VwXf9Zi74FCx6eis7tMdhe1pVGzgfVYFrm7',
      'cFLpBaBLy7NKB3x9wezzbD8PGZmnwcY9H5XJG9Dc5w8hbpnwB',
      'cFJsut73WRtQoTZEoPCorciWXdH7kjgMYPRigPhtP2ZYutUMB',
      'cFNrDEGLY2RGwwAWkQt3AqSuLdyzBXGoZz9guhGsGJjKq3N7J',
      'cFJPKGymwmw7juXZ2tx9h6qas6jFBtJrXtGVqELMe456VoNqJ',
      'cFNSYvGBn1HYFu1w52UneqdLxqmEHQn8W8LyN8X2KWKjwnDFc',
      'cFLuJszP5dVbmzZWMmFM7RzARHBS6FLEj9ph4Q3njKMXJL337',
      'cFLxY1w3iA1J8s8vYkJTm34FsktKsaMRvgtm7YkxVvXhMfvCa',
      'cFLmx6fwm5hiDGn55fRMiDncdiWiYhXza2fwR5YrTbMNxTxLT',
      'cFK1uwMSV7fXbUzYbmNfuLDQ6wGBfvNat7o8HHib9MuVqvjG3',
      'cFLsUrBgEKVG8UC8EXJzJ6T7uXV7SbdG1q15y1R7vSQCQfebk',
      'cFMu4ApyiukD7HJzWTBSEdkRFC1qZNMR6Vd8ie5EDtbr4sbRs',
      'cFKvfyCJqPWKuAhQw1kBsdd3SLi93o35ZLUu2kDN9gTGa44q4',
      'cFNmLrZUMfUh4ipnaX7de68ckGmxvyV4KFVh2uSLrCnFeo9Xc',
      'cFMGJRoFh1g5fkeHBvpi6LDWHtiYXSomkEx6LEjhUggiMxjfE',
      'cFPMZgK6tjJLwLgsEGJ4eosnUoi4gU3pxyn6omSGsMnqqDx4N',
      'cFLuZxzxXZ67Wfd6o5qbYy3cWMzgEjgjMXvCb2UDib5kWJGGu',
      'cFJsoLo4SBosvs3T4TEw6Y87B673AtnaFyrNpfQFrb6knQ7RK',
      'cFK4nsMckUPwymP8zBxfD2H4wxigTcMPf8PEKmcuBXiTxopzv',
      'cFMp7HxQnfsEPbooWRFE7iHqgsQY5ea6Vp6ZFVUzmtThzK3Wb',
      'cFMKkuKL4mWP8mKwdMxGemrp9uX4tkH35RJ9gHRL57pzmDWxj',
      'cFNjKj9J1EcMoYVxR2L9uq7rk32BLk4BukyrLNumVpZXQ8KTB',
      'cFNuffnVYGYV5NxvoCtZtnvdntks7d7ikf4Nxrafc1Z65LvKG',
      'cFJvPsxxiKdDfkLngwPixnzBKuNfkipf5efTemAV2V9XiW9EW',
      'cFPamRv6tc894YqRsDrEwfLwAwqk9Pu5PhEGqcfPjT7mM39E7',
      'cFLTXkjcs9Zz5zWpwLYmhV5Sm7vUAQwA9Pr34U8NPQLRzo4z1',
      'cFMY2CsgTZjRMvtnn4ygyeAdnJDuBA1jdu8UwnWMZ4TeqkzLJ',
      'cFLKbFDnSucw5w93xkXgDXH4XYVWxJ3RFEjQGhzuuT3ipvuGT',
      'cFPMTZ8p4R8km8hD1QQAexkjaLXqWhihyDpUzpASMwC4uAfhY',
      'cFJFLjdbLQHHCP5xsrWdPUQQiSCAyfZibM96VfWAHAdkgeDgE',
      'cFPQVxn15qJC3PgM71yahejwky8jPfQFb3XvrvfvKar8EWxXW',
      'cFKxiQf5v5bgCtgesN8WioTDz9g3Vp8yTZNaPTZbLYPbTBe1K',
      'cFJc34jBQSncn7YyfhpvW9h8UAg41UYv3HfpBXvBC6NvBM4tk',
      'cFJstpdoWUrws7oA7QvYVDevVH5ddBZnL7QJGSEEUU4WUserG',
      'cFNH12mtCf4mDHEvArkdKNbyTr6zWe6bcb3rAkvh5DmF4JV6B',
      'cFMVRCvCJ5vKd6cMoT6fQqp6UCcJmjxDSJ9eXDSDKrJWiGjtM',
      'cFKzn16Zx7vmxeV3DFeto8mM86PsZtsiNfonR571CqUJSgua8',
      'cFJ3zLQUc7vqm1d6ZM83qq6marFFmTC6oXuziMcaxfBV565P3',
      'cFLs3fraZbvASW4iAUaQXULGVaBwwb5626SkpYCLzCJEm5KQR',
    ],
    bond: '0x166bac41b62e4855aeff',
  },
  operators_info: {
    cFKBmsMXwSBEiyhiiNRqLwyzY8bBM2GCgLRXNUyNo4dCP6vTX: {
      operator: 'cFKBmsMXwSBEiyhiiNRqLwyzY8bBM2GCgLRXNUyNo4dCP6vTX',
      validators: {
        cFJ3zLQUc7vqm1d6ZM83qq6marFFmTC6oXuziMcaxfBV565P3: '0x1435dcdc4214428bc08b',
        cFKzn16Zx7vmxeV3DFeto8mM86PsZtsiNfonR571CqUJSgua8: '0x45d4dac827b65ec342d',
        cFLs3fraZbvASW4iAUaQXULGVaBwwb5626SkpYCLzCJEm5KQR: '0x13b4759892ecb4850c5e',
        cFMVRCvCJ5vKd6cMoT6fQqp6UCcJmjxDSJ9eXDSDKrJWiGjtM: '0x140113ceb41ad2863a70',
      },
      delegators: {
        cFHsUq1uK5opJudRDczuvR39wwBZvLX6DAYNnn7dV7CVW3enA: '0x11a3663064ae12a9425',
        cFHsUq1uK5opJudRDd16u4BR72xaEtoxHxJMgfAL6W4Y8c39N: '0x6d6e5489b25d29e3694',
        cFHsUq1uK5opJudRDd1B1qAXyqw8AuJYkQyHx6NzAWcfspWDo: '0x65a4da25d3016c00000',
        cFHsUq1uK5opJudRDd1GKGifVD8WTTmjHVZqgpMPYW5jNoRiu: '0x2c2f31e2d9d03f73af',
        cFHsUq1uK5opJudRDd1U1y6YN1u9WbubzLyY9m1dyqPue85KD: '0x13edb93d14e18c617d5',
        cFHsUq1uK5opJudRDd1UMEYSVYqxjFmYC7XQwMzE5GGooXAHF: '0x1c59fdcbfd8e32e47dc',
        cFHsUq1uK5opJudRDd1mjeneqEmJpBSRqhvNqiHZR3WazJY2C: '0x22b1c8c1227a00000',
        cFHsUq1uK5opJudRDd1s9Acis2cvptq57VYvpSCtKJXm85bbg: '0x7e7be09ce6e3376e25d',
      },
      delegation_fee_bps: 1500,
    },
    cFKTvCPY4D2jdZULjtgphSDpRzyCHwPJcFhLaXLY9hPC463Xq: {
      operator: 'cFKTvCPY4D2jdZULjtgphSDpRzyCHwPJcFhLaXLY9hPC463Xq',
      validators: {
        cFJsoLo4SBosvs3T4TEw6Y87B673AtnaFyrNpfQFrb6knQ7RK: '0x43c41a2233d5b87d680',
        cFK4nsMckUPwymP8zBxfD2H4wxigTcMPf8PEKmcuBXiTxopzv: '0x43ccc6877eb6b1950c0',
        cFKvfyCJqPWKuAhQw1kBsdd3SLi93o35ZLUu2kDN9gTGa44q4: '0x43c41a20626046a67c0',
        cFLuZxzxXZ67Wfd6o5qbYy3cWMzgEjgjMXvCb2UDib5kWJGGu: '0x43ccc6877eb6b1950c0',
        cFMGJRoFh1g5fkeHBvpi6LDWHtiYXSomkEx6LEjhUggiMxjfE: '0x43c419fbdb7d85e85c0',
        cFNmLrZUMfUh4ipnaX7de68ckGmxvyV4KFVh2uSLrCnFeo9Xc: '0x43ccc687b6e56adab00',
        cFPMZgK6tjJLwLgsEGJ4eosnUoi4gU3pxyn6omSGsMnqqDx4N: '0x43ca22e027b52f2a8f2',
      },
      delegators: {
        cFHsUq1uK5opJudRDczoXtMszDUL6ngYvW3j7AcXHBeBYdgZ1: '0xd96cf1180713b95170',
        cFHsUq1uK5opJudRDczryUdfhU7KFpveE7y55M3yEQSyi2cvj: '0x2bfa368edc2ccfe78d4',
        cFHsUq1uK5opJudRDczt8QhCrQVJ1v2nd84pobwAbBzv4z3WS: '0xc77e4256863d80000',
        cFHsUq1uK5opJudRDczufqbUwfXGyzn2tjcTQmfF4GSkoESMA: '0x3635c9adc5dea00000',
        cFHsUq1uK5opJudRDczwZ3e7VJHH7K6ovcNpKbMGj8RrzFcHR: '0x69760e5cdbabe0a973b',
        cFHsUq1uK5opJudRDd192c6YoAQUdDLQeqFhKZkKDEUxn3JPR: '0x157e58603fe808ebc38d',
        cFHsUq1uK5opJudRDd197Bw8yE3yvbF97ZEwCBbJnzLgc5Kj3: '0x2c0bb3dd30c4e200000',
        cFHsUq1uK5opJudRDd19EHeuggHgo5ss3NrBAQPg8JmSS9i5Y: '0x1bc591b694942bebe696',
        cFHsUq1uK5opJudRDd19LXwMxEojGewqaqjvPRMH66kpwD8NP: '0x7dbad794e80c4d0ef8f',
        cFHsUq1uK5opJudRDd1CXED8P7eodERgW5gDDAf1nHnAEHU3A: '0x52d5d09c18dbe40000',
        cFHsUq1uK5opJudRDd1EFLE9ZWxEZkLoQJbhpYjA1bYmT1FLX: '0xd8d726b7177a800000',
        cFHsUq1uK5opJudRDd1NMrwaxCe8Jq7ncj3QKnRYUiEFA3FSw: '0xa2a15d09519be00000',
        cFHsUq1uK5opJudRDd1Q9YMN8S8Az6w6pLBkiwfyi34Gsz4gC: '0xad78ebc5ac6200000',
        cFHsUq1uK5opJudRDd1Sjpf1n4FsCUK9xfMAPhXNRPs7e5J3j: '0x54c2968911d11995343',
        cFHsUq1uK5opJudRDd1TANfvWbWXBTTJgnLpiNoBM69B5x6eW: '0x20ae3efe0c9db3280000',
        cFHsUq1uK5opJudRDd1UE2yVAdGdYDkDWjCNYo5ZdgP4qS8Gz: '0x1e7e4171bf4d3a00000',
        cFHsUq1uK5opJudRDd1V6vAYxfAB3NChEUYMsLwe1D3HPyASn: '0x612876678caf879df08',
        cFHsUq1uK5opJudRDd1VfLCwjvRtWmdbiy26XBtWpF4EUjnNr: '0x1b1ae4d6e2ef5000000',
        cFHsUq1uK5opJudRDd1WTaYFuJbF5SuwjRAWq315dFXWEF6tW: '0x5769eece9bdd6200000',
        cFHsUq1uK5opJudRDd1XXX9XmMuXqMCrrAcCBqVjNhfAZHXEU: '0x2bb2b017a4a0a1c8000',
        cFHsUq1uK5opJudRDd1agcXg6Gp9XgpccsnU7BuxmzVXpk72d: '0x3377dcf94080248000',
        cFHsUq1uK5opJudRDd1o4LAc3JVyGg1XvayEN7rxC7oHyDgmu: '0x11ffdbf6b2b2eb200000',
        cFHsUq1uK5opJudRDd1qHCxK5S582TZU5gyzBttoUmizG4bny: '0x6046f37e5945c0000',
        cFHsUq1uK5opJudRDd1qqEoJS3roLpxCb2Whf1qVeE63ypp5f: '0x3d50e5d48f161c78000',
      },
      delegation_fee_bps: 1500,
    },
    cFMKGuLCxBtM9qsTwg9j4JkYc5dw7whs89kGxcwY2hSxX3wPn: {
      operator: 'cFMKGuLCxBtM9qsTwg9j4JkYc5dw7whs89kGxcwY2hSxX3wPn',
      validators: {
        cFK1uwMSV7fXbUzYbmNfuLDQ6wGBfvNat7o8HHib9MuVqvjG3: '0x1640af8cccfda674c5d1',
        cFLsUrBgEKVG8UC8EXJzJ6T7uXV7SbdG1q15y1R7vSQCQfebk: '0xba58e53bc8c12fafa80',
      },
      delegators: {
        cFHsUq1uK5opJudRDczwbXw9CqYto8Tqzk7CUGwcHm9tBhDCt: '0x56bc75e2d631000000',
        cFHsUq1uK5opJudRDd1LHWW2t4w44zhCdz38eafV3smvAAMcR: '0x26cb2934f774432ad6b',
        cFHsUq1uK5opJudRDd1N3DX3n59XR9MUDYABmCuKSWpNCpzjA: '0xb4f6649f8d94b505be9',
        cFHsUq1uK5opJudRDd1WuQheazmtcUkEAu8rXp8L18arwDqHo: '0x920579c7826f1005bc7',
      },
      delegation_fee_bps: 1500,
    },
    cFNZ9zdPs5kS6H3CiM5GHNDAkmWfhgRFDwZuaD1wzCCDA6kwZ: {
      operator: 'cFNZ9zdPs5kS6H3CiM5GHNDAkmWfhgRFDwZuaD1wzCCDA6kwZ',
      validators: {
        cFKpSepybpNpQ2iaWsjrBgLjmB6d1z1Y9DvQFUxBqvoxtitmF: '0x43f8a011b0524ceaed4',
      },
      delegators: {},
      delegation_fee_bps: 1500,
    },
  },
  new_validators: [
    'cFJsoLo4SBosvs3T4TEw6Y87B673AtnaFyrNpfQFrb6knQ7RK',
    'cFK4nsMckUPwymP8zBxfD2H4wxigTcMPf8PEKmcuBXiTxopzv',
    'cFKvfyCJqPWKuAhQw1kBsdd3SLi93o35ZLUu2kDN9gTGa44q4',
    'cFKzn16Zx7vmxeV3DFeto8mM86PsZtsiNfonR571CqUJSgua8',
    'cFLsUrBgEKVG8UC8EXJzJ6T7uXV7SbdG1q15y1R7vSQCQfebk',
    'cFLuZxzxXZ67Wfd6o5qbYy3cWMzgEjgjMXvCb2UDib5kWJGGu',
    'cFLvTNQnLQzGG1VwXf9Zi74FCx6eis7tMdhe1pVGzgfVYFrm7',
    'cFM6rbhVdzxbxQJLuhmB93S1rnFdV6ZBw6xoGCGctDoQ7wPii',
    'cFMGJRoFh1g5fkeHBvpi6LDWHtiYXSomkEx6LEjhUggiMxjfE',
    'cFNmLrZUMfUh4ipnaX7de68ckGmxvyV4KFVh2uSLrCnFeo9Xc',
    'cFPMZgK6tjJLwLgsEGJ4eosnUoi4gU3pxyn6omSGsMnqqDx4N',
  ],
  current_mab: '0x13fc568fb870d0926ab4',
};

export const cfOraclePrice: z.input<typeof cfOraclePrices> = [
  {
    price: '0x1e449a940000000000000000000000000000000000',
    updated_at_oracle_timestamp: 1754318883,
    updated_at_statechain_block: 43871,
    base_asset: 'Btc',
    quote_asset: 'Usd',
  },
  {
    price: '0x44b82fa09b5a52cb98b405447',
    updated_at_oracle_timestamp: 1754056071,
    updated_at_statechain_block: 69,
    base_asset: 'Eth',
    quote_asset: 'Usd',
  },
  {
    price: '0x19999999999999999999999999999999',
    updated_at_oracle_timestamp: 1754056071,
    updated_at_statechain_block: 69,
    base_asset: 'Sol',
    quote_asset: 'Usd',
  },
  {
    price: '0x100000000000000000000000000000000',
    updated_at_oracle_timestamp: 1752662428,
    updated_at_statechain_block: 9,
    base_asset: 'Usdc',
    quote_asset: 'Usd',
  },
  {
    price: '0x100000000000000000000000000000000',
    updated_at_oracle_timestamp: 1752662431,
    updated_at_statechain_block: 9,
    base_asset: 'Usdt',
    quote_asset: 'Usd',
  },
];

export const lendingPools: z.input<typeof cfLendingPools> = [
  {
    asset: {
      chain: 'Bitcoin',
      asset: 'BTC',
    },
    total_amount: '0xbebc200',
    available_amount: '0xbebc200',
    utilisation_rate: 0,
    current_interest_rate: 200,
    origination_fee: 100,
    liquidation_fee: 500,
    interest_rate_curve: {
      interest_at_zero_utilisation: 20000,
      junction_utilisation: 900000,
      interest_at_junction_utilisation: 80000,
      interest_at_max_utilisation: 500000,
    },
  },
  {
    asset: {
      chain: 'Solana',
      asset: 'USDC',
    },
    total_amount: '0x0',
    available_amount: '0x0',
    utilisation_rate: 10000,
    current_interest_rate: 5000,
    origination_fee: 100,
    liquidation_fee: 500,
    interest_rate_curve: {
      interest_at_zero_utilisation: 20000,
      junction_utilisation: 900000,
      interest_at_junction_utilisation: 80000,
      interest_at_max_utilisation: 500000,
    },
  },
];

export const lendingConfig: z.input<typeof cfLendingConfig> = {
  ltv_thresholds: {
    target: 800000,
    topup: null,
    soft_liquidation: 900000,
    soft_liquidation_abort: 880000,
    hard_liquidation: 950000,
    hard_liquidation_abort: 930000,
    low_ltv: 500000,
  },
  network_fee_contributions: {
    extra_interest: 10000,
    from_origination_fee: 200000,
    from_liquidation_fee: 200000,
    low_ltv_penalty_max: 10000,
  },
  fee_swap_interval_blocks: 10,
  interest_payment_interval_blocks: 10,
  fee_swap_threshold_usd: '0x1312d00',
  interest_collection_threshold_usd: '0x186a0',
  soft_liquidation_swap_chunk_size_usd: '0x2540be400',
  hard_liquidation_swap_chunk_size_usd: '0xba43b7400',
  soft_liquidation_max_oracle_slippage: 50,
  hard_liquidation_max_oracle_slippage: 500,
  fee_swap_max_oracle_slippage: 50,
  minimum_loan_amount_usd: '0x5f5e100',
  minimum_supply_amount_usd: '0x5f5e100',
  minimum_update_loan_amount_usd: '0x989680',
  minimum_update_collateral_amount_usd: '0x989680',
};

export const loanAccounts: z.input<typeof cfLoanAccounts> = [
  {
    account: 'cFL8fmgKZcchhtLagBH2GKfsuWxBqUaD5CYE1m7DFb8DBSLJ1',
    primary_collateral_asset: {
      chain: 'Bitcoin',
      asset: 'BTC',
    },
    ltv_ratio: '1333333333',
    collateral: [
      {
        chain: 'Bitcoin',
        asset: 'BTC',
        amount: '0x3',
      },
    ],
    loans: [
      {
        loan_id: 1,
        asset: {
          chain: 'Ethereum',
          asset: 'USDC',
        },
        principal_amount: '0x3e8',
      },
    ],
    liquidation_status: {
      liquidation_swaps: [
        {
          swap_request_id: 1,
          loan_id: 1,
        },
      ],
      liquidation_type: 'Hard',
    },
  },
];

export const lendingPoolSupplyBalances: z.input<typeof cfLendingPoolSupplyBalances> = [
  {
    chain: 'Bitcoin',
    asset: 'BTC',
    positions: [
      {
        lp_id: 'cFKKYDgKLHgKRfHEwTPsGj2SJmmha5mGqajHEPXo1Chaqa96Q',
        total_amount: '0x7726ee00',
      },
      {
        lp_id: 'cFL8fmgKZcchhtLagBH2GKfsuWxBqUaD5CYE1m7DFb8DBSLJ1',
        total_amount: '0xbebc200',
      },
    ],
  },
  {
    chain: 'Ethereum',
    asset: 'ETH',
    positions: [
      {
        lp_id: 'cFKKYDgKLHgKRfHEwTPsGj2SJmmha5mGqajHEPXo1Chaqa96Q',
        total_amount: '0x56bc75e2d63100000',
      },
    ],
  },
  {
    chain: 'Solana',
    asset: 'SOL',
    positions: [
      {
        lp_id: 'cFKKYDgKLHgKRfHEwTPsGj2SJmmha5mGqajHEPXo1Chaqa96Q',
        total_amount: '0x174876e800',
      },
    ],
  },
  {
    chain: 'Ethereum',
    asset: 'USDT',
    positions: [
      {
        lp_id: 'cFKKYDgKLHgKRfHEwTPsGj2SJmmha5mGqajHEPXo1Chaqa96Q',
        total_amount: '0x2540be400',
      },
    ],
  },
  {
    chain: 'Ethereum',
    asset: 'USDC',
    positions: [
      {
        lp_id: 'cFKKYDgKLHgKRfHEwTPsGj2SJmmha5mGqajHEPXo1Chaqa96Q',
        total_amount: '0x2540d5b00',
      },
    ],
  },
];
export const vaultAddresses = {
  ethereum: {
    Eth: [245, 225, 3, 128, 33, 56, 128, 17, 21, 34, 221, 14, 253, 61, 187, 69, 185, 246, 43, 204],
  },
  arbitrum: {
    Arb: [121, 0, 26, 94, 118, 47, 59, 239, 200, 229, 135, 27, 66, 246, 115, 78, 0, 73, 137, 32],
  },
  bitcoin: [
    [
      'cFJZVRaybb2PBwxTiAiRLiQfHY4KPB3RpJK22Q7Fhqk979aCH',
      {
        Btc: [
          98, 99, 49, 112, 101, 99, 103, 120, 122, 48, 108, 115, 51, 113, 115, 55, 119, 99, 118,
          122, 102, 53, 53, 115, 106, 122, 104, 52, 113, 108, 106, 106, 53, 107, 109, 51, 53, 103,
          108, 51, 103, 113, 108, 99, 115, 101, 52, 108, 107, 120, 115, 116, 118, 110, 104, 113,
          115, 102, 108, 101, 55, 115,
        ],
      },
    ],
    [
      'cFJZVRaybb2PBwxTiAiRLiQfHY4KPB3RpJK22Q7Fhqk979aCH',
      {
        Btc: [
          98, 99, 49, 112, 109, 108, 101, 99, 103, 53, 113, 109, 110, 122, 97, 109, 114, 107, 114,
          107, 104, 122, 97, 116, 114, 55, 50, 109, 115, 122, 107, 106, 97, 50, 97, 115, 107, 107,
          116, 50, 117, 56, 100, 119, 101, 50, 51, 57, 48, 118, 55, 114, 122, 117, 121, 113, 117,
          52, 119, 114, 110, 120,
        ],
      },
    ],
    [
      'cFKpid38PmmZ8V81AHaZAhHzzpRbsf7Xw5PYt5ajTXAUvHoTQ',
      {
        Btc: [
          98, 99, 49, 112, 50, 118, 101, 55, 121, 48, 116, 115, 120, 52, 106, 101, 54, 107, 113,
          100, 112, 120, 103, 106, 120, 118, 113, 115, 103, 101, 106, 117, 113, 112, 103, 48, 117,
          57, 118, 51, 119, 56, 55, 112, 122, 51, 53, 108, 104, 118, 114, 48, 48, 109, 106, 115,
          115, 120, 50, 51, 112, 56,
        ],
      },
    ],
    [
      'cFKpid38PmmZ8V81AHaZAhHzzpRbsf7Xw5PYt5ajTXAUvHoTQ',
      {
        Btc: [
          98, 99, 49, 112, 51, 57, 53, 112, 116, 99, 57, 55, 120, 121, 117, 101, 48, 112, 101, 53,
          120, 50, 122, 113, 107, 56, 108, 101, 118, 50, 101, 100, 117, 104, 101, 118, 103, 48, 54,
          112, 54, 117, 112, 122, 122, 50, 53, 56, 48, 51, 53, 56, 112, 104, 110, 115, 121, 114, 52,
          48, 97, 107,
        ],
      },
    ],
    [
      'cFLRQDfEdmnv6d2XfHJNRBQHi4fruPMReLSfvB8WWD2ENbqj7',
      {
        Btc: [
          98, 99, 49, 112, 117, 104, 103, 100, 52, 114, 50, 103, 104, 104, 122, 110, 48, 104, 110,
          114, 101, 56, 108, 115, 109, 117, 108, 106, 106, 100, 53, 120, 122, 57, 112, 50, 122, 106,
          53, 101, 118, 106, 100, 120, 50, 100, 51, 54, 121, 57, 50, 122, 51, 50, 99, 113, 99, 114,
          119, 101, 50, 113,
        ],
      },
    ],
    [
      'cFLRQDfEdmnv6d2XfHJNRBQHi4fruPMReLSfvB8WWD2ENbqj7',
      {
        Btc: [
          98, 99, 49, 112, 51, 106, 119, 55, 113, 104, 115, 112, 99, 100, 103, 113, 118, 51, 109,
          108, 102, 106, 116, 114, 52, 55, 54, 106, 103, 54, 108, 99, 119, 117, 110, 99, 54, 101,
          117, 50, 115, 116, 53, 110, 56, 122, 48, 114, 120, 109, 114, 48, 115, 116, 54, 113, 116,
          108, 106, 109, 117, 113,
        ],
      },
    ],
    [
      'cFNx21kQWmr9wsqq29zWM7RpDBKv4bctudEUE6J22Hd4NUUHR',
      {
        Btc: [
          98, 99, 49, 112, 97, 121, 48, 107, 120, 103, 50, 50, 106, 53, 102, 106, 104, 116, 103,
          114, 102, 108, 120, 51, 116, 120, 116, 121, 112, 57, 56, 107, 54, 100, 112, 54, 57, 110,
          55, 99, 114, 55, 122, 103, 108, 53, 101, 119, 114, 99, 112, 109, 97, 119, 106, 113, 54,
          106, 118, 114, 110, 119,
        ],
      },
    ],
    [
      'cFNx21kQWmr9wsqq29zWM7RpDBKv4bctudEUE6J22Hd4NUUHR',
      {
        Btc: [
          98, 99, 49, 112, 115, 115, 117, 102, 120, 97, 110, 114, 106, 100, 48, 99, 99, 116, 56,
          116, 50, 110, 106, 57, 119, 107, 104, 57, 101, 112, 121, 119, 50, 48, 122, 120, 56, 114,
          106, 102, 54, 99, 99, 107, 122, 57, 48, 117, 51, 104, 106, 110, 53, 109, 101, 113, 101,
          103, 117, 100, 51, 120,
        ],
      },
    ],
  ],
} as const;
