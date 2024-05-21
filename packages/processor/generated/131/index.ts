import { z } from 'zod';
import { InternalEventHandler, EventHandler, wrapHandler } from '../utils';
import { systemUpgradeAuthorized } from './system/upgradeAuthorized';
import { environmentAddedNewEthAsset } from './environment/addedNewEthAsset';
import { environmentUpdatedEthAsset } from './environment/updatedEthAsset';
import { environmentRuntimeSafeModeUpdated } from './environment/runtimeSafeModeUpdated';
import { witnesserPrewitnessExecutionFailed } from './witnesser/prewitnessExecutionFailed';
import { reputationOffencePenalty } from './reputation/offencePenalty';
import { reputationPenaltyUpdated } from './reputation/penaltyUpdated';
import { ethereumChainTrackingFeeMultiplierUpdated } from './ethereumChainTracking/feeMultiplierUpdated';
import { polkadotChainTrackingFeeMultiplierUpdated } from './polkadotChainTracking/feeMultiplierUpdated';
import { bitcoinChainTrackingFeeMultiplierUpdated } from './bitcoinChainTracking/feeMultiplierUpdated';
import { ethereumVaultVaultActivationCompleted } from './ethereumVault/vaultActivationCompleted';
import { polkadotVaultVaultActivationCompleted } from './polkadotVault/vaultActivationCompleted';
import { bitcoinVaultVaultActivationCompleted } from './bitcoinVault/vaultActivationCompleted';
import { ethereumThresholdSignerKeygenRequest } from './ethereumThresholdSigner/keygenRequest';
import { ethereumThresholdSignerKeyHandoverRequest } from './ethereumThresholdSigner/keyHandoverRequest';
import { ethereumThresholdSignerKeygenSuccessReported } from './ethereumThresholdSigner/keygenSuccessReported';
import { ethereumThresholdSignerKeyHandoverSuccessReported } from './ethereumThresholdSigner/keyHandoverSuccessReported';
import { ethereumThresholdSignerKeygenFailureReported } from './ethereumThresholdSigner/keygenFailureReported';
import { ethereumThresholdSignerKeyHandoverFailureReported } from './ethereumThresholdSigner/keyHandoverFailureReported';
import { ethereumThresholdSignerKeygenSuccess } from './ethereumThresholdSigner/keygenSuccess';
import { ethereumThresholdSignerKeyHandoverSuccess } from './ethereumThresholdSigner/keyHandoverSuccess';
import { ethereumThresholdSignerNoKeyHandover } from './ethereumThresholdSigner/noKeyHandover';
import { ethereumThresholdSignerKeygenVerificationSuccess } from './ethereumThresholdSigner/keygenVerificationSuccess';
import { ethereumThresholdSignerKeyHandoverVerificationSuccess } from './ethereumThresholdSigner/keyHandoverVerificationSuccess';
import { ethereumThresholdSignerKeygenVerificationFailure } from './ethereumThresholdSigner/keygenVerificationFailure';
import { ethereumThresholdSignerKeyHandoverVerificationFailure } from './ethereumThresholdSigner/keyHandoverVerificationFailure';
import { ethereumThresholdSignerKeygenFailure } from './ethereumThresholdSigner/keygenFailure';
import { ethereumThresholdSignerKeygenResponseTimeout } from './ethereumThresholdSigner/keygenResponseTimeout';
import { ethereumThresholdSignerKeyHandoverResponseTimeout } from './ethereumThresholdSigner/keyHandoverResponseTimeout';
import { ethereumThresholdSignerKeygenResponseTimeoutUpdated } from './ethereumThresholdSigner/keygenResponseTimeoutUpdated';
import { ethereumThresholdSignerKeyHandoverFailure } from './ethereumThresholdSigner/keyHandoverFailure';
import { ethereumThresholdSignerKeyRotationCompleted } from './ethereumThresholdSigner/keyRotationCompleted';
import { polkadotThresholdSignerKeygenRequest } from './polkadotThresholdSigner/keygenRequest';
import { polkadotThresholdSignerKeyHandoverRequest } from './polkadotThresholdSigner/keyHandoverRequest';
import { polkadotThresholdSignerKeygenSuccessReported } from './polkadotThresholdSigner/keygenSuccessReported';
import { polkadotThresholdSignerKeyHandoverSuccessReported } from './polkadotThresholdSigner/keyHandoverSuccessReported';
import { polkadotThresholdSignerKeygenFailureReported } from './polkadotThresholdSigner/keygenFailureReported';
import { polkadotThresholdSignerKeyHandoverFailureReported } from './polkadotThresholdSigner/keyHandoverFailureReported';
import { polkadotThresholdSignerKeygenSuccess } from './polkadotThresholdSigner/keygenSuccess';
import { polkadotThresholdSignerKeyHandoverSuccess } from './polkadotThresholdSigner/keyHandoverSuccess';
import { polkadotThresholdSignerNoKeyHandover } from './polkadotThresholdSigner/noKeyHandover';
import { polkadotThresholdSignerKeygenVerificationSuccess } from './polkadotThresholdSigner/keygenVerificationSuccess';
import { polkadotThresholdSignerKeyHandoverVerificationSuccess } from './polkadotThresholdSigner/keyHandoverVerificationSuccess';
import { polkadotThresholdSignerKeygenVerificationFailure } from './polkadotThresholdSigner/keygenVerificationFailure';
import { polkadotThresholdSignerKeyHandoverVerificationFailure } from './polkadotThresholdSigner/keyHandoverVerificationFailure';
import { polkadotThresholdSignerKeygenFailure } from './polkadotThresholdSigner/keygenFailure';
import { polkadotThresholdSignerKeygenResponseTimeout } from './polkadotThresholdSigner/keygenResponseTimeout';
import { polkadotThresholdSignerKeyHandoverResponseTimeout } from './polkadotThresholdSigner/keyHandoverResponseTimeout';
import { polkadotThresholdSignerKeygenResponseTimeoutUpdated } from './polkadotThresholdSigner/keygenResponseTimeoutUpdated';
import { polkadotThresholdSignerKeyHandoverFailure } from './polkadotThresholdSigner/keyHandoverFailure';
import { polkadotThresholdSignerKeyRotationCompleted } from './polkadotThresholdSigner/keyRotationCompleted';
import { bitcoinThresholdSignerKeygenRequest } from './bitcoinThresholdSigner/keygenRequest';
import { bitcoinThresholdSignerKeyHandoverRequest } from './bitcoinThresholdSigner/keyHandoverRequest';
import { bitcoinThresholdSignerKeygenSuccessReported } from './bitcoinThresholdSigner/keygenSuccessReported';
import { bitcoinThresholdSignerKeyHandoverSuccessReported } from './bitcoinThresholdSigner/keyHandoverSuccessReported';
import { bitcoinThresholdSignerKeygenFailureReported } from './bitcoinThresholdSigner/keygenFailureReported';
import { bitcoinThresholdSignerKeyHandoverFailureReported } from './bitcoinThresholdSigner/keyHandoverFailureReported';
import { bitcoinThresholdSignerKeygenSuccess } from './bitcoinThresholdSigner/keygenSuccess';
import { bitcoinThresholdSignerKeyHandoverSuccess } from './bitcoinThresholdSigner/keyHandoverSuccess';
import { bitcoinThresholdSignerNoKeyHandover } from './bitcoinThresholdSigner/noKeyHandover';
import { bitcoinThresholdSignerKeygenVerificationSuccess } from './bitcoinThresholdSigner/keygenVerificationSuccess';
import { bitcoinThresholdSignerKeyHandoverVerificationSuccess } from './bitcoinThresholdSigner/keyHandoverVerificationSuccess';
import { bitcoinThresholdSignerKeygenVerificationFailure } from './bitcoinThresholdSigner/keygenVerificationFailure';
import { bitcoinThresholdSignerKeyHandoverVerificationFailure } from './bitcoinThresholdSigner/keyHandoverVerificationFailure';
import { bitcoinThresholdSignerKeygenFailure } from './bitcoinThresholdSigner/keygenFailure';
import { bitcoinThresholdSignerKeygenResponseTimeout } from './bitcoinThresholdSigner/keygenResponseTimeout';
import { bitcoinThresholdSignerKeyHandoverResponseTimeout } from './bitcoinThresholdSigner/keyHandoverResponseTimeout';
import { bitcoinThresholdSignerKeygenResponseTimeoutUpdated } from './bitcoinThresholdSigner/keygenResponseTimeoutUpdated';
import { bitcoinThresholdSignerKeyHandoverFailure } from './bitcoinThresholdSigner/keyHandoverFailure';
import { bitcoinThresholdSignerKeyRotationCompleted } from './bitcoinThresholdSigner/keyRotationCompleted';
import { ethereumBroadcasterBroadcastSuccess } from './ethereumBroadcaster/broadcastSuccess';
import { polkadotBroadcasterBroadcastSuccess } from './polkadotBroadcaster/broadcastSuccess';
import { bitcoinBroadcasterTransactionBroadcastRequest } from './bitcoinBroadcaster/transactionBroadcastRequest';
import { bitcoinBroadcasterBroadcastSuccess } from './bitcoinBroadcaster/broadcastSuccess';
import { swappingSwapDepositAddressReady } from './swapping/swapDepositAddressReady';
import { swappingSwapScheduled } from './swapping/swapScheduled';
import { swappingSwapExecuted } from './swapping/swapExecuted';
import { swappingSwapEgressScheduled } from './swapping/swapEgressScheduled';
import { swappingWithdrawalRequested } from './swapping/withdrawalRequested';
import { swappingBatchSwapFailed } from './swapping/batchSwapFailed';
import { swappingCcmFailed } from './swapping/ccmFailed';
import { swappingMaximumSwapAmountSet } from './swapping/maximumSwapAmountSet';
import { swappingSwapAmountConfiscated } from './swapping/swapAmountConfiscated';
import { swappingSwapEgressIgnored } from './swapping/swapEgressIgnored';
import { liquidityProviderAccountDebited } from './liquidityProvider/accountDebited';
import { liquidityProviderAccountCredited } from './liquidityProvider/accountCredited';
import { liquidityProviderLiquidityDepositAddressReady } from './liquidityProvider/liquidityDepositAddressReady';
import { liquidityProviderWithdrawalEgressScheduled } from './liquidityProvider/withdrawalEgressScheduled';
import { liquidityProviderLiquidityDepositCredited } from './liquidityProvider/liquidityDepositCredited';
import { ethereumIngressEgressDepositReceived } from './ethereumIngressEgress/depositReceived';
import { ethereumIngressEgressAssetEgressStatusChanged } from './ethereumIngressEgress/assetEgressStatusChanged';
import { ethereumIngressEgressDepositFetchesScheduled } from './ethereumIngressEgress/depositFetchesScheduled';
import { ethereumIngressEgressMinimumDepositSet } from './ethereumIngressEgress/minimumDepositSet';
import { ethereumIngressEgressDepositIgnored } from './ethereumIngressEgress/depositIgnored';
import { ethereumIngressEgressTransferFallbackRequested } from './ethereumIngressEgress/transferFallbackRequested';
import { ethereumIngressEgressDepositWitnessRejected } from './ethereumIngressEgress/depositWitnessRejected';
import { ethereumIngressEgressFailedToBuildAllBatchCall } from './ethereumIngressEgress/failedToBuildAllBatchCall';
import { ethereumIngressEgressChannelOpeningFeePaid } from './ethereumIngressEgress/channelOpeningFeePaid';
import { ethereumIngressEgressChannelOpeningFeeSet } from './ethereumIngressEgress/channelOpeningFeeSet';
import { polkadotIngressEgressFailedToBuildAllBatchCall } from './polkadotIngressEgress/failedToBuildAllBatchCall';
import { polkadotIngressEgressChannelOpeningFeePaid } from './polkadotIngressEgress/channelOpeningFeePaid';
import { polkadotIngressEgressChannelOpeningFeeSet } from './polkadotIngressEgress/channelOpeningFeeSet';
import { bitcoinIngressEgressDepositReceived } from './bitcoinIngressEgress/depositReceived';
import { bitcoinIngressEgressDepositIgnored } from './bitcoinIngressEgress/depositIgnored';
import { bitcoinIngressEgressDepositWitnessRejected } from './bitcoinIngressEgress/depositWitnessRejected';
import { bitcoinIngressEgressFailedToBuildAllBatchCall } from './bitcoinIngressEgress/failedToBuildAllBatchCall';
import { bitcoinIngressEgressChannelOpeningFeePaid } from './bitcoinIngressEgress/channelOpeningFeePaid';
import { bitcoinIngressEgressChannelOpeningFeeSet } from './bitcoinIngressEgress/channelOpeningFeeSet';
import { liquidityPoolsNewPoolCreated } from './liquidityPools/newPoolCreated';
import { liquidityPoolsRangeOrderUpdated } from './liquidityPools/rangeOrderUpdated';
import { liquidityPoolsLimitOrderUpdated } from './liquidityPools/limitOrderUpdated';
import { liquidityPoolsAssetSwapped } from './liquidityPools/assetSwapped';
import { liquidityPoolsPoolFeeSet } from './liquidityPools/poolFeeSet';

