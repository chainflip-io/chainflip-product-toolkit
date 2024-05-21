import { z } from 'zod';
import { InternalEventHandler, EventHandler, wrapHandler } from '../utils';
import { systemExtrinsicSuccess } from './system/extrinsicSuccess';
import { systemExtrinsicFailed } from './system/extrinsicFailed';
import { systemCodeUpdated } from './system/codeUpdated';
import { systemNewAccount } from './system/newAccount';
import { systemKilledAccount } from './system/killedAccount';
import { systemRemarked } from './system/remarked';
import { environmentAddedNewEthAsset } from './environment/addedNewEthAsset';
import { environmentUpdatedEthAsset } from './environment/updatedEthAsset';
import { environmentPolkadotVaultAccountSet } from './environment/polkadotVaultAccountSet';
import { environmentBitcoinBlockNumberSetForVault } from './environment/bitcoinBlockNumberSetForVault';
import { environmentRuntimeSafeModeUpdated } from './environment/runtimeSafeModeUpdated';
import { flipRemainingImbalance } from './flip/remainingImbalance';
import { flipSlashingPerformed } from './flip/slashingPerformed';
import { flipAccountReaped } from './flip/accountReaped';
import { flipSlashingRateUpdated } from './flip/slashingRateUpdated';
import { emissionsSupplyUpdateBroadcastRequested } from './emissions/supplyUpdateBroadcastRequested';
import { emissionsCurrentAuthorityInflationEmissionsUpdated } from './emissions/currentAuthorityInflationEmissionsUpdated';
import { emissionsBackupNodeInflationEmissionsUpdated } from './emissions/backupNodeInflationEmissionsUpdated';
import { emissionsSupplyUpdateIntervalUpdated } from './emissions/supplyUpdateIntervalUpdated';
import { fundingFunded } from './funding/funded';
import { fundingRedemptionRequested } from './funding/redemptionRequested';
import { fundingRedemptionSettled } from './funding/redemptionSettled';
import { fundingStoppedBidding } from './funding/stoppedBidding';
import { fundingStartedBidding } from './funding/startedBidding';
import { fundingRedemptionExpired } from './funding/redemptionExpired';
import { fundingAddedRestrictedAddress } from './funding/addedRestrictedAddress';
import { fundingRemovedRestrictedAddress } from './funding/removedRestrictedAddress';
import { fundingFailedFundingAttempt } from './funding/failedFundingAttempt';
import { fundingMinimumFundingUpdated } from './funding/minimumFundingUpdated';
import { fundingRedemptionTaxAmountUpdated } from './funding/redemptionTaxAmountUpdated';
import { fundingRedemptionAmountZero } from './funding/redemptionAmountZero';
import { fundingBoundRedeemAddress } from './funding/boundRedeemAddress';
import { fundingBoundExecutorAddress } from './funding/boundExecutorAddress';
import { accountRolesAccountRoleRegistered } from './accountRoles/accountRoleRegistered';
import { transactionPaymentTransactionFeePaid } from './transactionPayment/transactionFeePaid';
import { witnesserWitnessExecutionFailed } from './witnesser/witnessExecutionFailed';
import { witnesserPrewitnessed } from './witnesser/prewitnessed';
import { validatorRotationAborted } from './validator/rotationAborted';
import { validatorNewEpoch } from './validator/newEpoch';
import { validatorRotationPhaseUpdated } from './validator/rotationPhaseUpdated';
import { validatorCFEVersionUpdated } from './validator/cFEVersionUpdated';
import { validatorPeerIdRegistered } from './validator/peerIdRegistered';
import { validatorPeerIdUnregistered } from './validator/peerIdUnregistered';
import { validatorVanityNameSet } from './validator/vanityNameSet';
import { validatorAuctionCompleted } from './validator/auctionCompleted';
import { validatorPalletConfigUpdated } from './validator/palletConfigUpdated';
import { sessionNewSession } from './session/newSession';
import { grandpaNewAuthorities } from './grandpa/newAuthorities';
import { grandpaPaused } from './grandpa/paused';
import { grandpaResumed } from './grandpa/resumed';
import { governanceProposed } from './governance/proposed';
import { governanceExecuted } from './governance/executed';
import { governanceExpired } from './governance/expired';
import { governanceApproved } from './governance/approved';
import { governanceFailedExecution } from './governance/failedExecution';
import { governanceDecodeOfCallFailed } from './governance/decodeOfCallFailed';
import { governanceGovKeyCallExecuted } from './governance/govKeyCallExecuted';
import { governanceGovKeyCallHashWhitelisted } from './governance/govKeyCallHashWhitelisted';
import { governanceGovKeyCallExecutionFailed } from './governance/govKeyCallExecutionFailed';
import { tokenholderGovernanceProposalSubmitted } from './tokenholderGovernance/proposalSubmitted';
import { tokenholderGovernanceProposalPassed } from './tokenholderGovernance/proposalPassed';
import { tokenholderGovernanceProposalRejected } from './tokenholderGovernance/proposalRejected';
import { tokenholderGovernanceProposalEnacted } from './tokenholderGovernance/proposalEnacted';
import { tokenholderGovernanceGovKeyUpdatedHasFailed } from './tokenholderGovernance/govKeyUpdatedHasFailed';
import { tokenholderGovernanceGovKeyUpdatedWasSuccessful } from './tokenholderGovernance/govKeyUpdatedWasSuccessful';
import { reputationOffencePenalty } from './reputation/offencePenalty';
import { reputationAccrualRateUpdated } from './reputation/accrualRateUpdated';
import { reputationMissedHeartbeatPenaltyUpdated } from './reputation/missedHeartbeatPenaltyUpdated';
import { reputationPenaltyUpdated } from './reputation/penaltyUpdated';
import { ethereumChainTrackingChainStateUpdated } from './ethereumChainTracking/chainStateUpdated';
import { polkadotChainTrackingChainStateUpdated } from './polkadotChainTracking/chainStateUpdated';
import { bitcoinChainTrackingChainStateUpdated } from './bitcoinChainTracking/chainStateUpdated';
import { ethereumVaultKeygenRequest } from './ethereumVault/keygenRequest';
import { ethereumVaultKeyHandoverRequest } from './ethereumVault/keyHandoverRequest';
import { ethereumVaultVaultRotationCompleted } from './ethereumVault/vaultRotationCompleted';
import { ethereumVaultVaultRotatedExternally } from './ethereumVault/vaultRotatedExternally';
import { ethereumVaultKeygenSuccessReported } from './ethereumVault/keygenSuccessReported';
import { ethereumVaultKeyHandoverSuccessReported } from './ethereumVault/keyHandoverSuccessReported';
import { ethereumVaultKeygenFailureReported } from './ethereumVault/keygenFailureReported';
import { ethereumVaultKeyHandoverFailureReported } from './ethereumVault/keyHandoverFailureReported';
import { ethereumVaultKeygenSuccess } from './ethereumVault/keygenSuccess';
import { ethereumVaultKeyHandoverSuccess } from './ethereumVault/keyHandoverSuccess';
import { ethereumVaultNoKeyHandover } from './ethereumVault/noKeyHandover';
import { ethereumVaultKeygenVerificationSuccess } from './ethereumVault/keygenVerificationSuccess';
import { ethereumVaultKeyHandoverVerificationSuccess } from './ethereumVault/keyHandoverVerificationSuccess';
import { ethereumVaultKeygenVerificationFailure } from './ethereumVault/keygenVerificationFailure';
import { ethereumVaultKeyHandoverVerificationFailure } from './ethereumVault/keyHandoverVerificationFailure';
import { ethereumVaultKeygenFailure } from './ethereumVault/keygenFailure';
import { ethereumVaultKeygenResponseTimeout } from './ethereumVault/keygenResponseTimeout';
import { ethereumVaultKeyHandoverResponseTimeout } from './ethereumVault/keyHandoverResponseTimeout';
import { ethereumVaultKeygenResponseTimeoutUpdated } from './ethereumVault/keygenResponseTimeoutUpdated';
import { ethereumVaultAwaitingGovernanceActivation } from './ethereumVault/awaitingGovernanceActivation';
import { ethereumVaultKeyHandoverFailure } from './ethereumVault/keyHandoverFailure';
import { ethereumVaultVaultRotationAborted } from './ethereumVault/vaultRotationAborted';
import { polkadotVaultKeygenRequest } from './polkadotVault/keygenRequest';
import { polkadotVaultKeyHandoverRequest } from './polkadotVault/keyHandoverRequest';
import { polkadotVaultVaultRotationCompleted } from './polkadotVault/vaultRotationCompleted';
import { polkadotVaultVaultRotatedExternally } from './polkadotVault/vaultRotatedExternally';
import { polkadotVaultKeygenSuccessReported } from './polkadotVault/keygenSuccessReported';
import { polkadotVaultKeyHandoverSuccessReported } from './polkadotVault/keyHandoverSuccessReported';
import { polkadotVaultKeygenFailureReported } from './polkadotVault/keygenFailureReported';
import { polkadotVaultKeyHandoverFailureReported } from './polkadotVault/keyHandoverFailureReported';
import { polkadotVaultKeygenSuccess } from './polkadotVault/keygenSuccess';
import { polkadotVaultKeyHandoverSuccess } from './polkadotVault/keyHandoverSuccess';
import { polkadotVaultNoKeyHandover } from './polkadotVault/noKeyHandover';
import { polkadotVaultKeygenVerificationSuccess } from './polkadotVault/keygenVerificationSuccess';
import { polkadotVaultKeyHandoverVerificationSuccess } from './polkadotVault/keyHandoverVerificationSuccess';
import { polkadotVaultKeygenVerificationFailure } from './polkadotVault/keygenVerificationFailure';
import { polkadotVaultKeyHandoverVerificationFailure } from './polkadotVault/keyHandoverVerificationFailure';
import { polkadotVaultKeygenFailure } from './polkadotVault/keygenFailure';
import { polkadotVaultKeygenResponseTimeout } from './polkadotVault/keygenResponseTimeout';
import { polkadotVaultKeyHandoverResponseTimeout } from './polkadotVault/keyHandoverResponseTimeout';
import { polkadotVaultKeygenResponseTimeoutUpdated } from './polkadotVault/keygenResponseTimeoutUpdated';
import { polkadotVaultAwaitingGovernanceActivation } from './polkadotVault/awaitingGovernanceActivation';
import { polkadotVaultKeyHandoverFailure } from './polkadotVault/keyHandoverFailure';
import { polkadotVaultVaultRotationAborted } from './polkadotVault/vaultRotationAborted';
import { bitcoinVaultKeygenRequest } from './bitcoinVault/keygenRequest';
import { bitcoinVaultKeyHandoverRequest } from './bitcoinVault/keyHandoverRequest';
import { bitcoinVaultVaultRotationCompleted } from './bitcoinVault/vaultRotationCompleted';
import { bitcoinVaultVaultRotatedExternally } from './bitcoinVault/vaultRotatedExternally';
import { bitcoinVaultKeygenSuccessReported } from './bitcoinVault/keygenSuccessReported';
import { bitcoinVaultKeyHandoverSuccessReported } from './bitcoinVault/keyHandoverSuccessReported';
import { bitcoinVaultKeygenFailureReported } from './bitcoinVault/keygenFailureReported';
import { bitcoinVaultKeyHandoverFailureReported } from './bitcoinVault/keyHandoverFailureReported';
import { bitcoinVaultKeygenSuccess } from './bitcoinVault/keygenSuccess';
import { bitcoinVaultKeyHandoverSuccess } from './bitcoinVault/keyHandoverSuccess';
import { bitcoinVaultNoKeyHandover } from './bitcoinVault/noKeyHandover';
import { bitcoinVaultKeygenVerificationSuccess } from './bitcoinVault/keygenVerificationSuccess';
import { bitcoinVaultKeyHandoverVerificationSuccess } from './bitcoinVault/keyHandoverVerificationSuccess';
import { bitcoinVaultKeygenVerificationFailure } from './bitcoinVault/keygenVerificationFailure';
import { bitcoinVaultKeyHandoverVerificationFailure } from './bitcoinVault/keyHandoverVerificationFailure';
import { bitcoinVaultKeygenFailure } from './bitcoinVault/keygenFailure';
import { bitcoinVaultKeygenResponseTimeout } from './bitcoinVault/keygenResponseTimeout';
import { bitcoinVaultKeyHandoverResponseTimeout } from './bitcoinVault/keyHandoverResponseTimeout';
import { bitcoinVaultKeygenResponseTimeoutUpdated } from './bitcoinVault/keygenResponseTimeoutUpdated';
import { bitcoinVaultAwaitingGovernanceActivation } from './bitcoinVault/awaitingGovernanceActivation';
import { bitcoinVaultKeyHandoverFailure } from './bitcoinVault/keyHandoverFailure';
import { bitcoinVaultVaultRotationAborted } from './bitcoinVault/vaultRotationAborted';
import { ethereumThresholdSignerThresholdSignatureRequest } from './ethereumThresholdSigner/thresholdSignatureRequest';
import { ethereumThresholdSignerThresholdSignatureFailed } from './ethereumThresholdSigner/thresholdSignatureFailed';
import { ethereumThresholdSignerThresholdSignatureSuccess } from './ethereumThresholdSigner/thresholdSignatureSuccess';
import { ethereumThresholdSignerThresholdDispatchComplete } from './ethereumThresholdSigner/thresholdDispatchComplete';
import { ethereumThresholdSignerRetryRequested } from './ethereumThresholdSigner/retryRequested';
import { ethereumThresholdSignerFailureReportProcessed } from './ethereumThresholdSigner/failureReportProcessed';
import { ethereumThresholdSignerSignersUnavailable } from './ethereumThresholdSigner/signersUnavailable';
import { ethereumThresholdSignerCurrentKeyUnavailable } from './ethereumThresholdSigner/currentKeyUnavailable';
import { ethereumThresholdSignerThresholdSignatureResponseTimeoutUpdated } from './ethereumThresholdSigner/thresholdSignatureResponseTimeoutUpdated';
import { polkadotThresholdSignerThresholdSignatureRequest } from './polkadotThresholdSigner/thresholdSignatureRequest';
import { polkadotThresholdSignerThresholdSignatureFailed } from './polkadotThresholdSigner/thresholdSignatureFailed';
import { polkadotThresholdSignerThresholdSignatureSuccess } from './polkadotThresholdSigner/thresholdSignatureSuccess';
import { polkadotThresholdSignerThresholdDispatchComplete } from './polkadotThresholdSigner/thresholdDispatchComplete';
import { polkadotThresholdSignerRetryRequested } from './polkadotThresholdSigner/retryRequested';
import { polkadotThresholdSignerFailureReportProcessed } from './polkadotThresholdSigner/failureReportProcessed';
import { polkadotThresholdSignerSignersUnavailable } from './polkadotThresholdSigner/signersUnavailable';
import { polkadotThresholdSignerCurrentKeyUnavailable } from './polkadotThresholdSigner/currentKeyUnavailable';
import { polkadotThresholdSignerThresholdSignatureResponseTimeoutUpdated } from './polkadotThresholdSigner/thresholdSignatureResponseTimeoutUpdated';
import { bitcoinThresholdSignerThresholdSignatureRequest } from './bitcoinThresholdSigner/thresholdSignatureRequest';
import { bitcoinThresholdSignerThresholdSignatureFailed } from './bitcoinThresholdSigner/thresholdSignatureFailed';
import { bitcoinThresholdSignerThresholdSignatureSuccess } from './bitcoinThresholdSigner/thresholdSignatureSuccess';
import { bitcoinThresholdSignerThresholdDispatchComplete } from './bitcoinThresholdSigner/thresholdDispatchComplete';
import { bitcoinThresholdSignerRetryRequested } from './bitcoinThresholdSigner/retryRequested';
import { bitcoinThresholdSignerFailureReportProcessed } from './bitcoinThresholdSigner/failureReportProcessed';
import { bitcoinThresholdSignerSignersUnavailable } from './bitcoinThresholdSigner/signersUnavailable';
import { bitcoinThresholdSignerCurrentKeyUnavailable } from './bitcoinThresholdSigner/currentKeyUnavailable';
import { bitcoinThresholdSignerThresholdSignatureResponseTimeoutUpdated } from './bitcoinThresholdSigner/thresholdSignatureResponseTimeoutUpdated';
import { ethereumBroadcasterTransactionBroadcastRequest } from './ethereumBroadcaster/transactionBroadcastRequest';
import { ethereumBroadcasterBroadcastRetryScheduled } from './ethereumBroadcaster/broadcastRetryScheduled';
import { ethereumBroadcasterBroadcastAttemptTimeout } from './ethereumBroadcaster/broadcastAttemptTimeout';
import { ethereumBroadcasterBroadcastAborted } from './ethereumBroadcaster/broadcastAborted';
import { ethereumBroadcasterBroadcastSuccess } from './ethereumBroadcaster/broadcastSuccess';
import { ethereumBroadcasterThresholdSignatureInvalid } from './ethereumBroadcaster/thresholdSignatureInvalid';
import { ethereumBroadcasterBroadcastCallbackExecuted } from './ethereumBroadcaster/broadcastCallbackExecuted';
import { ethereumBroadcasterTransactionFeeDeficitRecorded } from './ethereumBroadcaster/transactionFeeDeficitRecorded';
import { ethereumBroadcasterTransactionFeeDeficitRefused } from './ethereumBroadcaster/transactionFeeDeficitRefused';
import { polkadotBroadcasterTransactionBroadcastRequest } from './polkadotBroadcaster/transactionBroadcastRequest';
import { polkadotBroadcasterBroadcastRetryScheduled } from './polkadotBroadcaster/broadcastRetryScheduled';
import { polkadotBroadcasterBroadcastAttemptTimeout } from './polkadotBroadcaster/broadcastAttemptTimeout';
import { polkadotBroadcasterBroadcastAborted } from './polkadotBroadcaster/broadcastAborted';
import { polkadotBroadcasterBroadcastSuccess } from './polkadotBroadcaster/broadcastSuccess';
import { polkadotBroadcasterThresholdSignatureInvalid } from './polkadotBroadcaster/thresholdSignatureInvalid';
import { polkadotBroadcasterBroadcastCallbackExecuted } from './polkadotBroadcaster/broadcastCallbackExecuted';
import { polkadotBroadcasterTransactionFeeDeficitRecorded } from './polkadotBroadcaster/transactionFeeDeficitRecorded';
import { polkadotBroadcasterTransactionFeeDeficitRefused } from './polkadotBroadcaster/transactionFeeDeficitRefused';
import { bitcoinBroadcasterTransactionBroadcastRequest } from './bitcoinBroadcaster/transactionBroadcastRequest';
import { bitcoinBroadcasterBroadcastRetryScheduled } from './bitcoinBroadcaster/broadcastRetryScheduled';
import { bitcoinBroadcasterBroadcastAttemptTimeout } from './bitcoinBroadcaster/broadcastAttemptTimeout';
import { bitcoinBroadcasterBroadcastAborted } from './bitcoinBroadcaster/broadcastAborted';
import { bitcoinBroadcasterBroadcastSuccess } from './bitcoinBroadcaster/broadcastSuccess';
import { bitcoinBroadcasterThresholdSignatureInvalid } from './bitcoinBroadcaster/thresholdSignatureInvalid';
import { bitcoinBroadcasterBroadcastCallbackExecuted } from './bitcoinBroadcaster/broadcastCallbackExecuted';
import { bitcoinBroadcasterTransactionFeeDeficitRecorded } from './bitcoinBroadcaster/transactionFeeDeficitRecorded';
import { bitcoinBroadcasterTransactionFeeDeficitRefused } from './bitcoinBroadcaster/transactionFeeDeficitRefused';
import { swappingSwapDepositAddressReady } from './swapping/swapDepositAddressReady';
import { swappingSwapScheduled } from './swapping/swapScheduled';
import { swappingSwapExecuted } from './swapping/swapExecuted';
import { swappingSwapEgressScheduled } from './swapping/swapEgressScheduled';
import { swappingWithdrawalRequested } from './swapping/withdrawalRequested';
import { swappingBatchSwapFailed } from './swapping/batchSwapFailed';
import { swappingCcmEgressScheduled } from './swapping/ccmEgressScheduled';
import { swappingCcmDepositReceived } from './swapping/ccmDepositReceived';
import { swappingMinimumSwapAmountSet } from './swapping/minimumSwapAmountSet';
import { swappingSwapAmountTooLow } from './swapping/swapAmountTooLow';
import { swappingCcmFailed } from './swapping/ccmFailed';
import { liquidityProviderAccountDebited } from './liquidityProvider/accountDebited';
import { liquidityProviderAccountCredited } from './liquidityProvider/accountCredited';
import { liquidityProviderLiquidityDepositAddressReady } from './liquidityProvider/liquidityDepositAddressReady';
import { liquidityProviderWithdrawalEgressScheduled } from './liquidityProvider/withdrawalEgressScheduled';
import { liquidityProviderLiquidityRefundAddressRegistered } from './liquidityProvider/liquidityRefundAddressRegistered';
import { ethereumIngressEgressDepositReceived } from './ethereumIngressEgress/depositReceived';
import { ethereumIngressEgressAssetEgressStatusChanged } from './ethereumIngressEgress/assetEgressStatusChanged';
import { ethereumIngressEgressEgressScheduled } from './ethereumIngressEgress/egressScheduled';
import { ethereumIngressEgressCcmBroadcastRequested } from './ethereumIngressEgress/ccmBroadcastRequested';
import { ethereumIngressEgressCcmEgressInvalid } from './ethereumIngressEgress/ccmEgressInvalid';
import { ethereumIngressEgressDepositFetchesScheduled } from './ethereumIngressEgress/depositFetchesScheduled';
import { ethereumIngressEgressBatchBroadcastRequested } from './ethereumIngressEgress/batchBroadcastRequested';
import { ethereumIngressEgressMinimumDepositSet } from './ethereumIngressEgress/minimumDepositSet';
import { ethereumIngressEgressDepositIgnored } from './ethereumIngressEgress/depositIgnored';
import { ethereumIngressEgressVaultTransferFailed } from './ethereumIngressEgress/vaultTransferFailed';
import { ethereumIngressEgressDepositWitnessRejected } from './ethereumIngressEgress/depositWitnessRejected';
import { polkadotIngressEgressDepositReceived } from './polkadotIngressEgress/depositReceived';
import { polkadotIngressEgressAssetEgressStatusChanged } from './polkadotIngressEgress/assetEgressStatusChanged';
import { polkadotIngressEgressEgressScheduled } from './polkadotIngressEgress/egressScheduled';
import { polkadotIngressEgressCcmBroadcastRequested } from './polkadotIngressEgress/ccmBroadcastRequested';
import { polkadotIngressEgressCcmEgressInvalid } from './polkadotIngressEgress/ccmEgressInvalid';
import { polkadotIngressEgressDepositFetchesScheduled } from './polkadotIngressEgress/depositFetchesScheduled';
import { polkadotIngressEgressBatchBroadcastRequested } from './polkadotIngressEgress/batchBroadcastRequested';
import { polkadotIngressEgressMinimumDepositSet } from './polkadotIngressEgress/minimumDepositSet';
import { polkadotIngressEgressDepositIgnored } from './polkadotIngressEgress/depositIgnored';
import { polkadotIngressEgressVaultTransferFailed } from './polkadotIngressEgress/vaultTransferFailed';
import { polkadotIngressEgressDepositWitnessRejected } from './polkadotIngressEgress/depositWitnessRejected';
import { bitcoinIngressEgressDepositReceived } from './bitcoinIngressEgress/depositReceived';
import { bitcoinIngressEgressAssetEgressStatusChanged } from './bitcoinIngressEgress/assetEgressStatusChanged';
import { bitcoinIngressEgressEgressScheduled } from './bitcoinIngressEgress/egressScheduled';
import { bitcoinIngressEgressCcmBroadcastRequested } from './bitcoinIngressEgress/ccmBroadcastRequested';
import { bitcoinIngressEgressCcmEgressInvalid } from './bitcoinIngressEgress/ccmEgressInvalid';
import { bitcoinIngressEgressDepositFetchesScheduled } from './bitcoinIngressEgress/depositFetchesScheduled';
import { bitcoinIngressEgressBatchBroadcastRequested } from './bitcoinIngressEgress/batchBroadcastRequested';
import { bitcoinIngressEgressMinimumDepositSet } from './bitcoinIngressEgress/minimumDepositSet';
import { bitcoinIngressEgressDepositIgnored } from './bitcoinIngressEgress/depositIgnored';
import { bitcoinIngressEgressVaultTransferFailed } from './bitcoinIngressEgress/vaultTransferFailed';
import { bitcoinIngressEgressDepositWitnessRejected } from './bitcoinIngressEgress/depositWitnessRejected';
import { liquidityPoolsUpdatedBuyInterval } from './liquidityPools/updatedBuyInterval';
import { liquidityPoolsPoolStateUpdated } from './liquidityPools/poolStateUpdated';
import { liquidityPoolsNewPoolCreated } from './liquidityPools/newPoolCreated';
import { liquidityPoolsRangeOrderUpdated } from './liquidityPools/rangeOrderUpdated';
import { liquidityPoolsLimitOrderUpdated } from './liquidityPools/limitOrderUpdated';
import { liquidityPoolsNetworkFeeTaken } from './liquidityPools/networkFeeTaken';
import { liquidityPoolsAssetSwapped } from './liquidityPools/assetSwapped';
import { liquidityPoolsPoolFeeSet } from './liquidityPools/poolFeeSet';

