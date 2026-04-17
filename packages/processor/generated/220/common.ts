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
  'Trx',
  'TrxUsdt',
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
  addCollateral: cfTraitsSafeModeSafeModeSet,
  removeCollateral: cfTraitsSafeModeSafeModeSet,
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
  tronBroadcast: z.boolean(),
  tronChainTracking: z.boolean(),
  tronIngressEgress: z.boolean(),
  tronVault: z.boolean(),
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

export const stateChainRuntimeChainflipWitnessingTronElectionsTronElectionsSafeMode = z.object({
  keyManagerWitnessing: z.boolean(),
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
  broadcastTron: palletCfBroadcastPalletSafeMode,
  witnesser: palletCfWitnesserPalletSafeMode,
  ingressEgressEthereum: palletCfIngressEgressPalletSafeMode,
  ingressEgressBitcoin: palletCfIngressEgressPalletSafeMode,
  ingressEgressPolkadot: palletCfIngressEgressPalletSafeMode,
  ingressEgressArbitrum: palletCfIngressEgressPalletSafeMode,
  ingressEgressSolana: palletCfIngressEgressPalletSafeMode,
  ingressEgressAssethub: palletCfIngressEgressPalletSafeMode,
  ingressEgressTron: palletCfIngressEgressPalletSafeMode,
  electionsGeneric: stateChainRuntimeChainflipWitnessingGenericElectionsGenericElectionsSafeMode,
  ethereumElections: stateChainRuntimeChainflipWitnessingEthereumElectionsEthereumElectionsSafeMode,
  arbitrumElections: stateChainRuntimeChainflipWitnessingArbitrumElectionsArbitrumElectionsSafeMode,
  tronElections: stateChainRuntimeChainflipWitnessingTronElectionsTronElectionsSafeMode,
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

export const cfPrimitivesChainsForeignChain = simpleEnum([
  'Ethereum',
  'Polkadot',
  'Bitcoin',
  'Arbitrum',
  'Solana',
  'Assethub',
  'Tron',
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

export const cfTraitsFundingSource = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('EthTransaction'), txHash: hexString, funder: hexString }),
  z.object({ __kind: z.literal('Swap'), swapRequestId: numberOrHex }),
  z.object({
    __kind: z.literal('InitialFunding'),
    channelId: numberOrHex.nullish(),
    asset: cfPrimitivesChainsAssetsAnyAsset,
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

export const palletCfTokenholderGovernanceProposal = z.discriminatedUnion('__kind', [
  z.object({
    __kind: z.literal('SetGovernanceKey'),
    value: z.tuple([cfPrimitivesChainsForeignChain, hexString]),
  }),
  z.object({ __kind: z.literal('SetCommunityKey'), value: hexString }),
]);

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

export const cfChainsAddressEncodedAddress = z
  .object({ __kind: z.enum(['Eth', 'Dot', 'Btc', 'Arb', 'Sol', 'Hub', 'Tron']), value: hexString })
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
      case 'Tron':
        return { chain: 'Tron', address: base58.encode(hexToBytes(value)) } as const;
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

export const cfChainsCcmDepositMetadataEncodedAddress = z.object({
  channelMetadata: cfChainsCcmChannelMetadataDecodedCcmAdditionalData,
  sourceChain: cfPrimitivesChainsForeignChain,
  sourceAddress: cfChainsAddressEncodedAddress.nullish(),
});

export const cfTraitsSwappingLendingSwapType = z.object({
  __kind: z.literal('Liquidation'),
  borrowerId: accountId,
  loanId: numberOrHex,
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
    z.object({ __kind: z.literal('CreditLendingPool'), swapType: cfTraitsSwappingLendingSwapType }),
    z.object({
      __kind: z.literal('CreditFlipAndTransferToGateway'),
      accountId,
      flipToSubtractFromSwapOutput: numberOrHex,
    }),
  ],
);

export const cfTraitsSwappingSwapRequestTypeGeneric = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('NetworkFee') }),
  z.object({ __kind: z.literal('IngressEgressFee') }),
  z.object({
    __kind: z.literal('Regular'),
    outputAction: cfTraitsSwappingSwapOutputActionGenericEncodedAddress,
  }),
  z.object({
    __kind: z.literal('RegularNoNetworkFee'),
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
  z.object({ __kind: z.literal('Tron'), value: hexString }),
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

export const cfTraitsSwappingExpiryBehaviour = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('NoExpiry') }),
  z.object({
    __kind: z.literal('RefundIfExpires'),
    retryDuration: z.number(),
    refundAddress: cfChainsRefundParametersAccountOrAddress,
    refundCcmMetadata: cfChainsCcmDepositMetadataForeignChainAddress.nullish(),
  }),
]);

