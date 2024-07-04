import { z } from 'zod';
import { encode } from '@chainflip/utils/ss58';

export const hexString = z
  .string()
  .refine((v): v is `0x${string}` => /^0x[\da-f]*$/i.test(v), { message: 'Invalid hex string' });

export const simpleEnum = <U extends string, T extends readonly [U, ...U[]]>(values: T) =>
  z.object({ __kind: z.enum(values) }).transform(({ __kind }) => __kind!);

export const cfPrimitivesChainsAssetsEthAsset = simpleEnum(['Eth', 'Flip', 'Usdc', 'Usdt']);

export const palletCfEmissionsPalletSafeMode = z.object({ emissionsSyncEnabled: z.boolean() });

export const palletCfFundingPalletSafeMode = z.object({
  redeemEnabled: z.boolean(),
  startBiddingEnabled: z.boolean(),
  stopBiddingEnabled: z.boolean(),
});

export const palletCfSwappingPalletSafeMode = z.object({
  swapsEnabled: z.boolean(),
  withdrawalsEnabled: z.boolean(),
  depositsEnabled: z.boolean(),
  brokerRegistrationEnabled: z.boolean(),
});

export const palletCfLpPalletSafeMode = z.object({
  depositEnabled: z.boolean(),
  withdrawalEnabled: z.boolean(),
});

export const palletCfValidatorPalletSafeMode = z.object({ authorityRotationEnabled: z.boolean() });

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
});

export const palletCfWitnesserPalletSafeMode = z.union([
  z.object({ __kind: z.literal('CodeGreen') }),
  z.object({ __kind: z.literal('CodeRed') }),
  z.object({
    __kind: z.literal('CodeAmber'),
    value: stateChainRuntimeSafeModeWitnesserCallPermission,
  }),
]);

export const stateChainRuntimeSafeModeInnerRuntimeSafeMode = z.object({
  emissions: palletCfEmissionsPalletSafeMode,
  funding: palletCfFundingPalletSafeMode,
  swapping: palletCfSwappingPalletSafeMode,
  liquidityProvider: palletCfLpPalletSafeMode,
  validator: palletCfValidatorPalletSafeMode,
  pools: palletCfPoolsPalletSafeMode,
  reputation: palletCfReputationPalletSafeMode,
  thresholdSignatureEthereum: palletCfThresholdSignaturePalletSafeMode,
  thresholdSignatureBitcoin: palletCfThresholdSignaturePalletSafeMode,
  thresholdSignaturePolkadot: palletCfThresholdSignaturePalletSafeMode,
  broadcastEthereum: palletCfBroadcastPalletSafeMode,
  broadcastBitcoin: palletCfBroadcastPalletSafeMode,
  broadcastPolkadot: palletCfBroadcastPalletSafeMode,
  witnesser: palletCfWitnesserPalletSafeMode,
});

