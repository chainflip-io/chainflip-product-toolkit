Environment:
  - BatchCompleted: added
  - NonNativeSignedCall: added
  - RuntimeSafeModeUpdated:
    - safeMode: added (Environment.RuntimeSafeModeUpdated.safeMode.2.swapping.depositEnabled)

Funding:
  - Funded:
    - source: added (Funding.Funded.source)
    - txHash: removed (Funding.Funded.txHash)

LendingPools:
  - CollateralAdded: added
  - CollateralRemoved: added
  - InterestTaken: added
  - LendingFundsAdded: added
  - LendingFundsRemoved: added
  - LendingNetworkFeeSwapInitiated: added
  - LendingPoolCreated: added
  - LiquidationCompleted: added
  - LiquidationFeeTaken: added
  - LiquidationInitiated: added
  - LoanCreated: added
  - LoanRepaid: added
  - LoanSettled: added
  - LoanUpdated: added
  - OriginationFeeTaken: added
  - PalletConfigUpdated:
    - update: added (LendingPools.PalletConfigUpdated.update.1)
  - PrimaryCollateralAssetUpdated: added
  - WhitelistUpdated: added

Swapping:
  - AccountCreationDepositAddressReady: added
  - SwapAborted:
    - reason: added (Swapping.SwapAborted.reason.7)
  - SwapRequestCompleted:
    - reason: added (Swapping.SwapRequestCompleted.reason)
  - SwapRequested:
    - requestType: added (Swapping.SwapRequested.requestType.3)
  - SwapRescheduled:
    - reason: added (Swapping.SwapRescheduled.reason.7)
