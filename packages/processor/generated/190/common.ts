import { z } from 'zod';
import * as ss58 from '@chainflip/utils/ss58';
import * as base58 from '@chainflip/utils/base58';
import { hexToBytes } from '@chainflip/utils/bytes';

export const palletCfEmissionsPalletSafeMode = z.object({ emissionsSyncEnabled: z.boolean() });

export const palletCfFundingPalletSafeMode = z.object({ redeemEnabled: z.boolean() });

export const palletCfSwappingPalletSafeMode = z.object({
  swapsEnabled: z.boolean(),
  withdrawalsEnabled: z.boolean(),
  brokerRegistrationEnabled: z.boolean(),
});

export const palletCfLpPalletSafeMode = z.object({
  depositEnabled: z.boolean(),
  withdrawalEnabled: z.boolean(),
  internalSwapsEnabled: z.boolean(),
});

export const palletCfValidatorPalletSafeMode = z.object({
  authorityRotationEnabled: z.boolean(),
  startBiddingEnabled: z.boolean(),
  stopBiddingEnabled: z.boolean(),
});

export const palletCfPoolsPalletSafeMode = z.object({
  rangeOrderUpdateEnabled: z.boolean(),
  limitOrderUpdateEnabled: z.boolean(),
});

export const palletCfTradingStrategyPalletSafeMode = z.object({
  strategyUpdatesEnabled: z.boolean(),
  strategyClosureEnabled: z.boolean(),
  strategyExecutionEnabled: z.boolean(),
});

export const palletCfReputationPalletSafeMode = z.object({ reportingEnabled: z.boolean() });

export const palletCfAssetBalancesPalletSafeMode = z.object({ reconciliationEnabled: z.boolean() });

export const palletCfThresholdSignaturePalletSafeMode = z.object({ slashingEnabled: z.boolean() });

export const palletCfBroadcastPalletSafeMode = z.object({ retryEnabled: z.boolean() });

export const stateChainRuntimeSafeModeWitnesserCallPermission = z.object({
  governance: z.boolean(),
  funding: z.boolean(),
  swapping: z.boolean(),
  ethereumBroadcast: z.boolean(),
  ethereumChainTracking: z.boolean(),
  ethereumIngressEgress: z.boolean(),
  ethereumVault: z.boolean(),
  polkadotBroadcast: z.boolean(),
  polkadotChainTracking: z.boolean(),
  polkadotIngressEgress: z.boolean(),
  polkadotVault: z.boolean(),
  bitcoinBroadcast: z.boolean(),
  bitcoinChainTracking: z.boolean(),
  bitcoinIngressEgress: z.boolean(),
  bitcoinVault: z.boolean(),
  arbitrumBroadcast: z.boolean(),
  arbitrumChainTracking: z.boolean(),
  arbitrumIngressEgress: z.boolean(),
  arbitrumVault: z.boolean(),
  solanaBroadcast: z.boolean(),
  solanaVault: z.boolean(),
  assethubBroadcast: z.boolean(),
  assethubChainTracking: z.boolean(),
  assethubIngressEgress: z.boolean(),
  assethubVault: z.boolean(),
});

export const palletCfWitnesserPalletSafeMode = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('CodeGreen') }),
  z.object({ __kind: z.literal('CodeRed') }),
  z.object({
    __kind: z.literal('CodeAmber'),
    value: stateChainRuntimeSafeModeWitnesserCallPermission,
  }),
]);

export const palletCfIngressEgressPalletSafeMode = z.object({
  boostDepositsEnabled: z.boolean(),
  addBoostFundsEnabled: z.boolean(),
  stopBoostingEnabled: z.boolean(),
  depositsEnabled: z.boolean(),
});

