import { hexToBytes } from '@chainflip/utils/bytes';
import { parseUrlWithBasicAuth } from '@chainflip/utils/url';
import BigNumber from 'bignumber.js';
import { z } from 'zod';

const hexString = z.string().regex(/^([0-9a-f]{2})+$/, { message: 'expected hex string' });

const vout = z.object({
  value: z.number().transform((n) => BigInt(new BigNumber(n).shiftedBy(8).toFixed(0))),
  n: z.number(),
});

const nulldataVout = z
  .object({
    scriptPubKey: z.object({
      type: z.literal('nulldata'),
      // remove OP_RETURN and PUSH_BYTES_XX
      hex: hexString.transform((x) => hexToBytes(`0x${x.slice(4)}`)),
    }),
  })
  .and(vout);

const addressVout = z
  .object({
    scriptPubKey: z.object({
      type: z.enum([
        'witness_v1_taproot',
        'witness_v0_scripthash',
        'witness_v0_keyhash',
        'pubkeyhash',
        'scripthash',
      ]),
      address: z.string(),
    }),
  })
  .and(vout);

const txSchema = z.object({
  vout: z.tuple([addressVout, nulldataVout, addressVout]),
  blockhash: hexString.nullish(),
});

const blockSchema = z.object({
  height: z.number(),
});

type RpcRequest = {
  getrawtransaction: [txId: string, enhanced?: boolean];
  getblock: [blockHash: string, enhanced?: boolean];
};

const responseSchemas = {
  getrawtransaction: txSchema,
  getblock: blockSchema,
} as const;

const rpcResponse = z.union([
  z.object({ result: z.null(), error: z.object({ code: z.number(), message: z.string() }) }),
  z.object({ result: z.unknown(), error: z.null() }),
]);

export const makeRequest = async <T extends keyof RpcRequest & keyof typeof responseSchemas>(
  rpcUrl: string,
  method: T,
  params: RpcRequest[T],
): Promise<z.output<(typeof responseSchemas)[T]> | null> => {
  const { url, headers } = parseUrlWithBasicAuth(rpcUrl);

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method,
      params,
    }),
  });

  const text = await res.text();

  let json: unknown;

  try {
    json = JSON.parse(text);
  } catch {
    if (res.status !== 200) {
      throw new Error(`HTTP error [${res.status}]: ${text || res.statusText}`);
    }

    throw new Error(`Invalid JSON response: ${text}`);
  }

  const result = rpcResponse.parse(json);

  if (result.error) {
    if (result.error.code === -5) return null;
    throw new Error(`RPC error [${result.error.code}]: ${result.error.message}`);
  }

  const parseResult = responseSchemas[method].safeParse(result.result);

  if (!parseResult.success) {
    if (method === 'getrawtransaction') return null;
    throw parseResult.error;
  }

  return parseResult.data;
};
