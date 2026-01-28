import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import { depositSchema } from '../parsers';

describe('depositSchema', () => {
  it('throws on invalid asset and chain', () => {
    const deposit: z.input<typeof depositSchema> = JSON.stringify({
      amount: '1000',
      asset: { chain: 'Ethereum', asset: 'INVALID_ASSET' },
      deposit_chain_block_height: 123456,
      deposit_details: null,
    });
    expect(() => depositSchema.parse(deposit)).toThrowErrorMatchingInlineSnapshot(`
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
});
