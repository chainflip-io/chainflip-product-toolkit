import { bytesToHex } from '@chainflip/utils/bytes';
import { priceAssets } from '@chainflip/utils/chainflip';
import { isUndefined } from '@chainflip/utils/guard';
import { isHex } from '@chainflip/utils/string';
import { type HexString } from '@chainflip/utils/types';
import { z } from 'zod';

// base types

export const hexString = z.string().refine(isHex, { message: 'Invalid hex string' });

export const u256 = hexString.transform((value) => BigInt(value));

export const numericString = z.string().regex(/^[0-9]+$/);

export const numberOrHex = z.union([z.number(), u256, numericString]).transform((n) => BigInt(n));

const chainAssetMapFactory = <Z extends z.ZodTypeAny>(parser: Z, _defaultValue: z.input<Z>) =>
  z
    .object({
      Bitcoin: z.object({ BTC: parser }),
      Ethereum: z.object({ ETH: parser, USDC: parser, FLIP: parser, USDT: parser }),
      Polkadot: z.object({ DOT: parser }),
      Arbitrum: z.object({ ETH: parser, USDC: parser }),
      Solana: z.object({ SOL: parser, USDC: parser }),
      Assethub: z.object({ DOT: parser, USDC: parser, USDT: parser }),
    })
    .omit({ Polkadot: true }); // TODO(1.12): remove polkadot all together from parser

const chainBaseAssetMapFactory = <Z extends z.ZodTypeAny>(parser: Z, _defaultValue: z.input<Z>) =>
  z
    .object({
      Bitcoin: z.object({ BTC: parser }),
      Ethereum: z.object({ ETH: parser, FLIP: parser, USDT: parser }),
      Polkadot: z.object({ DOT: parser }),
      Arbitrum: z.object({ ETH: parser, USDC: parser }),
      Solana: z.object({ SOL: parser, USDC: parser }),
      Assethub: z.object({ DOT: parser, USDC: parser, USDT: parser }),
    })
    .omit({ Polkadot: true }); // TODO(1.12): remove polkadot all together from parser

const chainMapFactory = <Z extends z.ZodTypeAny>(parser: Z, _defaultValue: z.input<Z>) =>
  z
    .object({
      Bitcoin: parser,
      Ethereum: parser,
      Polkadot: parser,
      Arbitrum: parser,
      Solana: parser,
      Assethub: parser,
    })
    .omit({ Polkadot: true }); // TODO(1.12): remove polkadot all together from parser

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

const networkFee = z.object({
  standard_rate_and_minimum: z.object({
    rate: numberOrHex,
    minimum: numberOrHex,
  }),
  rates: chainAssetMapFactory(numberOrHex, 0),
});

const networkFees = z.object({
  regular_network_fee: networkFee,
  internal_swap_network_fee: networkFee,
});

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
    ingress_delays: chainMapFactory(z.number(), 0).optional(), // TODO(1.12): remove after all networks upgraded
    boost_delays: chainMapFactory(z.number(), 0).optional(), // TODO(1.12): remove after all networks upgraded
  })
  .transform(rename({ egress_dust_limits: 'minimum_egress_amounts' }));

