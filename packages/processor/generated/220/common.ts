import { z } from 'zod';
import * as ss58 from '@chainflip/utils/ss58';

export const palletCfEmissionsPalletSafeMode = z.object({ emissionsSyncEnabled: z.boolean() });

export const palletCfFundingPalletSafeMode = z.object({ redeemEnabled: z.boolean() });

export const palletCfSwappingPalletSafeMode = z.object({
  swapsEnabled: z.boolean(),
  withdrawalsEnabled: z.boolean(),
  brokerRegistrationEnabled: z.boolean(),
  depositEnabled: z.boolean(),
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

export const cfTraitsSafeModeSafeModeSet = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('Green') }),
  z.object({ __kind: z.literal('Red') }),
  z.object({ __kind: z.literal('Amber'), value: z.array(cfPrimitivesChainsAssetsAnyAsset) }),
]);

export const palletCfLendingPoolsPalletSafeMode = z.object({
  addBoostFundsEnabled: z.boolean(),
  stopBoostingEnabled: z.boolean(),
  borrowing: cfTraitsSafeModeSafeModeSet,
  addLenderFunds: cfTraitsSafeModeSafeModeSet,
  withdrawLenderFunds: cfTraitsSafeModeSafeModeSet,
  liquidationsEnabled: z.boolean(),
});

export const palletCfReputationPalletSafeMode = z.object({ reportingEnabled: z.boolean() });

export const palletCfAssetBalancesPalletSafeMode = z.object({ reconciliationEnabled: z.boolean() });

export const palletCfThresholdSignaturePalletSafeMode = z.object({ slashingEnabled: z.boolean() });

export const palletCfBroadcastPalletSafeMode = z.object({
  retryEnabled: z.boolean(),
  egressWitnessingEnabled: z.boolean(),
});

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
  depositChannelCreationEnabled: z.boolean(),
  depositChannelWitnessingEnabled: z.boolean(),
  vaultDepositWitnessingEnabled: z.boolean(),
});

export const stateChainRuntimeChainflipWitnessingGenericElectionsGenericElectionsSafeMode =
  z.object({ oraclePriceElections: z.boolean() });

export const stateChainRuntimeChainflipWitnessingEthereumElectionsEthereumElectionsSafeMode =
  z.object({
    stateChainGatewayWitnessing: z.boolean(),
    keyManagerWitnessing: z.boolean(),
    scUtilsWitnessing: z.boolean(),
  });

export const stateChainRuntimeChainflipWitnessingArbitrumElectionsArbitrumElectionsSafeMode =
  z.object({ keyManagerWitnessing: z.boolean() });

export const stateChainRuntimeSafeModeInnerRuntimeSafeMode = z.object({
  emissions: palletCfEmissionsPalletSafeMode,
  funding: palletCfFundingPalletSafeMode,
  swapping: palletCfSwappingPalletSafeMode,
  liquidityProvider: palletCfLpPalletSafeMode,
  validator: palletCfValidatorPalletSafeMode,
  pools: palletCfPoolsPalletSafeMode,
  tradingStrategies: palletCfTradingStrategyPalletSafeMode,
  lendingPools: palletCfLendingPoolsPalletSafeMode,
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
  electionsGeneric: stateChainRuntimeChainflipWitnessingGenericElectionsGenericElectionsSafeMode,
  ethereumElections: stateChainRuntimeChainflipWitnessingEthereumElectionsEthereumElectionsSafeMode,
  arbitrumElections: stateChainRuntimeChainflipWitnessingArbitrumElectionsArbitrumElectionsSafeMode,
});

export const palletCfEnvironmentSafeModeUpdate = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('CodeRed') }),
  z.object({ __kind: z.literal('CodeGreen') }),
  z.object({
    __kind: z.literal('CodeAmber'),
    value: stateChainRuntimeSafeModeInnerRuntimeSafeMode,
  }),
]);

export const cfPrimitivesWitnessingTaskName = simpleEnum([
  'Ethereum',
  'Bitcoin',
  'Arbitrum',
  'Solana',
  'Assethub',
  'Oracle',
]);

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

export const numericString = z
  .string()
  .refine((v) => /^\d+$/.test(v), { message: 'Invalid numeric string' });

export const numberOrHex = z
  .union([z.number(), hexString, numericString])
  .transform((n) => BigInt(n));

