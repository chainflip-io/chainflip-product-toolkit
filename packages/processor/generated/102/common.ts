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
  .transform((value) => ss58.encode({ data: value, ss58Format: 2112 }));

export const simpleEnum = <U extends string, T extends readonly [U, ...U[]]>(values: T) =>
  z.object({ __kind: z.enum(values) }).transform(({ __kind }) => __kind!);

export const cfPrimitivesAccountRole = simpleEnum([
  'Unregistered',
  'Validator',
  'LiquidityProvider',
  'Broker',
]);

export const palletCfValidatorAuctionResolverSetSizeParameters = z.object({
  minSize: z.number(),
  maxSize: z.number(),
  maxExpansion: z.number(),
});

export const cfPrimitivesSemVer = z.object({
  major: z.number(),
  minor: z.number(),
  patch: z.number(),
});

export const palletCfValidatorPalletConfigUpdate = z.union([
  z.object({ __kind: z.literal('RegistrationBondPercentage'), percentage: z.number() }),
  z.object({ __kind: z.literal('AuctionBidCutoffPercentage'), percentage: z.number() }),
  z.object({ __kind: z.literal('RedemptionPeriodAsPercentage'), percentage: z.number() }),
  z.object({ __kind: z.literal('BackupRewardNodePercentage'), percentage: z.number() }),
  z.object({ __kind: z.literal('EpochDuration'), blocks: z.number() }),
  z.object({ __kind: z.literal('AuthoritySetMinSize'), minSize: z.number() }),
  z.object({
    __kind: z.literal('AuctionParameters'),
    parameters: palletCfValidatorAuctionResolverSetSizeParameters,
  }),
  z.object({ __kind: z.literal('MinimumReportedCfeVersion'), version: cfPrimitivesSemVer }),
  z.object({ __kind: z.literal('MaxAuthoritySetContractionPercentage'), percentage: z.number() }),
]);

export const cfPrimitivesChainsAssetsAnyAsset = simpleEnum(['Eth', 'Flip', 'Usdc', 'Dot', 'Btc']);

export const numericString = z
  .string()
  .refine((v) => /^\d+$/.test(v), { message: 'Invalid numeric string' });

export const numberOrHex = z
  .union([z.number(), hexString, numericString])
  .transform((n) => BigInt(n));