export const cfTraitsSwappingPriceLimitsAndExpiry = z.object({
  expiryBehaviour: cfTraitsSwappingExpiryBehaviour,
  minPrice: numberOrHex,
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

export const cfChainsRefundParametersChannelRefundParameters = z.object({
  retryDuration: z.number(),
  refundAddress: cfChainsAddressEncodedAddress,
  minPrice: numberOrHex,
  refundCcmMetadata: cfChainsCcmChannelMetadataCcmAdditionalData.nullish(),
  maxOraclePriceSlippage: z.number().nullish(),
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
  z.object({
    __kind: z.literal('SetDefaultOraclePriceSlippageProtectionForAsset'),
    baseAsset: cfPrimitivesChainsAssetsAnyAsset,
    quoteAsset: cfPrimitivesChainsAssetsAnyAsset,
    bps: z.number().nullish(),
  }),
]);

export const cfPrimitivesChainsAssetsEthAsset = simpleEnum(['Eth', 'Flip', 'Usdc', 'Usdt', 'Wbtc']);

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

export const palletCfEthereumIngressEgressDepositFailedReason = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('BelowMinimumDeposit') }),
  z.object({ __kind: z.literal('NotEnoughToPayFees') }),
  z.object({ __kind: z.literal('TransactionRejectedByBroker') }),
  z.object({ __kind: z.literal('DepositWitnessRejected'), value: spRuntimeDispatchError }),
  z.object({ __kind: z.literal('Unrefundable') }),
]);

export const palletCfEthereumIngressEgressDepositWitnessEthereum = z.object({
  depositAddress: hexString,
  asset: cfPrimitivesChainsAssetsEthAsset,
  amount: numberOrHex,
  depositDetails: cfChainsEvmDepositDetails,
});

export const cfEthereumChainCcmDepositMetadata = z.object({
  channelMetadata: cfChainsCcmChannelMetadataCcmAdditionalData,
  sourceChain: cfPrimitivesChainsForeignChain,
  sourceAddress: cfChainsAddressForeignChainAddress.nullish(),
});

export const cfPrimitivesBeneficiaryAffiliateShortId = z.object({
  account: z.number(),
  bps: z.number(),
});

export const cfEthereumChainRefundParametersChannelRefundParameters = z.object({
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
  depositMetadata: cfEthereumChainCcmDepositMetadata.nullish(),
  txId: hexString,
  brokerFee: cfPrimitivesBeneficiaryAccountId32.nullish(),
  affiliateFees: z.array(cfPrimitivesBeneficiaryAffiliateShortId),
  refundParams: cfEthereumChainRefundParametersChannelRefundParameters,
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

export const cfTraitsScheduledEgressDetailsEthereum = z.object({
  egressId: z.tuple([cfPrimitivesChainsForeignChain, numberOrHex]),
  egressAmount: numberOrHex,
  feeWithheld: numberOrHex,
});

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

export const palletCfPolkadotIngressEgressDepositFailedReason = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('BelowMinimumDeposit') }),
  z.object({ __kind: z.literal('NotEnoughToPayFees') }),
  z.object({ __kind: z.literal('TransactionRejectedByBroker') }),
  z.object({ __kind: z.literal('DepositWitnessRejected'), value: spRuntimeDispatchError }),
  z.object({ __kind: z.literal('Unrefundable') }),
]);

