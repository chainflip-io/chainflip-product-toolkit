New or removed pallets:
  SolanaChainTracking: removed
  SolanaElections: added
ArbitrumIngressEgress:
  - CcmEgressInvalid:
    - error: changed
  - DepositBoosted:
    - action: added
  - DepositFinalised:
    - action: added
  - MaxSwapRetryDurationSet: removed

AssetBalances:
  - AccountCredited: added
  - AccountDebited: added

BitcoinIngressEgress:
  - CcmEgressInvalid:
    - error: changed
  - DepositBoosted:
    - action: added
  - DepositFinalised:
    - action: added
  - MaxSwapRetryDurationSet: removed

Environment:
  - DurableNonceSetForAccount: added
  - RuntimeSafeModeUpdated:
    - safeMode: removed
  - SolanaInitialized: added

EthereumIngressEgress:
  - CcmEgressInvalid:
    - error: changed
  - DepositBoosted:
    - action: added
  - DepositFinalised:
    - action: added
  - MaxSwapRetryDurationSet: removed

LiquidityPools:
  - AssetSwapped:
    - from: added
    - to: added
  - LimitOrderUpdated:
    - baseAsset: added
    - quoteAsset: added
  - NewPoolCreated:
    - baseAsset: added
    - quoteAsset: added
  - OrderDeletionFailed: added
  - PoolFeeSet:
    - baseAsset: added
    - quoteAsset: added
  - PriceImpactLimitSet:
    - assetPair: added
  - RangeOrderUpdated:
    - baseAsset: added
    - quoteAsset: added

LiquidityProvider:
  - AccountCredited: removed
  - AccountDebited: removed
  - AssetTransferred:
    - asset: added
  - LiquidityDepositAddressReady:
    - asset: added
  - LiquidityDepositCredited: removed
  - WithdrawalEgressScheduled:
    - asset: added

PolkadotIngressEgress:
  - CcmEgressInvalid:
    - error: changed
  - DepositBoosted:
    - action: added
  - DepositFinalised:
    - action: added
  - MaxSwapRetryDurationSet: removed

SolanaBroadcaster:
  - BroadcastSuccess:
    - transactionRef: changed
  - TransactionBroadcastRequest:
    - transactionPayload: added
  - TransactionFeeDeficitRecorded:
    - amount: changed

SolanaIngressEgress:
  - AssetEgressStatusChanged:
    - asset: added
  - BoostFundsAdded:
    - boostPool: added
    - amount: changed
  - BoostPoolCreated:
    - boostPool: added
  - CcmEgressInvalid:
    - error: changed
  - DepositBoosted:
    - asset: added
    - amounts: changed
    - ingressFee: changed
    - boostFee: changed
    - action: added
  - DepositFetchesScheduled:
    - asset: added
  - DepositFinalised:
    - asset: added
    - amount: changed
    - ingressFee: changed
    - action: added
  - DepositIgnored:
    - asset: added
    - amount: changed
  - DepositWitnessRejected:
    - depositWitness: added
  - InsufficientBoostLiquidity:
    - asset: added
    - amountAttempted: changed
  - MaxSwapRetryDurationSet: removed
  - MinimumDepositSet:
    - asset: added
    - minimumDeposit: changed
  - StoppedBoosting:
    - boostPool: added
    - unlockedAmount: changed
  - TransferFallbackRequested:
    - asset: added
    - amount: changed

SolanaThresholdSigner:
  - ThresholdSignatureRequest:
    - payload: added

Swapping:
  - BatchSwapFailed:
    - asset: added
  - CcmDepositReceived: removed
  - CcmEgressScheduled: removed
  - CcmFailed:
    - depositMetadata: changed
    - origin: added
  - MaxSwapRequestDurationSet: added
  - MaxSwapRetryDurationSet: added
  - MaximumSwapAmountSet:
    - asset: added
  - NetworkFeeTaken: removed
  - RefundEgressIgnored:
    - swapRequestId: added
    - swapId: removed
    - asset: added
  - RefundEgressScheduled:
    - swapRequestId: added
    - swapId: removed
    - asset: added
  - SwapAmountConfiscated:
    - swapRequestId: added
    - asset: added
    - swapId: removed
    - sourceAsset: removed
    - destinationAsset: removed
  - SwapDepositAddressReady:
    - dcaParameters: added
    - sourceAsset: added
    - destinationAsset: added
    - refundParameters: changed
  - SwapEgressIgnored:
    - swapRequestId: added
    - swapId: removed
    - asset: added
  - SwapEgressScheduled:
    - swapRequestId: added
    - egressFee: added
    - swapId: removed
    - fee: removed
    - asset: added
  - SwapExecuted:
    - swapRequestId: added
    - inputAsset: added
    - outputAsset: added
    - inputAmount: added
    - networkFee: added
    - brokerFee: added
    - outputAmount: added
    - sourceAsset: removed
    - depositAmount: removed
    - swapInput: removed
    - destinationAsset: removed
    - egressAmount: removed
    - swapOutput: removed
    - swapType: removed
  - SwapRequestCompleted: added
  - SwapRequested: added
  - SwapScheduled:
    - swapRequestId: added
    - inputAmount: added
    - sourceAsset: removed
    - depositAmount: removed
    - destinationAsset: removed
    - destinationAddress: removed
    - origin: removed
    - brokerCommission: removed
    - brokerFee: removed
    - swapType: changed
  - WithdrawalRequested:
    - egressAsset: added