export const stateChainRuntimeSafeModeInnerRuntimeSafeMode = z.object({
  emissions: palletCfEmissionsPalletSafeMode,
  funding: palletCfFundingPalletSafeMode,
  swapping: palletCfSwappingPalletSafeMode,
  liquidityProvider: palletCfLpPalletSafeMode,
  validator: palletCfValidatorPalletSafeMode,
  pools: palletCfPoolsPalletSafeMode,
  tradingStrategies: palletCfTradingStrategyPalletSafeMode,
  reputation: palletCfReputationPalletSafeMode,
  assetBalances: palletCfAssetBalancesPalletSafeMode,
  thresholdSignatureEvm: palletCfThresholdSignaturePalletSafeMode,
  thresholdSignatureBitcoin: palletCfThresholdSignaturePalletSafeMode,
  thresholdSignaturePolkadot: palletCfThresholdSignaturePalletSafeMode,
  thresholdSignatureSolana: palletCfThresholdSignaturePalletSafeMode,
  broadcastEthereum: palletCfBroadcastPalletSafeMode,
  broadcastBitcoin: palletCfBroadcastPalletSafeMode,
  broadcastPolkadot: palletCfBroadcastPalletSafeMode,
  broadcastArbitrum: palletCfBroadcastPalletSafeMode,
  broadcastSolana: palletCfBroadcastPalletSafeMode,
  broadcastAssethub: palletCfBroadcastPalletSafeMode,
  witnesser: palletCfWitnesserPalletSafeMode,
  ingressEgressEthereum: palletCfIngressEgressPalletSafeMode,
  ingressEgressBitcoin: palletCfIngressEgressPalletSafeMode,
  ingressEgressPolkadot: palletCfIngressEgressPalletSafeMode,
  ingressEgressArbitrum: palletCfIngressEgressPalletSafeMode,
  ingressEgressSolana: palletCfIngressEgressPalletSafeMode,
  ingressEgressAssethub: palletCfIngressEgressPalletSafeMode,
});

export const palletCfEnvironmentSafeModeUpdate = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('CodeRed') }),
  z.object({ __kind: z.literal('CodeGreen') }),
  z.object({
    __kind: z.literal('CodeAmber'),
    value: stateChainRuntimeSafeModeInnerRuntimeSafeMode,
  }),
]);

export const hexString = z
  .string()
  .refine((v): v is `0x${string}` => /^0x[\da-f]*$/i.test(v), { message: 'Invalid hex string' });

export const palletCfFlipOnChargeTransactionFeeScalingRateConfig = z.discriminatedUnion('__kind', [
  z.object({
    __kind: z.literal('DelayedExponential'),
    threshold: z.number(),
    exponent: z.number(),
  }),
  z.object({ __kind: z.literal('NoScaling') }),
]);

export const palletCfFlipPalletConfigUpdate = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('SetSlashingRate'), value: z.number() }),
  z.object({
    __kind: z.literal('SetFeeScalingRate'),
    value: palletCfFlipOnChargeTransactionFeeScalingRateConfig,
  }),
]);

export const numericString = z
  .string()
  .refine((v) => /^\d+$/.test(v), { message: 'Invalid numeric string' });

export const numberOrHex = z
  .union([z.number(), hexString, numericString])
  .transform((n) => BigInt(n));

export const simpleEnum = <U extends string, T extends readonly [U, ...U[]]>(values: T) =>
  z.object({ __kind: z.enum(values) }).transform(({ __kind }) => __kind!);

export const cfPrimitivesChainsForeignChain = simpleEnum([
  'Ethereum',
  'Polkadot',
  'Bitcoin',
  'Arbitrum',
  'Solana',
  'Assethub',
]);

export const palletCfTokenholderGovernanceProposal = z.discriminatedUnion('__kind', [
  z.object({
    __kind: z.literal('SetGovernanceKey'),
    value: z.tuple([cfPrimitivesChainsForeignChain, hexString]),
  }),
  z.object({ __kind: z.literal('SetCommunityKey'), value: hexString }),
]);

export const accountId = z
  .union([
    hexString,
    z
      .string()
      .regex(/^[0-9a-f]+$/)
      .transform<`0x${string}`>((v) => `0x${v}`),
  ])
  .transform((value) => ss58.encode({ data: value, ss58Format: 2112 }) as `cF${string}`);

export const stateChainRuntimeChainflipOffencesOffence = z.discriminatedUnion('__kind', [
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
]);

export const cfChainsAddressEncodedAddress = z
  .object({ __kind: z.enum(['Eth', 'Dot', 'Btc', 'Arb', 'Sol', 'Hub']), value: hexString })
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
      case 'Hub':
        return { chain: 'Assethub', address: ss58.encode({ data: value, ss58Format: 0 }) } as const;
      default:
        throw new Error('Unknown chain');
    }
  });

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

export const cfChainsChannelRefundParametersEncodedAddress = z.object({
  retryDuration: z.number(),
  refundAddress: cfChainsAddressEncodedAddress,
  minPrice: numberOrHex,
});

export const cfPrimitivesSwapLeg = simpleEnum(['FromStable', 'ToStable']);

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

