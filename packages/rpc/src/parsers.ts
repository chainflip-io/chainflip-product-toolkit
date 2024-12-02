import { isNotNullish } from '@chainflip/utils/guard';
import { isHex } from '@chainflip/utils/string';
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
    Solana: z
      .object({ SOL: parser.default(defaultValue), USDC: parser.default(defaultValue) })
      .default({ SOL: defaultValue, USDC: defaultValue }),
    Assethub: z.object({
      DOT: parser.default(defaultValue),
      USDC: parser.default(defaultValue),
      USDT: parser.default(defaultValue),
    }),
  });

const chainBaseAssetMapFactory = <Z extends z.ZodTypeAny>(parser: Z, defaultValue: z.input<Z>) =>
  z.object({
    Bitcoin: z.object({ BTC: parser }),
    Ethereum: z.object({ ETH: parser, FLIP: parser, USDT: parser }),
    Polkadot: z.object({ DOT: parser }),
    Arbitrum: z.object({ ETH: parser, USDC: parser }),
    Solana: z
      .object({ SOL: parser.default(defaultValue), USDC: parser.default(defaultValue) })
      .default({ SOL: defaultValue, USDC: defaultValue }),
    Assethub: z.object({
      DOT: parser.default(defaultValue),
      USDC: parser.default(defaultValue),
      USDT: parser.default(defaultValue),
    }),
  });

const chainMapFactory = <Z extends z.ZodTypeAny>(parser: Z, defaultValue: z.input<Z>) =>
  z.object({
    Bitcoin: parser,
    Ethereum: parser,
    Polkadot: parser,
    Arbitrum: parser,
    Solana: parser.default(defaultValue),
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
  id: z.union([z.string(), z.number()]),
  jsonrpc: z.literal('2.0'),
});

const nonNullish = z.any().refine(isNotNullish, { message: 'Value must not be null or undefined' });

const rpcSuccessResponse = rpcBaseResponse.extend({ result: nonNullish });

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
    // TODO(1.6): no longer optional
    max_swap_retry_duration_blocks: chainMapFactory(z.number(), 0)
      .optional()
      .default({ Arbitrum: 0, Bitcoin: 0, Ethereum: 0, Polkadot: 0, Solana: 0 }),
  })
  .transform(rename({ egress_dust_limits: 'minimum_egress_amounts' }));

export const cfSwappingEnvironment = z.object({
  maximum_swap_amounts: chainAssetMapFactory(numberOrHex.nullable(), null),
  network_fee_hundredth_pips: z.number(),
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

export const unregistered = z.object({
  role: z.literal('unregistered'),
  flip_balance: numberOrHex,
});

export const broker = z.object({
  role: z.literal('broker'),
  flip_balance: numberOrHex,
  earned_fees: chainAssetMapFactory(numberOrHex, 0),
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

export const cfAccountInfo = z.union([unregistered, broker, liquidityProvider, validator]);

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
          deposit_id: z.number().transform(BigInt),
          owed_amounts: z.array(boostPoolAmount),
        }),
      ),
      pending_withdrawals: z.array(
        z.object({
          account_id: z.string(),
          pending_deposits: z.array(z.bigint()),
        }),
      ),
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
