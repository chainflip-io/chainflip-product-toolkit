New or removed pallets:
  ArbitrumElections: added
  EthereumElections: added
  Historical: added

ArbitrumBroadcaster:
  - BroadcastCallbackExecuted: removed

ArbitrumIngressEgress:
  - AssetEgressStatusChanged:
    - asset: added (ArbitrumIngressEgress.AssetEgressStatusChanged.asset.2)
  - CcmEgressInvalid:
    - error: added (ArbitrumIngressEgress.CcmEgressInvalid.error.1.9.14)
  - DepositBoosted:
    - asset: added (ArbitrumIngressEgress.DepositBoosted.asset.2)
  - DepositFailed:
    - reason: added (ArbitrumIngressEgress.DepositFailed.reason.3.14)
    - details: added (ArbitrumIngressEgress.DepositFailed.details.0.depositWitness.asset.2)
  - DepositFetchesScheduled:
    - asset: added (ArbitrumIngressEgress.DepositFetchesScheduled.asset.2)
  - DepositFinalised:
    - asset: added (ArbitrumIngressEgress.DepositFinalised.asset.2)
  - FailedToBuildAllBatchCall:
    - error: added (ArbitrumIngressEgress.FailedToBuildAllBatchCall.error.5.9.14)
  - InsufficientBoostLiquidity:
    - asset: added (ArbitrumIngressEgress.InsufficientBoostLiquidity.asset.2)
  - InvalidCcmRefunded:
    - asset: added (ArbitrumIngressEgress.InvalidCcmRefunded.asset.2)
  - PalletConfigUpdated:
    - update: added (ArbitrumIngressEgress.PalletConfigUpdated.update.1.asset.2)
  - TransferFallbackRequested:
    - asset: added (ArbitrumIngressEgress.TransferFallbackRequested.asset.2)

AssetBalances:
  - AccountCredited:
    - asset: added (AssetBalances.AccountCredited.asset.14)
  - AccountDebited:
    - asset: added (AssetBalances.AccountDebited.asset.14)
  - RefundSkipped:
    - reason: added (AssetBalances.RefundSkipped.reason.14)

AssethubBroadcaster:
  - BroadcastCallbackExecuted: removed

AssethubIngressEgress:
  - CcmEgressInvalid:
    - error: added (AssethubIngressEgress.CcmEgressInvalid.error.1.9.14)
  - DepositFailed:
    - reason: added (AssethubIngressEgress.DepositFailed.reason.3.14)
    - details: added (AssethubIngressEgress.DepositFailed.details.1.vaultWitness.outputAsset.14)
  - FailedToBuildAllBatchCall:
    - error: added (AssethubIngressEgress.FailedToBuildAllBatchCall.error.5.9.14)

BitcoinBroadcaster:
  - BroadcastCallbackExecuted: removed

BitcoinIngressEgress:
  - CcmEgressInvalid:
    - error: added (BitcoinIngressEgress.CcmEgressInvalid.error.1.9.14)
  - DepositFailed:
    - reason: added (BitcoinIngressEgress.DepositFailed.reason.3.14)
    - details: added (BitcoinIngressEgress.DepositFailed.details.1.vaultWitness.outputAsset.14)
  - FailedToBuildAllBatchCall:
    - error: added (BitcoinIngressEgress.FailedToBuildAllBatchCall.error.5.9.14)

BitcoinThresholdSigner:
  - ThresholdDispatchComplete:
    - result: added (BitcoinThresholdSigner.ThresholdDispatchComplete.result.1.14)

Emissions:
  - FlipBurnSkipped:
    - reason: added (Emissions.FlipBurnSkipped.reason.14)

Environment:
  - AddedNewArbAsset:
    - 0: added (Environment.AddedNewArbAsset.0.2)
  - AddedNewEthAsset:
    - 0: added (Environment.AddedNewEthAsset.0.4)
  - RuntimeSafeModeUpdated:
    - safeMode: added (Environment.RuntimeSafeModeUpdated.safeMode.2.ethereumElections)
  - UpdatedArbAsset:
    - 0: added (Environment.UpdatedArbAsset.0.2)
  - UpdatedEthAsset:
    - 0: added (Environment.UpdatedEthAsset.0.4)

