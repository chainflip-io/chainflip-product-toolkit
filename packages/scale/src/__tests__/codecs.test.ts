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
            "refundCcmMetadata": null,
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
            "refundCcmMetadata": null,
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
            "refundCcmMetadata": null,
            "retryDurationBlocks": 100,
          },
        },
      }
    `);
  });

  it('decodes params with additional data and a ccm refund', () => {
    const decodeSolanaParams = createVaultParamsDecoder(
      Bytes(32),
      (value) => base58.encode(value),
      decodeSolanaAdditionalData,
    );

    expect(
      decodeSolanaParams(
        hexToBytes(
          '0x01640000002c247dc239834feac0ecdbc5070a7e0b5d0f462d09e9eba871ad1eb9770448231d7f07de47704ee5e79889a8dd3dad5bad4c5f000000000000000000000000000110deadbeef50c300000000000000000000000000002904017417da8b99d7748127a76b03d61fee69c80dfef73ad2d5503737beedc5a9ed480018a749716e1028dc7f97552113a1a30c695a015dfe39423a3c5f7762bec711fed0015487c0a860cba004033ed8042487195a8aacf8f15ad7e50dcc852d23bd1b75650052ea46a74d1b1342ef0854c8ab312cbef9d2ff5dfaf4dfe7d242c34ca7d4be22012fb69843738f66c694af89994d25a628217ba3258b73b015eb06a98e9c78bc6201f2e65655a79faaa8a167adc7b2446ef6c6dbbf5a92fa490aa7088ae47ad496d301f7ef6b96142cfb694e20edddccadc27e5f794090f0d99e76c802530675eb14d0003716fbedb54d2e00d8772e1c86fc6c0abc117e57e49a5e061c3ea24cac5663710001640000009e8d88ae895c9b37b2dead9757a3452f7c2299704d91ddfa444d87723f94fe0c000000',
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
          "ccmAdditionalData": null,
          "dcaParams": null,
          "refundParams": {
            "maxOraclePriceSlippage": 100,
            "minPriceX128": "2125250318299970061068650399067280319814532893",
            "refundAddress": "3yKDHJgzS2GbZB9qruoadRYtq8597HZifnRju7fHpdRC",
            "refundCcmMetadata": {
              "additionalData": {
                "additionalAccounts": [
                  {
                    "isWritable": true,
                    "pubkey": "CG23G5EKxz3fvWxUmt79ZtqtdY3sPUqhQbTYidXUsUKq",
                  },
                  {
                    "isWritable": false,
                    "pubkey": "6gyJoKUvEmwDG6qQn7CHTUaa1HX8mJExd1xNo9zq5ADi",
                  },
                  {
                    "isWritable": true,
                    "pubkey": "6afdKAejVqUMa8aJZytP6HLYBecfqzoP5DBbb1kjkxPs",
                  },
                  {
                    "isWritable": true,
                    "pubkey": "4DFeg4fgB1Mq9iaAJZMvEigE7xcpxKr5gyrtPCRfg7i9",
                  },
                  {
                    "isWritable": true,
                    "pubkey": "HMBNi6UjkxCmisyPPU9zv54C2YhvbbfyZgnTFAtBHSYA",
                  },
                  {
                    "isWritable": false,
                    "pubkey": "HgqSroGPb94ZxuB61tPv9nCB47NocUCK2DTPNjwGG8bR",
                  },
                ],
                "cfReceiver": {
                  "isWritable": false,
                  "pubkey": "8pBPaVfTAcjLeNfC187Fkvi9b1XEFhRNJ95BQXXVksmH",
                },
                "fallbackAddress": "4i3kY7VN9MBCjp2scd5455MBbWSYx2rZ1KKcaY69H4ja",
              },
              "gasBudget": 50000n,
              "message": "0xdeadbeef",
            },
            "retryDurationBlocks": 100,
          },
        },
      }
    `);
  });

  it('decodes params with a ccm refund', () => {
    const decodeSolanaParams = createVaultParamsDecoder(Bytes(32), (value) => base58.encode(value));

    expect(
      decodeSolanaParams(
        hexToBytes(
          '0x01640000002c247dc239834feac0ecdbc5070a7e0b5d0f462d09e9eba871ad1eb9770448231d7f07de47704ee5e79889a8dd3dad5bad4c5f000000000000000000000000000110deadbeef50c300000000000000000000000000002904017417da8b99d7748127a76b03d61fee69c80dfef73ad2d5503737beedc5a9ed480018a749716e1028dc7f97552113a1a30c695a015dfe39423a3c5f7762bec711fed0015487c0a860cba004033ed8042487195a8aacf8f15ad7e50dcc852d23bd1b75650052ea46a74d1b1342ef0854c8ab312cbef9d2ff5dfaf4dfe7d242c34ca7d4be22012fb69843738f66c694af89994d25a628217ba3258b73b015eb06a98e9c78bc6201f2e65655a79faaa8a167adc7b2446ef6c6dbbf5a92fa490aa7088ae47ad496d301f7ef6b96142cfb694e20edddccadc27e5f794090f0d99e76c802530675eb14d0003716fbedb54d2e00d8772e1c86fc6c0abc117e57e49a5e061c3ea24cac5663710001640000009e8d88ae895c9b37b2dead9757a3452f7c2299704d91ddfa444d87723f94fe0c000000',
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
          "ccmAdditionalData": null,
          "dcaParams": null,
          "refundParams": {
            "maxOraclePriceSlippage": 100,
            "minPriceX128": "2125250318299970061068650399067280319814532893",
            "refundAddress": "3yKDHJgzS2GbZB9qruoadRYtq8597HZifnRju7fHpdRC",
            "refundCcmMetadata": {
              "additionalData": "0x017417da8b99d7748127a76b03d61fee69c80dfef73ad2d5503737beedc5a9ed480018a749716e1028dc7f97552113a1a30c695a015dfe39423a3c5f7762bec711fed0015487c0a860cba004033ed8042487195a8aacf8f15ad7e50dcc852d23bd1b75650052ea46a74d1b1342ef0854c8ab312cbef9d2ff5dfaf4dfe7d242c34ca7d4be22012fb69843738f66c694af89994d25a628217ba3258b73b015eb06a98e9c78bc6201f2e65655a79faaa8a167adc7b2446ef6c6dbbf5a92fa490aa7088ae47ad496d301f7ef6b96142cfb694e20edddccadc27e5f794090f0d99e76c802530675eb14d0003716fbedb54d2e00d8772e1c86fc6c0abc117e57e49a5e061c3ea24cac56637100",
              "gasBudget": 50000n,
              "message": "0xdeadbeef",
            },
            "retryDurationBlocks": 100,
          },
        },
      }
    `);
  });

  it('decodes params with no max oracle slippage', () => {
    const decodeSolanaParams = createVaultParamsDecoder(Bytes(32), (value) => base58.encode(value));

    expect(
      decodeSolanaParams(
        hexToBytes(
          '0x01640000002c247dc239834feac0ecdbc5070a7e0b5d0f462d09e9eba871ad1eb9770448231d7f07de47704ee5e79889a8dd3dad5bad4c5f000000000000000000000000000110deadbeef50c300000000000000000000000000002904017417da8b99d7748127a76b03d61fee69c80dfef73ad2d5503737beedc5a9ed480018a749716e1028dc7f97552113a1a30c695a015dfe39423a3c5f7762bec711fed0015487c0a860cba004033ed8042487195a8aacf8f15ad7e50dcc852d23bd1b75650052ea46a74d1b1342ef0854c8ab312cbef9d2ff5dfaf4dfe7d242c34ca7d4be22012fb69843738f66c694af89994d25a628217ba3258b73b015eb06a98e9c78bc6201f2e65655a79faaa8a167adc7b2446ef6c6dbbf5a92fa490aa7088ae47ad496d301f7ef6b96142cfb694e20edddccadc27e5f794090f0d99e76c802530675eb14d0003716fbedb54d2e00d8772e1c86fc6c0abc117e57e49a5e061c3ea24cac566371000000009e8d88ae895c9b37b2dead9757a3452f7c2299704d91ddfa444d87723f94fe0c000000',
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
          "ccmAdditionalData": null,
          "dcaParams": null,
          "refundParams": {
            "maxOraclePriceSlippage": null,
            "minPriceX128": "2125250318299970061068650399067280319814532893",
            "refundAddress": "3yKDHJgzS2GbZB9qruoadRYtq8597HZifnRju7fHpdRC",
            "refundCcmMetadata": {
              "additionalData": "0x017417da8b99d7748127a76b03d61fee69c80dfef73ad2d5503737beedc5a9ed480018a749716e1028dc7f97552113a1a30c695a015dfe39423a3c5f7762bec711fed0015487c0a860cba004033ed8042487195a8aacf8f15ad7e50dcc852d23bd1b75650052ea46a74d1b1342ef0854c8ab312cbef9d2ff5dfaf4dfe7d242c34ca7d4be22012fb69843738f66c694af89994d25a628217ba3258b73b015eb06a98e9c78bc6201f2e65655a79faaa8a167adc7b2446ef6c6dbbf5a92fa490aa7088ae47ad496d301f7ef6b96142cfb694e20edddccadc27e5f794090f0d99e76c802530675eb14d0003716fbedb54d2e00d8772e1c86fc6c0abc117e57e49a5e061c3ea24cac56637100",
              "gasBudget": 50000n,
              "message": "0xdeadbeef",
            },
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
