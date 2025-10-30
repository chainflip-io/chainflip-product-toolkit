BitcoinBroadcaster:
  - BroadcastSuccess:
    - transactionRef: added (BitcoinBroadcaster.BroadcastSuccess.transactionRef)
    - transactionOutId: removed (BitcoinBroadcaster.BroadcastSuccess.transactionOutId.length)
  - TransactionBroadcastRequest:
    - transactionOutId: removed (BitcoinBroadcaster.TransactionBroadcastRequest.transactionOutId.length)

BitcoinChainTracking:
  - FeeMultiplierUpdated: added

BitcoinIngressEgress:
  - ChannelOpeningFeePaid: added
  - ChannelOpeningFeeSet: added
  - DepositIgnored:
    - depositDetails: removed (BitcoinIngressEgress.DepositIgnored.depositDetails.txId.length)
  - DepositReceived:
    - depositDetails: removed (BitcoinIngressEgress.DepositReceived.depositDetails.txId.length)
  - DepositWitnessRejected:
    - depositWitness: removed (BitcoinIngressEgress.DepositWitnessRejected.depositWitness.depositDetails.txId.length)
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
    - 0: added (Environment.AddedNewEthAsset.0.3)
  - RuntimeSafeModeUpdated:
    - safeMode: added (Environment.RuntimeSafeModeUpdated.safeMode.2.thresholdSignatureEthereum)
  - UpdatedEthAsset:
    - 0: added (Environment.UpdatedEthAsset.0.3)

EthereumBroadcaster:
  - BroadcastSuccess:
    - transactionRef: added (EthereumBroadcaster.BroadcastSuccess.transactionRef)

EthereumChainTracking:
  - FeeMultiplierUpdated: added

EthereumIngressEgress:
  - AssetEgressStatusChanged:
    - asset: added (EthereumIngressEgress.AssetEgressStatusChanged.asset.3)
  - ChannelOpeningFeePaid: added
  - ChannelOpeningFeeSet: added
  - DepositFetchesScheduled:
    - asset: added (EthereumIngressEgress.DepositFetchesScheduled.asset.3)
  - DepositIgnored:
    - asset: added (EthereumIngressEgress.DepositIgnored.asset.3)
  - DepositReceived:
    - asset: added (EthereumIngressEgress.DepositReceived.asset.3)
  - DepositWitnessRejected:
    - depositWitness: added (EthereumIngressEgress.DepositWitnessRejected.depositWitness.asset.3)
  - FailedToBuildAllBatchCall: added
  - MinimumDepositSet:
    - asset: added (EthereumIngressEgress.MinimumDepositSet.asset.3)
  - TransferFallbackRequested:
    - asset: added (EthereumIngressEgress.TransferFallbackRequested.asset.3)

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
    - from: added (LiquidityPools.AssetSwapped.from.6)
    - to: added (LiquidityPools.AssetSwapped.to.6)
  - LimitOrderUpdated:
    - baseAsset: added (LiquidityPools.LimitOrderUpdated.baseAsset.6)
    - quoteAsset: added (LiquidityPools.LimitOrderUpdated.quoteAsset.6)
  - NewPoolCreated:
    - baseAsset: added (LiquidityPools.NewPoolCreated.baseAsset.6)
    - quoteAsset: added (LiquidityPools.NewPoolCreated.quoteAsset.6)
  - PoolFeeSet:
    - baseAsset: added (LiquidityPools.PoolFeeSet.baseAsset.6)
    - quoteAsset: added (LiquidityPools.PoolFeeSet.quoteAsset.6)
  - RangeOrderUpdated:
    - baseAsset: added (LiquidityPools.RangeOrderUpdated.baseAsset.6)
    - quoteAsset: added (LiquidityPools.RangeOrderUpdated.quoteAsset.6)

LiquidityProvider:
  - AccountCredited:
    - asset: added (LiquidityProvider.AccountCredited.asset.6)
  - AccountDebited:
    - asset: added (LiquidityProvider.AccountDebited.asset.6)
  - LiquidityDepositAddressReady:
    - boostFee: added (LiquidityProvider.LiquidityDepositAddressReady.boostFee)
    - channelOpeningFee: added (LiquidityProvider.LiquidityDepositAddressReady.channelOpeningFee)
    - asset: added (LiquidityProvider.LiquidityDepositAddressReady.asset.6)
  - LiquidityDepositCredited:
    - asset: added (LiquidityProvider.LiquidityDepositCredited.asset.6)
  - WithdrawalEgressScheduled:
    - asset: added (LiquidityProvider.WithdrawalEgressScheduled.asset.6)

PolkadotBroadcaster:
  - BroadcastSuccess:
    - transactionRef: added (PolkadotBroadcaster.BroadcastSuccess.transactionRef)

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
    - offence: added (Reputation.OffencePenalty.offence.7)
  - PenaltyUpdated:
    - offence: added (Reputation.PenaltyUpdated.offence.7)

Swapping:
  - BatchSwapFailed:
    - asset: added (Swapping.BatchSwapFailed.asset.6)
  - CcmFailed:
    - origin: added (Swapping.CcmFailed.origin)
  - MaximumSwapAmountSet:
    - asset: added (Swapping.MaximumSwapAmountSet.asset.6)
  - SwapAmountConfiscated:
    - sourceAsset: added (Swapping.SwapAmountConfiscated.sourceAsset.6)
    - destinationAsset: added (Swapping.SwapAmountConfiscated.destinationAsset.6)
  - SwapDepositAddressReady:
    - boostFee: added (Swapping.SwapDepositAddressReady.boostFee)
    - channelOpeningFee: added (Swapping.SwapDepositAddressReady.channelOpeningFee)
    - sourceAsset: added (Swapping.SwapDepositAddressReady.sourceAsset.6)
    - destinationAsset: added (Swapping.SwapDepositAddressReady.destinationAsset.6)
  - SwapEgressIgnored:
    - asset: added (Swapping.SwapEgressIgnored.asset.6)
  - SwapEgressScheduled:
    - asset: added (Swapping.SwapEgressScheduled.asset.6)
  - SwapExecuted:
    - sourceAsset: added (Swapping.SwapExecuted.sourceAsset.6)
    - destinationAsset: added (Swapping.SwapExecuted.destinationAsset.6)
  - SwapScheduled:
    - executeAt: added (Swapping.SwapScheduled.executeAt)
    - sourceAsset: added (Swapping.SwapScheduled.sourceAsset.6)
    - destinationAsset: added (Swapping.SwapScheduled.destinationAsset.6)
    - swapType: added (Swapping.SwapScheduled.swapType.3)
  - WithdrawalRequested:
    - egressAsset: added (Swapping.WithdrawalRequested.egressAsset)

System:
  - UpgradeAuthorized: added

Witnesser:
  - PrewitnessExecutionFailed: added