export const cfSwappingEnvironment = z.object({
  maximum_swap_amounts: chainAssetMapFactory(numberOrHex.nullable(), null),
  network_fee_hundredth_pips: z.number(),
  swap_retry_delay_blocks: z.number().optional(),
  max_swap_retry_duration_blocks: z.number().optional(),
  max_swap_request_duration_blocks: z.number().optional(),
  minimum_chunk_size: chainAssetMapFactory(numberOrHex.nullable(), null).optional(),
  network_fees: networkFees,
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

const accountId = z.string().refine((val): val is `cF${string}` => val.startsWith('cF'));

const delegationStatus = z.object({
  operator: accountId,
  bid: numberOrHex,
});

export const accountInfoCommon = {
  vanity_name: z.string().optional(),
  flip_balance: numberOrHex,
  asset_balances: chainAssetMapFactory(numberOrHex, 0),
  bond: numberOrHex,
  estimated_redeemable_balance: numberOrHex,
  bound_redeem_address: hexString.optional(),
  restricted_balances: z.record(hexString, numberOrHex).optional(),
  current_delegation_status: delegationStatus.optional(),
  upcoming_delegation_status: delegationStatus.optional(),
} as const;

export const unregistered = z.object({
  role: z.literal('unregistered'),
  ...accountInfoCommon,
});

export const broker = z.object({
  role: z.literal('broker'),
  ...accountInfoCommon,
  earned_fees: chainAssetMapFactory(numberOrHex, 0),
  btc_vault_deposit_address: z.string().nullable().optional(),
  affiliates: z
    .array(z.object({ account_id: accountId, short_id: z.number(), withdrawal_address: hexString }))
    .optional()
    .default([]),
});

export const operator = z.object({
  role: z.literal('operator'),
  ...accountInfoCommon,
  managed_validators: z.record(accountId, numberOrHex),
  delegators: z.record(accountId, numberOrHex),
  settings: z.object({
    fee_bps: z.number(),
    delegation_acceptance: z.enum(['Allow', 'Deny']),
  }),
  allowed: z.array(accountId).optional().default([]),
  blocked: z.array(accountId).optional().default([]),
  active_delegation: z
    .object({
      operator: accountId,
      validators: z.record(accountId, numberOrHex),
      delegators: z.record(accountId, numberOrHex),
      delegation_fee_bps: z.number(),
    })
    .optional(),
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
  ...accountInfoCommon,
  refund_addresses: chainMapFactory(z.string().nullable(), null),
  earned_fees: chainAssetMapFactory(numberOrHex, 0),
  boost_balances: chainAssetMapFactory(boostBalances, []),
  lending_positions: z
    .array(
      z.intersection(
        rpcAssetSchema,
        z.object({
          total_amount: numberOrHex,
          available_amount: numberOrHex,
        }),
      ),
    )
    // TODO(1.12): remove after all networks upgraded
    .optional(),
  collateral_balances: z
    .array(
      z.intersection(
        rpcAssetSchema,
        z.object({
          amount: numberOrHex,
        }),
      ),
    )
    // TODO(1.12): remove after all networks upgraded
    .optional(),
});

export const validator = z.object({
  role: z.literal('validator'),
  ...accountInfoCommon,
  last_heartbeat: z.number(),
  reputation_points: z.number(),
  keyholder_epochs: z.array(z.number()),
  is_current_authority: z.boolean(),
  is_current_backup: z.boolean(),
  is_qualified: z.boolean(),
  is_online: z.boolean(),
  is_bidding: z.boolean(),
  apy_bp: z.number().nullable(),
  operator: accountId.optional(),
});

export const cfAccountInfo = z
  .discriminatedUnion('role', [unregistered, broker, operator, liquidityProvider, validator])
  .transform((account) => {
    switch (account.role) {
      case 'broker':
      case 'validator':
      case 'unregistered':
      case 'liquidity_provider':
        return account;
      case 'operator': {
        const { managed_validators, delegators, settings, ...rest } = account;
        return {
          ...rest,
          upcoming_delegation: {
            validators: managed_validators,
            delegators,
            delegation_fee_bps: settings.fee_bps,
            delegation_acceptance: settings.delegation_acceptance,
          },
        };
      }
    }
  });

export const cfAccounts = z.array(z.tuple([accountId, z.string()]));

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
    min_active_bid: numberOrHex.nullable(),
    min_bid: numberOrHex,
  })
  .transform(rename({ epoch_duration: 'epoch_duration_blocks' }));

export const cfMonitoringSimulateAuction = z.object({
  auction_outcome: z.object({
    winners: z.array(accountId),
    bond: numberOrHex,
  }),
  operators_info: z.record(
    accountId,
    z.object({
      operator: accountId,
      validators: z.record(accountId, numberOrHex),
      delegators: z.record(accountId, numberOrHex),
      delegation_fee_bps: z.number(),
    }),
  ),
  new_validators: z.array(accountId),
  current_mab: numberOrHex,
});

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
  strategy: z.union([
    z.object({
      TickZeroCentered: z.object({
        spread_tick: z.number(),
        base_asset: rpcAssetSchema,
      }),
    }),
    z.object({
      SimpleBuySell: z.object({
        buy_tick: z.number(),
        sell_tick: z.number(),
        base_asset: rpcAssetSchema,
      }),
    }),
    z.object({
      InventoryBased: z.object({
        min_buy_tick: z.number(),
        max_buy_tick: z.number(),
        min_sell_tick: z.number(),
        max_sell_tick: z.number(),
        base_asset: rpcAssetSchema,
      }),
    }),
  ]),
  balance: z.array(z.tuple([rpcAssetSchema, numberOrHex])),
});

