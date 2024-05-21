import { z } from 'zod';
import { InternalEventHandler, EventHandler, wrapHandler } from '../utils';
import { environmentAddedNewArbAsset } from './environment/addedNewArbAsset';
import { environmentUpdatedArbAsset } from './environment/updatedArbAsset';
import { environmentRuntimeSafeModeUpdated } from './environment/runtimeSafeModeUpdated';
import { environmentUtxoConsolidationParametersUpdated } from './environment/utxoConsolidationParametersUpdated';
import { environmentArbitrumInitialized } from './environment/arbitrumInitialized';
import { environmentStaleUtxosDiscarded } from './environment/staleUtxosDiscarded';
import { emissionsNetworkFeeBurned } from './emissions/networkFeeBurned';
import { accountRolesAccountRoleDeregistered } from './accountRoles/accountRoleDeregistered';
import { accountRolesVanityNameSet } from './accountRoles/vanityNameSet';
import { witnesserReportedWitnessingFailures } from './witnesser/reportedWitnessingFailures';
import { witnesserCallDispatched } from './witnesser/callDispatched';
import { validatorRotationPhaseUpdated } from './validator/rotationPhaseUpdated';
import { validatorStoppedBidding } from './validator/stoppedBidding';
import { validatorStartedBidding } from './validator/startedBidding';
import { tokenholderGovernanceProposalSubmitted } from './tokenholderGovernance/proposalSubmitted';
import { tokenholderGovernanceProposalPassed } from './tokenholderGovernance/proposalPassed';
import { tokenholderGovernanceProposalRejected } from './tokenholderGovernance/proposalRejected';
import { tokenholderGovernanceProposalEnacted } from './tokenholderGovernance/proposalEnacted';
import { tokenholderGovernanceGovKeyUpdatedHasFailed } from './tokenholderGovernance/govKeyUpdatedHasFailed';
import { tokenholderGovernanceGovKeyUpdatedWasSuccessful } from './tokenholderGovernance/govKeyUpdatedWasSuccessful';
import { ethereumVaultChainInitialized } from './ethereumVault/chainInitialized';
import { polkadotVaultChainInitialized } from './polkadotVault/chainInitialized';
import { bitcoinVaultChainInitialized } from './bitcoinVault/chainInitialized';
import { evmThresholdSignerThresholdSignatureRequest } from './evmThresholdSigner/thresholdSignatureRequest';
import { evmThresholdSignerThresholdSignatureFailed } from './evmThresholdSigner/thresholdSignatureFailed';
import { evmThresholdSignerThresholdSignatureSuccess } from './evmThresholdSigner/thresholdSignatureSuccess';
import { evmThresholdSignerThresholdDispatchComplete } from './evmThresholdSigner/thresholdDispatchComplete';
import { evmThresholdSignerRetryRequested } from './evmThresholdSigner/retryRequested';
import { evmThresholdSignerFailureReportProcessed } from './evmThresholdSigner/failureReportProcessed';
import { evmThresholdSignerSignersUnavailable } from './evmThresholdSigner/signersUnavailable';
import { evmThresholdSignerThresholdSignatureResponseTimeoutUpdated } from './evmThresholdSigner/thresholdSignatureResponseTimeoutUpdated';
import { evmThresholdSignerKeygenRequest } from './evmThresholdSigner/keygenRequest';
import { evmThresholdSignerKeyHandoverRequest } from './evmThresholdSigner/keyHandoverRequest';
import { evmThresholdSignerKeygenSuccessReported } from './evmThresholdSigner/keygenSuccessReported';
import { evmThresholdSignerKeyHandoverSuccessReported } from './evmThresholdSigner/keyHandoverSuccessReported';
import { evmThresholdSignerKeygenFailureReported } from './evmThresholdSigner/keygenFailureReported';
import { evmThresholdSignerKeyHandoverFailureReported } from './evmThresholdSigner/keyHandoverFailureReported';
import { evmThresholdSignerKeygenSuccess } from './evmThresholdSigner/keygenSuccess';
import { evmThresholdSignerKeyHandoverSuccess } from './evmThresholdSigner/keyHandoverSuccess';
import { evmThresholdSignerNoKeyHandover } from './evmThresholdSigner/noKeyHandover';
import { evmThresholdSignerKeygenVerificationSuccess } from './evmThresholdSigner/keygenVerificationSuccess';
import { evmThresholdSignerKeyHandoverVerificationSuccess } from './evmThresholdSigner/keyHandoverVerificationSuccess';
import { evmThresholdSignerKeygenVerificationFailure } from './evmThresholdSigner/keygenVerificationFailure';
import { evmThresholdSignerKeyHandoverVerificationFailure } from './evmThresholdSigner/keyHandoverVerificationFailure';
import { evmThresholdSignerKeygenFailure } from './evmThresholdSigner/keygenFailure';
import { evmThresholdSignerKeygenResponseTimeout } from './evmThresholdSigner/keygenResponseTimeout';
import { evmThresholdSignerKeyHandoverResponseTimeout } from './evmThresholdSigner/keyHandoverResponseTimeout';
import { evmThresholdSignerKeygenResponseTimeoutUpdated } from './evmThresholdSigner/keygenResponseTimeoutUpdated';
import { evmThresholdSignerKeyHandoverFailure } from './evmThresholdSigner/keyHandoverFailure';
import { evmThresholdSignerKeyRotationCompleted } from './evmThresholdSigner/keyRotationCompleted';
import { swappingSwapDepositAddressReady } from './swapping/swapDepositAddressReady';
import { swappingSwapScheduled } from './swapping/swapScheduled';
import { swappingSwapExecuted } from './swapping/swapExecuted';
import { swappingSwapEgressScheduled } from './swapping/swapEgressScheduled';
import { swappingWithdrawalRequested } from './swapping/withdrawalRequested';
import { swappingBatchSwapFailed } from './swapping/batchSwapFailed';
import { swappingCcmEgressScheduled } from './swapping/ccmEgressScheduled';
import { swappingCcmDepositReceived } from './swapping/ccmDepositReceived';
import { swappingCcmFailed } from './swapping/ccmFailed';
import { swappingMaximumSwapAmountSet } from './swapping/maximumSwapAmountSet';
import { swappingSwapAmountConfiscated } from './swapping/swapAmountConfiscated';
import { swappingSwapEgressIgnored } from './swapping/swapEgressIgnored';
import { liquidityProviderAccountDebited } from './liquidityProvider/accountDebited';
import { liquidityProviderAccountCredited } from './liquidityProvider/accountCredited';
import { liquidityProviderLiquidityDepositAddressReady } from './liquidityProvider/liquidityDepositAddressReady';
import { liquidityProviderWithdrawalEgressScheduled } from './liquidityProvider/withdrawalEgressScheduled';
import { liquidityProviderLiquidityRefundAddressRegistered } from './liquidityProvider/liquidityRefundAddressRegistered';
import { liquidityProviderLiquidityDepositCredited } from './liquidityProvider/liquidityDepositCredited';
import { liquidityProviderAssetTransferred } from './liquidityProvider/assetTransferred';
import { ethereumIngressEgressDepositFinalised } from './ethereumIngressEgress/depositFinalised';
import { ethereumIngressEgressCcmBroadcastRequested } from './ethereumIngressEgress/ccmBroadcastRequested';
import { ethereumIngressEgressCcmEgressInvalid } from './ethereumIngressEgress/ccmEgressInvalid';
import { ethereumIngressEgressBatchBroadcastRequested } from './ethereumIngressEgress/batchBroadcastRequested';
import { ethereumIngressEgressDepositBoosted } from './ethereumIngressEgress/depositBoosted';
import { ethereumIngressEgressBoostFundsAdded } from './ethereumIngressEgress/boostFundsAdded';
import { ethereumIngressEgressStoppedBoosting } from './ethereumIngressEgress/stoppedBoosting';
import { ethereumIngressEgressInsufficientBoostLiquidity } from './ethereumIngressEgress/insufficientBoostLiquidity';
import { ethereumIngressEgressBoostPoolCreated } from './ethereumIngressEgress/boostPoolCreated';
import { polkadotIngressEgressDepositFinalised } from './polkadotIngressEgress/depositFinalised';
import { polkadotIngressEgressCcmBroadcastRequested } from './polkadotIngressEgress/ccmBroadcastRequested';
import { polkadotIngressEgressCcmEgressInvalid } from './polkadotIngressEgress/ccmEgressInvalid';
import { polkadotIngressEgressBatchBroadcastRequested } from './polkadotIngressEgress/batchBroadcastRequested';
import { polkadotIngressEgressDepositBoosted } from './polkadotIngressEgress/depositBoosted';
import { polkadotIngressEgressBoostFundsAdded } from './polkadotIngressEgress/boostFundsAdded';
import { polkadotIngressEgressStoppedBoosting } from './polkadotIngressEgress/stoppedBoosting';
import { polkadotIngressEgressInsufficientBoostLiquidity } from './polkadotIngressEgress/insufficientBoostLiquidity';
import { polkadotIngressEgressBoostPoolCreated } from './polkadotIngressEgress/boostPoolCreated';
import { bitcoinIngressEgressDepositFinalised } from './bitcoinIngressEgress/depositFinalised';
import { bitcoinIngressEgressCcmBroadcastRequested } from './bitcoinIngressEgress/ccmBroadcastRequested';
import { bitcoinIngressEgressCcmEgressInvalid } from './bitcoinIngressEgress/ccmEgressInvalid';
import { bitcoinIngressEgressBatchBroadcastRequested } from './bitcoinIngressEgress/batchBroadcastRequested';
import { bitcoinIngressEgressDepositBoosted } from './bitcoinIngressEgress/depositBoosted';
import { bitcoinIngressEgressBoostFundsAdded } from './bitcoinIngressEgress/boostFundsAdded';
import { bitcoinIngressEgressStoppedBoosting } from './bitcoinIngressEgress/stoppedBoosting';
import { bitcoinIngressEgressInsufficientBoostLiquidity } from './bitcoinIngressEgress/insufficientBoostLiquidity';
import { bitcoinIngressEgressBoostPoolCreated } from './bitcoinIngressEgress/boostPoolCreated';
import { liquidityPoolsNewPoolCreated } from './liquidityPools/newPoolCreated';
import { liquidityPoolsRangeOrderUpdated } from './liquidityPools/rangeOrderUpdated';
import { liquidityPoolsLimitOrderUpdated } from './liquidityPools/limitOrderUpdated';
import { liquidityPoolsAssetSwapped } from './liquidityPools/assetSwapped';
import { liquidityPoolsPoolFeeSet } from './liquidityPools/poolFeeSet';
import { liquidityPoolsPriceImpactLimitSet } from './liquidityPools/priceImpactLimitSet';
import { arbitrumChainTrackingChainStateUpdated } from './arbitrumChainTracking/chainStateUpdated';
import { arbitrumChainTrackingFeeMultiplierUpdated } from './arbitrumChainTracking/feeMultiplierUpdated';
import { arbitrumVaultVaultActivationCompleted } from './arbitrumVault/vaultActivationCompleted';
import { arbitrumVaultVaultRotatedExternally } from './arbitrumVault/vaultRotatedExternally';
import { arbitrumVaultAwaitingGovernanceActivation } from './arbitrumVault/awaitingGovernanceActivation';
import { arbitrumVaultChainInitialized } from './arbitrumVault/chainInitialized';
import { arbitrumBroadcasterTransactionBroadcastRequest } from './arbitrumBroadcaster/transactionBroadcastRequest';
import { arbitrumBroadcasterBroadcastRetryScheduled } from './arbitrumBroadcaster/broadcastRetryScheduled';
import { arbitrumBroadcasterBroadcastTimeout } from './arbitrumBroadcaster/broadcastTimeout';
import { arbitrumBroadcasterBroadcastAborted } from './arbitrumBroadcaster/broadcastAborted';
import { arbitrumBroadcasterBroadcastSuccess } from './arbitrumBroadcaster/broadcastSuccess';
import { arbitrumBroadcasterThresholdSignatureInvalid } from './arbitrumBroadcaster/thresholdSignatureInvalid';
import { arbitrumBroadcasterBroadcastCallbackExecuted } from './arbitrumBroadcaster/broadcastCallbackExecuted';
import { arbitrumBroadcasterTransactionFeeDeficitRecorded } from './arbitrumBroadcaster/transactionFeeDeficitRecorded';
import { arbitrumBroadcasterTransactionFeeDeficitRefused } from './arbitrumBroadcaster/transactionFeeDeficitRefused';
import { arbitrumBroadcasterCallResigned } from './arbitrumBroadcaster/callResigned';
import { arbitrumIngressEgressDepositFinalised } from './arbitrumIngressEgress/depositFinalised';
import { arbitrumIngressEgressAssetEgressStatusChanged } from './arbitrumIngressEgress/assetEgressStatusChanged';
import { arbitrumIngressEgressCcmBroadcastRequested } from './arbitrumIngressEgress/ccmBroadcastRequested';
import { arbitrumIngressEgressCcmEgressInvalid } from './arbitrumIngressEgress/ccmEgressInvalid';
import { arbitrumIngressEgressDepositFetchesScheduled } from './arbitrumIngressEgress/depositFetchesScheduled';
import { arbitrumIngressEgressBatchBroadcastRequested } from './arbitrumIngressEgress/batchBroadcastRequested';
import { arbitrumIngressEgressMinimumDepositSet } from './arbitrumIngressEgress/minimumDepositSet';
import { arbitrumIngressEgressDepositIgnored } from './arbitrumIngressEgress/depositIgnored';
import { arbitrumIngressEgressTransferFallbackRequested } from './arbitrumIngressEgress/transferFallbackRequested';
import { arbitrumIngressEgressDepositWitnessRejected } from './arbitrumIngressEgress/depositWitnessRejected';
import { arbitrumIngressEgressCcmBroadcastFailed } from './arbitrumIngressEgress/ccmBroadcastFailed';
import { arbitrumIngressEgressFailedForeignChainCallResigned } from './arbitrumIngressEgress/failedForeignChainCallResigned';
import { arbitrumIngressEgressFailedForeignChainCallExpired } from './arbitrumIngressEgress/failedForeignChainCallExpired';
import { arbitrumIngressEgressUtxoConsolidation } from './arbitrumIngressEgress/utxoConsolidation';
import { arbitrumIngressEgressFailedToBuildAllBatchCall } from './arbitrumIngressEgress/failedToBuildAllBatchCall';
import { arbitrumIngressEgressChannelOpeningFeePaid } from './arbitrumIngressEgress/channelOpeningFeePaid';
import { arbitrumIngressEgressChannelOpeningFeeSet } from './arbitrumIngressEgress/channelOpeningFeeSet';
import { arbitrumIngressEgressDepositBoosted } from './arbitrumIngressEgress/depositBoosted';
import { arbitrumIngressEgressBoostFundsAdded } from './arbitrumIngressEgress/boostFundsAdded';
import { arbitrumIngressEgressStoppedBoosting } from './arbitrumIngressEgress/stoppedBoosting';
import { arbitrumIngressEgressInsufficientBoostLiquidity } from './arbitrumIngressEgress/insufficientBoostLiquidity';
import { arbitrumIngressEgressBoostPoolCreated } from './arbitrumIngressEgress/boostPoolCreated';

