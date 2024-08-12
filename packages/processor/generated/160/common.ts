import { z } from 'zod';
import * as ss58 from '@chainflip/utils/ss58';
import * as base58 from '@chainflip/utils/base58';
import { hexToBytes } from '@chainflip/utils/bytes';

export const hexString = z
  .string()
  .refine((v): v is `0x${string}` => /^0x[\da-f]*$/i.test(v), { message: 'Invalid hex string' });

export const numericString = z
  .string()
  .refine((v) => /^\d+$/.test(v), { message: 'Invalid numeric string' });

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

export const cfPrimitivesChainsForeignChain = simpleEnum([
  'Ethereum',
  'Polkadot',
  'Bitcoin',
  'Arbitrum',
  'Solana',
]);

export const cfChainsBtcScriptPubkey = z.union([
  z.object({ __kind: z.literal('P2PKH'), value: hexString }),
  z.object({ __kind: z.literal('P2SH'), value: hexString }),
  z.object({ __kind: z.literal('P2WPKH'), value: hexString }),
  z.object({ __kind: z.literal('P2WSH'), value: hexString }),
  z.object({ __kind: z.literal('Taproot'), value: hexString }),
  z.object({ __kind: z.literal('OtherSegwit'), version: z.number(), program: hexString }),
]);

export const cfChainsAddressForeignChainAddress = z.union([
  z.object({ __kind: z.literal('Eth'), value: hexString }),
  z.object({ __kind: z.literal('Dot'), value: hexString }),
  z.object({ __kind: z.literal('Btc'), value: cfChainsBtcScriptPubkey }),
  z.object({ __kind: z.literal('Arb'), value: hexString }),
  z.object({ __kind: z.literal('Sol'), value: hexString }),
]);

export const cfChainsCcmChannelMetadata = z.object({
  message: hexString,
  gasBudget: numberOrHex,
  cfParameters: hexString,
});

export const cfChainsCcmDepositMetadata = z.object({
  sourceChain: cfPrimitivesChainsForeignChain,
  sourceAddress: cfChainsAddressForeignChainAddress.nullish(),
  channelMetadata: cfChainsCcmChannelMetadata,
});

export const cfTraitsSwappingSwapRequestTypeGeneric = z.union([
  z.object({ __kind: z.literal('NetworkFee') }),
  z.object({ __kind: z.literal('IngressEgressFee') }),
  z.object({ __kind: z.literal('Regular'), outputAddress: cfChainsAddressEncodedAddress }),
  z.object({
    __kind: z.literal('Ccm'),
    outputAddress: cfChainsAddressEncodedAddress,
    ccmDepositMetadata: cfChainsCcmDepositMetadata,
  }),
]);

export const accountId = z
  .union([
    hexString,
    z
      .string()
      .regex(/^[0-9a-f]+$/)
      .transform<`0x${string}`>((v) => `0x${v}`),
  ])
  .transform((value) => ss58.encode({ data: value, ss58Format: 2112 }));

export const cfPrimitivesBeneficiary = z.object({ account: accountId, bps: z.number() });

export const cfChainsChannelRefundParameters = z.object({
  retryDuration: z.number(),
  refundAddress: cfChainsAddressForeignChainAddress,
  minPrice: numberOrHex,
});

export const cfTraitsSwappingSwapType = simpleEnum([
  'Swap',
  'CcmPrincipal',
  'CcmGas',
  'NetworkFee',
  'IngressEgressFee',
]);

export const cfPrimitivesSwapLeg = simpleEnum(['FromStable', 'ToStable']);

