import { z } from 'zod';
import { cfGetTradingStrategies } from '../parsers';

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

export const supportedAssets = [
  { chain: 'Ethereum', asset: 'ETH' },
  { chain: 'Ethereum', asset: 'FLIP' },
  { chain: 'Ethereum', asset: 'USDC' },
  { chain: 'Ethereum', asset: 'USDT' },
  { chain: 'Polkadot', asset: 'DOT' },
  { chain: 'Bitcoin', asset: 'BTC' },
  { chain: 'Arbitrum', asset: 'ETH' },
  { chain: 'Arbitrum', asset: 'USDC' },
  { chain: 'Solana', asset: 'SOL' },
  { chain: 'Solana', asset: 'USDC' },
];

export const ingressEgressEnvironment: z.input<typeof cfIngressEgressEnvironment> = {
  minimum_deposit_amounts: {
    Ethereum: { ETH: '0x0', FLIP: '0x0', USDC: '0x0', USDT: '0x0' },
    Polkadot: { DOT: '0x0' },
    Bitcoin: { BTC: '0x0' },
    Arbitrum: { ETH: '0x0', USDC: '0x0' },
    Solana: { SOL: '0x0', USDC: '0x0' },
    Assethub: { DOT: '0x0', USDC: '0x0', USDT: '0x0' },
  },
  ingress_fees: {
    Ethereum: { ETH: '0x55730', FLIP: '0x0', USDC: '0x0', USDT: '0x0' },
    Polkadot: { DOT: '0xbc28f20' },
    Bitcoin: { BTC: '0x4e' },
    Arbitrum: { ETH: '0x574b457d400', USDC: '0x231b' },
    Solana: { SOL: '0xb0', USDC: '0x0' },
    Assethub: { DOT: '0x0', USDC: '0x0', USDT: '0x0' },
  },
  egress_fees: {
    Ethereum: { ETH: '0x77a10', FLIP: '0x0', USDC: '0x0', USDT: '0x0' },
    Polkadot: { DOT: '0xbc4d910' },
    Bitcoin: { BTC: '0xb0' },
    Arbitrum: { ETH: '0x74645ca7000', USDC: '0x2701' },
    Solana: { SOL: '0xb0', USDC: '0x0' },
    Assethub: { DOT: '0x0', USDC: '0x0', USDT: '0x0' },
  },
  witness_safety_margins: {
    Bitcoin: 2,
    Polkadot: null,
    Ethereum: 2,
    Arbitrum: 1,
    Solana: 1,
    Assethub: null,
  },
  egress_dust_limits: {
    Ethereum: { ETH: '0x1', FLIP: '0x1', USDC: '0x1', USDT: '0x1' },
    Polkadot: { DOT: '0x1' },
    Bitcoin: { BTC: '0x258' },
    Arbitrum: { ETH: '0x1', USDC: '0x1' },
    Solana: { SOL: '0x1', USDC: '0x1' },
    Assethub: { DOT: '0x0', USDC: '0x0', USDT: '0x0' },
  },
  channel_opening_fees: {
    Arbitrum: '0x0',
    Ethereum: '0x0',
    Polkadot: '0x0',
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

export const unregisteredAccount: z.input<typeof unregistered> = {
  role: 'unregistered',
  flip_balance: '0x0',
  asset_balances: {
    Ethereum: { ETH: '0x0', FLIP: '0x0', USDC: '0x0', USDT: '0x0' },
    Polkadot: { DOT: '0x0' },
    Bitcoin: { BTC: '0x0' },
    Arbitrum: { ETH: '0x0', USDC: '0x0' },
    Solana: { SOL: '0x0', USDC: '0x0' },
  },
};

export const liquidityProviderAccount: z.input<typeof liquidityProvider> = {
  role: 'liquidity_provider',
  balances: {
    Ethereum: { ETH: '0x0', FLIP: '0x0', USDC: '0x0', USDT: '0x0' },
    Polkadot: { DOT: '0x0' },
    Bitcoin: { BTC: '0x0' },
    Arbitrum: { ETH: '0x0', USDC: '0x0' },
    Solana: { SOL: '0x0', USDC: '0x0' },
    Assethub: { DOT: '0x0', USDC: '0x0', USDT: '0x0' },
  },
  refund_addresses: {
    Ethereum: '0xacd7c0481fc71dce9e3e8bd4cca5828ce8302629',
    Polkadot: null,
    Bitcoin: 'bc1qqt3juqef9azhd0zeuamu9c30pg5xdllvmks2ja',
    Arbitrum: null,
    Solana: '7zLEfU3nQKqnfrN2A5yNEiFd1Vt9D7maVaoSAV8invMT',
  },
  flip_balance: '0x456306aa68edbb80',
  earned_fees: {
    Ethereum: { ETH: 0, FLIP: 0, USDC: 0, USDT: 0 },
    Polkadot: { DOT: 0 },
    Bitcoin: { BTC: 0 },
    Arbitrum: { ETH: 0, USDC: 0 },
    Solana: { SOL: 0, USDC: 0 },
    Assethub: { DOT: 0, USDC: 0, USDT: 0 },
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
      USDC: [],
    },
    Assethub: {
      DOT: [],
      USDC: [],
      USDT: [],
    },
  },
};

export const brokerAccount: z.input<typeof broker> = {
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
  btc_vault_deposit_address: 'tb1pqyqszqgpqyqszqgpqyqszqgpqyqszqgpqyqszqgpqyqszqgpqyqsn60vlk',
  affiliates: [
    {
      account_id: 'cFJjZKzA5rUTb9qkZMGfec7piCpiAQKr15B4nALzriMGQL8BE',
      short_id: 1,
      withdrawal_address: '0x9a449133c6a8b4e117840b69e2a1d43634f562d3',
    },
  ],
  bond: '0x0',
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
    Solana: {
      SOL: 0,
      USDC: 0,
    },
  },
  bond: '0x0',
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
];
