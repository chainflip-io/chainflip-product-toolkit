import * as base58 from '@chainflip/utils/base58';
import { assetContractId, chainContractId } from '@chainflip/utils/chainflip';
import * as ss58 from '@chainflip/utils/ss58';
import { BN } from '@coral-xyz/anchor';
import { describe, expect, it } from 'vitest';
import { type z } from 'zod';
import { swapSchema } from '../schemas';

describe('swapSchema', () => {
  it.each([
    ['Bitcoin', assetContractId.Btc, 'bc1qqt3juqef9azhd0zeuamu9c30pg5xdllvmks2ja'],
    [
      'Polkadot',
      assetContractId.Dot,
      ss58.decode('1BzDB5n2rfSJwvuCW9deKY9XnUyys8Gy44SoX8tRNDCFBhx').data,
    ],
    [
      'Solana',
      assetContractId.SolUsdc,
      base58.decode('3yKDHJgzS2GbZB9qruoadRYtq8597HZifnRju7fHpdRC'),
    ],
  ] as const)('handles %s destinations', (chain, asset, address) => {
    const result = swapSchema.parse({
      name: 'x_swap_native',
      data: {
        swap_native_params: {
          // @ts-expect-error -- it's fine
          dst_address: Buffer.from(address),
          dst_chain: chainContractId[chain],
          dst_token: asset,
          amount: new BN(100000000),
          ccm_parameters: {
            message: Buffer.from('deadbeef', 'hex'),
            gas_amount: new BN(10),
          },
          cf_parameters: Buffer.from(
            '00640000002c247dc239834feac0ecdbc5070a7e0b5d0f462d09e9eba871ad1eb9770448234702e76ed292999b076182db5942de83acb5280100000000000000000000000000009e8d88ae895c9b37b2dead9757a3452f7c2299704d91ddfa444d87723f94fe0c000000',
            'hex',
          ),
        },
      },
    } as z.input<typeof swapSchema>);
    expect(result.data).toMatchSnapshot();
  });

  it('collects all the errors', () => {
    expect(() =>
      swapSchema.parse({
        name: 'x_swap_native',
        data: {
          swap_native_params: {
            amount: new BN(100000000),
            dst_chain: 0,
            dst_token: 0,
            dst_address: Buffer.from(''),
            cf_parameters: Buffer.from(''),
            ccm_parameters: null,
          },
        },
      } as z.input<typeof swapSchema>),
    ).toThrowErrorMatchingInlineSnapshot(`
      [ZodError: [
        {
          "message": "Failed to get destination asset",
          "code": "custom",
          "path": [
            "data",
            "swap_native_params",
            "dst_token"
          ]
        },
        {
          "message": "Failed to get destination chain",
          "code": "custom",
          "path": [
            "data",
            "swap_native_params",
            "dst_chain"
          ]
        },
        {
          "message": "Offset is outside the bounds of the DataView",
          "code": "custom",
          "path": [
            "data",
            "swap_native_params",
            "cf_parameters"
          ]
        },
        {
          "message": "Offset is outside the bounds of the DataView",
          "code": "custom",
          "path": [
            "data",
            "swap_native_params",
            "cf_parameters"
          ]
        }
      ]]
    `);
  });
});
