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
  addBoostFundsEnabled: z.boolean(),
  stopBoostingEnabled: z.boolean(),
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

export const stateChainRuntimeChainflipGenericElectionsGenericElectionsSafeMode = z.object({
  oraclePriceElections: z.boolean(),
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
  electionsGeneric: stateChainRuntimeChainflipGenericElectionsGenericElectionsSafeMode,
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

export const accountId = z
  .union([
    hexString,
    z
      .string()
      .regex(/^[0-9a-f]+$/)
      .transform<`0x${string}`>((v) => `0x${v}`),
  ])
  .transform((value) => ss58.encode({ data: value, ss58Format: 2112 }));

export const numericString = z
  .string()
  .refine((v) => /^\d+$/.test(v), { message: 'Invalid numeric string' });

export const numberOrHex = z
  .union([z.number(), hexString, numericString])
  .transform((n) => BigInt(n));

export const palletCfFundingRedemptionAmount = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('Max') }),
  z.object({ __kind: z.literal('Exact'), value: numberOrHex }),
]);

export const stateChainRuntimeChainflipEthereumScCallsDelegationApi = z.discriminatedUnion(
  '__kind',
  [
    z.object({ __kind: z.literal('Delegate'), operator: accountId }),
    z.object({ __kind: z.literal('Undelegate') }),
    z.object({ __kind: z.literal('SetMaxBid'), maybeMaxBid: numberOrHex.nullish() }),
    z.object({
      __kind: z.literal('Redeem'),
      amount: palletCfFundingRedemptionAmount,
      address: hexString,
      executor: hexString.nullish(),
    }),
  ],
);

export const stateChainRuntimeChainflipEthereumScCallsEthereumSCApi = z.object({
  __kind: z.literal('Delegation'),
  value: stateChainRuntimeChainflipEthereumScCallsDelegationApi,
});

export const spWeightsWeightV2Weight = z.object({ refTime: numberOrHex, proofSize: numberOrHex });

export const simpleEnum = <U extends string, T extends readonly [U, ...U[]]>(values: T) =>
  z.object({ __kind: z.enum(values) }).transform(({ __kind }) => __kind!);

export const frameSupportDispatchPays = simpleEnum(['Yes', 'No']);

export const frameSupportDispatchPostDispatchInfo = z.object({
  actualWeight: spWeightsWeightV2Weight.nullish(),
  paysFee: frameSupportDispatchPays,
});

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

export const spRuntimeDispatchErrorWithPostInfo = z.object({
  postInfo: frameSupportDispatchPostDispatchInfo,
  error: spRuntimeDispatchError,
});

export const cfPrimitivesAccountRole = simpleEnum([
  'Unregistered',
  'Validator',
  'LiquidityProvider',
  'Broker',
  'Operator',
]);

export const palletCfValidatorDelegationDelegationAcceptance = simpleEnum(['Allow', 'Deny']);

export const palletCfValidatorDelegationOperatorSettings = z.object({
  feeBps: z.number(),
  delegationAcceptance: palletCfValidatorDelegationDelegationAcceptance,
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

export const cfChainsRefundParametersAccountOrAddress = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('InternalAccount'), value: accountId }),
  z.object({ __kind: z.literal('ExternalAddress'), value: cfChainsAddressForeignChainAddress }),
]);

export const cfChainsCcmDepositMetadataForeignChainAddress = z.object({
  channelMetadata: cfChainsCcmChannelMetadataDecodedCcmAdditionalData,
  sourceChain: cfPrimitivesChainsForeignChain,
  sourceAddress: cfChainsAddressForeignChainAddress.nullish(),
});

export const cfChainsRefundParametersChannelRefundParametersAccountOrAddress = z.object({
  retryDuration: z.number(),
  refundAddress: cfChainsRefundParametersAccountOrAddress,
  minPrice: numberOrHex,
  refundCcmMetadata: cfChainsCcmDepositMetadataForeignChainAddress.nullish(),
  maxOraclePriceSlippage: z.number().nullish(),
});

export const cfPrimitivesDcaParameters = z.object({
  numberOfChunks: z.number(),
  chunkInterval: z.number(),
});

export const cfChainsCcmChannelMetadataCcmAdditionalData = z.object({
  message: hexString,
  gasBudget: numberOrHex,
  ccmAdditionalData: hexString,
});