export type SystemUpgradeAuthorized = EventHandler<z.output<typeof systemUpgradeAuthorized>>;
export type EnvironmentAddedNewEthAsset = EventHandler<
  z.output<typeof environmentAddedNewEthAsset>
>;
export type EnvironmentUpdatedEthAsset = EventHandler<z.output<typeof environmentUpdatedEthAsset>>;
export type EnvironmentRuntimeSafeModeUpdated = EventHandler<
  z.output<typeof environmentRuntimeSafeModeUpdated>
>;
export type WitnesserPrewitnessExecutionFailed = EventHandler<
  z.output<typeof witnesserPrewitnessExecutionFailed>
>;
export type ReputationOffencePenalty = EventHandler<z.output<typeof reputationOffencePenalty>>;
export type ReputationPenaltyUpdated = EventHandler<z.output<typeof reputationPenaltyUpdated>>;
export type EthereumChainTrackingFeeMultiplierUpdated = EventHandler<
  z.output<typeof ethereumChainTrackingFeeMultiplierUpdated>
>;
export type PolkadotChainTrackingFeeMultiplierUpdated = EventHandler<
  z.output<typeof polkadotChainTrackingFeeMultiplierUpdated>
>;
export type BitcoinChainTrackingFeeMultiplierUpdated = EventHandler<
  z.output<typeof bitcoinChainTrackingFeeMultiplierUpdated>
>;
export type EthereumVaultVaultActivationCompleted = EventHandler<
  z.output<typeof ethereumVaultVaultActivationCompleted>
>;
export type PolkadotVaultVaultActivationCompleted = EventHandler<
  z.output<typeof polkadotVaultVaultActivationCompleted>
>;
export type BitcoinVaultVaultActivationCompleted = EventHandler<
  z.output<typeof bitcoinVaultVaultActivationCompleted>
>;
export type EthereumThresholdSignerKeygenRequest = EventHandler<
  z.output<typeof ethereumThresholdSignerKeygenRequest>
>;
export type EthereumThresholdSignerKeyHandoverRequest = EventHandler<
  z.output<typeof ethereumThresholdSignerKeyHandoverRequest>
>;
export type EthereumThresholdSignerKeygenSuccessReported = EventHandler<
  z.output<typeof ethereumThresholdSignerKeygenSuccessReported>
>;
export type EthereumThresholdSignerKeyHandoverSuccessReported = EventHandler<
  z.output<typeof ethereumThresholdSignerKeyHandoverSuccessReported>
>;
export type EthereumThresholdSignerKeygenFailureReported = EventHandler<
  z.output<typeof ethereumThresholdSignerKeygenFailureReported>
>;
export type EthereumThresholdSignerKeyHandoverFailureReported = EventHandler<
  z.output<typeof ethereumThresholdSignerKeyHandoverFailureReported>
>;
export type EthereumThresholdSignerKeygenSuccess = EventHandler<
  z.output<typeof ethereumThresholdSignerKeygenSuccess>
>;
export type EthereumThresholdSignerKeyHandoverSuccess = EventHandler<
  z.output<typeof ethereumThresholdSignerKeyHandoverSuccess>
>;
export type EthereumThresholdSignerNoKeyHandover = EventHandler<
  z.output<typeof ethereumThresholdSignerNoKeyHandover>
>;
export type EthereumThresholdSignerKeygenVerificationSuccess = EventHandler<
  z.output<typeof ethereumThresholdSignerKeygenVerificationSuccess>
>;
export type EthereumThresholdSignerKeyHandoverVerificationSuccess = EventHandler<
  z.output<typeof ethereumThresholdSignerKeyHandoverVerificationSuccess>
>;
export type EthereumThresholdSignerKeygenVerificationFailure = EventHandler<
  z.output<typeof ethereumThresholdSignerKeygenVerificationFailure>
>;
export type EthereumThresholdSignerKeyHandoverVerificationFailure = EventHandler<
  z.output<typeof ethereumThresholdSignerKeyHandoverVerificationFailure>
>;
export type EthereumThresholdSignerKeygenFailure = EventHandler<
  z.output<typeof ethereumThresholdSignerKeygenFailure>
>;
export type EthereumThresholdSignerKeygenResponseTimeout = EventHandler<
  z.output<typeof ethereumThresholdSignerKeygenResponseTimeout>
