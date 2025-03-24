import { z } from 'zod';
import * as ss58 from '@chainflip/utils/ss58';
import * as base58 from '@chainflip/utils/base58';
import { hexToBytes } from '@chainflip/utils/bytes';

export const numericString = z
  .string()
  .refine((v) => /^\d+$/.test(v), { message: 'Invalid numeric string' });

export const hexString = z
  .string()
  .refine((v): v is `0x${string}` => /^0x[\da-f]*$/i.test(v), { message: 'Invalid hex string' });

export const numberOrHex = z
  .union([z.number(), hexString, numericString])
  .transform((n) => BigInt(n));

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
]);

export const cfChainsAddressEncodedAddress = z
  .object({ __kind: z.enum(['Eth', 'Dot', 'Btc', 'Arb', 'Sol']), value: hexString })
  .transform(({ __kind, value }) => {
    switch (__kind) {
      case 'Eth':
        return { chain: 'Ethereum', address: value } as const;
      case 'Dot':
        return { chain: 'Polkadot', address: ss58.encode({ data: value, ss58Format: 0 }) } as const;
      case 'Btc':
        return {
          chain: 'Bitcoin',
          address: Buffer.from(value.slice(2), 'hex').toString('utf8'),
        } as const;
      case 'Arb':
        return { chain: 'Arbitrum', address: value } as const;
      case 'Sol':
        return { chain: 'Solana', address: base58.encode(hexToBytes(value)) } as const;
      default:
        throw new Error('Unknown chain');
    }
  });

export const accountId = z
  .union([
    hexString,
    z
      .string()
      .regex(/^[0-9a-f]+$/)
      .transform<`0x${string}`>((v) => `0x${v}`),
  ])
  .transform((value) => ss58.encode({ data: value, ss58Format: 2112 }));

export const cfPrimitivesTxId = z.object({ blockNumber: z.number(), extrinsicIndex: z.number() });

export const cfChainsTransactionInIdForAnyChain = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('Evm'), value: hexString }),
  z.object({ __kind: z.literal('Bitcoin'), value: hexString }),
  z.object({ __kind: z.literal('Polkadot'), value: cfPrimitivesTxId }),
  z.object({ __kind: z.literal('Solana'), value: z.tuple([hexString, numberOrHex]) }),
  z.object({ __kind: z.literal('None') }),
]);

export const cfChainsSwapOrigin = z.discriminatedUnion('__kind', [
  z.object({
    __kind: z.literal('DepositChannel'),
    depositAddress: cfChainsAddressEncodedAddress,
    channelId: numberOrHex,
    depositBlockHeight: numberOrHex,
    brokerId: accountId,
  }),
  z.object({
    __kind: z.literal('Vault'),
    txId: cfChainsTransactionInIdForAnyChain,
    brokerId: accountId.nullish(),
  }),
  z.object({ __kind: z.literal('Internal') }),
  z.object({ __kind: z.literal('OnChainAccount'), value: accountId }),
]);

export const cfChainsCcmChannelMetadata = z.object({
  message: hexString,
  gasBudget: numberOrHex,
  ccmAdditionalData: hexString,
});

export const cfPrimitivesChainsForeignChain = simpleEnum([
  'Ethereum',
  'Polkadot',
  'Bitcoin',
  'Arbitrum',
  'Solana',
]);

export const cfChainsCcmDepositMetadataGenericEncodedAddress = z.object({
  channelMetadata: cfChainsCcmChannelMetadata,
  sourceChain: cfPrimitivesChainsForeignChain,
  sourceAddress: cfChainsAddressEncodedAddress.nullish(),
});

export const cfTraitsSwappingSwapOutputActionGenericEncodedAddress = z.discriminatedUnion(
  '__kind',
  [
    z.object({
      __kind: z.literal('Egress'),
      ccmDepositMetadata: cfChainsCcmDepositMetadataGenericEncodedAddress.nullish(),
      outputAddress: cfChainsAddressEncodedAddress,
    }),
    z.object({ __kind: z.literal('CreditOnChain'), accountId }),
  ],
);