EthereumBroadcaster:
  - BroadcastCallbackExecuted: removed

EthereumIngressEgress:
  - AssetEgressStatusChanged:
    - asset: added (EthereumIngressEgress.AssetEgressStatusChanged.asset.4)
  - CcmEgressInvalid:
    - error: added (EthereumIngressEgress.CcmEgressInvalid.error.1.9.14)
  - DepositBoosted:
    - asset: added (EthereumIngressEgress.DepositBoosted.asset.4)
  - DepositFailed:
    - reason: added (EthereumIngressEgress.DepositFailed.reason.3.14)
    - details: added (EthereumIngressEgress.DepositFailed.details.0.depositWitness.asset.4)
  - DepositFetchesScheduled:
    - asset: added (EthereumIngressEgress.DepositFetchesScheduled.asset.4)
  - DepositFinalised:
    - asset: added (EthereumIngressEgress.DepositFinalised.asset.4)
  - FailedToBuildAllBatchCall:
    - error: added (EthereumIngressEgress.FailedToBuildAllBatchCall.error.5.9.14)
  - InsufficientBoostLiquidity:
    - asset: added (EthereumIngressEgress.InsufficientBoostLiquidity.asset.4)
  - InvalidCcmRefunded:
    - asset: added (EthereumIngressEgress.InvalidCcmRefunded.asset.4)
  - PalletConfigUpdated:
    - update: added (EthereumIngressEgress.PalletConfigUpdated.update.1.asset.4)
  - TransferFallbackRequested:
    - asset: added (EthereumIngressEgress.TransferFallbackRequested.asset.4)

EvmThresholdSigner:
  - ThresholdDispatchComplete:
    - result: added (EvmThresholdSigner.ThresholdDispatchComplete.result.1.14)

Funding:
  - Funded:
    - source: added (Funding.Funded.source.2.asset.14)
  - RedemptionExpired:
    - txHash: added (Funding.RedemptionExpired.txHash)
  - RedemptionSettled:
    - undefined: added (Funding.RedemptionSettled)
  - SCCallCannotBeExecuted:
    - callError: added (Funding.SCCallCannotBeExecuted.callError.error.14)

Governance:
  - FailedExecution:
    - 14: added (Governance.FailedExecution.14)
  - GovKeyCallExecutionFailed:
    - error: added (Governance.GovKeyCallExecutionFailed.error.14)
  - NewGovernanceCouncil: added

LendingPools:
  - BoostFundsAdded:
    - boostPool: added (LendingPools.BoostFundsAdded.boostPool.asset.14)
  - BoostPoolCreated:
    - boostPool: added (LendingPools.BoostPoolCreated.boostPool.asset.14)
  - CollateralAdded:
    - collateral: added (LendingPools.CollateralAdded.collateral.key.14)
    - actionType: added (LendingPools.CollateralAdded.actionType.2)
  - CollateralRemoved:
    - collateral: added (LendingPools.CollateralRemoved.collateral.key.14)
  - CollateralTopupAssetUpdated:
    - collateralTopupAsset: added (LendingPools.CollateralTopupAssetUpdated.collateralTopupAsset.14)
  - LendingFundsAdded:
    - asset: added (LendingPools.LendingFundsAdded.asset.14)
  - LendingFundsRemoved:
    - asset: added (LendingPools.LendingFundsRemoved.asset.14)
  - LendingPoolCreated:
    - asset: added (LendingPools.LendingPoolCreated.asset.14)
  - LoanCreated:
    - asset: added (LendingPools.LoanCreated.asset.14)
  - LoanRepaid:
    - actionType: added (LendingPools.LoanRepaid.actionType)
  - PalletConfigUpdated:
    - update: changed (LendingPools.PalletConfigUpdated.update.0.name)
  - StoppedBoosting:
    - boostPool: added (LendingPools.StoppedBoosting.boostPool.asset.14)