>;
export type EthereumThresholdSignerKeyHandoverResponseTimeout = EventHandler<
  z.output<typeof ethereumThresholdSignerKeyHandoverResponseTimeout>
>;
export type EthereumThresholdSignerKeygenResponseTimeoutUpdated = EventHandler<
  z.output<typeof ethereumThresholdSignerKeygenResponseTimeoutUpdated>
>;
export type EthereumThresholdSignerKeyHandoverFailure = EventHandler<
  z.output<typeof ethereumThresholdSignerKeyHandoverFailure>
>;
export type EthereumThresholdSignerKeyRotationCompleted = EventHandler<
  z.output<typeof ethereumThresholdSignerKeyRotationCompleted>
>;
export type PolkadotThresholdSignerKeygenRequest = EventHandler<
  z.output<typeof polkadotThresholdSignerKeygenRequest>
>;
export type PolkadotThresholdSignerKeyHandoverRequest = EventHandler<
  z.output<typeof polkadotThresholdSignerKeyHandoverRequest>
>;
export type PolkadotThresholdSignerKeygenSuccessReported = EventHandler<
  z.output<typeof polkadotThresholdSignerKeygenSuccessReported>
>;
export type PolkadotThresholdSignerKeyHandoverSuccessReported = EventHandler<
  z.output<typeof polkadotThresholdSignerKeyHandoverSuccessReported>
>;
export type PolkadotThresholdSignerKeygenFailureReported = EventHandler<
  z.output<typeof polkadotThresholdSignerKeygenFailureReported>
>;
export type PolkadotThresholdSignerKeyHandoverFailureReported = EventHandler<
  z.output<typeof polkadotThresholdSignerKeyHandoverFailureReported>
>;
export type PolkadotThresholdSignerKeygenSuccess = EventHandler<
  z.output<typeof polkadotThresholdSignerKeygenSuccess>
>;
export type PolkadotThresholdSignerKeyHandoverSuccess = EventHandler<
  z.output<typeof polkadotThresholdSignerKeyHandoverSuccess>
>;
export type PolkadotThresholdSignerNoKeyHandover = EventHandler<
  z.output<typeof polkadotThresholdSignerNoKeyHandover>
>;
export type PolkadotThresholdSignerKeygenVerificationSuccess = EventHandler<
  z.output<typeof polkadotThresholdSignerKeygenVerificationSuccess>
>;
export type PolkadotThresholdSignerKeyHandoverVerificationSuccess = EventHandler<
  z.output<typeof polkadotThresholdSignerKeyHandoverVerificationSuccess>
>;
export type PolkadotThresholdSignerKeygenVerificationFailure = EventHandler<
  z.output<typeof polkadotThresholdSignerKeygenVerificationFailure>
>;
export type PolkadotThresholdSignerKeyHandoverVerificationFailure = EventHandler<
  z.output<typeof polkadotThresholdSignerKeyHandoverVerificationFailure>
>;
export type PolkadotThresholdSignerKeygenFailure = EventHandler<
  z.output<typeof polkadotThresholdSignerKeygenFailure>
>;
export type PolkadotThresholdSignerKeygenResponseTimeout = EventHandler<
  z.output<typeof polkadotThresholdSignerKeygenResponseTimeout>
>;
export type PolkadotThresholdSignerKeyHandoverResponseTimeout = EventHandler<
  z.output<typeof polkadotThresholdSignerKeyHandoverResponseTimeout>
>;
export type PolkadotThresholdSignerKeygenResponseTimeoutUpdated = EventHandler<
  z.output<typeof polkadotThresholdSignerKeygenResponseTimeoutUpdated>
>;
export type PolkadotThresholdSignerKeyHandoverFailure = EventHandler<
  z.output<typeof polkadotThresholdSignerKeyHandoverFailure>
>;
export type PolkadotThresholdSignerKeyRotationCompleted = EventHandler<
  z.output<typeof polkadotThresholdSignerKeyRotationCompleted>
>;
export type BitcoinThresholdSignerKeygenRequest = EventHandler<
  z.output<typeof bitcoinThresholdSignerKeygenRequest>
>;
export type BitcoinThresholdSignerKeyHandoverRequest = EventHandler<
  z.output<typeof bitcoinThresholdSignerKeyHandoverRequest>
>;
export type BitcoinThresholdSignerKeygenSuccessReported = EventHandler<
  z.output<typeof bitcoinThresholdSignerKeygenSuccessReported>
>;
export type BitcoinThresholdSignerKeyHandoverSuccessReported = EventHandler<
  z.output<typeof bitcoinThresholdSignerKeyHandoverSuccessReported>
>;
export type BitcoinThresholdSignerKeygenFailureReported = EventHandler<
  z.output<typeof bitcoinThresholdSignerKeygenFailureReported>
>;
export type BitcoinThresholdSignerKeyHandoverFailureReported = EventHandler<
  z.output<typeof bitcoinThresholdSignerKeyHandoverFailureReported>
>;
export type BitcoinThresholdSignerKeygenSuccess = EventHandler<
  z.output<typeof bitcoinThresholdSignerKeygenSuccess>
>;
export type BitcoinThresholdSignerKeyHandoverSuccess = EventHandler<
  z.output<typeof bitcoinThresholdSignerKeyHandoverSuccess>
>;
export type BitcoinThresholdSignerNoKeyHandover = EventHandler<
  z.output<typeof bitcoinThresholdSignerNoKeyHandover>
>;
export type BitcoinThresholdSignerKeygenVerificationSuccess = EventHandler<
  z.output<typeof bitcoinThresholdSignerKeygenVerificationSuccess>
>;
export type BitcoinThresholdSignerKeyHandoverVerificationSuccess = EventHandler<
  z.output<typeof bitcoinThresholdSignerKeyHandoverVerificationSuccess>
>;
export type BitcoinThresholdSignerKeygenVerificationFailure = EventHandler<
  z.output<typeof bitcoinThresholdSignerKeygenVerificationFailure>
>;
export type BitcoinThresholdSignerKeyHandoverVerificationFailure = EventHandler<
  z.output<typeof bitcoinThresholdSignerKeyHandoverVerificationFailure>
>;
export type BitcoinThresholdSignerKeygenFailure = EventHandler<
  z.output<typeof bitcoinThresholdSignerKeygenFailure>
>;
export type BitcoinThresholdSignerKeygenResponseTimeout = EventHandler<
  z.output<typeof bitcoinThresholdSignerKeygenResponseTimeout>
>;
export type BitcoinThresholdSignerKeyHandoverResponseTimeout = EventHandler<
  z.output<typeof bitcoinThresholdSignerKeyHandoverResponseTimeout>
>;
export type BitcoinThresholdSignerKeygenResponseTimeoutUpdated = EventHandler<
  z.output<typeof bitcoinThresholdSignerKeygenResponseTimeoutUpdated>
>;
export type BitcoinThresholdSignerKeyHandoverFailure = EventHandler<
  z.output<typeof bitcoinThresholdSignerKeyHandoverFailure>
>;
export type BitcoinThresholdSignerKeyRotationCompleted = EventHandler<
  z.output<typeof bitcoinThresholdSignerKeyRotationCompleted>
>;
export type EthereumBroadcasterBroadcastSuccess = EventHandler<
  z.output<typeof ethereumBroadcasterBroadcastSuccess>
>;
export type PolkadotBroadcasterBroadcastSuccess = EventHandler<
  z.output<typeof polkadotBroadcasterBroadcastSuccess>
>;
export type BitcoinBroadcasterTransactionBroadcastRequest = EventHandler<
  z.output<typeof bitcoinBroadcasterTransactionBroadcastRequest>
>;
export type BitcoinBroadcasterBroadcastSuccess = EventHandler<
  z.output<typeof bitcoinBroadcasterBroadcastSuccess>
>;
export type SwappingSwapDepositAddressReady = EventHandler<
  z.output<typeof swappingSwapDepositAddressReady>
>;
export type SwappingSwapScheduled = EventHandler<z.output<typeof swappingSwapScheduled>>;
export type SwappingSwapExecuted = EventHandler<z.output<typeof swappingSwapExecuted>>;
export type SwappingSwapEgressScheduled = EventHandler<
  z.output<typeof swappingSwapEgressScheduled>
>;
export type SwappingWithdrawalRequested = EventHandler<
  z.output<typeof swappingWithdrawalRequested>
>;
export type SwappingBatchSwapFailed = EventHandler<z.output<typeof swappingBatchSwapFailed>>;
export type SwappingCcmFailed = EventHandler<z.output<typeof swappingCcmFailed>>;
export type SwappingMaximumSwapAmountSet = EventHandler<
  z.output<typeof swappingMaximumSwapAmountSet>
