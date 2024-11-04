ArbitrumBroadcaster:
  - PalletConfigUpdated: added

ArbitrumIngressEgress:
  - BoostedDepositLost: added
  - CcmFailed: added
  - CcmFallbackScheduled: added
  - DepositIgnored:
    - reason: added
  - FailedToBuildAllBatchCall:
    - error: added
  - FailedToRejectTaintedTransaction: added
  - TaintedTransactionRejected: added
  - TaintedTransactionReportExpired: added
  - TaintedTransactionReportReceived: added

ArbitrumVault:
  - ActivationTxFailedAwaitingGovernance: added

BitcoinBroadcaster:
  - PalletConfigUpdated: added

BitcoinIngressEgress:
  - BoostedDepositLost: added
  - CcmFailed: added
  - CcmFallbackScheduled: added
  - DepositBoosted:
    - depositDetails: changed
  - DepositFinalised:
    - depositDetails: changed
  - DepositIgnored:
    - depositDetails: changed
    - reason: added
  - DepositWitnessRejected:
    - depositWitness: changed
  - FailedToBuildAllBatchCall:
    - error: added
  - FailedToRejectTaintedTransaction: added
  - TaintedTransactionRejected: added
  - TaintedTransactionReportExpired: added
  - TaintedTransactionReportReceived: added

BitcoinThresholdSigner:
  - KeygenResponseTimeoutUpdated: removed
  - PalletConfigUpdated: added
  - ThresholdSignatureResponseTimeoutUpdated: removed

BitcoinVault:
  - ActivationTxFailedAwaitingGovernance: added

EthereumBroadcaster:
  - PalletConfigUpdated: added

EthereumIngressEgress:
  - BoostedDepositLost: added
  - CcmFailed: added
  - CcmFallbackScheduled: added
  - DepositIgnored:
    - reason: added
  - FailedToBuildAllBatchCall:
    - error: added
  - FailedToRejectTaintedTransaction: added
  - TaintedTransactionRejected: added
  - TaintedTransactionReportExpired: added
  - TaintedTransactionReportReceived: added

EthereumVault:
  - ActivationTxFailedAwaitingGovernance: added

EvmThresholdSigner:
  - KeygenResponseTimeoutUpdated: removed
  - PalletConfigUpdated: added
  - ThresholdSignatureResponseTimeoutUpdated: removed

PolkadotBroadcaster:
  - PalletConfigUpdated: added

PolkadotIngressEgress:
  - BoostedDepositLost: added
  - CcmFailed: added
  - CcmFallbackScheduled: added
  - DepositIgnored:
    - reason: added
  - FailedToBuildAllBatchCall:
    - error: added
  - FailedToRejectTaintedTransaction: added
  - TaintedTransactionRejected: added
  - TaintedTransactionReportExpired: added
  - TaintedTransactionReportReceived: added

PolkadotThresholdSigner:
  - KeygenResponseTimeoutUpdated: removed
  - PalletConfigUpdated: added
  - ThresholdSignatureResponseTimeoutUpdated: removed

PolkadotVault:
  - ActivationTxFailedAwaitingGovernance: added

Reputation:
  - OffencePenalty:
    - offence: added
  - PenaltyUpdated:
    - offence: added

SolanaBroadcaster:
  - PalletConfigUpdated: added
  - TransactionBroadcastRequest:
    - transactionPayload: changed

SolanaIngressEgress:
  - BoostedDepositLost: added
  - CcmFailed: added
  - CcmFallbackScheduled: added
  - DepositIgnored:
    - reason: added
  - FailedToBuildAllBatchCall:
    - error: added
  - FailedToRejectTaintedTransaction: added
  - TaintedTransactionRejected: added
  - TaintedTransactionReportExpired: added
  - TaintedTransactionReportReceived: added

SolanaThresholdSigner:
  - KeygenResponseTimeoutUpdated: removed
  - PalletConfigUpdated: added
  - ThresholdSignatureResponseTimeoutUpdated: removed

SolanaVault:
  - ActivationTxFailedAwaitingGovernance: added

Swapping:
  - CcmFailed: removed
  - MinimumChunkSizeSet: added
  - SwapRequested:
    - requestType: added

Validator:
  - PreviousRotationStillPending: added
