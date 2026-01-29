import { describe, expect, it } from 'vitest';
import { depositSchema } from '../parsers';

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
});
