New or removed pallets:
  BitcoinElections: added
  LendingPools: added

ArbitrumIngressEgress:
  - BoostFundsAdded: removed
  - BoostPoolCreated: removed
  - CcmEgressInvalid:
    - error: added (ArbitrumIngressEgress.CcmEgressInvalid.error.4)
  - ChannelOpeningFeeSet: removed
  - DepositChannelLifetimeSet: removed
  - DepositFailed:
    - details: changed (ArbitrumIngressEgress.DepositFailed.details.0.name)
  - FailedToBuildAllBatchCall:
    - error: added (ArbitrumIngressEgress.FailedToBuildAllBatchCall.error.5.9)
  - InvalidCcmRefunded: added
  - MinimumDepositSet: removed
  - NetworkFeeDeductionFromBoostSet: removed
  - PalletConfigUpdated: added
  - StoppedBoosting: removed
  - WitnessSafetyMarginSet: removed

AssethubIngressEgress:
  - BoostFundsAdded: removed
  - BoostPoolCreated: removed
  - CcmEgressInvalid:
    - error: added (AssethubIngressEgress.CcmEgressInvalid.error.4)
  - ChannelOpeningFeeSet: removed
  - DepositChannelLifetimeSet: removed
  - DepositFailed:
    - details: changed (AssethubIngressEgress.DepositFailed.details.0.name)
  - FailedToBuildAllBatchCall:
    - error: added (AssethubIngressEgress.FailedToBuildAllBatchCall.error.5.9)
  - InvalidCcmRefunded: added
  - MinimumDepositSet: removed
  - NetworkFeeDeductionFromBoostSet: removed
  - PalletConfigUpdated: added
  - StoppedBoosting: removed
  - WitnessSafetyMarginSet: removed

BitcoinIngressEgress:
  - BoostFundsAdded: removed
  - BoostPoolCreated: removed
  - CcmEgressInvalid:
    - error: added (BitcoinIngressEgress.CcmEgressInvalid.error.4)
  - ChannelOpeningFeeSet: removed
  - DepositChannelLifetimeSet: removed
  - DepositFailed:
    - details: changed (BitcoinIngressEgress.DepositFailed.details.0.name)
  - FailedToBuildAllBatchCall:
    - error: added (BitcoinIngressEgress.FailedToBuildAllBatchCall.error.5.9)
  - InvalidCcmRefunded: added
  - MinimumDepositSet: removed
  - NetworkFeeDeductionFromBoostSet: removed
  - PalletConfigUpdated: added
  - StoppedBoosting: removed
  - WitnessSafetyMarginSet: removed

Environment:
  - RuntimeSafeModeUpdated:
    - safeMode: added (Environment.RuntimeSafeModeUpdated.safeMode.2.lendingPools)
  - SolanaGovCallDispatched:
    - govCall: added (Environment.SolanaGovCallDispatched.govCall.2)

EthereumIngressEgress:
  - BoostFundsAdded: removed
  - BoostPoolCreated: removed
  - CcmEgressInvalid:
    - error: added (EthereumIngressEgress.CcmEgressInvalid.error.4)
  - ChannelOpeningFeeSet: removed
  - DepositChannelLifetimeSet: removed
  - DepositFailed:
    - details: changed (EthereumIngressEgress.DepositFailed.details.0.name)
  - FailedToBuildAllBatchCall:
    - error: added (EthereumIngressEgress.FailedToBuildAllBatchCall.error.5.9)
  - InvalidCcmRefunded: added
  - MinimumDepositSet: removed
  - NetworkFeeDeductionFromBoostSet: removed
  - PalletConfigUpdated: added
  - StoppedBoosting: removed
  - WitnessSafetyMarginSet: removed

Funding:
  - Rebalance: added

PolkadotIngressEgress:
  - BoostFundsAdded: removed
  - BoostPoolCreated: removed
  - CcmEgressInvalid:
    - error: added (PolkadotIngressEgress.CcmEgressInvalid.error.4)
  - ChannelOpeningFeeSet: removed
  - DepositChannelLifetimeSet: removed
  - DepositFailed:
    - details: changed (PolkadotIngressEgress.DepositFailed.details.0.name)
  - FailedToBuildAllBatchCall:
    - error: added (PolkadotIngressEgress.FailedToBuildAllBatchCall.error.5.9)
  - InvalidCcmRefunded: added
  - MinimumDepositSet: removed
  - NetworkFeeDeductionFromBoostSet: removed
  - PalletConfigUpdated: added
  - StoppedBoosting: removed
  - WitnessSafetyMarginSet: removed

SolanaElections:
  - ElectoralEvent: added
  - UnknownElection:
    - 1: added (SolanaElections.UnknownElection.1.6)

SolanaIngressEgress:
  - BoostFundsAdded: removed
  - BoostPoolCreated: removed
  - CcmEgressInvalid:
    - error: added (SolanaIngressEgress.CcmEgressInvalid.error.4)
  - ChannelOpeningFeeSet: removed
  - DepositChannelLifetimeSet: removed
  - DepositFailed:
    - details: changed (SolanaIngressEgress.DepositFailed.details.0.name)
  - FailedToBuildAllBatchCall:
    - error: added (SolanaIngressEgress.FailedToBuildAllBatchCall.error.5.9)
  - InvalidCcmRefunded: added
  - MinimumDepositSet: removed
  - NetworkFeeDeductionFromBoostSet: removed
  - PalletConfigUpdated: added
  - StoppedBoosting: removed
  - WitnessSafetyMarginSet: removed

Swapping:
  - PalletConfigUpdated:
    - update: added (Swapping.PalletConfigUpdated.update.10)
  - RefundEgressScheduled:
    - refundFee: added (Swapping.RefundEgressScheduled.refundFee)
  - RefundedOnChain:
    - refundFee: added (Swapping.RefundedOnChain.refundFee)
  - SwapDepositAddressReady:
    - channelMetadata: added (Swapping.SwapDepositAddressReady.channelMetadata.ccmAdditionalData)
  - SwapRequested:
    - requestType: added (Swapping.SwapRequested.requestType.2.outputAction.0.ccmDepositMetadata.channelMetadata.ccmAdditionalData)

TradingStrategy:
  - StrategyDeployed:
    - strategy: added (TradingStrategy.StrategyDeployed.strategy.1)

Validator:
  - PalletConfigUpdated:
    - update: added (Validator.PalletConfigUpdated.update.9)
