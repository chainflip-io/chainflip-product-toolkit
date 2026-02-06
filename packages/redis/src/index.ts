import { reverseBytes } from '@chainflip/utils/bytes';
import {
  type ChainflipAsset,
  type ChainflipChain,
  assetConstants,
} from '@chainflip/utils/chainflip';
import * as ss58 from '@chainflip/utils/ss58';
import { isHex } from '@chainflip/utils/string';
import assert from 'assert';
import Redis from 'ioredis';
import {
  broadcastParsers,
  PendingDeposit,
  AssethubBroadcast,
  BitcoinBroadcast,
  Broadcast,
  EthereumBroadcast,
  depositSchema,
  mempoolTransaction,
  vaultDepositSchema,
} from './parsers';

export default class RedisClient {
  private client;

  constructor(url: `redis://${string}` | `rediss://${string}`) {
    this.client = new Redis(url);
  }

  async getBroadcast(
    chain: 'Ethereum',
    broadcastId: number | bigint,
  ): Promise<EthereumBroadcast | null>;
  async getBroadcast(
    chain: 'Assethub',
    broadcastId: number | bigint,
  ): Promise<AssethubBroadcast | null>;
  async getBroadcast(
    chain: 'Bitcoin',
    broadcastId: number | bigint,
  ): Promise<BitcoinBroadcast | null>;
  async getBroadcast(
    chain: 'Arbitrum',
    broadcastId: number | bigint,
  ): Promise<EthereumBroadcast | null>;
  async getBroadcast(
    chain: ChainflipChain,
    broadcastId: number | bigint,
  ): Promise<Broadcast | null>;
  async getBroadcast(
    chain: ChainflipChain,
    broadcastId: number | bigint,
  ): Promise<Broadcast | null> {
    if (chain === 'Solana' || chain === 'Polkadot') return null;
    const key = `broadcast:${chain}:${broadcastId}`;
    const value = await this.client.get(key);
    return value ? broadcastParsers[chain].parse(JSON.parse(value)) : null;
  }

  async getDeposits(asset: ChainflipAsset, address: string): Promise<PendingDeposit[]> {
    const { chain } = assetConstants[asset];
    const parsedAddress = chain === 'Assethub' ? ss58.toPublicKey(address) : address;
    const key = `deposit:${chain}:${parsedAddress}`;
    const deposits = await this.client.lrange(key, 0, -1);
    return deposits
      .map((depositString) => {
        const parsedDeposit = depositSchema.parse(depositString);
        const { deposit_details, ...deposit } = parsedDeposit;
        switch (deposit_details?.type) {
          case 'EVM':
            return { ...deposit, tx_refs: deposit_details.tx_hashes };
          case 'Bitcoin':
            return { ...deposit, tx_refs: [deposit_details.tx_id] };
          case 'Assethub':
            return {
              ...deposit,
              tx_refs: [`${deposit.deposit_chain_block_height}-${deposit_details.extrinsic_index}`],
            };
          default:
            assert(deposit_details === null, 'Invalid deposit details');
            return { ...deposit, tx_refs: [] };
        }
      })
      .filter((deposit) => deposit.asset === asset)
      .sort((a, b) => a.deposit_chain_block_height - b.deposit_chain_block_height);
  }

  async getMempoolTransaction(chain: 'Bitcoin', address: string) {
    const key = `mempool:${chain}:${address}`;
    const value = await this.client.get(key);
    return value ? mempoolTransaction.parse(value) : null;
  }

  async getPendingVaultSwap(chain: ChainflipChain, txId: string) {
    const unavailableChains: ChainflipChain[] = ['Solana', 'Assethub'];
    if (unavailableChains.includes(chain)) return null;

    const redisTxId = chain === 'Bitcoin' && isHex(`0x${txId}`) ? reverseBytes(`0x${txId}`) : txId;
    const value = await this.client.get(`vault_deposit:${chain}:${redisTxId}`);
    return value ? vaultDepositSchema.parse(value) : null;
  }

  quit() {
    return this.client.quit();
  }
}
