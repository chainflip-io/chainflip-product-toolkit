New or removed pallets:
  SolanaElections: added

ArbitrumIngressEgress:
  - CcmEgressInvalid:
    - error: removed (ArbitrumIngressEgress.CcmEgressInvalid.error.3)
  - DepositBoosted:
    - action: added (ArbitrumIngressEgress.DepositBoosted.action.0.swapRequestId)
  - DepositFinalised:
    - action: added (ArbitrumIngressEgress.DepositFinalised.action.0.swapRequestId)
  - MaxSwapRetryDurationSet: removed

AssetBalances:
  - AccountCredited: added
  - AccountDebited: added

BitcoinIngressEgress:
  - CcmEgressInvalid:
    - error: removed (BitcoinIngressEgress.CcmEgressInvalid.error.3)
  - DepositBoosted:
    - action: added (BitcoinIngressEgress.DepositBoosted.action.0.swapRequestId)
  - DepositFinalised:
    - action: added (BitcoinIngressEgress.DepositFinalised.action.0.swapRequestId)
  - MaxSwapRetryDurationSet: removed

Environment:
  - DurableNonceSetForAccount: added
  - RuntimeSafeModeUpdated:
    - safeMode: removed (Environment.RuntimeSafeModeUpdated.safeMode.2.witnesser.2.solanaChainTracking)
  - SolanaInitialized: added

EthereumIngressEgress:
  - CcmEgressInvalid:
    - error: removed (EthereumIngressEgress.CcmEgressInvalid.error.3)
  - DepositBoosted:
    - action: added (EthereumIngressEgress.DepositBoosted.action.0.swapRequestId)
  - DepositFinalised:
    - action: added (EthereumIngressEgress.DepositFinalised.action.0.swapRequestId)
  - MaxSwapRetryDurationSet: removed

LiquidityPools:
  - AssetSwapped:
    - from: added (LiquidityPools.AssetSwapped.from.10)
    - to: added (LiquidityPools.AssetSwapped.to.10)
  - LimitOrderUpdated:
    - baseAsset: added (LiquidityPools.LimitOrderUpdated.baseAsset.10)
    - quoteAsset: added (LiquidityPools.LimitOrderUpdated.quoteAsset.10)
  - NewPoolCreated:
    - baseAsset: added (LiquidityPools.NewPoolCreated.baseAsset.10)
    - quoteAsset: added (LiquidityPools.NewPoolCreated.quoteAsset.10)
  - OrderDeletionFailed: added
  - PoolFeeSet:
    - baseAsset: added (LiquidityPools.PoolFeeSet.baseAsset.10)
    - quoteAsset: added (LiquidityPools.PoolFeeSet.quoteAsset.10)
  - PriceImpactLimitSet:
    - assetPair: added (LiquidityPools.PriceImpactLimitSet.assetPair.assets.base.10)
  - RangeOrderUpdated:
    - baseAsset: added (LiquidityPools.RangeOrderUpdated.baseAsset.10)
    - quoteAsset: added (LiquidityPools.RangeOrderUpdated.quoteAsset.10)

LiquidityProvider:
  - AccountCredited: removed
  - AccountDebited: removed
  - AssetTransferred:
    - asset: added (LiquidityProvider.AssetTransferred.asset.10)
  - LiquidityDepositAddressReady:
    - asset: added (LiquidityProvider.LiquidityDepositAddressReady.asset.10)
  - LiquidityDepositCredited: removed
  - WithdrawalEgressScheduled:
    - asset: added (LiquidityProvider.WithdrawalEgressScheduled.asset.10)

PolkadotIngressEgress:
  - CcmEgressInvalid:
    - error: removed (PolkadotIngressEgress.CcmEgressInvalid.error.3)
  - DepositBoosted:
    - action: added (PolkadotIngressEgress.DepositBoosted.action.0.swapRequestId)
  - DepositFinalised:
    - action: added (PolkadotIngressEgress.DepositFinalised.action.0.swapRequestId)
  - MaxSwapRetryDurationSet: removed

