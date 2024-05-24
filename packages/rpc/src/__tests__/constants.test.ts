import { describe, expect, it } from 'vitest';
import { PUBLIC_RPC_ENDPOINTS } from '../constants';

describe('constants', () => {
  it('has a rpc url per network', () => {
    expect(Object.keys(PUBLIC_RPC_ENDPOINTS)).toMatchInlineSnapshot(`
      [
        "mainnet",
        "perseverance",
        "sisyphos",
        "backspin",
      ]
    `);
  });
});
