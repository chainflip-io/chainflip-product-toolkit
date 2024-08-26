BitcoinBroadcaster:
  - BroadcastSuccess:
    - transactionRef: added
    - transactionOutId: added
  - TransactionBroadcastRequest:
    - transactionOutId: added

BitcoinChainTracking:
  - FeeMultiplierUpdated: added

BitcoinIngressEgress:
  - ChannelOpeningFeePaid: added
  - ChannelOpeningFeeSet: added
  - DepositIgnored:
    - depositDetails: added
  - DepositReceived:
    - depositDetails: added
  - DepositWitnessRejected:
    - depositWitness: added
  - FailedToBuildAllBatchCall: added

BitcoinThresholdSigner:
  - KeyHandoverFailure: added
  - KeyHandoverFailureReported: added
  - KeyHandoverRequest: added
  - KeyHandoverResponseTimeout: added
  - KeyHandoverSuccess: added
  - KeyHandoverSuccessReported: added
  - KeyHandoverVerificationFailure: added
  - KeyHandoverVerificationSuccess: added
  - KeyRotationCompleted: added
  - KeygenFailure: added
  - KeygenFailureReported: added
  - KeygenRequest: added
  - KeygenResponseTimeout: added
  - KeygenResponseTimeoutUpdated: added
  - KeygenSuccess: added
  - KeygenSuccessReported: added
  - KeygenVerificationFailure: added
  - KeygenVerificationSuccess: added
  - NoKeyHandover: added

BitcoinVault:
  - KeyHandoverFailure: removed
  - KeyHandoverFailureReported: removed
  - KeyHandoverRequest: removed
  - KeyHandoverResponseTimeout: removed
  - KeyHandoverSuccess: removed
  - KeyHandoverSuccessReported: removed
  - KeyHandoverVerificationFailure: removed
  - KeyHandoverVerificationSuccess: removed
  - KeygenFailure: removed
  - KeygenFailureReported: removed
  - KeygenRequest: removed
  - KeygenResponseTimeout: removed
  - KeygenResponseTimeoutUpdated: removed
  - KeygenSuccess: removed
  - KeygenSuccessReported: removed
  - KeygenVerificationFailure: removed
  - KeygenVerificationSuccess: removed
  - NoKeyHandover: removed
  - VaultActivationCompleted: added
  - VaultRotationAborted: removed
  - VaultRotationCompleted: removed

Environment:
  - AddedNewEthAsset:
    - 0: added
  - RuntimeSafeModeUpdated:
    - safeMode: added
  - UpdatedEthAsset:
    - 0: added

EthereumBroadcaster:
  - BroadcastSuccess:
    - transactionRef: added

EthereumChainTracking:
  - FeeMultiplierUpdated: added

EthereumIngressEgress:
  - AssetEgressStatusChanged:
    - asset: added
  - ChannelOpeningFeePaid: added
  - ChannelOpeningFeeSet: added
  - DepositFetchesScheduled:
    - asset: added
  - DepositIgnored:
    - asset: added
  - DepositReceived:
    - asset: added
  - DepositWitnessRejected:
    - depositWitness: added
  - FailedToBuildAllBatchCall: added
  - MinimumDepositSet:
    - asset: added
  - TransferFallbackRequested:
    - asset: added

EthereumThresholdSigner:
  - KeyHandoverFailure: added
  - KeyHandoverFailureReported: added
  - KeyHandoverRequest: added
  - KeyHandoverResponseTimeout: added
  - KeyHandoverSuccess: added
  - KeyHandoverSuccessReported: added
  - KeyHandoverVerificationFailure: added
  - KeyHandoverVerificationSuccess: added
  - KeyRotationCompleted: added
  - KeygenFailure: added
  - KeygenFailureReported: added
  - KeygenRequest: added
  - KeygenResponseTimeout: added
  - KeygenResponseTimeoutUpdated: added
  - KeygenSuccess: added
  - KeygenSuccessReported: added
  - KeygenVerificationFailure: added
  - KeygenVerificationSuccess: added
  - NoKeyHandover: added

