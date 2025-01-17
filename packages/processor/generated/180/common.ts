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

export const cfChainsSolApiSolanaGovCall = z.union([
  z.object({
    __kind: z.literal('SetProgramSwapsParameters'),
    minNativeSwapAmount: numberOrHex,
    maxDstAddressLen: z.number(),
    maxCcmMessageLen: z.number(),
    maxCfParametersLen: z.number(),
    maxEventAccounts: z.number(),
  }),
  z.object({
    __kind: z.literal('SetTokenSwapParameters'),
    minSwapAmount: numberOrHex,
    tokenMintPubkey: hexString,
  }),
]);

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

export const cfChainsTransactionInIdForAnyChain = z.union([
  z.object({ __kind: z.literal('Evm'), value: hexString }),
  z.object({ __kind: z.literal('Bitcoin'), value: hexString }),
  z.object({ __kind: z.literal('Polkadot'), value: cfPrimitivesTxId }),
  z.object({ __kind: z.literal('Solana'), value: z.tuple([hexString, numberOrHex]) }),
  z.object({ __kind: z.literal('None') }),
]);

export const cfChainsSwapOrigin = z.union([
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

export const cfTraitsSwappingSwapRequestTypeGeneric = z.union([
  z.object({ __kind: z.literal('NetworkFee') }),
  z.object({ __kind: z.literal('IngressEgressFee') }),
  z.object({
    __kind: z.literal('Regular'),
    outputAddress: cfChainsAddressEncodedAddress,
    ccmDepositMetadata: cfChainsCcmDepositMetadataGenericEncodedAddress.nullish(),
  }),
]);

export const cfPrimitivesBeneficiaryAccountId32 = z.object({ account: accountId, bps: z.number() });

export const cfChainsChannelRefundParametersEncodedAddress = z.object({
  retryDuration: z.number(),
  refundAddress: cfChainsAddressEncodedAddress,
  minPrice: numberOrHex,
});

export const cfPrimitivesDcaParameters = z.object({
  numberOfChunks: z.number(),
  chunkInterval: z.number(),
});

export const cfTraitsSwappingSwapType = simpleEnum(['Swap', 'NetworkFee', 'IngressEgressFee']);

export const cfPrimitivesChainsAssetsEthAsset = simpleEnum(['Eth', 'Flip', 'Usdc', 'Usdt']);

export const cfChainsEvmDepositDetails = z.object({ txHashes: z.array(hexString).nullish() });

export const palletCfEthereumIngressEgressDepositAction = z.union([
  z.object({ __kind: z.literal('Swap'), swapRequestId: numberOrHex }),
  z.object({ __kind: z.literal('LiquidityProvision'), lpAccount: accountId }),
  z.object({ __kind: z.literal('CcmTransfer'), swapRequestId: numberOrHex }),
  z.object({
    __kind: z.literal('BoostersCredited'),
    prewitnessedDepositId: numberOrHex,
    networkFeeFromBoost: numberOrHex,
    networkFeeSwapRequestId: numberOrHex.nullish(),
  }),
]);

export const cfChainsDepositOriginType = simpleEnum(['DepositChannel', 'Vault']);

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

export const cfChainsExecutexSwapAndCallError = z.union([
  z.object({ __kind: z.literal('Unsupported') }),
  z.object({
    __kind: z.literal('FailedToBuildCcmForSolana'),
    value: cfChainsSolApiSolanaTransactionBuildingError,
  }),
  z.object({ __kind: z.literal('DispatchError'), value: spRuntimeDispatchError }),
]);

export const palletCfEthereumIngressEgressDepositFailedReason = z.union([
  z.object({ __kind: z.literal('BelowMinimumDeposit') }),
  z.object({ __kind: z.literal('NotEnoughToPayFees') }),
  z.object({ __kind: z.literal('TransactionRejectedByBroker') }),
  z.object({ __kind: z.literal('DepositWitnessRejected'), value: spRuntimeDispatchError }),
  z.object({ __kind: z.literal('InvalidDestinationAddress') }),
  z.object({ __kind: z.literal('InvalidBrokerFees') }),
  z.object({ __kind: z.literal('InvalidRefundParameters') }),
  z.object({ __kind: z.literal('InvalidDcaParameters') }),
  z.object({ __kind: z.literal('CcmUnsupportedForTargetChain') }),
  z.object({ __kind: z.literal('CcmInvalidMetadata') }),
]);

export const palletCfIngressEgressDepositWitnessEthereum = z.object({
  depositAddress: hexString,
  asset: cfPrimitivesChainsAssetsEthAsset,
  amount: numberOrHex,
  depositDetails: cfChainsEvmDepositDetails,
});

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

export const cfChainsCcmDepositMetadataGenericForeignChainAddress = z.object({
  channelMetadata: cfChainsCcmChannelMetadata,
  sourceChain: cfPrimitivesChainsForeignChain,
  sourceAddress: cfChainsAddressForeignChainAddress.nullish(),
});

export const cfPrimitivesBeneficiaryAffiliateShortId = z.object({
  account: z.number(),
  bps: z.number(),
});

export const cfChainsChannelRefundParametersForeignChainAddress = z.object({
  retryDuration: z.number(),
  refundAddress: cfChainsAddressForeignChainAddress,
  minPrice: numberOrHex,
});

export const palletCfIngressEgressVaultDepositWitness = z.object({
  inputAsset: cfPrimitivesChainsAssetsEthAsset,
  depositAddress: hexString.nullish(),
  channelId: numberOrHex.nullish(),
  depositAmount: numberOrHex,
  depositDetails: cfChainsEvmDepositDetails,
  outputAsset: cfPrimitivesChainsAssetsAnyAsset,
  destinationAddress: cfChainsAddressEncodedAddress,
  depositMetadata: cfChainsCcmDepositMetadataGenericForeignChainAddress.nullish(),
  txId: hexString,
  brokerFee: cfPrimitivesBeneficiaryAccountId32.nullish(),
  affiliateFees: z.array(cfPrimitivesBeneficiaryAffiliateShortId),
  refundParams: cfChainsChannelRefundParametersForeignChainAddress.nullish(),
  dcaParams: cfPrimitivesDcaParameters.nullish(),
  boostFee: z.number(),
});

export const palletCfEthereumIngressEgressDepositFailedDetails = z.union([
  z.object({
    __kind: z.literal('DepositChannel'),
    depositWitness: palletCfIngressEgressDepositWitnessEthereum,
  }),
  z.object({ __kind: z.literal('Vault'), vaultWitness: palletCfIngressEgressVaultDepositWitness }),
]);

export const cfTraitsScheduledEgressDetailsEthereum = z.object({
  egressId: z.tuple([cfPrimitivesChainsForeignChain, numberOrHex]),
  egressAmount: numberOrHex,
  feeWithheld: numberOrHex,
});

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

export const cfPrimitivesChainsAssetsDotAsset = simpleEnum(['Dot']);

export const palletCfPolkadotIngressEgressDepositAction = z.union([
  z.object({ __kind: z.literal('Swap'), swapRequestId: numberOrHex }),
  z.object({ __kind: z.literal('LiquidityProvision'), lpAccount: accountId }),
  z.object({ __kind: z.literal('CcmTransfer'), swapRequestId: numberOrHex }),
  z.object({
    __kind: z.literal('BoostersCredited'),
    prewitnessedDepositId: numberOrHex,
    networkFeeFromBoost: numberOrHex,
    networkFeeSwapRequestId: numberOrHex.nullish(),
  }),
]);

export const palletCfPolkadotIngressEgressDepositFailedReason = z.union([
  z.object({ __kind: z.literal('BelowMinimumDeposit') }),
  z.object({ __kind: z.literal('NotEnoughToPayFees') }),
  z.object({ __kind: z.literal('TransactionRejectedByBroker') }),
  z.object({ __kind: z.literal('DepositWitnessRejected'), value: spRuntimeDispatchError }),
  z.object({ __kind: z.literal('InvalidDestinationAddress') }),
  z.object({ __kind: z.literal('InvalidBrokerFees') }),
  z.object({ __kind: z.literal('InvalidRefundParameters') }),
  z.object({ __kind: z.literal('InvalidDcaParameters') }),
  z.object({ __kind: z.literal('CcmUnsupportedForTargetChain') }),
  z.object({ __kind: z.literal('CcmInvalidMetadata') }),
]);

export const palletCfIngressEgressDepositWitnessPolkadot = z.object({
  depositAddress: hexString,
  asset: cfPrimitivesChainsAssetsDotAsset,
  amount: numberOrHex,
  depositDetails: z.number(),
});

export const palletCfPolkadotIngressEgressDepositFailedDetails = z.union([
  z.object({
    __kind: z.literal('DepositChannel'),
    depositWitness: palletCfIngressEgressDepositWitnessPolkadot,
  }),
  z.object({ __kind: z.literal('Vault'), vaultWitness: palletCfIngressEgressVaultDepositWitness }),
]);

export const cfTraitsScheduledEgressDetailsPolkadot = z.object({
  egressId: z.tuple([cfPrimitivesChainsForeignChain, numberOrHex]),
  egressAmount: numberOrHex,
  feeWithheld: numberOrHex,
});

export const cfPrimitivesChainsAssetsBtcAsset = simpleEnum(['Btc']);

export const cfChainsBtcUtxoId = z.object({ txId: hexString, vout: z.number() });

export const cfChainsBtcBitcoinScript = z.object({ bytes: hexString });

export const cfChainsBtcDepositAddressTapscriptPath = z.object({
  salt: z.number(),
  tweakedPubkeyBytes: hexString,
  tapleafHash: hexString,
  unlockScript: cfChainsBtcBitcoinScript,
});

export const cfChainsBtcDepositAddress = z.object({
  pubkeyX: hexString,
  scriptPath: cfChainsBtcDepositAddressTapscriptPath.nullish(),
});

export const cfChainsBtcUtxo = z.object({
  id: cfChainsBtcUtxoId,
  amount: numberOrHex,
  depositAddress: cfChainsBtcDepositAddress,
});

export const palletCfBitcoinIngressEgressDepositAction = z.union([
  z.object({ __kind: z.literal('Swap'), swapRequestId: numberOrHex }),
  z.object({ __kind: z.literal('LiquidityProvision'), lpAccount: accountId }),
  z.object({ __kind: z.literal('CcmTransfer'), swapRequestId: numberOrHex }),
  z.object({
    __kind: z.literal('BoostersCredited'),
    prewitnessedDepositId: numberOrHex,
    networkFeeFromBoost: numberOrHex,
    networkFeeSwapRequestId: numberOrHex.nullish(),
  }),
]);

export const palletCfBitcoinIngressEgressDepositFailedReason = z.union([
  z.object({ __kind: z.literal('BelowMinimumDeposit') }),
  z.object({ __kind: z.literal('NotEnoughToPayFees') }),
  z.object({ __kind: z.literal('TransactionRejectedByBroker') }),
  z.object({ __kind: z.literal('DepositWitnessRejected'), value: spRuntimeDispatchError }),
  z.object({ __kind: z.literal('InvalidDestinationAddress') }),
  z.object({ __kind: z.literal('InvalidBrokerFees') }),
  z.object({ __kind: z.literal('InvalidRefundParameters') }),
  z.object({ __kind: z.literal('InvalidDcaParameters') }),
  z.object({ __kind: z.literal('CcmUnsupportedForTargetChain') }),
  z.object({ __kind: z.literal('CcmInvalidMetadata') }),
]);

export const palletCfIngressEgressDepositWitnessBitcoin = z.object({
  depositAddress: cfChainsBtcScriptPubkey,
  asset: cfPrimitivesChainsAssetsBtcAsset,
  amount: numberOrHex,
  depositDetails: cfChainsBtcUtxo,
});

export const palletCfBitcoinIngressEgressDepositFailedDetails = z.union([
  z.object({
    __kind: z.literal('DepositChannel'),
    depositWitness: palletCfIngressEgressDepositWitnessBitcoin,
  }),
  z.object({ __kind: z.literal('Vault'), vaultWitness: palletCfIngressEgressVaultDepositWitness }),
]);

export const cfTraitsScheduledEgressDetailsBitcoin = z.object({
  egressId: z.tuple([cfPrimitivesChainsForeignChain, numberOrHex]),
  egressAmount: numberOrHex,
  feeWithheld: numberOrHex,
});

export const cfChainsArbArbitrumTrackedData = z.object({
  baseFee: numberOrHex,
  l1BaseFeeEstimate: numberOrHex,
});

export const cfChainsChainStateArbitrum = z.object({
  blockHeight: numberOrHex,
  trackedData: cfChainsArbArbitrumTrackedData,
});

export const cfPrimitivesChainsAssetsArbAsset = simpleEnum(['ArbEth', 'ArbUsdc']);

export const palletCfArbitrumIngressEgressDepositAction = z.union([
  z.object({ __kind: z.literal('Swap'), swapRequestId: numberOrHex }),
  z.object({ __kind: z.literal('LiquidityProvision'), lpAccount: accountId }),
  z.object({ __kind: z.literal('CcmTransfer'), swapRequestId: numberOrHex }),
  z.object({
    __kind: z.literal('BoostersCredited'),
    prewitnessedDepositId: numberOrHex,
    networkFeeFromBoost: numberOrHex,
    networkFeeSwapRequestId: numberOrHex.nullish(),
  }),
]);

export const palletCfArbitrumIngressEgressDepositFailedReason = z.union([
  z.object({ __kind: z.literal('BelowMinimumDeposit') }),
  z.object({ __kind: z.literal('NotEnoughToPayFees') }),
  z.object({ __kind: z.literal('TransactionRejectedByBroker') }),
  z.object({ __kind: z.literal('DepositWitnessRejected'), value: spRuntimeDispatchError }),
  z.object({ __kind: z.literal('InvalidDestinationAddress') }),
  z.object({ __kind: z.literal('InvalidBrokerFees') }),
  z.object({ __kind: z.literal('InvalidRefundParameters') }),
  z.object({ __kind: z.literal('InvalidDcaParameters') }),
  z.object({ __kind: z.literal('CcmUnsupportedForTargetChain') }),
  z.object({ __kind: z.literal('CcmInvalidMetadata') }),
]);

export const palletCfIngressEgressDepositWitnessArbitrum = z.object({
  depositAddress: hexString,
  asset: cfPrimitivesChainsAssetsArbAsset,
  amount: numberOrHex,
  depositDetails: cfChainsEvmDepositDetails,
});

export const palletCfArbitrumIngressEgressDepositFailedDetails = z.union([
  z.object({
    __kind: z.literal('DepositChannel'),
    depositWitness: palletCfIngressEgressDepositWitnessArbitrum,
  }),
  z.object({ __kind: z.literal('Vault'), vaultWitness: palletCfIngressEgressVaultDepositWitness }),
]);

export const cfTraitsScheduledEgressDetailsArbitrum = z.object({
  egressId: z.tuple([cfPrimitivesChainsForeignChain, numberOrHex]),
  egressAmount: numberOrHex,
  feeWithheld: numberOrHex,
});

export const cfChainsSolSolanaTransactionData = z.object({
  serializedTransaction: hexString,
  skipPreflight: z.boolean(),
});

export const cfPrimitivesChainsAssetsSolAsset = simpleEnum(['Sol', 'SolUsdc']);

export const palletCfSolanaIngressEgressDepositAction = z.union([
  z.object({ __kind: z.literal('Swap'), swapRequestId: numberOrHex }),
  z.object({ __kind: z.literal('LiquidityProvision'), lpAccount: accountId }),
  z.object({ __kind: z.literal('CcmTransfer'), swapRequestId: numberOrHex }),
  z.object({
    __kind: z.literal('BoostersCredited'),
    prewitnessedDepositId: numberOrHex,
    networkFeeFromBoost: numberOrHex,
    networkFeeSwapRequestId: numberOrHex.nullish(),
  }),
]);

export const palletCfSolanaIngressEgressDepositFailedReason = z.union([
  z.object({ __kind: z.literal('BelowMinimumDeposit') }),
  z.object({ __kind: z.literal('NotEnoughToPayFees') }),
  z.object({ __kind: z.literal('TransactionRejectedByBroker') }),
  z.object({ __kind: z.literal('DepositWitnessRejected'), value: spRuntimeDispatchError }),
  z.object({ __kind: z.literal('InvalidDestinationAddress') }),
  z.object({ __kind: z.literal('InvalidBrokerFees') }),
  z.object({ __kind: z.literal('InvalidRefundParameters') }),
  z.object({ __kind: z.literal('InvalidDcaParameters') }),
  z.object({ __kind: z.literal('CcmUnsupportedForTargetChain') }),
  z.object({ __kind: z.literal('CcmInvalidMetadata') }),
]);

export const palletCfIngressEgressDepositWitnessSolana = z.object({
  depositAddress: hexString,
  asset: cfPrimitivesChainsAssetsSolAsset,
  amount: numberOrHex,
});

export const palletCfSolanaIngressEgressDepositFailedDetails = z.union([
  z.object({
    __kind: z.literal('DepositChannel'),
    depositWitness: palletCfIngressEgressDepositWitnessSolana,
  }),
  z.object({ __kind: z.literal('Vault'), vaultWitness: palletCfIngressEgressVaultDepositWitness }),
]);

export const cfTraitsScheduledEgressDetailsSolana = z.object({
  egressId: z.tuple([cfPrimitivesChainsForeignChain, numberOrHex]),
  egressAmount: numberOrHex,
  feeWithheld: numberOrHex,
});
