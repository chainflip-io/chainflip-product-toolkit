import { describe, it, expect } from 'vitest';
import { snakeToCamelCase, transformKeysToCamelCase } from '../utils';

describe(snakeToCamelCase, () => {
  it.each([
    ['amount', 'amount'],
    ['destination_address', 'destinationAddress'],
    ['input_asset', 'inputAsset'],
    ['output_asset', 'outputAsset'],
    ['deposit_chain_block_height', 'depositChainBlockHeight'],
    ['affiliate_fees', 'affiliateFees'],
    ['broker_fee', 'brokerFee'],
    ['max_boost_fee', 'maxBoostFee'],
    ['dca_params', 'dcaParams'],
    ['chunk_interval', 'chunkInterval'],
    ['number_of_chunks', 'numberOfChunks'],
    ['refund_params', 'refundParams'],
    ['min_price', 'minPrice'],
    ['retry_duration', 'retryDuration'],
    ['refund_address', 'refundAddress'],
    ['ccm_deposit_metadata', 'ccmDepositMetadata'],
    ['channel_metadata', 'channelMetadata'],
    ['ccm_additional_data', 'ccmAdditionalData'],
    ['message', 'message'],
    ['gas_budget', 'gasBudget'],
  ])('transforms %s to %s', (input, expected) => {
    expect(snakeToCamelCase(input)).toBe(expected);
  });
});

describe(transformKeysToCamelCase, () => {
  it('transforms object keys to camel case', () => {
    const input = {
      amount: 100,
      destination_address: '0x123',
      input_asset: 'asset1',
      output_asset: 'asset2',
      deposit_chain_block_height: 123456,
      broker_fee: {
        account: '0xdef',
        bps: 2000,
      },
      max_boost_fee: 500,
      array: [
        {
          nested_key: 'value1',
          another_nested_key: [
            {
              deep_nested_key: 'value2',
            },
          ],
        },
      ],
    };

    const expected = {
      amount: 100,
      destinationAddress: '0x123',
      inputAsset: 'asset1',
      outputAsset: 'asset2',
      depositChainBlockHeight: 123456,
      brokerFee: {
        account: '0xdef',
        bps: 2000,
      },
      maxBoostFee: 500,
      array: [
        {
          nestedKey: 'value1',
          anotherNestedKey: [
            {
              deepNestedKey: 'value2',
            },
          ],
        },
      ],
    };

    expect(transformKeysToCamelCase(input)).toEqual(expected);
  });
});