export type SystemExtrinsicSuccess = EventHandler<z.output<typeof systemExtrinsicSuccess>>;
export type SystemExtrinsicFailed = EventHandler<z.output<typeof systemExtrinsicFailed>>;
export type SystemCodeUpdated = EventHandler<z.output<typeof systemCodeUpdated>>;
export type SystemNewAccount = EventHandler<z.output<typeof systemNewAccount>>;
export type SystemKilledAccount = EventHandler<z.output<typeof systemKilledAccount>>;
export type SystemRemarked = EventHandler<z.output<typeof systemRemarked>>;
export type EnvironmentAddedNewEthAsset = EventHandler<
  z.output<typeof environmentAddedNewEthAsset>
>;
export type EnvironmentUpdatedEthAsset = EventHandler<z.output<typeof environmentUpdatedEthAsset>>;
export type EnvironmentPolkadotVaultAccountSet = EventHandler<
  z.output<typeof environmentPolkadotVaultAccountSet>
>;
export type EnvironmentBitcoinBlockNumberSetForVault = EventHandler<
  z.output<typeof environmentBitcoinBlockNumberSetForVault>
>;
export type EnvironmentRuntimeSafeModeUpdated = EventHandler<
  z.output<typeof environmentRuntimeSafeModeUpdated>
>;
export type FlipRemainingImbalance = EventHandler<z.output<typeof flipRemainingImbalance>>;
export type FlipSlashingPerformed = EventHandler<z.output<typeof flipSlashingPerformed>>;
export type FlipAccountReaped = EventHandler<z.output<typeof flipAccountReaped>>;
export type FlipSlashingRateUpdated = EventHandler<z.output<typeof flipSlashingRateUpdated>>;
export type EmissionsSupplyUpdateBroadcastRequested = EventHandler<
  z.output<typeof emissionsSupplyUpdateBroadcastRequested>
>;
export type EmissionsCurrentAuthorityInflationEmissionsUpdated = EventHandler<
  z.output<typeof emissionsCurrentAuthorityInflationEmissionsUpdated>
>;
export type EmissionsBackupNodeInflationEmissionsUpdated = EventHandler<
  z.output<typeof emissionsBackupNodeInflationEmissionsUpdated>
>;
export type EmissionsSupplyUpdateIntervalUpdated = EventHandler<
  z.output<typeof emissionsSupplyUpdateIntervalUpdated>
>;
export type FundingFunded = EventHandler<z.output<typeof fundingFunded>>;
export type FundingRedemptionRequested = EventHandler<z.output<typeof fundingRedemptionRequested>>;
export type FundingRedemptionSettled = EventHandler<z.output<typeof fundingRedemptionSettled>>;
export type FundingStoppedBidding = EventHandler<z.output<typeof fundingStoppedBidding>>;
export type FundingStartedBidding = EventHandler<z.output<typeof fundingStartedBidding>>;
export type FundingRedemptionExpired = EventHandler<z.output<typeof fundingRedemptionExpired>>;
export type FundingAddedRestrictedAddress = EventHandler<
  z.output<typeof fundingAddedRestrictedAddress>
>;
export type FundingRemovedRestrictedAddress = EventHandler<
  z.output<typeof fundingRemovedRestrictedAddress>
>;
export type FundingFailedFundingAttempt = EventHandler<
  z.output<typeof fundingFailedFundingAttempt>
>;
export type FundingMinimumFundingUpdated = EventHandler<
  z.output<typeof fundingMinimumFundingUpdated>
>;
export type FundingRedemptionTaxAmountUpdated = EventHandler<
  z.output<typeof fundingRedemptionTaxAmountUpdated>
>;
export type FundingRedemptionAmountZero = EventHandler<
  z.output<typeof fundingRedemptionAmountZero>
>;
export type FundingBoundRedeemAddress = EventHandler<z.output<typeof fundingBoundRedeemAddress>>;
export type FundingBoundExecutorAddress = EventHandler<
  z.output<typeof fundingBoundExecutorAddress>
>;
export type AccountRolesAccountRoleRegistered = EventHandler<
  z.output<typeof accountRolesAccountRoleRegistered>
>;
export type TransactionPaymentTransactionFeePaid = EventHandler<
  z.output<typeof transactionPaymentTransactionFeePaid>
>;
export type WitnesserWitnessExecutionFailed = EventHandler<
  z.output<typeof witnesserWitnessExecutionFailed>
>;
export type WitnesserPrewitnessed = EventHandler<z.output<typeof witnesserPrewitnessed>>;
export type ValidatorRotationAborted = EventHandler<z.output<typeof validatorRotationAborted>>;
export type ValidatorNewEpoch = EventHandler<z.output<typeof validatorNewEpoch>>;
export type ValidatorRotationPhaseUpdated = EventHandler<
  z.output<typeof validatorRotationPhaseUpdated>
>;
export type ValidatorCFEVersionUpdated = EventHandler<z.output<typeof validatorCFEVersionUpdated>>;
export type ValidatorPeerIdRegistered = EventHandler<z.output<typeof validatorPeerIdRegistered>>;
export type ValidatorPeerIdUnregistered = EventHandler<
  z.output<typeof validatorPeerIdUnregistered>
