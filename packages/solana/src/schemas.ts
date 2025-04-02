import { assert } from '@chainflip/utils/assertion';
import * as base58 from '@chainflip/utils/base58';
import { bytesToHex } from '@chainflip/utils/bytes';
import { assetContractId, chainContractId } from '@chainflip/utils/chainflip';
import { POLKADOT_SS58_PREFIX } from '@chainflip/utils/consts';
import { hexEncodeNumber } from '@chainflip/utils/number';
import * as ss58 from '@chainflip/utils/ss58';
import BN from 'bn.js';
import { z } from 'zod';
import { tryDecodeCfParams } from './scale';

const entries = Object.entries as <T>(o: T) => [keyof T, T[keyof T]][];

const bnSchema = z
  .any()
  .refine((arg) => BN.isBN(arg))
  .transform((bn) => BigInt(bn.toString()));

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
  .transform((params, ctx) => {
    const asset = entries(assetContractId).find(([, id]) => id === params.dst_token)?.[0];

    let success = true;

    if (!asset) {
      ctx.addIssue({
        message: 'Failed to get destination asset',
        code: 'custom',
        path: ['dst_token'],
      });
      success = false;
    }

    const chain = entries(chainContractId).find(([, id]) => id === params.dst_chain)?.[0];

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
        destinationAddress = `0x${params.dst_address.toString('hex')}`;
        break;
      case 'Bitcoin':
        destinationAddress = params.dst_address.toString('utf8');
        break;
      case 'Assethub':
      case 'Polkadot':
        destinationAddress = ss58.encode({
          data: params.dst_address,
          ss58Format: POLKADOT_SS58_PREFIX,
        });
        break;
      case 'Solana':
        destinationAddress = base58.encode(params.dst_address);
        break;
      default: {
        // already collecting errors, add type assertion to ensure we handle all chains
        const _: undefined = chain;
        assert(!success, 'expected to be in error state');
      }
    }

    const decodedParams = tryDecodeCfParams(params.cf_parameters);

    if (!decodedParams.ok) {
      decodedParams.reason.forEach((e) =>
        ctx.addIssue({
          message: e.message,
          code: 'custom',
          path: ['cf_parameters'],
        }),
      );
      success = false;
    }

    if (!success) return z.NEVER;

    const data = decodedParams.value!;

    return {
      amount: params.amount,
      destinationAddress: destinationAddress!,
      outputAsset: asset!,
      affiliateFees: data.affiliateFees.map(({ account, commissionBps }) => ({
        accountIndex: account,
        commissionBps,
      })),
      dcaParams: data.dcaParams && {
        chunkInterval: data.dcaParams.chunkIntervalBlocks,
        numberOfChunks: data.dcaParams.numberOfChunks,
      },
      ccmDepositMetadata: params.ccm_parameters && {
        channelMetadata: {
          message: bytesToHex(params.ccm_parameters.message),
          gasBudget: hexEncodeNumber(params.ccm_parameters.gas_amount),
        },
        ccmAdditionalData: data.ccmAdditionalData,
      },
      brokerFee: data.brokerFees,
      maxBoostFee: 0,
      refundParams: {
        refundAddress: data.refundParams.refundAddress,
        minPrice: BigInt(data.refundParams.minPriceX128),
        retryDuration: data.refundParams.retryDurationBlocks,
      },
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