export const cfChainsEvmTransaction = z.object({
  chainId: numberOrHex,
  maxPriorityFeePerGas: numberOrHex.nullish(),
  maxFeePerGas: numberOrHex.nullish(),
  gasLimit: numberOrHex.nullish(),
  contract: hexString,
  value: numberOrHex,
  data: hexString,
});

export const cfChainsDotPolkadotTransactionData = z.object({ encodedExtrinsic: hexString });

export const cfChainsBtcBitcoinTransactionData = z.object({ encodedTransaction: hexString });

export const cfPrimitivesChainsForeignChain = simpleEnum([
  'Ethereum',
  'Polkadot',
  'Bitcoin',
  'Arbitrum',
  'Solana',
  'Assethub',
]);

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

export const spRuntimeProvingTrieTrieError = simpleEnum([
  'InvalidStateRoot',
  'IncompleteDatabase',
  'ValueAtIncompleteKey',
  'DecoderError',
  'InvalidHash',
  'DuplicateKey',
  'ExtraneousNode',
  'ExtraneousValue',
  'ExtraneousHashReference',
  'InvalidChildReference',
  'ValueMismatch',
  'IncompleteProof',
  'RootMismatch',
  'DecodeError',
]);

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
  z.object({ __kind: z.literal('Trie'), value: spRuntimeProvingTrieTrieError }),
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
  z.object({ __kind: z.literal('DispatchError'), value: spRuntimeDispatchError }),
  z.object({ __kind: z.literal('AltsNotYetWitnessed') }),
  z.object({ __kind: z.literal('AltsInvalid') }),
]);

export const cfChainsExecutexSwapAndCallError = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('Unsupported') }),
  z.object({
    __kind: z.literal('FailedToBuildCcmForSolana'),
    value: cfChainsSolApiSolanaTransactionBuildingError,
  }),
  z.object({ __kind: z.literal('DispatchError'), value: spRuntimeDispatchError }),
  z.object({ __kind: z.literal('NoVault') }),
  z.object({ __kind: z.literal('AuxDataNotReady') }),
  z.object({ __kind: z.literal('NoChannelAvailable') }),
]);

export const cfPrimitivesChainsAssetsEthAsset = simpleEnum(['Eth', 'Flip', 'Usdc', 'Usdt', 'Wbtc']);

export const cfTraitsLendingBoostSource = simpleEnum(['LendingPool', 'BoostPool']);

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
  z.object({ __kind: z.literal('Unrefundable') }),
]);

export const cfChainsDepositOriginType = simpleEnum(['DepositChannel', 'Vault']);

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
  z.object({ __kind: z.literal('Unrefundable') }),
]);

export const cfChainsBtcScriptPubkey = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('P2PKH'), value: hexString }),
  z.object({ __kind: z.literal('P2SH'), value: hexString }),
  z.object({ __kind: z.literal('P2WPKH'), value: hexString }),
  z.object({ __kind: z.literal('P2WSH'), value: hexString }),
  z.object({ __kind: z.literal('Taproot'), value: hexString }),
  z.object({ __kind: z.literal('OtherSegwit'), version: z.number(), program: hexString }),
]);

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
  z.object({ __kind: z.literal('Unrefundable') }),
]);

export const cfPrimitivesChainsAssetsArbAsset = simpleEnum(['ArbEth', 'ArbUsdc', 'ArbUsdt']);

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
  z.object({ __kind: z.literal('Unrefundable') }),
]);

export const cfChainsSolSolanaTransactionData = z.object({
  serializedTransaction: hexString,
  skipPreflight: z.boolean(),
});

export const cfPrimitivesChainsAssetsSolAsset = simpleEnum(['Sol', 'SolUsdc', 'SolUsdt']);

export const cfChainsSolVaultSwapOrDepositChannelId = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('Channel'), value: hexString }),
  z.object({ __kind: z.literal('VaultSwapAccount'), value: z.tuple([hexString, numberOrHex]) }),
]);

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
  z.object({ __kind: z.literal('Unrefundable') }),
]);

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
  z.object({ __kind: z.literal('Unrefundable') }),
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