>;
export type ValidatorVanityNameSet = EventHandler<z.output<typeof validatorVanityNameSet>>;
export type ValidatorAuctionCompleted = EventHandler<z.output<typeof validatorAuctionCompleted>>;
export type ValidatorPalletConfigUpdated = EventHandler<
  z.output<typeof validatorPalletConfigUpdated>
>;
export type SessionNewSession = EventHandler<z.output<typeof sessionNewSession>>;
export type GrandpaNewAuthorities = EventHandler<z.output<typeof grandpaNewAuthorities>>;
export type GrandpaPaused = EventHandler<z.output<typeof grandpaPaused>>;
export type GrandpaResumed = EventHandler<z.output<typeof grandpaResumed>>;
export type GovernanceProposed = EventHandler<z.output<typeof governanceProposed>>;
export type GovernanceExecuted = EventHandler<z.output<typeof governanceExecuted>>;
export type GovernanceExpired = EventHandler<z.output<typeof governanceExpired>>;
export type GovernanceApproved = EventHandler<z.output<typeof governanceApproved>>;
export type GovernanceFailedExecution = EventHandler<z.output<typeof governanceFailedExecution>>;
export type GovernanceDecodeOfCallFailed = EventHandler<
  z.output<typeof governanceDecodeOfCallFailed>
>;
export type GovernanceGovKeyCallExecuted = EventHandler<
  z.output<typeof governanceGovKeyCallExecuted>
>;
export type GovernanceGovKeyCallHashWhitelisted = EventHandler<
  z.output<typeof governanceGovKeyCallHashWhitelisted>
>;
export type GovernanceGovKeyCallExecutionFailed = EventHandler<
  z.output<typeof governanceGovKeyCallExecutionFailed>
>;
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
export type ReputationOffencePenalty = EventHandler<z.output<typeof reputationOffencePenalty>>;
export type ReputationAccrualRateUpdated = EventHandler<
  z.output<typeof reputationAccrualRateUpdated>
>;
export type ReputationMissedHeartbeatPenaltyUpdated = EventHandler<
  z.output<typeof reputationMissedHeartbeatPenaltyUpdated>
>;
export type ReputationPenaltyUpdated = EventHandler<z.output<typeof reputationPenaltyUpdated>>;
export type EthereumChainTrackingChainStateUpdated = EventHandler<
  z.output<typeof ethereumChainTrackingChainStateUpdated>
>;
export type PolkadotChainTrackingChainStateUpdated = EventHandler<
  z.output<typeof polkadotChainTrackingChainStateUpdated>
>;
export type BitcoinChainTrackingChainStateUpdated = EventHandler<
  z.output<typeof bitcoinChainTrackingChainStateUpdated>
>;
export type EthereumVaultKeygenRequest = EventHandler<z.output<typeof ethereumVaultKeygenRequest>>;
export type EthereumVaultKeyHandoverRequest = EventHandler<
  z.output<typeof ethereumVaultKeyHandoverRequest>
>;
export type EthereumVaultVaultRotationCompleted = EventHandler<
  z.output<typeof ethereumVaultVaultRotationCompleted>
>;
export type EthereumVaultVaultRotatedExternally = EventHandler<
  z.output<typeof ethereumVaultVaultRotatedExternally>
>;
export type EthereumVaultKeygenSuccessReported = EventHandler<
  z.output<typeof ethereumVaultKeygenSuccessReported>
>;
export type EthereumVaultKeyHandoverSuccessReported = EventHandler<
  z.output<typeof ethereumVaultKeyHandoverSuccessReported>
>;
export type EthereumVaultKeygenFailureReported = EventHandler<
  z.output<typeof ethereumVaultKeygenFailureReported>
>;
export type EthereumVaultKeyHandoverFailureReported = EventHandler<
  z.output<typeof ethereumVaultKeyHandoverFailureReported>
>;
export type EthereumVaultKeygenSuccess = EventHandler<z.output<typeof ethereumVaultKeygenSuccess>>;
export type EthereumVaultKeyHandoverSuccess = EventHandler<
  z.output<typeof ethereumVaultKeyHandoverSuccess>
>;
export type EthereumVaultNoKeyHandover = EventHandler<z.output<typeof ethereumVaultNoKeyHandover>>;
export type EthereumVaultKeygenVerificationSuccess = EventHandler<
  z.output<typeof ethereumVaultKeygenVerificationSuccess>
>;
export type EthereumVaultKeyHandoverVerificationSuccess = EventHandler<
  z.output<typeof ethereumVaultKeyHandoverVerificationSuccess>
>;
export type EthereumVaultKeygenVerificationFailure = EventHandler<
  z.output<typeof ethereumVaultKeygenVerificationFailure>
>;
export type EthereumVaultKeyHandoverVerificationFailure = EventHandler<
  z.output<typeof ethereumVaultKeyHandoverVerificationFailure>
>;
export type EthereumVaultKeygenFailure = EventHandler<z.output<typeof ethereumVaultKeygenFailure>>;
export type EthereumVaultKeygenResponseTimeout = EventHandler<
  z.output<typeof ethereumVaultKeygenResponseTimeout>
>;
export type EthereumVaultKeyHandoverResponseTimeout = EventHandler<
  z.output<typeof ethereumVaultKeyHandoverResponseTimeout>
>;
export type EthereumVaultKeygenResponseTimeoutUpdated = EventHandler<
  z.output<typeof ethereumVaultKeygenResponseTimeoutUpdated>
>;
export type EthereumVaultAwaitingGovernanceActivation = EventHandler<
  z.output<typeof ethereumVaultAwaitingGovernanceActivation>
>;
export type EthereumVaultKeyHandoverFailure = EventHandler<
  z.output<typeof ethereumVaultKeyHandoverFailure>
>;
export type EthereumVaultVaultRotationAborted = EventHandler<
  z.output<typeof ethereumVaultVaultRotationAborted>
>;
export type PolkadotVaultKeygenRequest = EventHandler<z.output<typeof polkadotVaultKeygenRequest>>;
export type PolkadotVaultKeyHandoverRequest = EventHandler<
  z.output<typeof polkadotVaultKeyHandoverRequest>
>;
export type PolkadotVaultVaultRotationCompleted = EventHandler<
  z.output<typeof polkadotVaultVaultRotationCompleted>
>;
export type PolkadotVaultVaultRotatedExternally = EventHandler<
  z.output<typeof polkadotVaultVaultRotatedExternally>
>;
export type PolkadotVaultKeygenSuccessReported = EventHandler<
  z.output<typeof polkadotVaultKeygenSuccessReported>
>;
export type PolkadotVaultKeyHandoverSuccessReported = EventHandler<
  z.output<typeof polkadotVaultKeyHandoverSuccessReported>
>;
export type PolkadotVaultKeygenFailureReported = EventHandler<
  z.output<typeof polkadotVaultKeygenFailureReported>
>;
export type PolkadotVaultKeyHandoverFailureReported = EventHandler<
  z.output<typeof polkadotVaultKeyHandoverFailureReported>
>;
export type PolkadotVaultKeygenSuccess = EventHandler<z.output<typeof polkadotVaultKeygenSuccess>>;
export type PolkadotVaultKeyHandoverSuccess = EventHandler<
  z.output<typeof polkadotVaultKeyHandoverSuccess>
>;
export type PolkadotVaultNoKeyHandover = EventHandler<z.output<typeof polkadotVaultNoKeyHandover>>;
export type PolkadotVaultKeygenVerificationSuccess = EventHandler<
  z.output<typeof polkadotVaultKeygenVerificationSuccess>
>;
export type PolkadotVaultKeyHandoverVerificationSuccess = EventHandler<
  z.output<typeof polkadotVaultKeyHandoverVerificationSuccess>
>;
export type PolkadotVaultKeygenVerificationFailure = EventHandler<
  z.output<typeof polkadotVaultKeygenVerificationFailure>
>;
export type PolkadotVaultKeyHandoverVerificationFailure = EventHandler<
  z.output<typeof polkadotVaultKeyHandoverVerificationFailure>
>;
export type PolkadotVaultKeygenFailure = EventHandler<z.output<typeof polkadotVaultKeygenFailure>>;
export type PolkadotVaultKeygenResponseTimeout = EventHandler<
  z.output<typeof polkadotVaultKeygenResponseTimeout>
>;
export type PolkadotVaultKeyHandoverResponseTimeout = EventHandler<
  z.output<typeof polkadotVaultKeyHandoverResponseTimeout>
>;
export type PolkadotVaultKeygenResponseTimeoutUpdated = EventHandler<
  z.output<typeof polkadotVaultKeygenResponseTimeoutUpdated>
>;
export type PolkadotVaultAwaitingGovernanceActivation = EventHandler<
  z.output<typeof polkadotVaultAwaitingGovernanceActivation>
>;
export type PolkadotVaultKeyHandoverFailure = EventHandler<
  z.output<typeof polkadotVaultKeyHandoverFailure>
>;
export type PolkadotVaultVaultRotationAborted = EventHandler<
  z.output<typeof polkadotVaultVaultRotationAborted>
>;
export type BitcoinVaultKeygenRequest = EventHandler<z.output<typeof bitcoinVaultKeygenRequest>>;
export type BitcoinVaultKeyHandoverRequest = EventHandler<
  z.output<typeof bitcoinVaultKeyHandoverRequest>
>;
export type BitcoinVaultVaultRotationCompleted = EventHandler<
  z.output<typeof bitcoinVaultVaultRotationCompleted>
>;
export type BitcoinVaultVaultRotatedExternally = EventHandler<
  z.output<typeof bitcoinVaultVaultRotatedExternally>
>;
export type BitcoinVaultKeygenSuccessReported = EventHandler<
  z.output<typeof bitcoinVaultKeygenSuccessReported>
>;
export type BitcoinVaultKeyHandoverSuccessReported = EventHandler<
  z.output<typeof bitcoinVaultKeyHandoverSuccessReported>
>;
export type BitcoinVaultKeygenFailureReported = EventHandler<
  z.output<typeof bitcoinVaultKeygenFailureReported>
>;
export type BitcoinVaultKeyHandoverFailureReported = EventHandler<
  z.output<typeof bitcoinVaultKeyHandoverFailureReported>
>;
export type BitcoinVaultKeygenSuccess = EventHandler<z.output<typeof bitcoinVaultKeygenSuccess>>;
export type BitcoinVaultKeyHandoverSuccess = EventHandler<
  z.output<typeof bitcoinVaultKeyHandoverSuccess>
>;
export type BitcoinVaultNoKeyHandover = EventHandler<z.output<typeof bitcoinVaultNoKeyHandover>>;
export type BitcoinVaultKeygenVerificationSuccess = EventHandler<
  z.output<typeof bitcoinVaultKeygenVerificationSuccess>
>;
export type BitcoinVaultKeyHandoverVerificationSuccess = EventHandler<
  z.output<typeof bitcoinVaultKeyHandoverVerificationSuccess>
>;
export type BitcoinVaultKeygenVerificationFailure = EventHandler<
  z.output<typeof bitcoinVaultKeygenVerificationFailure>
>;
export type BitcoinVaultKeyHandoverVerificationFailure = EventHandler<
  z.output<typeof bitcoinVaultKeyHandoverVerificationFailure>
>;
export type BitcoinVaultKeygenFailure = EventHandler<z.output<typeof bitcoinVaultKeygenFailure>>;
export type BitcoinVaultKeygenResponseTimeout = EventHandler<
  z.output<typeof bitcoinVaultKeygenResponseTimeout>
>;
export type BitcoinVaultKeyHandoverResponseTimeout = EventHandler<
  z.output<typeof bitcoinVaultKeyHandoverResponseTimeout>
>;
export type BitcoinVaultKeygenResponseTimeoutUpdated = EventHandler<
  z.output<typeof bitcoinVaultKeygenResponseTimeoutUpdated>
>;
export type BitcoinVaultAwaitingGovernanceActivation = EventHandler<
  z.output<typeof bitcoinVaultAwaitingGovernanceActivation>
>;
export type BitcoinVaultKeyHandoverFailure = EventHandler<
  z.output<typeof bitcoinVaultKeyHandoverFailure>
>;
export type BitcoinVaultVaultRotationAborted = EventHandler<
  z.output<typeof bitcoinVaultVaultRotationAborted>
>;
export type EthereumThresholdSignerThresholdSignatureRequest = EventHandler<
  z.output<typeof ethereumThresholdSignerThresholdSignatureRequest>
>;
export type EthereumThresholdSignerThresholdSignatureFailed = EventHandler<
  z.output<typeof ethereumThresholdSignerThresholdSignatureFailed>
>;
export type EthereumThresholdSignerThresholdSignatureSuccess = EventHandler<
  z.output<typeof ethereumThresholdSignerThresholdSignatureSuccess>
>;
export type EthereumThresholdSignerThresholdDispatchComplete = EventHandler<
  z.output<typeof ethereumThresholdSignerThresholdDispatchComplete>
>;
export type EthereumThresholdSignerRetryRequested = EventHandler<
  z.output<typeof ethereumThresholdSignerRetryRequested>
>;
export type EthereumThresholdSignerFailureReportProcessed = EventHandler<
  z.output<typeof ethereumThresholdSignerFailureReportProcessed>
>;
export type EthereumThresholdSignerSignersUnavailable = EventHandler<
  z.output<typeof ethereumThresholdSignerSignersUnavailable>
>;
export type EthereumThresholdSignerCurrentKeyUnavailable = EventHandler<
  z.output<typeof ethereumThresholdSignerCurrentKeyUnavailable>
>;
export type EthereumThresholdSignerThresholdSignatureResponseTimeoutUpdated = EventHandler<
  z.output<typeof ethereumThresholdSignerThresholdSignatureResponseTimeoutUpdated>
>;
export type PolkadotThresholdSignerThresholdSignatureRequest = EventHandler<
  z.output<typeof polkadotThresholdSignerThresholdSignatureRequest>
>;
export type PolkadotThresholdSignerThresholdSignatureFailed = EventHandler<
  z.output<typeof polkadotThresholdSignerThresholdSignatureFailed>
>;
export type PolkadotThresholdSignerThresholdSignatureSuccess = EventHandler<
  z.output<typeof polkadotThresholdSignerThresholdSignatureSuccess>
>;
export type PolkadotThresholdSignerThresholdDispatchComplete = EventHandler<
  z.output<typeof polkadotThresholdSignerThresholdDispatchComplete>
>;
export type PolkadotThresholdSignerRetryRequested = EventHandler<
  z.output<typeof polkadotThresholdSignerRetryRequested>
>;
export type PolkadotThresholdSignerFailureReportProcessed = EventHandler<
  z.output<typeof polkadotThresholdSignerFailureReportProcessed>
>;
export type PolkadotThresholdSignerSignersUnavailable = EventHandler<
  z.output<typeof polkadotThresholdSignerSignersUnavailable>
>;
export type PolkadotThresholdSignerCurrentKeyUnavailable = EventHandler<
  z.output<typeof polkadotThresholdSignerCurrentKeyUnavailable>
>;
export type PolkadotThresholdSignerThresholdSignatureResponseTimeoutUpdated = EventHandler<
  z.output<typeof polkadotThresholdSignerThresholdSignatureResponseTimeoutUpdated>
>;
export type BitcoinThresholdSignerThresholdSignatureRequest = EventHandler<
  z.output<typeof bitcoinThresholdSignerThresholdSignatureRequest>
>;
export type BitcoinThresholdSignerThresholdSignatureFailed = EventHandler<
  z.output<typeof bitcoinThresholdSignerThresholdSignatureFailed>
