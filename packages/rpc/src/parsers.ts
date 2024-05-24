import { isNotNullish } from '@chainflip/utils/guard';
import { isHex } from '@chainflip/utils/string';
import { z } from 'zod';

// base types

export const hexString = z.string().refine(isHex, { message: 'Invalid hex string' });

export const u256 = hexString.transform((value) => BigInt(value));

export const numberOrHex = z.union([z.number().transform((n) => BigInt(n)), u256]);

const chainAssetMapFactory = <Z extends z.ZodTypeAny>(parser: Z) =>
  z.object({
    Bitcoin: z.object({ BTC: parser }),
    Ethereum: z.object({ ETH: parser, USDC: parser, FLIP: parser, USDT: parser }),
    Polkadot: z.object({ DOT: parser }),
    Arbitrum: z.object({ ETH: parser, USDC: parser }),
  });

const chainMapFactory = <Z extends z.ZodTypeAny>(parser: Z) =>
  z.object({ Bitcoin: parser, Ethereum: parser, Polkadot: parser, Arbitrum: parser });

const rpcAssetSchema = z.union([
  z.object({ chain: z.literal('Bitcoin'), asset: z.literal('BTC') }),
  z.object({ chain: z.literal('Polkadot'), asset: z.literal('DOT') }),
  z.object({ chain: z.literal('Ethereum'), asset: z.literal('FLIP') }),
  z.object({ chain: z.literal('Ethereum'), asset: z.literal('ETH') }),
  z.object({ chain: z.literal('Ethereum'), asset: z.literal('USDC') }),
  z.object({ chain: z.literal('Ethereum'), asset: z.literal('USDT') }),
  z.object({ chain: z.literal('Arbitrum'), asset: z.literal('ETH') }),
  z.object({ chain: z.literal('Arbitrum'), asset: z.literal('USDC') }),
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

export const chainGetBlockHash = z.string();

export const stateGetMetadata = z.string();

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
    minimum_deposit_amounts: chainAssetMapFactory(numberOrHex),
    ingress_fees: chainAssetMapFactory(numberOrHex.nullable()),
    egress_fees: chainAssetMapFactory(numberOrHex.nullable()),
    witness_safety_margins: chainMapFactory(z.number().nullable()),
    egress_dust_limits: chainAssetMapFactory(numberOrHex),
    channel_opening_fees: chainMapFactory(numberOrHex),
  })
  .transform(rename({ egress_dust_limits: 'minimum_egress_amounts' }));

export const cfSwappingEnvironment = z.object({
  maximum_swap_amounts: chainAssetMapFactory(numberOrHex.nullable()),
  network_fee_hundredth_pips: z.number(),
});

export const cfFundingEnvironment = z.object({
  redemption_tax: numberOrHex,
  minimum_funding_amount: numberOrHex,
});

export const cfEnvironment = z.object({
  ingress_egress: cfIngressEgressEnvironment,
  swapping: cfSwappingEnvironment,
  funding: cfFundingEnvironment,
});

export const cfBoostPoolsDepth = z.array(
  z.intersection(rpcAssetSchema, z.object({ tier: z.number(), available_amount: u256 })),
);

export const cfSupportedAsssets = z.array(rpcAssetSchema);
