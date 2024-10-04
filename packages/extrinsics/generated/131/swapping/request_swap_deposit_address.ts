import { z } from 'zod';
import { chainflipAsset, hexString, toEncodedAddress, u128, u16 } from '../common';

export const swappingRequestSwapDepositAddress = (
  chainflipNetwork: 'mainnet' | 'perseverance' | 'sisyphos' | 'backspin',
) =>
  z
    .object({
      sourceAsset: chainflipAsset,
      destinationAsset: chainflipAsset,
      destinationAddress: z.string(),
      brokerCommissionBps: u16,
      channelMetadata: z
        .object({ message: hexString, gasBudget: u128, cfParameters: hexString })
        .nullable(),
      boostFee: u16,
    })
    .transform((args) => {
      return [
        args.sourceAsset,
        args.destinationAsset,
        toEncodedAddress(args.destinationAddress, args.destinationAsset),
        args.brokerCommissionBps,
        args.channelMetadata,
        args.boostFee,
      ] as const;
    });