SolanaBroadcaster:
  - BroadcastSuccess:
    - transactionRef: changed (SolanaBroadcaster.BroadcastSuccess.transactionRef.length)
  - TransactionBroadcastRequest:
    - transactionPayload: added (SolanaBroadcaster.TransactionBroadcastRequest.transactionPayload)
  - TransactionFeeDeficitRecorded:
    - amount: changed (SolanaBroadcaster.TransactionFeeDeficitRecorded.amount)

SolanaChainTracking:
  - ChainStateUpdated:
    - newChainState: changed (SolanaChainTracking.ChainStateUpdated.newChainState.trackedData.priorityFee)

SolanaIngressEgress:
  - AssetEgressStatusChanged:
    - asset: added (SolanaIngressEgress.AssetEgressStatusChanged.asset.1)
  - BoostFundsAdded:
    - boostPool: added (SolanaIngressEgress.BoostFundsAdded.boostPool.asset.1)
    - amount: changed (SolanaIngressEgress.BoostFundsAdded.amount)
  - BoostPoolCreated:
    - boostPool: added (SolanaIngressEgress.BoostPoolCreated.boostPool.asset.1)
  - CcmEgressInvalid:
    - error: removed (SolanaIngressEgress.CcmEgressInvalid.error.3)
  - DepositBoosted:
    - asset: added (SolanaIngressEgress.DepositBoosted.asset.1)
    - amounts: changed (SolanaIngressEgress.DepositBoosted.amounts)
    - ingressFee: changed (SolanaIngressEgress.DepositBoosted.ingressFee)
    - boostFee: changed (SolanaIngressEgress.DepositBoosted.boostFee)
    - action: added (SolanaIngressEgress.DepositBoosted.action.0.swapRequestId)
  - DepositFetchesScheduled:
    - asset: added (SolanaIngressEgress.DepositFetchesScheduled.asset.1)
  - DepositFinalised:
    - asset: added (SolanaIngressEgress.DepositFinalised.asset.1)
    - amount: changed (SolanaIngressEgress.DepositFinalised.amount)
    - ingressFee: changed (SolanaIngressEgress.DepositFinalised.ingressFee)
    - action: added (SolanaIngressEgress.DepositFinalised.action.0.swapRequestId)
  - DepositIgnored:
    - asset: added (SolanaIngressEgress.DepositIgnored.asset.1)
    - amount: changed (SolanaIngressEgress.DepositIgnored.amount)
  - DepositWitnessRejected:
    - depositWitness: added (SolanaIngressEgress.DepositWitnessRejected.depositWitness.asset.1)
  - InsufficientBoostLiquidity:
    - asset: added (SolanaIngressEgress.InsufficientBoostLiquidity.asset.1)
    - amountAttempted: changed (SolanaIngressEgress.InsufficientBoostLiquidity.amountAttempted)
  - MaxSwapRetryDurationSet: removed
  - MinimumDepositSet:
    - asset: added (SolanaIngressEgress.MinimumDepositSet.asset.1)
    - minimumDeposit: changed (SolanaIngressEgress.MinimumDepositSet.minimumDeposit)
  - StoppedBoosting:
    - boostPool: added (SolanaIngressEgress.StoppedBoosting.boostPool.asset.1)
    - unlockedAmount: changed (SolanaIngressEgress.StoppedBoosting.unlockedAmount)
  - TransferFallbackRequested:
    - asset: added (SolanaIngressEgress.TransferFallbackRequested.asset.1)
    - amount: changed (SolanaIngressEgress.TransferFallbackRequested.amount)

SolanaThresholdSigner:
  - ThresholdSignatureRequest:
    - payload: added (SolanaThresholdSigner.ThresholdSignatureRequest.payload)

