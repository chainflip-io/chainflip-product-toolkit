import { z } from 'zod';
import {
  chainflipAsset,
  encodeRefundParameters,
  hexString,
  toEncodedAddress,
  u128,
  u16,
  U256,
  u32,
} from '../common';
import * as ss58 from '@chainflip/utils/ss58';
import { bytesToHex } from '@chainflip/utils/bytes';

export const swappingRequestSwapDepositAddressWithAffiliates = (
  chainflipNetwork: 'mainnet' | 'perseverance' | 'sisyphos' | 'backspin',
) =>
  z
    .object({
      sourceAsset: chainflipAsset,
      destinationAsset: chainflipAsset,
      destinationAddress: z.string(),
      brokerCommission: u16,
      channelMetadata: z
        .object({ message: hexString, gasBudget: u128, cfParameters: hexString })
        .nullable(),
      boostFee: u16,
      affiliateFees: z.array(
        z.object({
          account: z.union([
            z.string().transform((s) => {
              try {
                const { data, ss58Format } = ss58.decode(s);
                if (ss58Format !== 2112) throw new Error('Invalid SS58 format');
                return bytesToHex(data);
              } catch {
                throw new Error('Invalid SS58 account ID');
              }
            }),
            hexString.refine((v) => v.length === 66, {
              message: 'Invalid byte length for account',
            }),
          ]),
          bps: u16,
        }),
      ),
      refundParameters: z
        .object({ retryDuration: u32, refundAddress: z.string(), minPrice: U256 })
        .nullable(),
      dcaParameters: z.object({ numberOfChunks: u32, chunkInterval: u32 }).nullable(),
    })
    .transform((args) => {
      return [
        args.sourceAsset,
        args.destinationAsset,
        toEncodedAddress(args.destinationAddress, args.destinationAsset),
        args.brokerCommission,
        args.channelMetadata,
        args.boostFee,
        args.affiliateFees,
        args.refundParameters &&
          encodeRefundParameters(args.refundParameters, args.sourceAsset, chainflipNetwork),
        args.dcaParameters && {
          number_of_chunks: args.dcaParameters.numberOfChunks,
          chunk_interval: args.dcaParameters.chunkInterval,
        },
      ] as const;
    });