export const palletCfLendingPoolsBoostConfiguration = z.object({
  networkFeeDeductionFromBoostPercent: z.number(),
  minimumAddFundsAmount: z.array(z.tuple([cfPrimitivesChainsAssetsAnyAsset, numberOrHex])),
  minLendingPoolShare: z.number(),
});

export const palletCfLendingPoolsGeneralLendingConfigInterestRateConfiguration = z.object({
  interestAtZeroUtilisation: z.number(),
  junctionUtilisation: z.number(),
  interestAtJunctionUtilisation: z.number(),
  interestAtMaxUtilisation: z.number(),
});

export const palletCfLendingPoolsGeneralLendingConfigLendingPoolConfiguration = z.object({
  originationFee: z.number(),
  liquidationFee: z.number(),
  interestRateCurve: palletCfLendingPoolsGeneralLendingConfigInterestRateConfiguration,
});

export const palletCfLendingPoolsGeneralLendingConfigLtvThresholds = z.object({
  target: z.number(),
  topup: z.number().nullish(),
  softLiquidation: z.number(),
  softLiquidationAbort: z.number(),
  hardLiquidation: z.number(),
  hardLiquidationAbort: z.number(),
  lowLtv: z.number(),
});

export const palletCfLendingPoolsGeneralLendingConfigNetworkFeeContributions = z.object({
  extraInterest: z.number(),
  fromOriginationFee: z.number(),
  fromLiquidationFee: z.number(),
  lowLtvPenaltyMax: z.number(),
});

export const palletCfLendingPoolsPalletConfigUpdate = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('SetBoostConfig'), config: palletCfLendingPoolsBoostConfiguration }),
  z.object({
    __kind: z.literal('SetLendingPoolConfiguration'),
    asset: cfPrimitivesChainsAssetsAnyAsset.nullish(),
    config: palletCfLendingPoolsGeneralLendingConfigLendingPoolConfiguration.nullish(),
  }),
  z.object({
    __kind: z.literal('SetLtvThresholds'),
    ltvThresholds: palletCfLendingPoolsGeneralLendingConfigLtvThresholds,
  }),
  z.object({
    __kind: z.literal('SetNetworkFeeContributions'),
    contributions: palletCfLendingPoolsGeneralLendingConfigNetworkFeeContributions,
  }),
  z.object({ __kind: z.literal('SetFeeSwapIntervalBlocks'), value: z.number() }),
  z.object({ __kind: z.literal('SetInterestPaymentIntervalBlocks'), value: z.number() }),
  z.object({ __kind: z.literal('SetFeeSwapThresholdUsd'), value: numberOrHex }),
  z.object({ __kind: z.literal('SetInterestCollectionThresholdUsd'), value: numberOrHex }),
  z.object({
    __kind: z.literal('SetOracleSlippageForSwaps'),
    softLiquidation: z.number(),
    hardLiquidation: z.number(),
    feeSwap: z.number(),
  }),
  z.object({
    __kind: z.literal('SetLiquidationSwapChunkSizeUsd'),
    soft: numberOrHex,
    hard: numberOrHex,
  }),
  z.object({
    __kind: z.literal('SetMinimumAmounts'),
    minimumLoanAmountUsd: numberOrHex,
    minimumUpdateLoanAmountUsd: numberOrHex,
    minimumUpdateSupplyAmountUsd: numberOrHex,
    minimumSupplyAmountUsd: numberOrHex,
  }),
]);

export const palletCfLendingPoolsSupplyAddedActionType = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('Manual') }),
  z.object({ __kind: z.literal('SystemTopup') }),
  z.object({
    __kind: z.literal('SystemLiquidationExcessAmount'),
    loanId: numberOrHex,
    swapRequestId: numberOrHex,
  }),
  z.object({ __kind: z.literal('SystemLiquidationUnusedAmount') }),
]);

export const palletCfLendingPoolsSupplyRemovedActionType = simpleEnum([
  'Manual',
  'SystemLiquidation',
]);

export const palletCfLendingPoolsGeneralLendingLoanType = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('User'), value: accountId }),
  z.object({ __kind: z.literal('Boost'), value: numberOrHex }),
]);

export const palletCfLendingPoolsLoanRepaidActionType = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('Manual') }),
  z.object({ __kind: z.literal('Liquidation'), swapRequestId: numberOrHex }),
  z.object({ __kind: z.literal('BoostFinalisation') }),
]);
