ArbitrumBroadcaster:
  - PalletConfigUpdated: added

ArbitrumIngressEgress:
  - BoostedDepositLost: added
  - CcmFailed: added
  - CcmFallbackScheduled: added
  - DepositChannelLifetimeSet: added
  - DepositIgnored:
    - reason: added
  - FailedToBuildAllBatchCall:
    - error: added
  - TransactionRejectedByBroker: added
  - TransactionRejectionFailed: added
  - TransactionRejectionRequestExpired: added
  - TransactionRejectionRequestReceived: added

ArbitrumVault:
  - ActivationTxFailedAwaitingGovernance: added

BitcoinBroadcaster:
  - PalletConfigUpdated: added

BitcoinIngressEgress:
  - BoostedDepositLost: added
  - CcmFailed: added
  - CcmFallbackScheduled: added
  - DepositBoosted:
    - depositDetails: added
  - DepositChannelLifetimeSet: added
  - DepositFinalised:
    - depositDetails: added
  - DepositIgnored:
    - depositDetails: added
    - reason: added
  - DepositWitnessRejected:
    - depositWitness: added
  - FailedToBuildAllBatchCall:
    - error: added
  - TransactionRejectedByBroker: added
  - TransactionRejectionFailed: added
  - TransactionRejectionRequestExpired: added
  - TransactionRejectionRequestReceived: added

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
  - DepositChannelLifetimeSet: added
  - DepositIgnored:
    - reason: added
  - FailedToBuildAllBatchCall:
    - error: added
  - TransactionRejectedByBroker: added
  - TransactionRejectionFailed: added
  - TransactionRejectionRequestExpired: added
  - TransactionRejectionRequestReceived: added

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
  - DepositChannelLifetimeSet: added
  - DepositIgnored:
    - reason: added
  - FailedToBuildAllBatchCall:
    - error: added
  - TransactionRejectedByBroker: added
  - TransactionRejectionFailed: added
  - TransactionRejectionRequestExpired: added
  - TransactionRejectionRequestReceived: added

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
    - transactionPayload: added

SolanaIngressEgress:
  - BoostedDepositLost: added
  - CcmFailed: added
  - CcmFallbackScheduled: added
  - DepositChannelLifetimeSet: added
  - DepositIgnored:
    - reason: added
  - FailedToBuildAllBatchCall:
    - error: added
  - TransactionRejectedByBroker: added
  - TransactionRejectionFailed: added
  - TransactionRejectionRequestExpired: added
  - TransactionRejectionRequestReceived: added

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
