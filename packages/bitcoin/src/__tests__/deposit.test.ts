import * as base58 from '@chainflip/utils/base58';
import { hexToBytes } from '@chainflip/utils/bytes';
import { assetConstants, assetContractId, type ChainflipAsset } from '@chainflip/utils/chainflip';
import * as ss58 from '@chainflip/utils/ss58';
import { describe, expect, it, type MockInstance } from 'vitest';
import { spyOn } from '@/testing';
import { findVaultSwapData } from '../deposit';
import { createSwapDataCodec } from '../scale';
import { tx, block } from './fixtures';

const mockFetch = (results: unknown[], status = 200) =>
  results.reduce(
    (mock: MockInstance<typeof fetch>, result) =>
      mock.mockResolvedValueOnce({
        ok: status === 200,
        status,
        text: () => Promise.resolve(JSON.stringify(result)),
      } as Response),
    spyOn(globalThis, 'fetch'),
  );

const buildNullData = ({
  destinationAsset,
  destinationAddress,
  chunkInterval = 1,
  numberOfChunks = 2,
  retryDuration = 100,
  minOutputAmount = BigInt(10 ** assetConstants[destinationAsset].decimals),
  boostFee = 0,
  brokerFee = 0,
  affiliates = [],
}: {
  destinationAsset: ChainflipAsset;
  destinationAddress: Uint8Array;
  chunkInterval?: number;
  numberOfChunks?: number;
  retryDuration?: number;
  minOutputAmount?: bigint;
  boostFee?: number;
  brokerFee?: number;
  affiliates?: { accountIndex: number; commissionBps: number }[];
}) => {
  const codec = createSwapDataCodec(destinationAsset);

  const bytes = codec.enc({
    version: 0,
    destinationAsset: assetContractId[destinationAsset],
    destinationAddress,
    parameters: {
      retryDuration,
      affiliates,
      boostFee,
      brokerFee,
      chunkInterval,
      numberOfChunks,
      minOutputAmount,
    },
  });

  return [
    0x6a, // OP_RETURN
    bytes.length, // OP_PUSHBYTES_XX
    ...bytes,
  ]
    .map((n) => n.toString(16).padStart(2, '0'))
    .join('');
};

const addresses = {
  Eth: hexToBytes('0xa56a6be23b6cf39d9448ff6e897c29c41c8fbdff'),
  ArbEth: hexToBytes('0xa56a6be23b6cf39d9448ff6e897c29c41c8fbdff'),
  Sol: base58.decode('A8dScaeGChTgzvok95uVAxd44LRkq5ckcpppNVQwkLQb'),
  Dot: ss58.decode('167ZvRqc7V6HrEUSvtV8c3JRUtPjJhHXUpAwhmPktAGj1uzq').data,
  Btc: new TextEncoder().encode('tb1qhjurnfz4qah4rg7ntue6x287ehdvded20rj9vh'),
  HubDot: ss58.decode('167ZvRqc7V6HrEUSvtV8c3JRUtPjJhHXUpAwhmPktAGj1uzq').data,
};

type Mutable<T> = T extends readonly (infer U)[]
  ? Mutable<U>[]
  : T extends Record<string | number | symbol, any>
    ? { -readonly [K in keyof T]: Mutable<T[K]> }
    : T;

