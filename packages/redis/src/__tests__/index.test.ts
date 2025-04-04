import Redis from 'ioredis';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import RedisClient from '../index';

vi.mock('ioredis');
const url = 'redis://localhost:6379';

describe(RedisClient, () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe(RedisClient.prototype.constructor, () => {
    it('creates a new Redis client', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const client = new RedisClient(url);
      expect(Redis).toHaveBeenCalledWith(url);
    });
  });

  describe(RedisClient.prototype.getBroadcast, () => {
    it('returns null if the broadcast does not exist', async () => {
      const mock = vi.mocked(Redis.prototype.get).mockResolvedValueOnce(null);
      const client = new RedisClient(url);
      const broadcast = await client.getBroadcast('Ethereum', 1);
      expect(broadcast).toBeNull();
      expect(mock).toHaveBeenCalledWith('broadcast:Ethereum:1');
    });

    it('returns null for Solana', async () => {
      const mock = vi.mocked(Redis.prototype.get).mockResolvedValueOnce(null);
      const client = new RedisClient(url);
      const broadcast = await client.getBroadcast('Solana', 1);
      expect(broadcast).toBeNull();
      expect(mock).not.toHaveBeenCalled();
    });

    it.each([
      ['Bitcoin' as const, { hash: '0x1234' }, { hash: '0xdeadc0de' }],
      ['Bitcoin' as const, { hash: '0x1234' }, { hash: 'deadc0de' }],
      [
        'Polkadot' as const,
        { signature: '0x1234' },
        { transaction_id: { block_number: 100, extrinsic_index: 20 } },
      ],
      [
        'Ethereum' as const,
        { signature: { s: [], k_times_g_address: [] } },
        { hash: '0xdeadc0de' },
      ],
    ])('parses a %s broadcast', async (chain, txOutId, txRef) => {
      const mock = vi
        .mocked(Redis.prototype.get)
        .mockResolvedValueOnce(JSON.stringify({ tx_out_id: txOutId, tx_ref: txRef }));
      const client = new RedisClient(url);
      const broadcast = await client.getBroadcast(chain, 1);
      expect(broadcast).toMatchSnapshot(`${chain} broadcast`);
      expect(mock).toHaveBeenCalledWith(`broadcast:${chain}:1`);
    });
  });

  describe(RedisClient.prototype.getMempoolTransaction, () => {
    it('returns null if no tx is found for the address', async () => {
      const mock = vi.mocked(Redis.prototype.get).mockResolvedValueOnce(null);
      const client = new RedisClient(url);
      const broadcast = await client.getMempoolTransaction(
        'Bitcoin',
        'tb1pdz3akc5wa2gr69v3x87tfg0ka597dxqvfl6zhqx4y202y63cgw0q3rgpm6',
      );
      expect(broadcast).toBeNull();
      expect(mock).toHaveBeenCalledWith(
        'mempool:Bitcoin:tb1pdz3akc5wa2gr69v3x87tfg0ka597dxqvfl6zhqx4y202y63cgw0q3rgpm6',
      );
    });

    it('returns the tx if found', async () => {
      const mock = vi.mocked(Redis.prototype.get).mockResolvedValueOnce(
        JSON.stringify({
          confirmations: 4,
          value: '0x12b74280',
          tx_hash: '1234',
          deposit_chain_block_height: 402,
        }),
      );
      const client = new RedisClient(url);
      const tx = await client.getMempoolTransaction(
        'Bitcoin',
        'tb1pdz3akc5wa2gr69v3x87tfg0ka597dxqvfl6zhqx4y202y63cgw0q3rgpm6',
      );
      expect(tx).toMatchInlineSnapshot(`
        {
          "confirmations": 4,
          "deposit_chain_block_height": 402,
          "tx_hash": "1234",
          "value": 314000000n,
        }
      `);
      expect(mock).toHaveBeenCalledWith(
        'mempool:Bitcoin:tb1pdz3akc5wa2gr69v3x87tfg0ka597dxqvfl6zhqx4y202y63cgw0q3rgpm6',
      );
    });
  });

  describe(RedisClient.prototype.getDeposits, () => {
    it('returns an empty array if no deposits are found', async () => {
      const mock = vi.mocked(Redis.prototype.lrange).mockResolvedValueOnce([]);
      const client = new RedisClient(url);
      const deposits = await client.getDeposits('Eth', '0x1234');
      expect(deposits).toEqual([]);
      expect(mock).toHaveBeenCalledWith('deposit:Ethereum:0x1234', 0, -1);
    });

    it('returns the deposits if found - Polkadot', async () => {
      const mock = vi.mocked(Redis.prototype.lrange).mockResolvedValueOnce([
        JSON.stringify({
          amount: '0x8000',
          asset: { asset: 'DOT', chain: 'Polkadot' },
          deposit_chain_block_height: 100,
          deposit_details: {
            extrinsic_index: 20,
          },
        }),
      ]);

      const client = new RedisClient(url);
      const deposits = await client.getDeposits(
        'Dot',
        '121LWHo3TJYdvSuDVhdCY6P9Bk6Cd5wMkkvMnU5joWJfuWBJ',
      );
      expect(deposits).toMatchInlineSnapshot(`
        [
          {
            "amount": 32768n,
            "asset": "Dot",
            "deposit_chain_block_height": 100,
            "tx_refs": [
              "100-20",
            ],
          },
        ]
      `);
      expect(mock).toHaveBeenCalledWith(
        'deposit:Polkadot:0x2c7de4a2d760264b29f2033b67aa882f300e1785bc7d130fbf67f5b127202169',
        0,
        -1,
      );
    });

    it('returns the deposits if found', async () => {
      const mock = vi.mocked(Redis.prototype.lrange).mockResolvedValueOnce([
        JSON.stringify({
          amount: '0x8000',
          asset: { asset: 'BTC', chain: 'Bitcoin' },
          deposit_chain_block_height: 1234,
          deposit_details: {
            tx_id: '0x1234',
            vout: 1,
          },
        }),
      ]);
      const client = new RedisClient(url);
      const deposits = await client.getDeposits('Btc', '0x1234');
      expect(deposits).toMatchInlineSnapshot(`
        [
          {
            "amount": 32768n,
            "asset": "Btc",
            "deposit_chain_block_height": 1234,
            "tx_refs": [
              "3412",
            ],
          },
        ]
      `);
      expect(mock).toHaveBeenCalledWith('deposit:Bitcoin:0x1234', 0, -1);
    });

    it('filters out other assets for the same chain', async () => {
      const mock = vi.mocked(Redis.prototype.lrange).mockResolvedValueOnce([
        JSON.stringify({
          amount: '0x8000',
          asset: { asset: 'FLIP', chain: 'Ethereum' },
          deposit_chain_block_height: 1234,
          deposit_details: {
            tx_hashes: ['0x65f4c6ba793815c4d1a9e4f0fd43c0f6f26ff5f1678a621d543a8928c1c2e978'],
          },
        }),
      ]);
      const client = new RedisClient(url);
      const deposits = await client.getDeposits('Eth', '0x1234');
      expect(deposits).toEqual([]);
      expect(mock).toHaveBeenCalledWith('deposit:Ethereum:0x1234', 0, -1);
    });

    it('handles null deposit details', async () => {
      const mock = vi.mocked(Redis.prototype.lrange).mockResolvedValueOnce([
        JSON.stringify({
          amount: '0x8000',
          asset: { asset: 'FLIP', chain: 'Ethereum' },
          deposit_chain_block_height: 1234,
          deposit_details: null,
        }),
      ]);
      const client = new RedisClient(url);
      const deposits = await client.getDeposits('Flip', '0x1234');
      expect(deposits).toMatchInlineSnapshot(`
        [
          {
            "amount": 32768n,
            "asset": "Flip",
            "deposit_chain_block_height": 1234,
            "tx_refs": [],
          },
        ]
      `);
      expect(mock).toHaveBeenCalledWith('deposit:Ethereum:0x1234', 0, -1);
    });
  });

  describe(RedisClient.prototype.getPendingVaultSwap, () => {
    it('returns null if no vault swaps are found', async () => {
      const mock = vi.mocked(Redis.prototype.get).mockResolvedValue(null);
      const client = new RedisClient(url);
      const swap = await client.getPendingVaultSwap(
        'Ethereum',
        '0x15248bdd0db4299e54d999f447f588a2325a505446fa8b4c57a1cf66f9bc9239',
      );
      expect(swap).toBeNull();
      expect(mock).toHaveBeenCalledWith(
        'vault_deposit:Ethereum:0x15248bdd0db4299e54d999f447f588a2325a505446fa8b4c57a1cf66f9bc9239',
      );
    });

    it('returns null for chains where vault swaps are not available in redis', async () => {
      const mock = vi.mocked(Redis.prototype.get);
      const client = new RedisClient(url);

      const polkadotSwap = await client.getPendingVaultSwap('Polkadot', '134422-43');
      expect(polkadotSwap).toBeNull();
      expect(mock).not.toHaveBeenCalled();

      const solanaSwap = await client.getPendingVaultSwap('Solana', '134422-43');
      expect(solanaSwap).toBeNull();
      expect(mock).not.toHaveBeenCalled();
    });

    it('looks up bitcoin swap with hex transaction id', async () => {
      const mock = vi.mocked(Redis.prototype.get).mockResolvedValue(null);
      const client = new RedisClient(url);
      await client.getPendingVaultSwap(
        'Bitcoin',
        'df8f78afe35ee28d52748e964b1de73ddb96b85091dd387ab1835b398a65b642',
      );

      expect(mock).toHaveBeenCalledWith(
        'vault_deposit:Bitcoin:0x42b6658a395b83b17a38dd9150b896db3de71d4b968e74528de25ee3af788fdf',
      );
    });

    it('returns vault swap', async () => {
      const mock = vi.mocked(Redis.prototype.get).mockResolvedValue(
        JSON.stringify({
          deposit_chain_block_height: 7755386,
          input_asset: { chain: 'Ethereum', asset: 'ETH' },
          output_asset: { chain: 'Ethereum', asset: 'FLIP' },
          amount: '0x16345785d8a0000',
          destination_address: '0xcb583c817964a2c527608f8b813a4c9bddb559a9',
          ccm_deposit_metadata: null,
          deposit_details: {
            tx_hashes: ['0x5775a3ac8821d3d13bf965eb29668bec1df4f4af66e6722367ceca1171406c37'],
          },
          broker_fee: { account: 'cFMTNSQQVfBo2HqtekvhLPfZY764kuJDVFG1EvnnDGYxc3LRW', bps: 0 },
          affiliate_fees: [],
          refund_params: {
            retry_duration: 100,
            refund_address: '0xcb583c817964a2c527608f8b813a4c9bddb559a9',
            min_price: '0x21761648d2de3b0ed1ca19f03005d76248',
          },
          dca_params: null,
          max_boost_fee: 0,
        }),
      );

      const client = new RedisClient(url);
      const swap = await client.getPendingVaultSwap(
        'Arbitrum',
        '0x08aca142611325c4eb96f52dc9b9843d4773d3a80c066cfa8de2102f34763654',
      );

      expect(swap).toMatchInlineSnapshot(`
        {
          "affiliateFees": [],
          "amount": 100000000000000000n,
          "brokerFee": {
            "account": "cFMTNSQQVfBo2HqtekvhLPfZY764kuJDVFG1EvnnDGYxc3LRW",
            "commissionBps": 0,
          },
          "ccmDepositMetadata": null,
          "dcaParams": null,
          "depositChainBlockHeight": 7755386,
          "destinationAddress": "0xcb583c817964a2c527608f8b813a4c9bddb559a9",
          "inputAsset": "Eth",
          "maxBoostFee": 0,
          "outputAsset": "Flip",
          "refundParams": {
            "minPrice": 11386282719464659793204379443044661289544n,
            "refundAddress": "0xcb583c817964a2c527608f8b813a4c9bddb559a9",
            "retryDuration": 100,
          },
        }
      `);

      expect(mock).toHaveBeenCalledWith(
        'vault_deposit:Arbitrum:0x08aca142611325c4eb96f52dc9b9843d4773d3a80c066cfa8de2102f34763654',
      );
    });

    it('returns vault swap with dca params and ccm params', async () => {
      vi.mocked(Redis.prototype.get).mockResolvedValue(
        JSON.stringify({
          affiliate_fees: [
            { account: 'cFHtoB6DrnqUVY4DwMHCVCtgCLsiHvv98oGw8k66tazF2ToFv', bps: 10 },
          ],
          amount: '0x64',
          broker_fee: { account: 'cFHsUq1uK5opJudRDczhdPVj6LGoVTqYsfj71tbHfKsTAzkJJ', bps: 10 },
          ccm_deposit_metadata: {
            channel_metadata: {
              ccm_additional_data: '4d4f5245',
              gas_budget: '0x3039',
              message: '48454c4c4f',
            },
            source_address: { Eth: '0xcfcfcfcfcfcfcfcfcfcfcfcfcfcfcfcfcfcfcfcf' },
            source_chain: 'Ethereum',
          },
          dca_params: { chunk_interval: 100, number_of_chunks: 5 },
          deposit_chain_block_height: 1,
          deposit_details: null,
          destination_address: '0xcfcfcfcfcfcfcfcfcfcfcfcfcfcfcfcfcfcfcfcf',
          input_asset: { asset: 'ETH', chain: 'Ethereum' },
          max_boost_fee: 5,
          output_asset: { asset: 'FLIP', chain: 'Ethereum' },
          refund_params: {
            min_price: '0x0',
            refund_address: '0x541f563237a309b3a61e33bdf07a8930bdba8d99',
            retry_duration: 0,
          },
        }),
      );

      const client = new RedisClient(url);
      const swap = await client.getPendingVaultSwap(
        'Ethereum',
        '0x08aca142611325c4eb96f52dc9b9843d4773d3a80c066cfa8de2102f34763654',
      );

      expect(swap).toMatchInlineSnapshot(`
        {
          "affiliateFees": [
            {
              "account": "cFHtoB6DrnqUVY4DwMHCVCtgCLsiHvv98oGw8k66tazF2ToFv",
              "commissionBps": 10,
            },
          ],
          "amount": 100n,
          "brokerFee": {
            "account": "cFHsUq1uK5opJudRDczhdPVj6LGoVTqYsfj71tbHfKsTAzkJJ",
            "commissionBps": 10,
          },
          "ccmDepositMetadata": {
            "channelMetadata": {
              "ccmAdditionalData": "4d4f5245",
              "gasBudget": "0x3039",
              "message": "48454c4c4f",
            },
          },
          "dcaParams": {
            "chunkInterval": 100,
            "numberOfChunks": 5,
          },
          "depositChainBlockHeight": 1,
          "destinationAddress": "0xcfcfcfcfcfcfcfcfcfcfcfcfcfcfcfcfcfcfcfcf",
          "inputAsset": "Eth",
          "maxBoostFee": 5,
          "outputAsset": "Flip",
          "refundParams": {
            "minPrice": 0n,
            "refundAddress": "0x541f563237a309b3a61e33bdf07a8930bdba8d99",
            "retryDuration": 0,
          },
        }
      `);
    });
  });

  describe(RedisClient.prototype.quit, () => {
    it('closes the Redis connection', async () => {
      const client = new RedisClient(url);
      await client.quit();
      expect(Redis.prototype.quit).toHaveBeenCalled();
    });
  });
});
