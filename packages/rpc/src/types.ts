import type { RpcResponse, RpcResult } from './common';

export type CfBoostPoolsDepth = RpcResult<'cf_boost_pools_depth'>;
export type CfEnvironment = RpcResult<'cf_environment'>;
export type CfFundingEnvironment = RpcResult<'cf_funding_environment'>;
export type CfIngressEgressEnvironment = RpcResult<'cf_ingress_egress_environment'>;
export type CfSupportedAssets = RpcResult<'cf_supported_assets'>;
export type CfSwappingEnvironment = RpcResult<'cf_swapping_environment'>;
export type CfSwapRate = RpcResult<'cf_swap_rate'>;
export type CfSwapRateV2 = RpcResult<'cf_swap_rate_v2'>;

export type CfBoostPoolsDepthResponse = RpcResponse<'cf_boost_pools_depth'>;
export type CfEnvironmentResponse = RpcResponse<'cf_environment'>;
export type CfFundingEnvironmentResponse = RpcResponse<'cf_funding_environment'>;
export type CfIngressEgressEnvironmentResponse = RpcResponse<'cf_ingress_egress_environment'>;
export type CfSupportedAssetsResponse = RpcResponse<'cf_supported_assets'>;
export type CfSwappingEnvironmentResponse = RpcResponse<'cf_swapping_environment'>;
export type CfSwapRateResponse = RpcResponse<'cf_swap_rate'>;
export type CfSwapRateV2Response = RpcResponse<'cf_swap_rate_v2'>;

export { type RpcMethod, type RpcRequest as RpcParams, type RpcResult } from './common';