export const palletCfSwappingPalletConfigUpdate = z.discriminatedUnion('__kind', [
  z.object({
    __kind: z.literal('MaximumSwapAmount'),
    asset: cfPrimitivesChainsAssetsAnyAsset,
    amount: numberOrHex.nullish(),
  }),
  z.object({ __kind: z.literal('SwapRetryDelay'), delay: z.number() }),
  z.object({ __kind: z.literal('FlipBuyInterval'), interval: z.number() }),
  z.object({ __kind: z.literal('SetMaxSwapRetryDuration'), blocks: z.number() }),
  z.object({ __kind: z.literal('SetMaxSwapRequestDuration'), blocks: z.number() }),
  z.object({
    __kind: z.literal('SetMinimumChunkSize'),
    asset: cfPrimitivesChainsAssetsAnyAsset,
    size_: numberOrHex,
  }),
  z.object({ __kind: z.literal('SetBrokerBond'), bond: numberOrHex }),
  z.object({ __kind: z.literal('SetMinimumNetworkFee'), minFee: numberOrHex }),
  z.object({ __kind: z.literal('SetInternalSwapNetworkFee'), fee: z.number() }),
  z.object({ __kind: z.literal('SetInternalSwapMinimumNetworkFee'), minFee: numberOrHex }),
]);

export const cfChainsBtcScriptPubkey = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('P2PKH'), value: hexString }),
  z.object({ __kind: z.literal('P2SH'), value: hexString }),
  z.object({ __kind: z.literal('P2WPKH'), value: hexString }),
  z.object({ __kind: z.literal('P2WSH'), value: hexString }),
  z.object({ __kind: z.literal('Taproot'), value: hexString }),
  z.object({ __kind: z.literal('OtherSegwit'), version: z.number(), program: hexString }),
]);

export const cfChainsAddressForeignChainAddress = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('Eth'), value: hexString }),
  z.object({ __kind: z.literal('Dot'), value: hexString }),
  z.object({ __kind: z.literal('Btc'), value: cfChainsBtcScriptPubkey }),
  z.object({ __kind: z.literal('Arb'), value: hexString }),
  z.object({ __kind: z.literal('Sol'), value: hexString }),
  z.object({ __kind: z.literal('Hub'), value: hexString }),
]);

export const cfPrimitivesChainsAssetsEthAsset = simpleEnum(['Eth', 'Flip', 'Usdc', 'Usdt']);

export const cfChainsEvmDepositDetails = z.object({ txHashes: z.array(hexString).nullish() });

export const palletCfEthereumIngressEgressRefundReason = simpleEnum([
  'InvalidBrokerFees',
  'InvalidRefundParameters',
  'InvalidDcaParameters',
  'CcmUnsupportedForTargetChain',
  'CcmInvalidMetadata',
  'InvalidDestinationAddress',
]);

export const palletCfEthereumIngressEgressDepositAction = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('Swap'), swapRequestId: numberOrHex }),
  z.object({ __kind: z.literal('LiquidityProvision'), lpAccount: accountId }),
  z.object({ __kind: z.literal('CcmTransfer'), swapRequestId: numberOrHex }),
  z.object({
    __kind: z.literal('BoostersCredited'),
    prewitnessedDepositId: numberOrHex,
    networkFeeFromBoost: numberOrHex,
    networkFeeSwapRequestId: numberOrHex.nullish(),
  }),
  z.object({
    __kind: z.literal('Refund'),
    egressId: z.tuple([cfPrimitivesChainsForeignChain, numberOrHex]).nullish(),
    reason: palletCfEthereumIngressEgressRefundReason,
    amount: numberOrHex,
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

export const cfChainsExecutexSwapAndCallError = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('Unsupported') }),
  z.object({
    __kind: z.literal('FailedToBuildCcmForSolana'),
    value: cfChainsSolApiSolanaTransactionBuildingError,
  }),
  z.object({ __kind: z.literal('DispatchError'), value: spRuntimeDispatchError }),
  z.object({ __kind: z.literal('NoVault') }),
]);

export const palletCfEthereumIngressEgressDepositFailedReason = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('BelowMinimumDeposit') }),
  z.object({ __kind: z.literal('NotEnoughToPayFees') }),
  z.object({ __kind: z.literal('TransactionRejectedByBroker') }),
  z.object({ __kind: z.literal('DepositWitnessRejected'), value: spRuntimeDispatchError }),
]);

export const palletCfEthereumIngressEgressDepositWitnessEthereum = z.object({
  depositAddress: hexString,
  asset: cfPrimitivesChainsAssetsEthAsset,
  amount: numberOrHex,
  depositDetails: cfChainsEvmDepositDetails,
});