export const cfChainsRefundParametersChannelRefundParametersEncodedAddress = z.object({
  retryDuration: z.number(),
  refundAddress: cfChainsAddressEncodedAddress,
  minPrice: numberOrHex,
  refundCcmMetadata: cfChainsCcmChannelMetadataCcmAdditionalData.nullish(),
  maxOraclePriceSlippage: z.number().nullish(),
});

export const palletCfEthereumIngressEgressDepositFailedReason = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('BelowMinimumDeposit') }),
  z.object({ __kind: z.literal('NotEnoughToPayFees') }),
  z.object({ __kind: z.literal('TransactionRejectedByBroker') }),
  z.object({ __kind: z.literal('DepositWitnessRejected'), value: spRuntimeDispatchError }),
]);

export const cfPrimitivesChainsAssetsEthAsset = simpleEnum(['Eth', 'Flip', 'Usdc', 'Usdt']);

export const cfChainsEvmDepositDetails = z.object({ txHashes: z.array(hexString).nullish() });

export const palletCfEthereumIngressEgressDepositWitnessEthereum = z.object({
  depositAddress: hexString,
  asset: cfPrimitivesChainsAssetsEthAsset,
  amount: numberOrHex,
  depositDetails: cfChainsEvmDepositDetails,
});

export const cfChainsCcmDepositMetadata = z.object({
  channelMetadata: cfChainsCcmChannelMetadataCcmAdditionalData,
  sourceChain: cfPrimitivesChainsForeignChain,
  sourceAddress: cfChainsAddressForeignChainAddress.nullish(),
});

export const cfPrimitivesBeneficiaryAffiliateShortId = z.object({
  account: z.number(),
  bps: z.number(),
});

export const cfChainsRefundParametersChannelRefundParametersH160 = z.object({
  retryDuration: z.number(),
  refundAddress: hexString,
  minPrice: numberOrHex,
  refundCcmMetadata: cfChainsCcmChannelMetadataCcmAdditionalData.nullish(),
  maxOraclePriceSlippage: z.number().nullish(),
});

export const palletCfEthereumIngressEgressVaultDepositWitnessEthereum = z.object({
  inputAsset: cfPrimitivesChainsAssetsEthAsset,
  depositAddress: hexString.nullish(),
  channelId: numberOrHex.nullish(),
  depositAmount: numberOrHex,
  depositDetails: cfChainsEvmDepositDetails,
  outputAsset: cfPrimitivesChainsAssetsAnyAsset,
  destinationAddress: cfChainsAddressEncodedAddress,
  depositMetadata: cfChainsCcmDepositMetadata.nullish(),
  txId: hexString,
  brokerFee: cfPrimitivesBeneficiaryAccountId32.nullish(),
  affiliateFees: z.array(cfPrimitivesBeneficiaryAffiliateShortId),
  refundParams: cfChainsRefundParametersChannelRefundParametersH160,
  dcaParams: cfPrimitivesDcaParameters.nullish(),
  boostFee: z.number(),
});

export const palletCfEthereumIngressEgressDepositFailedDetailsEthereum = z.discriminatedUnion(
  '__kind',
  [
    z.object({
      __kind: z.literal('DepositFailedDepositChannelVariantEthereum'),
      depositWitness: palletCfEthereumIngressEgressDepositWitnessEthereum,
    }),
    z.object({
      __kind: z.literal('DepositFailedVaultVariantEthereum'),
      vaultWitness: palletCfEthereumIngressEgressVaultDepositWitnessEthereum,
    }),
  ],
);

export const palletCfEthereumIngressEgressPalletConfigUpdateEthereum = z.discriminatedUnion(
  '__kind',
  [
    z.object({ __kind: z.literal('ChannelOpeningFeeEthereum'), fee: numberOrHex }),
    z.object({
      __kind: z.literal('SetMinimumDepositEthereum'),
      asset: cfPrimitivesChainsAssetsEthAsset,
      minimumDeposit: numberOrHex,
    }),
    z.object({ __kind: z.literal('SetDepositChannelLifetimeEthereum'), lifetime: numberOrHex }),
    z.object({ __kind: z.literal('SetWitnessSafetyMarginEthereum'), margin: numberOrHex }),
    z.object({ __kind: z.literal('SetBoostDelayEthereum'), delayBlocks: z.number() }),
    z.object({
      __kind: z.literal('SetMaximumPreallocatedChannelsEthereum'),
      accountRole: cfPrimitivesAccountRole,
      numChannels: z.number(),
    }),
  ],
);