export const cfGetTradingStrategies = z.array(cfTradingStrategy).default([]);

export const cfGetTradingStrategyLimits = z.object({
  minimum_deployment_amount: chainAssetMapFactory(z.number().nullable(), null),
  minimum_added_funds_amount: chainAssetMapFactory(z.number().nullable(), null),
});

export const cfAvailablePools = z.array(
  z.object({
    base: rpcAssetSchema.refine(
      (
        a,
      ): a is Exclude<
        AssetAndChain,
        { chain: 'Ethereum'; asset: 'USDC' } | { chain: 'Polkadot'; asset: 'DOT' }
      > => a.chain !== 'Ethereum' || a.asset !== 'USDC',
    ),
    quote: z.object({ chain: z.literal('Ethereum'), asset: z.literal('USDC') }),
  }),
);

export const cfOraclePrices = z.array(
  z.object({
    price: numberOrHex,
    updated_at_oracle_timestamp: z.number(),
    updated_at_statechain_block: z.number(),
    base_asset: z.enum(priceAssets),
    quote_asset: z.enum(priceAssets),
  }),
);

const broadcastPalletSafeModeStatuses = z.object({
  retry_enabled: z.boolean(),
  egress_witnessing_enabled: z.boolean(),
});

const ingressEgressPalletSafeModeStatuses = z.object({
  boost_deposits_enabled: z.boolean(),
  deposit_channel_creation_enabled: z.boolean(),
  deposit_channel_witnessing_enabled: z.boolean(),
  vault_deposit_witnessing_enabled: z.boolean(),
});

export const cfSafeModeStatuses = z.object({
  emissions: z.object({
    emissions_sync_enabled: z.boolean(),
  }),
  funding: z.object({
    redeem_enabled: z.boolean(),
  }),
  swapping: z.object({
    swaps_enabled: z.boolean(),
    withdrawals_enabled: z.boolean(),
    broker_registration_enabled: z.boolean(),
  }),
  liquidity_provider: z.object({
    deposit_enabled: z.boolean(),
    withdrawal_enabled: z.boolean(),
    internal_swaps_enabled: z.boolean(),
  }),
  validator: z.object({
    authority_rotation_enabled: z.boolean(),
    start_bidding_enabled: z.boolean(),
    stop_bidding_enabled: z.boolean(),
  }),
  pools: z.object({
    range_order_update_enabled: z.boolean(),
    limit_order_update_enabled: z.boolean(),
  }),
  trading_strategies: z.object({
    strategy_updates_enabled: z.boolean(),
    strategy_closure_enabled: z.boolean(),
    strategy_execution_enabled: z.boolean(),
  }),
  reputation: z.object({
    reporting_enabled: z.boolean(),
  }),
  asset_balances: z.object({
    reconciliation_enabled: z.boolean(),
  }),
  threshold_signature_evm: z.object({
    slashing_enabled: z.boolean(),
  }),
  threshold_signature_bitcoin: z.object({
    slashing_enabled: z.boolean(),
  }),
  threshold_signature_polkadot: z.object({
    slashing_enabled: z.boolean(),
  }),
  threshold_signature_solana: z.object({
    slashing_enabled: z.boolean(),
  }),
  lending_pools: z.object({
    add_boost_funds_enabled: z.boolean(),
    stop_boosting_enabled: z.boolean(),
    // TODO(1.12): remove `optional` after all networks upgraded
    borrowing_enabled: z.array(rpcAssetSchema).optional(),
    add_lender_funds_enabled: z.array(rpcAssetSchema).optional(),
    withdraw_lender_funds_enabled: z.array(rpcAssetSchema).optional(),
    add_collateral_enabled: z.array(rpcAssetSchema).optional(),
    remove_collateral_enabled: z.array(rpcAssetSchema).optional(),
  }),
  broadcast_ethereum: broadcastPalletSafeModeStatuses,
  broadcast_bitcoin: broadcastPalletSafeModeStatuses,
  broadcast_polkadot: broadcastPalletSafeModeStatuses,
  broadcast_arbitrum: broadcastPalletSafeModeStatuses,
  broadcast_solana: broadcastPalletSafeModeStatuses,
  broadcast_assethub: broadcastPalletSafeModeStatuses,
  ingress_egress_ethereum: ingressEgressPalletSafeModeStatuses,
  ingress_egress_bitcoin: ingressEgressPalletSafeModeStatuses,
  ingress_egress_polkadot: ingressEgressPalletSafeModeStatuses,
  ingress_egress_arbitrum: ingressEgressPalletSafeModeStatuses,
  ingress_egress_solana: ingressEgressPalletSafeModeStatuses,
  ingress_egress_assethub: ingressEgressPalletSafeModeStatuses,
  witnesser: z.enum(['CodeRed', 'CodeGreen', 'CodeAmber']),
  elections_generic: z.object({
    oracle_price_elections: z.boolean(),
  }),
});