export const cfChainsCcmDepositMetadataGenericForeignChainAddress = z.object({
  channelMetadata: cfChainsCcmChannelMetadata,
  sourceChain: cfPrimitivesChainsForeignChain,
  sourceAddress: cfChainsAddressForeignChainAddress.nullish(),
});

export const cfPrimitivesBeneficiaryAffiliateShortId = z.object({
  account: z.number(),
  bps: z.number(),
});

export const cfChainsChannelRefundParametersH160 = z.object({
  retryDuration: z.number(),
  refundAddress: hexString,
  minPrice: numberOrHex,
});

export const palletCfEthereumIngressEgressVaultDepositWitnessEthereum = z.object({
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
  refundParams: cfChainsChannelRefundParametersH160,
  dcaParams: cfPrimitivesDcaParameters.nullish(),
  boostFee: z.number(),
});

export const palletCfEthereumIngressEgressDepositFailedDetailsEthereum = z.discriminatedUnion(
  '__kind',
  [
    z.object({
      __kind: z.literal('DepositChannelEthereum'),
      depositWitness: palletCfEthereumIngressEgressDepositWitnessEthereum,
    }),
    z.object({
      __kind: z.literal('VaultEthereum'),
      vaultWitness: palletCfEthereumIngressEgressVaultDepositWitnessEthereum,
    }),
  ],
);

export const cfTraitsScheduledEgressDetailsEthereum = z.object({
  egressId: z.tuple([cfPrimitivesChainsForeignChain, numberOrHex]),
  egressAmount: numberOrHex,
  feeWithheld: numberOrHex,
});

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

export const cfPrimitivesChainsAssetsDotAsset = simpleEnum(['Dot']);

export const palletCfPolkadotIngressEgressRefundReason = simpleEnum([
  'InvalidBrokerFees',
  'InvalidRefundParameters',
  'InvalidDcaParameters',
  'CcmUnsupportedForTargetChain',
  'CcmInvalidMetadata',
  'InvalidDestinationAddress',
]);

export const palletCfPolkadotIngressEgressDepositAction = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('Swap'), swapRequestId: numberOrHex }),
  z.object({ __kind: z.literal('LiquidityProvision'), lpAccount: accountId }),
  z.object({ __kind: z.literal('CcmTransfer'), swapRequestId: numberOrHex }),
  z.object({
    __kind: z.literal('BoostersCredited'),
    prewitnessedDepositId: numberOrHex,
    networkFeeFromBoost: numberOrHex,
    networkFeeSwapRequestId: numberOrHex.nullish(),
  }),
  z.object({
    __kind: z.literal('Refund'),
    egressId: z.tuple([cfPrimitivesChainsForeignChain, numberOrHex]).nullish(),
    reason: palletCfPolkadotIngressEgressRefundReason,
    amount: numberOrHex,
  }),
]);

export const palletCfPolkadotIngressEgressDepositFailedReason = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('BelowMinimumDeposit') }),
  z.object({ __kind: z.literal('NotEnoughToPayFees') }),
  z.object({ __kind: z.literal('TransactionRejectedByBroker') }),
  z.object({ __kind: z.literal('DepositWitnessRejected'), value: spRuntimeDispatchError }),
]);

export const palletCfPolkadotIngressEgressDepositWitnessPolkadot = z.object({
  depositAddress: hexString,
  asset: cfPrimitivesChainsAssetsDotAsset,
  amount: numberOrHex,
  depositDetails: z.number(),
});

export const cfChainsChannelRefundParametersPolkadotAccountId = z.object({
  retryDuration: z.number(),
  refundAddress: hexString,
  minPrice: numberOrHex,
});

export const palletCfPolkadotIngressEgressVaultDepositWitnessPolkadot = z.object({
  inputAsset: cfPrimitivesChainsAssetsDotAsset,
  depositAddress: hexString.nullish(),
  channelId: numberOrHex.nullish(),
  depositAmount: numberOrHex,
  depositDetails: z.number(),
  outputAsset: cfPrimitivesChainsAssetsAnyAsset,
  destinationAddress: cfChainsAddressEncodedAddress,
  depositMetadata: cfChainsCcmDepositMetadataGenericForeignChainAddress.nullish(),
  txId: cfPrimitivesTxId,
  brokerFee: cfPrimitivesBeneficiaryAccountId32.nullish(),
  affiliateFees: z.array(cfPrimitivesBeneficiaryAffiliateShortId),
  refundParams: cfChainsChannelRefundParametersPolkadotAccountId,
  dcaParams: cfPrimitivesDcaParameters.nullish(),
  boostFee: z.number(),
});

