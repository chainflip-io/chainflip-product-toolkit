ArbitrumBroadcaster:
  - PalletConfigUpdated: added

ArbitrumIngressEgress:
  - BoostedDepositLost: added
  - CcmFailed: added
  - FailedToBuildAllBatchCall:
    - error: added

BitcoinBroadcaster:
  - PalletConfigUpdated: added

BitcoinIngressEgress:
  - BoostedDepositLost: added
  - CcmFailed: added
  - FailedToBuildAllBatchCall:
    - error: added

BitcoinThresholdSigner:
  - KeygenResponseTimeoutUpdated: removed
  - PalletConfigUpdated: added
  - ThresholdSignatureResponseTimeoutUpdated: removed

EthereumBroadcaster:
  - PalletConfigUpdated: added

EthereumIngressEgress:
  - BoostedDepositLost: added
  - CcmFailed: added
  - FailedToBuildAllBatchCall:
    - error: added

EvmThresholdSigner:
  - KeygenResponseTimeoutUpdated: removed
  - PalletConfigUpdated: added
  - ThresholdSignatureResponseTimeoutUpdated: removed

PolkadotBroadcaster:
  - PalletConfigUpdated: added

PolkadotIngressEgress:
  - BoostedDepositLost: added
  - CcmFailed: added
  - FailedToBuildAllBatchCall:
    - error: added

PolkadotThresholdSigner:
  - KeygenResponseTimeoutUpdated: removed
  - PalletConfigUpdated: added
  - ThresholdSignatureResponseTimeoutUpdated: removed

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
  - FailedToBuildAllBatchCall:
    - error: added

SolanaThresholdSigner:
  - KeygenResponseTimeoutUpdated: removed
  - PalletConfigUpdated: added
  - ThresholdSignatureResponseTimeoutUpdated: removed

Swapping:
  - CcmFailed: removed
  - SwapRequested:
    - requestType: added

Validator:
  - PreviousRotationStillPending: added
