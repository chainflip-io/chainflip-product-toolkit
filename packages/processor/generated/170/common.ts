import { z } from 'zod';
import * as ss58 from '@chainflip/utils/ss58';
import * as base58 from '@chainflip/utils/base58';
import { hexToBytes } from '@chainflip/utils/bytes';

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

export const cfPrimitivesChainsForeignChain = simpleEnum([
  'Ethereum',
  'Polkadot',
  'Bitcoin',
  'Arbitrum',
  'Solana',
]);

export const stateChainRuntimeChainflipOffencesOffence = z.union([
  z.object({ __kind: z.literal('ParticipateSigningFailed') }),
  z.object({ __kind: z.literal('ParticipateKeygenFailed') }),
  z.object({ __kind: z.literal('FailedToBroadcastTransaction') }),
  z.object({ __kind: z.literal('MissedAuthorshipSlot') }),
  z.object({ __kind: z.literal('MissedHeartbeat') }),
  z.object({ __kind: z.literal('GrandpaEquivocation') }),
  z.object({ __kind: z.literal('ParticipateKeyHandoverFailed') }),
  z.object({ __kind: z.literal('FailedToWitnessInTime') }),
  z.object({ __kind: z.literal('FailedLivenessCheck'), value: cfPrimitivesChainsForeignChain }),
]);

export const palletCfReputationPenalty = z.object({
  reputation: z.number(),
  suspension: z.number(),
});

export const numericString = z
  .string()
  .refine((v) => /^\d+$/.test(v), { message: 'Invalid numeric string' });

export const numberOrHex = z
  .union([z.number(), hexString, numericString])
  .transform((n) => BigInt(n));

export const palletCfThresholdSignaturePalletConfigUpdate = z.union([
  z.object({ __kind: z.literal('ThresholdSignatureResponseTimeout'), newTimeout: z.number() }),
  z.object({ __kind: z.literal('KeygenResponseTimeout'), newTimeout: z.number() }),
  z.object({ __kind: z.literal('KeygenSlashAmount'), amountToSlash: numberOrHex }),
]);

export const palletCfBroadcastPalletConfigUpdate = z.object({
  __kind: z.literal('BroadcastTimeout'),
  blocks: z.number(),
});

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
]);

export const cfChainsAddressEncodedAddress = z.union([
  z.object({ __kind: z.literal('Eth'), value: hexString }).transform(({ value }) => ({
    chain: 'Ethereum' as const,
    address: value,
  })),
  z.object({ __kind: z.literal('Dot'), value: hexString }).transform(({ value }) => ({
    chain: 'Polkadot' as const,
    address: ss58.encode({ data: value, ss58Format: 0 }),
  })),
  z.object({ __kind: z.literal('Btc'), value: hexString }).transform(({ value }) => ({
    chain: 'Bitcoin' as const,
    address: Buffer.from(value.slice(2), 'hex').toString('utf8'),
  })),
  z.object({ __kind: z.literal('Arb'), value: hexString }).transform(({ value }) => ({
    chain: 'Arbitrum' as const,
    address: value,
  })),
  z.object({ __kind: z.literal('Sol'), value: hexString }).transform(({ value }) => ({
    chain: 'Solana' as const,
    address: base58.encode(hexToBytes(value)),
  })),
]);

export const cfChainsSwapOrigin = z.union([
  z.object({
    __kind: z.literal('DepositChannel'),
    depositAddress: cfChainsAddressEncodedAddress,
    channelId: numberOrHex,
    depositBlockHeight: numberOrHex,
  }),
  z.object({ __kind: z.literal('Vault'), txHash: hexString }),
  z.object({ __kind: z.literal('Internal') }),
]);

export const cfChainsCcmChannelMetadata = z.object({
  message: hexString,
  gasBudget: numberOrHex,
  cfParameters: hexString,
});

export const cfChainsCcmDepositMetadataGenericEncodedAddress = z.object({
  channelMetadata: cfChainsCcmChannelMetadata,
  sourceChain: cfPrimitivesChainsForeignChain,
  sourceAddress: cfChainsAddressEncodedAddress.nullish(),
});

export const cfChainsCcmSwapAmounts = z.object({
  principalSwapAmount: numberOrHex,
  gasBudget: numberOrHex,
  otherGasAsset: cfPrimitivesChainsAssetsAnyAsset.nullish(),
});

export const cfChainsCcmSwapMetadataGeneric = z.object({
  depositMetadata: cfChainsCcmDepositMetadataGenericEncodedAddress,
  swapAmounts: cfChainsCcmSwapAmounts,
});