export const palletCfPolkadotIngressEgressDepositFailedDetailsPolkadot = z.discriminatedUnion(
  '__kind',
  [
    z.object({
      __kind: z.literal('DepositChannelPolkadot'),
      depositWitness: palletCfPolkadotIngressEgressDepositWitnessPolkadot,
    }),
    z.object({
      __kind: z.literal('VaultPolkadot'),
      vaultWitness: palletCfPolkadotIngressEgressVaultDepositWitnessPolkadot,
    }),
  ],
);

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

export const palletCfBitcoinIngressEgressRefundReason = simpleEnum([
  'InvalidBrokerFees',
  'InvalidRefundParameters',
  'InvalidDcaParameters',
  'CcmUnsupportedForTargetChain',
  'CcmInvalidMetadata',
  'InvalidDestinationAddress',
]);

export const palletCfBitcoinIngressEgressDepositAction = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('Swap'), swapRequestId: numberOrHex }),
  z.object({ __kind: z.literal('LiquidityProvision'), lpAccount: accountId }),
  z.object({ __kind: z.literal('CcmTransfer'), swapRequestId: numberOrHex }),
  z.object({
    __kind: z.literal('BoostersCredited'),
    prewitnessedDepositId: numberOrHex,
    networkFeeFromBoost: numberOrHex,
    networkFeeSwapRequestId: numberOrHex.nullish(),
  }),
  z.object({
    __kind: z.literal('Refund'),
    egressId: z.tuple([cfPrimitivesChainsForeignChain, numberOrHex]).nullish(),
    reason: palletCfBitcoinIngressEgressRefundReason,
    amount: numberOrHex,
  }),
]);

export const palletCfBitcoinIngressEgressDepositFailedReason = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('BelowMinimumDeposit') }),
  z.object({ __kind: z.literal('NotEnoughToPayFees') }),
  z.object({ __kind: z.literal('TransactionRejectedByBroker') }),
  z.object({ __kind: z.literal('DepositWitnessRejected'), value: spRuntimeDispatchError }),
]);

export const palletCfBitcoinIngressEgressDepositWitnessBitcoin = z.object({
  depositAddress: cfChainsBtcScriptPubkey,
  asset: cfPrimitivesChainsAssetsBtcAsset,
  amount: numberOrHex,
  depositDetails: cfChainsBtcUtxo,
});

export const cfChainsChannelRefundParametersScriptPubkey = z.object({
  retryDuration: z.number(),
  refundAddress: cfChainsBtcScriptPubkey,
  minPrice: numberOrHex,
});

export const palletCfBitcoinIngressEgressVaultDepositWitnessBitcoin = z.object({
  inputAsset: cfPrimitivesChainsAssetsBtcAsset,
  depositAddress: cfChainsBtcScriptPubkey.nullish(),
  channelId: numberOrHex.nullish(),
  depositAmount: numberOrHex,
  depositDetails: cfChainsBtcUtxo,
  outputAsset: cfPrimitivesChainsAssetsAnyAsset,
  destinationAddress: cfChainsAddressEncodedAddress,
  depositMetadata: cfChainsCcmDepositMetadataGenericForeignChainAddress.nullish(),
  txId: hexString,
  brokerFee: cfPrimitivesBeneficiaryAccountId32.nullish(),
  affiliateFees: z.array(cfPrimitivesBeneficiaryAffiliateShortId),
  refundParams: cfChainsChannelRefundParametersScriptPubkey,
  dcaParams: cfPrimitivesDcaParameters.nullish(),
  boostFee: z.number(),
});

export const palletCfBitcoinIngressEgressDepositFailedDetailsBitcoin = z.discriminatedUnion(
  '__kind',
  [
    z.object({
      __kind: z.literal('DepositChannelBitcoin'),
      depositWitness: palletCfBitcoinIngressEgressDepositWitnessBitcoin,
    }),
    z.object({
      __kind: z.literal('VaultBitcoin'),
      vaultWitness: palletCfBitcoinIngressEgressVaultDepositWitnessBitcoin,
    }),
  ],
);

export const cfTraitsScheduledEgressDetailsBitcoin = z.object({
  egressId: z.tuple([cfPrimitivesChainsForeignChain, numberOrHex]),
  egressAmount: numberOrHex,
  feeWithheld: numberOrHex,
});

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

