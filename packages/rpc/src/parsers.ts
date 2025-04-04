import { isUndefined } from '@chainflip/utils/guard';
import { isHex } from '@chainflip/utils/string';
import { type HexString } from '@chainflip/utils/types';
import { z } from 'zod';

// base types

export const hexString = z.string().refine(isHex, { message: 'Invalid hex string' });

export const u256 = hexString.transform((value) => BigInt(value));

export const numberOrHex = z.union([z.number().transform((n) => BigInt(n)), u256]);

const chainAssetMapFactory = <Z extends z.ZodTypeAny>(parser: Z, defaultValue: z.input<Z>) =>
  z.object({
    Bitcoin: z.object({ BTC: parser }),
    Ethereum: z.object({ ETH: parser, USDC: parser, FLIP: parser, USDT: parser }),
    Polkadot: z.object({ DOT: parser }),
    Arbitrum: z.object({ ETH: parser, USDC: parser }),
    Solana: z.object({ SOL: parser, USDC: parser }),
    Assethub: z
      .object({ DOT: parser, USDC: parser, USDT: parser })
      .default({ DOT: defaultValue, USDC: defaultValue, USDT: defaultValue }),
  });

const chainBaseAssetMapFactory = <Z extends z.ZodTypeAny>(parser: Z, defaultValue: z.input<Z>) =>
  z.object({
    Bitcoin: z.object({ BTC: parser }),
    Ethereum: z.object({ ETH: parser, FLIP: parser, USDT: parser }),
    Polkadot: z.object({ DOT: parser }),
    Arbitrum: z.object({ ETH: parser, USDC: parser }),
    Solana: z.object({ SOL: parser, USDC: parser }),
    Assethub: z
      .object({ DOT: parser, USDC: parser, USDT: parser })
      .default({ DOT: defaultValue, USDC: defaultValue, USDT: defaultValue }),
  });

const chainMapFactory = <Z extends z.ZodTypeAny>(parser: Z, defaultValue: z.input<Z>) =>
  z.object({
    Bitcoin: parser,
    Ethereum: parser,
    Polkadot: parser,
    Arbitrum: parser,
    Solana: parser,
    Assethub: parser.default(defaultValue),
  });

const rpcAssetSchema = z.union([
  z.object({ chain: z.literal('Bitcoin'), asset: z.literal('BTC') }),
  z.object({ chain: z.literal('Polkadot'), asset: z.literal('DOT') }),
  z.object({ chain: z.literal('Ethereum'), asset: z.literal('FLIP') }),
  z.object({ chain: z.literal('Ethereum'), asset: z.literal('ETH') }),
  z.object({ chain: z.literal('Ethereum'), asset: z.literal('USDC') }),
  z.object({ chain: z.literal('Ethereum'), asset: z.literal('USDT') }),
  z.object({ chain: z.literal('Arbitrum'), asset: z.literal('ETH') }),
  z.object({ chain: z.literal('Arbitrum'), asset: z.literal('USDC') }),
  z.object({ chain: z.literal('Solana'), asset: z.literal('SOL') }),
  z.object({ chain: z.literal('Solana'), asset: z.literal('USDC') }),
  z.object({ chain: z.literal('Assethub'), asset: z.literal('DOT') }),
  z.object({ chain: z.literal('Assethub'), asset: z.literal('USDC') }),
  z.object({ chain: z.literal('Assethub'), asset: z.literal('USDT') }),
]);

export type AssetAndChain = z.output<typeof rpcAssetSchema>;

type Rename<T, U extends Record<string, string>> = Omit<T, keyof U> & {
  [K in keyof U as NonNullable<U[K]>]: K extends keyof T ? T[K] : never;
};

const rename =
  <const U extends Record<string, string>>(mapping: U) =>
  <T>(obj: T): Rename<T, U> =>
    Object.fromEntries(
      Object.entries(obj as Record<string, unknown>).map(([key, value]) => [
        key in mapping ? mapping[key] : key,
        value,
      ]),
    ) as Rename<T, U>;

const rpcBaseResponse = z.object({
  id: z.string(),
  jsonrpc: z.literal('2.0'),
});

