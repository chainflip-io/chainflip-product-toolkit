import { describe, expect, it } from 'vitest';
import { spyOn } from '@/testing';
import { makeRequest } from '../rpc';

describe(makeRequest, () => {
  it.each(['some error', ''])('throws on HTTP error', async (message) => {
    spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      status: 401,
      statusText: 'Unauthorized',
      text: () => Promise.resolve(message),
    } as Response);

    await expect(
      makeRequest('https://bitcoin.rpc', 'getrawtransaction', ['txid']),
    ).rejects.toThrowError(new Error(`HTTP error [401]: ${message || 'Unauthorized'}`));
  });

  it('handles non-200 but valid RPC responses', async () => {
    spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      status: 500,
      statusText: 'Internal Server Error',
      text: () =>
        Promise.resolve(
          JSON.stringify({
            result: null,
            error: {
              code: -5,
              message:
                'No such mempool transaction. Use -txindex or provide a block hash to enable blockchain transaction queries. Use gettransaction for wallet transactions.',
            },
            id: 1,
          }),
        ),
    } as Response);

    await expect(
      makeRequest('https://bitcoin.rpc', 'getrawtransaction', ['txid']),
    ).resolves.toBeNull();
  });

  it('handles JSON-RPC 2.0 error responses without a result field', async () => {
    spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      status: 404,
      statusText: 'Not Found',
      text: () =>
        Promise.resolve(
          JSON.stringify({
            jsonrpc: '2.0',
            error: { code: -5, message: 'No such mempool or blockchain transaction.' },
            id: 1,
          }),
        ),
    } as Response);

    await expect(
      makeRequest('https://bitcoin.rpc', 'getrawtransaction', ['txid']),
    ).resolves.toBeNull();
  });

  it('throws JSON-RPC 2.0 errors without a result field', async () => {
    spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      status: 500,
      statusText: 'Internal Server Error',
      text: () =>
        Promise.resolve(
          JSON.stringify({ jsonrpc: '2.0', error: { code: -1, message: 'oops' }, id: 1 }),
        ),
    } as Response);

    await expect(
      makeRequest('https://bitcoin.rpc', 'getblock', ['blockhash']),
    ).rejects.toThrowError(new Error('RPC error [-1]: oops'));
  });

  it('handles JSON-RPC 2.0 success responses without an error field', async () => {
    spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      status: 200,
      statusText: 'OK',
      text: () => Promise.resolve(JSON.stringify({ jsonrpc: '2.0', result: { height: 1 }, id: 1 })),
    } as Response);

    await expect(makeRequest('https://bitcoin.rpc', 'getblock', ['blockhash'])).resolves.toEqual({
      height: 1,
    });
  });

  it('throws on invalid JSON with a 200 response code', async () => {
    spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      status: 200,
      statusText: 'OK',
      text: () => Promise.resolve('hello world'),
    } as Response);

    await expect(
      makeRequest('https://bitcoin.rpc', 'getrawtransaction', ['txid']),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`[Error: Invalid JSON response: hello world]`);
  });
});