LiquidityPools:
  - AssetSwapped:
    - from: added (LiquidityPools.AssetSwapped.from.14)
    - to: added (LiquidityPools.AssetSwapped.to.14)
  - LimitOrderUpdated:
    - baseAsset: added (LiquidityPools.LimitOrderUpdated.baseAsset.14)
    - quoteAsset: added (LiquidityPools.LimitOrderUpdated.quoteAsset.14)
  - NewPoolCreated:
    - baseAsset: added (LiquidityPools.NewPoolCreated.baseAsset.14)
    - quoteAsset: added (LiquidityPools.NewPoolCreated.quoteAsset.14)
  - OrderDeletionFailed:
    - order: added (LiquidityPools.OrderDeletionFailed.order.0.baseAsset.14)
  - PalletConfigUpdated:
    - update: added (LiquidityPools.PalletConfigUpdated.update.0.asset.14)
  - PoolFeeSet:
    - baseAsset: added (LiquidityPools.PoolFeeSet.baseAsset.14)
    - quoteAsset: added (LiquidityPools.PoolFeeSet.quoteAsset.14)
  - PriceImpactLimitSet:
    - assetPair: added (LiquidityPools.PriceImpactLimitSet.assetPair.assets.base.14)
  - RangeOrderUpdated:
    - baseAsset: added (LiquidityPools.RangeOrderUpdated.baseAsset.14)
    - quoteAsset: added (LiquidityPools.RangeOrderUpdated.quoteAsset.14)
  - ScheduledLimitOrderUpdateDispatchFailure:
    - error: added (LiquidityPools.ScheduledLimitOrderUpdateDispatchFailure.error.14)

LiquidityProvider:
  - AssetBalancePurgeFailed: added
  - AssetBalancePurged: added
  - AssetTransferred:
    - asset: added (LiquidityProvider.AssetTransferred.asset.14)
  - LiquidityDepositAddressReady:
    - asset: added (LiquidityProvider.LiquidityDepositAddressReady.asset.14)
  - WithdrawalEgressScheduled:
    - asset: added (LiquidityProvider.WithdrawalEgressScheduled.asset.14)

PolkadotBroadcaster:
  - BroadcastCallbackExecuted: removed

PolkadotIngressEgress:
  - CcmEgressInvalid:
    - error: added (PolkadotIngressEgress.CcmEgressInvalid.error.1.9.14)
  - DepositFailed:
    - reason: added (PolkadotIngressEgress.DepositFailed.reason.3.14)
    - details: added (PolkadotIngressEgress.DepositFailed.details.1.vaultWitness.outputAsset.14)
  - FailedToBuildAllBatchCall:
    - error: added (PolkadotIngressEgress.FailedToBuildAllBatchCall.error.5.9.14)

PolkadotThresholdSigner:
  - ThresholdDispatchComplete:
    - result: added (PolkadotThresholdSigner.ThresholdDispatchComplete.result.1.14)

Session:
  - NewQueued: added
  - ValidatorDisabled: added
  - ValidatorReenabled: added

SolanaBroadcaster:
  - BroadcastCallbackExecuted: removed

SolanaIngressEgress:
  - AssetEgressStatusChanged:
    - asset: added (SolanaIngressEgress.AssetEgressStatusChanged.asset.2)
  - CcmEgressInvalid:
    - error: added (SolanaIngressEgress.CcmEgressInvalid.error.1.9.14)
  - DepositBoosted:
    - asset: added (SolanaIngressEgress.DepositBoosted.asset.2)
  - DepositFailed:
    - reason: added (SolanaIngressEgress.DepositFailed.reason.3.14)
    - details: added (SolanaIngressEgress.DepositFailed.details.0.depositWitness.asset.2)
  - DepositFetchesScheduled:
    - asset: added (SolanaIngressEgress.DepositFetchesScheduled.asset.2)
  - DepositFinalised:
    - asset: added (SolanaIngressEgress.DepositFinalised.asset.2)
  - FailedToBuildAllBatchCall:
    - error: added (SolanaIngressEgress.FailedToBuildAllBatchCall.error.5.9.14)
  - InsufficientBoostLiquidity:
    - asset: added (SolanaIngressEgress.InsufficientBoostLiquidity.asset.2)
  - InvalidCcmRefunded:
    - asset: added (SolanaIngressEgress.InvalidCcmRefunded.asset.2)
  - PalletConfigUpdated:
    - update: added (SolanaIngressEgress.PalletConfigUpdated.update.1.asset.2)
  - TransferFallbackRequested:
    - asset: added (SolanaIngressEgress.TransferFallbackRequested.asset.2)