EthereumVault:
  - KeyHandoverFailure: removed
  - KeyHandoverFailureReported: removed
  - KeyHandoverRequest: removed
  - KeyHandoverResponseTimeout: removed
  - KeyHandoverSuccess: removed
  - KeyHandoverSuccessReported: removed
  - KeyHandoverVerificationFailure: removed
  - KeyHandoverVerificationSuccess: removed
  - KeygenFailure: removed
  - KeygenFailureReported: removed
  - KeygenRequest: removed
  - KeygenResponseTimeout: removed
  - KeygenResponseTimeoutUpdated: removed
  - KeygenSuccess: removed
  - KeygenSuccessReported: removed
  - KeygenVerificationFailure: removed
  - KeygenVerificationSuccess: removed
  - NoKeyHandover: removed
  - VaultActivationCompleted: added
  - VaultRotationAborted: removed
  - VaultRotationCompleted: removed

LiquidityPools:
  - AssetSwapped:
    - from: added
    - to: added
  - LimitOrderUpdated:
    - baseAsset: added
    - quoteAsset: added
    - side: changed
  - NewPoolCreated:
    - baseAsset: added
    - quoteAsset: added
  - PoolFeeSet:
    - baseAsset: added
    - quoteAsset: added
  - RangeOrderUpdated:
    - baseAsset: added
    - quoteAsset: added
    - sizeChange: changed
    - collectedFees: changed

LiquidityProvider:
  - AccountCredited:
    - asset: added
  - AccountDebited:
    - asset: added
  - LiquidityDepositAddressReady:
    - boostFee: added
    - channelOpeningFee: added
    - asset: added
  - LiquidityDepositCredited:
    - asset: added
  - WithdrawalEgressScheduled:
    - asset: added

PolkadotBroadcaster:
  - BroadcastSuccess:
    - transactionRef: added

PolkadotChainTracking:
  - FeeMultiplierUpdated: added

PolkadotIngressEgress:
  - ChannelOpeningFeePaid: added
  - ChannelOpeningFeeSet: added
  - FailedToBuildAllBatchCall: added

PolkadotThresholdSigner:
  - KeyHandoverFailure: added
  - KeyHandoverFailureReported: added
  - KeyHandoverRequest: added
  - KeyHandoverResponseTimeout: added
  - KeyHandoverSuccess: added
  - KeyHandoverSuccessReported: added
  - KeyHandoverVerificationFailure: added
  - KeyHandoverVerificationSuccess: added
  - KeyRotationCompleted: added
  - KeygenFailure: added
  - KeygenFailureReported: added
  - KeygenRequest: added
  - KeygenResponseTimeout: added
  - KeygenResponseTimeoutUpdated: added
  - KeygenSuccess: added
  - KeygenSuccessReported: added
  - KeygenVerificationFailure: added
  - KeygenVerificationSuccess: added
  - NoKeyHandover: added

PolkadotVault:
  - KeyHandoverFailure: removed
  - KeyHandoverFailureReported: removed
  - KeyHandoverRequest: removed
  - KeyHandoverResponseTimeout: removed
  - KeyHandoverSuccess: removed
  - KeyHandoverSuccessReported: removed
  - KeyHandoverVerificationFailure: removed
  - KeyHandoverVerificationSuccess: removed
  - KeygenFailure: removed
  - KeygenFailureReported: removed
  - KeygenRequest: removed
  - KeygenResponseTimeout: removed
  - KeygenResponseTimeoutUpdated: removed
  - KeygenSuccess: removed
  - KeygenSuccessReported: removed
  - KeygenVerificationFailure: removed
  - KeygenVerificationSuccess: removed
  - NoKeyHandover: removed
  - VaultActivationCompleted: added
  - VaultRotationAborted: removed
  - VaultRotationCompleted: removed

Reputation:
  - OffencePenalty:
    - offence: added
  - PenaltyUpdated:
    - offence: added

Swapping:
  - BatchSwapFailed:
    - asset: added
  - CcmFailed:
    - origin: added
  - MaximumSwapAmountSet:
    - asset: added
  - SwapAmountConfiscated:
    - sourceAsset: added
    - destinationAsset: added
  - SwapDepositAddressReady:
    - boostFee: added
    - channelOpeningFee: added
    - sourceAsset: added
    - destinationAsset: added
  - SwapEgressIgnored:
    - asset: added
  - SwapEgressScheduled:
    - asset: added
  - SwapExecuted:
    - sourceAsset: added
    - destinationAsset: added
  - SwapScheduled:
    - executeAt: added
    - sourceAsset: added
    - destinationAsset: added
    - swapType: changed
  - WithdrawalRequested:
    - egressAsset: added

System:
  - UpgradeAuthorized: added

Witnesser:
  - PrewitnessExecutionFailed: added