>;
export type BitcoinThresholdSignerThresholdSignatureSuccess = EventHandler<
  z.output<typeof bitcoinThresholdSignerThresholdSignatureSuccess>
>;
export type BitcoinThresholdSignerThresholdDispatchComplete = EventHandler<
  z.output<typeof bitcoinThresholdSignerThresholdDispatchComplete>
>;
export type BitcoinThresholdSignerRetryRequested = EventHandler<
  z.output<typeof bitcoinThresholdSignerRetryRequested>
>;
export type BitcoinThresholdSignerFailureReportProcessed = EventHandler<
  z.output<typeof bitcoinThresholdSignerFailureReportProcessed>
>;
export type BitcoinThresholdSignerSignersUnavailable = EventHandler<
  z.output<typeof bitcoinThresholdSignerSignersUnavailable>
>;
export type BitcoinThresholdSignerCurrentKeyUnavailable = EventHandler<
  z.output<typeof bitcoinThresholdSignerCurrentKeyUnavailable>
>;
export type BitcoinThresholdSignerThresholdSignatureResponseTimeoutUpdated = EventHandler<
  z.output<typeof bitcoinThresholdSignerThresholdSignatureResponseTimeoutUpdated>
>;
export type EthereumBroadcasterTransactionBroadcastRequest = EventHandler<
  z.output<typeof ethereumBroadcasterTransactionBroadcastRequest>
>;
export type EthereumBroadcasterBroadcastRetryScheduled = EventHandler<
  z.output<typeof ethereumBroadcasterBroadcastRetryScheduled>
>;
export type EthereumBroadcasterBroadcastAttemptTimeout = EventHandler<
  z.output<typeof ethereumBroadcasterBroadcastAttemptTimeout>
>;
export type EthereumBroadcasterBroadcastAborted = EventHandler<
  z.output<typeof ethereumBroadcasterBroadcastAborted>
>;
export type EthereumBroadcasterBroadcastSuccess = EventHandler<
  z.output<typeof ethereumBroadcasterBroadcastSuccess>
>;
export type EthereumBroadcasterThresholdSignatureInvalid = EventHandler<
  z.output<typeof ethereumBroadcasterThresholdSignatureInvalid>
>;
export type EthereumBroadcasterBroadcastCallbackExecuted = EventHandler<
  z.output<typeof ethereumBroadcasterBroadcastCallbackExecuted>
>;
export type EthereumBroadcasterTransactionFeeDeficitRecorded = EventHandler<
  z.output<typeof ethereumBroadcasterTransactionFeeDeficitRecorded>
>;
export type EthereumBroadcasterTransactionFeeDeficitRefused = EventHandler<
  z.output<typeof ethereumBroadcasterTransactionFeeDeficitRefused>
>;
export type PolkadotBroadcasterTransactionBroadcastRequest = EventHandler<
  z.output<typeof polkadotBroadcasterTransactionBroadcastRequest>
>;
export type PolkadotBroadcasterBroadcastRetryScheduled = EventHandler<
  z.output<typeof polkadotBroadcasterBroadcastRetryScheduled>
>;
export type PolkadotBroadcasterBroadcastAttemptTimeout = EventHandler<
  z.output<typeof polkadotBroadcasterBroadcastAttemptTimeout>
>;
export type PolkadotBroadcasterBroadcastAborted = EventHandler<
  z.output<typeof polkadotBroadcasterBroadcastAborted>
>;
export type PolkadotBroadcasterBroadcastSuccess = EventHandler<
  z.output<typeof polkadotBroadcasterBroadcastSuccess>
>;
export type PolkadotBroadcasterThresholdSignatureInvalid = EventHandler<
  z.output<typeof polkadotBroadcasterThresholdSignatureInvalid>
>;
export type PolkadotBroadcasterBroadcastCallbackExecuted = EventHandler<
  z.output<typeof polkadotBroadcasterBroadcastCallbackExecuted>
>;
export type PolkadotBroadcasterTransactionFeeDeficitRecorded = EventHandler<
  z.output<typeof polkadotBroadcasterTransactionFeeDeficitRecorded>
>;
export type PolkadotBroadcasterTransactionFeeDeficitRefused = EventHandler<
  z.output<typeof polkadotBroadcasterTransactionFeeDeficitRefused>
>;
export type BitcoinBroadcasterTransactionBroadcastRequest = EventHandler<
  z.output<typeof bitcoinBroadcasterTransactionBroadcastRequest>
>;
export type BitcoinBroadcasterBroadcastRetryScheduled = EventHandler<
  z.output<typeof bitcoinBroadcasterBroadcastRetryScheduled>
>;
export type BitcoinBroadcasterBroadcastAttemptTimeout = EventHandler<
  z.output<typeof bitcoinBroadcasterBroadcastAttemptTimeout>
>;
export type BitcoinBroadcasterBroadcastAborted = EventHandler<
  z.output<typeof bitcoinBroadcasterBroadcastAborted>
>;
export type BitcoinBroadcasterBroadcastSuccess = EventHandler<
  z.output<typeof bitcoinBroadcasterBroadcastSuccess>
>;
export type BitcoinBroadcasterThresholdSignatureInvalid = EventHandler<
  z.output<typeof bitcoinBroadcasterThresholdSignatureInvalid>
>;
export type BitcoinBroadcasterBroadcastCallbackExecuted = EventHandler<
  z.output<typeof bitcoinBroadcasterBroadcastCallbackExecuted>
>;
export type BitcoinBroadcasterTransactionFeeDeficitRecorded = EventHandler<
  z.output<typeof bitcoinBroadcasterTransactionFeeDeficitRecorded>
>;
export type BitcoinBroadcasterTransactionFeeDeficitRefused = EventHandler<
  z.output<typeof bitcoinBroadcasterTransactionFeeDeficitRefused>
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
export type SwappingMinimumSwapAmountSet = EventHandler<
  z.output<typeof swappingMinimumSwapAmountSet>
>;
export type SwappingSwapAmountTooLow = EventHandler<z.output<typeof swappingSwapAmountTooLow>>;
export type SwappingCcmFailed = EventHandler<z.output<typeof swappingCcmFailed>>;
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
export type EthereumIngressEgressDepositReceived = EventHandler<
  z.output<typeof ethereumIngressEgressDepositReceived>
>;
export type EthereumIngressEgressAssetEgressStatusChanged = EventHandler<
  z.output<typeof ethereumIngressEgressAssetEgressStatusChanged>
>;
export type EthereumIngressEgressEgressScheduled = EventHandler<
  z.output<typeof ethereumIngressEgressEgressScheduled>
>;
export type EthereumIngressEgressCcmBroadcastRequested = EventHandler<
  z.output<typeof ethereumIngressEgressCcmBroadcastRequested>
>;
export type EthereumIngressEgressCcmEgressInvalid = EventHandler<
  z.output<typeof ethereumIngressEgressCcmEgressInvalid>
>;
export type EthereumIngressEgressDepositFetchesScheduled = EventHandler<
  z.output<typeof ethereumIngressEgressDepositFetchesScheduled>
>;
export type EthereumIngressEgressBatchBroadcastRequested = EventHandler<
  z.output<typeof ethereumIngressEgressBatchBroadcastRequested>
>;
export type EthereumIngressEgressMinimumDepositSet = EventHandler<
  z.output<typeof ethereumIngressEgressMinimumDepositSet>
>;
export type EthereumIngressEgressDepositIgnored = EventHandler<
  z.output<typeof ethereumIngressEgressDepositIgnored>
>;
export type EthereumIngressEgressVaultTransferFailed = EventHandler<
  z.output<typeof ethereumIngressEgressVaultTransferFailed>
>;
export type EthereumIngressEgressDepositWitnessRejected = EventHandler<
  z.output<typeof ethereumIngressEgressDepositWitnessRejected>
>;
export type PolkadotIngressEgressDepositReceived = EventHandler<
  z.output<typeof polkadotIngressEgressDepositReceived>
>;
export type PolkadotIngressEgressAssetEgressStatusChanged = EventHandler<
  z.output<typeof polkadotIngressEgressAssetEgressStatusChanged>
>;
export type PolkadotIngressEgressEgressScheduled = EventHandler<
  z.output<typeof polkadotIngressEgressEgressScheduled>
>;
export type PolkadotIngressEgressCcmBroadcastRequested = EventHandler<
  z.output<typeof polkadotIngressEgressCcmBroadcastRequested>
>;
export type PolkadotIngressEgressCcmEgressInvalid = EventHandler<
  z.output<typeof polkadotIngressEgressCcmEgressInvalid>
>;
export type PolkadotIngressEgressDepositFetchesScheduled = EventHandler<
  z.output<typeof polkadotIngressEgressDepositFetchesScheduled>
>;
export type PolkadotIngressEgressBatchBroadcastRequested = EventHandler<
  z.output<typeof polkadotIngressEgressBatchBroadcastRequested>
>;
export type PolkadotIngressEgressMinimumDepositSet = EventHandler<
  z.output<typeof polkadotIngressEgressMinimumDepositSet>
>;
export type PolkadotIngressEgressDepositIgnored = EventHandler<
  z.output<typeof polkadotIngressEgressDepositIgnored>
>;
export type PolkadotIngressEgressVaultTransferFailed = EventHandler<
  z.output<typeof polkadotIngressEgressVaultTransferFailed>
>;
export type PolkadotIngressEgressDepositWitnessRejected = EventHandler<
  z.output<typeof polkadotIngressEgressDepositWitnessRejected>
>;
export type BitcoinIngressEgressDepositReceived = EventHandler<
  z.output<typeof bitcoinIngressEgressDepositReceived>
>;
export type BitcoinIngressEgressAssetEgressStatusChanged = EventHandler<
  z.output<typeof bitcoinIngressEgressAssetEgressStatusChanged>
>;
export type BitcoinIngressEgressEgressScheduled = EventHandler<
  z.output<typeof bitcoinIngressEgressEgressScheduled>
>;
export type BitcoinIngressEgressCcmBroadcastRequested = EventHandler<
  z.output<typeof bitcoinIngressEgressCcmBroadcastRequested>
>;
export type BitcoinIngressEgressCcmEgressInvalid = EventHandler<
  z.output<typeof bitcoinIngressEgressCcmEgressInvalid>
>;
export type BitcoinIngressEgressDepositFetchesScheduled = EventHandler<
  z.output<typeof bitcoinIngressEgressDepositFetchesScheduled>
>;
export type BitcoinIngressEgressBatchBroadcastRequested = EventHandler<
  z.output<typeof bitcoinIngressEgressBatchBroadcastRequested>
>;
export type BitcoinIngressEgressMinimumDepositSet = EventHandler<
  z.output<typeof bitcoinIngressEgressMinimumDepositSet>
>;
export type BitcoinIngressEgressDepositIgnored = EventHandler<
  z.output<typeof bitcoinIngressEgressDepositIgnored>
>;
export type BitcoinIngressEgressVaultTransferFailed = EventHandler<
  z.output<typeof bitcoinIngressEgressVaultTransferFailed>
>;
export type BitcoinIngressEgressDepositWitnessRejected = EventHandler<
  z.output<typeof bitcoinIngressEgressDepositWitnessRejected>
>;
export type LiquidityPoolsUpdatedBuyInterval = EventHandler<
  z.output<typeof liquidityPoolsUpdatedBuyInterval>
>;
export type LiquidityPoolsPoolStateUpdated = EventHandler<
  z.output<typeof liquidityPoolsPoolStateUpdated>
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
export type LiquidityPoolsNetworkFeeTaken = EventHandler<
  z.output<typeof liquidityPoolsNetworkFeeTaken>
>;
export type LiquidityPoolsAssetSwapped = EventHandler<z.output<typeof liquidityPoolsAssetSwapped>>;
export type LiquidityPoolsPoolFeeSet = EventHandler<z.output<typeof liquidityPoolsPoolFeeSet>>;