export const cfTraitsSwappingSwapRequestTypeGeneric = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('NetworkFee') }),
  z.object({ __kind: z.literal('IngressEgressFee') }),
  z.object({
    __kind: z.literal('Regular'),
    outputAction: cfTraitsSwappingSwapOutputActionGenericEncodedAddress,
  }),
]);

export const cfPrimitivesBeneficiaryAccountId32 = z.object({ account: accountId, bps: z.number() });

export const cfChainsAccountOrAddressEncodedAddress = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('InternalAccount'), value: accountId }),
  z.object({ __kind: z.literal('ExternalAddress'), value: cfChainsAddressEncodedAddress }),
]);

export const cfChainsRefundParametersExtendedGenericEncodedAddress = z.object({
  retryDuration: z.number(),
  refundDestination: cfChainsAccountOrAddressEncodedAddress,
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
  'CannotDecodeCcmAdditionalData',
  'CcmIsTooLong',
  'CcmAdditionalDataContainsInvalidAccounts',
  'RedundantDataSupplied',
  'InvalidDestinationAddress',
  'TooManyAddressLookupTables',
]);

export const cfChainsSolApiSolanaTransactionBuildingError = z.discriminatedUnion('__kind', [
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

export const spRuntimeDispatchError = z.discriminatedUnion('__kind', [
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

export const cfChainsExecutexSwapAndCallError = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('Unsupported') }),
  z.object({
    __kind: z.literal('FailedToBuildCcmForSolana'),
    value: cfChainsSolApiSolanaTransactionBuildingError,
  }),
  z.object({ __kind: z.literal('DispatchError'), value: spRuntimeDispatchError }),
]);

export const cfChainsAllBatchError = z.discriminatedUnion('__kind', [
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

export const cfAmmCommonPoolPairsMap = z.object({ base: numberOrHex, quote: numberOrHex });

export const palletCfPoolsRangeOrderChange = z.object({
  liquidity: numberOrHex,
  amounts: cfAmmCommonPoolPairsMap,
});

export const cfTraitsLiquidityIncreaseOrDecreaseRangeOrderChange = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('Increase'), value: palletCfPoolsRangeOrderChange }),
  z.object({ __kind: z.literal('Decrease'), value: palletCfPoolsRangeOrderChange }),
]);

export const cfAmmCommonSide = simpleEnum(['Buy', 'Sell']);

export const cfTraitsLiquidityIncreaseOrDecreaseU128 = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('Increase'), value: numberOrHex }),
  z.object({ __kind: z.literal('Decrease'), value: numberOrHex }),
]);

export const solPrimMessageHeader = z.object({
  numRequiredSignatures: z.number(),
  numReadonlySignedAccounts: z.number(),
  numReadonlyUnsignedAccounts: z.number(),
});

export const solPrimCompiledInstruction = z.object({
  programIdIndex: z.number(),
  accounts: hexString,
  data: hexString,
});

export const solPrimTransactionLegacyDeprecatedLegacyMessage = z.object({
  header: solPrimMessageHeader,
  accountKeys: z.array(hexString),
  recentBlockhash: hexString,
  instructions: z.array(solPrimCompiledInstruction),
});

export const solPrimAltMessageAddressTableLookup = z.object({
  accountKey: hexString,
  writableIndexes: hexString,
  readonlyIndexes: hexString,
});

export const solPrimTransactionV0VersionedMessageV0 = z.object({
  header: solPrimMessageHeader,
  accountKeys: z.array(hexString),
  recentBlockhash: hexString,
  instructions: z.array(solPrimCompiledInstruction),
  addressTableLookups: z.array(solPrimAltMessageAddressTableLookup),
});

export const solPrimTransactionVersionedMessage = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('Legacy'), value: solPrimTransactionLegacyDeprecatedLegacyMessage }),
  z.object({ __kind: z.literal('V0'), value: solPrimTransactionV0VersionedMessageV0 }),
]);

export const palletCfTradingStrategyTradingStrategy = z.object({
  __kind: z.literal('SellAndBuyAtTicks'),
  sellTick: z.number(),
  buyTick: z.number(),
  baseAsset: cfPrimitivesChainsAssetsAnyAsset,
});
