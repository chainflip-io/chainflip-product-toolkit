import { describe, expect, it } from 'vitest';
import { cfIngressEgressEvents } from '../../../rpc/src/parsers';
import { depositSchema, vaultDepositSchema } from '../parsers';

describe('depositSchema', () => {
  it('throws if the assets is invalid', () => {
    expect(() =>
      depositSchema.parse(
        JSON.stringify({
          amount: '1000',
          asset: { asset: 'INVALID_ASSET', chain: 'Ethereum' },
          deposit_chain_block_height: 123456,
          deposit_details: null,
        }),
      ),
    ).toThrowErrorMatchingInlineSnapshot(`
      [ZodError: [
        {
          "code": "custom",
          "message": "Invalid asset and chain : INVALID_ASSET on Ethereum",
          "path": [
            "asset"
          ]
        }
      ]]
    `);
  });

  it('parses a bitcoin deposit from an RPC response through ingressEgressDeposit to depositSchema', () => {
    const rpcResponse = {
      deposits: [
        {
          deposit_chain_block_height: 4909710,
          deposit_address: 'tb1p6ngleqcveacg3nagh7l6g4mpxzs5lxarpgsa94qvgj835s870k4q0teat6',
          amount: '0x30b30',
          asset: { chain: 'Bitcoin', asset: 'BTC' },
          deposit_details: {
            tx_id: '66df941560b9045ffcf97e2acd2e301afc1d2afc84eaa9ee7c4b3c564d677c8b',
            vout: 0,
          },
        },
      ],
      broadcasts: [],
      vault_deposits: [],
    };

    const parsed = cfIngressEgressEvents.parse(rpcResponse);
    const deposit = parsed.deposits[0];

    // the RPC parser should add 0x prefix to tx_id
    expect(deposit.deposit_details).toEqual({
      tx_id: '0x66df941560b9045ffcf97e2acd2e301afc1d2afc84eaa9ee7c4b3c564d677c8b',
      vout: 0,
    });

    // build the redis record from the RPC-parsed deposit (as it would be written)
    const redisRecord = JSON.stringify({
      amount: deposit.amount.toString(),
      asset: deposit.asset,
      deposit_chain_block_height: deposit.deposit_chain_block_height,
      deposit_details: deposit.deposit_details,
    });

    // read it back with depositSchema (which uses bitcoinDeposit parser)
    const result = depositSchema.parse(redisRecord);

    expect(result).toEqual({
      amount: 199472n,
      asset: 'Btc',
      deposit_chain_block_height: 4909710,
      deposit_details: {
        tx_id: '8b7c674d563c4b7ceea9ea84fc2a1dfc1a302ecd2a7ef9fc5f04b9601594df66',
        vout: 0,
        type: 'Bitcoin',
      },
    });
  });

  it('parses an evm deposit from an RPC response through ingressEgressDeposit to depositSchema', () => {
    const rpcResponse = {
      deposits: [
        {
          deposit_chain_block_height: 95213,
          deposit_address: '0x2af540adf89a69d1332d6b1f4339caae23a9c33b',
          amount: '0x8ac7230489e80000',
          asset: { chain: 'Ethereum', asset: 'ETH' },
          deposit_details: {
            tx_hashes: ['0xc2f24c23b1b3662510d9dff9d371b2338858b2f2feaf6b94faa819203c786c11'],
          },
        },
      ],
      broadcasts: [],
      vault_deposits: [],
    };

    const parsed = cfIngressEgressEvents.parse(rpcResponse);
    const deposit = parsed.deposits[0];

    expect(deposit.deposit_details).toEqual({
      tx_hashes: ['0xc2f24c23b1b3662510d9dff9d371b2338858b2f2feaf6b94faa819203c786c11'],
    });

    const redisRecord = JSON.stringify({
      amount: deposit.amount.toString(),
      asset: deposit.asset,
      deposit_chain_block_height: deposit.deposit_chain_block_height,
      deposit_details: deposit.deposit_details,
    });

    const result = depositSchema.parse(redisRecord);

    expect(result).toEqual({
      amount: 10000000000000000000n,
      asset: 'Eth',
      deposit_chain_block_height: 95213,
      deposit_details: {
        tx_hashes: ['0xc2f24c23b1b3662510d9dff9d371b2338858b2f2feaf6b94faa819203c786c11'],
        type: 'EVM',
      },
    });
  });
});

