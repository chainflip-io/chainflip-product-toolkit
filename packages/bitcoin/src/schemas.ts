import { hexToBytes } from '@chainflip/utils/bytes';
import BigNumber from 'bignumber.js';
import { z } from 'zod';

const hexString = z.string().regex(/^([0-9a-f]{2})+$/, { message: 'expected hex string' });

const vout = z.object({
  value: z.number().transform((n) => BigInt(new BigNumber(n).shiftedBy(8).toFixed(0))),
  n: z.number(),
});

const nulldataVout = z
  .object({
    scriptPubKey: z.object({
      type: z.literal('nulldata'),
      // remove OP_RETURN and PUSH_BYTES_XX
      hex: hexString.transform((x) => hexToBytes(`0x${x.slice(4)}`)),
    }),
  })
  .and(vout);

const addressVout = z
  .object({
    scriptPubKey: z.object({
      type: z.enum([
        'witness_v1_taproot',
        'witness_v0_scripthash',
        'witness_v0_keyhash',
        'pubkeyhash',
        'scripthash',
      ]),
      address: z.string(),
    }),
  })
  .and(vout);

export const txSchema = z.object({
  vout: z.tuple([addressVout, nulldataVout, addressVout]),
  blockhash: hexString,
});

export const blockSchema = z.object({
  height: z.number(),
});