Swapping:
  - BatchSwapFailed:
    - asset: added (Swapping.BatchSwapFailed.asset.10)
  - CcmDepositReceived: removed
  - CcmEgressScheduled: removed
  - CcmFailed:
    - depositMetadata: added (Swapping.CcmFailed.depositMetadata.sourceAddress.0.length)
    - origin: added (Swapping.CcmFailed.origin.2)
  - MaxSwapRequestDurationSet: added
  - MaxSwapRetryDurationSet: added
  - MaximumSwapAmountSet:
    - asset: added (Swapping.MaximumSwapAmountSet.asset.10)
  - NetworkFeeTaken: removed
  - RefundEgressIgnored:
    - swapRequestId: added (Swapping.RefundEgressIgnored.swapRequestId)
    - swapId: removed (Swapping.RefundEgressIgnored.swapId)
    - asset: added (Swapping.RefundEgressIgnored.asset.10)
  - RefundEgressScheduled:
    - swapRequestId: added (Swapping.RefundEgressScheduled.swapRequestId)
    - swapId: removed (Swapping.RefundEgressScheduled.swapId)
    - asset: added (Swapping.RefundEgressScheduled.asset.10)
  - SwapAmountConfiscated:
    - swapRequestId: added (Swapping.SwapAmountConfiscated.swapRequestId)
    - asset: added (Swapping.SwapAmountConfiscated.asset)
    - swapId: removed (Swapping.SwapAmountConfiscated.swapId)
    - sourceAsset: removed (Swapping.SwapAmountConfiscated.sourceAsset)
    - destinationAsset: removed (Swapping.SwapAmountConfiscated.destinationAsset)
  - SwapDepositAddressReady:
    - dcaParameters: added (Swapping.SwapDepositAddressReady.dcaParameters)
    - sourceAsset: added (Swapping.SwapDepositAddressReady.sourceAsset.10)
    - destinationAsset: added (Swapping.SwapDepositAddressReady.destinationAsset.10)
  - SwapEgressIgnored:
    - swapRequestId: added (Swapping.SwapEgressIgnored.swapRequestId)
    - swapId: removed (Swapping.SwapEgressIgnored.swapId)
    - asset: added (Swapping.SwapEgressIgnored.asset.10)
  - SwapEgressScheduled:
    - swapRequestId: added (Swapping.SwapEgressScheduled.swapRequestId)
    - egressFee: added (Swapping.SwapEgressScheduled.egressFee)
    - swapId: removed (Swapping.SwapEgressScheduled.swapId)
    - fee: removed (Swapping.SwapEgressScheduled.fee)
    - asset: added (Swapping.SwapEgressScheduled.asset.10)
  - SwapExecuted:
    - swapRequestId: added (Swapping.SwapExecuted.swapRequestId)
    - inputAsset: added (Swapping.SwapExecuted.inputAsset)
    - outputAsset: added (Swapping.SwapExecuted.outputAsset)
    - inputAmount: added (Swapping.SwapExecuted.inputAmount)
    - networkFee: added (Swapping.SwapExecuted.networkFee)
    - brokerFee: added (Swapping.SwapExecuted.brokerFee)
    - outputAmount: added (Swapping.SwapExecuted.outputAmount)
    - sourceAsset: removed (Swapping.SwapExecuted.sourceAsset)
    - depositAmount: removed (Swapping.SwapExecuted.depositAmount)
    - swapInput: removed (Swapping.SwapExecuted.swapInput)
    - destinationAsset: removed (Swapping.SwapExecuted.destinationAsset)
    - egressAmount: removed (Swapping.SwapExecuted.egressAmount)
    - swapOutput: removed (Swapping.SwapExecuted.swapOutput)
    - swapType: removed (Swapping.SwapExecuted.swapType)
  - SwapRequestCompleted: added
  - SwapRequested: added
  - SwapScheduled:
    - swapRequestId: added (Swapping.SwapScheduled.swapRequestId)
    - inputAmount: added (Swapping.SwapScheduled.inputAmount)
    - sourceAsset: removed (Swapping.SwapScheduled.sourceAsset)
    - depositAmount: removed (Swapping.SwapScheduled.depositAmount)
    - destinationAsset: removed (Swapping.SwapScheduled.destinationAsset)
    - destinationAddress: removed (Swapping.SwapScheduled.destinationAddress)
    - origin: removed (Swapping.SwapScheduled.origin)
    - brokerCommission: removed (Swapping.SwapScheduled.brokerCommission)
    - brokerFee: removed (Swapping.SwapScheduled.brokerFee)
    - swapType: added (Swapping.SwapScheduled.swapType.0)
  - WithdrawalRequested:
    - egressAsset: added (Swapping.WithdrawalRequested.egressAsset.10)
