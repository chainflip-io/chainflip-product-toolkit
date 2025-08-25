import * as base58 from '@chainflip/utils/base58';
import { hexToBytes } from '@chainflip/utils/bytes';
import { Bytes } from 'scale-ts';
import { describe, it, expect } from 'vitest';
import { createVaultParamsDecoder, decodeSolanaAdditionalData } from '../codecs';

describe(createVaultParamsDecoder, () => {
  it('decodes params without additional data', () => {
    const decodeSolanaParams = createVaultParamsDecoder(Bytes(32), (value) => base58.encode(value));
    expect(
      decodeSolanaParams(
        hexToBytes(
          '0x00640000002c247dc239834feac0ecdbc5070a7e0b5d0f462d09e9eba871ad1eb9770448234702e76ed292999b076182db5942de83acb52801000000000000000000000000011000000010000000059e8d88ae895c9b37b2dead9757a3452f7c2299704d91ddfa444d87723f94fe0c000000',
        ),
      ),
    ).toMatchInlineSnapshot(`
      {
        "ok": true,
        "value": {
          "affiliateFees": [],
          "boostFee": 5,
          "brokerFees": {
            "account": "cFMTNSQQVfBo2HqtekvhLPfZY764kuJDVFG1EvnnDGYxc3LRW",
            "commissionBps": 0,
          },
          "ccmAdditionalData": null,
          "dcaParams": {
            "chunkIntervalBlocks": 16,
            "numberOfChunks": 16,
          },
          "refundParams": {
            "maxOraclePriceSlippage": null,
            "minPriceX128": "6616846606368726564647178815965546002365481543",
            "refundAddress": "3yKDHJgzS2GbZB9qruoadRYtq8597HZifnRju7fHpdRC",
            "retryDurationBlocks": 100,
          },
        },
      }
    `);
  });

  it('decodes params with additional data', () => {
    const decodeSolanaParams = createVaultParamsDecoder(Bytes(32), (value) => base58.encode(value));
    expect(
      decodeSolanaParams(
        hexToBytes(
          '0x000d01007417da8b99d7748127a76b03d61fee69c80dfef73ad2d5503737beedc5a9ed48000074db60885e7039415f358e9391e67bf7d61e728ae13c225763156419d64d11d8640000002c247dc239834feac0ecdbc5070a7e0b5d0f462d09e9eba871ad1eb9770448234702e76ed292999b076182db5942de83acb5280100000000000000000000000000009e8d88ae895c9b37b2dead9757a3452f7c2299704d91ddfa444d87723f94fe0c000000',
        ),
      ),
    ).toMatchInlineSnapshot(`
      {
        "ok": true,
        "value": {
          "affiliateFees": [],
          "boostFee": 0,
          "brokerFees": {
            "account": "cFMTNSQQVfBo2HqtekvhLPfZY764kuJDVFG1EvnnDGYxc3LRW",
            "commissionBps": 0,
          },
          "ccmAdditionalData": "0x007417da8b99d7748127a76b03d61fee69c80dfef73ad2d5503737beedc5a9ed48000074db60885e7039415f358e9391e67bf7d61e728ae13c225763156419d64d11d8",
          "dcaParams": null,
          "refundParams": {
            "maxOraclePriceSlippage": null,
            "minPriceX128": "6616846606368726564647178815965546002365481543",
            "refundAddress": "3yKDHJgzS2GbZB9qruoadRYtq8597HZifnRju7fHpdRC",
            "retryDurationBlocks": 100,
          },
        },
      }
    `);
  });

  it('forwards both errors', () => {
    const decodeSolanaParams = createVaultParamsDecoder(Bytes(32), (value) => base58.encode(value));
    expect(decodeSolanaParams(new Uint8Array())).toMatchInlineSnapshot(`
      {
        "ok": false,
        "reason": [
          [RangeError: Offset is outside the bounds of the DataView],
          [RangeError: Offset is outside the bounds of the DataView],
        ],
      }
    `);
  });

  it('decodes params with additional data', () => {
    const decodeSolanaParams = createVaultParamsDecoder(
      Bytes(32),
      (value) => base58.encode(value),
      decodeSolanaAdditionalData,
    );
    expect(
      decodeSolanaParams(
        hexToBytes(
          '0x000d01007417da8b99d7748127a76b03d61fee69c80dfef73ad2d5503737beedc5a9ed48000074db60885e7039415f358e9391e67bf7d61e728ae13c225763156419d64d11d8640000002c247dc239834feac0ecdbc5070a7e0b5d0f462d09e9eba871ad1eb9770448234702e76ed292999b076182db5942de83acb5280100000000000000000000000000009e8d88ae895c9b37b2dead9757a3452f7c2299704d91ddfa444d87723f94fe0c000000',
        ),
      ),
    ).toMatchInlineSnapshot(`
      {
        "ok": true,
        "value": {
          "affiliateFees": [],
          "boostFee": 0,
          "brokerFees": {
            "account": "cFMTNSQQVfBo2HqtekvhLPfZY764kuJDVFG1EvnnDGYxc3LRW",
            "commissionBps": 0,
          },
          "ccmAdditionalData": {
            "additionalAccounts": [],
            "cfReceiver": {
              "isWritable": false,
              "pubkey": "8pBPaVfTAcjLeNfC187Fkvi9b1XEFhRNJ95BQXXVksmH",
            },
            "fallbackAddress": "8sAK3gg2Qm1mP4aPvMGsFsNAMhsgty2hSvJQCPQpib6w",
          },
          "dcaParams": null,
          "refundParams": {
            "maxOraclePriceSlippage": null,
            "minPriceX128": "6616846606368726564647178815965546002365481543",
            "refundAddress": "3yKDHJgzS2GbZB9qruoadRYtq8597HZifnRju7fHpdRC",
            "retryDurationBlocks": 100,
          },
        },
      }
    `);
  });
});

describe(decodeSolanaAdditionalData, () => {
  it('returns the data as hex if it cannot be decoded', () => {
    expect(decodeSolanaAdditionalData(new Uint8Array([0xde, 0xad, 0xbe, 0xef]))).toBe('0xdeadbeef');
  });

  it('decodes with additional accounts', () => {
    expect(
      decodeSolanaAdditionalData(
        new Uint8Array(
          Buffer.from(
            '007417da8b99d7748127a76b03d61fee69c80dfef73ad2d5503737beedc5a9ed4800047417da8b99d7748127a76b03d61fee69c80dfef73ad2d5503737beedc5a9ed480074db60885e7039415f358e9391e67bf7d61e728ae13c225763156419d64d11d8',
            'hex',
          ),
        ),
      ),
    ).toMatchInlineSnapshot(
      `
      {
        "additionalAccounts": [
          {
            "isWritable": false,
            "pubkey": "8pBPaVfTAcjLeNfC187Fkvi9b1XEFhRNJ95BQXXVksmH",
          },
        ],
        "cfReceiver": {
          "isWritable": false,
          "pubkey": "8pBPaVfTAcjLeNfC187Fkvi9b1XEFhRNJ95BQXXVksmH",
        },
        "fallbackAddress": "8sAK3gg2Qm1mP4aPvMGsFsNAMhsgty2hSvJQCPQpib6w",
      }
    `,
    );
  });
});