export const palletCfPolkadotIngressEgressDepositFailedReason = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('BelowMinimumDeposit') }),
  z.object({ __kind: z.literal('NotEnoughToPayFees') }),
  z.object({ __kind: z.literal('TransactionRejectedByBroker') }),
  z.object({ __kind: z.literal('DepositWitnessRejected'), value: spRuntimeDispatchError }),
]);

export const cfPrimitivesChainsAssetsDotAsset = simpleEnum(['Dot']);

export const palletCfPolkadotIngressEgressDepositWitnessPolkadot = z.object({
  depositAddress: hexString,
  asset: cfPrimitivesChainsAssetsDotAsset,
  amount: numberOrHex,
  depositDetails: z.number(),
});

export const cfChainsRefundParametersChannelRefundParametersPolkadotAccountId = z.object({
  retryDuration: z.number(),
  refundAddress: hexString,
  minPrice: numberOrHex,
  refundCcmMetadata: cfChainsCcmChannelMetadataCcmAdditionalData.nullish(),
  maxOraclePriceSlippage: z.number().nullish(),
});

export const palletCfPolkadotIngressEgressVaultDepositWitnessPolkadot = z.object({
  inputAsset: cfPrimitivesChainsAssetsDotAsset,
  depositAddress: hexString.nullish(),
  channelId: numberOrHex.nullish(),
  depositAmount: numberOrHex,
  depositDetails: z.number(),
  outputAsset: cfPrimitivesChainsAssetsAnyAsset,
  destinationAddress: cfChainsAddressEncodedAddress,
  depositMetadata: cfChainsCcmDepositMetadata.nullish(),
  txId: cfPrimitivesTxId,
  brokerFee: cfPrimitivesBeneficiaryAccountId32.nullish(),
  affiliateFees: z.array(cfPrimitivesBeneficiaryAffiliateShortId),
  refundParams: cfChainsRefundParametersChannelRefundParametersPolkadotAccountId,
  dcaParams: cfPrimitivesDcaParameters.nullish(),
  boostFee: z.number(),
});

export const palletCfPolkadotIngressEgressDepositFailedDetailsPolkadot = z.discriminatedUnion(
  '__kind',
  [
    z.object({
      __kind: z.literal('DepositFailedDepositChannelVariantPolkadot'),
      depositWitness: palletCfPolkadotIngressEgressDepositWitnessPolkadot,
    }),
    z.object({
      __kind: z.literal('DepositFailedVaultVariantPolkadot'),
      vaultWitness: palletCfPolkadotIngressEgressVaultDepositWitnessPolkadot,
    }),
  ],
);

export const palletCfPolkadotIngressEgressPalletConfigUpdatePolkadot = z.discriminatedUnion(
  '__kind',
  [
    z.object({ __kind: z.literal('ChannelOpeningFeePolkadot'), fee: numberOrHex }),
    z.object({
      __kind: z.literal('SetMinimumDepositPolkadot'),
      asset: cfPrimitivesChainsAssetsDotAsset,
      minimumDeposit: numberOrHex,
    }),
    z.object({ __kind: z.literal('SetDepositChannelLifetimePolkadot'), lifetime: z.number() }),
    z.object({ __kind: z.literal('SetWitnessSafetyMarginPolkadot'), margin: z.number() }),
    z.object({ __kind: z.literal('SetBoostDelayPolkadot'), delayBlocks: z.number() }),
    z.object({
      __kind: z.literal('SetMaximumPreallocatedChannelsPolkadot'),
      accountRole: cfPrimitivesAccountRole,
      numChannels: z.number(),
    }),
  ],
);

export const palletCfBitcoinIngressEgressDepositFailedReason = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('BelowMinimumDeposit') }),
  z.object({ __kind: z.literal('NotEnoughToPayFees') }),
  z.object({ __kind: z.literal('TransactionRejectedByBroker') }),
  z.object({ __kind: z.literal('DepositWitnessRejected'), value: spRuntimeDispatchError }),
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