export const palletCfPolkadotIngressEgressDepositWitnessPolkadot = z.object({
  depositAddress: hexString,
  asset: cfPrimitivesChainsAssetsDotAsset,
  amount: numberOrHex,
  depositDetails: z.number(),
});

export const cfPolkadotChainCcmDepositMetadata = z.object({
  channelMetadata: cfChainsCcmChannelMetadataCcmAdditionalData,
  sourceChain: cfPrimitivesChainsForeignChain,
  sourceAddress: cfChainsAddressForeignChainAddress.nullish(),
});

export const cfPolkadotChainRefundParametersChannelRefundParameters = z.object({
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
  depositMetadata: cfPolkadotChainCcmDepositMetadata.nullish(),
  txId: cfPrimitivesTxId,
  brokerFee: cfPrimitivesBeneficiaryAccountId32.nullish(),
  affiliateFees: z.array(cfPrimitivesBeneficiaryAffiliateShortId),
  refundParams: cfPolkadotChainRefundParametersChannelRefundParameters,
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
  z.object({ __kind: z.literal('Unrefundable') }),
]);

export const palletCfBitcoinIngressEgressDepositFailedReason = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('BelowMinimumDeposit') }),
  z.object({ __kind: z.literal('NotEnoughToPayFees') }),
  z.object({ __kind: z.literal('TransactionRejectedByBroker') }),
  z.object({ __kind: z.literal('DepositWitnessRejected'), value: spRuntimeDispatchError }),
  z.object({ __kind: z.literal('Unrefundable') }),
]);

export const palletCfBitcoinIngressEgressDepositWitnessBitcoin = z.object({
  depositAddress: cfChainsBtcScriptPubkey,
  asset: cfPrimitivesChainsAssetsBtcAsset,
  amount: numberOrHex,
  depositDetails: cfChainsBtcUtxo,
});

export const cfBitcoinChainCcmDepositMetadata = z.object({
  channelMetadata: cfChainsCcmChannelMetadataCcmAdditionalData,
  sourceChain: cfPrimitivesChainsForeignChain,
  sourceAddress: cfChainsAddressForeignChainAddress.nullish(),
});

export const cfBitcoinChainRefundParametersChannelRefundParameters = z.object({
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
  depositMetadata: cfBitcoinChainCcmDepositMetadata.nullish(),
  txId: hexString,
  brokerFee: cfPrimitivesBeneficiaryAccountId32.nullish(),
  affiliateFees: z.array(cfPrimitivesBeneficiaryAffiliateShortId),
  refundParams: cfBitcoinChainRefundParametersChannelRefundParameters,
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

export const cfAmmCommonAssetPair = z.object({ assets: cfAmmCommonPoolPairsMap });

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

export const palletCfArbitrumIngressEgressDepositFailedReason = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('BelowMinimumDeposit') }),
  z.object({ __kind: z.literal('NotEnoughToPayFees') }),
  z.object({ __kind: z.literal('TransactionRejectedByBroker') }),
  z.object({ __kind: z.literal('DepositWitnessRejected'), value: spRuntimeDispatchError }),
  z.object({ __kind: z.literal('Unrefundable') }),
]);

export const palletCfArbitrumIngressEgressDepositWitnessArbitrum = z.object({
  depositAddress: hexString,
  asset: cfPrimitivesChainsAssetsArbAsset,
  amount: numberOrHex,
  depositDetails: cfChainsEvmDepositDetails,
});

export const cfArbitrumChainCcmDepositMetadata = z.object({
  channelMetadata: cfChainsCcmChannelMetadataCcmAdditionalData,
  sourceChain: cfPrimitivesChainsForeignChain,
  sourceAddress: cfChainsAddressForeignChainAddress.nullish(),
});

export const cfArbitrumChainRefundParametersChannelRefundParameters = z.object({
  retryDuration: z.number(),
  refundAddress: hexString,
  minPrice: numberOrHex,
  refundCcmMetadata: cfChainsCcmChannelMetadataCcmAdditionalData.nullish(),
  maxOraclePriceSlippage: z.number().nullish(),
});