describe('vaultDepositSchema', () => {
  it('parses a vault deposit from an RPC response through ingressEgressVaultDeposit to vaultDepositSchema', () => {
    const rpcResponse = {
      deposits: [],
      broadcasts: [],
      vault_deposits: [
        {
          tx_id: '0x1010101010101010101010101010101010101010101010101010101010101010',
          deposit_chain_block_height: 3,
          input_asset: { chain: 'Ethereum', asset: 'ETH' },
          output_asset: { chain: 'Ethereum', asset: 'FLIP' },
          amount: '0x1f4',
          destination_address: '0x4444444444444444444444444444444444444444',
          ccm_deposit_metadata: null,
          deposit_details: {
            tx_hashes: ['0x2222222222222222222222222222222222222222222222222222222222222222'],
          },
          broker_fee: {
            account: '5CT5jwBEAhveEjgiSCQbkaKcKcUyF3VJ8qNXM9rXsuQyn3Kd',
            bps: 2,
          },
          affiliate_fees: [],
          refund_params: {
            retry_duration: 0,
            refund_address: '0x541f563237a309b3a61e33bdf07a8930bdba8d99',
            min_price: '0x0',
            refund_ccm_metadata: null,
            max_oracle_price_slippage: null,
          },
          dca_params: { number_of_chunks: 10, chunk_interval: 2 },
          max_boost_fee: 5,
        },
      ],
    };

    const parsed = cfIngressEgressEvents.parse(rpcResponse);
    const vaultDeposit = parsed.vault_deposits[0];

    // build the redis record from the RPC-parsed vault deposit (as it would be written)
    const redisRecord = JSON.stringify({
      amount: vaultDeposit.amount.toString(),
      destination_address: vaultDeposit.destination_address,
      input_asset: vaultDeposit.input_asset,
      output_asset: vaultDeposit.output_asset,
      deposit_chain_block_height: vaultDeposit.deposit_chain_block_height,
      affiliate_fees: vaultDeposit.affiliate_fees,
      broker_fee: vaultDeposit.broker_fee,
      max_boost_fee: vaultDeposit.max_boost_fee,
      dca_params: vaultDeposit.dca_params,
      refund_params: {
        min_price: vaultDeposit.refund_params!.min_price.toString(),
        retry_duration: vaultDeposit.refund_params!.retry_duration,
        refund_address: vaultDeposit.refund_params!.refund_address,
      },
      ccm_deposit_metadata: vaultDeposit.ccm_deposit_metadata,
    });

    // read it back with vaultDepositSchema
    const result = vaultDepositSchema.parse(redisRecord);

    expect(result).toEqual({
      amount: 500n,
      destinationAddress: '0x4444444444444444444444444444444444444444',
      inputAsset: 'Eth',
      outputAsset: 'Flip',
      depositChainBlockHeight: 3,
      affiliateFees: [],
      brokerFee: { account: 'cFJFriHLc7J1Rau7T1qAEHDsrWWH7QBbJt4D2Q38YkrtfwqoV', commissionBps: 2 },
      maxBoostFee: 5,
      dcaParams: { numberOfChunks: 10, chunkInterval: 2 },
      refundParams: {
        minPrice: 0n,
        retryDuration: 0,
        refundAddress: '0x541f563237a309b3a61e33bdf07a8930bdba8d99',
      },
      ccmDepositMetadata: null,
    });
  });
});
