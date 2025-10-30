BitcoinBroadcaster:
  - CallResigned: added
  - ThresholdSignatureInvalid:
    - broadcastAttemptId: added (BitcoinBroadcaster.ThresholdSignatureInvalid.broadcastAttemptId)
    - broadcastId: removed (BitcoinBroadcaster.ThresholdSignatureInvalid.broadcastId)
    - retryBroadcastId: removed (BitcoinBroadcaster.ThresholdSignatureInvalid.retryBroadcastId)

BitcoinIngressEgress:
  - CcmBroadcastFailed: added
  - FailedForeignChainCallExpired: added
  - FailedForeignChainCallResigned: added
  - TransferFallbackRequested: added
  - VaultTransferFailed: removed

BitcoinThresholdSigner:
  - CurrentKeyUnavailable: removed

EthereumBroadcaster:
  - CallResigned: added
  - ThresholdSignatureInvalid:
    - broadcastAttemptId: added (EthereumBroadcaster.ThresholdSignatureInvalid.broadcastAttemptId)
    - broadcastId: removed (EthereumBroadcaster.ThresholdSignatureInvalid.broadcastId)
    - retryBroadcastId: removed (EthereumBroadcaster.ThresholdSignatureInvalid.retryBroadcastId)

EthereumIngressEgress:
  - CcmBroadcastFailed: added
  - FailedForeignChainCallExpired: added
  - FailedForeignChainCallResigned: added
  - TransferFallbackRequested: added
  - VaultTransferFailed: removed

EthereumThresholdSigner:
  - CurrentKeyUnavailable: removed

LiquidityPools:
  - LimitOrderSetOrUpdateScheduled: added
  - LimitOrderUpdated:
    - baseAsset: added (LiquidityPools.LimitOrderUpdated.baseAsset)
    - quoteAsset: added (LiquidityPools.LimitOrderUpdated.quoteAsset)
    - side: added (LiquidityPools.LimitOrderUpdated.side)
    - sellAmountChange: added (LiquidityPools.LimitOrderUpdated.sellAmountChange)
    - sellAmountTotal: added (LiquidityPools.LimitOrderUpdated.sellAmountTotal)
    - sellAsset: removed (LiquidityPools.LimitOrderUpdated.sellAsset)
    - buyAsset: removed (LiquidityPools.LimitOrderUpdated.buyAsset)
    - amountChange: removed (LiquidityPools.LimitOrderUpdated.amountChange)
    - amountTotal: removed (LiquidityPools.LimitOrderUpdated.amountTotal)
  - NewPoolCreated:
    - quoteAsset: added (LiquidityPools.NewPoolCreated.quoteAsset)
    - pairAsset: removed (LiquidityPools.NewPoolCreated.pairAsset)
  - PoolFeeSet:
    - quoteAsset: added (LiquidityPools.PoolFeeSet.quoteAsset)
    - pairAsset: removed (LiquidityPools.PoolFeeSet.pairAsset)
  - PoolStateUpdated: removed
  - RangeOrderUpdated:
    - quoteAsset: added (LiquidityPools.RangeOrderUpdated.quoteAsset)
    - pairAsset: removed (LiquidityPools.RangeOrderUpdated.pairAsset)
    - sizeChange: added (LiquidityPools.RangeOrderUpdated.sizeChange.0.amounts.quote)
    - collectedFees: added (LiquidityPools.RangeOrderUpdated.collectedFees.quote)
  - ScheduledLimitOrderUpdateDispatchFailure: added
  - ScheduledLimitOrderUpdateDispatchSuccess: added

PolkadotBroadcaster:
  - CallResigned: added
  - ThresholdSignatureInvalid:
    - broadcastAttemptId: added (PolkadotBroadcaster.ThresholdSignatureInvalid.broadcastAttemptId)
    - broadcastId: removed (PolkadotBroadcaster.ThresholdSignatureInvalid.broadcastId)
    - retryBroadcastId: removed (PolkadotBroadcaster.ThresholdSignatureInvalid.retryBroadcastId)

PolkadotIngressEgress:
  - CcmBroadcastFailed: added
  - FailedForeignChainCallExpired: added
  - FailedForeignChainCallResigned: added
  - TransferFallbackRequested: added
  - VaultTransferFailed: removed

PolkadotThresholdSigner:
  - CurrentKeyUnavailable: removed