export type EnvironmentAddedNewArbAsset = EventHandler<
  z.output<typeof environmentAddedNewArbAsset>
>;
export type EnvironmentUpdatedArbAsset = EventHandler<z.output<typeof environmentUpdatedArbAsset>>;
export type EnvironmentRuntimeSafeModeUpdated = EventHandler<
  z.output<typeof environmentRuntimeSafeModeUpdated>
>;
export type EnvironmentUtxoConsolidationParametersUpdated = EventHandler<
  z.output<typeof environmentUtxoConsolidationParametersUpdated>
>;
export type EnvironmentArbitrumInitialized = EventHandler<
  z.output<typeof environmentArbitrumInitialized>
>;
export type EnvironmentStaleUtxosDiscarded = EventHandler<
  z.output<typeof environmentStaleUtxosDiscarded>
>;
export type EmissionsNetworkFeeBurned = EventHandler<z.output<typeof emissionsNetworkFeeBurned>>;
export type AccountRolesAccountRoleDeregistered = EventHandler<
  z.output<typeof accountRolesAccountRoleDeregistered>
>;
export type AccountRolesVanityNameSet = EventHandler<z.output<typeof accountRolesVanityNameSet>>;
export type WitnesserReportedWitnessingFailures = EventHandler<
  z.output<typeof witnesserReportedWitnessingFailures>
>;
export type WitnesserCallDispatched = EventHandler<z.output<typeof witnesserCallDispatched>>;
export type ValidatorRotationPhaseUpdated = EventHandler<
  z.output<typeof validatorRotationPhaseUpdated>
>;
export type ValidatorStoppedBidding = EventHandler<z.output<typeof validatorStoppedBidding>>;
export type ValidatorStartedBidding = EventHandler<z.output<typeof validatorStartedBidding>>;
export type TokenholderGovernanceProposalSubmitted = EventHandler<
  z.output<typeof tokenholderGovernanceProposalSubmitted>
>;
export type TokenholderGovernanceProposalPassed = EventHandler<
  z.output<typeof tokenholderGovernanceProposalPassed>
>;
export type TokenholderGovernanceProposalRejected = EventHandler<
  z.output<typeof tokenholderGovernanceProposalRejected>
>;
export type TokenholderGovernanceProposalEnacted = EventHandler<
  z.output<typeof tokenholderGovernanceProposalEnacted>
>;
export type TokenholderGovernanceGovKeyUpdatedHasFailed = EventHandler<
  z.output<typeof tokenholderGovernanceGovKeyUpdatedHasFailed>
>;
export type TokenholderGovernanceGovKeyUpdatedWasSuccessful = EventHandler<
  z.output<typeof tokenholderGovernanceGovKeyUpdatedWasSuccessful>
>;
export type EthereumVaultChainInitialized = EventHandler<
  z.output<typeof ethereumVaultChainInitialized>
>;
export type PolkadotVaultChainInitialized = EventHandler<
  z.output<typeof polkadotVaultChainInitialized>
>;
export type BitcoinVaultChainInitialized = EventHandler<
  z.output<typeof bitcoinVaultChainInitialized>
>;
export type EvmThresholdSignerThresholdSignatureRequest = EventHandler<
  z.output<typeof evmThresholdSignerThresholdSignatureRequest>
>;
export type EvmThresholdSignerThresholdSignatureFailed = EventHandler<
  z.output<typeof evmThresholdSignerThresholdSignatureFailed>