export const palletCfBitcoinIngressEgressDepositWitnessBitcoin = z.object({
  depositAddress: cfChainsBtcScriptPubkey,
  asset: cfPrimitivesChainsAssetsBtcAsset,
  amount: numberOrHex,
  depositDetails: cfChainsBtcUtxo,
});

export const cfChainsRefundParametersChannelRefundParametersScriptPubkey = z.object({
  retryDuration: z.number(),
  refundAddress: cfChainsBtcScriptPubkey,
  minPrice: numberOrHex,
  refundCcmMetadata: cfChainsCcmChannelMetadataCcmAdditionalData.nullish(),
  maxOraclePriceSlippage: z.number().nullish(),
});

export const palletCfBitcoinIngressEgressVaultDepositWitnessBitcoin = z.object({
  inputAsset: cfPrimitivesChainsAssetsBtcAsset,
  depositAddress: cfChainsBtcScriptPubkey.nullish(),
  channelId: numberOrHex.nullish(),
  depositAmount: numberOrHex,
  depositDetails: cfChainsBtcUtxo,
  outputAsset: cfPrimitivesChainsAssetsAnyAsset,
  destinationAddress: cfChainsAddressEncodedAddress,
  depositMetadata: cfChainsCcmDepositMetadata.nullish(),
  txId: hexString,
  brokerFee: cfPrimitivesBeneficiaryAccountId32.nullish(),
  affiliateFees: z.array(cfPrimitivesBeneficiaryAffiliateShortId),
  refundParams: cfChainsRefundParametersChannelRefundParametersScriptPubkey,
  dcaParams: cfPrimitivesDcaParameters.nullish(),
  boostFee: z.number(),
});

export const palletCfBitcoinIngressEgressDepositFailedDetailsBitcoin = z.discriminatedUnion(
  '__kind',
  [
    z.object({
      __kind: z.literal('DepositFailedDepositChannelVariantBitcoin'),
      depositWitness: palletCfBitcoinIngressEgressDepositWitnessBitcoin,
    }),
    z.object({
      __kind: z.literal('DepositFailedVaultVariantBitcoin'),
      vaultWitness: palletCfBitcoinIngressEgressVaultDepositWitnessBitcoin,
    }),
  ],
);

export const palletCfBitcoinIngressEgressPalletConfigUpdateBitcoin = z.discriminatedUnion(
  '__kind',
  [
    z.object({ __kind: z.literal('ChannelOpeningFeeBitcoin'), fee: numberOrHex }),
    z.object({
      __kind: z.literal('SetMinimumDepositBitcoin'),
      asset: cfPrimitivesChainsAssetsBtcAsset,
      minimumDeposit: numberOrHex,
    }),
    z.object({ __kind: z.literal('SetDepositChannelLifetimeBitcoin'), lifetime: numberOrHex }),
    z.object({ __kind: z.literal('SetWitnessSafetyMarginBitcoin'), margin: numberOrHex }),
    z.object({ __kind: z.literal('SetBoostDelayBitcoin'), delayBlocks: z.number() }),
    z.object({
      __kind: z.literal('SetMaximumPreallocatedChannelsBitcoin'),
      accountRole: cfPrimitivesAccountRole,
      numChannels: z.number(),
    }),
  ],
);

export const palletCfArbitrumIngressEgressDepositFailedReason = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('BelowMinimumDeposit') }),
  z.object({ __kind: z.literal('NotEnoughToPayFees') }),
  z.object({ __kind: z.literal('TransactionRejectedByBroker') }),
  z.object({ __kind: z.literal('DepositWitnessRejected'), value: spRuntimeDispatchError }),
]);

export const cfPrimitivesChainsAssetsArbAsset = simpleEnum(['ArbEth', 'ArbUsdc']);

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
  depositMetadata: cfChainsCcmDepositMetadata.nullish(),
  txId: hexString,
  brokerFee: cfPrimitivesBeneficiaryAccountId32.nullish(),
  affiliateFees: z.array(cfPrimitivesBeneficiaryAffiliateShortId),
  refundParams: cfChainsRefundParametersChannelRefundParametersH160,
  dcaParams: cfPrimitivesDcaParameters.nullish(),
  boostFee: z.number(),
});