export const cfLendingPools = z.array(
  z.object({
    asset: rpcAssetSchema,
    total_amount: numberOrHex,
    available_amount: numberOrHex,
    utilisation_rate: z.number(),
    current_interest_rate: z.number(),
    origination_fee: z.number(),
    liquidation_fee: z.number(),
    interest_rate_curve: z.object({
      interest_at_zero_utilisation: z.number(),
      junction_utilisation: z.number(),
      interest_at_junction_utilisation: z.number(),
      interest_at_max_utilisation: z.number(),
    }),
  }),
);

export const cfLendingConfig = z.object({
  ltv_thresholds: z.object({
    target: z.number(),
    topup: z.number(),
    soft_liquidation: z.number(),
    soft_liquidation_abort: z.number(),
    hard_liquidation: z.number(),
    hard_liquidation_abort: z.number(),
    low_ltv: z.number(),
  }),
  network_fee_contributions: z.object({
    extra_interest: z.number(),
    low_ltv_penalty_max: z.number(),
    from_origination_fee: z.number(),
    from_liquidation_fee: z.number(),
  }),
  fee_swap_interval_blocks: z.number(),
  interest_payment_interval_blocks: z.number(),
  fee_swap_threshold_usd: numberOrHex,
  interest_collection_threshold_usd: numberOrHex,
  liquidation_swap_chunk_size_usd: numberOrHex,
  soft_liquidation_max_oracle_slippage: z.number(),
  hard_liquidation_max_oracle_slippage: z.number(),
  fee_swap_max_oracle_slippage: z.number(),
  minimum_loan_amount_usd: numberOrHex,
  minimum_update_loan_amount_usd: numberOrHex,
  minimum_update_collateral_amount_usd: numberOrHex,
});

export const cfLoanAccount = z.object({
  account: accountId,
  primary_collateral_asset: rpcAssetSchema,
  ltv_ratio: numberOrHex,
  collateral: z.array(
    z.intersection(
      rpcAssetSchema,
      z.object({
        amount: numberOrHex,
      }),
    ),
  ),
  loans: z.array(
    z.object({
      loan_id: z.number(),
      asset: rpcAssetSchema,
      principal_amount: numberOrHex,
    }),
  ),
  liquidation_status: z
    .object({
      liquidation_swaps: z.array(
        z.object({
          swap_request_id: z.number(),
          loan_id: z.number(),
        }),
      ),
      is_hard: z.boolean(),
    })
    .nullable(),
});

export const cfLoanAccounts = z.array(cfLoanAccount);

export const cfVaultAddresses = z
  .object({
    ethereum: z.object({ Eth: z.array(z.number()).length(20).transform(bytesToHex) }),
    arbitrum: z.object({ Arb: z.array(z.number()).length(20).transform(bytesToHex) }),
    bitcoin: z.array(
      z.tuple([
        accountId,
        z.object({
          Btc: z
            .array(z.number())
            .transform((bytes) => new TextDecoder().decode(new Uint8Array(bytes))),
        }),
      ]),
    ),
  })
  .transform(({ ethereum, arbitrum, bitcoin }) => {
    const bitcoinAddresses = bitcoin.reduce((acc, [brokerId, { Btc }]) => {
      let obj = acc.get(brokerId);
      if (!obj) {
        obj = { current: '', previous: '' };
        acc.set(brokerId, obj);
      }
      if (!obj.previous) {
        obj.previous = Btc;
      } else {
        obj.current = Btc;
      }

      return acc;
    }, new Map<`cF${string}`, { current: string; previous: string }>());

    return {
      Ethereum: ethereum.Eth,
      Arbitrum: arbitrum.Arb,
      Bitcoin: bitcoinAddresses,
    };
  })
  .superRefine(({ Bitcoin }, ctx) => {
    Bitcoin.forEach((value, key) => {
      if (!value.current) {
        ctx.addIssue({
          message: `No current BTC address for broker ${key}`,
          code: z.ZodIssueCode.custom,
        });
      }
    });
  });