export const palletCfArbitrumIngressEgressVaultDepositWitnessArbitrum = z.object({
  inputAsset: cfPrimitivesChainsAssetsArbAsset,
  depositAddress: hexString.nullish(),
  channelId: numberOrHex.nullish(),
  depositAmount: numberOrHex,
  depositDetails: cfChainsEvmDepositDetails,
  outputAsset: cfPrimitivesChainsAssetsAnyAsset,
  destinationAddress: cfChainsAddressEncodedAddress,
  depositMetadata: cfArbitrumChainCcmDepositMetadata.nullish(),
  txId: hexString,
  brokerFee: cfPrimitivesBeneficiaryAccountId32.nullish(),
  affiliateFees: z.array(cfPrimitivesBeneficiaryAffiliateShortId),
  refundParams: cfArbitrumChainRefundParametersChannelRefundParameters,
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

export const cfTraitsScheduledEgressDetailsArbitrum = z.object({
  egressId: z.tuple([cfPrimitivesChainsForeignChain, numberOrHex]),
  egressAmount: numberOrHex,
  feeWithheld: numberOrHex,
});

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

export const palletCfSolanaIngressEgressDepositFailedReason = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('BelowMinimumDeposit') }),
  z.object({ __kind: z.literal('NotEnoughToPayFees') }),
  z.object({ __kind: z.literal('TransactionRejectedByBroker') }),
  z.object({ __kind: z.literal('DepositWitnessRejected'), value: spRuntimeDispatchError }),
  z.object({ __kind: z.literal('Unrefundable') }),
]);

export const palletCfSolanaIngressEgressDepositWitnessSolana = z.object({
  depositAddress: hexString,
  asset: cfPrimitivesChainsAssetsSolAsset,
  amount: numberOrHex,
  depositDetails: cfChainsSolVaultSwapOrDepositChannelId,
});

export const cfSolanaChainCcmDepositMetadata = z.object({
  channelMetadata: cfChainsCcmChannelMetadataCcmAdditionalData,
  sourceChain: cfPrimitivesChainsForeignChain,
  sourceAddress: cfChainsAddressForeignChainAddress.nullish(),
});

export const cfSolanaChainRefundParametersChannelRefundParameters = z.object({
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
  depositDetails: cfChainsSolVaultSwapOrDepositChannelId,
  outputAsset: cfPrimitivesChainsAssetsAnyAsset,
  destinationAddress: cfChainsAddressEncodedAddress,
  depositMetadata: cfSolanaChainCcmDepositMetadata.nullish(),
  txId: z.tuple([hexString, numberOrHex]),
  brokerFee: cfPrimitivesBeneficiaryAccountId32.nullish(),
  affiliateFees: z.array(cfPrimitivesBeneficiaryAffiliateShortId),
  refundParams: cfSolanaChainRefundParametersChannelRefundParameters,
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

export const cfTraitsScheduledEgressDetailsSolana = z.object({
  egressId: z.tuple([cfPrimitivesChainsForeignChain, numberOrHex]),
  egressAmount: numberOrHex,
  feeWithheld: numberOrHex,
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
  z.object({ __kind: z.literal('Unrefundable') }),
]);

export const palletCfAssethubIngressEgressDepositFailedReason = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('BelowMinimumDeposit') }),
  z.object({ __kind: z.literal('NotEnoughToPayFees') }),
  z.object({ __kind: z.literal('TransactionRejectedByBroker') }),
  z.object({ __kind: z.literal('DepositWitnessRejected'), value: spRuntimeDispatchError }),
  z.object({ __kind: z.literal('Unrefundable') }),
]);

export const palletCfAssethubIngressEgressDepositWitnessAssethub = z.object({
  depositAddress: hexString,
  asset: cfPrimitivesChainsAssetsHubAsset,
  amount: numberOrHex,
  depositDetails: z.number(),
});

export const cfAssethubChainCcmDepositMetadata = z.object({
  channelMetadata: cfChainsCcmChannelMetadataCcmAdditionalData,
  sourceChain: cfPrimitivesChainsForeignChain,
  sourceAddress: cfChainsAddressForeignChainAddress.nullish(),
});

