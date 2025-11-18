import { z } from 'zod';
import * as ss58 from '@chainflip/utils/ss58';

export const simpleEnum = <U extends string, T extends readonly [U, ...U[]]>(values: T) =>
  z.object({ __kind: z.enum(values) }).transform(({ __kind }) => __kind!);

export const cfPrimitivesChainsAssetsArbAsset = simpleEnum(['ArbEth', 'ArbUsdc']);

export const hexString = z
  .string()
  .refine((v): v is `0x${string}` => /^0x[\da-f]*$/i.test(v), { message: 'Invalid hex string' });

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

export const palletCfReputationPalletSafeMode = z.object({ reportingEnabled: z.boolean() });

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
  reputation: palletCfReputationPalletSafeMode,
  thresholdSignatureEvm: palletCfThresholdSignaturePalletSafeMode,
  thresholdSignatureBitcoin: palletCfThresholdSignaturePalletSafeMode,
  thresholdSignaturePolkadot: palletCfThresholdSignaturePalletSafeMode,
  broadcastEthereum: palletCfBroadcastPalletSafeMode,
  broadcastBitcoin: palletCfBroadcastPalletSafeMode,
  broadcastPolkadot: palletCfBroadcastPalletSafeMode,
  broadcastArbitrum: palletCfBroadcastPalletSafeMode,
  witnesser: palletCfWitnesserPalletSafeMode,
  ingressEgressEthereum: palletCfIngressEgressPalletSafeMode,
  ingressEgressBitcoin: palletCfIngressEgressPalletSafeMode,
  ingressEgressPolkadot: palletCfIngressEgressPalletSafeMode,
  ingressEgressArbitrum: palletCfIngressEgressPalletSafeMode,
});

export const palletCfEnvironmentSafeModeUpdate = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('CodeRed') }),
  z.object({ __kind: z.literal('CodeGreen') }),
  z.object({
    __kind: z.literal('CodeAmber'),
    value: stateChainRuntimeSafeModeInnerRuntimeSafeMode,
  }),
]);

export const cfChainsBtcUtxoId = z.object({ txId: hexString, vout: z.number() });

export const numericString = z
  .string()
  .refine((v) => /^\d+$/.test(v), { message: 'Invalid numeric string' });

export const numberOrHex = z
  .union([z.number(), hexString, numericString])
  .transform((n) => BigInt(n));

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

export const cfPrimitivesChainsForeignChain = simpleEnum([
  'Ethereum',
  'Polkadot',
  'Bitcoin',
  'Arbitrum',
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

export const cfPrimitivesAccountRole = simpleEnum([
  'Unregistered',
  'Validator',
  'LiquidityProvider',
  'Broker',
]);

export const palletCfValidatorRotationState = z.object({
  primaryCandidates: z.array(accountId),
  secondaryCandidates: z.array(accountId),
  banned: z.array(accountId),
  bond: numberOrHex,
  newEpochIndex: z.number(),
});

export const palletCfValidatorRotationPhase = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('Idle') }),
  z.object({ __kind: z.literal('KeygensInProgress'), value: palletCfValidatorRotationState }),
  z.object({ __kind: z.literal('KeyHandoversInProgress'), value: palletCfValidatorRotationState }),
  z.object({ __kind: z.literal('ActivatingKeys'), value: palletCfValidatorRotationState }),
  z.object({ __kind: z.literal('NewKeysActivated'), value: palletCfValidatorRotationState }),
  z.object({
    __kind: z.literal('SessionRotating'),
    value: z.tuple([z.array(accountId), numberOrHex]),
  }),
]);

export const palletCfTokenholderGovernanceProposal = z.discriminatedUnion('__kind', [
  z.object({
    __kind: z.literal('SetGovernanceKey'),
    value: z.tuple([cfPrimitivesChainsForeignChain, hexString]),
  }),
  z.object({ __kind: z.literal('SetCommunityKey'), value: hexString }),
]);