>;
export type EvmThresholdSignerThresholdSignatureSuccess = EventHandler<
  z.output<typeof evmThresholdSignerThresholdSignatureSuccess>
>;
export type EvmThresholdSignerThresholdDispatchComplete = EventHandler<
  z.output<typeof evmThresholdSignerThresholdDispatchComplete>
>;
export type EvmThresholdSignerRetryRequested = EventHandler<
  z.output<typeof evmThresholdSignerRetryRequested>
>;
export type EvmThresholdSignerFailureReportProcessed = EventHandler<
  z.output<typeof evmThresholdSignerFailureReportProcessed>
>;
export type EvmThresholdSignerSignersUnavailable = EventHandler<
  z.output<typeof evmThresholdSignerSignersUnavailable>
>;
export type EvmThresholdSignerThresholdSignatureResponseTimeoutUpdated = EventHandler<
  z.output<typeof evmThresholdSignerThresholdSignatureResponseTimeoutUpdated>
>;
export type EvmThresholdSignerKeygenRequest = EventHandler<
  z.output<typeof evmThresholdSignerKeygenRequest>
>;
export type EvmThresholdSignerKeyHandoverRequest = EventHandler<
  z.output<typeof evmThresholdSignerKeyHandoverRequest>
>;
export type EvmThresholdSignerKeygenSuccessReported = EventHandler<
  z.output<typeof evmThresholdSignerKeygenSuccessReported>
>;
export type EvmThresholdSignerKeyHandoverSuccessReported = EventHandler<
  z.output<typeof evmThresholdSignerKeyHandoverSuccessReported>
>;
export type EvmThresholdSignerKeygenFailureReported = EventHandler<
  z.output<typeof evmThresholdSignerKeygenFailureReported>
>;
export type EvmThresholdSignerKeyHandoverFailureReported = EventHandler<
  z.output<typeof evmThresholdSignerKeyHandoverFailureReported>
>;
export type EvmThresholdSignerKeygenSuccess = EventHandler<
  z.output<typeof evmThresholdSignerKeygenSuccess>
>;
export type EvmThresholdSignerKeyHandoverSuccess = EventHandler<
  z.output<typeof evmThresholdSignerKeyHandoverSuccess>
>;
export type EvmThresholdSignerNoKeyHandover = EventHandler<
  z.output<typeof evmThresholdSignerNoKeyHandover>
>;
export type EvmThresholdSignerKeygenVerificationSuccess = EventHandler<
  z.output<typeof evmThresholdSignerKeygenVerificationSuccess>
>;
export type EvmThresholdSignerKeyHandoverVerificationSuccess = EventHandler<
  z.output<typeof evmThresholdSignerKeyHandoverVerificationSuccess>
>;
export type EvmThresholdSignerKeygenVerificationFailure = EventHandler<
  z.output<typeof evmThresholdSignerKeygenVerificationFailure>
>;
export type EvmThresholdSignerKeyHandoverVerificationFailure = EventHandler<
  z.output<typeof evmThresholdSignerKeyHandoverVerificationFailure>
>;
export type EvmThresholdSignerKeygenFailure = EventHandler<
  z.output<typeof evmThresholdSignerKeygenFailure>
>;
export type EvmThresholdSignerKeygenResponseTimeout = EventHandler<
  z.output<typeof evmThresholdSignerKeygenResponseTimeout>
>;
export type EvmThresholdSignerKeyHandoverResponseTimeout = EventHandler<
  z.output<typeof evmThresholdSignerKeyHandoverResponseTimeout>
>;
export type EvmThresholdSignerKeygenResponseTimeoutUpdated = EventHandler<
  z.output<typeof evmThresholdSignerKeygenResponseTimeoutUpdated>
>;
export type EvmThresholdSignerKeyHandoverFailure = EventHandler<
  z.output<typeof evmThresholdSignerKeyHandoverFailure>
>;
export type EvmThresholdSignerKeyRotationCompleted = EventHandler<
  z.output<typeof evmThresholdSignerKeyRotationCompleted>
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
export type SwappingCcmEgressScheduled = EventHandler<z.output<typeof swappingCcmEgressScheduled>>;
export type SwappingCcmDepositReceived = EventHandler<z.output<typeof swappingCcmDepositReceived>>;
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
export type LiquidityProviderLiquidityRefundAddressRegistered = EventHandler<
  z.output<typeof liquidityProviderLiquidityRefundAddressRegistered>
>;
export type LiquidityProviderLiquidityDepositCredited = EventHandler<
  z.output<typeof liquidityProviderLiquidityDepositCredited>
>;
export type LiquidityProviderAssetTransferred = EventHandler<
  z.output<typeof liquidityProviderAssetTransferred>
>;
export type EthereumIngressEgressDepositFinalised = EventHandler<
  z.output<typeof ethereumIngressEgressDepositFinalised>
>;
export type EthereumIngressEgressCcmBroadcastRequested = EventHandler<
  z.output<typeof ethereumIngressEgressCcmBroadcastRequested>
>;
export type EthereumIngressEgressCcmEgressInvalid = EventHandler<
  z.output<typeof ethereumIngressEgressCcmEgressInvalid>
>;
export type EthereumIngressEgressBatchBroadcastRequested = EventHandler<
  z.output<typeof ethereumIngressEgressBatchBroadcastRequested>
>;
export type EthereumIngressEgressDepositBoosted = EventHandler<
  z.output<typeof ethereumIngressEgressDepositBoosted>
>;
export type EthereumIngressEgressBoostFundsAdded = EventHandler<
  z.output<typeof ethereumIngressEgressBoostFundsAdded>
>;
export type EthereumIngressEgressStoppedBoosting = EventHandler<
  z.output<typeof ethereumIngressEgressStoppedBoosting>
>;
export type EthereumIngressEgressInsufficientBoostLiquidity = EventHandler<
  z.output<typeof ethereumIngressEgressInsufficientBoostLiquidity>
>;
export type EthereumIngressEgressBoostPoolCreated = EventHandler<
  z.output<typeof ethereumIngressEgressBoostPoolCreated>
>;
export type PolkadotIngressEgressDepositFinalised = EventHandler<
  z.output<typeof polkadotIngressEgressDepositFinalised>
>;
export type PolkadotIngressEgressCcmBroadcastRequested = EventHandler<
  z.output<typeof polkadotIngressEgressCcmBroadcastRequested>
>;
export type PolkadotIngressEgressCcmEgressInvalid = EventHandler<
  z.output<typeof polkadotIngressEgressCcmEgressInvalid>
>;
export type PolkadotIngressEgressBatchBroadcastRequested = EventHandler<
  z.output<typeof polkadotIngressEgressBatchBroadcastRequested>
>;
export type PolkadotIngressEgressDepositBoosted = EventHandler<
  z.output<typeof polkadotIngressEgressDepositBoosted>
>;
export type PolkadotIngressEgressBoostFundsAdded = EventHandler<
  z.output<typeof polkadotIngressEgressBoostFundsAdded>
>;
export type PolkadotIngressEgressStoppedBoosting = EventHandler<
  z.output<typeof polkadotIngressEgressStoppedBoosting>
>;
export type PolkadotIngressEgressInsufficientBoostLiquidity = EventHandler<
  z.output<typeof polkadotIngressEgressInsufficientBoostLiquidity>
>;
export type PolkadotIngressEgressBoostPoolCreated = EventHandler<
  z.output<typeof polkadotIngressEgressBoostPoolCreated>
>;
export type BitcoinIngressEgressDepositFinalised = EventHandler<
  z.output<typeof bitcoinIngressEgressDepositFinalised>
>;
export type BitcoinIngressEgressCcmBroadcastRequested = EventHandler<
  z.output<typeof bitcoinIngressEgressCcmBroadcastRequested>
>;
export type BitcoinIngressEgressCcmEgressInvalid = EventHandler<
  z.output<typeof bitcoinIngressEgressCcmEgressInvalid>
>;
export type BitcoinIngressEgressBatchBroadcastRequested = EventHandler<
  z.output<typeof bitcoinIngressEgressBatchBroadcastRequested>
>;
export type BitcoinIngressEgressDepositBoosted = EventHandler<
  z.output<typeof bitcoinIngressEgressDepositBoosted>
>;
export type BitcoinIngressEgressBoostFundsAdded = EventHandler<
  z.output<typeof bitcoinIngressEgressBoostFundsAdded>
>;
export type BitcoinIngressEgressStoppedBoosting = EventHandler<
  z.output<typeof bitcoinIngressEgressStoppedBoosting>
>;
export type BitcoinIngressEgressInsufficientBoostLiquidity = EventHandler<
  z.output<typeof bitcoinIngressEgressInsufficientBoostLiquidity>
>;
export type BitcoinIngressEgressBoostPoolCreated = EventHandler<
  z.output<typeof bitcoinIngressEgressBoostPoolCreated>
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
export type LiquidityPoolsPriceImpactLimitSet = EventHandler<
  z.output<typeof liquidityPoolsPriceImpactLimitSet>
>;
export type ArbitrumChainTrackingChainStateUpdated = EventHandler<
  z.output<typeof arbitrumChainTrackingChainStateUpdated>
>;
export type ArbitrumChainTrackingFeeMultiplierUpdated = EventHandler<
  z.output<typeof arbitrumChainTrackingFeeMultiplierUpdated>
>;
export type ArbitrumVaultVaultActivationCompleted = EventHandler<
  z.output<typeof arbitrumVaultVaultActivationCompleted>