export const palletCfPoolsAssetPair = z.object({ assets: cfAmmCommonPoolPairsMap });

export const palletCfPoolsCloseOrder = z.discriminatedUnion('__kind', [
  z.object({
    __kind: z.literal('Limit'),
    baseAsset: cfPrimitivesChainsAssetsAnyAsset,
    quoteAsset: cfPrimitivesChainsAssetsAnyAsset,
    side: cfAmmCommonSide,
    id: numberOrHex,
  }),
  z.object({
    __kind: z.literal('Range'),
    baseAsset: cfPrimitivesChainsAssetsAnyAsset,
    quoteAsset: cfPrimitivesChainsAssetsAnyAsset,
    id: numberOrHex,
  }),
]);

export const palletCfPoolsPalletConfigUpdate = z.object({
  __kind: z.literal('LimitOrderAutoSweepingThreshold'),
  asset: cfPrimitivesChainsAssetsAnyAsset,
  amount: numberOrHex,
});

export const cfPrimitivesChainsAssetsArbAsset = simpleEnum(['ArbEth', 'ArbUsdc']);

export const palletCfArbitrumIngressEgressRefundReason = simpleEnum([
  'InvalidBrokerFees',
  'InvalidRefundParameters',
  'InvalidDcaParameters',
  'CcmUnsupportedForTargetChain',
  'CcmInvalidMetadata',
  'InvalidDestinationAddress',
]);

export const palletCfArbitrumIngressEgressDepositAction = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('Swap'), swapRequestId: numberOrHex }),
  z.object({ __kind: z.literal('LiquidityProvision'), lpAccount: accountId }),
  z.object({ __kind: z.literal('CcmTransfer'), swapRequestId: numberOrHex }),
  z.object({
    __kind: z.literal('BoostersCredited'),
    prewitnessedDepositId: numberOrHex,
    networkFeeFromBoost: numberOrHex,
    networkFeeSwapRequestId: numberOrHex.nullish(),
  }),
  z.object({
    __kind: z.literal('Refund'),
    egressId: z.tuple([cfPrimitivesChainsForeignChain, numberOrHex]).nullish(),
    reason: palletCfArbitrumIngressEgressRefundReason,
    amount: numberOrHex,
  }),
]);

export const palletCfArbitrumIngressEgressDepositFailedReason = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('BelowMinimumDeposit') }),
  z.object({ __kind: z.literal('NotEnoughToPayFees') }),
  z.object({ __kind: z.literal('TransactionRejectedByBroker') }),
  z.object({ __kind: z.literal('DepositWitnessRejected'), value: spRuntimeDispatchError }),
]);

export const palletCfArbitrumIngressEgressDepositWitnessArbitrum = z.object({
  depositAddress: hexString,
  asset: cfPrimitivesChainsAssetsArbAsset,
  amount: numberOrHex,
  depositDetails: cfChainsEvmDepositDetails,
});

export const palletCfArbitrumIngressEgressVaultDepositWitnessArbitrum = z.object({
  inputAsset: cfPrimitivesChainsAssetsArbAsset,
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
  refundParams: cfChainsChannelRefundParametersH160,
  dcaParams: cfPrimitivesDcaParameters.nullish(),
  boostFee: z.number(),
});

export const palletCfArbitrumIngressEgressDepositFailedDetailsArbitrum = z.discriminatedUnion(
  '__kind',
  [
    z.object({
      __kind: z.literal('DepositChannelArbitrum'),
      depositWitness: palletCfArbitrumIngressEgressDepositWitnessArbitrum,
    }),
    z.object({
      __kind: z.literal('VaultArbitrum'),
      vaultWitness: palletCfArbitrumIngressEgressVaultDepositWitnessArbitrum,
    }),
  ],
);

export const cfTraitsScheduledEgressDetailsArbitrum = z.object({
  egressId: z.tuple([cfPrimitivesChainsForeignChain, numberOrHex]),
  egressAmount: numberOrHex,
  feeWithheld: numberOrHex,
});

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

export const cfPrimitivesChainsAssetsSolAsset = simpleEnum(['Sol', 'SolUsdc']);

export const palletCfSolanaIngressEgressRefundReason = simpleEnum([
  'InvalidBrokerFees',
  'InvalidRefundParameters',
  'InvalidDcaParameters',
  'CcmUnsupportedForTargetChain',
  'CcmInvalidMetadata',
  'InvalidDestinationAddress',
]);