export const cfChainsEvmParityBit = simpleEnum(['Odd', 'Even']);

export const cfChainsEvmAggKey = z.object({
  pubKeyX: hexString,
  pubKeyYParity: cfChainsEvmParityBit,
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

export const dispatchResult = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('Ok') }),
  z.object({ __kind: z.literal('Err'), value: spRuntimeDispatchError }),
]);

export const cfChainsAddressEncodedAddress = z
  .object({ __kind: z.enum(['Eth', 'Dot', 'Btc', 'Arb']), value: hexString })
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
      default:
        throw new Error('Unknown chain');
    }
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
]);

export const cfChainsCcmChannelMetadata = z.object({
  message: hexString,
  gasBudget: numberOrHex,
  cfParameters: hexString,
});

export const cfPrimitivesBeneficiary = z.object({ account: accountId, bps: z.number() });

export const cfChainsSwapOrigin = z.discriminatedUnion('__kind', [
  z.object({
    __kind: z.literal('DepositChannel'),
    depositAddress: cfChainsAddressEncodedAddress,
    channelId: numberOrHex,
    depositBlockHeight: numberOrHex,
  }),
  z.object({ __kind: z.literal('Vault'), txHash: hexString }),
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
]);

export const cfTraitsLiquiditySwapType = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('Swap'), value: cfChainsAddressForeignChainAddress }),
  z.object({ __kind: z.literal('CcmPrincipal'), value: numberOrHex }),
  z.object({ __kind: z.literal('CcmGas'), value: numberOrHex }),
  z.object({ __kind: z.literal('NetworkFee') }),
  z.object({ __kind: z.literal('IngressEgressFee') }),
]);

export const cfPrimitivesSwapLeg = simpleEnum(['FromStable', 'ToStable']);

export const cfChainsCcmDepositMetadata = z.object({
  sourceChain: cfPrimitivesChainsForeignChain,
  sourceAddress: cfChainsAddressForeignChainAddress.nullish(),
  channelMetadata: cfChainsCcmChannelMetadata,
});

export const palletCfSwappingCcmFailReason = simpleEnum([
  'UnsupportedForTargetChain',
  'InsufficientDepositAmount',
]);

export const cfPrimitivesChainsAssetsEthAsset = simpleEnum(['Eth', 'Flip', 'Usdc', 'Usdt']);

export const palletCfEthereumIngressEgressDepositAction = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('Swap'), swapId: numberOrHex }),
  z.object({ __kind: z.literal('LiquidityProvision'), lpAccount: accountId }),
  z.object({
    __kind: z.literal('CcmTransfer'),
    principalSwapId: numberOrHex.nullish(),
    gasSwapId: numberOrHex.nullish(),
  }),
  z.object({ __kind: z.literal('NoAction') }),
  z.object({ __kind: z.literal('BoostersCredited'), prewitnessedDepositId: numberOrHex }),
]);

export const palletCfEthereumIngressEgressBoostPoolIdEthereum = z.object({
  asset: cfPrimitivesChainsAssetsEthAsset,
  tier: z.number(),
});

export const cfPrimitivesChainsAssetsDotAsset = simpleEnum(['Dot']);

export const palletCfPolkadotIngressEgressDepositAction = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('Swap'), swapId: numberOrHex }),
  z.object({ __kind: z.literal('LiquidityProvision'), lpAccount: accountId }),
  z.object({
    __kind: z.literal('CcmTransfer'),
    principalSwapId: numberOrHex.nullish(),
    gasSwapId: numberOrHex.nullish(),
  }),
  z.object({ __kind: z.literal('NoAction') }),
  z.object({ __kind: z.literal('BoostersCredited'), prewitnessedDepositId: numberOrHex }),
]);

export const palletCfPolkadotIngressEgressBoostPoolIdPolkadot = z.object({
  asset: cfPrimitivesChainsAssetsDotAsset,
  tier: z.number(),
});