type HandlerMap = {
  System?: {
    ExtrinsicSuccess?: SystemExtrinsicSuccess;
    ExtrinsicFailed?: SystemExtrinsicFailed;
    CodeUpdated?: SystemCodeUpdated;
    NewAccount?: SystemNewAccount;
    KilledAccount?: SystemKilledAccount;
    Remarked?: SystemRemarked;
  };
  Environment?: {
    AddedNewEthAsset?: EnvironmentAddedNewEthAsset;
    UpdatedEthAsset?: EnvironmentUpdatedEthAsset;
    PolkadotVaultAccountSet?: EnvironmentPolkadotVaultAccountSet;
    BitcoinBlockNumberSetForVault?: EnvironmentBitcoinBlockNumberSetForVault;
    RuntimeSafeModeUpdated?: EnvironmentRuntimeSafeModeUpdated;
  };
  Flip?: {
    RemainingImbalance?: FlipRemainingImbalance;
    SlashingPerformed?: FlipSlashingPerformed;
    AccountReaped?: FlipAccountReaped;
    SlashingRateUpdated?: FlipSlashingRateUpdated;
  };
  Emissions?: {
    SupplyUpdateBroadcastRequested?: EmissionsSupplyUpdateBroadcastRequested;
    CurrentAuthorityInflationEmissionsUpdated?: EmissionsCurrentAuthorityInflationEmissionsUpdated;
    BackupNodeInflationEmissionsUpdated?: EmissionsBackupNodeInflationEmissionsUpdated;
    SupplyUpdateIntervalUpdated?: EmissionsSupplyUpdateIntervalUpdated;
  };
  Funding?: {
    Funded?: FundingFunded;
    RedemptionRequested?: FundingRedemptionRequested;
    RedemptionSettled?: FundingRedemptionSettled;
    StoppedBidding?: FundingStoppedBidding;
    StartedBidding?: FundingStartedBidding;
    RedemptionExpired?: FundingRedemptionExpired;
    AddedRestrictedAddress?: FundingAddedRestrictedAddress;
    RemovedRestrictedAddress?: FundingRemovedRestrictedAddress;
    FailedFundingAttempt?: FundingFailedFundingAttempt;
    MinimumFundingUpdated?: FundingMinimumFundingUpdated;
    RedemptionTaxAmountUpdated?: FundingRedemptionTaxAmountUpdated;
    RedemptionAmountZero?: FundingRedemptionAmountZero;
    BoundRedeemAddress?: FundingBoundRedeemAddress;
    BoundExecutorAddress?: FundingBoundExecutorAddress;
  };
  AccountRoles?: {
    AccountRoleRegistered?: AccountRolesAccountRoleRegistered;
  };
  TransactionPayment?: {
    TransactionFeePaid?: TransactionPaymentTransactionFeePaid;
  };
  Witnesser?: {
    WitnessExecutionFailed?: WitnesserWitnessExecutionFailed;
    Prewitnessed?: WitnesserPrewitnessed;
  };
  Validator?: {
    RotationAborted?: ValidatorRotationAborted;
    NewEpoch?: ValidatorNewEpoch;
    RotationPhaseUpdated?: ValidatorRotationPhaseUpdated;
    CFEVersionUpdated?: ValidatorCFEVersionUpdated;
    PeerIdRegistered?: ValidatorPeerIdRegistered;
    PeerIdUnregistered?: ValidatorPeerIdUnregistered;
    VanityNameSet?: ValidatorVanityNameSet;
    AuctionCompleted?: ValidatorAuctionCompleted;
    PalletConfigUpdated?: ValidatorPalletConfigUpdated;
  };
  Session?: {
    NewSession?: SessionNewSession;
  };
  Grandpa?: {
    NewAuthorities?: GrandpaNewAuthorities;
    Paused?: GrandpaPaused;
    Resumed?: GrandpaResumed;
  };
  Governance?: {
    Proposed?: GovernanceProposed;
    Executed?: GovernanceExecuted;
    Expired?: GovernanceExpired;
    Approved?: GovernanceApproved;
    FailedExecution?: GovernanceFailedExecution;
    DecodeOfCallFailed?: GovernanceDecodeOfCallFailed;
    GovKeyCallExecuted?: GovernanceGovKeyCallExecuted;
    GovKeyCallHashWhitelisted?: GovernanceGovKeyCallHashWhitelisted;
    GovKeyCallExecutionFailed?: GovernanceGovKeyCallExecutionFailed;
  };
  TokenholderGovernance?: {
    ProposalSubmitted?: TokenholderGovernanceProposalSubmitted;
    ProposalPassed?: TokenholderGovernanceProposalPassed;
    ProposalRejected?: TokenholderGovernanceProposalRejected;
    ProposalEnacted?: TokenholderGovernanceProposalEnacted;
    GovKeyUpdatedHasFailed?: TokenholderGovernanceGovKeyUpdatedHasFailed;
    GovKeyUpdatedWasSuccessful?: TokenholderGovernanceGovKeyUpdatedWasSuccessful;
  };
  Reputation?: {
    OffencePenalty?: ReputationOffencePenalty;
    AccrualRateUpdated?: ReputationAccrualRateUpdated;
    MissedHeartbeatPenaltyUpdated?: ReputationMissedHeartbeatPenaltyUpdated;
    PenaltyUpdated?: ReputationPenaltyUpdated;
  };
  EthereumChainTracking?: {
    ChainStateUpdated?: EthereumChainTrackingChainStateUpdated;
  };
  PolkadotChainTracking?: {
    ChainStateUpdated?: PolkadotChainTrackingChainStateUpdated;
  };
  BitcoinChainTracking?: {
    ChainStateUpdated?: BitcoinChainTrackingChainStateUpdated;
  };
  EthereumVault?: {
    KeygenRequest?: EthereumVaultKeygenRequest;
    KeyHandoverRequest?: EthereumVaultKeyHandoverRequest;
    VaultRotationCompleted?: EthereumVaultVaultRotationCompleted;
    VaultRotatedExternally?: EthereumVaultVaultRotatedExternally;
    KeygenSuccessReported?: EthereumVaultKeygenSuccessReported;
    KeyHandoverSuccessReported?: EthereumVaultKeyHandoverSuccessReported;
    KeygenFailureReported?: EthereumVaultKeygenFailureReported;
    KeyHandoverFailureReported?: EthereumVaultKeyHandoverFailureReported;
    KeygenSuccess?: EthereumVaultKeygenSuccess;
    KeyHandoverSuccess?: EthereumVaultKeyHandoverSuccess;
    NoKeyHandover?: EthereumVaultNoKeyHandover;
    KeygenVerificationSuccess?: EthereumVaultKeygenVerificationSuccess;
    KeyHandoverVerificationSuccess?: EthereumVaultKeyHandoverVerificationSuccess;
    KeygenVerificationFailure?: EthereumVaultKeygenVerificationFailure;
    KeyHandoverVerificationFailure?: EthereumVaultKeyHandoverVerificationFailure;
    KeygenFailure?: EthereumVaultKeygenFailure;
    KeygenResponseTimeout?: EthereumVaultKeygenResponseTimeout;
    KeyHandoverResponseTimeout?: EthereumVaultKeyHandoverResponseTimeout;
    KeygenResponseTimeoutUpdated?: EthereumVaultKeygenResponseTimeoutUpdated;
    AwaitingGovernanceActivation?: EthereumVaultAwaitingGovernanceActivation;
    KeyHandoverFailure?: EthereumVaultKeyHandoverFailure;
    VaultRotationAborted?: EthereumVaultVaultRotationAborted;
  };
  PolkadotVault?: {
    KeygenRequest?: PolkadotVaultKeygenRequest;
    KeyHandoverRequest?: PolkadotVaultKeyHandoverRequest;
    VaultRotationCompleted?: PolkadotVaultVaultRotationCompleted;
    VaultRotatedExternally?: PolkadotVaultVaultRotatedExternally;
    KeygenSuccessReported?: PolkadotVaultKeygenSuccessReported;
    KeyHandoverSuccessReported?: PolkadotVaultKeyHandoverSuccessReported;
    KeygenFailureReported?: PolkadotVaultKeygenFailureReported;
    KeyHandoverFailureReported?: PolkadotVaultKeyHandoverFailureReported;
    KeygenSuccess?: PolkadotVaultKeygenSuccess;
    KeyHandoverSuccess?: PolkadotVaultKeyHandoverSuccess;
    NoKeyHandover?: PolkadotVaultNoKeyHandover;
    KeygenVerificationSuccess?: PolkadotVaultKeygenVerificationSuccess;
    KeyHandoverVerificationSuccess?: PolkadotVaultKeyHandoverVerificationSuccess;
    KeygenVerificationFailure?: PolkadotVaultKeygenVerificationFailure;
    KeyHandoverVerificationFailure?: PolkadotVaultKeyHandoverVerificationFailure;
    KeygenFailure?: PolkadotVaultKeygenFailure;
    KeygenResponseTimeout?: PolkadotVaultKeygenResponseTimeout;
    KeyHandoverResponseTimeout?: PolkadotVaultKeyHandoverResponseTimeout;
    KeygenResponseTimeoutUpdated?: PolkadotVaultKeygenResponseTimeoutUpdated;
    AwaitingGovernanceActivation?: PolkadotVaultAwaitingGovernanceActivation;
    KeyHandoverFailure?: PolkadotVaultKeyHandoverFailure;
    VaultRotationAborted?: PolkadotVaultVaultRotationAborted;
  };
  BitcoinVault?: {
    KeygenRequest?: BitcoinVaultKeygenRequest;
    KeyHandoverRequest?: BitcoinVaultKeyHandoverRequest;
    VaultRotationCompleted?: BitcoinVaultVaultRotationCompleted;
    VaultRotatedExternally?: BitcoinVaultVaultRotatedExternally;
    KeygenSuccessReported?: BitcoinVaultKeygenSuccessReported;
    KeyHandoverSuccessReported?: BitcoinVaultKeyHandoverSuccessReported;
    KeygenFailureReported?: BitcoinVaultKeygenFailureReported;
    KeyHandoverFailureReported?: BitcoinVaultKeyHandoverFailureReported;
    KeygenSuccess?: BitcoinVaultKeygenSuccess;
    KeyHandoverSuccess?: BitcoinVaultKeyHandoverSuccess;
    NoKeyHandover?: BitcoinVaultNoKeyHandover;
    KeygenVerificationSuccess?: BitcoinVaultKeygenVerificationSuccess;
    KeyHandoverVerificationSuccess?: BitcoinVaultKeyHandoverVerificationSuccess;
    KeygenVerificationFailure?: BitcoinVaultKeygenVerificationFailure;
    KeyHandoverVerificationFailure?: BitcoinVaultKeyHandoverVerificationFailure;
    KeygenFailure?: BitcoinVaultKeygenFailure;
    KeygenResponseTimeout?: BitcoinVaultKeygenResponseTimeout;
    KeyHandoverResponseTimeout?: BitcoinVaultKeyHandoverResponseTimeout;
    KeygenResponseTimeoutUpdated?: BitcoinVaultKeygenResponseTimeoutUpdated;
    AwaitingGovernanceActivation?: BitcoinVaultAwaitingGovernanceActivation;
    KeyHandoverFailure?: BitcoinVaultKeyHandoverFailure;
    VaultRotationAborted?: BitcoinVaultVaultRotationAborted;
  };
  EthereumThresholdSigner?: {
    ThresholdSignatureRequest?: EthereumThresholdSignerThresholdSignatureRequest;
    ThresholdSignatureFailed?: EthereumThresholdSignerThresholdSignatureFailed;
    ThresholdSignatureSuccess?: EthereumThresholdSignerThresholdSignatureSuccess;
    ThresholdDispatchComplete?: EthereumThresholdSignerThresholdDispatchComplete;
    RetryRequested?: EthereumThresholdSignerRetryRequested;
    FailureReportProcessed?: EthereumThresholdSignerFailureReportProcessed;
    SignersUnavailable?: EthereumThresholdSignerSignersUnavailable;
    CurrentKeyUnavailable?: EthereumThresholdSignerCurrentKeyUnavailable;
    ThresholdSignatureResponseTimeoutUpdated?: EthereumThresholdSignerThresholdSignatureResponseTimeoutUpdated;
  };
  PolkadotThresholdSigner?: {
    ThresholdSignatureRequest?: PolkadotThresholdSignerThresholdSignatureRequest;
    ThresholdSignatureFailed?: PolkadotThresholdSignerThresholdSignatureFailed;
    ThresholdSignatureSuccess?: PolkadotThresholdSignerThresholdSignatureSuccess;
    ThresholdDispatchComplete?: PolkadotThresholdSignerThresholdDispatchComplete;
    RetryRequested?: PolkadotThresholdSignerRetryRequested;
    FailureReportProcessed?: PolkadotThresholdSignerFailureReportProcessed;
    SignersUnavailable?: PolkadotThresholdSignerSignersUnavailable;
    CurrentKeyUnavailable?: PolkadotThresholdSignerCurrentKeyUnavailable;
    ThresholdSignatureResponseTimeoutUpdated?: PolkadotThresholdSignerThresholdSignatureResponseTimeoutUpdated;
  };
  BitcoinThresholdSigner?: {
    ThresholdSignatureRequest?: BitcoinThresholdSignerThresholdSignatureRequest;
    ThresholdSignatureFailed?: BitcoinThresholdSignerThresholdSignatureFailed;
    ThresholdSignatureSuccess?: BitcoinThresholdSignerThresholdSignatureSuccess;
    ThresholdDispatchComplete?: BitcoinThresholdSignerThresholdDispatchComplete;
    RetryRequested?: BitcoinThresholdSignerRetryRequested;
    FailureReportProcessed?: BitcoinThresholdSignerFailureReportProcessed;
    SignersUnavailable?: BitcoinThresholdSignerSignersUnavailable;
    CurrentKeyUnavailable?: BitcoinThresholdSignerCurrentKeyUnavailable;
    ThresholdSignatureResponseTimeoutUpdated?: BitcoinThresholdSignerThresholdSignatureResponseTimeoutUpdated;
  };
  EthereumBroadcaster?: {
    TransactionBroadcastRequest?: EthereumBroadcasterTransactionBroadcastRequest;
    BroadcastRetryScheduled?: EthereumBroadcasterBroadcastRetryScheduled;
    BroadcastAttemptTimeout?: EthereumBroadcasterBroadcastAttemptTimeout;
    BroadcastAborted?: EthereumBroadcasterBroadcastAborted;
    BroadcastSuccess?: EthereumBroadcasterBroadcastSuccess;
    ThresholdSignatureInvalid?: EthereumBroadcasterThresholdSignatureInvalid;
    BroadcastCallbackExecuted?: EthereumBroadcasterBroadcastCallbackExecuted;
    TransactionFeeDeficitRecorded?: EthereumBroadcasterTransactionFeeDeficitRecorded;
    TransactionFeeDeficitRefused?: EthereumBroadcasterTransactionFeeDeficitRefused;
  };
  PolkadotBroadcaster?: {
    TransactionBroadcastRequest?: PolkadotBroadcasterTransactionBroadcastRequest;
    BroadcastRetryScheduled?: PolkadotBroadcasterBroadcastRetryScheduled;
    BroadcastAttemptTimeout?: PolkadotBroadcasterBroadcastAttemptTimeout;
    BroadcastAborted?: PolkadotBroadcasterBroadcastAborted;
    BroadcastSuccess?: PolkadotBroadcasterBroadcastSuccess;
    ThresholdSignatureInvalid?: PolkadotBroadcasterThresholdSignatureInvalid;
    BroadcastCallbackExecuted?: PolkadotBroadcasterBroadcastCallbackExecuted;
    TransactionFeeDeficitRecorded?: PolkadotBroadcasterTransactionFeeDeficitRecorded;
    TransactionFeeDeficitRefused?: PolkadotBroadcasterTransactionFeeDeficitRefused;
  };
  BitcoinBroadcaster?: {
    TransactionBroadcastRequest?: BitcoinBroadcasterTransactionBroadcastRequest;
    BroadcastRetryScheduled?: BitcoinBroadcasterBroadcastRetryScheduled;
    BroadcastAttemptTimeout?: BitcoinBroadcasterBroadcastAttemptTimeout;
    BroadcastAborted?: BitcoinBroadcasterBroadcastAborted;
    BroadcastSuccess?: BitcoinBroadcasterBroadcastSuccess;
    ThresholdSignatureInvalid?: BitcoinBroadcasterThresholdSignatureInvalid;
    BroadcastCallbackExecuted?: BitcoinBroadcasterBroadcastCallbackExecuted;
    TransactionFeeDeficitRecorded?: BitcoinBroadcasterTransactionFeeDeficitRecorded;
    TransactionFeeDeficitRefused?: BitcoinBroadcasterTransactionFeeDeficitRefused;
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
    MinimumSwapAmountSet?: SwappingMinimumSwapAmountSet;
    SwapAmountTooLow?: SwappingSwapAmountTooLow;
    CcmFailed?: SwappingCcmFailed;
  };
  LiquidityProvider?: {
    AccountDebited?: LiquidityProviderAccountDebited;
    AccountCredited?: LiquidityProviderAccountCredited;
    LiquidityDepositAddressReady?: LiquidityProviderLiquidityDepositAddressReady;
    WithdrawalEgressScheduled?: LiquidityProviderWithdrawalEgressScheduled;
    LiquidityRefundAddressRegistered?: LiquidityProviderLiquidityRefundAddressRegistered;
  };
  EthereumIngressEgress?: {
    DepositReceived?: EthereumIngressEgressDepositReceived;
    AssetEgressStatusChanged?: EthereumIngressEgressAssetEgressStatusChanged;
    EgressScheduled?: EthereumIngressEgressEgressScheduled;
    CcmBroadcastRequested?: EthereumIngressEgressCcmBroadcastRequested;
    CcmEgressInvalid?: EthereumIngressEgressCcmEgressInvalid;
    DepositFetchesScheduled?: EthereumIngressEgressDepositFetchesScheduled;
    BatchBroadcastRequested?: EthereumIngressEgressBatchBroadcastRequested;
    MinimumDepositSet?: EthereumIngressEgressMinimumDepositSet;
    DepositIgnored?: EthereumIngressEgressDepositIgnored;
    VaultTransferFailed?: EthereumIngressEgressVaultTransferFailed;
    DepositWitnessRejected?: EthereumIngressEgressDepositWitnessRejected;
  };
  PolkadotIngressEgress?: {
    DepositReceived?: PolkadotIngressEgressDepositReceived;
    AssetEgressStatusChanged?: PolkadotIngressEgressAssetEgressStatusChanged;
    EgressScheduled?: PolkadotIngressEgressEgressScheduled;
    CcmBroadcastRequested?: PolkadotIngressEgressCcmBroadcastRequested;
    CcmEgressInvalid?: PolkadotIngressEgressCcmEgressInvalid;
    DepositFetchesScheduled?: PolkadotIngressEgressDepositFetchesScheduled;
    BatchBroadcastRequested?: PolkadotIngressEgressBatchBroadcastRequested;
    MinimumDepositSet?: PolkadotIngressEgressMinimumDepositSet;
    DepositIgnored?: PolkadotIngressEgressDepositIgnored;
    VaultTransferFailed?: PolkadotIngressEgressVaultTransferFailed;
    DepositWitnessRejected?: PolkadotIngressEgressDepositWitnessRejected;
  };
  BitcoinIngressEgress?: {
    DepositReceived?: BitcoinIngressEgressDepositReceived;
    AssetEgressStatusChanged?: BitcoinIngressEgressAssetEgressStatusChanged;
    EgressScheduled?: BitcoinIngressEgressEgressScheduled;
    CcmBroadcastRequested?: BitcoinIngressEgressCcmBroadcastRequested;
    CcmEgressInvalid?: BitcoinIngressEgressCcmEgressInvalid;
    DepositFetchesScheduled?: BitcoinIngressEgressDepositFetchesScheduled;
    BatchBroadcastRequested?: BitcoinIngressEgressBatchBroadcastRequested;
    MinimumDepositSet?: BitcoinIngressEgressMinimumDepositSet;
    DepositIgnored?: BitcoinIngressEgressDepositIgnored;
    VaultTransferFailed?: BitcoinIngressEgressVaultTransferFailed;
    DepositWitnessRejected?: BitcoinIngressEgressDepositWitnessRejected;
  };
  LiquidityPools?: {
    UpdatedBuyInterval?: LiquidityPoolsUpdatedBuyInterval;
    PoolStateUpdated?: LiquidityPoolsPoolStateUpdated;
    NewPoolCreated?: LiquidityPoolsNewPoolCreated;
    RangeOrderUpdated?: LiquidityPoolsRangeOrderUpdated;
    LimitOrderUpdated?: LiquidityPoolsLimitOrderUpdated;
    NetworkFeeTaken?: LiquidityPoolsNetworkFeeTaken;
    AssetSwapped?: LiquidityPoolsAssetSwapped;
    PoolFeeSet?: LiquidityPoolsPoolFeeSet;
  };
};

