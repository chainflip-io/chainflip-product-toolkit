import { type HexString } from '@chainflip/utils/types';
import { Server } from 'http';
import { type AddressInfo } from 'net';
import { promisify } from 'util';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
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
  type requestSwapParameterEncoding,
  type cfFailedCallEvm,
  cfPoolOrderbook,
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
  { chain: 'Solana', asset: 'SOL' },
  { chain: 'Solana', asset: 'USDC' },
];

const ingressEgressEnvironment: z.input<typeof cfIngressEgressEnvironment> = {
  minimum_deposit_amounts: {
    Ethereum: { ETH: '0x0', FLIP: '0x0', USDC: '0x0', USDT: '0x0' },
    Polkadot: { DOT: '0x0' },
    Bitcoin: { BTC: '0x0' },
    Arbitrum: { ETH: '0x0', USDC: '0x0' },
    Solana: { SOL: '0x0', USDC: '0x0' },
  },
  ingress_fees: {
    Ethereum: { ETH: '0x55730', FLIP: '0x0', USDC: '0x0', USDT: '0x0' },
    Polkadot: { DOT: '0xbc28f20' },
    Bitcoin: { BTC: '0x4e' },
    Arbitrum: { ETH: '0x574b457d400', USDC: '0x231b' },
    Solana: { SOL: '0xb0', USDC: '0x0' },
  },
  egress_fees: {
    Ethereum: { ETH: '0x77a10', FLIP: '0x0', USDC: '0x0', USDT: '0x0' },
    Polkadot: { DOT: '0xbc4d910' },
    Bitcoin: { BTC: '0xb0' },
    Arbitrum: { ETH: '0x74645ca7000', USDC: '0x2701' },
    Solana: { SOL: '0xb0', USDC: '0x0' },
  },
  witness_safety_margins: {
    Bitcoin: 2,
    Polkadot: null,
    Ethereum: 2,
    Arbitrum: 1,
    Solana: 1,
  },
  egress_dust_limits: {
    Ethereum: { ETH: '0x1', FLIP: '0x1', USDC: '0x1', USDT: '0x1' },
    Polkadot: { DOT: '0x1' },
    Bitcoin: { BTC: '0x258' },
    Arbitrum: { ETH: '0x1', USDC: '0x1' },
    Solana: { SOL: '0x1', USDC: '0x1' },
  },
  channel_opening_fees: {
    Arbitrum: '0x0',
    Ethereum: '0x0',
    Polkadot: '0x0',
    Bitcoin: '0x0',
    Solana: '0x0',
  },
  max_swap_retry_duration_blocks: {
    Arbitrum: 1,
    Ethereum: 1,
    Polkadot: 1,
    Bitcoin: 1,
    Solana: 1,
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
    Solana: {
      SOL: null,
      USDC: null,
    },
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
      USDC: null,
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

const swapParameterEncodingBitcoin: z.input<typeof requestSwapParameterEncoding> = {
  chain: 'Bitcoin',
  nulldata_payload:
    '0x0003656623d865425c0a4955ef7e7a39d09f58554d0800000000000000000000000000000000000001000200000100',
  deposit_address: 'bcrt1pmrhjpvq2w7cgesrcrvuhqw6n6j487l6uc7tmwtx9jen7ezesunhqllvzxx',
};

const swapParameterEncodingEthereum: z.input<typeof requestSwapParameterEncoding> = {
  chain: 'Ethereum',
  calldata:
    '0xdd68734500000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000014b5fb203bd12f528813b512408b374a8f0f44367a000000000000000000000000000000000000000000000000000000000000000000000000000000000000005f0000000000004cd85eb477b4820bbf10dc4689d8b344c2722eac000000000000000000000000000000000000000000000000000000000000000000009059e6d854b769a505d01148af212bf8cb7f8469a7153edce8dcaedd9d29912501000000',
  value: '0x4563918244f40000',
  to: '0xb7a5bd0345ef1cc5e66bf61bdec17d2461fbd968',
  source_token_address: '0x10c6e9530f1c1af873a391030a1d9e8ed0630d26',
};

const swapParameterEncodingSolana: z.input<typeof requestSwapParameterEncoding> = {
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
  asset_balances: {
    Ethereum: { ETH: '0x0', FLIP: '0x0', USDC: '0x0', USDT: '0x0' },
    Polkadot: { DOT: '0x0' },
    Bitcoin: { BTC: '0x0' },
    Arbitrum: { ETH: '0x0', USDC: '0x0' },
    Solana: { SOL: '0x0', USDC: '0x0' },
  },
};

const liquidityProviderAccount: z.input<typeof liquidityProvider> = {
  role: 'liquidity_provider',
  balances: {
    Ethereum: { ETH: '0x0', FLIP: '0x0', USDC: '0x0', USDT: '0x0' },
    Polkadot: { DOT: '0x0' },
    Bitcoin: { BTC: '0x0' },
    Arbitrum: { ETH: '0x0', USDC: '0x0' },
    Solana: { SOL: '0x0', USDC: '0x0' },
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
    Solana: {
      SOL: 0,
      USDC: 0,
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

const failedCallEvm: z.input<typeof cfFailedCallEvm> = {
  contract: '0xdeadbeef',
  data: 'some data i guess',
};

const poolOrderbook: z.input<typeof cfPoolOrderbook> = {
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

const isHexString = (value: unknown): value is HexString =>
  typeof value === 'string' && value.startsWith('0x');

describe(HttpClient, () => {
  it('returns all methods', () => {
    expect(new HttpClient('http://localhost:8080').methods()).toMatchInlineSnapshot(`
      [
        "broker_request_swap_deposit_address",
        "broker_request_swap_parameter_encoding",
        "cf_account_info",
        "cf_accounts",
        "cf_auction_state",
        "cf_authority_emission_per_block",
        "cf_boost_pool_details",
        "cf_boost_pool_pending_fees",
        "cf_boost_pools_depth",
        "cf_environment",
        "cf_epoch_duration",
        "cf_eth_key_manager_address",
        "cf_eth_state_chain_gateway_address",
        "cf_failed_call_arbitrum",
        "cf_failed_call_ethereum",
        "cf_flip_supply",
        "cf_funding_environment",
        "cf_ingress_egress_environment",
        "cf_pool_depth",
        "cf_pool_orderbook",
        "cf_pool_orders",
        "cf_pool_price_v2",
        "cf_pools_environment",
        "cf_request_swap_parameter_encoding",
        "cf_supported_assets",
        "cf_swap_rate",
        "cf_swap_rate_v2",
        "cf_swap_rate_v3",
        "cf_swapping_environment",
        "chain_getBlockHash",
        "lp_total_balances",
        "state_getMetadata",
        "state_getRuntimeVersion",
      ]
    `);
  });

  it('handles network errors when fetch throws', async () => {
    const client = new HttpClient('http://localhost:1313');

    await expect(client.sendRequest('cf_accounts')).rejects.toThrowErrorMatchingInlineSnapshot(
      `[Error: Network error]`,
    );
  });

  it('rejects unknown methods', async () => {
    const client = new HttpClient('http://localhost:8080');

    await expect(
      client.sendRequest('unknown_method' as any),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`[Error: Unknown method: unknown_method]`);
  });

  const LP_ACCOUNT_ID = 'cFMVtnPTJFYFvnHXK14HZ6XWDSCAByTPZDWrTeFEc2B8A3m7M';
  const BROKER_ACCOUNT_ID = 'cFJjZKzA5rUTb9qkZMGfec7piCpiAQKr15B4nALzriMGQL8BE';
  const VALIDATOR_ACCOUNT_ID = 'cFKzr7DwLCRtSkou5H5moKri7g9WwJ4tAbVJv6dZGhLb811Tc';

  describe('with server', () => {
    let server: Server;
    let callCounter = 0;

    let client: HttpClient;

    function handleRequest(body: JsonRpcRequest<RpcMethod>) {
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
          switch ((body.params[0] as { chain?: string }).chain) {
            case 'Ethereum':
              return respond(swapParameterEncodingEthereum);
            case 'Solana':
              return respond(swapParameterEncodingSolana);
            default:
              return respond(swapParameterEncodingBitcoin);
          }
        case 'cf_request_swap_parameter_encoding':
          switch ((body.params[0] as { chain?: string }).chain) {
            case 'Ethereum':
              return respond(swapParameterEncodingEthereum);
            case 'Solana':
              return respond(swapParameterEncodingSolana);
            default:
              return respond(swapParameterEncodingBitcoin);
          }
        case 'broker_request_swap_deposit_address':
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
        case 'lp_total_balances':
          expect(body.params[0]).toEqual(LP_ACCOUNT_ID);
          return respond(liquidityProviderAccount.balances);
        case 'cf_failed_call_ethereum':
        case 'cf_failed_call_arbitrum':
          if (body.params[0] === 1) return respond(failedCallEvm);
          return respond(null);
        case 'cf_authority_emission_per_block':
          return respond('0x9eafbba30192d84');
        case 'cf_epoch_duration':
          return respond(43200);
        case 'cf_auction_state':
          return respond({
            blocks_per_epoch: 43200,
            current_epoch_started_at: 6892653,
            redemption_period_as_percentage: 50,
            min_funding: '0x53444835ec580000',
            auction_size_range: [3, 150],
            min_active_bid: '0x765fc937c54c30cabc0',
          });
        case 'cf_flip_supply':
          return respond(['0x0', '0x1']);
        case 'cf_pool_orderbook':
          return respond(poolOrderbook);
        case 'cf_eth_state_chain_gateway_address':
        case 'cf_eth_key_manager_address':
        default:
          console.error('Method not found:', body.method);
          return [
            {
              id: body.id,
              jsonrpc: '2.0',
              error: { code: 1, message: `Method not found: "${body.method as string}"` },
            },
          ];
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
          undefined,
          undefined,
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
            gas_budget: 12345,
            message_length: 321,
          },
          ['IngressDepositChannel'],
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

    it('gets broker vault swap data for bitcoin', async () => {
      expect(
        await client.sendRequest(
          'broker_request_swap_parameter_encoding',
          { chain: 'Bitcoin', asset: 'BTC' },
          { chain: 'Ethereum', asset: 'USDC' },
          '0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97',
          10,
          {
            chain: 'Bitcoin',
            min_output_amount: '0x1',
            retry_duration: 100,
          },
        ),
      ).toMatchInlineSnapshot(`
        {
          "chain": "Bitcoin",
          "deposit_address": "bcrt1pmrhjpvq2w7cgesrcrvuhqw6n6j487l6uc7tmwtx9jen7ezesunhqllvzxx",
          "nulldata_payload": "0x0003656623d865425c0a4955ef7e7a39d09f58554d0800000000000000000000000000000000000001000200000100",
        }
      `);
    });

    it('gets broker vault swap data for ethereum', async () => {
      expect(
        await client.sendRequest(
          'broker_request_swap_parameter_encoding',
          { chain: 'Ethereum', asset: 'ETH' },
          { chain: 'Ethereum', asset: 'USDC' },
          '0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97',
          10,
          {
            chain: 'Ethereum',
            input_amount: `0x111111`,
            refund_parameters: {
              refund_address: '0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97',
              retry_duration: 100,
              min_price: '0x1',
            },
          },
        ),
      ).toMatchInlineSnapshot(`
        {
          "calldata": "0xdd68734500000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000014b5fb203bd12f528813b512408b374a8f0f44367a000000000000000000000000000000000000000000000000000000000000000000000000000000000000005f0000000000004cd85eb477b4820bbf10dc4689d8b344c2722eac000000000000000000000000000000000000000000000000000000000000000000009059e6d854b769a505d01148af212bf8cb7f8469a7153edce8dcaedd9d29912501000000",
          "chain": "Ethereum",
          "source_token_address": "0x10c6e9530f1c1af873a391030a1d9e8ed0630d26",
          "to": "0xb7a5bd0345ef1cc5e66bf61bdec17d2461fbd968",
          "value": 5000000000000000000n,
        }
      `);
    });

    it('gets broker vault swap data for solana', async () => {
      expect(
        await client.sendRequest(
          'broker_request_swap_parameter_encoding',
          { chain: 'Solana', asset: 'SOL' },
          { chain: 'Ethereum', asset: 'USDC' },
          '0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97',
          10,
          {
            chain: 'Solana',
            from: 'oQPnhXAbLbMuKHESaGrbXT17CyvWCpLyERSJA9HCYd7',
            event_data_account: 'HTox3DgDcrzsK5RvduHnW9Fu7m3QaQr3VwQ9oDmrnfr6',
            input_amount: '0x11111',
            refund_parameters: {
              refund_address: '0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97',
              retry_duration: 100,
              min_price: '0x1',
            },
          },
        ),
      ).toMatchInlineSnapshot(`
        {
          "accounts": [
            {
              "is_signer": true,
              "is_writable": true,
              "pubkey": "Gm4QT3aC9YZtyZAFjMNTVEMB4otEY1JW2dVEBFbGfr9p",
            },
            {
              "is_signer": false,
              "is_writable": true,
              "pubkey": "2tmtGLQcBd11BMiE9B1tAkQXwmPNgR79Meki2Eme4Ec9",
            },
            {
              "is_signer": false,
              "is_writable": false,
              "pubkey": "11111111111111111111111111111111",
            },
          ],
          "chain": "Solana",
          "data": "0xa3265ce2f3698dc400e876481700000001000000140000004d2c78895c0fb2dbc04ecb98345f7b5e30bbd5f203000000006b000000000000000004f79d5e026f12edc6443a534b2cdd5072233989b415d7596573e743f3e5b386fb000000000000000000000000000000000000000000000000000000000000000000009059e6d854b769a505d01148af212bf8cb7f8469a7153edce8dcaedd9d299125010000",
          "program_id": "35uYgHdfZQT4kHkaaXQ6ZdCkK5LFrsk43btTLbGCRCNT",
        }
      `);
    });

    it('gets node vault swap data for bitcoin', async () => {
      expect(
        await client.sendRequest(
          'cf_request_swap_parameter_encoding',
          'cFLRQDfEdmnv6d2XfHJNRBQHi4fruPMReLSfvB8WWD2ENbqj7',
          { chain: 'Bitcoin', asset: 'BTC' },
          { chain: 'Ethereum', asset: 'USDC' },
          '0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97',
          10,
          {
            chain: 'Bitcoin',
            min_output_amount: '0x1',
            retry_duration: 100,
          },
        ),
      ).toMatchInlineSnapshot(`
        {
          "chain": "Bitcoin",
          "deposit_address": "bcrt1pmrhjpvq2w7cgesrcrvuhqw6n6j487l6uc7tmwtx9jen7ezesunhqllvzxx",
          "nulldata_payload": "0x0003656623d865425c0a4955ef7e7a39d09f58554d0800000000000000000000000000000000000001000200000100",
        }
      `);
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

    it('gets lp total balances', async () => {
      expect(await client.sendRequest('lp_total_balances', LP_ACCOUNT_ID)).toMatchSnapshot();
    });

    it('requests deposit addresses', async () => {
      expect(
        await client.sendRequest(
          'broker_request_swap_deposit_address',
          { asset: 'BTC', chain: 'Bitcoin' },
          { asset: 'ETH', chain: 'Ethereum' },
          '0x4567',
          100,
          { gas_budget: '0x0', message: '0x0' },
          30,
          [{ account: '0x1234', bps: 0 }],
          {
            refund_address: '0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97',
            retry_duration: 100,
            min_price: '0x1',
          },
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

    it.each(['cf_failed_call_ethereum', 'cf_failed_call_arbitrum'])(
      'handles failed calls (%s)',
      async () => {
        expect(await client.sendRequest('cf_failed_call_ethereum', 1)).toEqual(failedCallEvm);
        expect(await client.sendRequest('cf_failed_call_ethereum', 2)).toBeNull();
      },
    );

    it('handles cf_flip_supply', async () => {
      expect(await client.sendRequest('cf_flip_supply')).toMatchInlineSnapshot(`
        {
          "offchainFunds": 1n,
          "totalIssuance": 0n,
        }
      `);
    });

    it('handles cf_authority_emission_per_block', async () => {
      expect(await client.sendRequest('cf_authority_emission_per_block')).toMatchInlineSnapshot(
        `714660267981090180n`,
      );
    });

    it('handles cf_epoch_duration', async () => {
      expect(await client.sendRequest('cf_epoch_duration')).toMatchInlineSnapshot(`43200`);
    });

    it('handles cf_auction_state', async () => {
      expect(await client.sendRequest('cf_auction_state')).toMatchInlineSnapshot(`
        {
          "auction_size_range": [
            3,
            150,
          ],
          "blocks_per_epoch": 43200,
          "current_epoch_started_at": 6892653,
          "min_active_bid": 34937886558754807000000n,
          "min_funding": 6000000000000000000n,
          "redemption_period_as_percentage": 50,
        }
      `);
    });

    it('handles cf_pool_orderbook', async () => {
      expect(
        await client.sendRequest(
          'cf_pool_orderbook',
          { chain: 'Ethereum', asset: 'FLIP' },
          { chain: 'Ethereum', asset: 'USDC' },
          1000,
        ),
      ).toMatchInlineSnapshot(`
        {
          "asks": [
            {
              "amount": 46753058565446130239012n,
              "sqrt_price": 64630826319013095607270n,
            },
            {
              "amount": 44100436900143846942228n,
              "sqrt_price": 68518341775354431960110n,
            },
            {
              "amount": 41598316654751478697107n,
              "sqrt_price": 72639689558847518484343n,
            },
            {
              "amount": 55454500902567204336167n,
              "sqrt_price": 77067268995118459000145n,
            },
            {
              "amount": 53837212033998851744122n,
              "sqrt_price": 81640987742331057904634n,
            },
            {
              "amount": 50804673859249984018103n,
              "sqrt_price": 86552271380382780606711n,
            },
            {
              "amount": 47948522681948256737269n,
              "sqrt_price": 91757700510720620096997n,
            },
            {
              "amount": 37019294219495276748987n,
              "sqrt_price": 96989993734613759931926n,
            },
            {
              "amount": 26934220284744773708675n,
              "sqrt_price": 103127979204528125632068n,
            },
            {
              "amount": 25405461594188856223033n,
              "sqrt_price": 109331152920533190719767n,
            },
            {
              "amount": 23964035516204788379085n,
              "sqrt_price": 115907373144969167780705n,
            },
            {
              "amount": 22604391425554018148620n,
              "sqrt_price": 122879150148402091564964n,
            },
            {
              "amount": 21321889269198558537894n,
              "sqrt_price": 130270276330514381823161n,
            },
            {
              "amount": 20112152256132776789443n,
              "sqrt_price": 138105975597336644497814n,
            },
            {
              "amount": 18971051920722732987684n,
              "sqrt_price": 146412988540742718981259n,
            },
            {
              "amount": 13710179002383575641943n,
              "sqrt_price": 154472955790186902963678n,
            },
            {
              "amount": 8347516177464445895011n,
              "sqrt_price": 164556058424230827752097n,
            },
            {
              "amount": 7873904333807042684573n,
              "sqrt_price": 174454032148278151200438n,
            },
            {
              "amount": 7427163738277091207349n,
              "sqrt_price": 184947364664173073044334n,
            },
            {
              "amount": 5263358441301477921750n,
              "sqrt_price": 194621516264240857154312n,
            },
            {
              "amount": 15n,
              "sqrt_price": 91484801910019865068323741258n,
            },
            {
              "amount": 6n,
              "sqrt_price": 102283117989453508542900927322n,
            },
            {
              "amount": 13n,
              "sqrt_price": 87895754586453540682326497314n,
            },
            {
              "amount": 3n,
              "sqrt_price": 112045541949572279837463876454n,
            },
            {
              "amount": 10331160708553705597n,
              "sqrt_price": 660255715340516735938401n,
            },
          ],
          "bids": [
            {
              "amount": 25373865255616642815149n,
              "sqrt_price": 61795464824976308592965n,
            },
            {
              "amount": 26154793830615988860297n,
              "sqrt_price": 59950378810627830160621n,
            },
            {
              "amount": 26959756955854601891269n,
              "sqrt_price": 58160383287529860555182n,
            },
            {
              "amount": 23935263102372336825044n,
              "sqrt_price": 56525027814902774807799n,
            },
            {
              "amount": 13309283002338890750251n,
              "sqrt_price": 54739133261808415886935n,
            },
            {
              "amount": 13718901296775874421862n,
              "sqrt_price": 53104734855241885568231n,
            },
            {
              "amount": 14141126367033011408800n,
              "sqrt_price": 51519136238002961276233n,
            },
            {
              "amount": 14576346210420817470903n,
              "sqrt_price": 49980880351826531508890n,
            },
            {
              "amount": 15024960765599056984381n,
              "sqrt_price": 48488553629100335698451n,
            },
            {
              "amount": 9658665922700496104699n,
              "sqrt_price": 47307334696566458274119n,
            },
          ],
        }
      `);
    });

    it('handles multiple requests with 1 call', async () => {
      const [r1, r2] = await Promise.all([
        client.sendRequest(
          'cf_pool_orders',
          { chain: 'Ethereum', asset: 'ETH' },
          { asset: 'USDC', chain: 'Ethereum' },
        ),
        client.sendRequest(
          'broker_request_swap_deposit_address',
          { asset: 'BTC', chain: 'Bitcoin' },
          { asset: 'ETH', chain: 'Ethereum' },
          '0x4567',
          100,
          { gas_budget: '0x0', message: '0x0' },
          30,
          [{ account: '0x1234', bps: 0 }],
          {
            refund_address: '0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97',
            retry_duration: 100,
            min_price: '0x1',
          },
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
        'broker_request_swap_deposit_address',
        { asset: 'BTC', chain: 'Bitcoin' },
        { asset: 'ETH', chain: 'Ethereum' },
        '0x4567',
        100,
        { gas_budget: '0x0', message: '0x0' },
        30,
        [{ account: '0x1234', bps: 0 }],
        {
          refund_address: '0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97',
          retry_duration: 100,
          min_price: '0x1',
        },
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

    it('throws on a non-200 response', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
        ok: false,
        status: 404,
      } as Response);
      await expect(client.sendRequest('cf_accounts')).rejects.toThrow('HTTP error: 404');
    });

    it('throws on invalid JSON', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
        ok: true,
        // eslint-disable-next-line @typescript-eslint/require-await
        json: async () => JSON.parse('{'),
      } as Response);
      await expect(client.sendRequest('cf_accounts')).rejects.toThrow('Invalid JSON response');
    });

    it('throws when parsing the result fails', async () => {
      // eslint-disable-next-line dot-notation
      client['getRequestId'] = () => '1';
      vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
        ok: true,
        // eslint-disable-next-line @typescript-eslint/require-await
        json: async () => [{ id: '1', jsonrpc: '2.0', result: [['account 1', null]] }],
      } as Response);
      await expect(client.sendRequest('cf_accounts')).rejects.toThrowErrorMatchingInlineSnapshot(
        `
        [ZodError: [
          {
            "code": "invalid_type",
            "expected": "string",
            "received": "null",
            "path": [
              0,
              1
            ],
            "message": "Expected string, received null"
          }
        ]]
      `,
      );
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

    it('uses monotonically increasing request IDs in insecure envs', async () => {
      vi.spyOn(crypto, 'randomUUID').mockImplementationOnce(() => {
        throw new Error('test');
      });

      const fetchSpy = vi.spyOn(globalThis, 'fetch');

      await expect(client.sendRequest('cf_supported_assets')).resolves.not.toThrowError();

      expect(fetchSpy.mock.calls?.[0]?.[1]?.body).toMatchInlineSnapshot(
        `"[{"jsonrpc":"2.0","id":"1","method":"cf_supported_assets","params":[]}]"`,
      );
    });

    it('rejects unfound requests', async () => {
      vi.spyOn(globalThis, 'fetch').mockImplementation((url, init) => {
        const body = JSON.parse(init!.body as string) as JsonRpcRequest<RpcMethod>[];

        expect(body).toHaveLength(2);
        expect(body[0].method).toEqual('cf_account_info');
        expect(body[1].method).toEqual('cf_account_info');
        expect(body[0].params[0]).toEqual(LP_ACCOUNT_ID);
        expect(body[1].params[0]).toEqual(BROKER_ACCOUNT_ID);

        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve([
              {
                id: body[0].id,
                jsonrpc: '2.0',
                result: liquidityProviderAccount,
              },
            ]),
        } as Response);
      });

      const results = await Promise.allSettled(
        [LP_ACCOUNT_ID, BROKER_ACCOUNT_ID].map((id) => client.sendRequest('cf_account_info', id)),
      );

      expect(results[0]).toMatchObject({
        status: 'fulfilled',
        value: { role: 'liquidity_provider' },
      });
      expect(results[1]).toMatchObject({
        status: 'rejected',
        reason: new Error('Could not find the result for the request'),
      });
    });

    it('ignores additional unrecognized responses', async () => {
      vi.spyOn(globalThis, 'fetch').mockImplementation((url, init) => {
        const body = JSON.parse(init!.body as string) as JsonRpcRequest<RpcMethod>[];

        expect(body).toHaveLength(2);
        expect(body[0].method).toEqual('cf_account_info');
        expect(body[1].method).toEqual('cf_account_info');
        expect(body[0].params[0]).toEqual(LP_ACCOUNT_ID);
        expect(body[1].params[0]).toEqual(BROKER_ACCOUNT_ID);

        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve([
              {
                id: body[0].id,
                jsonrpc: '2.0',
                result: liquidityProviderAccount,
              },
              {
                id: body[1].id,
                jsonrpc: '2.0',
                result: brokerAccount,
              },
              {
                id: '3',
                jsonrpc: '2.0',
                result: supportedAssets,
              },
            ]),
        } as Response);
      });

      const results = await Promise.allSettled(
        [LP_ACCOUNT_ID, BROKER_ACCOUNT_ID].map((id) => client.sendRequest('cf_account_info', id)),
      );

      expect(results[0]).toMatchObject({
        status: 'fulfilled',
        value: { role: 'liquidity_provider' },
      });
      expect(results[1]).toMatchObject({
        status: 'fulfilled',
        value: { role: 'broker' },
      });
    });
  });
});