export const palletCfEnvironmentSafeModeUpdate = z.union([
  z.object({ __kind: z.literal('CodeRed') }),
  z.object({ __kind: z.literal('CodeGreen') }),
  z.object({
    __kind: z.literal('CodeAmber'),
    value: stateChainRuntimeSafeModeInnerRuntimeSafeMode,
  }),
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

export const accountId = z
  .union([
    hexString,
    z
      .string()
      .regex(/^[0-9a-f]+$/)
      .transform<`0x${string}`>((v) => `0x${v}`),
  ])
  .transform((value) => encode({ data: value, ss58Format: 2112 }));

export const stateChainRuntimeChainflipOffencesOffence = simpleEnum([
  'ParticipateSigningFailed',
  'ParticipateKeygenFailed',
  'FailedToBroadcastTransaction',
  'MissedAuthorshipSlot',
  'MissedHeartbeat',
  'GrandpaEquivocation',
  'ParticipateKeyHandoverFailed',
  'FailedToWitnessInTime',
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

export const cfChainsEvmParityBit = simpleEnum(['Odd', 'Even']);

export const cfChainsEvmAggKey = z.object({
  pubKeyX: hexString,
  pubKeyYParity: cfChainsEvmParityBit,
});

export const cfChainsBtcAggKey = z.object({ previous: hexString.nullish(), current: hexString });

export const cfChainsEvmSchnorrVerificationComponents = z.object({
  s: hexString,
  kTimesGAddress: hexString,
});

export const cfChainsDotPolkadotTransactionId = z.object({
  blockNumber: z.number(),
  extrinsicIndex: z.number(),
});

export const cfChainsBtcBitcoinTransactionData = z.object({ encodedTransaction: hexString });

export const cfChainsAddressEncodedAddress = z.union([
  z.object({ __kind: z.literal('Eth'), value: hexString }),
  z.object({ __kind: z.literal('Dot'), value: hexString }),
  z.object({ __kind: z.literal('Btc'), value: hexString }),
]);

export const cfPrimitivesChainsAssetsAnyAsset = simpleEnum([
  'Eth',
  'Flip',
  'Usdc',
  'Dot',
  'Btc',
  'Usdt',
]);

export const cfChainsCcmChannelMetadata = z.object({
  message: hexString,
  gasBudget: numberOrHex,
  cfParameters: hexString,
});

export const cfChainsSwapOrigin = z.union([
  z.object({
    __kind: z.literal('DepositChannel'),
    value: z.object({
      depositAddress: cfChainsAddressEncodedAddress,
      channelId: numberOrHex,
      depositBlockHeight: numberOrHex,
    }),
  }),
  z.object({ __kind: z.literal('Vault'), txHash: hexString }),
]);

export const cfChainsBtcScriptPubkey = z.union([
  z.object({ __kind: z.literal('P2PKH'), value: hexString }),
  z.object({ __kind: z.literal('P2SH'), value: hexString }),
  z.object({ __kind: z.literal('P2WPKH'), value: hexString }),
  z.object({ __kind: z.literal('P2WSH'), value: hexString }),
  z.object({ __kind: z.literal('Taproot'), value: hexString }),
  z.object({
    __kind: z.literal('OtherSegwit'),
    value: z.object({ version: z.number(), program: hexString }),
  }),
]);

export const cfChainsAddressForeignChainAddress = z.union([
  z.object({ __kind: z.literal('Eth'), value: hexString }),
  z.object({ __kind: z.literal('Dot'), value: hexString }),
  z.object({ __kind: z.literal('Btc'), value: cfChainsBtcScriptPubkey }),
]);

export const cfTraitsLiquiditySwapType = z.union([
  z.object({ __kind: z.literal('Swap'), value: cfChainsAddressForeignChainAddress }),
  z.object({ __kind: z.literal('CcmPrincipal'), value: numberOrHex }),
  z.object({ __kind: z.literal('CcmGas'), value: numberOrHex }),
  z.object({ __kind: z.literal('NetworkFee') }),
]);

export const cfPrimitivesChainsForeignChain = simpleEnum(['Ethereum', 'Polkadot', 'Bitcoin']);

export const cfPrimitivesSwapLeg = simpleEnum(['FromStable', 'ToStable']);

export const palletCfSwappingCcmFailReason = simpleEnum([
  'UnsupportedForTargetChain',
  'InsufficientDepositAmount',
]);

export const cfChainsCcmDepositMetadata = z.object({
  sourceChain: cfPrimitivesChainsForeignChain,
  sourceAddress: cfChainsAddressForeignChainAddress.nullish(),
  channelMetadata: cfChainsCcmChannelMetadata,
});

export const palletCfIngressEgressDepositAction = z.union([
  z.object({ __kind: z.literal('Swap'), swapId: numberOrHex }),
  z.object({ __kind: z.literal('LiquidityProvision'), lpAccount: accountId }),
  z.object({
    __kind: z.literal('CcmTransfer'),
    value: z.object({ principalSwapId: numberOrHex.nullish(), gasSwapId: numberOrHex.nullish() }),
  }),
  z.object({ __kind: z.literal('NoAction') }),
]);

export const palletCfIngressEgressDepositIgnoredReason = simpleEnum([
  'BelowMinimumDeposit',
  'NotEnoughToPayFees',
]);

export const palletCfIngressEgressDepositWitnessEthereum = z.object({
  depositAddress: hexString,
  asset: cfPrimitivesChainsAssetsEthAsset,
  amount: numberOrHex,
});

export const cfChainsAllBatchError = z.union([
  z.object({ __kind: z.literal('NotRequired') }),
  z.object({ __kind: z.literal('UnsupportedToken') }),
  z.object({ __kind: z.literal('VaultAccountNotSet') }),
  z.object({ __kind: z.literal('AggKeyNotSet') }),
  z.object({ __kind: z.literal('UtxoSelectionFailed') }),
  z.object({ __kind: z.literal('DispatchError'), value: spRuntimeDispatchError }),
]);

export const cfPrimitivesChainsAssetsBtcAsset = simpleEnum(['Btc']);

export const cfChainsBtcUtxoId = z.object({ txId: hexString, vout: z.number() });

export const palletCfIngressEgressDepositWitnessBitcoin = z.object({
  depositAddress: cfChainsBtcScriptPubkey,
  asset: cfPrimitivesChainsAssetsBtcAsset,
  amount: numberOrHex,
  depositDetails: cfChainsBtcUtxoId,
});

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
