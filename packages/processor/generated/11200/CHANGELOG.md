LendingPools:
  - InterestTaken: added
  - LendingFeeCollectionInitiated: removed
  - LendingNetworkFeeSwapInitiated: added
  - LendingPoolFeeSwapInitiated: added
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

Swapping:
  - SwapAborted:
    - reason: added
  - SwapRescheduled:
    - reason: added

Validator:
  - OperatorSettingsUpdated:
    - settings: added
    - preferences: removed
  - PalletConfigUpdated:
    - update: added
