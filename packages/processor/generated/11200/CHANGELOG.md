ArbitrumIngressEgress:
  - ChannelRejectionRequestReceived: added
  - DepositBoosted:
    - action: added (ArbitrumIngressEgress.DepositBoosted.action.5)
  - DepositFailed:
    - reason: added (ArbitrumIngressEgress.DepositFailed.reason.4)
  - DepositFinalised:
    - action: added (ArbitrumIngressEgress.DepositFinalised.action.5)
  - PalletConfigUpdated:
    - update: added (ArbitrumIngressEgress.PalletConfigUpdated.update.6)

AssethubIngressEgress:
  - ChannelRejectionRequestReceived: added
  - DepositBoosted:
    - action: added (AssethubIngressEgress.DepositBoosted.action.5)
  - DepositFailed:
    - reason: added (AssethubIngressEgress.DepositFailed.reason.4)
  - DepositFinalised:
    - action: added (AssethubIngressEgress.DepositFinalised.action.5)
  - PalletConfigUpdated:
    - update: added (AssethubIngressEgress.PalletConfigUpdated.update.6)

BitcoinIngressEgress:
  - ChannelRejectionRequestReceived: added
  - DepositBoosted:
    - action: added (BitcoinIngressEgress.DepositBoosted.action.5)
  - DepositFailed:
    - reason: added (BitcoinIngressEgress.DepositFailed.reason.4)
  - DepositFinalised:
    - action: added (BitcoinIngressEgress.DepositFinalised.action.5)
  - PalletConfigUpdated:
    - update: added (BitcoinIngressEgress.PalletConfigUpdated.update.6)

Environment:
  - BatchCompleted: added
  - NonNativeSignedCall: added
  - RuntimeSafeModeUpdated:
    - safeMode: added (Environment.RuntimeSafeModeUpdated.safeMode.2.lendingPools.borrowing)

EthereumIngressEgress:
  - ChannelRejectionRequestReceived: added
  - DepositBoosted:
    - action: added (EthereumIngressEgress.DepositBoosted.action.5)
  - DepositFailed:
    - reason: added (EthereumIngressEgress.DepositFailed.reason.4)
  - DepositFinalised:
    - action: added (EthereumIngressEgress.DepositFinalised.action.5)
  - PalletConfigUpdated:
    - update: added (EthereumIngressEgress.PalletConfigUpdated.update.6)

LendingPools:
  - CollateralAdded:
    - primaryCollateralAsset: removed (LendingPools.CollateralAdded.primaryCollateralAsset)
  - CollateralRemoved:
    - primaryCollateralAsset: removed (LendingPools.CollateralRemoved.primaryCollateralAsset)
  - InterestTaken: added
  - LendingFeeCollectionInitiated: removed
  - LendingNetworkFeeSwapInitiated: added
  - LiquidationFeeTaken: added
  - LoanCreated:
    - originationFee: removed (LendingPools.LoanCreated.originationFee)
  - LoanRepaid:
    - liquidationFees: removed (LendingPools.LoanRepaid.liquidationFees)
  - LoanSettled:
    - outstandingPrincipal: added (LendingPools.LoanSettled.outstandingPrincipal)
    - viaLiquidation: added (LendingPools.LoanSettled.viaLiquidation)
    - totalFees: removed (LendingPools.LoanSettled.totalFees)
  - LoanUpdated:
    - originationFee: removed (LendingPools.LoanUpdated.originationFee)
  - OriginationFeeTaken: added
  - PalletConfigUpdated:
    - update: added (LendingPools.PalletConfigUpdated.update.1)
  - PrimaryCollateralAssetUpdated: added

PolkadotIngressEgress:
  - ChannelRejectionRequestReceived: added
  - DepositBoosted:
    - action: added (PolkadotIngressEgress.DepositBoosted.action.5)
  - DepositFailed:
    - reason: added (PolkadotIngressEgress.DepositFailed.reason.4)
  - DepositFinalised:
    - action: added (PolkadotIngressEgress.DepositFinalised.action.5)
  - PalletConfigUpdated:
    - update: added (PolkadotIngressEgress.PalletConfigUpdated.update.6)

SolanaIngressEgress:
  - ChannelRejectionRequestReceived: added
  - DepositBoosted:
    - depositDetails: added (SolanaIngressEgress.DepositBoosted.depositDetails)
    - action: added (SolanaIngressEgress.DepositBoosted.action.5)
  - DepositFailed:
    - reason: added (SolanaIngressEgress.DepositFailed.reason.4)
    - details: added (SolanaIngressEgress.DepositFailed.details.0.depositWitness.depositDetails)
  - DepositFinalised:
    - depositDetails: added (SolanaIngressEgress.DepositFinalised.depositDetails)
    - action: added (SolanaIngressEgress.DepositFinalised.action.5)
  - PalletConfigUpdated:
    - update: added (SolanaIngressEgress.PalletConfigUpdated.update.6)
  - TransactionRejectedByBroker:
    - txId: added (SolanaIngressEgress.TransactionRejectedByBroker.txId)
  - TransactionRejectionFailed:
    - txId: added (SolanaIngressEgress.TransactionRejectionFailed.txId)

Swapping:
  - SwapAborted:
    - reason: added (Swapping.SwapAborted.reason.7)
  - SwapRequested:
    - requestType: removed (Swapping.SwapRequested.requestType.2.outputAction.2.swapType.1)
  - SwapRescheduled:
    - reason: added (Swapping.SwapRescheduled.reason.7)

Validator:
  - OperatorSettingsUpdated:
    - settings: added (Validator.OperatorSettingsUpdated.settings)
    - preferences: removed (Validator.OperatorSettingsUpdated.preferences)
  - PalletConfigUpdated:
    - update: added (Validator.PalletConfigUpdated.update.8)
