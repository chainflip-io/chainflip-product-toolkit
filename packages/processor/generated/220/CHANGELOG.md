ArbitrumBroadcaster:
  - CallResigned:
    - transactionPayload: added (ArbitrumBroadcaster.CallResigned.transactionPayload)

ArbitrumIngressEgress:
  - CcmEgressInvalid:
    - error: added (ArbitrumIngressEgress.CcmEgressInvalid.error.5)
  - DepositBoosted:
    - amounts: added (ArbitrumIngressEgress.DepositBoosted.amounts.key)

AssethubBroadcaster:
  - CallResigned:
    - transactionPayload: added (AssethubBroadcaster.CallResigned.transactionPayload)

AssethubIngressEgress:
  - CcmEgressInvalid:
    - error: added (AssethubIngressEgress.CcmEgressInvalid.error.5)
  - DepositBoosted:
    - amounts: added (AssethubIngressEgress.DepositBoosted.amounts.key)

BitcoinBroadcaster:
  - CallResigned:
    - transactionPayload: added (BitcoinBroadcaster.CallResigned.transactionPayload)

BitcoinIngressEgress:
  - CcmEgressInvalid:
    - error: added (BitcoinIngressEgress.CcmEgressInvalid.error.5)
  - DepositBoosted:
    - amounts: added (BitcoinIngressEgress.DepositBoosted.amounts.key)

Environment:
  - RuntimeSafeModeUpdated:
    - safeMode: removed (Environment.RuntimeSafeModeUpdated.safeMode.2.lendingPools.addCollateral)

EthereumBroadcaster:
  - CallResigned:
    - transactionPayload: added (EthereumBroadcaster.CallResigned.transactionPayload)

EthereumIngressEgress:
  - CcmEgressInvalid:
    - error: added (EthereumIngressEgress.CcmEgressInvalid.error.5)
  - DepositBoosted:
    - amounts: added (EthereumIngressEgress.DepositBoosted.amounts.key)

LendingPools:
  - CollateralAdded: removed
  - CollateralRemoved: removed
  - LendingFundsAdded:
    - actionType: added (LendingPools.LendingFundsAdded.actionType)
  - LendingFundsRemoved:
    - actionType: added (LendingPools.LendingFundsRemoved.actionType)
  - LoanCreated:
    - loanType: added (LendingPools.LoanCreated.loanType)
    - borrowerId: removed (LendingPools.LoanCreated.borrowerId)
  - LoanRepaid:
    - actionType: added (LendingPools.LoanRepaid.actionType.2)
  - PalletConfigUpdated:
    - update: added (LendingPools.PalletConfigUpdated.update.0.config.minLendingPoolShare)

PolkadotBroadcaster:
  - CallResigned:
    - transactionPayload: added (PolkadotBroadcaster.CallResigned.transactionPayload)

PolkadotIngressEgress:
  - CcmEgressInvalid:
    - error: added (PolkadotIngressEgress.CcmEgressInvalid.error.5)
  - DepositBoosted:
    - amounts: added (PolkadotIngressEgress.DepositBoosted.amounts.key)

SolanaBroadcaster:
  - CallResigned:
    - transactionPayload: added (SolanaBroadcaster.CallResigned.transactionPayload)

SolanaIngressEgress:
  - CcmEgressInvalid:
    - error: added (SolanaIngressEgress.CcmEgressInvalid.error.5)
  - DepositBoosted:
    - amounts: added (SolanaIngressEgress.DepositBoosted.amounts.key)

Swapping:
  - AffiliateDeregistration: added

TradingStrategy:
  - StrategyDeployed:
    - strategy: added (TradingStrategy.StrategyDeployed.strategy.3)

Validator:
  - WitnessingTaskRestarted: added