export const palletCfSwappingCcmFailReason = simpleEnum([
  'UnsupportedForTargetChain',
  'InsufficientDepositAmount',
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

export const cfPrimitivesChainsAssetsEthAsset = simpleEnum(['Eth', 'Flip', 'Usdc', 'Usdt']);

export const cfChainsEvmDepositDetails = z.object({ txHashes: z.array(hexString).nullish() });

export const palletCfIngressEgressDepositAction = z.union([
  z.object({ __kind: z.literal('Swap'), swapRequestId: numberOrHex }),
  z.object({ __kind: z.literal('LiquidityProvision'), lpAccount: accountId }),
  z.object({ __kind: z.literal('CcmTransfer'), swapRequestId: numberOrHex }),
  z.object({ __kind: z.literal('NoAction') }),
  z.object({ __kind: z.literal('BoostersCredited'), prewitnessedDepositId: numberOrHex }),
]);

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

export const cfChainsExecutexSwapAndCallError = z.union([
  z.object({ __kind: z.literal('Unsupported') }),
  z.object({
    __kind: z.literal('FailedToBuildCcmForSolana'),
    value: cfChainsSolApiSolanaTransactionBuildingError,
  }),
  z.object({ __kind: z.literal('DispatchError'), value: spRuntimeDispatchError }),
]);

export const cfPrimitivesChainsAssetsDotAsset = simpleEnum(['Dot']);

export const cfPrimitivesChainsAssetsBtcAsset = simpleEnum(['Btc']);

export const cfChainsBtcUtxoId = z.object({ txId: hexString, vout: z.number() });

export const cfAmmCommonPoolPairsMap = z.object({ base: numberOrHex, quote: numberOrHex });

export const palletCfPoolsRangeOrderChange = z.object({
  liquidity: numberOrHex,
  amounts: cfAmmCommonPoolPairsMap,
});

export const palletCfPoolsIncreaseOrDecreaseRangeOrderChange = z.union([
  z.object({ __kind: z.literal('Increase'), value: palletCfPoolsRangeOrderChange }),
  z.object({ __kind: z.literal('Decrease'), value: palletCfPoolsRangeOrderChange }),
]);

export const cfAmmCommonSide = simpleEnum(['Buy', 'Sell']);

export const palletCfPoolsIncreaseOrDecreaseU128 = z.union([
  z.object({ __kind: z.literal('Increase'), value: numberOrHex }),
  z.object({ __kind: z.literal('Decrease'), value: numberOrHex }),
]);

export const palletCfPoolsAssetPair = z.object({ assets: cfAmmCommonPoolPairsMap });

export const cfPrimitivesChainsAssetsArbAsset = simpleEnum(['ArbEth', 'ArbUsdc']);

export const cfChainsSolSolTrackedData = z.object({ priorityFee: numberOrHex });

export const cfChainsChainStateSolana = z.object({
  blockHeight: numberOrHex,
  trackedData: cfChainsSolSolTrackedData,
});

export const cfChainsSolSolTxCoreMessageHeader = z.object({
  numRequiredSignatures: z.number(),
  numReadonlySignedAccounts: z.number(),
  numReadonlyUnsignedAccounts: z.number(),
});

export const cfChainsSolSolTxCoreCompiledInstruction = z.object({
  programIdIndex: z.number(),
  accounts: hexString,
  data: hexString,
});

export const cfChainsSolSolTxCoreMessage = z.object({
  header: cfChainsSolSolTxCoreMessageHeader,
  accountKeys: z.array(hexString),
  recentBlockhash: hexString,
  instructions: z.array(cfChainsSolSolTxCoreCompiledInstruction),
});

export const cfChainsSolSolTxCoreTransaction = z.object({
  signatures: z.array(hexString),
  message: cfChainsSolSolTxCoreMessage,
});

export const cfPrimitivesChainsAssetsSolAsset = simpleEnum(['Sol', 'SolUsdc']);

export const palletCfIngressEgressDepositIgnoredReason = simpleEnum([
  'BelowMinimumDeposit',
  'NotEnoughToPayFees',
]);

export const palletCfIngressEgressDepositWitnessSolana = z.object({
  depositAddress: hexString,
  asset: cfPrimitivesChainsAssetsSolAsset,
  amount: numberOrHex,
});

export const palletCfIngressEgressBoostPoolIdSolana = z.object({
  asset: cfPrimitivesChainsAssetsSolAsset,
  tier: z.number(),
});
