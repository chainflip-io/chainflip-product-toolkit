import { z } from 'zod';
import { type HexString } from '@chainflip/utils/types';
import * as base58 from '@chainflip/utils/base58';
import * as ss58 from '@chainflip/utils/ss58';
import { bytesToHex, hexToBytes } from '@chainflip/utils/bytes';

export const chainflipAsset = z
  .object({ chain: z.string(), asset: z.string() })
  .pipe(
    z.union([
      z
        .object({ chain: z.literal('Ethereum'), asset: z.literal('ETH') })
        .transform(() => 'Eth' as const),
      z
        .object({ chain: z.literal('Ethereum'), asset: z.literal('FLIP') })
        .transform(() => 'Flip' as const),
      z
        .object({ chain: z.literal('Ethereum'), asset: z.literal('USDC') })
        .transform(() => 'Usdc' as const),
      z
        .object({ chain: z.literal('Polkadot'), asset: z.literal('DOT') })
        .transform(() => 'Dot' as const),
      z
        .object({ chain: z.literal('Bitcoin'), asset: z.literal('BTC') })
        .transform(() => 'Btc' as const),
    ]),
  );

export type ChainflipAsset = z.output<typeof chainflipAsset>;

export const u16 = z.number().int().gte(0).max(65535 /* u16 */);

export const hexString = z
  .string()
  .refine((v): v is `0x${string}` => /^0x[\da-f]*$/i.test(v), { message: 'Invalid hex string' });

export const u128 = z.union([
  hexString.transform((value) => {
    if (BigInt(value) > 340282366920938463463374607431768211455n /* u128 */) {
      throw new Error('Value out of range');
    }

    return value;
  }),
  z
    .number()
    .gte(0)
    .max(Number.MAX_SAFE_INTEGER)
    .transform((n) => `0x${n.toString(16)}` as HexString),
  z
    .bigint()
    .gte(0n)
    .max(340282366920938463463374607431768211455n /* u128 */)
    .transform((n) => `0x${n.toString(16)}` as HexString),
]);

export const toEncodedAddress = (address: string, asset: ChainflipAsset) => {
  const assetToShortChain = {
    Eth: 'eth',
    Flip: 'eth',
    Usdc: 'eth',
    Usdt: 'eth',
    ArbEth: 'arb',
    ArbUsdc: 'arb',
    Dot: 'dot',
    Sol: 'sol',
    SolUsdc: 'sol',
    Btc: 'btc',
  };

  switch (asset) {
    case 'Eth':
    case 'Flip':
    case 'Usdc':
      return { [assetToShortChain[asset]]: hexToBytes(address as HexString) };
    case 'Dot':
      return {
        [assetToShortChain[asset]]: address.startsWith('0x')
          ? hexToBytes(address as HexString)
          : ss58.decode(address).data,
      };

    case 'Btc':
      return { [assetToShortChain[asset]]: bytesToHex(new TextEncoder().encode(address)) };
    default:
      const x: never = asset;
      throw new Error(`Unknown asset: ${x}`);
  }
};
