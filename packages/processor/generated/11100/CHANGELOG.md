New or removed pallets:
  GenericElections: added

AccountRoles:
  - AccountRoleDeregistered:
    - role: added (AccountRoles.AccountRoleDeregistered.role.4)
  - AccountRoleRegistered:
    - role: added (AccountRoles.AccountRoleRegistered.role.4)
  - SubAccountCallExecuted: added
  - SubAccountCreated: added

ArbitrumIngressEgress:
  - DepositFailed:
    - details: added (ArbitrumIngressEgress.DepositFailed.details.1.vaultWitness.refundParams.refundCcmMetadata)
  - PalletConfigUpdated:
    - update: added (ArbitrumIngressEgress.PalletConfigUpdated.update.5.accountRole.4)

AssethubIngressEgress:
  - DepositFailed:
    - details: added (AssethubIngressEgress.DepositFailed.details.1.vaultWitness.refundParams.refundCcmMetadata)
  - PalletConfigUpdated:
    - update: added (AssethubIngressEgress.PalletConfigUpdated.update.5.accountRole.4)

BitcoinIngressEgress:
  - DepositFailed:
    - details: added (BitcoinIngressEgress.DepositFailed.details.1.vaultWitness.refundParams.refundCcmMetadata)
  - PalletConfigUpdated:
    - update: added (BitcoinIngressEgress.PalletConfigUpdated.update.5.accountRole.4)

Emissions:
  - BackupNodeInflationEmissionsUpdated: removed
  - BackupRewardsDistributed: removed

Environment:
  - RuntimeSafeModeUpdated:
    - safeMode: added (Environment.RuntimeSafeModeUpdated.safeMode.2.electionsGeneric)

EthereumIngressEgress:
  - DepositFailed:
    - details: added (EthereumIngressEgress.DepositFailed.details.1.vaultWitness.refundParams.refundCcmMetadata)
  - PalletConfigUpdated:
    - update: added (EthereumIngressEgress.PalletConfigUpdated.update.5.accountRole.4)

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
    - details: added (PolkadotIngressEgress.DepositFailed.details.1.vaultWitness.refundParams.refundCcmMetadata)
  - PalletConfigUpdated:
    - update: added (PolkadotIngressEgress.PalletConfigUpdated.update.5.accountRole.4)

SolanaIngressEgress:
  - DepositFailed:
    - details: added (SolanaIngressEgress.DepositFailed.details.1.vaultWitness.refundParams.refundCcmMetadata)
  - PalletConfigUpdated:
    - update: added (SolanaIngressEgress.PalletConfigUpdated.update.5.accountRole.4)

Swapping:
  - SwapAborted: added
  - SwapDepositAddressReady:
    - refundParameters: added (Swapping.SwapDepositAddressReady.refundParameters.refundCcmMetadata)
  - SwapExecuted:
    - oracleDelta: added (Swapping.SwapExecuted.oracleDelta)
  - SwapRequested:
    - priceLimitsAndExpiry: added (Swapping.SwapRequested.priceLimitsAndExpiry)
    - refundParameters: removed (Swapping.SwapRequested.refundParameters)
    - requestType: added (Swapping.SwapRequested.requestType.2.outputAction.2)
  - SwapRescheduled:
    - reason: added (Swapping.SwapRescheduled.reason)

Validator:
  - Delegated: added
  - DelegatorAllowed: added
  - DelegatorBlocked: added
  - MaxBidUpdated: added
  - OperatorAcceptedByValidator: added
  - OperatorSettingsUpdated: added
  - PalletConfigUpdated:
    - update: removed (Validator.PalletConfigUpdated.update.8)
  - RotationPhaseUpdated:
    - newPhase: removed (Validator.RotationPhaseUpdated.newPhase.1.secondaryCandidates)
  - UnDelegationFinalized: added
  - Undelegated: added
  - ValidatorClaimed: added
  - ValidatorRemovedFromOperator: added