>;
export type ArbitrumVaultVaultRotatedExternally = EventHandler<
  z.output<typeof arbitrumVaultVaultRotatedExternally>
>;
export type ArbitrumVaultAwaitingGovernanceActivation = EventHandler<
  z.output<typeof arbitrumVaultAwaitingGovernanceActivation>
>;
export type ArbitrumVaultChainInitialized = EventHandler<
  z.output<typeof arbitrumVaultChainInitialized>
>;
export type ArbitrumBroadcasterTransactionBroadcastRequest = EventHandler<
  z.output<typeof arbitrumBroadcasterTransactionBroadcastRequest>
>;
export type ArbitrumBroadcasterBroadcastRetryScheduled = EventHandler<
  z.output<typeof arbitrumBroadcasterBroadcastRetryScheduled>
>;
export type ArbitrumBroadcasterBroadcastTimeout = EventHandler<
  z.output<typeof arbitrumBroadcasterBroadcastTimeout>
>;
export type ArbitrumBroadcasterBroadcastAborted = EventHandler<
  z.output<typeof arbitrumBroadcasterBroadcastAborted>
>;
export type ArbitrumBroadcasterBroadcastSuccess = EventHandler<
  z.output<typeof arbitrumBroadcasterBroadcastSuccess>
>;
export type ArbitrumBroadcasterThresholdSignatureInvalid = EventHandler<
  z.output<typeof arbitrumBroadcasterThresholdSignatureInvalid>
>;
export type ArbitrumBroadcasterBroadcastCallbackExecuted = EventHandler<
  z.output<typeof arbitrumBroadcasterBroadcastCallbackExecuted>
>;
export type ArbitrumBroadcasterTransactionFeeDeficitRecorded = EventHandler<
  z.output<typeof arbitrumBroadcasterTransactionFeeDeficitRecorded>
>;
export type ArbitrumBroadcasterTransactionFeeDeficitRefused = EventHandler<
  z.output<typeof arbitrumBroadcasterTransactionFeeDeficitRefused>
>;
export type ArbitrumBroadcasterCallResigned = EventHandler<
  z.output<typeof arbitrumBroadcasterCallResigned>
>;
export type ArbitrumIngressEgressDepositFinalised = EventHandler<
  z.output<typeof arbitrumIngressEgressDepositFinalised>
>;
export type ArbitrumIngressEgressAssetEgressStatusChanged = EventHandler<
  z.output<typeof arbitrumIngressEgressAssetEgressStatusChanged>
>;
export type ArbitrumIngressEgressCcmBroadcastRequested = EventHandler<
  z.output<typeof arbitrumIngressEgressCcmBroadcastRequested>
>;
export type ArbitrumIngressEgressCcmEgressInvalid = EventHandler<
  z.output<typeof arbitrumIngressEgressCcmEgressInvalid>
>;
export type ArbitrumIngressEgressDepositFetchesScheduled = EventHandler<
  z.output<typeof arbitrumIngressEgressDepositFetchesScheduled>
>;
export type ArbitrumIngressEgressBatchBroadcastRequested = EventHandler<
  z.output<typeof arbitrumIngressEgressBatchBroadcastRequested>
>;
export type ArbitrumIngressEgressMinimumDepositSet = EventHandler<
  z.output<typeof arbitrumIngressEgressMinimumDepositSet>
>;
export type ArbitrumIngressEgressDepositIgnored = EventHandler<
  z.output<typeof arbitrumIngressEgressDepositIgnored>
>;
export type ArbitrumIngressEgressTransferFallbackRequested = EventHandler<
  z.output<typeof arbitrumIngressEgressTransferFallbackRequested>
>;
export type ArbitrumIngressEgressDepositWitnessRejected = EventHandler<
  z.output<typeof arbitrumIngressEgressDepositWitnessRejected>
>;
export type ArbitrumIngressEgressCcmBroadcastFailed = EventHandler<
  z.output<typeof arbitrumIngressEgressCcmBroadcastFailed>
>;
export type ArbitrumIngressEgressFailedForeignChainCallResigned = EventHandler<
  z.output<typeof arbitrumIngressEgressFailedForeignChainCallResigned>
>;
export type ArbitrumIngressEgressFailedForeignChainCallExpired = EventHandler<
  z.output<typeof arbitrumIngressEgressFailedForeignChainCallExpired>
>;
export type ArbitrumIngressEgressUtxoConsolidation = EventHandler<
  z.output<typeof arbitrumIngressEgressUtxoConsolidation>
>;
export type ArbitrumIngressEgressFailedToBuildAllBatchCall = EventHandler<
  z.output<typeof arbitrumIngressEgressFailedToBuildAllBatchCall>
>;
export type ArbitrumIngressEgressChannelOpeningFeePaid = EventHandler<
  z.output<typeof arbitrumIngressEgressChannelOpeningFeePaid>
>;
export type ArbitrumIngressEgressChannelOpeningFeeSet = EventHandler<
  z.output<typeof arbitrumIngressEgressChannelOpeningFeeSet>
>;
export type ArbitrumIngressEgressDepositBoosted = EventHandler<
  z.output<typeof arbitrumIngressEgressDepositBoosted>
>;
export type ArbitrumIngressEgressBoostFundsAdded = EventHandler<
  z.output<typeof arbitrumIngressEgressBoostFundsAdded>
>;
export type ArbitrumIngressEgressStoppedBoosting = EventHandler<
  z.output<typeof arbitrumIngressEgressStoppedBoosting>
>;
export type ArbitrumIngressEgressInsufficientBoostLiquidity = EventHandler<
  z.output<typeof arbitrumIngressEgressInsufficientBoostLiquidity>
>;
export type ArbitrumIngressEgressBoostPoolCreated = EventHandler<
  z.output<typeof arbitrumIngressEgressBoostPoolCreated>
>;

