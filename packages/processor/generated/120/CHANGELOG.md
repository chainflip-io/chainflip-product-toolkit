BitcoinBroadcaster:
  - BroadcastAttemptTimeout: removed
  - BroadcastRetryScheduled:
    - broadcastId: added (BitcoinBroadcaster.BroadcastRetryScheduled.broadcastId)
    - retryBlock: added (BitcoinBroadcaster.BroadcastRetryScheduled.retryBlock)
    - broadcastAttemptId: removed (BitcoinBroadcaster.BroadcastRetryScheduled.broadcastAttemptId)
  - BroadcastTimeout: added
  - ThresholdSignatureInvalid:
    - broadcastId: added (BitcoinBroadcaster.ThresholdSignatureInvalid.broadcastId)
    - broadcastAttemptId: removed (BitcoinBroadcaster.ThresholdSignatureInvalid.broadcastAttemptId)
  - TransactionBroadcastRequest:
    - broadcastId: added (BitcoinBroadcaster.TransactionBroadcastRequest.broadcastId)
    - broadcastAttemptId: removed (BitcoinBroadcaster.TransactionBroadcastRequest.broadcastAttemptId)

BitcoinChainTracking:
  - ChainStateUpdated:
    - newChainState: added (BitcoinChainTracking.ChainStateUpdated.newChainState.trackedData.btcFeeInfo.satsPerKilobyte)

BitcoinIngressEgress:
  - DepositIgnored:
    - reason: added (BitcoinIngressEgress.DepositIgnored.reason)
  - DepositReceived:
    - ingressFee: added (BitcoinIngressEgress.DepositReceived.ingressFee)
    - action: added (BitcoinIngressEgress.DepositReceived.action)
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
    - broadcastId: added (EthereumBroadcaster.BroadcastRetryScheduled.broadcastId)
    - retryBlock: added (EthereumBroadcaster.BroadcastRetryScheduled.retryBlock)
    - broadcastAttemptId: removed (EthereumBroadcaster.BroadcastRetryScheduled.broadcastAttemptId)
  - BroadcastTimeout: added
  - ThresholdSignatureInvalid:
    - broadcastId: added (EthereumBroadcaster.ThresholdSignatureInvalid.broadcastId)
    - broadcastAttemptId: removed (EthereumBroadcaster.ThresholdSignatureInvalid.broadcastAttemptId)
  - TransactionBroadcastRequest:
    - broadcastId: added (EthereumBroadcaster.TransactionBroadcastRequest.broadcastId)
    - broadcastAttemptId: removed (EthereumBroadcaster.TransactionBroadcastRequest.broadcastAttemptId)

EthereumIngressEgress:
  - DepositIgnored:
    - reason: added (EthereumIngressEgress.DepositIgnored.reason)
  - DepositReceived:
    - ingressFee: added (EthereumIngressEgress.DepositReceived.ingressFee)
    - action: added (EthereumIngressEgress.DepositReceived.action)
  - EgressScheduled: removed
  - UtxoConsolidation: added

LiquidityProvider:
  - LiquidityDepositCredited: added
  - WithdrawalEgressScheduled:
    - fee: added (LiquidityProvider.WithdrawalEgressScheduled.fee)

PolkadotBroadcaster:
  - BroadcastAttemptTimeout: removed
  - BroadcastRetryScheduled:
    - broadcastId: added (PolkadotBroadcaster.BroadcastRetryScheduled.broadcastId)
    - retryBlock: added (PolkadotBroadcaster.BroadcastRetryScheduled.retryBlock)
    - broadcastAttemptId: removed (PolkadotBroadcaster.BroadcastRetryScheduled.broadcastAttemptId)
  - BroadcastTimeout: added
  - ThresholdSignatureInvalid:
    - broadcastId: added (PolkadotBroadcaster.ThresholdSignatureInvalid.broadcastId)
    - broadcastAttemptId: removed (PolkadotBroadcaster.ThresholdSignatureInvalid.broadcastAttemptId)
  - TransactionBroadcastRequest:
    - broadcastId: added (PolkadotBroadcaster.TransactionBroadcastRequest.broadcastId)
    - broadcastAttemptId: removed (PolkadotBroadcaster.TransactionBroadcastRequest.broadcastAttemptId)

PolkadotIngressEgress:
  - DepositIgnored:
    - reason: added (PolkadotIngressEgress.DepositIgnored.reason)
  - DepositReceived:
    - ingressFee: added (PolkadotIngressEgress.DepositReceived.ingressFee)
    - action: added (PolkadotIngressEgress.DepositReceived.action)
  - EgressScheduled: removed
  - UtxoConsolidation: added

Swapping:
  - CcmFailed:
    - reason: removed (Swapping.CcmFailed.reason.2)
  - MinimumSwapAmountSet: removed
  - SwapAmountTooLow: removed
  - SwapEgressIgnored: added
  - SwapEgressScheduled:
    - fee: added (Swapping.SwapEgressScheduled.fee)
  - SwapExecuted:
    - swapInput: added (Swapping.SwapExecuted.swapInput)
    - swapOutput: added (Swapping.SwapExecuted.swapOutput)
  - WithdrawalRequested:
    - egressFee: added (Swapping.WithdrawalRequested.egressFee)