export const palletCfSolanaIngressEgressDepositAction = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('Swap'), swapRequestId: numberOrHex }),
  z.object({ __kind: z.literal('LiquidityProvision'), lpAccount: accountId }),
  z.object({ __kind: z.literal('CcmTransfer'), swapRequestId: numberOrHex }),
  z.object({
    __kind: z.literal('BoostersCredited'),
    prewitnessedDepositId: numberOrHex,
    networkFeeFromBoost: numberOrHex,
    networkFeeSwapRequestId: numberOrHex.nullish(),
  }),
  z.object({
    __kind: z.literal('Refund'),
    egressId: z.tuple([cfPrimitivesChainsForeignChain, numberOrHex]).nullish(),
    reason: palletCfSolanaIngressEgressRefundReason,
    amount: numberOrHex,
  }),
]);

export const palletCfSolanaIngressEgressDepositFailedReason = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('BelowMinimumDeposit') }),
  z.object({ __kind: z.literal('NotEnoughToPayFees') }),
  z.object({ __kind: z.literal('TransactionRejectedByBroker') }),
  z.object({ __kind: z.literal('DepositWitnessRejected'), value: spRuntimeDispatchError }),
]);

export const palletCfSolanaIngressEgressDepositWitnessSolana = z.object({
  depositAddress: hexString,
  asset: cfPrimitivesChainsAssetsSolAsset,
  amount: numberOrHex,
});

export const cfChainsChannelRefundParametersAddress = z.object({
  retryDuration: z.number(),
  refundAddress: hexString,
  minPrice: numberOrHex,
});

export const palletCfSolanaIngressEgressVaultDepositWitnessSolana = z.object({
  inputAsset: cfPrimitivesChainsAssetsSolAsset,
  depositAddress: hexString.nullish(),
  channelId: numberOrHex.nullish(),
  depositAmount: numberOrHex,
  outputAsset: cfPrimitivesChainsAssetsAnyAsset,
  destinationAddress: cfChainsAddressEncodedAddress,
  depositMetadata: cfChainsCcmDepositMetadataGenericForeignChainAddress.nullish(),
  txId: z.tuple([hexString, numberOrHex]),
  brokerFee: cfPrimitivesBeneficiaryAccountId32.nullish(),
  affiliateFees: z.array(cfPrimitivesBeneficiaryAffiliateShortId),
  refundParams: cfChainsChannelRefundParametersAddress,
  dcaParams: cfPrimitivesDcaParameters.nullish(),
  boostFee: z.number(),
});

export const palletCfSolanaIngressEgressDepositFailedDetailsSolana = z.discriminatedUnion(
  '__kind',
  [
    z.object({
      __kind: z.literal('DepositChannelSolana'),
      depositWitness: palletCfSolanaIngressEgressDepositWitnessSolana,
    }),
    z.object({
      __kind: z.literal('VaultSolana'),
      vaultWitness: palletCfSolanaIngressEgressVaultDepositWitnessSolana,
    }),
  ],
);

export const cfTraitsScheduledEgressDetailsSolana = z.object({
  egressId: z.tuple([cfPrimitivesChainsForeignChain, numberOrHex]),
  egressAmount: numberOrHex,
  feeWithheld: numberOrHex,
});

export const cfChainsDotRuntimeVersion = z.object({
  specVersion: z.number(),
  transactionVersion: z.number(),
});

export const cfChainsHubAssethubTrackedData = z.object({
  medianTip: numberOrHex,
  runtimeVersion: cfChainsDotRuntimeVersion,
});

export const cfChainsChainStateAssethub = z.object({
  blockHeight: z.number(),
  trackedData: cfChainsHubAssethubTrackedData,
});

export const cfChainsDotPolkadotTransactionData = z.object({ encodedExtrinsic: hexString });

export const cfChainsDotPolkadotTransactionId = z.object({
  blockNumber: z.number(),
  extrinsicIndex: z.number(),
});

export const dispatchResult = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('Ok') }),
  z.object({ __kind: z.literal('Err'), value: spRuntimeDispatchError }),
]);

export const palletCfBroadcastPalletConfigUpdate = z.object({
  __kind: z.literal('BroadcastTimeout'),
  blocks: z.number(),
});

export const cfPrimitivesChainsAssetsHubAsset = simpleEnum(['HubDot', 'HubUsdt', 'HubUsdc']);

