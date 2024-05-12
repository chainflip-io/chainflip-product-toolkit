import { z } from 'zod';

type Nullish<T> = T | null | undefined;

type WithHash<T> = {
  [K in keyof T]: T[K] extends unknown[] ? [...T[K], at?: Nullish<string>] : never;
};

const chainAssets = {
  Ethereum: ['ETH', 'USDC', 'USDT', 'FLIP'],
  Arbitrum: ['ETH', 'USDC'],
  Polkadot: ['DOT'],
  Bitcoin: ['BTC'],
} as const;

type Chain = keyof typeof chainAssets;

export const isChain = (value: string): value is Chain => value in chainAssets;

export type Asset = {
  [K in Chain]: {
    [A in (typeof chainAssets)[K][number]]: { chain: K; asset: A };
  }[(typeof chainAssets)[K][number]];
}[Chain];

export type RpcRequest = WithHash<{
  cf_swap_rate: [from: Asset, to: Asset, amount: `0x${string}`];
}>;

// const asset = z.object({ chain: z.string(), asset: z.string() }).refine((value): value is Asset => {
//   if (!isChain(value.chain)) return false;
//   const assets = chainAssets[value.chain];
//   return (assets as unknown as string[]).includes(value.asset);
// }, 'invalid asset and chain combination');

const u256 = z
  .string()
  .regex(/^0x[0-9a-f]+$/i)
  .transform((value) => BigInt(value));

const numberOrHex = z.union([z.number().transform((n) => BigInt(n)), u256]);

export const rpcResult = {
  cf_swap_rate: z.object({
    intermediary: numberOrHex.nullable(),
    output: numberOrHex,
  }),
} as const satisfies { [K in keyof RpcRequest]: z.ZodTypeAny };

export type RpcMethod = keyof RpcRequest;

export type RpcResult<T extends RpcMethod> = z.output<(typeof rpcResult)[T]>;

const rpcBaseResponse = z.object({
  id: z.string(),
  jsonrpc: z.literal('2.0'),
});

const rpcSuccessResponse = rpcBaseResponse.extend({ result: z.unknown() });

const rpcErrorResponse = rpcBaseResponse.extend({
  error: z.object({
    code: z.number(),
    message: z.string(),
  }),
});

export const rpcResponse = z.union([rpcSuccessResponse, rpcErrorResponse]);

export type JsonRpcRequest<T extends RpcMethod> = {
  jsonrpc: '2.0';
  id: string;
  method: T;
  params: RpcRequest[T];
};

export type JsonRpcResponse = z.output<typeof rpcResponse>;