type HandlerMap = {
  Environment?: {
    AddedNewArbAsset?: EnvironmentAddedNewArbAsset;
    UpdatedArbAsset?: EnvironmentUpdatedArbAsset;
    RuntimeSafeModeUpdated?: EnvironmentRuntimeSafeModeUpdated;
    UtxoConsolidationParametersUpdated?: EnvironmentUtxoConsolidationParametersUpdated;
    ArbitrumInitialized?: EnvironmentArbitrumInitialized;
    StaleUtxosDiscarded?: EnvironmentStaleUtxosDiscarded;
  };
  Emissions?: {
    NetworkFeeBurned?: EmissionsNetworkFeeBurned;
  };
  AccountRoles?: {
    AccountRoleDeregistered?: AccountRolesAccountRoleDeregistered;
    VanityNameSet?: AccountRolesVanityNameSet;
  };
  Witnesser?: {
    ReportedWitnessingFailures?: WitnesserReportedWitnessingFailures;
    CallDispatched?: WitnesserCallDispatched;
  };
  Validator?: {
    RotationPhaseUpdated?: ValidatorRotationPhaseUpdated;
    StoppedBidding?: ValidatorStoppedBidding;
    StartedBidding?: ValidatorStartedBidding;
  };
  TokenholderGovernance?: {
    ProposalSubmitted?: TokenholderGovernanceProposalSubmitted;
    ProposalPassed?: TokenholderGovernanceProposalPassed;
    ProposalRejected?: TokenholderGovernanceProposalRejected;
    ProposalEnacted?: TokenholderGovernanceProposalEnacted;
    GovKeyUpdatedHasFailed?: TokenholderGovernanceGovKeyUpdatedHasFailed;
    GovKeyUpdatedWasSuccessful?: TokenholderGovernanceGovKeyUpdatedWasSuccessful;
  };
  EthereumVault?: {
    ChainInitialized?: EthereumVaultChainInitialized;
  };
  PolkadotVault?: {
    ChainInitialized?: PolkadotVaultChainInitialized;
  };
  BitcoinVault?: {
    ChainInitialized?: BitcoinVaultChainInitialized;
  };
  EvmThresholdSigner?: {
    ThresholdSignatureRequest?: EvmThresholdSignerThresholdSignatureRequest;
    ThresholdSignatureFailed?: EvmThresholdSignerThresholdSignatureFailed;
    ThresholdSignatureSuccess?: EvmThresholdSignerThresholdSignatureSuccess;
    ThresholdDispatchComplete?: EvmThresholdSignerThresholdDispatchComplete;
    RetryRequested?: EvmThresholdSignerRetryRequested;
    FailureReportProcessed?: EvmThresholdSignerFailureReportProcessed;
    SignersUnavailable?: EvmThresholdSignerSignersUnavailable;
    ThresholdSignatureResponseTimeoutUpdated?: EvmThresholdSignerThresholdSignatureResponseTimeoutUpdated;
    KeygenRequest?: EvmThresholdSignerKeygenRequest;
    KeyHandoverRequest?: EvmThresholdSignerKeyHandoverRequest;
    KeygenSuccessReported?: EvmThresholdSignerKeygenSuccessReported;
    KeyHandoverSuccessReported?: EvmThresholdSignerKeyHandoverSuccessReported;
    KeygenFailureReported?: EvmThresholdSignerKeygenFailureReported;
    KeyHandoverFailureReported?: EvmThresholdSignerKeyHandoverFailureReported;
    KeygenSuccess?: EvmThresholdSignerKeygenSuccess;
    KeyHandoverSuccess?: EvmThresholdSignerKeyHandoverSuccess;
    NoKeyHandover?: EvmThresholdSignerNoKeyHandover;
    KeygenVerificationSuccess?: EvmThresholdSignerKeygenVerificationSuccess;
    KeyHandoverVerificationSuccess?: EvmThresholdSignerKeyHandoverVerificationSuccess;
    KeygenVerificationFailure?: EvmThresholdSignerKeygenVerificationFailure;
    KeyHandoverVerificationFailure?: EvmThresholdSignerKeyHandoverVerificationFailure;
    KeygenFailure?: EvmThresholdSignerKeygenFailure;
    KeygenResponseTimeout?: EvmThresholdSignerKeygenResponseTimeout;
    KeyHandoverResponseTimeout?: EvmThresholdSignerKeyHandoverResponseTimeout;
    KeygenResponseTimeoutUpdated?: EvmThresholdSignerKeygenResponseTimeoutUpdated;
    KeyHandoverFailure?: EvmThresholdSignerKeyHandoverFailure;
    KeyRotationCompleted?: EvmThresholdSignerKeyRotationCompleted;
  };
  Swapping?: {
    SwapDepositAddressReady?: SwappingSwapDepositAddressReady;
    SwapScheduled?: SwappingSwapScheduled;
    SwapExecuted?: SwappingSwapExecuted;
    SwapEgressScheduled?: SwappingSwapEgressScheduled;
    WithdrawalRequested?: SwappingWithdrawalRequested;
    BatchSwapFailed?: SwappingBatchSwapFailed;
    CcmEgressScheduled?: SwappingCcmEgressScheduled;
    CcmDepositReceived?: SwappingCcmDepositReceived;
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
    LiquidityRefundAddressRegistered?: LiquidityProviderLiquidityRefundAddressRegistered;
    LiquidityDepositCredited?: LiquidityProviderLiquidityDepositCredited;
    AssetTransferred?: LiquidityProviderAssetTransferred;
  };
  EthereumIngressEgress?: {
    DepositFinalised?: EthereumIngressEgressDepositFinalised;
    CcmBroadcastRequested?: EthereumIngressEgressCcmBroadcastRequested;
    CcmEgressInvalid?: EthereumIngressEgressCcmEgressInvalid;
    BatchBroadcastRequested?: EthereumIngressEgressBatchBroadcastRequested;
    DepositBoosted?: EthereumIngressEgressDepositBoosted;
    BoostFundsAdded?: EthereumIngressEgressBoostFundsAdded;
    StoppedBoosting?: EthereumIngressEgressStoppedBoosting;
    InsufficientBoostLiquidity?: EthereumIngressEgressInsufficientBoostLiquidity;
    BoostPoolCreated?: EthereumIngressEgressBoostPoolCreated;
  };
  PolkadotIngressEgress?: {
    DepositFinalised?: PolkadotIngressEgressDepositFinalised;
    CcmBroadcastRequested?: PolkadotIngressEgressCcmBroadcastRequested;
    CcmEgressInvalid?: PolkadotIngressEgressCcmEgressInvalid;
    BatchBroadcastRequested?: PolkadotIngressEgressBatchBroadcastRequested;
    DepositBoosted?: PolkadotIngressEgressDepositBoosted;
    BoostFundsAdded?: PolkadotIngressEgressBoostFundsAdded;
    StoppedBoosting?: PolkadotIngressEgressStoppedBoosting;
    InsufficientBoostLiquidity?: PolkadotIngressEgressInsufficientBoostLiquidity;
    BoostPoolCreated?: PolkadotIngressEgressBoostPoolCreated;
  };
  BitcoinIngressEgress?: {
    DepositFinalised?: BitcoinIngressEgressDepositFinalised;
    CcmBroadcastRequested?: BitcoinIngressEgressCcmBroadcastRequested;
    CcmEgressInvalid?: BitcoinIngressEgressCcmEgressInvalid;
    BatchBroadcastRequested?: BitcoinIngressEgressBatchBroadcastRequested;
    DepositBoosted?: BitcoinIngressEgressDepositBoosted;
    BoostFundsAdded?: BitcoinIngressEgressBoostFundsAdded;
    StoppedBoosting?: BitcoinIngressEgressStoppedBoosting;
    InsufficientBoostLiquidity?: BitcoinIngressEgressInsufficientBoostLiquidity;
    BoostPoolCreated?: BitcoinIngressEgressBoostPoolCreated;
  };
  LiquidityPools?: {
    NewPoolCreated?: LiquidityPoolsNewPoolCreated;
    RangeOrderUpdated?: LiquidityPoolsRangeOrderUpdated;
    LimitOrderUpdated?: LiquidityPoolsLimitOrderUpdated;
    AssetSwapped?: LiquidityPoolsAssetSwapped;
    PoolFeeSet?: LiquidityPoolsPoolFeeSet;
    PriceImpactLimitSet?: LiquidityPoolsPriceImpactLimitSet;
  };
  ArbitrumChainTracking?: {
    ChainStateUpdated?: ArbitrumChainTrackingChainStateUpdated;
    FeeMultiplierUpdated?: ArbitrumChainTrackingFeeMultiplierUpdated;
  };
  ArbitrumVault?: {
    VaultActivationCompleted?: ArbitrumVaultVaultActivationCompleted;
    VaultRotatedExternally?: ArbitrumVaultVaultRotatedExternally;
    AwaitingGovernanceActivation?: ArbitrumVaultAwaitingGovernanceActivation;
    ChainInitialized?: ArbitrumVaultChainInitialized;
  };
  ArbitrumBroadcaster?: {
    TransactionBroadcastRequest?: ArbitrumBroadcasterTransactionBroadcastRequest;
    BroadcastRetryScheduled?: ArbitrumBroadcasterBroadcastRetryScheduled;
    BroadcastTimeout?: ArbitrumBroadcasterBroadcastTimeout;
    BroadcastAborted?: ArbitrumBroadcasterBroadcastAborted;
    BroadcastSuccess?: ArbitrumBroadcasterBroadcastSuccess;
    ThresholdSignatureInvalid?: ArbitrumBroadcasterThresholdSignatureInvalid;
    BroadcastCallbackExecuted?: ArbitrumBroadcasterBroadcastCallbackExecuted;
    TransactionFeeDeficitRecorded?: ArbitrumBroadcasterTransactionFeeDeficitRecorded;
    TransactionFeeDeficitRefused?: ArbitrumBroadcasterTransactionFeeDeficitRefused;
    CallResigned?: ArbitrumBroadcasterCallResigned;
  };
  ArbitrumIngressEgress?: {
    DepositFinalised?: ArbitrumIngressEgressDepositFinalised;
    AssetEgressStatusChanged?: ArbitrumIngressEgressAssetEgressStatusChanged;
    CcmBroadcastRequested?: ArbitrumIngressEgressCcmBroadcastRequested;
    CcmEgressInvalid?: ArbitrumIngressEgressCcmEgressInvalid;
    DepositFetchesScheduled?: ArbitrumIngressEgressDepositFetchesScheduled;
    BatchBroadcastRequested?: ArbitrumIngressEgressBatchBroadcastRequested;
    MinimumDepositSet?: ArbitrumIngressEgressMinimumDepositSet;
    DepositIgnored?: ArbitrumIngressEgressDepositIgnored;
    TransferFallbackRequested?: ArbitrumIngressEgressTransferFallbackRequested;
    DepositWitnessRejected?: ArbitrumIngressEgressDepositWitnessRejected;
    CcmBroadcastFailed?: ArbitrumIngressEgressCcmBroadcastFailed;
    FailedForeignChainCallResigned?: ArbitrumIngressEgressFailedForeignChainCallResigned;
    FailedForeignChainCallExpired?: ArbitrumIngressEgressFailedForeignChainCallExpired;
    UtxoConsolidation?: ArbitrumIngressEgressUtxoConsolidation;
    FailedToBuildAllBatchCall?: ArbitrumIngressEgressFailedToBuildAllBatchCall;
    ChannelOpeningFeePaid?: ArbitrumIngressEgressChannelOpeningFeePaid;
    ChannelOpeningFeeSet?: ArbitrumIngressEgressChannelOpeningFeeSet;
    DepositBoosted?: ArbitrumIngressEgressDepositBoosted;
    BoostFundsAdded?: ArbitrumIngressEgressBoostFundsAdded;
    StoppedBoosting?: ArbitrumIngressEgressStoppedBoosting;
    InsufficientBoostLiquidity?: ArbitrumIngressEgressInsufficientBoostLiquidity;
    BoostPoolCreated?: ArbitrumIngressEgressBoostPoolCreated;
  };
};

