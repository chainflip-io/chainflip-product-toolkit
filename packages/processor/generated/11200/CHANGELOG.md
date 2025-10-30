ArbitrumIngressEgress:
  - ChannelRejectionRequestReceived: added
  - DepositBoosted:
    - action: added
  - DepositFailed:
    - reason: added
  - DepositFinalised:
    - action: added
  - PalletConfigUpdated:
    - update: added

AssethubIngressEgress:
  - ChannelRejectionRequestReceived: added
  - DepositBoosted:
    - action: added
  - DepositFailed:
    - reason: added
  - DepositFinalised:
    - action: added
  - PalletConfigUpdated:
    - update: added

BitcoinIngressEgress:
  - ChannelRejectionRequestReceived: added
  - DepositBoosted:
    - action: added
  - DepositFailed:
    - reason: added
  - DepositFinalised:
    - action: added
  - PalletConfigUpdated:
    - update: added

Environment:
  - BatchCompleted: added
  - NonNativeSignedCall: added
  - RuntimeSafeModeUpdated:
    - safeMode: added

EthereumIngressEgress:
  - ChannelRejectionRequestReceived: added
  - DepositBoosted:
    - action: added
  - DepositFailed:
    - reason: added
  - DepositFinalised:
    - action: added
  - PalletConfigUpdated:
    - update: added

LendingPools:
  - CollateralAdded:
    - primaryCollateralAsset: removed
  - CollateralRemoved:
    - primaryCollateralAsset: removed
  - InterestTaken: added
  - LendingFeeCollectionInitiated: removed
  - LendingNetworkFeeSwapInitiated: added
  - LiquidationFeeTaken: added
  - LoanCreated:
    - originationFee: removed
  - LoanRepaid:
    - liquidationFees: removed
  - LoanSettled:
    - outstandingPrincipal: added
    - viaLiquidation: added
    - totalFees: removed
  - LoanUpdated:
    - originationFee: removed
  - OriginationFeeTaken: added
  - PalletConfigUpdated:
    - update: added
  - PrimaryCollateralAssetUpdated: added

PolkadotIngressEgress:
  - ChannelRejectionRequestReceived: added
  - DepositBoosted:
    - action: added
  - DepositFailed:
    - reason: added
  - DepositFinalised:
    - action: added
  - PalletConfigUpdated:
    - update: added

SolanaIngressEgress:
  - ChannelRejectionRequestReceived: added
  - DepositBoosted:
    - depositDetails: added
    - action: added
  - DepositFailed:
    - reason: added
    - details: added
  - DepositFinalised:
    - depositDetails: added
    - action: added
  - PalletConfigUpdated:
    - update: added
  - TransactionRejectedByBroker:
    - txId: added
  - TransactionRejectionFailed:
    - txId: added

Swapping:
  - SwapAborted:
    - reason: added
  - SwapRequested:
    - requestType: removed
  - SwapRescheduled:
    - reason: added

Validator:
  - OperatorSettingsUpdated:
    - settings: added
    - preferences: removed
  - PalletConfigUpdated:
    - update: added