const notUndefined = z
  .any()
  .refine((v) => !isUndefined(v), { message: 'Value must not be undefined' });

const rpcSuccessResponse = rpcBaseResponse.extend({ result: notUndefined });

const rpcErrorResponse = rpcBaseResponse.extend({
  error: z.object({ code: z.number(), message: z.string() }),
});

export const rpcResponse = z.union([rpcSuccessResponse, rpcErrorResponse]);

// rpc responses

export const cfSwapRate = z.object({
  intermediary: numberOrHex.nullable(),
  output: numberOrHex,
});

const fee = z.intersection(rpcAssetSchema, z.object({ amount: numberOrHex }));

export const cfSwapRateV2 = z.object({
  egress_fee: fee,
  ingress_fee: fee,
  intermediary: u256.nullable(),
  network_fee: fee,
  output: u256,
});

export const cfSwapRateV3 = cfSwapRateV2.extend({
  broker_commission: fee,
});

export const chainGetBlockHash = hexString;

export const stateGetMetadata = hexString;

export const stateGetRuntimeVersion = z.object({
  specName: z.string(),
  implName: z.string(),
  authoringVersion: z.number(),
  specVersion: z.number(),
  implVersion: z.number(),
  apis: z.array(z.tuple([hexString, z.number()])),
  transactionVersion: z.number(),
  stateVersion: z.number(),
});

export const cfIngressEgressEnvironment = z
  .object({
    minimum_deposit_amounts: chainAssetMapFactory(numberOrHex, 0),
    ingress_fees: chainAssetMapFactory(numberOrHex.nullable(), null),
    egress_fees: chainAssetMapFactory(numberOrHex.nullable(), null),
    witness_safety_margins: chainMapFactory(z.number().nullable(), null),
    egress_dust_limits: chainAssetMapFactory(numberOrHex, 0),
    channel_opening_fees: chainMapFactory(numberOrHex, 0),
  })
  .transform(rename({ egress_dust_limits: 'minimum_egress_amounts' }));

export const cfSwappingEnvironment = z.object({
  maximum_swap_amounts: chainAssetMapFactory(numberOrHex.nullable(), null),
  network_fee_hundredth_pips: z.number(),
  swap_retry_delay_blocks: z.number().optional(),
  max_swap_retry_duration_blocks: z.number().optional(),
  max_swap_request_duration_blocks: z.number().optional(),
  minimum_chunk_size: chainAssetMapFactory(numberOrHex.nullable(), null).optional(),
});

export const cfFundingEnvironment = z.object({
  redemption_tax: numberOrHex,
  minimum_funding_amount: numberOrHex,
});

const defaultFeeInfo = () =>
  ({
    limit_order_fee_hundredth_pips: 0,
    range_order_fee_hundredth_pips: 0,
    range_order_total_fees_earned: { base: '0x0', quote: '0x0' },
    limit_order_total_fees_earned: { base: '0x0', quote: '0x0' },
    range_total_swap_inputs: { base: '0x0', quote: '0x0' },
    limit_total_swap_inputs: { base: '0x0', quote: '0x0' },
    quote_asset: { chain: 'Ethereum', asset: 'USDC' },
  }) as const;

export const cfPoolsEnvironment = z.object({
  fees: chainBaseAssetMapFactory(
    z
      .object({
        limit_order_fee_hundredth_pips: z.number(),
        range_order_fee_hundredth_pips: z.number(),
        range_order_total_fees_earned: z.object({ base: u256, quote: u256 }),
        limit_order_total_fees_earned: z.object({ base: u256, quote: u256 }),
        range_total_swap_inputs: z.object({ base: u256, quote: u256 }),
        limit_total_swap_inputs: z.object({ base: u256, quote: u256 }),
        quote_asset: z.object({ chain: z.literal('Ethereum'), asset: z.literal('USDC') }),
      })
      .nullable()
      .transform((info) => info ?? defaultFeeInfo()),
    defaultFeeInfo(),
  ),
});