export const palletCfAssethubIngressEgressRefundReason = simpleEnum([
  'InvalidBrokerFees',
  'InvalidRefundParameters',
  'InvalidDcaParameters',
  'CcmUnsupportedForTargetChain',
  'CcmInvalidMetadata',
  'InvalidDestinationAddress',
]);

export const palletCfAssethubIngressEgressDepositAction = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('Swap'), swapRequestId: numberOrHex }),
  z.object({ __kind: z.literal('LiquidityProvision'), lpAccount: accountId }),
  z.object({ __kind: z.literal('CcmTransfer'), swapRequestId: numberOrHex }),
  z.object({
    __kind: z.literal('BoostersCredited'),
    prewitnessedDepositId: numberOrHex,
    networkFeeFromBoost: numberOrHex,
    networkFeeSwapRequestId: numberOrHex.nullish(),
  }),
  z.object({
    __kind: z.literal('Refund'),
    egressId: z.tuple([cfPrimitivesChainsForeignChain, numberOrHex]).nullish(),
    reason: palletCfAssethubIngressEgressRefundReason,
    amount: numberOrHex,
  }),
]);

export const palletCfAssethubIngressEgressDepositFailedReason = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('BelowMinimumDeposit') }),
  z.object({ __kind: z.literal('NotEnoughToPayFees') }),
  z.object({ __kind: z.literal('TransactionRejectedByBroker') }),
  z.object({ __kind: z.literal('DepositWitnessRejected'), value: spRuntimeDispatchError }),
]);

export const palletCfAssethubIngressEgressDepositWitnessAssethub = z.object({
  depositAddress: hexString,
  asset: cfPrimitivesChainsAssetsHubAsset,
  amount: numberOrHex,
  depositDetails: z.number(),
});

export const palletCfAssethubIngressEgressVaultDepositWitnessAssethub = z.object({
  inputAsset: cfPrimitivesChainsAssetsHubAsset,
  depositAddress: hexString.nullish(),
  channelId: numberOrHex.nullish(),
  depositAmount: numberOrHex,
  depositDetails: z.number(),
  outputAsset: cfPrimitivesChainsAssetsAnyAsset,
  destinationAddress: cfChainsAddressEncodedAddress,
  depositMetadata: cfChainsCcmDepositMetadataGenericForeignChainAddress.nullish(),
  txId: cfPrimitivesTxId,
  brokerFee: cfPrimitivesBeneficiaryAccountId32.nullish(),
  affiliateFees: z.array(cfPrimitivesBeneficiaryAffiliateShortId),
  refundParams: cfChainsChannelRefundParametersPolkadotAccountId,
  dcaParams: cfPrimitivesDcaParameters.nullish(),
  boostFee: z.number(),
});

export const palletCfAssethubIngressEgressDepositFailedDetailsAssethub = z.discriminatedUnion(
  '__kind',
  [
    z.object({
      __kind: z.literal('DepositChannelAssethub'),
      depositWitness: palletCfAssethubIngressEgressDepositWitnessAssethub,
    }),
    z.object({
      __kind: z.literal('VaultAssethub'),
      vaultWitness: palletCfAssethubIngressEgressVaultDepositWitnessAssethub,
    }),
  ],
);

export const cfTraitsScheduledEgressDetailsAssethub = z.object({
  egressId: z.tuple([cfPrimitivesChainsForeignChain, numberOrHex]),
  egressAmount: numberOrHex,
  feeWithheld: numberOrHex,
});

export const palletCfAssethubIngressEgressBoostPoolIdAssethub = z.object({
  asset: cfPrimitivesChainsAssetsHubAsset,
  tier: z.number(),
});

export const palletCfTradingStrategyTradingStrategy = z.object({
  __kind: z.literal('TickZeroCentered'),
  spreadTick: z.number(),
  baseAsset: cfPrimitivesChainsAssetsAnyAsset,
});

export const palletCfTradingStrategyPalletConfigUpdate = z.discriminatedUnion('__kind', [
  z.object({
    __kind: z.literal('MinimumDeploymentAmountForStrategy'),
    asset: cfPrimitivesChainsAssetsAnyAsset,
    amount: numberOrHex.nullish(),
  }),
  z.object({
    __kind: z.literal('MinimumAddedFundsToStrategy'),
    asset: cfPrimitivesChainsAssetsAnyAsset,
    amount: numberOrHex.nullish(),
  }),
  z.object({
    __kind: z.literal('LimitOrderUpdateThreshold'),
    asset: cfPrimitivesChainsAssetsAnyAsset,
    amount: numberOrHex,
  }),
]);