export const cfTraitsSwappingSwapRequestTypeGeneric = z.union([
  z.object({ __kind: z.literal('NetworkFee') }),
  z.object({ __kind: z.literal('IngressEgressFee') }),
  z.object({ __kind: z.literal('Regular'), outputAddress: cfChainsAddressEncodedAddress }),
  z.object({
    __kind: z.literal('Ccm'),
    outputAddress: cfChainsAddressEncodedAddress,
    ccmSwapMetadata: cfChainsCcmSwapMetadataGeneric,
  }),
]);

export const cfChainsChannelRefundParametersGenericEncodedAddress = z.object({
  retryDuration: z.number(),
  refundAddress: cfChainsAddressEncodedAddress,
  minPrice: numberOrHex,
});

export const cfPrimitivesDcaParameters = z.object({
  numberOfChunks: z.number(),
  chunkInterval: z.number(),
});

export const solPrimPdaPdaError = simpleEnum([
  'NotAValidPoint',
  'TooManySeeds',
  'SeedTooLarge',
  'BumpSeedBadLuck',
]);

export const cfChainsCcmCheckerCcmValidityError = simpleEnum([
  'CannotDecodeCfParameters',
  'CcmIsTooLong',
  'CfParametersContainsInvalidAccounts',
]);

export const cfChainsSolApiSolanaTransactionBuildingError = z.union([
  z.object({ __kind: z.literal('CannotLookupApiEnvironment') }),
  z.object({ __kind: z.literal('CannotLookupCurrentAggKey') }),
  z.object({ __kind: z.literal('CannotLookupComputePrice') }),
  z.object({ __kind: z.literal('NoNonceAccountsSet') }),
  z.object({ __kind: z.literal('NoAvailableNonceAccount') }),
  z.object({ __kind: z.literal('FailedToDeriveAddress'), value: solPrimPdaPdaError }),
  z.object({ __kind: z.literal('InvalidCcm'), value: cfChainsCcmCheckerCcmValidityError }),
  z.object({ __kind: z.literal('FailedToSerializeFinalTransaction') }),
  z.object({ __kind: z.literal('FinalTransactionExceededMaxLength'), value: z.number() }),
]);

export const spRuntimeModuleError = z.object({ index: z.number(), error: hexString });

export const spRuntimeTokenError = simpleEnum([
  'FundsUnavailable',
  'OnlyProvider',
  'BelowMinimum',
  'CannotCreate',
  'UnknownAsset',
  'Frozen',
  'Unsupported',
  'CannotCreateHold',
  'NotExpendable',
  'Blocked',
]);

export const spArithmeticArithmeticError = simpleEnum(['Underflow', 'Overflow', 'DivisionByZero']);

export const spRuntimeTransactionalError = simpleEnum(['LimitReached', 'NoLayer']);

export const spRuntimeDispatchError = z.union([
  z.object({ __kind: z.literal('Other') }),
  z.object({ __kind: z.literal('CannotLookup') }),
  z.object({ __kind: z.literal('BadOrigin') }),
  z.object({ __kind: z.literal('Module'), value: spRuntimeModuleError }),
  z.object({ __kind: z.literal('ConsumerRemaining') }),
  z.object({ __kind: z.literal('NoProviders') }),
  z.object({ __kind: z.literal('TooManyConsumers') }),
  z.object({ __kind: z.literal('Token'), value: spRuntimeTokenError }),
  z.object({ __kind: z.literal('Arithmetic'), value: spArithmeticArithmeticError }),
  z.object({ __kind: z.literal('Transactional'), value: spRuntimeTransactionalError }),
  z.object({ __kind: z.literal('Exhausted') }),
  z.object({ __kind: z.literal('Corruption') }),
  z.object({ __kind: z.literal('Unavailable') }),
  z.object({ __kind: z.literal('RootNotAllowed') }),
]);

export const cfChainsAllBatchError = z.union([
  z.object({ __kind: z.literal('NotRequired') }),
  z.object({ __kind: z.literal('UnsupportedToken') }),
  z.object({ __kind: z.literal('VaultAccountNotSet') }),
  z.object({ __kind: z.literal('AggKeyNotSet') }),
  z.object({ __kind: z.literal('UtxoSelectionFailed') }),
  z.object({
    __kind: z.literal('FailedToBuildSolanaTransaction'),
    value: cfChainsSolApiSolanaTransactionBuildingError,
  }),
  z.object({ __kind: z.literal('DispatchError'), value: spRuntimeDispatchError }),
]);

export const cfChainsCcmFailReason = simpleEnum([
  'UnsupportedForTargetChain',
  'InsufficientDepositAmount',
  'InvalidMetadata',
  'InvalidDestinationAddress',
]);

export const cfChainsSolSolanaTransactionData = z.object({ serializedTransaction: hexString });