export const cfEnvironment = z.object({
  ingress_egress: cfIngressEgressEnvironment,
  swapping: cfSwappingEnvironment,
  funding: cfFundingEnvironment,
  pools: cfPoolsEnvironment,
});

export const cfBoostPoolsDepth = z.array(
  z.intersection(rpcAssetSchema, z.object({ tier: z.number(), available_amount: u256 })),
);

const orderInfoSchema = z.object({
  depth: numberOrHex,
  price: numberOrHex.nullable(),
});
const assetInfoSchema = z.object({
  limit_orders: orderInfoSchema,
  range_orders: orderInfoSchema,
});
export const cfPoolDepth = z
  .object({
    asks: assetInfoSchema,
    bids: assetInfoSchema,
  })
  .nullable();

export const cfSupportedAssets = z
  .array(z.object({ chain: z.string(), asset: z.string() }))
  .transform((assets) =>
    assets.filter((asset): asset is AssetAndChain => rpcAssetSchema.safeParse(asset).success),
  );

export const brokerRequestSwapDepositAddress = z.object({
  address: z.string(),
  issued_block: z.number(),
  channel_id: z.number(),
  source_chain_expiry_block: numberOrHex,
  channel_opening_fee: u256,
});

const evmBrokerRequestSwapParameterEncoding = z.object({
  to: hexString,
  calldata: hexString,
  value: numberOrHex,
  source_token_address: hexString.optional(),
});

export const requestSwapParameterEncoding = z.discriminatedUnion('chain', [
  z.object({
    chain: z.literal('Bitcoin'),
    nulldata_payload: hexString,
    deposit_address: z.string(),
  }),
  evmBrokerRequestSwapParameterEncoding.extend({
    chain: z.literal('Ethereum'),
  }),
  evmBrokerRequestSwapParameterEncoding.extend({
    chain: z.literal('Arbitrum'),
  }),
  z.object({
    chain: z.literal('Solana'),
    program_id: z.string(),
    data: hexString,
    accounts: z.array(
      z.object({
        pubkey: z.string(),
        is_signer: z.boolean(),
        is_writable: z.boolean(),
      }),
    ),
  }),
]);

export const unregistered = z.object({
  role: z.literal('unregistered'),
  flip_balance: numberOrHex,
  asset_balances: chainAssetMapFactory(numberOrHex, 0),
});

export const broker = z.object({
  role: z.literal('broker'),
  bond: numberOrHex,
  flip_balance: numberOrHex,
  earned_fees: chainAssetMapFactory(numberOrHex, 0),
  btc_vault_deposit_address: z.string().nullable().optional(),
  affiliates: z
    .array(
      z.object({ account_id: z.string(), short_id: z.number(), withdrawal_address: hexString }),
    )
    .optional()
    .default([]),
});

const boostBalances = z.array(
  z.object({
    fee_tier: z.number(),
    total_balance: u256,
    available_balance: u256,
    in_use_balance: u256,
    is_withdrawing: z.boolean(),
  }),
);

export const liquidityProvider = z.object({
  role: z.literal('liquidity_provider'),
  balances: chainAssetMapFactory(numberOrHex, '0x0'),
  refund_addresses: chainMapFactory(z.string().nullable(), null),
  flip_balance: numberOrHex,
  earned_fees: chainAssetMapFactory(numberOrHex, 0),
  boost_balances: chainAssetMapFactory(boostBalances, []),
});

export const validator = z.object({
  role: z.literal('validator'),
  flip_balance: numberOrHex,
  bond: numberOrHex,
  last_heartbeat: z.number(),
  reputation_points: z.number(),
  keyholder_epochs: z.array(z.number()),
  is_current_authority: z.boolean(),
  is_current_backup: z.boolean(),
  is_qualified: z.boolean(),
  is_online: z.boolean(),
  is_bidding: z.boolean(),
  bound_redeem_address: hexString.nullable(),
  apy_bp: z.number().nullable(),
  restricted_balances: z.record(hexString, numberOrHex),
});

export const cfAccountInfo = z.discriminatedUnion('role', [
  unregistered,
  broker,
  liquidityProvider,
  validator,
]);