export const palletCfArbitrumIngressEgressDepositFailedDetailsArbitrum = z.discriminatedUnion(
  '__kind',
  [
    z.object({
      __kind: z.literal('DepositFailedDepositChannelVariantArbitrum'),
      depositWitness: palletCfArbitrumIngressEgressDepositWitnessArbitrum,
    }),
    z.object({
      __kind: z.literal('DepositFailedVaultVariantArbitrum'),
      vaultWitness: palletCfArbitrumIngressEgressVaultDepositWitnessArbitrum,
    }),
  ],
);

export const palletCfArbitrumIngressEgressPalletConfigUpdateArbitrum = z.discriminatedUnion(
  '__kind',
  [
    z.object({ __kind: z.literal('ChannelOpeningFeeArbitrum'), fee: numberOrHex }),
    z.object({
      __kind: z.literal('SetMinimumDepositArbitrum'),
      asset: cfPrimitivesChainsAssetsArbAsset,
      minimumDeposit: numberOrHex,
    }),
    z.object({ __kind: z.literal('SetDepositChannelLifetimeArbitrum'), lifetime: numberOrHex }),
    z.object({ __kind: z.literal('SetWitnessSafetyMarginArbitrum'), margin: numberOrHex }),
    z.object({ __kind: z.literal('SetBoostDelayArbitrum'), delayBlocks: z.number() }),
    z.object({
      __kind: z.literal('SetMaximumPreallocatedChannelsArbitrum'),
      accountRole: cfPrimitivesAccountRole,
      numChannels: z.number(),
    }),
  ],
);

export const palletCfSolanaIngressEgressDepositFailedReason = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('BelowMinimumDeposit') }),
  z.object({ __kind: z.literal('NotEnoughToPayFees') }),
  z.object({ __kind: z.literal('TransactionRejectedByBroker') }),
  z.object({ __kind: z.literal('DepositWitnessRejected'), value: spRuntimeDispatchError }),
]);

export const cfPrimitivesChainsAssetsSolAsset = simpleEnum(['Sol', 'SolUsdc']);

export const palletCfSolanaIngressEgressDepositWitnessSolana = z.object({
  depositAddress: hexString,
  asset: cfPrimitivesChainsAssetsSolAsset,
  amount: numberOrHex,
});

export const cfChainsRefundParametersChannelRefundParametersAddress = z.object({
  retryDuration: z.number(),
  refundAddress: hexString,
  minPrice: numberOrHex,
  refundCcmMetadata: cfChainsCcmChannelMetadataCcmAdditionalData.nullish(),
  maxOraclePriceSlippage: z.number().nullish(),
});

export const palletCfSolanaIngressEgressVaultDepositWitnessSolana = z.object({
  inputAsset: cfPrimitivesChainsAssetsSolAsset,
  depositAddress: hexString.nullish(),
  channelId: numberOrHex.nullish(),
  depositAmount: numberOrHex,
  outputAsset: cfPrimitivesChainsAssetsAnyAsset,
  destinationAddress: cfChainsAddressEncodedAddress,
  depositMetadata: cfChainsCcmDepositMetadata.nullish(),
  txId: z.tuple([hexString, numberOrHex]),
  brokerFee: cfPrimitivesBeneficiaryAccountId32.nullish(),
  affiliateFees: z.array(cfPrimitivesBeneficiaryAffiliateShortId),
  refundParams: cfChainsRefundParametersChannelRefundParametersAddress,
  dcaParams: cfPrimitivesDcaParameters.nullish(),
  boostFee: z.number(),
});

export const palletCfSolanaIngressEgressDepositFailedDetailsSolana = z.discriminatedUnion(
  '__kind',
  [
    z.object({
      __kind: z.literal('DepositFailedDepositChannelVariantSolana'),
      depositWitness: palletCfSolanaIngressEgressDepositWitnessSolana,
    }),
    z.object({
      __kind: z.literal('DepositFailedVaultVariantSolana'),
      vaultWitness: palletCfSolanaIngressEgressVaultDepositWitnessSolana,
    }),
  ],
);

