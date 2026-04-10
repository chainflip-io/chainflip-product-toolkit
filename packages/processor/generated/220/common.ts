import { z } from 'zod';
import * as ss58 from '@chainflip/utils/ss58';

export const hexString = z
  .string()
  .refine((v): v is `0x${string}` => /^0x[\da-f]*$/i.test(v), { message: 'Invalid hex string' });

export const accountId = z
  .union([
    hexString,
    z
      .string()
      .regex(/^[0-9a-f]+$/)
      .transform<`0x${string}`>((v) => `0x${v}`),
  ])
  .transform((value) => ss58.encode({ data: value, ss58Format: 2112 }) as `cF${string}`);

export const simpleEnum = <U extends string, T extends readonly [U, ...U[]]>(values: T) =>
  z.object({ __kind: z.enum(values) }).transform(({ __kind }) => __kind!);

export const cfPrimitivesChainsAssetsAnyAsset = simpleEnum([
  'Eth',
  'Flip',
  'Usdc',
  'Dot',
  'Btc',
  'ArbEth',
  'ArbUsdc',
  'Usdt',
  'Sol',
  'SolUsdc',
  'HubDot',
  'HubUsdt',
  'HubUsdc',
  'Wbtc',
  'ArbUsdt',
  'SolUsdt',
]);

export const palletCfTradingStrategyTradingStrategy = z.discriminatedUnion('__kind', [
  z.object({
    __kind: z.literal('TickZeroCentered'),
    spreadTick: z.number(),
    baseAsset: cfPrimitivesChainsAssetsAnyAsset,
  }),
  z.object({
    __kind: z.literal('SimpleBuySell'),
    buyTick: z.number(),
    sellTick: z.number(),
    baseAsset: cfPrimitivesChainsAssetsAnyAsset,
  }),
  z.object({
    __kind: z.literal('InventoryBased'),
    minBuyTick: z.number(),
    maxBuyTick: z.number(),
    minSellTick: z.number(),
    maxSellTick: z.number(),
    baseAsset: cfPrimitivesChainsAssetsAnyAsset,
  }),
  z.object({
    __kind: z.literal('OracleTracking'),
    minBuyOffsetTick: z.number(),
    maxBuyOffsetTick: z.number(),
    minSellOffsetTick: z.number(),
    maxSellOffsetTick: z.number(),
    baseAsset: cfPrimitivesChainsAssetsAnyAsset,
    quoteAsset: cfPrimitivesChainsAssetsAnyAsset,
  }),
]);