>;
export type SwappingSwapAmountConfiscated = EventHandler<
  z.output<typeof swappingSwapAmountConfiscated>
>;
export type SwappingSwapEgressIgnored = EventHandler<z.output<typeof swappingSwapEgressIgnored>>;
export type LiquidityProviderAccountDebited = EventHandler<
  z.output<typeof liquidityProviderAccountDebited>
>;
export type LiquidityProviderAccountCredited = EventHandler<
  z.output<typeof liquidityProviderAccountCredited>
>;
export type LiquidityProviderLiquidityDepositAddressReady = EventHandler<
  z.output<typeof liquidityProviderLiquidityDepositAddressReady>
>;
export type LiquidityProviderWithdrawalEgressScheduled = EventHandler<
  z.output<typeof liquidityProviderWithdrawalEgressScheduled>
>;
export type LiquidityProviderLiquidityDepositCredited = EventHandler<
  z.output<typeof liquidityProviderLiquidityDepositCredited>
>;
export type EthereumIngressEgressDepositReceived = EventHandler<
  z.output<typeof ethereumIngressEgressDepositReceived>
>;
export type EthereumIngressEgressAssetEgressStatusChanged = EventHandler<
  z.output<typeof ethereumIngressEgressAssetEgressStatusChanged>
>;
export type EthereumIngressEgressDepositFetchesScheduled = EventHandler<
  z.output<typeof ethereumIngressEgressDepositFetchesScheduled>
>;
export type EthereumIngressEgressMinimumDepositSet = EventHandler<
  z.output<typeof ethereumIngressEgressMinimumDepositSet>
>;
export type EthereumIngressEgressDepositIgnored = EventHandler<
  z.output<typeof ethereumIngressEgressDepositIgnored>
>;
export type EthereumIngressEgressTransferFallbackRequested = EventHandler<
  z.output<typeof ethereumIngressEgressTransferFallbackRequested>
>;
export type EthereumIngressEgressDepositWitnessRejected = EventHandler<
  z.output<typeof ethereumIngressEgressDepositWitnessRejected>
>;
export type EthereumIngressEgressFailedToBuildAllBatchCall = EventHandler<
  z.output<typeof ethereumIngressEgressFailedToBuildAllBatchCall>
>;
export type EthereumIngressEgressChannelOpeningFeePaid = EventHandler<
  z.output<typeof ethereumIngressEgressChannelOpeningFeePaid>
>;
export type EthereumIngressEgressChannelOpeningFeeSet = EventHandler<
  z.output<typeof ethereumIngressEgressChannelOpeningFeeSet>
>;
export type PolkadotIngressEgressFailedToBuildAllBatchCall = EventHandler<
  z.output<typeof polkadotIngressEgressFailedToBuildAllBatchCall>
>;
export type PolkadotIngressEgressChannelOpeningFeePaid = EventHandler<
  z.output<typeof polkadotIngressEgressChannelOpeningFeePaid>
>;
export type PolkadotIngressEgressChannelOpeningFeeSet = EventHandler<
  z.output<typeof polkadotIngressEgressChannelOpeningFeeSet>
>;
export type BitcoinIngressEgressDepositReceived = EventHandler<
  z.output<typeof bitcoinIngressEgressDepositReceived>
>;
export type BitcoinIngressEgressDepositIgnored = EventHandler<
  z.output<typeof bitcoinIngressEgressDepositIgnored>
>;
export type BitcoinIngressEgressDepositWitnessRejected = EventHandler<
  z.output<typeof bitcoinIngressEgressDepositWitnessRejected>
>;
export type BitcoinIngressEgressFailedToBuildAllBatchCall = EventHandler<
  z.output<typeof bitcoinIngressEgressFailedToBuildAllBatchCall>
>;
export type BitcoinIngressEgressChannelOpeningFeePaid = EventHandler<
  z.output<typeof bitcoinIngressEgressChannelOpeningFeePaid>
>;
export type BitcoinIngressEgressChannelOpeningFeeSet = EventHandler<
  z.output<typeof bitcoinIngressEgressChannelOpeningFeeSet>
>;
export type LiquidityPoolsNewPoolCreated = EventHandler<
  z.output<typeof liquidityPoolsNewPoolCreated>
>;
export type LiquidityPoolsRangeOrderUpdated = EventHandler<
  z.output<typeof liquidityPoolsRangeOrderUpdated>
>;
export type LiquidityPoolsLimitOrderUpdated = EventHandler<
  z.output<typeof liquidityPoolsLimitOrderUpdated>
>;
export type LiquidityPoolsAssetSwapped = EventHandler<z.output<typeof liquidityPoolsAssetSwapped>>;
export type LiquidityPoolsPoolFeeSet = EventHandler<z.output<typeof liquidityPoolsPoolFeeSet>>;

