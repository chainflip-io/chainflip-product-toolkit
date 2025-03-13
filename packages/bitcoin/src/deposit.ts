import { assert } from '@chainflip/utils/assertion';
import * as base58 from '@chainflip/utils/base58';
import { bytesToHex } from '@chainflip/utils/bytes';
import { type ChainflipAsset, assetConstants, assetContractId } from '@chainflip/utils/chainflip';
import { POLKADOT_SS58_PREFIX } from '@chainflip/utils/consts';
import * as ss58 from '@chainflip/utils/ss58';
import { type VaultSwapData } from '@chainflip/utils/types';
import { BigNumber } from 'bignumber.js';
import * as rpc from './rpc';
import { createSwapDataCodec } from './scale';

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

const getX128PriceFromAmounts = (depositAmount: bigint, minOutputAmount: bigint) =>
  BigInt(
    new BigNumber(minOutputAmount.toString())
      .div(depositAmount.toString())
      .multipliedBy(new BigNumber(2).pow(128))
      .toFixed(0, BigNumber.ROUND_FLOOR),
  );

export type BitcoinVaultSwapData = VaultSwapData & { depositAddress: string };

export const findVaultSwapData = async (
  url: string,
  txId: string,
): Promise<BitcoinVaultSwapData | null> => {
  const tx = await rpc.makeRequest(url, 'getrawtransaction', [txId, true]);

  if (!tx) return null;

  const data = parseVaultSwapData(tx.vout[1].scriptPubKey.hex);

  const amount = tx.vout[0].value;

  const block = await rpc.makeRequest(url, 'getblock', [tx.blockhash, true]).catch(() => ({
    height: 0,
  }));

  return {
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
    brokerFee: { account: null, commissionBps: data.brokerFee },
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
    depositChainBlockHeight: block?.height ?? 0,
  };
};
