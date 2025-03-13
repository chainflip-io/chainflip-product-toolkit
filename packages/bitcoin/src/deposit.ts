import { assert } from '@chainflip/utils/assertion';
import * as base58 from '@chainflip/utils/base58';
import { bytesToHex } from '@chainflip/utils/bytes';
import { type ChainflipAsset, assetConstants, assetContractId } from '@chainflip/utils/chainflip';
import { POLKADOT_SS58_PREFIX } from '@chainflip/utils/consts';
import * as ss58 from '@chainflip/utils/ss58';
import { type VaultSwapData } from '@chainflip/utils/types';
import { parseUrlWithBasicAuth } from '@chainflip/utils/url';
import { BigNumber } from 'bignumber.js';
import { type z } from 'zod';
import { createSwapDataCodec } from './scale';
import { blockSchema, txSchema } from './schemas';

const encodeChainAddress = (data: Uint8Array, asset: ChainflipAsset) => {
  switch (assetConstants[asset].chain) {
    case 'Solana':
      return base58.encode(data);
    case 'Polkadot':
      return ss58.encode({ data, ss58Format: POLKADOT_SS58_PREFIX });
    case 'Ethereum':
    case 'Arbitrum':
      return bytesToHex(data);
    case 'Bitcoin':
      return new TextDecoder().decode(data);
  }
};

const contractIdToInternalAsset: Record<number, ChainflipAsset> = Object.fromEntries(
  (Object.entries(assetContractId) as [ChainflipAsset, number][]).map(([asset, id]) => [id, asset]),
);

const parseVaultSwapData = (data: Uint8Array) => {
  const version = data[0];
  // only supported version (and only version)
  assert(version === 0, 'unsupported version');
  const contractId = data[1];
  const outputAsset = contractIdToInternalAsset[contractId];
  assert(outputAsset, 'unknown asset contract id');

  const { destinationAddress, parameters } = createSwapDataCodec(outputAsset).dec(data);

  return {
    ...parameters,
    outputAsset,
    destinationAddress: encodeChainAddress(destinationAddress, outputAsset),
  };
};

type RpcRequest = {
  getrawtransaction: [txId: string, enhanced?: boolean];
  getblock: [blockHash: string, enhanced?: boolean];
};

const responseSchemas = {
  getrawtransaction: txSchema,
  getblock: blockSchema,
} as const;

type Result<T, E> = { ok: true; value: T } | { ok: false; reason: E };

const makeRpcRequest = async <T extends keyof RpcRequest & keyof typeof responseSchemas>(
  rpcUrl: string,
  method: T,
  params: RpcRequest[T],
): Promise<z.output<(typeof responseSchemas)[T]>> => {
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

  if (!res.ok) {
    throw new Error(`Received non-200 status code: ${res.status}`);
  }

  const data = (await res.json()) as
    | { result: unknown; error: null }
    | { result: null; error: { code: number; message: string } };

  if (data.error) throw new Error(`RPC error [${data.error.code}]: ${data.error.message}`);

  const parseResult = responseSchemas[method].safeParse(data.result);

  if (!parseResult.success) throw parseResult.error;

  return parseResult.data;
};

const getX128PriceFromAmounts = (depositAmount: bigint, minOutputAmount: bigint) =>
  BigInt(
    new BigNumber(minOutputAmount.toString())
      .div(depositAmount.toString())
      .multipliedBy(new BigNumber(2).pow(128))
      .toFixed(0, BigNumber.ROUND_FLOOR),
  );

export const findVaultSwapData = async (
  url: string,
  txId: string,
): Promise<Result<VaultSwapData & { depositAddress: string }, Error>> => {
  try {
    const tx = await makeRpcRequest(url, 'getrawtransaction', [txId, true]);

    const data = parseVaultSwapData(tx.vout[1].scriptPubKey.hex);

    const amount = tx.vout[0].value;

    const block = await makeRpcRequest(url, 'getblock', [tx.blockhash, true]).catch(() => ({
      height: 0,
    }));

    return {
      ok: true,
      value: {
        inputAsset: 'Btc' as const,
        amount,
        depositAddress: tx.vout[0].scriptPubKey.address,
        refundParams: {
          refundAddress: tx.vout[2].scriptPubKey.address,
          retryDuration: data.retryDuration,
          minPrice: getX128PriceFromAmounts(amount, data.minOutputAmount),
        },
        destinationAddress: data.destinationAddress,
        outputAsset: data.outputAsset,
        brokerFee: data.brokerFee,
        affiliateFees: data.affiliates,
        ccmDepositMetadata: null,
        maxBoostFee: data.boostFee,
        dcaParams:
          data.numberOfChunks > 0 && data.chunkInterval > 0
            ? {
                chunkInterval: data.chunkInterval,
                numberOfChunks: data.numberOfChunks,
              }
            : null,
        depositChainBlockHeight: block.height,
      },
    };
  } catch (e) {
    return { ok: false, reason: e as Error };
  }
};
