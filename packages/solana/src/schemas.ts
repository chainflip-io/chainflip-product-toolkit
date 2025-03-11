import { assert } from '@chainflip/utils/assertion';
import * as base58 from '@chainflip/utils/base58';
import { assetContractId, chainContractId } from '@chainflip/utils/chainflip';
import { POLKADOT_SS58_PREFIX } from '@chainflip/utils/consts';
import * as ss58 from '@chainflip/utils/ss58';
import BN from 'bn.js';
import { z } from 'zod';
import { tryDecodeCfParams } from './scale';

const entries = Object.entries as <T>(o: T) => [keyof T, T[keyof T]][];

const bnSchema = z
  .any()
  .refine((arg) => BN.isBN(arg))
  .transform((bn) => bn.toString());

const swapParams = z
  .object({
    amount: bnSchema,
    dst_chain: z.number(),
    dst_address: z.instanceof(Buffer),
    dst_token: z.number(),
    ccm_parameters: z
      .object({
        message: z.instanceof(Buffer),
        gas_amount: bnSchema,
      })
      .nullable(),
    cf_parameters: z.instanceof(Buffer).transform((buf) => new Uint8Array(buf)),
  })
  .transform((data, ctx) => {
    const asset = entries(assetContractId).find(([, id]) => id === data.dst_token)?.[0];

    let success = true;

    if (!asset) {
      ctx.addIssue({
        message: 'Failed to get destination asset',
        code: 'custom',
        path: ['dst_token'],
      });
      success = false;
    }

    const chain = entries(chainContractId).find(([, id]) => id === data.dst_chain)?.[0];

    if (!chain) {
      ctx.addIssue({
        message: 'Failed to get destination chain',
        code: 'custom',
        path: ['dst_chain'],
      });
      success = false;
    }

    let destinationAddress: string;

    switch (chain) {
      case 'Arbitrum':
      case 'Ethereum':
        destinationAddress = `0x${data.dst_address.toString('hex')}`;
        break;
      case 'Bitcoin':
        destinationAddress = data.dst_address.toString('utf8');
        break;
      case 'Polkadot':
        destinationAddress = ss58.encode({
          data: data.dst_address,
          ss58Format: POLKADOT_SS58_PREFIX,
        });
        break;
      case 'Solana':
        destinationAddress = base58.encode(data.dst_address);
        break;
      default: {
        // already collecting errors, add type assertion to ensure we handle all chains
        const _: undefined = chain;
        assert(!success, 'expected to be in error state');
      }
    }

    const parsedParams = tryDecodeCfParams(data.cf_parameters);

    if (!parsedParams.ok) {
      parsedParams.reason.forEach((e) =>
        ctx.addIssue({
          message: e.message,
          code: 'custom',
          path: ['cf_parameters'],
        }),
      );
      success = false;
    }

    if (!success) return z.NEVER;

    return {
      depositAmount: data.amount,
      destinationAddress: destinationAddress!,
      destinationChain: chain,
      destinationAsset: asset,
      ccmParams: data.ccm_parameters && {
        message: data.ccm_parameters.message.toString('hex'),
        gasAmount: data.ccm_parameters.gas_amount,
      },
      cfParams: parsedParams.value!,
    };
  });

const swapNativeSchema = z.object({
  name: z.literal('x_swap_native'),
  data: z.object({ swap_native_params: swapParams }).transform((d) => d.swap_native_params),
});

const swapTokenSchema = z.object({
  name: z.literal('x_swap_token'),
  data: z.object({ swap_token_params: swapParams }).transform((d) => d.swap_token_params),
});

export const swapSchema = z.discriminatedUnion('name', [swapNativeSchema, swapTokenSchema]);