export const cfAssethubChainRefundParametersChannelRefundParameters = z.object({
  retryDuration: z.number(),
  refundAddress: hexString,
  minPrice: numberOrHex,
  refundCcmMetadata: cfChainsCcmChannelMetadataCcmAdditionalData.nullish(),
  maxOraclePriceSlippage: z.number().nullish(),
});

export const palletCfAssethubIngressEgressVaultDepositWitnessAssethub = z.object({
  inputAsset: cfPrimitivesChainsAssetsHubAsset,
  depositAddress: hexString.nullish(),
  channelId: numberOrHex.nullish(),
  depositAmount: numberOrHex,
  depositDetails: z.number(),
  outputAsset: cfPrimitivesChainsAssetsAnyAsset,
  destinationAddress: cfChainsAddressEncodedAddress,
  depositMetadata: cfAssethubChainCcmDepositMetadata.nullish(),
  txId: cfPrimitivesTxId,
  brokerFee: cfPrimitivesBeneficiaryAccountId32.nullish(),
  affiliateFees: z.array(cfPrimitivesBeneficiaryAffiliateShortId),
  refundParams: cfAssethubChainRefundParametersChannelRefundParameters,
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

export const cfTraitsScheduledEgressDetailsAssethub = z.object({
  egressId: z.tuple([cfPrimitivesChainsForeignChain, numberOrHex]),
  egressAmount: numberOrHex,
  feeWithheld: numberOrHex,
});

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

export const palletCfLendingPoolsBoostConfiguration = z.object({
  networkFeeDeductionFromBoostPercent: z.number(),
  minimumAddFundsAmount: z.array(z.tuple([cfPrimitivesChainsAssetsAnyAsset, numberOrHex])),
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
    minimumUpdateCollateralAmountUsd: numberOrHex,
    minimumSupplyAmountUsd: numberOrHex,
  }),
]);

export const palletCfLendingPoolsBoostBoostPoolId = z.object({
  asset: cfPrimitivesChainsAssetsAnyAsset,
  tier: z.number(),
});

export const palletCfLendingPoolsCollateralAddedActionType = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('Manual') }),
  z.object({ __kind: z.literal('SystemTopup') }),
  z.object({
    __kind: z.literal('SystemLiquidationExcessAmount'),
    loanId: numberOrHex,
    swapRequestId: numberOrHex,
  }),
]);

export const cfChainsChainStateTron = z.object({ blockHeight: numberOrHex });

export const cfChainsEvmParityBit = simpleEnum(['Odd', 'Even']);

export const cfChainsEvmAggKey = z.object({
  pubKeyX: hexString,
  pubKeyYParity: cfChainsEvmParityBit,
});

export const cfChainsTronTronTransaction = z.object({
  feeLimit: numberOrHex.nullish(),
  contract: hexString,
  value: numberOrHex,
  data: hexString,
  functionSelector: hexString,
});

export const cfChainsEvmSchnorrVerificationComponents = z.object({
  s: hexString,
  kTimesGAddress: hexString,
});

export const palletCfBroadcastPalletConfigUpdate = z.object({
  __kind: z.literal('BroadcastTimeout'),
  blocks: z.number(),
});

export const cfPrimitivesChainsAssetsTronAsset = simpleEnum(['Trx', 'TrxUsdt']);

export const palletCfTronIngressEgressRefundReason = simpleEnum([
  'InvalidBrokerFees',
  'InvalidRefundParameters',
  'InvalidDcaParameters',
  'CcmUnsupportedForTargetChain',
  'CcmInvalidMetadata',
  'InvalidDestinationAddress',
]);

export const palletCfTronIngressEgressDepositAction = z.discriminatedUnion('__kind', [
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
    reason: palletCfTronIngressEgressRefundReason,
    amount: numberOrHex,
  }),
  z.object({ __kind: z.literal('Unrefundable') }),
]);

export const palletCfTronIngressEgressDepositFailedReason = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('BelowMinimumDeposit') }),
  z.object({ __kind: z.literal('NotEnoughToPayFees') }),
  z.object({ __kind: z.literal('TransactionRejectedByBroker') }),
  z.object({ __kind: z.literal('DepositWitnessRejected'), value: spRuntimeDispatchError }),
  z.object({ __kind: z.literal('Unrefundable') }),
]);

