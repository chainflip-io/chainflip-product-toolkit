ArbitrumBroadcaster:
  - CallResigned:
    - transactionPayload: added (ArbitrumBroadcaster.CallResigned.transactionPayload)

ArbitrumIngressEgress:
  - DepositBoosted:
    - amounts: added (ArbitrumIngressEgress.DepositBoosted.amounts.key)

AssethubBroadcaster:
  - CallResigned:
    - transactionPayload: added (AssethubBroadcaster.CallResigned.transactionPayload)

AssethubIngressEgress:
  - DepositBoosted:
    - amounts: added (AssethubIngressEgress.DepositBoosted.amounts.key)

BitcoinBroadcaster:
  - CallResigned:
    - transactionPayload: added (BitcoinBroadcaster.CallResigned.transactionPayload)

BitcoinIngressEgress:
  - DepositBoosted:
    - amounts: added (BitcoinIngressEgress.DepositBoosted.amounts.key)

EthereumBroadcaster:
  - CallResigned:
    - transactionPayload: added (EthereumBroadcaster.CallResigned.transactionPayload)

EthereumIngressEgress:
  - DepositBoosted:
    - amounts: added (EthereumIngressEgress.DepositBoosted.amounts.key)

LendingPools:
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
  - DepositBoosted:
    - amounts: added (PolkadotIngressEgress.DepositBoosted.amounts.key)

SolanaBroadcaster:
  - CallResigned:
    - transactionPayload: added (SolanaBroadcaster.CallResigned.transactionPayload)

SolanaIngressEgress:
  - DepositBoosted:
    - amounts: added (SolanaIngressEgress.DepositBoosted.amounts.key)

Swapping:
  - AffiliateDeregistration: added

TradingStrategy:
  - StrategyDeployed:
    - strategy: added (TradingStrategy.StrategyDeployed.strategy.3)

Validator:
  - WitnessingTaskRestarted: added