export const handleEvents = (map: HandlerMap) => ({
  spec: 100,
  handlers: [
    {
      name: 'System.ExtrinsicSuccess',
      handler: wrapHandler(map.System?.ExtrinsicSuccess, systemExtrinsicSuccess),
    },
    {
      name: 'System.ExtrinsicFailed',
      handler: wrapHandler(map.System?.ExtrinsicFailed, systemExtrinsicFailed),
    },
    {
      name: 'System.CodeUpdated',
      handler: wrapHandler(map.System?.CodeUpdated, systemCodeUpdated),
    },
    {
      name: 'System.NewAccount',
      handler: wrapHandler(map.System?.NewAccount, systemNewAccount),
    },
    {
      name: 'System.KilledAccount',
      handler: wrapHandler(map.System?.KilledAccount, systemKilledAccount),
    },
    {
      name: 'System.Remarked',
      handler: wrapHandler(map.System?.Remarked, systemRemarked),
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
      name: 'Environment.PolkadotVaultAccountSet',
      handler: wrapHandler(
        map.Environment?.PolkadotVaultAccountSet,
        environmentPolkadotVaultAccountSet,
      ),
    },
    {
      name: 'Environment.BitcoinBlockNumberSetForVault',
      handler: wrapHandler(
        map.Environment?.BitcoinBlockNumberSetForVault,
        environmentBitcoinBlockNumberSetForVault,
      ),
    },
    {
      name: 'Environment.RuntimeSafeModeUpdated',
      handler: wrapHandler(
        map.Environment?.RuntimeSafeModeUpdated,
        environmentRuntimeSafeModeUpdated,
      ),
    },
    {
      name: 'Flip.RemainingImbalance',
      handler: wrapHandler(map.Flip?.RemainingImbalance, flipRemainingImbalance),
    },
    {
      name: 'Flip.SlashingPerformed',
      handler: wrapHandler(map.Flip?.SlashingPerformed, flipSlashingPerformed),
    },
    {
      name: 'Flip.AccountReaped',
      handler: wrapHandler(map.Flip?.AccountReaped, flipAccountReaped),
    },
    {
      name: 'Flip.SlashingRateUpdated',
      handler: wrapHandler(map.Flip?.SlashingRateUpdated, flipSlashingRateUpdated),
    },
    {
      name: 'Emissions.SupplyUpdateBroadcastRequested',
      handler: wrapHandler(
        map.Emissions?.SupplyUpdateBroadcastRequested,
        emissionsSupplyUpdateBroadcastRequested,
      ),
    },
    {
      name: 'Emissions.CurrentAuthorityInflationEmissionsUpdated',
      handler: wrapHandler(
        map.Emissions?.CurrentAuthorityInflationEmissionsUpdated,
        emissionsCurrentAuthorityInflationEmissionsUpdated,
      ),
    },
    {
      name: 'Emissions.BackupNodeInflationEmissionsUpdated',
      handler: wrapHandler(
        map.Emissions?.BackupNodeInflationEmissionsUpdated,
        emissionsBackupNodeInflationEmissionsUpdated,
      ),
    },
    {
      name: 'Emissions.SupplyUpdateIntervalUpdated',
      handler: wrapHandler(
        map.Emissions?.SupplyUpdateIntervalUpdated,
        emissionsSupplyUpdateIntervalUpdated,
      ),
    },
    {
      name: 'Funding.Funded',
      handler: wrapHandler(map.Funding?.Funded, fundingFunded),
    },
    {
      name: 'Funding.RedemptionRequested',
      handler: wrapHandler(map.Funding?.RedemptionRequested, fundingRedemptionRequested),
    },
    {
      name: 'Funding.RedemptionSettled',
      handler: wrapHandler(map.Funding?.RedemptionSettled, fundingRedemptionSettled),
    },
    {
      name: 'Funding.StoppedBidding',
      handler: wrapHandler(map.Funding?.StoppedBidding, fundingStoppedBidding),
    },
    {
      name: 'Funding.StartedBidding',
      handler: wrapHandler(map.Funding?.StartedBidding, fundingStartedBidding),
    },
    {
      name: 'Funding.RedemptionExpired',
      handler: wrapHandler(map.Funding?.RedemptionExpired, fundingRedemptionExpired),
    },
    {
      name: 'Funding.AddedRestrictedAddress',
      handler: wrapHandler(map.Funding?.AddedRestrictedAddress, fundingAddedRestrictedAddress),
    },
    {
      name: 'Funding.RemovedRestrictedAddress',
      handler: wrapHandler(map.Funding?.RemovedRestrictedAddress, fundingRemovedRestrictedAddress),
    },
    {
      name: 'Funding.FailedFundingAttempt',
      handler: wrapHandler(map.Funding?.FailedFundingAttempt, fundingFailedFundingAttempt),
    },
    {
      name: 'Funding.MinimumFundingUpdated',
      handler: wrapHandler(map.Funding?.MinimumFundingUpdated, fundingMinimumFundingUpdated),
    },
    {
      name: 'Funding.RedemptionTaxAmountUpdated',
      handler: wrapHandler(
        map.Funding?.RedemptionTaxAmountUpdated,
        fundingRedemptionTaxAmountUpdated,
      ),
    },
    {
      name: 'Funding.RedemptionAmountZero',
      handler: wrapHandler(map.Funding?.RedemptionAmountZero, fundingRedemptionAmountZero),
    },
    {
      name: 'Funding.BoundRedeemAddress',
      handler: wrapHandler(map.Funding?.BoundRedeemAddress, fundingBoundRedeemAddress),
    },
    {
      name: 'Funding.BoundExecutorAddress',
      handler: wrapHandler(map.Funding?.BoundExecutorAddress, fundingBoundExecutorAddress),
    },
    {
      name: 'AccountRoles.AccountRoleRegistered',
      handler: wrapHandler(
        map.AccountRoles?.AccountRoleRegistered,
        accountRolesAccountRoleRegistered,
      ),
    },
    {
      name: 'TransactionPayment.TransactionFeePaid',
      handler: wrapHandler(
        map.TransactionPayment?.TransactionFeePaid,
        transactionPaymentTransactionFeePaid,
      ),
    },
    {
      name: 'Witnesser.WitnessExecutionFailed',
      handler: wrapHandler(map.Witnesser?.WitnessExecutionFailed, witnesserWitnessExecutionFailed),
    },
    {
      name: 'Witnesser.Prewitnessed',
      handler: wrapHandler(map.Witnesser?.Prewitnessed, witnesserPrewitnessed),
    },
    {
      name: 'Validator.RotationAborted',
      handler: wrapHandler(map.Validator?.RotationAborted, validatorRotationAborted),
    },
    {
      name: 'Validator.NewEpoch',
      handler: wrapHandler(map.Validator?.NewEpoch, validatorNewEpoch),
    },
    {
      name: 'Validator.RotationPhaseUpdated',
      handler: wrapHandler(map.Validator?.RotationPhaseUpdated, validatorRotationPhaseUpdated),
    },
    {
      name: 'Validator.CFEVersionUpdated',
      handler: wrapHandler(map.Validator?.CFEVersionUpdated, validatorCFEVersionUpdated),
    },
    {
      name: 'Validator.PeerIdRegistered',
      handler: wrapHandler(map.Validator?.PeerIdRegistered, validatorPeerIdRegistered),
    },
    {
      name: 'Validator.PeerIdUnregistered',
      handler: wrapHandler(map.Validator?.PeerIdUnregistered, validatorPeerIdUnregistered),
    },
    {
      name: 'Validator.VanityNameSet',
      handler: wrapHandler(map.Validator?.VanityNameSet, validatorVanityNameSet),
    },
    {
      name: 'Validator.AuctionCompleted',
      handler: wrapHandler(map.Validator?.AuctionCompleted, validatorAuctionCompleted),
    },
    {
      name: 'Validator.PalletConfigUpdated',
      handler: wrapHandler(map.Validator?.PalletConfigUpdated, validatorPalletConfigUpdated),
    },
    {
      name: 'Session.NewSession',
      handler: wrapHandler(map.Session?.NewSession, sessionNewSession),
    },
    {
      name: 'Grandpa.NewAuthorities',
      handler: wrapHandler(map.Grandpa?.NewAuthorities, grandpaNewAuthorities),
    },
    {
      name: 'Grandpa.Paused',
      handler: wrapHandler(map.Grandpa?.Paused, grandpaPaused),
    },
    {
      name: 'Grandpa.Resumed',
      handler: wrapHandler(map.Grandpa?.Resumed, grandpaResumed),
    },
    {
      name: 'Governance.Proposed',
      handler: wrapHandler(map.Governance?.Proposed, governanceProposed),
    },
    {
      name: 'Governance.Executed',
      handler: wrapHandler(map.Governance?.Executed, governanceExecuted),
    },
    {
      name: 'Governance.Expired',
      handler: wrapHandler(map.Governance?.Expired, governanceExpired),
    },
    {
      name: 'Governance.Approved',
      handler: wrapHandler(map.Governance?.Approved, governanceApproved),
    },
    {
      name: 'Governance.FailedExecution',
      handler: wrapHandler(map.Governance?.FailedExecution, governanceFailedExecution),
    },
    {
      name: 'Governance.DecodeOfCallFailed',
      handler: wrapHandler(map.Governance?.DecodeOfCallFailed, governanceDecodeOfCallFailed),
    },
    {
      name: 'Governance.GovKeyCallExecuted',
      handler: wrapHandler(map.Governance?.GovKeyCallExecuted, governanceGovKeyCallExecuted),
    },
    {
      name: 'Governance.GovKeyCallHashWhitelisted',
      handler: wrapHandler(
        map.Governance?.GovKeyCallHashWhitelisted,
        governanceGovKeyCallHashWhitelisted,
      ),
    },
    {
      name: 'Governance.GovKeyCallExecutionFailed',
      handler: wrapHandler(
        map.Governance?.GovKeyCallExecutionFailed,
        governanceGovKeyCallExecutionFailed,
      ),
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
      name: 'Reputation.OffencePenalty',
      handler: wrapHandler(map.Reputation?.OffencePenalty, reputationOffencePenalty),
    },
    {
      name: 'Reputation.AccrualRateUpdated',
      handler: wrapHandler(map.Reputation?.AccrualRateUpdated, reputationAccrualRateUpdated),
    },
    {
      name: 'Reputation.MissedHeartbeatPenaltyUpdated',
      handler: wrapHandler(
        map.Reputation?.MissedHeartbeatPenaltyUpdated,
        reputationMissedHeartbeatPenaltyUpdated,
      ),
    },
    {
      name: 'Reputation.PenaltyUpdated',
      handler: wrapHandler(map.Reputation?.PenaltyUpdated, reputationPenaltyUpdated),
    },
    {
      name: 'EthereumChainTracking.ChainStateUpdated',
      handler: wrapHandler(
        map.EthereumChainTracking?.ChainStateUpdated,
        ethereumChainTrackingChainStateUpdated,
      ),
    },
    {
      name: 'PolkadotChainTracking.ChainStateUpdated',
      handler: wrapHandler(
        map.PolkadotChainTracking?.ChainStateUpdated,
        polkadotChainTrackingChainStateUpdated,
      ),
    },
    {
      name: 'BitcoinChainTracking.ChainStateUpdated',
      handler: wrapHandler(
        map.BitcoinChainTracking?.ChainStateUpdated,
        bitcoinChainTrackingChainStateUpdated,
      ),
    },
    {
      name: 'EthereumVault.KeygenRequest',
      handler: wrapHandler(map.EthereumVault?.KeygenRequest, ethereumVaultKeygenRequest),
    },
    {
      name: 'EthereumVault.KeyHandoverRequest',
      handler: wrapHandler(map.EthereumVault?.KeyHandoverRequest, ethereumVaultKeyHandoverRequest),
    },
    {
      name: 'EthereumVault.VaultRotationCompleted',
      handler: wrapHandler(
        map.EthereumVault?.VaultRotationCompleted,
        ethereumVaultVaultRotationCompleted,
      ),
    },
    {
      name: 'EthereumVault.VaultRotatedExternally',
      handler: wrapHandler(
        map.EthereumVault?.VaultRotatedExternally,
        ethereumVaultVaultRotatedExternally,
      ),
    },
    {
      name: 'EthereumVault.KeygenSuccessReported',
      handler: wrapHandler(
        map.EthereumVault?.KeygenSuccessReported,
        ethereumVaultKeygenSuccessReported,
      ),
    },
    {
      name: 'EthereumVault.KeyHandoverSuccessReported',
      handler: wrapHandler(
        map.EthereumVault?.KeyHandoverSuccessReported,
        ethereumVaultKeyHandoverSuccessReported,
      ),
    },
    {
      name: 'EthereumVault.KeygenFailureReported',
      handler: wrapHandler(
        map.EthereumVault?.KeygenFailureReported,
        ethereumVaultKeygenFailureReported,
      ),
    },
    {
      name: 'EthereumVault.KeyHandoverFailureReported',
      handler: wrapHandler(
        map.EthereumVault?.KeyHandoverFailureReported,
        ethereumVaultKeyHandoverFailureReported,
      ),
    },
    {
      name: 'EthereumVault.KeygenSuccess',
      handler: wrapHandler(map.EthereumVault?.KeygenSuccess, ethereumVaultKeygenSuccess),
    },
    {
      name: 'EthereumVault.KeyHandoverSuccess',
      handler: wrapHandler(map.EthereumVault?.KeyHandoverSuccess, ethereumVaultKeyHandoverSuccess),
    },
    {
      name: 'EthereumVault.NoKeyHandover',
      handler: wrapHandler(map.EthereumVault?.NoKeyHandover, ethereumVaultNoKeyHandover),
    },
    {
      name: 'EthereumVault.KeygenVerificationSuccess',
      handler: wrapHandler(
        map.EthereumVault?.KeygenVerificationSuccess,
        ethereumVaultKeygenVerificationSuccess,
      ),
    },
    {
      name: 'EthereumVault.KeyHandoverVerificationSuccess',
      handler: wrapHandler(
        map.EthereumVault?.KeyHandoverVerificationSuccess,
        ethereumVaultKeyHandoverVerificationSuccess,
      ),
    },
    {
      name: 'EthereumVault.KeygenVerificationFailure',
      handler: wrapHandler(
        map.EthereumVault?.KeygenVerificationFailure,
        ethereumVaultKeygenVerificationFailure,
      ),
    },
    {
      name: 'EthereumVault.KeyHandoverVerificationFailure',
      handler: wrapHandler(
        map.EthereumVault?.KeyHandoverVerificationFailure,
        ethereumVaultKeyHandoverVerificationFailure,
      ),
    },
    {
      name: 'EthereumVault.KeygenFailure',
      handler: wrapHandler(map.EthereumVault?.KeygenFailure, ethereumVaultKeygenFailure),
    },
    {
      name: 'EthereumVault.KeygenResponseTimeout',
      handler: wrapHandler(
        map.EthereumVault?.KeygenResponseTimeout,
        ethereumVaultKeygenResponseTimeout,
      ),
    },
    {
      name: 'EthereumVault.KeyHandoverResponseTimeout',
      handler: wrapHandler(
        map.EthereumVault?.KeyHandoverResponseTimeout,
        ethereumVaultKeyHandoverResponseTimeout,
      ),
    },
    {
      name: 'EthereumVault.KeygenResponseTimeoutUpdated',
      handler: wrapHandler(
        map.EthereumVault?.KeygenResponseTimeoutUpdated,
        ethereumVaultKeygenResponseTimeoutUpdated,
      ),
    },
    {
      name: 'EthereumVault.AwaitingGovernanceActivation',
      handler: wrapHandler(
        map.EthereumVault?.AwaitingGovernanceActivation,
        ethereumVaultAwaitingGovernanceActivation,
      ),
    },
    {
      name: 'EthereumVault.KeyHandoverFailure',
      handler: wrapHandler(map.EthereumVault?.KeyHandoverFailure, ethereumVaultKeyHandoverFailure),
    },
    {
      name: 'EthereumVault.VaultRotationAborted',
      handler: wrapHandler(
        map.EthereumVault?.VaultRotationAborted,
        ethereumVaultVaultRotationAborted,
      ),
    },
    {
      name: 'PolkadotVault.KeygenRequest',
      handler: wrapHandler(map.PolkadotVault?.KeygenRequest, polkadotVaultKeygenRequest),
    },
    {
      name: 'PolkadotVault.KeyHandoverRequest',
      handler: wrapHandler(map.PolkadotVault?.KeyHandoverRequest, polkadotVaultKeyHandoverRequest),
    },
    {
      name: 'PolkadotVault.VaultRotationCompleted',
      handler: wrapHandler(
        map.PolkadotVault?.VaultRotationCompleted,
        polkadotVaultVaultRotationCompleted,
      ),
    },
    {
      name: 'PolkadotVault.VaultRotatedExternally',
      handler: wrapHandler(
        map.PolkadotVault?.VaultRotatedExternally,
        polkadotVaultVaultRotatedExternally,
      ),
    },
    {
      name: 'PolkadotVault.KeygenSuccessReported',
      handler: wrapHandler(
        map.PolkadotVault?.KeygenSuccessReported,
        polkadotVaultKeygenSuccessReported,
      ),
    },
    {
      name: 'PolkadotVault.KeyHandoverSuccessReported',
      handler: wrapHandler(
        map.PolkadotVault?.KeyHandoverSuccessReported,
        polkadotVaultKeyHandoverSuccessReported,
      ),
    },
    {
      name: 'PolkadotVault.KeygenFailureReported',
      handler: wrapHandler(
        map.PolkadotVault?.KeygenFailureReported,
        polkadotVaultKeygenFailureReported,
      ),
    },
    {
      name: 'PolkadotVault.KeyHandoverFailureReported',
      handler: wrapHandler(
        map.PolkadotVault?.KeyHandoverFailureReported,
        polkadotVaultKeyHandoverFailureReported,
      ),
    },
    {
      name: 'PolkadotVault.KeygenSuccess',
      handler: wrapHandler(map.PolkadotVault?.KeygenSuccess, polkadotVaultKeygenSuccess),
    },
    {
      name: 'PolkadotVault.KeyHandoverSuccess',
      handler: wrapHandler(map.PolkadotVault?.KeyHandoverSuccess, polkadotVaultKeyHandoverSuccess),
    },
    {
      name: 'PolkadotVault.NoKeyHandover',
      handler: wrapHandler(map.PolkadotVault?.NoKeyHandover, polkadotVaultNoKeyHandover),
    },
    {
      name: 'PolkadotVault.KeygenVerificationSuccess',
      handler: wrapHandler(
        map.PolkadotVault?.KeygenVerificationSuccess,
        polkadotVaultKeygenVerificationSuccess,
      ),
    },
    {
      name: 'PolkadotVault.KeyHandoverVerificationSuccess',
      handler: wrapHandler(
        map.PolkadotVault?.KeyHandoverVerificationSuccess,
        polkadotVaultKeyHandoverVerificationSuccess,
      ),
    },
    {
      name: 'PolkadotVault.KeygenVerificationFailure',
      handler: wrapHandler(
        map.PolkadotVault?.KeygenVerificationFailure,
        polkadotVaultKeygenVerificationFailure,
      ),
    },
    {
      name: 'PolkadotVault.KeyHandoverVerificationFailure',
      handler: wrapHandler(
        map.PolkadotVault?.KeyHandoverVerificationFailure,
        polkadotVaultKeyHandoverVerificationFailure,
      ),
    },
    {
      name: 'PolkadotVault.KeygenFailure',
      handler: wrapHandler(map.PolkadotVault?.KeygenFailure, polkadotVaultKeygenFailure),
    },
    {
      name: 'PolkadotVault.KeygenResponseTimeout',
      handler: wrapHandler(
        map.PolkadotVault?.KeygenResponseTimeout,
        polkadotVaultKeygenResponseTimeout,
      ),
    },
    {
      name: 'PolkadotVault.KeyHandoverResponseTimeout',
      handler: wrapHandler(
        map.PolkadotVault?.KeyHandoverResponseTimeout,
        polkadotVaultKeyHandoverResponseTimeout,
      ),
    },
    {
      name: 'PolkadotVault.KeygenResponseTimeoutUpdated',
      handler: wrapHandler(
        map.PolkadotVault?.KeygenResponseTimeoutUpdated,
        polkadotVaultKeygenResponseTimeoutUpdated,
      ),
    },
    {
      name: 'PolkadotVault.AwaitingGovernanceActivation',
      handler: wrapHandler(
        map.PolkadotVault?.AwaitingGovernanceActivation,
        polkadotVaultAwaitingGovernanceActivation,
      ),
    },
    {
      name: 'PolkadotVault.KeyHandoverFailure',
      handler: wrapHandler(map.PolkadotVault?.KeyHandoverFailure, polkadotVaultKeyHandoverFailure),
    },
    {
      name: 'PolkadotVault.VaultRotationAborted',
      handler: wrapHandler(
        map.PolkadotVault?.VaultRotationAborted,
        polkadotVaultVaultRotationAborted,
      ),
    },
    {
      name: 'BitcoinVault.KeygenRequest',
      handler: wrapHandler(map.BitcoinVault?.KeygenRequest, bitcoinVaultKeygenRequest),
    },
    {
      name: 'BitcoinVault.KeyHandoverRequest',
      handler: wrapHandler(map.BitcoinVault?.KeyHandoverRequest, bitcoinVaultKeyHandoverRequest),
    },
    {
      name: 'BitcoinVault.VaultRotationCompleted',
      handler: wrapHandler(
        map.BitcoinVault?.VaultRotationCompleted,
        bitcoinVaultVaultRotationCompleted,
      ),
    },
    {
      name: 'BitcoinVault.VaultRotatedExternally',
      handler: wrapHandler(
        map.BitcoinVault?.VaultRotatedExternally,
        bitcoinVaultVaultRotatedExternally,
      ),
    },
    {
      name: 'BitcoinVault.KeygenSuccessReported',
      handler: wrapHandler(
        map.BitcoinVault?.KeygenSuccessReported,
        bitcoinVaultKeygenSuccessReported,
      ),
    },
    {
      name: 'BitcoinVault.KeyHandoverSuccessReported',
      handler: wrapHandler(
        map.BitcoinVault?.KeyHandoverSuccessReported,
        bitcoinVaultKeyHandoverSuccessReported,
      ),
    },
    {
      name: 'BitcoinVault.KeygenFailureReported',
      handler: wrapHandler(
        map.BitcoinVault?.KeygenFailureReported,
        bitcoinVaultKeygenFailureReported,
      ),
    },
    {
      name: 'BitcoinVault.KeyHandoverFailureReported',
      handler: wrapHandler(
        map.BitcoinVault?.KeyHandoverFailureReported,
        bitcoinVaultKeyHandoverFailureReported,
      ),
    },
    {
      name: 'BitcoinVault.KeygenSuccess',
      handler: wrapHandler(map.BitcoinVault?.KeygenSuccess, bitcoinVaultKeygenSuccess),
    },
    {
      name: 'BitcoinVault.KeyHandoverSuccess',
      handler: wrapHandler(map.BitcoinVault?.KeyHandoverSuccess, bitcoinVaultKeyHandoverSuccess),
    },
    {
      name: 'BitcoinVault.NoKeyHandover',
      handler: wrapHandler(map.BitcoinVault?.NoKeyHandover, bitcoinVaultNoKeyHandover),
    },
    {
      name: 'BitcoinVault.KeygenVerificationSuccess',
      handler: wrapHandler(
        map.BitcoinVault?.KeygenVerificationSuccess,
        bitcoinVaultKeygenVerificationSuccess,
      ),
    },
    {
      name: 'BitcoinVault.KeyHandoverVerificationSuccess',
      handler: wrapHandler(
        map.BitcoinVault?.KeyHandoverVerificationSuccess,
        bitcoinVaultKeyHandoverVerificationSuccess,
      ),
    },
    {
      name: 'BitcoinVault.KeygenVerificationFailure',
      handler: wrapHandler(
        map.BitcoinVault?.KeygenVerificationFailure,
        bitcoinVaultKeygenVerificationFailure,
      ),
    },
    {
      name: 'BitcoinVault.KeyHandoverVerificationFailure',
      handler: wrapHandler(
        map.BitcoinVault?.KeyHandoverVerificationFailure,
        bitcoinVaultKeyHandoverVerificationFailure,
      ),
    },
    {
      name: 'BitcoinVault.KeygenFailure',
      handler: wrapHandler(map.BitcoinVault?.KeygenFailure, bitcoinVaultKeygenFailure),
    },
    {
      name: 'BitcoinVault.KeygenResponseTimeout',
      handler: wrapHandler(
        map.BitcoinVault?.KeygenResponseTimeout,
        bitcoinVaultKeygenResponseTimeout,
      ),
    },
    {
      name: 'BitcoinVault.KeyHandoverResponseTimeout',
      handler: wrapHandler(
        map.BitcoinVault?.KeyHandoverResponseTimeout,
        bitcoinVaultKeyHandoverResponseTimeout,
      ),
    },
    {
      name: 'BitcoinVault.KeygenResponseTimeoutUpdated',
      handler: wrapHandler(
        map.BitcoinVault?.KeygenResponseTimeoutUpdated,
        bitcoinVaultKeygenResponseTimeoutUpdated,
      ),
    },
    {
      name: 'BitcoinVault.AwaitingGovernanceActivation',
      handler: wrapHandler(
        map.BitcoinVault?.AwaitingGovernanceActivation,
        bitcoinVaultAwaitingGovernanceActivation,
      ),
    },
    {
      name: 'BitcoinVault.KeyHandoverFailure',
      handler: wrapHandler(map.BitcoinVault?.KeyHandoverFailure, bitcoinVaultKeyHandoverFailure),
    },
    {
      name: 'BitcoinVault.VaultRotationAborted',
      handler: wrapHandler(
        map.BitcoinVault?.VaultRotationAborted,
        bitcoinVaultVaultRotationAborted,
      ),
    },
    {
      name: 'EthereumThresholdSigner.ThresholdSignatureRequest',
      handler: wrapHandler(
        map.EthereumThresholdSigner?.ThresholdSignatureRequest,
        ethereumThresholdSignerThresholdSignatureRequest,
      ),
    },
    {
      name: 'EthereumThresholdSigner.ThresholdSignatureFailed',
      handler: wrapHandler(
        map.EthereumThresholdSigner?.ThresholdSignatureFailed,
        ethereumThresholdSignerThresholdSignatureFailed,
      ),
    },
    {
      name: 'EthereumThresholdSigner.ThresholdSignatureSuccess',
      handler: wrapHandler(
        map.EthereumThresholdSigner?.ThresholdSignatureSuccess,
        ethereumThresholdSignerThresholdSignatureSuccess,
      ),
    },
    {
      name: 'EthereumThresholdSigner.ThresholdDispatchComplete',
      handler: wrapHandler(
        map.EthereumThresholdSigner?.ThresholdDispatchComplete,
        ethereumThresholdSignerThresholdDispatchComplete,
      ),
    },
    {
      name: 'EthereumThresholdSigner.RetryRequested',
      handler: wrapHandler(
        map.EthereumThresholdSigner?.RetryRequested,
        ethereumThresholdSignerRetryRequested,
      ),
    },
    {
      name: 'EthereumThresholdSigner.FailureReportProcessed',
      handler: wrapHandler(
        map.EthereumThresholdSigner?.FailureReportProcessed,
        ethereumThresholdSignerFailureReportProcessed,
      ),
    },
    {
      name: 'EthereumThresholdSigner.SignersUnavailable',
      handler: wrapHandler(
        map.EthereumThresholdSigner?.SignersUnavailable,
        ethereumThresholdSignerSignersUnavailable,
      ),
    },
    {
      name: 'EthereumThresholdSigner.CurrentKeyUnavailable',
      handler: wrapHandler(
        map.EthereumThresholdSigner?.CurrentKeyUnavailable,
        ethereumThresholdSignerCurrentKeyUnavailable,
      ),
    },
    {
      name: 'EthereumThresholdSigner.ThresholdSignatureResponseTimeoutUpdated',
      handler: wrapHandler(
        map.EthereumThresholdSigner?.ThresholdSignatureResponseTimeoutUpdated,
        ethereumThresholdSignerThresholdSignatureResponseTimeoutUpdated,
      ),
    },
    {
      name: 'PolkadotThresholdSigner.ThresholdSignatureRequest',
      handler: wrapHandler(
        map.PolkadotThresholdSigner?.ThresholdSignatureRequest,
        polkadotThresholdSignerThresholdSignatureRequest,
      ),
    },
    {
      name: 'PolkadotThresholdSigner.ThresholdSignatureFailed',
      handler: wrapHandler(
        map.PolkadotThresholdSigner?.ThresholdSignatureFailed,
        polkadotThresholdSignerThresholdSignatureFailed,
      ),
    },
    {
      name: 'PolkadotThresholdSigner.ThresholdSignatureSuccess',
      handler: wrapHandler(
        map.PolkadotThresholdSigner?.ThresholdSignatureSuccess,
        polkadotThresholdSignerThresholdSignatureSuccess,
      ),
    },
    {
      name: 'PolkadotThresholdSigner.ThresholdDispatchComplete',
      handler: wrapHandler(
        map.PolkadotThresholdSigner?.ThresholdDispatchComplete,
        polkadotThresholdSignerThresholdDispatchComplete,
      ),
    },
    {
      name: 'PolkadotThresholdSigner.RetryRequested',
      handler: wrapHandler(
        map.PolkadotThresholdSigner?.RetryRequested,
        polkadotThresholdSignerRetryRequested,
      ),
    },
    {
      name: 'PolkadotThresholdSigner.FailureReportProcessed',
      handler: wrapHandler(
        map.PolkadotThresholdSigner?.FailureReportProcessed,
        polkadotThresholdSignerFailureReportProcessed,
      ),
    },
    {
      name: 'PolkadotThresholdSigner.SignersUnavailable',
      handler: wrapHandler(
        map.PolkadotThresholdSigner?.SignersUnavailable,
        polkadotThresholdSignerSignersUnavailable,
      ),
    },
    {
      name: 'PolkadotThresholdSigner.CurrentKeyUnavailable',
      handler: wrapHandler(
        map.PolkadotThresholdSigner?.CurrentKeyUnavailable,
        polkadotThresholdSignerCurrentKeyUnavailable,
      ),
    },
    {
      name: 'PolkadotThresholdSigner.ThresholdSignatureResponseTimeoutUpdated',
      handler: wrapHandler(
        map.PolkadotThresholdSigner?.ThresholdSignatureResponseTimeoutUpdated,
        polkadotThresholdSignerThresholdSignatureResponseTimeoutUpdated,
      ),
    },
    {
      name: 'BitcoinThresholdSigner.ThresholdSignatureRequest',
      handler: wrapHandler(
        map.BitcoinThresholdSigner?.ThresholdSignatureRequest,
        bitcoinThresholdSignerThresholdSignatureRequest,
      ),
    },
    {
      name: 'BitcoinThresholdSigner.ThresholdSignatureFailed',
      handler: wrapHandler(
        map.BitcoinThresholdSigner?.ThresholdSignatureFailed,
        bitcoinThresholdSignerThresholdSignatureFailed,
      ),
    },
    {
      name: 'BitcoinThresholdSigner.ThresholdSignatureSuccess',
      handler: wrapHandler(
        map.BitcoinThresholdSigner?.ThresholdSignatureSuccess,
        bitcoinThresholdSignerThresholdSignatureSuccess,
      ),
    },
    {
      name: 'BitcoinThresholdSigner.ThresholdDispatchComplete',
      handler: wrapHandler(
        map.BitcoinThresholdSigner?.ThresholdDispatchComplete,
        bitcoinThresholdSignerThresholdDispatchComplete,
      ),
    },
    {
      name: 'BitcoinThresholdSigner.RetryRequested',
      handler: wrapHandler(
        map.BitcoinThresholdSigner?.RetryRequested,
        bitcoinThresholdSignerRetryRequested,
      ),
    },
    {
      name: 'BitcoinThresholdSigner.FailureReportProcessed',
      handler: wrapHandler(
        map.BitcoinThresholdSigner?.FailureReportProcessed,
        bitcoinThresholdSignerFailureReportProcessed,
      ),
    },
    {
      name: 'BitcoinThresholdSigner.SignersUnavailable',
      handler: wrapHandler(
        map.BitcoinThresholdSigner?.SignersUnavailable,
        bitcoinThresholdSignerSignersUnavailable,
      ),
    },
    {
      name: 'BitcoinThresholdSigner.CurrentKeyUnavailable',
      handler: wrapHandler(
        map.BitcoinThresholdSigner?.CurrentKeyUnavailable,
        bitcoinThresholdSignerCurrentKeyUnavailable,
      ),
    },
    {
      name: 'BitcoinThresholdSigner.ThresholdSignatureResponseTimeoutUpdated',
      handler: wrapHandler(
        map.BitcoinThresholdSigner?.ThresholdSignatureResponseTimeoutUpdated,
        bitcoinThresholdSignerThresholdSignatureResponseTimeoutUpdated,
      ),
    },
    {
      name: 'EthereumBroadcaster.TransactionBroadcastRequest',
      handler: wrapHandler(
        map.EthereumBroadcaster?.TransactionBroadcastRequest,
        ethereumBroadcasterTransactionBroadcastRequest,
      ),
    },
    {
      name: 'EthereumBroadcaster.BroadcastRetryScheduled',
      handler: wrapHandler(
        map.EthereumBroadcaster?.BroadcastRetryScheduled,
        ethereumBroadcasterBroadcastRetryScheduled,
      ),
    },
    {
      name: 'EthereumBroadcaster.BroadcastAttemptTimeout',
      handler: wrapHandler(
        map.EthereumBroadcaster?.BroadcastAttemptTimeout,
        ethereumBroadcasterBroadcastAttemptTimeout,
      ),
    },
    {
      name: 'EthereumBroadcaster.BroadcastAborted',
      handler: wrapHandler(
        map.EthereumBroadcaster?.BroadcastAborted,
        ethereumBroadcasterBroadcastAborted,
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
      name: 'EthereumBroadcaster.ThresholdSignatureInvalid',
      handler: wrapHandler(
        map.EthereumBroadcaster?.ThresholdSignatureInvalid,
        ethereumBroadcasterThresholdSignatureInvalid,
      ),
    },
    {
      name: 'EthereumBroadcaster.BroadcastCallbackExecuted',
      handler: wrapHandler(
        map.EthereumBroadcaster?.BroadcastCallbackExecuted,
        ethereumBroadcasterBroadcastCallbackExecuted,
      ),
    },
    {
      name: 'EthereumBroadcaster.TransactionFeeDeficitRecorded',
      handler: wrapHandler(
        map.EthereumBroadcaster?.TransactionFeeDeficitRecorded,
        ethereumBroadcasterTransactionFeeDeficitRecorded,
      ),
    },
    {
      name: 'EthereumBroadcaster.TransactionFeeDeficitRefused',
      handler: wrapHandler(
        map.EthereumBroadcaster?.TransactionFeeDeficitRefused,
        ethereumBroadcasterTransactionFeeDeficitRefused,
      ),
    },
    {
      name: 'PolkadotBroadcaster.TransactionBroadcastRequest',
      handler: wrapHandler(
        map.PolkadotBroadcaster?.TransactionBroadcastRequest,
        polkadotBroadcasterTransactionBroadcastRequest,
      ),
    },
    {
      name: 'PolkadotBroadcaster.BroadcastRetryScheduled',
      handler: wrapHandler(
        map.PolkadotBroadcaster?.BroadcastRetryScheduled,
        polkadotBroadcasterBroadcastRetryScheduled,
      ),
    },
    {
      name: 'PolkadotBroadcaster.BroadcastAttemptTimeout',
      handler: wrapHandler(
        map.PolkadotBroadcaster?.BroadcastAttemptTimeout,
        polkadotBroadcasterBroadcastAttemptTimeout,
      ),
    },
    {
      name: 'PolkadotBroadcaster.BroadcastAborted',
      handler: wrapHandler(
        map.PolkadotBroadcaster?.BroadcastAborted,
        polkadotBroadcasterBroadcastAborted,
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
      name: 'PolkadotBroadcaster.ThresholdSignatureInvalid',
      handler: wrapHandler(
        map.PolkadotBroadcaster?.ThresholdSignatureInvalid,
        polkadotBroadcasterThresholdSignatureInvalid,
      ),
    },
    {
      name: 'PolkadotBroadcaster.BroadcastCallbackExecuted',
      handler: wrapHandler(
        map.PolkadotBroadcaster?.BroadcastCallbackExecuted,
        polkadotBroadcasterBroadcastCallbackExecuted,
      ),
    },
    {
      name: 'PolkadotBroadcaster.TransactionFeeDeficitRecorded',
      handler: wrapHandler(
        map.PolkadotBroadcaster?.TransactionFeeDeficitRecorded,
        polkadotBroadcasterTransactionFeeDeficitRecorded,
      ),
    },
    {
      name: 'PolkadotBroadcaster.TransactionFeeDeficitRefused',
      handler: wrapHandler(
        map.PolkadotBroadcaster?.TransactionFeeDeficitRefused,
        polkadotBroadcasterTransactionFeeDeficitRefused,
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
      name: 'BitcoinBroadcaster.BroadcastRetryScheduled',
      handler: wrapHandler(
        map.BitcoinBroadcaster?.BroadcastRetryScheduled,
        bitcoinBroadcasterBroadcastRetryScheduled,
      ),
    },
    {
      name: 'BitcoinBroadcaster.BroadcastAttemptTimeout',
      handler: wrapHandler(
        map.BitcoinBroadcaster?.BroadcastAttemptTimeout,
        bitcoinBroadcasterBroadcastAttemptTimeout,
      ),
    },
    {
      name: 'BitcoinBroadcaster.BroadcastAborted',
      handler: wrapHandler(
        map.BitcoinBroadcaster?.BroadcastAborted,
        bitcoinBroadcasterBroadcastAborted,
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
      name: 'BitcoinBroadcaster.ThresholdSignatureInvalid',
      handler: wrapHandler(
        map.BitcoinBroadcaster?.ThresholdSignatureInvalid,
        bitcoinBroadcasterThresholdSignatureInvalid,
      ),
    },
    {
      name: 'BitcoinBroadcaster.BroadcastCallbackExecuted',
      handler: wrapHandler(
        map.BitcoinBroadcaster?.BroadcastCallbackExecuted,
        bitcoinBroadcasterBroadcastCallbackExecuted,
      ),
    },
    {
      name: 'BitcoinBroadcaster.TransactionFeeDeficitRecorded',
      handler: wrapHandler(
        map.BitcoinBroadcaster?.TransactionFeeDeficitRecorded,
        bitcoinBroadcasterTransactionFeeDeficitRecorded,
      ),
    },
    {
      name: 'BitcoinBroadcaster.TransactionFeeDeficitRefused',
      handler: wrapHandler(
        map.BitcoinBroadcaster?.TransactionFeeDeficitRefused,
        bitcoinBroadcasterTransactionFeeDeficitRefused,
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
      name: 'Swapping.MinimumSwapAmountSet',
      handler: wrapHandler(map.Swapping?.MinimumSwapAmountSet, swappingMinimumSwapAmountSet),
    },
    {
      name: 'Swapping.SwapAmountTooLow',
      handler: wrapHandler(map.Swapping?.SwapAmountTooLow, swappingSwapAmountTooLow),
    },
    {
      name: 'Swapping.CcmFailed',
      handler: wrapHandler(map.Swapping?.CcmFailed, swappingCcmFailed),
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
      name: 'EthereumIngressEgress.EgressScheduled',
      handler: wrapHandler(
        map.EthereumIngressEgress?.EgressScheduled,
        ethereumIngressEgressEgressScheduled,
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
      name: 'EthereumIngressEgress.DepositFetchesScheduled',
      handler: wrapHandler(
        map.EthereumIngressEgress?.DepositFetchesScheduled,
        ethereumIngressEgressDepositFetchesScheduled,
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
      name: 'EthereumIngressEgress.VaultTransferFailed',
      handler: wrapHandler(
        map.EthereumIngressEgress?.VaultTransferFailed,
        ethereumIngressEgressVaultTransferFailed,
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
      name: 'PolkadotIngressEgress.DepositReceived',
      handler: wrapHandler(
        map.PolkadotIngressEgress?.DepositReceived,
        polkadotIngressEgressDepositReceived,
      ),
    },
    {
      name: 'PolkadotIngressEgress.AssetEgressStatusChanged',
      handler: wrapHandler(
        map.PolkadotIngressEgress?.AssetEgressStatusChanged,
        polkadotIngressEgressAssetEgressStatusChanged,
      ),
    },
    {
      name: 'PolkadotIngressEgress.EgressScheduled',
      handler: wrapHandler(
        map.PolkadotIngressEgress?.EgressScheduled,
        polkadotIngressEgressEgressScheduled,
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
      name: 'PolkadotIngressEgress.DepositFetchesScheduled',
      handler: wrapHandler(
        map.PolkadotIngressEgress?.DepositFetchesScheduled,
        polkadotIngressEgressDepositFetchesScheduled,
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
      name: 'PolkadotIngressEgress.MinimumDepositSet',
      handler: wrapHandler(
        map.PolkadotIngressEgress?.MinimumDepositSet,
        polkadotIngressEgressMinimumDepositSet,
      ),
    },
    {
      name: 'PolkadotIngressEgress.DepositIgnored',
      handler: wrapHandler(
        map.PolkadotIngressEgress?.DepositIgnored,
        polkadotIngressEgressDepositIgnored,
      ),
    },
    {
      name: 'PolkadotIngressEgress.VaultTransferFailed',
      handler: wrapHandler(
        map.PolkadotIngressEgress?.VaultTransferFailed,
        polkadotIngressEgressVaultTransferFailed,
      ),
    },
    {
      name: 'PolkadotIngressEgress.DepositWitnessRejected',
      handler: wrapHandler(
        map.PolkadotIngressEgress?.DepositWitnessRejected,
        polkadotIngressEgressDepositWitnessRejected,
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
      name: 'BitcoinIngressEgress.AssetEgressStatusChanged',
      handler: wrapHandler(
        map.BitcoinIngressEgress?.AssetEgressStatusChanged,
        bitcoinIngressEgressAssetEgressStatusChanged,
      ),
    },
    {
      name: 'BitcoinIngressEgress.EgressScheduled',
      handler: wrapHandler(
        map.BitcoinIngressEgress?.EgressScheduled,
        bitcoinIngressEgressEgressScheduled,
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
      name: 'BitcoinIngressEgress.DepositFetchesScheduled',
      handler: wrapHandler(
        map.BitcoinIngressEgress?.DepositFetchesScheduled,
        bitcoinIngressEgressDepositFetchesScheduled,
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
      name: 'BitcoinIngressEgress.MinimumDepositSet',
      handler: wrapHandler(
        map.BitcoinIngressEgress?.MinimumDepositSet,
        bitcoinIngressEgressMinimumDepositSet,
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
      name: 'BitcoinIngressEgress.VaultTransferFailed',
      handler: wrapHandler(
        map.BitcoinIngressEgress?.VaultTransferFailed,
        bitcoinIngressEgressVaultTransferFailed,
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
      name: 'LiquidityPools.UpdatedBuyInterval',
      handler: wrapHandler(
        map.LiquidityPools?.UpdatedBuyInterval,
        liquidityPoolsUpdatedBuyInterval,
      ),
    },
    {
      name: 'LiquidityPools.PoolStateUpdated',
      handler: wrapHandler(map.LiquidityPools?.PoolStateUpdated, liquidityPoolsPoolStateUpdated),
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
      name: 'LiquidityPools.NetworkFeeTaken',
      handler: wrapHandler(map.LiquidityPools?.NetworkFeeTaken, liquidityPoolsNetworkFeeTaken),
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