export const palletCfTronIngressEgressDepositWitnessTron = z.object({
  depositAddress: hexString,
  asset: cfPrimitivesChainsAssetsTronAsset,
  amount: numberOrHex,
  depositDetails: cfChainsEvmDepositDetails,
});

export const cfTronChainCcmDepositMetadata = z.object({
  channelMetadata: cfChainsCcmChannelMetadataCcmAdditionalData,
  sourceChain: cfPrimitivesChainsForeignChain,
  sourceAddress: cfChainsAddressForeignChainAddress.nullish(),
});

export const cfTronChainRefundParametersChannelRefundParameters = z.object({
  retryDuration: z.number(),
  refundAddress: hexString,
  minPrice: numberOrHex,
  refundCcmMetadata: cfChainsCcmChannelMetadataCcmAdditionalData.nullish(),
  maxOraclePriceSlippage: z.number().nullish(),
});

export const palletCfTronIngressEgressVaultDepositWitnessTron = z.object({
  inputAsset: cfPrimitivesChainsAssetsTronAsset,
  depositAddress: hexString.nullish(),
  channelId: numberOrHex.nullish(),
  depositAmount: numberOrHex,
  depositDetails: cfChainsEvmDepositDetails,
  outputAsset: cfPrimitivesChainsAssetsAnyAsset,
  destinationAddress: cfChainsAddressEncodedAddress,
  depositMetadata: cfTronChainCcmDepositMetadata.nullish(),
  txId: hexString,
  brokerFee: cfPrimitivesBeneficiaryAccountId32.nullish(),
  affiliateFees: z.array(cfPrimitivesBeneficiaryAffiliateShortId),
  refundParams: cfTronChainRefundParametersChannelRefundParameters,
  dcaParams: cfPrimitivesDcaParameters.nullish(),
  boostFee: z.number(),
});

export const palletCfTronIngressEgressDepositFailedDetailsTron = z.discriminatedUnion('__kind', [
  z.object({
    __kind: z.literal('DepositFailedDepositChannelVariantTron'),
    depositWitness: palletCfTronIngressEgressDepositWitnessTron,
  }),
  z.object({
    __kind: z.literal('DepositFailedVaultVariantTron'),
    vaultWitness: palletCfTronIngressEgressVaultDepositWitnessTron,
  }),
]);

export const cfTraitsScheduledEgressDetailsTron = z.object({
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

export const cfPrimitivesAccountRole = simpleEnum([
  'Unregistered',
  'Validator',
  'LiquidityProvider',
  'Broker',
  'Operator',
]);

export const palletCfTronIngressEgressPalletConfigUpdateTron = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('ChannelOpeningFeeTron'), fee: numberOrHex }),
  z.object({
    __kind: z.literal('SetMinimumDepositTron'),
    asset: cfPrimitivesChainsAssetsTronAsset,
    minimumDeposit: numberOrHex,
  }),
  z.object({ __kind: z.literal('SetDepositChannelLifetimeTron'), lifetime: numberOrHex }),
  z.object({ __kind: z.literal('SetWitnessSafetyMarginTron'), margin: numberOrHex }),
  z.object({ __kind: z.literal('SetBoostDelayTron'), delayBlocks: z.number() }),
  z.object({
    __kind: z.literal('SetMaximumPreallocatedChannelsTron'),
    accountRole: cfPrimitivesAccountRole,
    numChannels: z.number(),
  }),
  z.object({ __kind: z.literal('SetIngressDelayTron'), delayBlocks: z.number() }),
]);

export const palletCfElectionsElectoralSystemsCompositeTuple5ImplsCompositeElectionIdentifierExtra =
  simpleEnum(['A', 'B', 'C', 'D', 'EE']);

export const stateChainRuntimeChainflipWitnessingTronElectionsTronElectoralEvents = z.object({
  __kind: z.literal('ReorgDetected'),
  reorgedBlocks: z.object({ start: numberOrHex, end: numberOrHex }),
});
