import { assert } from '@chainflip/utils/assertion';
import * as base58 from '@chainflip/utils/base58';
import { bytesToHex } from '@chainflip/utils/bytes';
import {
  type ChainflipAsset,
  type ChainflipChain,
  type ChainflipNetwork,
  assetConstants,
  assetContractId,
} from '@chainflip/utils/chainflip';
import { POLKADOT_SS58_PREFIX } from '@chainflip/utils/consts';
import * as ss58 from '@chainflip/utils/ss58';
import { type VaultSwapData } from '@chainflip/utils/types';
import { parseUrlWithBasicAuth } from '@chainflip/utils/url';
import { BigNumber } from 'bignumber.js';
import * as bitcoin from 'bitcoinjs-lib';
import { Struct, Bytes, u16, u128, u8, Vector } from 'scale-ts';
import { encodeAddress } from './address';
import { networkMap } from './consts';

const addressByteLengths: Record<ChainflipChain, number | undefined> = {
  Bitcoin: undefined,
  Arbitrum: 20,
  Ethereum: 20,
  Solana: 32,
  Polkadot: 32,
};

const contractIdToInternalAsset: Record<number, ChainflipAsset> = Object.fromEntries(
  (Object.entries(assetContractId) as [ChainflipAsset, number][]).map(([asset, id]) => [id, asset]),
);

const encodeChainAddress = (data: Uint8Array, chain: ChainflipChain, network: ChainflipNetwork) => {
  switch (chain) {
    case 'Solana':
      return base58.encode(data);
    case 'Polkadot':
      return ss58.encode({ data, ss58Format: POLKADOT_SS58_PREFIX });
    case 'Ethereum':
    case 'Arbitrum':
      return bytesToHex(data);
    case 'Bitcoin':
      return encodeAddress(data, 'Taproot', network);
  }
};

const parseVaultSwapData = (txOutput: bitcoin.TxOutput, network: ChainflipNetwork) => {
  try {
    // the first two bytes are OP_RETURN
    const data = txOutput.script.slice(2);
    const version = data[0];
    // only supported version (and only version)
    assert(version === 0, 'unsupported version');
    const contractId = data[1];
    // use the destination asset to derive the address length
    const outputAsset = contractIdToInternalAsset[contractId];
    assert(outputAsset, 'unsupported contract id');
    const destinationChain = assetConstants[outputAsset].chain;
    const byteLength = addressByteLengths[destinationChain];

    const { destinationAddress, parameters } = Struct({
      version: u8,
      destinationAsset: u8,
      destinationAddress: Bytes(byteLength),
      parameters: Struct({
        retryDuration: u16,
        minOutputAmount: u128,
        numberOfChunks: u16,
        chunkInterval: u16,
        boostFee: u8,
        brokerFee: u8,
        affiliates: Vector(Struct({ accountIndex: u8, commissionBps: u8 })),
      }),
    }).dec(data);

    return {
      ok: true,
      value: {
        ...parameters,
        outputAsset,
        destinationAddress: encodeChainAddress(destinationAddress, destinationChain, network),
      },
    } as const;
  } catch (e) {
    return { ok: false, reason: e } as const;
  }
};

type RpcRequest = {
  getrawtransaction: [txId: string];
};

const makeRpcRequest = async <T extends keyof RpcRequest>(
  rpcUrl: string,
  method: T,
  params: RpcRequest[T],
) => {
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
    return {
      ok: false,
      reason: new Error(`Received non-200 status code: ${res.status}`),
    } as const;
  }

  const data = (await res.json()) as
    | { result: string; error: null }
    | { result: null; error: { code: number; message: string } };

  if (data.error) {
    return {
      ok: false,
      reason: new Error(`RPC error [${data.error.code}]: ${data.error.message}`),
    } as const;
  }

  return { ok: true, value: data.result } as const;
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
  network: ChainflipNetwork,
): Promise<(VaultSwapData & { depositAddress: string }) | null> => {
  const result = await makeRpcRequest(url, 'getrawtransaction', [txId]);

  if (!result.ok) return null;

  const tx = bitcoin.Transaction.fromHex(result.value);

  if (tx.outs.length !== 3) return null;

  const swapDataResult = parseVaultSwapData(tx.outs[1], network);

  if (!swapDataResult.ok) return null;

  const data = swapDataResult.value;

  const amount = tx.outs[0].value;

  const networkInfo = {
    mainnet: bitcoin.networks.bitcoin,
    testnet: bitcoin.networks.testnet,
    regtest: bitcoin.networks.regtest,
  };

  const depositAddress = encodeAddress(tx.outs[0].script.slice(2), 'Taproot', 'testnet');

  const refundAddress = bitcoin.address.fromOutputScript(
    tx.outs[2].script,
    networkInfo[networkMap[network]],
  );

  return {
    inputAsset: 'Btc' as const,
    amount,
    depositAddress,
    refundParams: {
      refundAddress,
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
    depositChainBlockHeight: 0, // fixme
  };
};
