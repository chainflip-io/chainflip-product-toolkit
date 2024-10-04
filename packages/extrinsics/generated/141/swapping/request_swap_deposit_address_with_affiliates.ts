import { z } from 'zod';
import { chainflipAsset, hexString, toEncodedAddress, u128, u16 } from '../common';
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
      ] as const;
    });
