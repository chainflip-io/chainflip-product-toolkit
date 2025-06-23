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

export const palletCfLendingPoolsPalletSafeMode = z.object({
  boostDepositsEnabled: z.boolean(),
  addBoostFundsEnabled: z.boolean(),
  stopBoostingEnabled: z.boolean(),
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
});

export const palletCfEnvironmentSafeModeUpdate = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('CodeRed') }),
  z.object({ __kind: z.literal('CodeGreen') }),
  z.object({
    __kind: z.literal('CodeAmber'),
    value: stateChainRuntimeSafeModeInnerRuntimeSafeMode,
  }),
]);

export const numericString = z
  .string()
  .refine((v) => /^\d+$/.test(v), { message: 'Invalid numeric string' });

export const hexString = z
  .string()
  .refine((v): v is `0x${string}` => /^0x[\da-f]*$/i.test(v), { message: 'Invalid hex string' });

export const numberOrHex = z
  .union([z.number(), hexString, numericString])
  .transform((n) => BigInt(n));

export const cfChainsSolApiSolanaGovCall = z.discriminatedUnion('__kind', [
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
  z.object({
    __kind: z.literal('UpgradeProgram'),
    programAddress: hexString,
    bufferAddress: hexString,
    spillAddress: hexString,
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

export const cfChainsSolSolTxCoreCcmAddress = z.object({
  pubkey: hexString,
  isWritable: z.boolean(),
});

export const cfChainsSolSolTxCoreCcmAccounts = z.object({
  cfReceiver: cfChainsSolSolTxCoreCcmAddress,
  additionalAccounts: z.array(cfChainsSolSolTxCoreCcmAddress),
  fallbackAddress: hexString,
});

export const cfChainsCcmCheckerVersionedSolanaCcmAdditionalData = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('V0'), value: cfChainsSolSolTxCoreCcmAccounts }),
  z.object({
    __kind: z.literal('V1'),
    ccmAccounts: cfChainsSolSolTxCoreCcmAccounts,
    alts: z.array(hexString),
  }),
]);

export const cfChainsCcmCheckerDecodedCcmAdditionalData = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('NotRequired') }),
  z.object({
    __kind: z.literal('Solana'),
    value: cfChainsCcmCheckerVersionedSolanaCcmAdditionalData,
  }),
]);

export const cfChainsCcmChannelMetadataDecodedCcmAdditionalData = z.object({
  message: hexString,
  gasBudget: numberOrHex,
  ccmAdditionalData: cfChainsCcmCheckerDecodedCcmAdditionalData,
});

export const cfPrimitivesChainsForeignChain = simpleEnum([
  'Ethereum',
  'Polkadot',
  'Bitcoin',
  'Arbitrum',
  'Solana',
  'Assethub',
]);

export const cfChainsCcmDepositMetadataEncodedAddress = z.object({
  channelMetadata: cfChainsCcmChannelMetadataDecodedCcmAdditionalData,
  sourceChain: cfPrimitivesChainsForeignChain,
  sourceAddress: cfChainsAddressEncodedAddress.nullish(),
});

export const cfTraitsSwappingSwapOutputActionGenericEncodedAddress = z.discriminatedUnion(
  '__kind',
  [
    z.object({
      __kind: z.literal('Egress'),
      ccmDepositMetadata: cfChainsCcmDepositMetadataEncodedAddress.nullish(),
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
  z.object({
    __kind: z.literal('SetNetworkFee'),
    rate: z.number().nullish(),
    minimum: numberOrHex.nullish(),
  }),
  z.object({
    __kind: z.literal('SetInternalSwapNetworkFee'),
    rate: z.number().nullish(),
    minimum: numberOrHex.nullish(),
  }),
  z.object({
    __kind: z.literal('SetNetworkFeeForAsset'),
    asset: cfPrimitivesChainsAssetsAnyAsset,
    rate: z.number().nullish(),
  }),
  z.object({
    __kind: z.literal('SetInternalSwapNetworkFeeForAsset'),
    asset: cfPrimitivesChainsAssetsAnyAsset,
    rate: z.number().nullish(),
  }),
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

export const cfPrimitivesChainsAssetsEthAsset = simpleEnum(['Eth', 'Flip', 'Usdc', 'Usdt']);

export const cfPrimitivesChainsAssetsDotAsset = simpleEnum(['Dot']);

export const cfPrimitivesChainsAssetsBtcAsset = simpleEnum(['Btc']);

export const cfChainsBtcScriptPubkey = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('P2PKH'), value: hexString }),
  z.object({ __kind: z.literal('P2SH'), value: hexString }),
  z.object({ __kind: z.literal('P2WPKH'), value: hexString }),
  z.object({ __kind: z.literal('P2WSH'), value: hexString }),
  z.object({ __kind: z.literal('Taproot'), value: hexString }),
  z.object({ __kind: z.literal('OtherSegwit'), version: z.number(), program: hexString }),
]);

export const cfPrimitivesChainsAssetsArbAsset = simpleEnum(['ArbEth', 'ArbUsdc']);

export const cfPrimitivesChainsAssetsSolAsset = simpleEnum(['Sol', 'SolUsdc']);

export const palletCfElectionsElectoralSystemsCompositeTuple7ImplsCompositeElectionIdentifierExtra =
  z.discriminatedUnion('__kind', [
    z.object({ __kind: z.literal('A') }),
    z.object({ __kind: z.literal('B'), value: z.number() }),
    z.object({ __kind: z.literal('C') }),
    z.object({ __kind: z.literal('D') }),
    z.object({ __kind: z.literal('EE') }),
    z.object({ __kind: z.literal('FF'), value: numberOrHex }),
    z.object({ __kind: z.literal('G') }),
  ]);

export const cfPrimitivesChainsAssetsHubAsset = simpleEnum(['HubDot', 'HubUsdt', 'HubUsdc']);

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
]);

export const palletCfLendingPoolsPalletConfigUpdate = z.object({
  __kind: z.literal('SetNetworkFeeDeductionFromBoost'),
  deductionPercent: z.number(),
});

export const palletCfLendingPoolsBoostPoolId = z.object({
  asset: cfPrimitivesChainsAssetsAnyAsset,
  tier: z.number(),
});