export const cfPrimitivesChainsAssetsBtcAsset = simpleEnum(['Btc']);

export const palletCfBitcoinIngressEgressDepositAction = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('Swap'), swapId: numberOrHex }),
  z.object({ __kind: z.literal('LiquidityProvision'), lpAccount: accountId }),
  z.object({
    __kind: z.literal('CcmTransfer'),
    principalSwapId: numberOrHex.nullish(),
    gasSwapId: numberOrHex.nullish(),
  }),
  z.object({ __kind: z.literal('NoAction') }),
  z.object({ __kind: z.literal('BoostersCredited'), prewitnessedDepositId: numberOrHex }),
]);

export const palletCfBitcoinIngressEgressBoostPoolIdBitcoin = z.object({
  asset: cfPrimitivesChainsAssetsBtcAsset,
  tier: z.number(),
});

export const cfAmmCommonPoolPairsMap = z.object({ base: numberOrHex, quote: numberOrHex });

export const palletCfPoolsRangeOrderChange = z.object({
  liquidity: numberOrHex,
  amounts: cfAmmCommonPoolPairsMap,
});

export const palletCfPoolsIncreaseOrDecreaseRangeOrderChange = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('Increase'), value: palletCfPoolsRangeOrderChange }),
  z.object({ __kind: z.literal('Decrease'), value: palletCfPoolsRangeOrderChange }),
]);

export const cfAmmCommonSide = simpleEnum(['Buy', 'Sell']);

export const palletCfPoolsIncreaseOrDecreaseU128 = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('Increase'), value: numberOrHex }),
  z.object({ __kind: z.literal('Decrease'), value: numberOrHex }),
]);

export const palletCfPoolsAssetPair = z.object({ assets: cfAmmCommonPoolPairsMap });

export const cfChainsArbArbitrumTrackedData = z.object({
  baseFee: numberOrHex,
  gasLimitMultiplier: numberOrHex,
});

export const cfChainsChainStateArbitrum = z.object({
  blockHeight: numberOrHex,
  trackedData: cfChainsArbArbitrumTrackedData,
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

export const cfChainsEvmSchnorrVerificationComponents = z.object({
  s: hexString,
  kTimesGAddress: hexString,
});

export const palletCfArbitrumIngressEgressDepositAction = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('Swap'), swapId: numberOrHex }),
  z.object({ __kind: z.literal('LiquidityProvision'), lpAccount: accountId }),
  z.object({
    __kind: z.literal('CcmTransfer'),
    principalSwapId: numberOrHex.nullish(),
    gasSwapId: numberOrHex.nullish(),
  }),
  z.object({ __kind: z.literal('NoAction') }),
  z.object({ __kind: z.literal('BoostersCredited'), prewitnessedDepositId: numberOrHex }),
]);

export const palletCfArbitrumIngressEgressDepositIgnoredReason = simpleEnum([
  'BelowMinimumDeposit',
  'NotEnoughToPayFees',
]);

export const palletCfArbitrumIngressEgressDepositWitnessArbitrum = z.object({
  depositAddress: hexString,
  asset: cfPrimitivesChainsAssetsArbAsset,
  amount: numberOrHex,
});

export const cfChainsAllBatchError = z.discriminatedUnion('__kind', [
  z.object({ __kind: z.literal('NotRequired') }),
  z.object({ __kind: z.literal('UnsupportedToken') }),
  z.object({ __kind: z.literal('VaultAccountNotSet') }),
  z.object({ __kind: z.literal('AggKeyNotSet') }),
  z.object({ __kind: z.literal('UtxoSelectionFailed') }),
  z.object({ __kind: z.literal('DispatchError'), value: spRuntimeDispatchError }),
]);

export const palletCfArbitrumIngressEgressBoostPoolIdArbitrum = z.object({
  asset: cfPrimitivesChainsAssetsArbAsset,
  tier: z.number(),
});
