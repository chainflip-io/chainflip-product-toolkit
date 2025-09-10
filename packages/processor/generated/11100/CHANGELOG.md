New or removed pallets:
  GenericElections: added

AccountRoles:
  - AccountRoleDeregistered:
    - role: added
  - AccountRoleRegistered:
    - role: added
  - SubAccountCallExecuted: added
  - SubAccountCreated: added

ArbitrumIngressEgress:
  - DepositFailed:
    - details: added
  - PalletConfigUpdated:
    - update: added

AssethubIngressEgress:
  - DepositFailed:
    - details: added
  - PalletConfigUpdated:
    - update: added

BitcoinIngressEgress:
  - DepositFailed:
    - details: added
  - PalletConfigUpdated:
    - update: added

Emissions:
  - BackupNodeInflationEmissionsUpdated: removed
  - BackupRewardsDistributed: removed

Environment:
  - RuntimeSafeModeUpdated:
    - safeMode: added

EthereumIngressEgress:
  - DepositFailed:
    - details: added
  - PalletConfigUpdated:
    - update: added

Flip:
  - BondUpdated: added
  - FlipMinted: added

Funding:
  - SCCallCannotBeDecoded: added
  - SCCallCannotBeExecuted: added
  - SCCallExecuted: added

LendingPools:
  - CollateralAdded: added
  - CollateralRemoved: added
  - LendingFeeCollectionInitiated: added
  - LendingFundsAdded: added
  - LendingFundsRemoved: added
  - LendingPoolCreated: added
  - LiquidationInitiated: added
  - LoanCreated: added
  - LoanRepaid: added
  - LoanSettled: added
  - LoanUpdated: added

PolkadotIngressEgress:
  - DepositFailed:
    - details: added
  - PalletConfigUpdated:
    - update: added

SolanaIngressEgress:
  - DepositFailed:
    - details: added
  - PalletConfigUpdated:
    - update: added

Swapping:
  - SwapAborted: added
  - SwapDepositAddressReady:
    - refundParameters: added
  - SwapExecuted:
    - oracleDelta: added
  - SwapRequested:
    - priceLimitsAndExpiry: added
    - refundParameters: removed
    - requestType: added
  - SwapRescheduled:
    - reason: added

Validator:
  - Delegated: added
  - DelegatorAllowed: added
  - DelegatorBlocked: added
  - MaxBidUpdated: added
  - OperatorAcceptedByValidator: added
  - OperatorSettingsUpdated: added
  - PalletConfigUpdated:
    - update: removed
  - RotationPhaseUpdated:
    - newPhase: removed
  - UnDelegationFinalized: added
  - Undelegated: added
  - ValidatorClaimed: added
  - ValidatorRemovedFromOperator: added
