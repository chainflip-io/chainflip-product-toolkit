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
});
