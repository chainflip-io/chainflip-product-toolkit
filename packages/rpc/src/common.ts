import { HexString } from '@chainflip/utils/types';
import type { z } from 'zod';
import {
  AssetAndChain,
  cfBoostPoolDetails,
  cfBoostPoolPendingFees,
  brokerRequestSwapDepositAddress,
  cfAccountInfo,
  cfBoostPoolsDepth,
  cfEnvironment,
  cfFundingEnvironment,
  cfIngressEgressEnvironment,
  cfPoolOrders,
  cfPoolPriceV2,
  cfPoolsEnvironment,
  cfSupportedAssets,
  cfSwapRate,
  cfSwapRateV2,
  cfSwappingEnvironment,
  chainGetBlockHash,
  rpcResponse,
  stateGetMetadata,
  stateGetRuntimeVersion,
  cfPoolDepth,
  cfAccounts,
} from './parsers';

type Nullish<T> = T | null | undefined;

type WithHash<T> = {
  [K in keyof T]: T[K] extends unknown[] ? [...T[K], at?: Nullish<string>] : never;
};

export type Chain = AssetAndChain['chain'];

type AssetSymbol = AssetAndChain['asset'];

type UncheckedAssetAndChain = { asset: AssetSymbol; chain: Chain };

type AdditionalOrder = {
  LimitOrder: {
    base_asset: UncheckedAssetAndChain;
    quote_asset: UncheckedAssetAndChain;
    side: 'buy' | 'sell';
    tick: number;
    sell_amount: `0x${string}`;
  };
};

export type RpcRequest = WithHash<{
  broker_requestSwapDepositAddress: [
    sourceAsset: UncheckedAssetAndChain,
    destinationAsset: UncheckedAssetAndChain,
    destinationAddress: string,
    brokerCommission: number,
    ccmMetadata?: Nullish<{
      message: HexString;
      gas_budget: HexString;
    }>,
    boostFee?: Nullish<number>,
    affiliateFees?: Nullish<{ account: string; bps: number }[]>,
    fillOrKillParams?: Nullish<{
      refund_address: string;
      retry_duration_blocks: number;
      min_price: string;
    }>,
    dcaParams?: Nullish<{
      number_of_chunks: number;
      chunk_interval: number;
    }>,
  ];
  cf_account_info: [accountId: string];
  cf_accounts: [];
  cf_environment: [];
  cf_supported_assets: [];
  cf_swapping_environment: [];
  cf_ingress_egress_environment: [];
  cf_funding_environment: [];
  cf_pool_orders: [
    fromAsset: UncheckedAssetAndChain,
    toAsset: UncheckedAssetAndChain,
    accountId?: Nullish<string>,
  ];
  cf_pool_price_v2: [baseAsset: UncheckedAssetAndChain, quoteAsset: UncheckedAssetAndChain];
  cf_pools_environment: [];
  cf_swap_rate: [
    fromAsset: UncheckedAssetAndChain,
    toAsset: UncheckedAssetAndChain,
    amount: `0x${string}`,
  ];
  cf_swap_rate_v2: [
    fromAsset: UncheckedAssetAndChain,
    toAsset: UncheckedAssetAndChain,
    amount: `0x${string}`,
    additionalOrders?: Nullish<AdditionalOrder[]>,
  ];
  cf_boost_pools_depth: [];
  cf_boost_pool_details: [asset?: UncheckedAssetAndChain | null];
  cf_boost_pool_pending_fees: [asset?: UncheckedAssetAndChain | null];
  cf_pool_depth: [
    fromAsset: UncheckedAssetAndChain,
    toAsset: UncheckedAssetAndChain,
    tick_range: { start: number; end: number },
  ];
  state_getMetadata: [];
  state_getRuntimeVersion: [];
}> & {
  chain_getBlockHash: [blockHeight?: number];
};

export const rpcResult = {
  broker_requestSwapDepositAddress: brokerRequestSwapDepositAddress,
  cf_accounts: cfAccounts,
  cf_account_info: cfAccountInfo,
  cf_pool_depth: cfPoolDepth,
  cf_boost_pools_depth: cfBoostPoolsDepth,
  cf_environment: cfEnvironment,
  cf_funding_environment: cfFundingEnvironment,
  cf_ingress_egress_environment: cfIngressEgressEnvironment,
  cf_pool_orders: cfPoolOrders,
  cf_pool_price_v2: cfPoolPriceV2,
  cf_pools_environment: cfPoolsEnvironment,
  cf_supported_assets: cfSupportedAssets,
  cf_swap_rate: cfSwapRate,
  cf_swap_rate_v2: cfSwapRateV2,
  cf_swapping_environment: cfSwappingEnvironment,
  chain_getBlockHash: chainGetBlockHash,
  cf_boost_pool_details: cfBoostPoolDetails,
  cf_boost_pool_pending_fees: cfBoostPoolPendingFees,
  state_getMetadata: stateGetMetadata,
  state_getRuntimeVersion: stateGetRuntimeVersion,
} as const satisfies { [K in keyof RpcRequest]: z.ZodTypeAny };

export type RpcMethod = keyof RpcRequest;

export type RpcResponse<T extends RpcMethod> = z.input<(typeof rpcResult)[T]>;
export type RpcResult<T extends RpcMethod> = z.output<(typeof rpcResult)[T]>;

export type JsonRpcRequest<T extends RpcMethod> = {
  jsonrpc: '2.0';
  id: string;
  method: T;
  params: RpcRequest[T];
};

export type JsonRpcResponse = z.output<typeof rpcResponse>;

export { rpcResponse } from './parsers';
