BitcoinBroadcaster:
  - BroadcastAttemptTimeout: removed
  - BroadcastRetryScheduled:
    - broadcastId: added
    - retryBlock: added
    - broadcastAttemptId: removed
  - BroadcastTimeout: added
  - ThresholdSignatureInvalid:
    - broadcastId: added
    - broadcastAttemptId: removed
  - TransactionBroadcastRequest:
    - broadcastId: added
    - broadcastAttemptId: removed

BitcoinChainTracking:
  - ChainStateUpdated:
    - newChainState: added

BitcoinIngressEgress:
  - DepositIgnored:
    - reason: added
  - DepositReceived:
    - ingressFee: added
    - action: added
  - EgressScheduled: removed
  - UtxoConsolidation: added

Emissions:
  - BackupRewardsDistributed: added
  - FlipBurnSkipped: added
  - NetworkFeeBurned: added

Environment:
  - UtxoConsolidationParametersUpdated: added

EthereumBroadcaster:
  - BroadcastAttemptTimeout: removed
  - BroadcastRetryScheduled:
    - broadcastId: added
    - retryBlock: added
    - broadcastAttemptId: removed
  - BroadcastTimeout: added
  - ThresholdSignatureInvalid:
    - broadcastId: added
    - broadcastAttemptId: removed
  - TransactionBroadcastRequest:
    - broadcastId: added
    - broadcastAttemptId: removed

EthereumIngressEgress:
  - DepositIgnored:
    - reason: added
  - DepositReceived:
    - ingressFee: added
    - action: added
  - EgressScheduled: removed
  - UtxoConsolidation: added

LiquidityProvider:
  - LiquidityDepositCredited: added
  - WithdrawalEgressScheduled:
    - fee: added

PolkadotBroadcaster:
  - BroadcastAttemptTimeout: removed
  - BroadcastRetryScheduled:
    - broadcastId: added
    - retryBlock: added
    - broadcastAttemptId: removed
  - BroadcastTimeout: added
  - ThresholdSignatureInvalid:
    - broadcastId: added
    - broadcastAttemptId: removed
  - TransactionBroadcastRequest:
    - broadcastId: added
    - broadcastAttemptId: removed

PolkadotIngressEgress:
  - DepositIgnored:
    - reason: added
  - DepositReceived:
    - ingressFee: added
    - action: added
  - EgressScheduled: removed
  - UtxoConsolidation: added

Swapping:
  - CcmFailed:
    - reason: removed
  - MinimumSwapAmountSet: removed
  - SwapAmountTooLow: removed
  - SwapEgressIgnored: added
  - SwapEgressScheduled:
    - fee: added
  - SwapExecuted:
    - swapInput: added
    - swapOutput: added
  - WithdrawalRequested:
    - egressFee: added
