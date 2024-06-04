import type { z } from 'zod';
import type { RpcResponse, RpcResult } from './common';
import type { broker, liquidityProvider, unregistered, validator } from './parsers';

export type CfAccountInfo = RpcResult<'cf_account_info'>;
export type CfBoostPoolsDepth = RpcResult<'cf_boost_pools_depth'>;
export type CfEnvironment = RpcResult<'cf_environment'>;
export type CfFundingEnvironment = RpcResult<'cf_funding_environment'>;
export type CfIngressEgressEnvironment = RpcResult<'cf_ingress_egress_environment'>;
export type CfPoolOrders = RpcResult<'cf_pool_orders'>;
export type CfPoolPriceV2 = RpcResult<'cf_pool_price_v2'>;
export type CfSupportedAssets = RpcResult<'cf_supported_assets'>;
export type CfSwappingEnvironment = RpcResult<'cf_swapping_environment'>;
export type CfSwapRate = RpcResult<'cf_swap_rate'>;
export type CfSwapRateV2 = RpcResult<'cf_swap_rate_v2'>;

export type CfAccountInfoResponse = RpcResponse<'cf_account_info'>;
export type CfBoostPoolsDepthResponse = RpcResponse<'cf_boost_pools_depth'>;
export type CfEnvironmentResponse = RpcResponse<'cf_environment'>;
export type CfFundingEnvironmentResponse = RpcResponse<'cf_funding_environment'>;
export type CfIngressEgressEnvironmentResponse = RpcResponse<'cf_ingress_egress_environment'>;
export type CfPoolOrdersResponse = RpcResponse<'cf_pool_orders'>;
export type CfPoolPriceV2Response = RpcResponse<'cf_pool_price_v2'>;
export type CfSupportedAssetsResponse = RpcResponse<'cf_supported_assets'>;
export type CfSwappingEnvironmentResponse = RpcResponse<'cf_swapping_environment'>;
export type CfSwapRateResponse = RpcResponse<'cf_swap_rate'>;
export type CfSwapRateV2Response = RpcResponse<'cf_swap_rate_v2'>;

export type CfUnregisteredAccount = z.output<typeof unregistered>;
export type CfBrokerAccount = z.output<typeof broker>;
export type CfValidatorAccount = z.output<typeof validator>;
export type CfLiquidityProviderAccount = z.output<typeof liquidityProvider>;

export type { RpcLimitOrder, RpcRangeOrder } from './parsers';
export type { RpcMethod, RpcRequest as RpcParams, RpcResult } from './common';
