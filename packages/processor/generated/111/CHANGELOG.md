BitcoinBroadcaster:
  - CallResigned: added
  - ThresholdSignatureInvalid:
    - broadcastAttemptId: added
    - broadcastId: removed
    - retryBroadcastId: removed

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
    - broadcastAttemptId: added
    - broadcastId: removed
    - retryBroadcastId: removed

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
    - baseAsset: added
    - quoteAsset: added
    - side: added
    - sellAmountChange: added
    - sellAmountTotal: added
    - sellAsset: removed
    - buyAsset: removed
    - amountChange: removed
    - amountTotal: removed
  - NewPoolCreated:
    - quoteAsset: added
    - pairAsset: removed
  - PoolFeeSet:
    - quoteAsset: added
    - pairAsset: removed
  - PoolStateUpdated: removed
  - RangeOrderUpdated:
    - quoteAsset: added
    - pairAsset: removed
    - sizeChange: added
    - collectedFees: added
  - ScheduledLimitOrderUpdateDispatchFailure: added
  - ScheduledLimitOrderUpdateDispatchSuccess: added

PolkadotBroadcaster:
  - CallResigned: added
  - ThresholdSignatureInvalid:
    - broadcastAttemptId: added
    - broadcastId: removed
    - retryBroadcastId: removed

PolkadotIngressEgress:
  - CcmBroadcastFailed: added
  - FailedForeignChainCallExpired: added
  - FailedForeignChainCallResigned: added
  - TransferFallbackRequested: added
  - VaultTransferFailed: removed

PolkadotThresholdSigner:
  - CurrentKeyUnavailable: removed