describe(findVaultSwapData, () => {
  const address1 = 'tb1qvwmuc3pjhwju287sjs5vg7467t2jlymn35lwsj';
  const address2 = 'tb1pdz3akc5wa2gr69v3x87tfg0ka597dxqvfl6zhqx4y202y63cgw0q3rgpm6';

  it.each([
    ['Eth', 1, 2, 30, 5, 1, 100, address1, undefined],
    ['ArbEth', 1, 2, 15, 10, 0.1, 90, address2, undefined],
    ['Sol', 20, 100, 10, 15, 0.01, 80, undefined, undefined],
    ['Dot', 1, 2, 0, 0, 0.001, 69, undefined, [{ accountIndex: 1, commissionBps: 10 }]],
    ['HubDot', 1, 2, 0, 0, 0.001, 69, undefined, [{ accountIndex: 1, commissionBps: 10 }]],
    ['Btc', 1, 2, 5, 20, 0.0001, 50, undefined, [{ accountIndex: 2, commissionBps: 20 }]],
  ] as const)(
    'gets the vault swap data (%s)',
    async (
      destinationAsset,
      numberOfChunks,
      chunkInterval,
      boostFee,
      brokerFee,
      depositAmount,
      retryDuration,
      refundAddress,
      affiliates,
    ) => {
      const nulldata = buildNullData({
        destinationAsset,
        destinationAddress: addresses[destinationAsset],
        chunkInterval,
        numberOfChunks,
        boostFee,
        brokerFee,
        retryDuration,
        affiliates: affiliates as Mutable<typeof affiliates>,
      });

      mockFetch([tx({ nulldata, depositAmount, refundAddress }), block]);

      mockFetch([{ result: { height: 3902357 }, error: null, id: 1 }]);

      const data = await findVaultSwapData(
        'https://bitcoin.rpc',
        '77a4dcda118d8cd4e537616effeac741ff60dbdb7af0b7f2f54a3a15c0556239',
      );

      expect(data).toMatchSnapshot();
    },
  );

  it('returns null if the tx is not found', async () => {
    mockFetch([
      {
        result: null,
        error: {
          code: -5,
          message:
            'No such mempool or blockchain transaction. Use gettransaction for wallet transactions.',
        },
        id: 1,
      },
    ]);

    const data = await findVaultSwapData(
      'https://bitcoin.rpc',
      '77a4dcda118d8cd4e537616effeac741ff60dbdb7af0b7f2f54a3a15c0556239',
    );

    expect(data).toBeNull();
  });

  it('returns null if the tx is not a vault swap', async () => {
    const txInfo = tx({ nulldata: '00', depositAmount: 1 });
    txInfo.result.vout.splice(1);
    mockFetch([txInfo]);

    const data = await findVaultSwapData(
      'https://bitcoin.rpc',
      '77a4dcda118d8cd4e537616effeac741ff60dbdb7af0b7f2f54a3a15c0556239',
    );

    expect(data).toBeNull();
  });

  it('throws parse errors', async () => {
    mockFetch([tx({ nulldata: '00', depositAmount: 1 }), block]);

    mockFetch([{ result: { height: 3902357 }, error: null, id: 1 }]);

    await expect(
      findVaultSwapData(
        'https://bitcoin.rpc',
        '77a4dcda118d8cd4e537616effeac741ff60dbdb7af0b7f2f54a3a15c0556239',
      ),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`[Error: unsupported version]`);
  });

  it('throws rpc errors', async () => {
    spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      status: 200,
      text: () =>
        Promise.resolve(
          JSON.stringify({
            result: null,
            error: { code: -32601, message: 'Method not found' },
            id: 1,
          }),
        ),
    } as Response);

    await expect(
      findVaultSwapData(
        'https://bitcoin.rpc',
        '77a4dcda118d8cd4e537616effeac741ff60dbdb7af0b7f2f54a3a15c0556239',
      ),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`[Error: RPC error [-32601]: Method not found]`);
  });

  it('returns null for block if the request fails', async () => {
    const nulldata = buildNullData({
      destinationAsset: 'Eth',
      destinationAddress: addresses.Eth,
    });

    mockFetch([
      tx({ nulldata, depositAmount: 1 }),
      { id: 1, jsonrpc: '2.0', result: {}, error: null },
    ]);

    expect(
      await findVaultSwapData(
        'https://bitcoin.rpc',
        '77a4dcda118d8cd4e537616effeac741ff60dbdb7af0b7f2f54a3a15c0556239',
      ),
    ).toMatchSnapshot();
  });

  it.each([null, undefined])('returns null for block if no hash found', async (blockHash) => {
    const nulldata = buildNullData({
      destinationAsset: 'Eth',
      destinationAddress: addresses.Eth,
    });

    const txInfo = tx({ nulldata, depositAmount: 1 });

    // @ts-expect-error -- for testing
    txInfo.result.blockhash = blockHash;

    mockFetch([txInfo, { id: 1, jsonrpc: '2.0', result: {}, error: null }]);

    expect(
      await findVaultSwapData(
        'https://bitcoin.rpc',
        '77a4dcda118d8cd4e537616effeac741ff60dbdb7af0b7f2f54a3a15c0556239',
      ),
    ).toMatchSnapshot();
  });

  it('returns null for block if no hash found', async () => {
    const nulldata = buildNullData({
      destinationAsset: 'Eth',
      destinationAddress: addresses.Eth,
    });

    const txInfo = tx({ nulldata, depositAmount: 1 });

    // @ts-expect-error -- for testing
    delete txInfo.result.blockhash;

    mockFetch([txInfo, { id: 1, jsonrpc: '2.0', result: {}, error: null }]);

    expect(
      await findVaultSwapData(
        'https://bitcoin.rpc',
        '77a4dcda118d8cd4e537616effeac741ff60dbdb7af0b7f2f54a3a15c0556239',
      ),
    ).toMatchSnapshot();
  });

  it("returns null for block if the block isn't found", async () => {
    const nulldata = buildNullData({
      destinationAsset: 'Eth',
      destinationAddress: addresses.Eth,
    });

    mockFetch([tx({ nulldata, depositAmount: 1 })]);
    mockFetch(
      [{ id: 1, jsonrpc: '2.0', result: null, error: { code: -5, message: 'Block not found' } }],
      500,
    );

    spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('Failed to fetch'));

    expect(
      await findVaultSwapData(
        'https://bitcoin.rpc',
        '77a4dcda118d8cd4e537616effeac741ff60dbdb7af0b7f2f54a3a15c0556239',
      ),
    ).toMatchSnapshot();
  });

  it('throws parse errors', async () => {
    mockFetch([{ id: 1, jsonrpc: '2.0', result: {} }]);

    await expect(
      findVaultSwapData(
        'https://bitcoin.rpc',
        '77a4dcda118d8cd4e537616effeac741ff60dbdb7af0b7f2f54a3a15c0556239',
      ),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`
      [ZodError: [
        {
          "code": "invalid_union",
          "unionErrors": [
            {
              "issues": [
                {
                  "code": "invalid_type",
                  "expected": "null",
                  "received": "object",
                  "path": [
                    "result"
                  ],
                  "message": "Expected null, received object"
                },
                {
                  "code": "invalid_type",
                  "expected": "object",
                  "received": "undefined",
                  "path": [
                    "error"
                  ],
                  "message": "Required"
                }
              ],
              "name": "ZodError"
            },
            {
              "issues": [
                {
                  "code": "invalid_type",
                  "expected": "null",
                  "received": "undefined",
                  "path": [
                    "error"
                  ],
                  "message": "Required"
                }
              ],
              "name": "ZodError"
            }
          ],
          "path": [],
          "message": "Invalid input"
        }
      ]]
    `);
  });
});