type HandlerMap = {
  System?: {
    UpgradeAuthorized?: SystemUpgradeAuthorized;
  };
  Environment?: {
    AddedNewEthAsset?: EnvironmentAddedNewEthAsset;
    UpdatedEthAsset?: EnvironmentUpdatedEthAsset;
    RuntimeSafeModeUpdated?: EnvironmentRuntimeSafeModeUpdated;
  };
  Witnesser?: {
    PrewitnessExecutionFailed?: WitnesserPrewitnessExecutionFailed;
  };
  Reputation?: {
    OffencePenalty?: ReputationOffencePenalty;
    PenaltyUpdated?: ReputationPenaltyUpdated;
  };
  EthereumChainTracking?: {
    FeeMultiplierUpdated?: EthereumChainTrackingFeeMultiplierUpdated;
  };
  PolkadotChainTracking?: {
    FeeMultiplierUpdated?: PolkadotChainTrackingFeeMultiplierUpdated;
  };
  BitcoinChainTracking?: {
    FeeMultiplierUpdated?: BitcoinChainTrackingFeeMultiplierUpdated;
  };
  EthereumVault?: {
    VaultActivationCompleted?: EthereumVaultVaultActivationCompleted;
  };
  PolkadotVault?: {
    VaultActivationCompleted?: PolkadotVaultVaultActivationCompleted;
  };
  BitcoinVault?: {
    VaultActivationCompleted?: BitcoinVaultVaultActivationCompleted;
  };
  EthereumThresholdSigner?: {
    KeygenRequest?: EthereumThresholdSignerKeygenRequest;
    KeyHandoverRequest?: EthereumThresholdSignerKeyHandoverRequest;
    KeygenSuccessReported?: EthereumThresholdSignerKeygenSuccessReported;
    KeyHandoverSuccessReported?: EthereumThresholdSignerKeyHandoverSuccessReported;
    KeygenFailureReported?: EthereumThresholdSignerKeygenFailureReported;
    KeyHandoverFailureReported?: EthereumThresholdSignerKeyHandoverFailureReported;
    KeygenSuccess?: EthereumThresholdSignerKeygenSuccess;
    KeyHandoverSuccess?: EthereumThresholdSignerKeyHandoverSuccess;
    NoKeyHandover?: EthereumThresholdSignerNoKeyHandover;
    KeygenVerificationSuccess?: EthereumThresholdSignerKeygenVerificationSuccess;
    KeyHandoverVerificationSuccess?: EthereumThresholdSignerKeyHandoverVerificationSuccess;
    KeygenVerificationFailure?: EthereumThresholdSignerKeygenVerificationFailure;
    KeyHandoverVerificationFailure?: EthereumThresholdSignerKeyHandoverVerificationFailure;
    KeygenFailure?: EthereumThresholdSignerKeygenFailure;
    KeygenResponseTimeout?: EthereumThresholdSignerKeygenResponseTimeout;
    KeyHandoverResponseTimeout?: EthereumThresholdSignerKeyHandoverResponseTimeout;
    KeygenResponseTimeoutUpdated?: EthereumThresholdSignerKeygenResponseTimeoutUpdated;
    KeyHandoverFailure?: EthereumThresholdSignerKeyHandoverFailure;
    KeyRotationCompleted?: EthereumThresholdSignerKeyRotationCompleted;
  };
  PolkadotThresholdSigner?: {
    KeygenRequest?: PolkadotThresholdSignerKeygenRequest;
    KeyHandoverRequest?: PolkadotThresholdSignerKeyHandoverRequest;
    KeygenSuccessReported?: PolkadotThresholdSignerKeygenSuccessReported;
    KeyHandoverSuccessReported?: PolkadotThresholdSignerKeyHandoverSuccessReported;
    KeygenFailureReported?: PolkadotThresholdSignerKeygenFailureReported;
    KeyHandoverFailureReported?: PolkadotThresholdSignerKeyHandoverFailureReported;
    KeygenSuccess?: PolkadotThresholdSignerKeygenSuccess;
    KeyHandoverSuccess?: PolkadotThresholdSignerKeyHandoverSuccess;
    NoKeyHandover?: PolkadotThresholdSignerNoKeyHandover;
    KeygenVerificationSuccess?: PolkadotThresholdSignerKeygenVerificationSuccess;
    KeyHandoverVerificationSuccess?: PolkadotThresholdSignerKeyHandoverVerificationSuccess;
    KeygenVerificationFailure?: PolkadotThresholdSignerKeygenVerificationFailure;
    KeyHandoverVerificationFailure?: PolkadotThresholdSignerKeyHandoverVerificationFailure;
    KeygenFailure?: PolkadotThresholdSignerKeygenFailure;
    KeygenResponseTimeout?: PolkadotThresholdSignerKeygenResponseTimeout;
    KeyHandoverResponseTimeout?: PolkadotThresholdSignerKeyHandoverResponseTimeout;
    KeygenResponseTimeoutUpdated?: PolkadotThresholdSignerKeygenResponseTimeoutUpdated;
    KeyHandoverFailure?: PolkadotThresholdSignerKeyHandoverFailure;
    KeyRotationCompleted?: PolkadotThresholdSignerKeyRotationCompleted;
  };
  BitcoinThresholdSigner?: {
    KeygenRequest?: BitcoinThresholdSignerKeygenRequest;
    KeyHandoverRequest?: BitcoinThresholdSignerKeyHandoverRequest;
    KeygenSuccessReported?: BitcoinThresholdSignerKeygenSuccessReported;
    KeyHandoverSuccessReported?: BitcoinThresholdSignerKeyHandoverSuccessReported;
    KeygenFailureReported?: BitcoinThresholdSignerKeygenFailureReported;
    KeyHandoverFailureReported?: BitcoinThresholdSignerKeyHandoverFailureReported;
    KeygenSuccess?: BitcoinThresholdSignerKeygenSuccess;
    KeyHandoverSuccess?: BitcoinThresholdSignerKeyHandoverSuccess;
    NoKeyHandover?: BitcoinThresholdSignerNoKeyHandover;
    KeygenVerificationSuccess?: BitcoinThresholdSignerKeygenVerificationSuccess;
    KeyHandoverVerificationSuccess?: BitcoinThresholdSignerKeyHandoverVerificationSuccess;
    KeygenVerificationFailure?: BitcoinThresholdSignerKeygenVerificationFailure;
    KeyHandoverVerificationFailure?: BitcoinThresholdSignerKeyHandoverVerificationFailure;
    KeygenFailure?: BitcoinThresholdSignerKeygenFailure;
    KeygenResponseTimeout?: BitcoinThresholdSignerKeygenResponseTimeout;
    KeyHandoverResponseTimeout?: BitcoinThresholdSignerKeyHandoverResponseTimeout;
    KeygenResponseTimeoutUpdated?: BitcoinThresholdSignerKeygenResponseTimeoutUpdated;
    KeyHandoverFailure?: BitcoinThresholdSignerKeyHandoverFailure;
    KeyRotationCompleted?: BitcoinThresholdSignerKeyRotationCompleted;
  };
  EthereumBroadcaster?: {
    BroadcastSuccess?: EthereumBroadcasterBroadcastSuccess;
  };
  PolkadotBroadcaster?: {
    BroadcastSuccess?: PolkadotBroadcasterBroadcastSuccess;
  };
  BitcoinBroadcaster?: {
    TransactionBroadcastRequest?: BitcoinBroadcasterTransactionBroadcastRequest;
    BroadcastSuccess?: BitcoinBroadcasterBroadcastSuccess;
  };
  Swapping?: {
    SwapDepositAddressReady?: SwappingSwapDepositAddressReady;
    SwapScheduled?: SwappingSwapScheduled;
    SwapExecuted?: SwappingSwapExecuted;
    SwapEgressScheduled?: SwappingSwapEgressScheduled;
    WithdrawalRequested?: SwappingWithdrawalRequested;
    BatchSwapFailed?: SwappingBatchSwapFailed;
    CcmFailed?: SwappingCcmFailed;
    MaximumSwapAmountSet?: SwappingMaximumSwapAmountSet;
    SwapAmountConfiscated?: SwappingSwapAmountConfiscated;
    SwapEgressIgnored?: SwappingSwapEgressIgnored;
  };
  LiquidityProvider?: {
    AccountDebited?: LiquidityProviderAccountDebited;
    AccountCredited?: LiquidityProviderAccountCredited;
    LiquidityDepositAddressReady?: LiquidityProviderLiquidityDepositAddressReady;
    WithdrawalEgressScheduled?: LiquidityProviderWithdrawalEgressScheduled;
    LiquidityDepositCredited?: LiquidityProviderLiquidityDepositCredited;
  };
  EthereumIngressEgress?: {
    DepositReceived?: EthereumIngressEgressDepositReceived;
    AssetEgressStatusChanged?: EthereumIngressEgressAssetEgressStatusChanged;
    DepositFetchesScheduled?: EthereumIngressEgressDepositFetchesScheduled;
    MinimumDepositSet?: EthereumIngressEgressMinimumDepositSet;
    DepositIgnored?: EthereumIngressEgressDepositIgnored;
    TransferFallbackRequested?: EthereumIngressEgressTransferFallbackRequested;
    DepositWitnessRejected?: EthereumIngressEgressDepositWitnessRejected;
    FailedToBuildAllBatchCall?: EthereumIngressEgressFailedToBuildAllBatchCall;
    ChannelOpeningFeePaid?: EthereumIngressEgressChannelOpeningFeePaid;
    ChannelOpeningFeeSet?: EthereumIngressEgressChannelOpeningFeeSet;
  };
  PolkadotIngressEgress?: {
    FailedToBuildAllBatchCall?: PolkadotIngressEgressFailedToBuildAllBatchCall;
    ChannelOpeningFeePaid?: PolkadotIngressEgressChannelOpeningFeePaid;
    ChannelOpeningFeeSet?: PolkadotIngressEgressChannelOpeningFeeSet;
  };
  BitcoinIngressEgress?: {
    DepositReceived?: BitcoinIngressEgressDepositReceived;
    DepositIgnored?: BitcoinIngressEgressDepositIgnored;
    DepositWitnessRejected?: BitcoinIngressEgressDepositWitnessRejected;
    FailedToBuildAllBatchCall?: BitcoinIngressEgressFailedToBuildAllBatchCall;
    ChannelOpeningFeePaid?: BitcoinIngressEgressChannelOpeningFeePaid;
    ChannelOpeningFeeSet?: BitcoinIngressEgressChannelOpeningFeeSet;
  };
  LiquidityPools?: {
    NewPoolCreated?: LiquidityPoolsNewPoolCreated;
    RangeOrderUpdated?: LiquidityPoolsRangeOrderUpdated;
    LimitOrderUpdated?: LiquidityPoolsLimitOrderUpdated;
    AssetSwapped?: LiquidityPoolsAssetSwapped;
    PoolFeeSet?: LiquidityPoolsPoolFeeSet;
  };
};