export const cfAccounts = z.array(z.tuple([z.string(), z.string()]));

export const cfPoolPriceV2 = z.object({
  sell: numberOrHex.nullable(),
  buy: numberOrHex.nullable(),
  range_order: numberOrHex,
  base_asset: rpcAssetSchema,
  quote_asset: rpcAssetSchema,
});

const orderId = numberOrHex.transform((n) => String(n));

const limitOrder = z.object({
  id: orderId,
  tick: z.number(),
  sell_amount: numberOrHex,
  fees_earned: numberOrHex,
  original_sell_amount: numberOrHex,
  lp: z.string(),
});

const ask = limitOrder.transform((order) => ({
  ...order,
  type: 'ask' as const,
}));

const bid = limitOrder.transform((order) => ({
  ...order,
  type: 'bid' as const,
}));

export type RpcLimitOrder = z.infer<typeof ask> | z.infer<typeof bid>;

export type RpcRangeOrder = z.infer<typeof rangeOrder>;

const rangeOrder = z
  .object({
    id: orderId,
    range: z.object({ start: z.number(), end: z.number() }),
    liquidity: numberOrHex,
    fees_earned: z.object({ base: numberOrHex, quote: numberOrHex }),
    lp: z.string(),
  })
  .transform((order) => ({ ...order, type: 'range' as const }));

export const cfPoolOrders = z.object({
  limit_orders: z.object({
    asks: z.array(ask),
    bids: z.array(bid),
  }),
  range_orders: z.array(rangeOrder),
});

const boostPoolAmount = z.object({
  account_id: z.string(),
  amount: u256,
});

export const cfBoostPoolDetails = z.array(
  z.intersection(
    rpcAssetSchema,
    z.object({
      fee_tier: z.number(),
      available_amounts: z.array(boostPoolAmount),
      deposits_pending_finalization: z.array(
        z.object({
          deposit_id: numberOrHex,
          owed_amounts: z.array(boostPoolAmount),
        }),
      ),
      pending_withdrawals: z.array(
        z.object({
          account_id: z.string(),
          pending_deposits: z.array(numberOrHex),
        }),
      ),
      network_fee_deduction_percent: z.number().optional(),
    }),
  ),
);

export const cfBoostPoolPendingFees = z.array(
  z.intersection(
    rpcAssetSchema,
    z.object({
      fee_tier: z.number(),
      pending_fees: z.array(
        z.object({
          deposit_id: z.number().transform(BigInt),
          fees: z.array(boostPoolAmount),
        }),
      ),
    }),
  ),
);

export const lpTotalBalances = chainAssetMapFactory(numberOrHex, 0);

export const cfFailedCallEvm = z.object({
  contract: hexString,
  data: z.string(),
});

const range = <Z extends z.ZodTypeAny>(parser: Z) => z.tuple([parser, parser]);

export const cfAuctionState = z
  .object({
    epoch_duration: z.number(),
    current_epoch_started_at: z.number(),
    redemption_period_as_percentage: z.number(),
    min_funding: numberOrHex,
    auction_size_range: range(z.number()),
    min_active_bid: numberOrHex,
  })
  .transform(rename({ epoch_duration: 'epoch_duration_blocks' }));

export const cfFlipSuppy = range(numberOrHex).transform(([totalIssuance, offchainFunds]) => ({
  totalIssuance,
  offchainFunds,
}));

export const ethereumAddress = z.string().transform<HexString>((address) => `0x${address}`);

export const cfPoolOrderbook = z.object({
  bids: z.array(z.object({ amount: u256, sqrt_price: u256 })),
  asks: z.array(z.object({ amount: u256, sqrt_price: u256 })),
});

export const cfTradingStrategy = z.object({
  lp_id: z.string(),
  strategy_id: z.string(),
  strategy: z.object({
    TickZeroCentered: z.object({
      spread_tick: z.number(),
      base_asset: rpcAssetSchema,
    }),
  }),
  balance: z.array(z.tuple([rpcAssetSchema, numberOrHex])),
});

export const cfGetTradingStrategies = z.array(cfTradingStrategy).default([]);