export const handleEvents = (map: HandlerMap) => ({
  spec: 141,
  handlers: [
    {
      name: 'Environment.AddedNewArbAsset',
      handler: wrapHandler(map.Environment?.AddedNewArbAsset, environmentAddedNewArbAsset),
    },
    {
      name: 'Environment.UpdatedArbAsset',
      handler: wrapHandler(map.Environment?.UpdatedArbAsset, environmentUpdatedArbAsset),
    },
    {
      name: 'Environment.RuntimeSafeModeUpdated',
      handler: wrapHandler(
        map.Environment?.RuntimeSafeModeUpdated,
        environmentRuntimeSafeModeUpdated,
      ),
    },
    {
      name: 'Environment.UtxoConsolidationParametersUpdated',
      handler: wrapHandler(
        map.Environment?.UtxoConsolidationParametersUpdated,
        environmentUtxoConsolidationParametersUpdated,
      ),
    },
    {
      name: 'Environment.ArbitrumInitialized',
      handler: wrapHandler(map.Environment?.ArbitrumInitialized, environmentArbitrumInitialized),
    },
    {
      name: 'Environment.StaleUtxosDiscarded',
      handler: wrapHandler(map.Environment?.StaleUtxosDiscarded, environmentStaleUtxosDiscarded),
    },
    {
      name: 'Emissions.NetworkFeeBurned',
      handler: wrapHandler(map.Emissions?.NetworkFeeBurned, emissionsNetworkFeeBurned),
    },
    {
      name: 'AccountRoles.AccountRoleDeregistered',
      handler: wrapHandler(
        map.AccountRoles?.AccountRoleDeregistered,
        accountRolesAccountRoleDeregistered,
      ),
    },
    {
      name: 'AccountRoles.VanityNameSet',
      handler: wrapHandler(map.AccountRoles?.VanityNameSet, accountRolesVanityNameSet),
    },
    {
      name: 'Witnesser.ReportedWitnessingFailures',
      handler: wrapHandler(
        map.Witnesser?.ReportedWitnessingFailures,
        witnesserReportedWitnessingFailures,
      ),
    },
    {
      name: 'Witnesser.CallDispatched',
      handler: wrapHandler(map.Witnesser?.CallDispatched, witnesserCallDispatched),
    },
    {
      name: 'Validator.RotationPhaseUpdated',
      handler: wrapHandler(map.Validator?.RotationPhaseUpdated, validatorRotationPhaseUpdated),
    },
    {
      name: 'Validator.StoppedBidding',
      handler: wrapHandler(map.Validator?.StoppedBidding, validatorStoppedBidding),
    },
    {
      name: 'Validator.StartedBidding',
      handler: wrapHandler(map.Validator?.StartedBidding, validatorStartedBidding),
    },
    {
      name: 'TokenholderGovernance.ProposalSubmitted',
      handler: wrapHandler(
        map.TokenholderGovernance?.ProposalSubmitted,
        tokenholderGovernanceProposalSubmitted,
      ),
    },
    {
      name: 'TokenholderGovernance.ProposalPassed',
      handler: wrapHandler(
        map.TokenholderGovernance?.ProposalPassed,
        tokenholderGovernanceProposalPassed,
      ),
    },
    {
      name: 'TokenholderGovernance.ProposalRejected',
      handler: wrapHandler(
        map.TokenholderGovernance?.ProposalRejected,
        tokenholderGovernanceProposalRejected,
      ),
    },
    {
      name: 'TokenholderGovernance.ProposalEnacted',
      handler: wrapHandler(
        map.TokenholderGovernance?.ProposalEnacted,
        tokenholderGovernanceProposalEnacted,
      ),
    },
    {
      name: 'TokenholderGovernance.GovKeyUpdatedHasFailed',
      handler: wrapHandler(
        map.TokenholderGovernance?.GovKeyUpdatedHasFailed,
        tokenholderGovernanceGovKeyUpdatedHasFailed,
      ),
    },
    {
      name: 'TokenholderGovernance.GovKeyUpdatedWasSuccessful',
      handler: wrapHandler(
        map.TokenholderGovernance?.GovKeyUpdatedWasSuccessful,
        tokenholderGovernanceGovKeyUpdatedWasSuccessful,
      ),
    },
    {
      name: 'EthereumVault.ChainInitialized',
      handler: wrapHandler(map.EthereumVault?.ChainInitialized, ethereumVaultChainInitialized),
    },
    {
      name: 'PolkadotVault.ChainInitialized',
      handler: wrapHandler(map.PolkadotVault?.ChainInitialized, polkadotVaultChainInitialized),
    },
    {
      name: 'BitcoinVault.ChainInitialized',
      handler: wrapHandler(map.BitcoinVault?.ChainInitialized, bitcoinVaultChainInitialized),
    },
    {
      name: 'EvmThresholdSigner.ThresholdSignatureRequest',
      handler: wrapHandler(
        map.EvmThresholdSigner?.ThresholdSignatureRequest,
        evmThresholdSignerThresholdSignatureRequest,
      ),
    },
    {
      name: 'EvmThresholdSigner.ThresholdSignatureFailed',
      handler: wrapHandler(
        map.EvmThresholdSigner?.ThresholdSignatureFailed,
        evmThresholdSignerThresholdSignatureFailed,
      ),
    },
    {
      name: 'EvmThresholdSigner.ThresholdSignatureSuccess',
      handler: wrapHandler(
        map.EvmThresholdSigner?.ThresholdSignatureSuccess,
        evmThresholdSignerThresholdSignatureSuccess,
      ),
    },
    {
      name: 'EvmThresholdSigner.ThresholdDispatchComplete',
      handler: wrapHandler(
        map.EvmThresholdSigner?.ThresholdDispatchComplete,
        evmThresholdSignerThresholdDispatchComplete,
      ),
    },
    {
      name: 'EvmThresholdSigner.RetryRequested',
      handler: wrapHandler(
        map.EvmThresholdSigner?.RetryRequested,
        evmThresholdSignerRetryRequested,
      ),
    },
    {
      name: 'EvmThresholdSigner.FailureReportProcessed',
      handler: wrapHandler(
        map.EvmThresholdSigner?.FailureReportProcessed,
        evmThresholdSignerFailureReportProcessed,
      ),
    },
    {
      name: 'EvmThresholdSigner.SignersUnavailable',
      handler: wrapHandler(
        map.EvmThresholdSigner?.SignersUnavailable,
        evmThresholdSignerSignersUnavailable,
      ),
    },
    {
      name: 'EvmThresholdSigner.ThresholdSignatureResponseTimeoutUpdated',
      handler: wrapHandler(
        map.EvmThresholdSigner?.ThresholdSignatureResponseTimeoutUpdated,
        evmThresholdSignerThresholdSignatureResponseTimeoutUpdated,
      ),
    },
    {
      name: 'EvmThresholdSigner.KeygenRequest',
      handler: wrapHandler(map.EvmThresholdSigner?.KeygenRequest, evmThresholdSignerKeygenRequest),
    },
    {
      name: 'EvmThresholdSigner.KeyHandoverRequest',
      handler: wrapHandler(
        map.EvmThresholdSigner?.KeyHandoverRequest,
        evmThresholdSignerKeyHandoverRequest,
      ),
    },
    {
      name: 'EvmThresholdSigner.KeygenSuccessReported',
      handler: wrapHandler(
        map.EvmThresholdSigner?.KeygenSuccessReported,
        evmThresholdSignerKeygenSuccessReported,
      ),
    },
    {
      name: 'EvmThresholdSigner.KeyHandoverSuccessReported',
      handler: wrapHandler(
        map.EvmThresholdSigner?.KeyHandoverSuccessReported,
        evmThresholdSignerKeyHandoverSuccessReported,
      ),
    },
    {
      name: 'EvmThresholdSigner.KeygenFailureReported',
      handler: wrapHandler(
        map.EvmThresholdSigner?.KeygenFailureReported,
        evmThresholdSignerKeygenFailureReported,
      ),
    },
    {
      name: 'EvmThresholdSigner.KeyHandoverFailureReported',
      handler: wrapHandler(
        map.EvmThresholdSigner?.KeyHandoverFailureReported,
        evmThresholdSignerKeyHandoverFailureReported,
      ),
    },
    {
      name: 'EvmThresholdSigner.KeygenSuccess',
      handler: wrapHandler(map.EvmThresholdSigner?.KeygenSuccess, evmThresholdSignerKeygenSuccess),
    },
    {
      name: 'EvmThresholdSigner.KeyHandoverSuccess',
      handler: wrapHandler(
        map.EvmThresholdSigner?.KeyHandoverSuccess,
        evmThresholdSignerKeyHandoverSuccess,
      ),
    },
    {
      name: 'EvmThresholdSigner.NoKeyHandover',
      handler: wrapHandler(map.EvmThresholdSigner?.NoKeyHandover, evmThresholdSignerNoKeyHandover),
    },
    {
      name: 'EvmThresholdSigner.KeygenVerificationSuccess',
      handler: wrapHandler(
        map.EvmThresholdSigner?.KeygenVerificationSuccess,
        evmThresholdSignerKeygenVerificationSuccess,
      ),
    },
    {
      name: 'EvmThresholdSigner.KeyHandoverVerificationSuccess',
      handler: wrapHandler(
        map.EvmThresholdSigner?.KeyHandoverVerificationSuccess,
        evmThresholdSignerKeyHandoverVerificationSuccess,
      ),
    },
    {
      name: 'EvmThresholdSigner.KeygenVerificationFailure',
      handler: wrapHandler(
        map.EvmThresholdSigner?.KeygenVerificationFailure,
        evmThresholdSignerKeygenVerificationFailure,
      ),
    },
    {
      name: 'EvmThresholdSigner.KeyHandoverVerificationFailure',
      handler: wrapHandler(
        map.EvmThresholdSigner?.KeyHandoverVerificationFailure,
        evmThresholdSignerKeyHandoverVerificationFailure,
      ),
    },
    {
      name: 'EvmThresholdSigner.KeygenFailure',
      handler: wrapHandler(map.EvmThresholdSigner?.KeygenFailure, evmThresholdSignerKeygenFailure),
    },
    {
      name: 'EvmThresholdSigner.KeygenResponseTimeout',
      handler: wrapHandler(
        map.EvmThresholdSigner?.KeygenResponseTimeout,
        evmThresholdSignerKeygenResponseTimeout,
      ),
    },
    {
      name: 'EvmThresholdSigner.KeyHandoverResponseTimeout',
      handler: wrapHandler(
        map.EvmThresholdSigner?.KeyHandoverResponseTimeout,
        evmThresholdSignerKeyHandoverResponseTimeout,
      ),
    },
    {
      name: 'EvmThresholdSigner.KeygenResponseTimeoutUpdated',
      handler: wrapHandler(
        map.EvmThresholdSigner?.KeygenResponseTimeoutUpdated,
        evmThresholdSignerKeygenResponseTimeoutUpdated,
      ),
    },
    {
      name: 'EvmThresholdSigner.KeyHandoverFailure',
      handler: wrapHandler(
        map.EvmThresholdSigner?.KeyHandoverFailure,
        evmThresholdSignerKeyHandoverFailure,
      ),
    },
    {
      name: 'EvmThresholdSigner.KeyRotationCompleted',
      handler: wrapHandler(
        map.EvmThresholdSigner?.KeyRotationCompleted,
        evmThresholdSignerKeyRotationCompleted,
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
      name: 'Swapping.CcmEgressScheduled',
      handler: wrapHandler(map.Swapping?.CcmEgressScheduled, swappingCcmEgressScheduled),
    },
    {
      name: 'Swapping.CcmDepositReceived',
      handler: wrapHandler(map.Swapping?.CcmDepositReceived, swappingCcmDepositReceived),
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
      name: 'LiquidityProvider.LiquidityRefundAddressRegistered',
      handler: wrapHandler(
        map.LiquidityProvider?.LiquidityRefundAddressRegistered,
        liquidityProviderLiquidityRefundAddressRegistered,
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
      name: 'LiquidityProvider.AssetTransferred',
      handler: wrapHandler(
        map.LiquidityProvider?.AssetTransferred,
        liquidityProviderAssetTransferred,
      ),
    },
    {
      name: 'EthereumIngressEgress.DepositFinalised',
      handler: wrapHandler(
        map.EthereumIngressEgress?.DepositFinalised,
        ethereumIngressEgressDepositFinalised,
      ),
    },
    {
      name: 'EthereumIngressEgress.CcmBroadcastRequested',
      handler: wrapHandler(
        map.EthereumIngressEgress?.CcmBroadcastRequested,
        ethereumIngressEgressCcmBroadcastRequested,
      ),
    },
    {
      name: 'EthereumIngressEgress.CcmEgressInvalid',
      handler: wrapHandler(
        map.EthereumIngressEgress?.CcmEgressInvalid,
        ethereumIngressEgressCcmEgressInvalid,
      ),
    },
    {
      name: 'EthereumIngressEgress.BatchBroadcastRequested',
      handler: wrapHandler(
        map.EthereumIngressEgress?.BatchBroadcastRequested,
        ethereumIngressEgressBatchBroadcastRequested,
      ),
    },
    {
      name: 'EthereumIngressEgress.DepositBoosted',
      handler: wrapHandler(
        map.EthereumIngressEgress?.DepositBoosted,
        ethereumIngressEgressDepositBoosted,
      ),
    },
    {
      name: 'EthereumIngressEgress.BoostFundsAdded',
      handler: wrapHandler(
        map.EthereumIngressEgress?.BoostFundsAdded,
        ethereumIngressEgressBoostFundsAdded,
      ),
    },
    {
      name: 'EthereumIngressEgress.StoppedBoosting',
      handler: wrapHandler(
        map.EthereumIngressEgress?.StoppedBoosting,
        ethereumIngressEgressStoppedBoosting,
      ),
    },
    {
      name: 'EthereumIngressEgress.InsufficientBoostLiquidity',
      handler: wrapHandler(
        map.EthereumIngressEgress?.InsufficientBoostLiquidity,
        ethereumIngressEgressInsufficientBoostLiquidity,
      ),
    },
    {
      name: 'EthereumIngressEgress.BoostPoolCreated',
      handler: wrapHandler(
        map.EthereumIngressEgress?.BoostPoolCreated,
        ethereumIngressEgressBoostPoolCreated,
      ),
    },
    {
      name: 'PolkadotIngressEgress.DepositFinalised',
      handler: wrapHandler(
        map.PolkadotIngressEgress?.DepositFinalised,
        polkadotIngressEgressDepositFinalised,
      ),
    },
    {
      name: 'PolkadotIngressEgress.CcmBroadcastRequested',
      handler: wrapHandler(
        map.PolkadotIngressEgress?.CcmBroadcastRequested,
        polkadotIngressEgressCcmBroadcastRequested,
      ),
    },
    {
      name: 'PolkadotIngressEgress.CcmEgressInvalid',
      handler: wrapHandler(
        map.PolkadotIngressEgress?.CcmEgressInvalid,
        polkadotIngressEgressCcmEgressInvalid,
      ),
    },
    {
      name: 'PolkadotIngressEgress.BatchBroadcastRequested',
      handler: wrapHandler(
        map.PolkadotIngressEgress?.BatchBroadcastRequested,
        polkadotIngressEgressBatchBroadcastRequested,
      ),
    },
    {
      name: 'PolkadotIngressEgress.DepositBoosted',
      handler: wrapHandler(
        map.PolkadotIngressEgress?.DepositBoosted,
        polkadotIngressEgressDepositBoosted,
      ),
    },
    {
      name: 'PolkadotIngressEgress.BoostFundsAdded',
      handler: wrapHandler(
        map.PolkadotIngressEgress?.BoostFundsAdded,
        polkadotIngressEgressBoostFundsAdded,
      ),
    },
    {
      name: 'PolkadotIngressEgress.StoppedBoosting',
      handler: wrapHandler(
        map.PolkadotIngressEgress?.StoppedBoosting,
        polkadotIngressEgressStoppedBoosting,
      ),
    },
    {
      name: 'PolkadotIngressEgress.InsufficientBoostLiquidity',
      handler: wrapHandler(
        map.PolkadotIngressEgress?.InsufficientBoostLiquidity,
        polkadotIngressEgressInsufficientBoostLiquidity,
      ),
    },
    {
      name: 'PolkadotIngressEgress.BoostPoolCreated',
      handler: wrapHandler(
        map.PolkadotIngressEgress?.BoostPoolCreated,
        polkadotIngressEgressBoostPoolCreated,
      ),
    },
    {
      name: 'BitcoinIngressEgress.DepositFinalised',
      handler: wrapHandler(
        map.BitcoinIngressEgress?.DepositFinalised,
        bitcoinIngressEgressDepositFinalised,
      ),
    },
    {
      name: 'BitcoinIngressEgress.CcmBroadcastRequested',
      handler: wrapHandler(
        map.BitcoinIngressEgress?.CcmBroadcastRequested,
        bitcoinIngressEgressCcmBroadcastRequested,
      ),
    },
    {
      name: 'BitcoinIngressEgress.CcmEgressInvalid',
      handler: wrapHandler(
        map.BitcoinIngressEgress?.CcmEgressInvalid,
        bitcoinIngressEgressCcmEgressInvalid,
      ),
    },
    {
      name: 'BitcoinIngressEgress.BatchBroadcastRequested',
      handler: wrapHandler(
        map.BitcoinIngressEgress?.BatchBroadcastRequested,
        bitcoinIngressEgressBatchBroadcastRequested,
      ),
    },
    {
      name: 'BitcoinIngressEgress.DepositBoosted',
      handler: wrapHandler(
        map.BitcoinIngressEgress?.DepositBoosted,
        bitcoinIngressEgressDepositBoosted,
      ),
    },
    {
      name: 'BitcoinIngressEgress.BoostFundsAdded',
      handler: wrapHandler(
        map.BitcoinIngressEgress?.BoostFundsAdded,
        bitcoinIngressEgressBoostFundsAdded,
      ),
    },
    {
      name: 'BitcoinIngressEgress.StoppedBoosting',
      handler: wrapHandler(
        map.BitcoinIngressEgress?.StoppedBoosting,
        bitcoinIngressEgressStoppedBoosting,
      ),
    },
    {
      name: 'BitcoinIngressEgress.InsufficientBoostLiquidity',
      handler: wrapHandler(
        map.BitcoinIngressEgress?.InsufficientBoostLiquidity,
        bitcoinIngressEgressInsufficientBoostLiquidity,
      ),
    },
    {
      name: 'BitcoinIngressEgress.BoostPoolCreated',
      handler: wrapHandler(
        map.BitcoinIngressEgress?.BoostPoolCreated,
        bitcoinIngressEgressBoostPoolCreated,
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
    {
      name: 'LiquidityPools.PriceImpactLimitSet',
      handler: wrapHandler(
        map.LiquidityPools?.PriceImpactLimitSet,
        liquidityPoolsPriceImpactLimitSet,
      ),
    },
    {
      name: 'ArbitrumChainTracking.ChainStateUpdated',
      handler: wrapHandler(
        map.ArbitrumChainTracking?.ChainStateUpdated,
        arbitrumChainTrackingChainStateUpdated,
      ),
    },
    {
      name: 'ArbitrumChainTracking.FeeMultiplierUpdated',
      handler: wrapHandler(
        map.ArbitrumChainTracking?.FeeMultiplierUpdated,
        arbitrumChainTrackingFeeMultiplierUpdated,
      ),
    },
    {
      name: 'ArbitrumVault.VaultActivationCompleted',
      handler: wrapHandler(
        map.ArbitrumVault?.VaultActivationCompleted,
        arbitrumVaultVaultActivationCompleted,
      ),
    },
    {
      name: 'ArbitrumVault.VaultRotatedExternally',
      handler: wrapHandler(
        map.ArbitrumVault?.VaultRotatedExternally,
        arbitrumVaultVaultRotatedExternally,
      ),
    },
    {
      name: 'ArbitrumVault.AwaitingGovernanceActivation',
      handler: wrapHandler(
        map.ArbitrumVault?.AwaitingGovernanceActivation,
        arbitrumVaultAwaitingGovernanceActivation,
      ),
    },
    {
      name: 'ArbitrumVault.ChainInitialized',
      handler: wrapHandler(map.ArbitrumVault?.ChainInitialized, arbitrumVaultChainInitialized),
    },
    {
      name: 'ArbitrumBroadcaster.TransactionBroadcastRequest',
      handler: wrapHandler(
        map.ArbitrumBroadcaster?.TransactionBroadcastRequest,
        arbitrumBroadcasterTransactionBroadcastRequest,
      ),
    },
    {
      name: 'ArbitrumBroadcaster.BroadcastRetryScheduled',
      handler: wrapHandler(
        map.ArbitrumBroadcaster?.BroadcastRetryScheduled,
        arbitrumBroadcasterBroadcastRetryScheduled,
      ),
    },
    {
      name: 'ArbitrumBroadcaster.BroadcastTimeout',
      handler: wrapHandler(
        map.ArbitrumBroadcaster?.BroadcastTimeout,
        arbitrumBroadcasterBroadcastTimeout,
      ),
    },
    {
      name: 'ArbitrumBroadcaster.BroadcastAborted',
      handler: wrapHandler(
        map.ArbitrumBroadcaster?.BroadcastAborted,
        arbitrumBroadcasterBroadcastAborted,
      ),
    },
    {
      name: 'ArbitrumBroadcaster.BroadcastSuccess',
      handler: wrapHandler(
        map.ArbitrumBroadcaster?.BroadcastSuccess,
        arbitrumBroadcasterBroadcastSuccess,
      ),
    },
    {
      name: 'ArbitrumBroadcaster.ThresholdSignatureInvalid',
      handler: wrapHandler(
        map.ArbitrumBroadcaster?.ThresholdSignatureInvalid,
        arbitrumBroadcasterThresholdSignatureInvalid,
      ),
    },
    {
      name: 'ArbitrumBroadcaster.BroadcastCallbackExecuted',
      handler: wrapHandler(
        map.ArbitrumBroadcaster?.BroadcastCallbackExecuted,
        arbitrumBroadcasterBroadcastCallbackExecuted,
      ),
    },
    {
      name: 'ArbitrumBroadcaster.TransactionFeeDeficitRecorded',
      handler: wrapHandler(
        map.ArbitrumBroadcaster?.TransactionFeeDeficitRecorded,
        arbitrumBroadcasterTransactionFeeDeficitRecorded,
      ),
    },
    {
      name: 'ArbitrumBroadcaster.TransactionFeeDeficitRefused',
      handler: wrapHandler(
        map.ArbitrumBroadcaster?.TransactionFeeDeficitRefused,
        arbitrumBroadcasterTransactionFeeDeficitRefused,
      ),
    },
    {
      name: 'ArbitrumBroadcaster.CallResigned',
      handler: wrapHandler(map.ArbitrumBroadcaster?.CallResigned, arbitrumBroadcasterCallResigned),
    },
    {
      name: 'ArbitrumIngressEgress.DepositFinalised',
      handler: wrapHandler(
        map.ArbitrumIngressEgress?.DepositFinalised,
        arbitrumIngressEgressDepositFinalised,
      ),
    },
    {
      name: 'ArbitrumIngressEgress.AssetEgressStatusChanged',
      handler: wrapHandler(
        map.ArbitrumIngressEgress?.AssetEgressStatusChanged,
        arbitrumIngressEgressAssetEgressStatusChanged,
      ),
    },
    {
      name: 'ArbitrumIngressEgress.CcmBroadcastRequested',
      handler: wrapHandler(
        map.ArbitrumIngressEgress?.CcmBroadcastRequested,
        arbitrumIngressEgressCcmBroadcastRequested,
      ),
    },
    {
      name: 'ArbitrumIngressEgress.CcmEgressInvalid',
      handler: wrapHandler(
        map.ArbitrumIngressEgress?.CcmEgressInvalid,
        arbitrumIngressEgressCcmEgressInvalid,
      ),
    },
    {
      name: 'ArbitrumIngressEgress.DepositFetchesScheduled',
      handler: wrapHandler(
        map.ArbitrumIngressEgress?.DepositFetchesScheduled,
        arbitrumIngressEgressDepositFetchesScheduled,
      ),
    },
    {
      name: 'ArbitrumIngressEgress.BatchBroadcastRequested',
      handler: wrapHandler(
        map.ArbitrumIngressEgress?.BatchBroadcastRequested,
        arbitrumIngressEgressBatchBroadcastRequested,
      ),
    },
    {
      name: 'ArbitrumIngressEgress.MinimumDepositSet',
      handler: wrapHandler(
        map.ArbitrumIngressEgress?.MinimumDepositSet,
        arbitrumIngressEgressMinimumDepositSet,
      ),
    },
    {
      name: 'ArbitrumIngressEgress.DepositIgnored',
      handler: wrapHandler(
        map.ArbitrumIngressEgress?.DepositIgnored,
        arbitrumIngressEgressDepositIgnored,
      ),
    },
    {
      name: 'ArbitrumIngressEgress.TransferFallbackRequested',
      handler: wrapHandler(
        map.ArbitrumIngressEgress?.TransferFallbackRequested,
        arbitrumIngressEgressTransferFallbackRequested,
      ),
    },
    {
      name: 'ArbitrumIngressEgress.DepositWitnessRejected',
      handler: wrapHandler(
        map.ArbitrumIngressEgress?.DepositWitnessRejected,
        arbitrumIngressEgressDepositWitnessRejected,
      ),
    },
    {
      name: 'ArbitrumIngressEgress.CcmBroadcastFailed',
      handler: wrapHandler(
        map.ArbitrumIngressEgress?.CcmBroadcastFailed,
        arbitrumIngressEgressCcmBroadcastFailed,
      ),
    },
    {
      name: 'ArbitrumIngressEgress.FailedForeignChainCallResigned',
      handler: wrapHandler(
        map.ArbitrumIngressEgress?.FailedForeignChainCallResigned,
        arbitrumIngressEgressFailedForeignChainCallResigned,
      ),
    },
    {
      name: 'ArbitrumIngressEgress.FailedForeignChainCallExpired',
      handler: wrapHandler(
        map.ArbitrumIngressEgress?.FailedForeignChainCallExpired,
        arbitrumIngressEgressFailedForeignChainCallExpired,
      ),
    },
    {
      name: 'ArbitrumIngressEgress.UtxoConsolidation',
      handler: wrapHandler(
        map.ArbitrumIngressEgress?.UtxoConsolidation,
        arbitrumIngressEgressUtxoConsolidation,
      ),
    },
    {
      name: 'ArbitrumIngressEgress.FailedToBuildAllBatchCall',
      handler: wrapHandler(
        map.ArbitrumIngressEgress?.FailedToBuildAllBatchCall,
        arbitrumIngressEgressFailedToBuildAllBatchCall,
      ),
    },
    {
      name: 'ArbitrumIngressEgress.ChannelOpeningFeePaid',
      handler: wrapHandler(
        map.ArbitrumIngressEgress?.ChannelOpeningFeePaid,
        arbitrumIngressEgressChannelOpeningFeePaid,
      ),
    },
    {
      name: 'ArbitrumIngressEgress.ChannelOpeningFeeSet',
      handler: wrapHandler(
        map.ArbitrumIngressEgress?.ChannelOpeningFeeSet,
        arbitrumIngressEgressChannelOpeningFeeSet,
      ),
    },
    {
      name: 'ArbitrumIngressEgress.DepositBoosted',
      handler: wrapHandler(
        map.ArbitrumIngressEgress?.DepositBoosted,
        arbitrumIngressEgressDepositBoosted,
      ),
    },
    {
      name: 'ArbitrumIngressEgress.BoostFundsAdded',
      handler: wrapHandler(
        map.ArbitrumIngressEgress?.BoostFundsAdded,
        arbitrumIngressEgressBoostFundsAdded,
      ),
    },
    {
      name: 'ArbitrumIngressEgress.StoppedBoosting',
      handler: wrapHandler(
        map.ArbitrumIngressEgress?.StoppedBoosting,
        arbitrumIngressEgressStoppedBoosting,
      ),
    },
    {
      name: 'ArbitrumIngressEgress.InsufficientBoostLiquidity',
      handler: wrapHandler(
        map.ArbitrumIngressEgress?.InsufficientBoostLiquidity,
        arbitrumIngressEgressInsufficientBoostLiquidity,
      ),
    },
    {
      name: 'ArbitrumIngressEgress.BoostPoolCreated',
      handler: wrapHandler(
        map.ArbitrumIngressEgress?.BoostPoolCreated,
        arbitrumIngressEgressBoostPoolCreated,
      ),
    },
  ].filter((h): h is { name: string; handler: InternalEventHandler } => h.handler !== undefined),
});