export const handleEvents = (map: HandlerMap) => ({
  spec: 131,
  handlers: [
    {
      name: 'System.UpgradeAuthorized',
      handler: wrapHandler(map.System?.UpgradeAuthorized, systemUpgradeAuthorized),
    },
    {
      name: 'Environment.AddedNewEthAsset',
      handler: wrapHandler(map.Environment?.AddedNewEthAsset, environmentAddedNewEthAsset),
    },
    {
      name: 'Environment.UpdatedEthAsset',
      handler: wrapHandler(map.Environment?.UpdatedEthAsset, environmentUpdatedEthAsset),
    },
    {
      name: 'Environment.RuntimeSafeModeUpdated',
      handler: wrapHandler(
        map.Environment?.RuntimeSafeModeUpdated,
        environmentRuntimeSafeModeUpdated,
      ),
    },
    {
      name: 'Witnesser.PrewitnessExecutionFailed',
      handler: wrapHandler(
        map.Witnesser?.PrewitnessExecutionFailed,
        witnesserPrewitnessExecutionFailed,
      ),
    },
    {
      name: 'Reputation.OffencePenalty',
      handler: wrapHandler(map.Reputation?.OffencePenalty, reputationOffencePenalty),
    },
    {
      name: 'Reputation.PenaltyUpdated',
      handler: wrapHandler(map.Reputation?.PenaltyUpdated, reputationPenaltyUpdated),
    },
    {
      name: 'EthereumChainTracking.FeeMultiplierUpdated',
      handler: wrapHandler(
        map.EthereumChainTracking?.FeeMultiplierUpdated,
        ethereumChainTrackingFeeMultiplierUpdated,
      ),
    },
    {
      name: 'PolkadotChainTracking.FeeMultiplierUpdated',
      handler: wrapHandler(
        map.PolkadotChainTracking?.FeeMultiplierUpdated,
        polkadotChainTrackingFeeMultiplierUpdated,
      ),
    },
    {
      name: 'BitcoinChainTracking.FeeMultiplierUpdated',
      handler: wrapHandler(
        map.BitcoinChainTracking?.FeeMultiplierUpdated,
        bitcoinChainTrackingFeeMultiplierUpdated,
      ),
    },
    {
      name: 'EthereumVault.VaultActivationCompleted',
      handler: wrapHandler(
        map.EthereumVault?.VaultActivationCompleted,
        ethereumVaultVaultActivationCompleted,
      ),
    },
    {
      name: 'PolkadotVault.VaultActivationCompleted',
      handler: wrapHandler(
        map.PolkadotVault?.VaultActivationCompleted,
        polkadotVaultVaultActivationCompleted,
      ),
    },
    {
      name: 'BitcoinVault.VaultActivationCompleted',
      handler: wrapHandler(
        map.BitcoinVault?.VaultActivationCompleted,
        bitcoinVaultVaultActivationCompleted,
      ),
    },
    {
      name: 'EthereumThresholdSigner.KeygenRequest',
      handler: wrapHandler(
        map.EthereumThresholdSigner?.KeygenRequest,
        ethereumThresholdSignerKeygenRequest,
      ),
    },
    {
      name: 'EthereumThresholdSigner.KeyHandoverRequest',
      handler: wrapHandler(
        map.EthereumThresholdSigner?.KeyHandoverRequest,
        ethereumThresholdSignerKeyHandoverRequest,
      ),
    },
    {
      name: 'EthereumThresholdSigner.KeygenSuccessReported',
      handler: wrapHandler(
        map.EthereumThresholdSigner?.KeygenSuccessReported,
        ethereumThresholdSignerKeygenSuccessReported,
      ),
    },
    {
      name: 'EthereumThresholdSigner.KeyHandoverSuccessReported',
      handler: wrapHandler(
        map.EthereumThresholdSigner?.KeyHandoverSuccessReported,
        ethereumThresholdSignerKeyHandoverSuccessReported,
      ),
    },
    {
      name: 'EthereumThresholdSigner.KeygenFailureReported',
      handler: wrapHandler(
        map.EthereumThresholdSigner?.KeygenFailureReported,
        ethereumThresholdSignerKeygenFailureReported,
      ),
    },
    {
      name: 'EthereumThresholdSigner.KeyHandoverFailureReported',
      handler: wrapHandler(
        map.EthereumThresholdSigner?.KeyHandoverFailureReported,
        ethereumThresholdSignerKeyHandoverFailureReported,
      ),
    },
    {
      name: 'EthereumThresholdSigner.KeygenSuccess',
      handler: wrapHandler(
        map.EthereumThresholdSigner?.KeygenSuccess,
        ethereumThresholdSignerKeygenSuccess,
      ),
    },
    {
      name: 'EthereumThresholdSigner.KeyHandoverSuccess',
      handler: wrapHandler(
        map.EthereumThresholdSigner?.KeyHandoverSuccess,
        ethereumThresholdSignerKeyHandoverSuccess,
      ),
    },
    {
      name: 'EthereumThresholdSigner.NoKeyHandover',
      handler: wrapHandler(
        map.EthereumThresholdSigner?.NoKeyHandover,
        ethereumThresholdSignerNoKeyHandover,
      ),
    },
    {
      name: 'EthereumThresholdSigner.KeygenVerificationSuccess',
      handler: wrapHandler(
        map.EthereumThresholdSigner?.KeygenVerificationSuccess,
        ethereumThresholdSignerKeygenVerificationSuccess,
      ),
    },
    {
      name: 'EthereumThresholdSigner.KeyHandoverVerificationSuccess',
      handler: wrapHandler(
        map.EthereumThresholdSigner?.KeyHandoverVerificationSuccess,
        ethereumThresholdSignerKeyHandoverVerificationSuccess,
      ),
    },
    {
      name: 'EthereumThresholdSigner.KeygenVerificationFailure',
      handler: wrapHandler(
        map.EthereumThresholdSigner?.KeygenVerificationFailure,
        ethereumThresholdSignerKeygenVerificationFailure,
      ),
    },
    {
      name: 'EthereumThresholdSigner.KeyHandoverVerificationFailure',
      handler: wrapHandler(
        map.EthereumThresholdSigner?.KeyHandoverVerificationFailure,
        ethereumThresholdSignerKeyHandoverVerificationFailure,
      ),
    },
    {
      name: 'EthereumThresholdSigner.KeygenFailure',
      handler: wrapHandler(
        map.EthereumThresholdSigner?.KeygenFailure,
        ethereumThresholdSignerKeygenFailure,
      ),
    },
    {
      name: 'EthereumThresholdSigner.KeygenResponseTimeout',
      handler: wrapHandler(
        map.EthereumThresholdSigner?.KeygenResponseTimeout,
        ethereumThresholdSignerKeygenResponseTimeout,
      ),
    },
    {
      name: 'EthereumThresholdSigner.KeyHandoverResponseTimeout',
      handler: wrapHandler(
        map.EthereumThresholdSigner?.KeyHandoverResponseTimeout,
        ethereumThresholdSignerKeyHandoverResponseTimeout,
      ),
    },
    {
      name: 'EthereumThresholdSigner.KeygenResponseTimeoutUpdated',
      handler: wrapHandler(
        map.EthereumThresholdSigner?.KeygenResponseTimeoutUpdated,
        ethereumThresholdSignerKeygenResponseTimeoutUpdated,
      ),
    },
    {
      name: 'EthereumThresholdSigner.KeyHandoverFailure',
      handler: wrapHandler(
        map.EthereumThresholdSigner?.KeyHandoverFailure,
        ethereumThresholdSignerKeyHandoverFailure,
      ),
    },
    {
      name: 'EthereumThresholdSigner.KeyRotationCompleted',
      handler: wrapHandler(
        map.EthereumThresholdSigner?.KeyRotationCompleted,
        ethereumThresholdSignerKeyRotationCompleted,
      ),
    },
    {
      name: 'PolkadotThresholdSigner.KeygenRequest',
      handler: wrapHandler(
        map.PolkadotThresholdSigner?.KeygenRequest,
        polkadotThresholdSignerKeygenRequest,
      ),
    },
    {
      name: 'PolkadotThresholdSigner.KeyHandoverRequest',
      handler: wrapHandler(
        map.PolkadotThresholdSigner?.KeyHandoverRequest,
        polkadotThresholdSignerKeyHandoverRequest,
      ),
    },
    {
      name: 'PolkadotThresholdSigner.KeygenSuccessReported',
      handler: wrapHandler(
        map.PolkadotThresholdSigner?.KeygenSuccessReported,
        polkadotThresholdSignerKeygenSuccessReported,
      ),
    },
    {
      name: 'PolkadotThresholdSigner.KeyHandoverSuccessReported',
      handler: wrapHandler(
        map.PolkadotThresholdSigner?.KeyHandoverSuccessReported,
        polkadotThresholdSignerKeyHandoverSuccessReported,
      ),
    },
    {
      name: 'PolkadotThresholdSigner.KeygenFailureReported',
      handler: wrapHandler(
        map.PolkadotThresholdSigner?.KeygenFailureReported,
        polkadotThresholdSignerKeygenFailureReported,
      ),
    },
    {
      name: 'PolkadotThresholdSigner.KeyHandoverFailureReported',
      handler: wrapHandler(
        map.PolkadotThresholdSigner?.KeyHandoverFailureReported,
        polkadotThresholdSignerKeyHandoverFailureReported,
      ),
    },
    {
      name: 'PolkadotThresholdSigner.KeygenSuccess',
      handler: wrapHandler(
        map.PolkadotThresholdSigner?.KeygenSuccess,
        polkadotThresholdSignerKeygenSuccess,
      ),
    },
    {
      name: 'PolkadotThresholdSigner.KeyHandoverSuccess',
      handler: wrapHandler(
        map.PolkadotThresholdSigner?.KeyHandoverSuccess,
        polkadotThresholdSignerKeyHandoverSuccess,
      ),
    },
    {
      name: 'PolkadotThresholdSigner.NoKeyHandover',
      handler: wrapHandler(
        map.PolkadotThresholdSigner?.NoKeyHandover,
        polkadotThresholdSignerNoKeyHandover,
      ),
    },
    {
      name: 'PolkadotThresholdSigner.KeygenVerificationSuccess',
      handler: wrapHandler(
        map.PolkadotThresholdSigner?.KeygenVerificationSuccess,
        polkadotThresholdSignerKeygenVerificationSuccess,
      ),
    },
    {
      name: 'PolkadotThresholdSigner.KeyHandoverVerificationSuccess',
      handler: wrapHandler(
        map.PolkadotThresholdSigner?.KeyHandoverVerificationSuccess,
        polkadotThresholdSignerKeyHandoverVerificationSuccess,
      ),
    },
    {
      name: 'PolkadotThresholdSigner.KeygenVerificationFailure',
      handler: wrapHandler(
        map.PolkadotThresholdSigner?.KeygenVerificationFailure,
        polkadotThresholdSignerKeygenVerificationFailure,
      ),
    },
    {
      name: 'PolkadotThresholdSigner.KeyHandoverVerificationFailure',
      handler: wrapHandler(
        map.PolkadotThresholdSigner?.KeyHandoverVerificationFailure,
        polkadotThresholdSignerKeyHandoverVerificationFailure,
      ),
    },
    {
      name: 'PolkadotThresholdSigner.KeygenFailure',
      handler: wrapHandler(
        map.PolkadotThresholdSigner?.KeygenFailure,
        polkadotThresholdSignerKeygenFailure,
      ),
    },
    {
      name: 'PolkadotThresholdSigner.KeygenResponseTimeout',
      handler: wrapHandler(
        map.PolkadotThresholdSigner?.KeygenResponseTimeout,
        polkadotThresholdSignerKeygenResponseTimeout,
      ),
    },
    {
      name: 'PolkadotThresholdSigner.KeyHandoverResponseTimeout',
      handler: wrapHandler(
        map.PolkadotThresholdSigner?.KeyHandoverResponseTimeout,
        polkadotThresholdSignerKeyHandoverResponseTimeout,
      ),
    },
    {
      name: 'PolkadotThresholdSigner.KeygenResponseTimeoutUpdated',
      handler: wrapHandler(
        map.PolkadotThresholdSigner?.KeygenResponseTimeoutUpdated,
        polkadotThresholdSignerKeygenResponseTimeoutUpdated,
      ),
    },
    {
      name: 'PolkadotThresholdSigner.KeyHandoverFailure',
      handler: wrapHandler(
        map.PolkadotThresholdSigner?.KeyHandoverFailure,
        polkadotThresholdSignerKeyHandoverFailure,
      ),
    },
    {
      name: 'PolkadotThresholdSigner.KeyRotationCompleted',
      handler: wrapHandler(
        map.PolkadotThresholdSigner?.KeyRotationCompleted,
        polkadotThresholdSignerKeyRotationCompleted,
      ),
    },
    {
      name: 'BitcoinThresholdSigner.KeygenRequest',
      handler: wrapHandler(
        map.BitcoinThresholdSigner?.KeygenRequest,
        bitcoinThresholdSignerKeygenRequest,
      ),
    },
    {
      name: 'BitcoinThresholdSigner.KeyHandoverRequest',
      handler: wrapHandler(
        map.BitcoinThresholdSigner?.KeyHandoverRequest,
        bitcoinThresholdSignerKeyHandoverRequest,
      ),
    },
    {
      name: 'BitcoinThresholdSigner.KeygenSuccessReported',
      handler: wrapHandler(
        map.BitcoinThresholdSigner?.KeygenSuccessReported,
        bitcoinThresholdSignerKeygenSuccessReported,
      ),
    },
    {
      name: 'BitcoinThresholdSigner.KeyHandoverSuccessReported',
      handler: wrapHandler(
        map.BitcoinThresholdSigner?.KeyHandoverSuccessReported,
        bitcoinThresholdSignerKeyHandoverSuccessReported,
      ),
    },
    {
      name: 'BitcoinThresholdSigner.KeygenFailureReported',
      handler: wrapHandler(
        map.BitcoinThresholdSigner?.KeygenFailureReported,
        bitcoinThresholdSignerKeygenFailureReported,
      ),
    },
    {
      name: 'BitcoinThresholdSigner.KeyHandoverFailureReported',
      handler: wrapHandler(
        map.BitcoinThresholdSigner?.KeyHandoverFailureReported,
        bitcoinThresholdSignerKeyHandoverFailureReported,
      ),
    },
    {
      name: 'BitcoinThresholdSigner.KeygenSuccess',
      handler: wrapHandler(
        map.BitcoinThresholdSigner?.KeygenSuccess,
        bitcoinThresholdSignerKeygenSuccess,
      ),
    },
    {
      name: 'BitcoinThresholdSigner.KeyHandoverSuccess',
      handler: wrapHandler(
        map.BitcoinThresholdSigner?.KeyHandoverSuccess,
        bitcoinThresholdSignerKeyHandoverSuccess,
      ),
    },
    {
      name: 'BitcoinThresholdSigner.NoKeyHandover',
      handler: wrapHandler(
        map.BitcoinThresholdSigner?.NoKeyHandover,
        bitcoinThresholdSignerNoKeyHandover,
      ),
    },
    {
      name: 'BitcoinThresholdSigner.KeygenVerificationSuccess',
      handler: wrapHandler(
        map.BitcoinThresholdSigner?.KeygenVerificationSuccess,
        bitcoinThresholdSignerKeygenVerificationSuccess,
      ),
    },
    {
      name: 'BitcoinThresholdSigner.KeyHandoverVerificationSuccess',
      handler: wrapHandler(
        map.BitcoinThresholdSigner?.KeyHandoverVerificationSuccess,
        bitcoinThresholdSignerKeyHandoverVerificationSuccess,
      ),
    },
    {
      name: 'BitcoinThresholdSigner.KeygenVerificationFailure',
      handler: wrapHandler(
        map.BitcoinThresholdSigner?.KeygenVerificationFailure,
        bitcoinThresholdSignerKeygenVerificationFailure,
      ),
    },
    {
      name: 'BitcoinThresholdSigner.KeyHandoverVerificationFailure',
      handler: wrapHandler(
        map.BitcoinThresholdSigner?.KeyHandoverVerificationFailure,
        bitcoinThresholdSignerKeyHandoverVerificationFailure,
      ),
    },
    {
      name: 'BitcoinThresholdSigner.KeygenFailure',
      handler: wrapHandler(
        map.BitcoinThresholdSigner?.KeygenFailure,
        bitcoinThresholdSignerKeygenFailure,
      ),
    },
    {
      name: 'BitcoinThresholdSigner.KeygenResponseTimeout',
      handler: wrapHandler(
        map.BitcoinThresholdSigner?.KeygenResponseTimeout,
        bitcoinThresholdSignerKeygenResponseTimeout,
      ),
    },
    {
      name: 'BitcoinThresholdSigner.KeyHandoverResponseTimeout',
      handler: wrapHandler(
        map.BitcoinThresholdSigner?.KeyHandoverResponseTimeout,
        bitcoinThresholdSignerKeyHandoverResponseTimeout,
      ),
    },
    {
      name: 'BitcoinThresholdSigner.KeygenResponseTimeoutUpdated',
      handler: wrapHandler(
        map.BitcoinThresholdSigner?.KeygenResponseTimeoutUpdated,
        bitcoinThresholdSignerKeygenResponseTimeoutUpdated,
      ),
    },
    {
      name: 'BitcoinThresholdSigner.KeyHandoverFailure',
      handler: wrapHandler(
        map.BitcoinThresholdSigner?.KeyHandoverFailure,
        bitcoinThresholdSignerKeyHandoverFailure,
      ),
    },
    {
      name: 'BitcoinThresholdSigner.KeyRotationCompleted',
      handler: wrapHandler(
        map.BitcoinThresholdSigner?.KeyRotationCompleted,
        bitcoinThresholdSignerKeyRotationCompleted,
      ),
    },
    {
      name: 'EthereumBroadcaster.BroadcastSuccess',
      handler: wrapHandler(
        map.EthereumBroadcaster?.BroadcastSuccess,
        ethereumBroadcasterBroadcastSuccess,
      ),
    },
    {
      name: 'PolkadotBroadcaster.BroadcastSuccess',
      handler: wrapHandler(
        map.PolkadotBroadcaster?.BroadcastSuccess,
        polkadotBroadcasterBroadcastSuccess,
      ),
    },
    {
      name: 'BitcoinBroadcaster.TransactionBroadcastRequest',
      handler: wrapHandler(
        map.BitcoinBroadcaster?.TransactionBroadcastRequest,
        bitcoinBroadcasterTransactionBroadcastRequest,
      ),
    },
    {
      name: 'BitcoinBroadcaster.BroadcastSuccess',
      handler: wrapHandler(
        map.BitcoinBroadcaster?.BroadcastSuccess,
        bitcoinBroadcasterBroadcastSuccess,
      ),
    },
    {
      name: 'Swapping.SwapDepositAddressReady',
      handler: wrapHandler(map.Swapping?.SwapDepositAddressReady, swappingSwapDepositAddressReady),
    },
    {
      name: 'Swapping.SwapScheduled',
      handler: wrapHandler(map.Swapping?.SwapScheduled, swappingSwapScheduled),
    },
    {
      name: 'Swapping.SwapExecuted',
      handler: wrapHandler(map.Swapping?.SwapExecuted, swappingSwapExecuted),
    },
    {
      name: 'Swapping.SwapEgressScheduled',
      handler: wrapHandler(map.Swapping?.SwapEgressScheduled, swappingSwapEgressScheduled),
    },
    {
      name: 'Swapping.WithdrawalRequested',
      handler: wrapHandler(map.Swapping?.WithdrawalRequested, swappingWithdrawalRequested),
    },
    {
      name: 'Swapping.BatchSwapFailed',
      handler: wrapHandler(map.Swapping?.BatchSwapFailed, swappingBatchSwapFailed),
    },
    {
      name: 'Swapping.CcmFailed',
      handler: wrapHandler(map.Swapping?.CcmFailed, swappingCcmFailed),
    },
    {
      name: 'Swapping.MaximumSwapAmountSet',
      handler: wrapHandler(map.Swapping?.MaximumSwapAmountSet, swappingMaximumSwapAmountSet),
    },
    {
      name: 'Swapping.SwapAmountConfiscated',
      handler: wrapHandler(map.Swapping?.SwapAmountConfiscated, swappingSwapAmountConfiscated),
    },
    {
      name: 'Swapping.SwapEgressIgnored',
      handler: wrapHandler(map.Swapping?.SwapEgressIgnored, swappingSwapEgressIgnored),
    },
    {
      name: 'LiquidityProvider.AccountDebited',
      handler: wrapHandler(map.LiquidityProvider?.AccountDebited, liquidityProviderAccountDebited),
    },
    {
      name: 'LiquidityProvider.AccountCredited',
      handler: wrapHandler(
        map.LiquidityProvider?.AccountCredited,
        liquidityProviderAccountCredited,
      ),
    },
    {
      name: 'LiquidityProvider.LiquidityDepositAddressReady',
      handler: wrapHandler(
        map.LiquidityProvider?.LiquidityDepositAddressReady,
        liquidityProviderLiquidityDepositAddressReady,
      ),
    },
    {
      name: 'LiquidityProvider.WithdrawalEgressScheduled',
      handler: wrapHandler(
        map.LiquidityProvider?.WithdrawalEgressScheduled,
        liquidityProviderWithdrawalEgressScheduled,
      ),
    },
    {
      name: 'LiquidityProvider.LiquidityDepositCredited',
      handler: wrapHandler(
        map.LiquidityProvider?.LiquidityDepositCredited,
        liquidityProviderLiquidityDepositCredited,
      ),
    },
    {
      name: 'EthereumIngressEgress.DepositReceived',
      handler: wrapHandler(
        map.EthereumIngressEgress?.DepositReceived,
        ethereumIngressEgressDepositReceived,
      ),
    },
    {
      name: 'EthereumIngressEgress.AssetEgressStatusChanged',
      handler: wrapHandler(
        map.EthereumIngressEgress?.AssetEgressStatusChanged,
        ethereumIngressEgressAssetEgressStatusChanged,
      ),
    },
    {
      name: 'EthereumIngressEgress.DepositFetchesScheduled',
      handler: wrapHandler(
        map.EthereumIngressEgress?.DepositFetchesScheduled,
        ethereumIngressEgressDepositFetchesScheduled,
      ),
    },
    {
      name: 'EthereumIngressEgress.MinimumDepositSet',
      handler: wrapHandler(
        map.EthereumIngressEgress?.MinimumDepositSet,
        ethereumIngressEgressMinimumDepositSet,
      ),
    },
    {
      name: 'EthereumIngressEgress.DepositIgnored',
      handler: wrapHandler(
        map.EthereumIngressEgress?.DepositIgnored,
        ethereumIngressEgressDepositIgnored,
      ),
    },
    {
      name: 'EthereumIngressEgress.TransferFallbackRequested',
      handler: wrapHandler(
        map.EthereumIngressEgress?.TransferFallbackRequested,
        ethereumIngressEgressTransferFallbackRequested,
      ),
    },
    {
      name: 'EthereumIngressEgress.DepositWitnessRejected',
      handler: wrapHandler(
        map.EthereumIngressEgress?.DepositWitnessRejected,
        ethereumIngressEgressDepositWitnessRejected,
      ),
    },
    {
      name: 'EthereumIngressEgress.FailedToBuildAllBatchCall',
      handler: wrapHandler(
        map.EthereumIngressEgress?.FailedToBuildAllBatchCall,
        ethereumIngressEgressFailedToBuildAllBatchCall,
      ),
    },
    {
      name: 'EthereumIngressEgress.ChannelOpeningFeePaid',
      handler: wrapHandler(
        map.EthereumIngressEgress?.ChannelOpeningFeePaid,
        ethereumIngressEgressChannelOpeningFeePaid,
      ),
    },
    {
      name: 'EthereumIngressEgress.ChannelOpeningFeeSet',
      handler: wrapHandler(
        map.EthereumIngressEgress?.ChannelOpeningFeeSet,
        ethereumIngressEgressChannelOpeningFeeSet,
      ),
    },
    {
      name: 'PolkadotIngressEgress.FailedToBuildAllBatchCall',
      handler: wrapHandler(
        map.PolkadotIngressEgress?.FailedToBuildAllBatchCall,
        polkadotIngressEgressFailedToBuildAllBatchCall,
      ),
    },
    {
      name: 'PolkadotIngressEgress.ChannelOpeningFeePaid',
      handler: wrapHandler(
        map.PolkadotIngressEgress?.ChannelOpeningFeePaid,
        polkadotIngressEgressChannelOpeningFeePaid,
      ),
    },
    {
      name: 'PolkadotIngressEgress.ChannelOpeningFeeSet',
      handler: wrapHandler(
        map.PolkadotIngressEgress?.ChannelOpeningFeeSet,
        polkadotIngressEgressChannelOpeningFeeSet,
      ),
    },
    {
      name: 'BitcoinIngressEgress.DepositReceived',
      handler: wrapHandler(
        map.BitcoinIngressEgress?.DepositReceived,
        bitcoinIngressEgressDepositReceived,
      ),
    },
    {
      name: 'BitcoinIngressEgress.DepositIgnored',
      handler: wrapHandler(
        map.BitcoinIngressEgress?.DepositIgnored,
        bitcoinIngressEgressDepositIgnored,
      ),
    },
    {
      name: 'BitcoinIngressEgress.DepositWitnessRejected',
      handler: wrapHandler(
        map.BitcoinIngressEgress?.DepositWitnessRejected,
        bitcoinIngressEgressDepositWitnessRejected,
      ),
    },
    {
      name: 'BitcoinIngressEgress.FailedToBuildAllBatchCall',
      handler: wrapHandler(
        map.BitcoinIngressEgress?.FailedToBuildAllBatchCall,
        bitcoinIngressEgressFailedToBuildAllBatchCall,
      ),
    },
    {
      name: 'BitcoinIngressEgress.ChannelOpeningFeePaid',
      handler: wrapHandler(
        map.BitcoinIngressEgress?.ChannelOpeningFeePaid,
        bitcoinIngressEgressChannelOpeningFeePaid,
      ),
    },
    {
      name: 'BitcoinIngressEgress.ChannelOpeningFeeSet',
      handler: wrapHandler(
        map.BitcoinIngressEgress?.ChannelOpeningFeeSet,
        bitcoinIngressEgressChannelOpeningFeeSet,
      ),
    },
    {
      name: 'LiquidityPools.NewPoolCreated',
      handler: wrapHandler(map.LiquidityPools?.NewPoolCreated, liquidityPoolsNewPoolCreated),
    },
    {
      name: 'LiquidityPools.RangeOrderUpdated',
      handler: wrapHandler(map.LiquidityPools?.RangeOrderUpdated, liquidityPoolsRangeOrderUpdated),
    },
    {
      name: 'LiquidityPools.LimitOrderUpdated',
      handler: wrapHandler(map.LiquidityPools?.LimitOrderUpdated, liquidityPoolsLimitOrderUpdated),
    },
    {
      name: 'LiquidityPools.AssetSwapped',
      handler: wrapHandler(map.LiquidityPools?.AssetSwapped, liquidityPoolsAssetSwapped),
    },
    {
      name: 'LiquidityPools.PoolFeeSet',
      handler: wrapHandler(map.LiquidityPools?.PoolFeeSet, liquidityPoolsPoolFeeSet),
    },
  ].filter((h): h is { name: string; handler: InternalEventHandler } => h.handler !== undefined),
});
