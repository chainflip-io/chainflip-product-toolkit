ArbitrumIngressEgress:
  - DepositBoosted:
    - action: added
  - DepositFailed:
    - reason: added
  - DepositFinalised:
    - action: added

AssethubIngressEgress:
  - DepositBoosted:
    - action: added
  - DepositFailed:
    - reason: added
  - DepositFinalised:
    - action: added

BitcoinIngressEgress:
  - DepositBoosted:
    - action: added
  - DepositFailed:
    - reason: added
  - DepositFinalised:
    - action: added

Environment:
  - BatchCompleted: added
  - NonNativeSignedCall: added
  - RuntimeSafeModeUpdated:
    - safeMode: added

EthereumIngressEgress:
  - DepositBoosted:
    - action: added
  - DepositFailed:
    - reason: added
  - DepositFinalised:
    - action: added

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
  - DepositBoosted:
    - action: added
  - DepositFailed:
    - reason: added
  - DepositFinalised:
    - action: added

SolanaIngressEgress:
  - DepositBoosted:
    - action: added
  - DepositFailed:
    - reason: added
  - DepositFinalised:
    - action: added

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
