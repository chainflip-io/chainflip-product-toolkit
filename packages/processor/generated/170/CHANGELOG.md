ArbitrumBroadcaster:
  - PalletConfigUpdated: added

ArbitrumIngressEgress:
  - BoostedDepositLost: added
  - CcmFailed: added
  - CcmFallbackScheduled: added
  - DepositChannelLifetimeSet: added
  - DepositIgnored:
    - reason: added (ArbitrumIngressEgress.DepositIgnored.reason.2)
  - FailedToBuildAllBatchCall:
    - error: added (ArbitrumIngressEgress.FailedToBuildAllBatchCall.error.6)
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
    - depositDetails: added (BitcoinIngressEgress.DepositBoosted.depositDetails.id)
  - DepositChannelLifetimeSet: added
  - DepositFinalised:
    - depositDetails: added (BitcoinIngressEgress.DepositFinalised.depositDetails.id)
  - DepositIgnored:
    - depositDetails: added (BitcoinIngressEgress.DepositIgnored.depositDetails.id)
    - reason: added (BitcoinIngressEgress.DepositIgnored.reason.2)
  - DepositWitnessRejected:
    - depositWitness: added (BitcoinIngressEgress.DepositWitnessRejected.depositWitness.depositDetails.id)
  - FailedToBuildAllBatchCall:
    - error: added (BitcoinIngressEgress.FailedToBuildAllBatchCall.error.6)
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
    - reason: added (EthereumIngressEgress.DepositIgnored.reason.2)
  - FailedToBuildAllBatchCall:
    - error: added (EthereumIngressEgress.FailedToBuildAllBatchCall.error.6)
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
    - reason: added (PolkadotIngressEgress.DepositIgnored.reason.2)
  - FailedToBuildAllBatchCall:
    - error: added (PolkadotIngressEgress.FailedToBuildAllBatchCall.error.6)
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
    - offence: added (Reputation.OffencePenalty.offence.8)
  - PenaltyUpdated:
    - offence: added (Reputation.PenaltyUpdated.offence.8)

SolanaBroadcaster:
  - PalletConfigUpdated: added
  - TransactionBroadcastRequest:
    - transactionPayload: added (SolanaBroadcaster.TransactionBroadcastRequest.transactionPayload.serializedTransaction)

SolanaIngressEgress:
  - BoostedDepositLost: added
  - CcmFailed: added
  - CcmFallbackScheduled: added
  - DepositChannelLifetimeSet: added
  - DepositIgnored:
    - reason: added (SolanaIngressEgress.DepositIgnored.reason.2)
  - FailedToBuildAllBatchCall:
    - error: added (SolanaIngressEgress.FailedToBuildAllBatchCall.error.6)
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
    - requestType: added (Swapping.SwapRequested.requestType.3.ccmSwapMetadata)

Validator:
  - PreviousRotationStillPending: added