SolanaThresholdSigner:
  - ThresholdDispatchComplete:
    - result: added (SolanaThresholdSigner.ThresholdDispatchComplete.result.1.14)

Swapping:
  - AccountCreationDepositAddressReady:
    - asset: added (Swapping.AccountCreationDepositAddressReady.asset.14)
  - BatchSwapFailed:
    - asset: added (Swapping.BatchSwapFailed.asset.14)
  - BoundBrokerWithdrawalAddress: added
  - CreditedOnChain:
    - asset: added (Swapping.CreditedOnChain.asset.14)
  - PalletConfigUpdated:
    - update: added (Swapping.PalletConfigUpdated.update.11)
  - RefundEgressIgnored:
    - asset: added (Swapping.RefundEgressIgnored.asset.14)
    - reason: added (Swapping.RefundEgressIgnored.reason.14)
  - RefundEgressScheduled:
    - asset: added (Swapping.RefundEgressScheduled.asset.14)
    - egressFee: added (Swapping.RefundEgressScheduled.egressFee.1.14)
  - RefundedOnChain:
    - asset: added (Swapping.RefundedOnChain.asset.14)
  - SwapAmountConfiscated:
    - asset: added (Swapping.SwapAmountConfiscated.asset.14)
  - SwapDepositAddressReady:
    - sourceAsset: added (Swapping.SwapDepositAddressReady.sourceAsset.14)
    - destinationAsset: added (Swapping.SwapDepositAddressReady.destinationAsset.14)
  - SwapEgressIgnored:
    - asset: added (Swapping.SwapEgressIgnored.asset.14)
    - reason: added (Swapping.SwapEgressIgnored.reason.14)
  - SwapEgressScheduled:
    - asset: added (Swapping.SwapEgressScheduled.asset.14)
    - egressFee: added (Swapping.SwapEgressScheduled.egressFee.1.14)
  - SwapExecuted:
    - oracleDeltaExFees: added (Swapping.SwapExecuted.oracleDeltaExFees)
    - inputAsset: added (Swapping.SwapExecuted.inputAsset.14)
    - outputAsset: added (Swapping.SwapExecuted.outputAsset.14)
    - oracleDelta: changed (Swapping.SwapExecuted.oracleDelta)
  - SwapRequested:
    - inputAsset: added (Swapping.SwapRequested.inputAsset.14)
    - outputAsset: added (Swapping.SwapRequested.outputAsset.14)
  - WithdrawalRequested:
    - egressAsset: added (Swapping.WithdrawalRequested.egressAsset.14)

System:
  - ExtrinsicFailed:
    - dispatchError: added (System.ExtrinsicFailed.dispatchError.14)
  - RejectedInvalidAuthorizedUpgrade: added

TradingStrategy:
  - FundsAddedToStrategy:
    - amounts: added (TradingStrategy.FundsAddedToStrategy.amounts.key.14)
  - PalletConfigUpdated:
    - update: added (TradingStrategy.PalletConfigUpdated.update.0.asset.14)
  - StrategyDeployed:
    - strategy: added (TradingStrategy.StrategyDeployed.strategy.0.baseAsset.14)

Witnesser:
  - PrewitnessExecutionFailed:
    - error: added (Witnesser.PrewitnessExecutionFailed.error.14)
  - WitnessExecutionFailed:
    - error: added (Witnesser.WitnessExecutionFailed.error.14)