export const palletCfSolanaIngressEgressPalletConfigUpdateSolana = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('ChannelOpeningFeeSolana'), fee: numberOrHex }),
  z.object({
    __kind: z.literal('SetMinimumDepositSolana'),
    asset: cfPrimitivesChainsAssetsSolAsset,
    minimumDeposit: numberOrHex,
  }),
  z.object({ __kind: z.literal('SetDepositChannelLifetimeSolana'), lifetime: numberOrHex }),
  z.object({ __kind: z.literal('SetWitnessSafetyMarginSolana'), margin: numberOrHex }),
  z.object({ __kind: z.literal('SetBoostDelaySolana'), delayBlocks: z.number() }),
  z.object({
    __kind: z.literal('SetMaximumPreallocatedChannelsSolana'),
    accountRole: cfPrimitivesAccountRole,
    numChannels: z.number(),
  }),
]);

export const palletCfAssethubIngressEgressDepositFailedReason = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('BelowMinimumDeposit') }),
  z.object({ __kind: z.literal('NotEnoughToPayFees') }),
  z.object({ __kind: z.literal('TransactionRejectedByBroker') }),
  z.object({ __kind: z.literal('DepositWitnessRejected'), value: spRuntimeDispatchError }),
]);

export const cfPrimitivesChainsAssetsHubAsset = simpleEnum(['HubDot', 'HubUsdt', 'HubUsdc']);

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
  depositMetadata: cfChainsCcmDepositMetadata.nullish(),
  txId: cfPrimitivesTxId,
  brokerFee: cfPrimitivesBeneficiaryAccountId32.nullish(),
  affiliateFees: z.array(cfPrimitivesBeneficiaryAffiliateShortId),
  refundParams: cfChainsRefundParametersChannelRefundParametersPolkadotAccountId,
  dcaParams: cfPrimitivesDcaParameters.nullish(),
  boostFee: z.number(),
});

export const palletCfAssethubIngressEgressDepositFailedDetailsAssethub = z.discriminatedUnion(
  '__kind',
  [
    z.object({
      __kind: z.literal('DepositFailedDepositChannelVariantAssethub'),
      depositWitness: palletCfAssethubIngressEgressDepositWitnessAssethub,
    }),
    z.object({
      __kind: z.literal('DepositFailedVaultVariantAssethub'),
      vaultWitness: palletCfAssethubIngressEgressVaultDepositWitnessAssethub,
    }),
  ],
);

export const palletCfAssethubIngressEgressPalletConfigUpdateAssethub = z.discriminatedUnion(
  '__kind',
  [
    z.object({ __kind: z.literal('ChannelOpeningFeeAssethub'), fee: numberOrHex }),
    z.object({
      __kind: z.literal('SetMinimumDepositAssethub'),
      asset: cfPrimitivesChainsAssetsHubAsset,
      minimumDeposit: numberOrHex,
    }),
    z.object({ __kind: z.literal('SetDepositChannelLifetimeAssethub'), lifetime: z.number() }),
    z.object({ __kind: z.literal('SetWitnessSafetyMarginAssethub'), margin: z.number() }),
    z.object({ __kind: z.literal('SetBoostDelayAssethub'), delayBlocks: z.number() }),
    z.object({
      __kind: z.literal('SetMaximumPreallocatedChannelsAssethub'),
      accountRole: cfPrimitivesAccountRole,
      numChannels: z.number(),
    }),
  ],
);

export const palletCfElectionsElectoralSystemsCompositeTuple1ImplsCompositeElectionIdentifierExtra =
  simpleEnum(['A']);

export const palletCfElectionsElectoralSystemsOraclePricePricePriceAsset = simpleEnum([
  'Btc',
  'Eth',
  'Sol',
  'Usdc',
  'Usdt',
  'Usd',
  'Fine',
]);

export const stateChainRuntimeChainflipGenericElectionsOraclePriceUpdate = z.object({
  price: numberOrHex,
  baseAsset: palletCfElectionsElectoralSystemsOraclePricePricePriceAsset,
  quoteAsset: palletCfElectionsElectoralSystemsOraclePricePricePriceAsset,
  updatedAtOracleTimestamp: numberOrHex,
});

export const stateChainRuntimeChainflipGenericElectionsGenericElectoralEvents = z.object({
  __kind: z.literal('OraclePricesUpdated'),
  prices: z.array(stateChainRuntimeChainflipGenericElectionsOraclePriceUpdate),
});
