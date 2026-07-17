New or removed pallets:
  BscBroadcaster: added
  BscChainTracking: added
  BscElections: added
  BscIngressEgress: added
  BscVault: added

ArbitrumIngressEgress:
  - BatchBroadcastRequested:
    - egressIds: added (ArbitrumIngressEgress.BatchBroadcastRequested.egressIds.0.8)
  - CcmBroadcastRequested:
    - egressId: added (ArbitrumIngressEgress.CcmBroadcastRequested.egressId.0.8)
  - CcmEgressInvalid:
    - egressId: added (ArbitrumIngressEgress.CcmEgressInvalid.egressId.0.8)
  - DepositBoosted:
    - action: added (ArbitrumIngressEgress.DepositBoosted.action.4.egressId.0.8)
  - DepositFailed:
    - details: added (ArbitrumIngressEgress.DepositFailed.details.1.vaultWitness.outputAsset.19)
  - DepositFinalised:
    - action: added (ArbitrumIngressEgress.DepositFinalised.action.4.egressId.0.8)
  - TransactionRejectionFailed:
    - reason: added (ArbitrumIngressEgress.TransactionRejectionFailed.reason)
  - TransferFallbackRequested:
    - egressDetails: added (ArbitrumIngressEgress.TransferFallbackRequested.egressDetails.egressId.0.8)

AssetBalances:
  - AccountCredited:
    - asset: added (AssetBalances.AccountCredited.asset.19)
  - AccountDebited:
    - asset: added (AssetBalances.AccountDebited.asset.19)
  - PalletConfigUpdated: added
  - RefundScheduled:
    - egressId: added (AssetBalances.RefundScheduled.egressId.0.8)
    - destination: added (AssetBalances.RefundScheduled.destination.7)
  - RefundSkipped:
    - chain: added (AssetBalances.RefundSkipped.chain.8)
    - address: added (AssetBalances.RefundSkipped.address.7)
  - VaultDeficitDetected:
    - chain: added (AssetBalances.VaultDeficitDetected.chain.8)

AssethubIngressEgress:
  - BatchBroadcastRequested:
    - egressIds: added (AssethubIngressEgress.BatchBroadcastRequested.egressIds.0.8)
  - CcmBroadcastRequested:
    - egressId: added (AssethubIngressEgress.CcmBroadcastRequested.egressId.0.8)
  - CcmEgressInvalid:
    - egressId: added (AssethubIngressEgress.CcmEgressInvalid.egressId.0.8)
  - DepositBoosted:
    - action: added (AssethubIngressEgress.DepositBoosted.action.4.egressId.0.8)
  - DepositFailed:
    - details: added (AssethubIngressEgress.DepositFailed.details.1.vaultWitness.outputAsset.19)
  - DepositFinalised:
    - action: added (AssethubIngressEgress.DepositFinalised.action.4.egressId.0.8)
  - TransactionRejectionFailed:
    - reason: added (AssethubIngressEgress.TransactionRejectionFailed.reason)
  - TransferFallbackRequested:
    - egressDetails: added (AssethubIngressEgress.TransferFallbackRequested.egressDetails.egressId.0.8)

BitcoinIngressEgress:
  - BatchBroadcastRequested:
    - egressIds: added (BitcoinIngressEgress.BatchBroadcastRequested.egressIds.0.8)
  - CcmBroadcastRequested:
    - egressId: added (BitcoinIngressEgress.CcmBroadcastRequested.egressId.0.8)
  - CcmEgressInvalid:
    - egressId: added (BitcoinIngressEgress.CcmEgressInvalid.egressId.0.8)
  - DepositBoosted:
    - action: added (BitcoinIngressEgress.DepositBoosted.action.4.egressId.0.8)
  - DepositFailed:
    - details: added (BitcoinIngressEgress.DepositFailed.details.1.vaultWitness.outputAsset.19)
  - DepositFinalised:
    - action: added (BitcoinIngressEgress.DepositFinalised.action.4.egressId.0.8)
  - TransactionRejectionFailed:
    - reason: added (BitcoinIngressEgress.TransactionRejectionFailed.reason)
  - TransferFallbackRequested:
    - egressDetails: added (BitcoinIngressEgress.TransferFallbackRequested.egressDetails.egressId.0.8)

Emissions:
  - NetworkFeeBurned:
    - egressId: added (Emissions.NetworkFeeBurned.egressId.0.8)

Environment:
  - BscInitialized: added
  - RuntimeSafeModeUpdated:
    - safeMode: added (Environment.RuntimeSafeModeUpdated.safeMode.2.broadcastBsc)

EthereumIngressEgress:
  - BatchBroadcastRequested:
    - egressIds: added (EthereumIngressEgress.BatchBroadcastRequested.egressIds.0.8)
  - CcmBroadcastRequested:
    - egressId: added (EthereumIngressEgress.CcmBroadcastRequested.egressId.0.8)
  - CcmEgressInvalid:
    - egressId: added (EthereumIngressEgress.CcmEgressInvalid.egressId.0.8)
  - DepositBoosted:
    - action: added (EthereumIngressEgress.DepositBoosted.action.4.egressId.0.8)
  - DepositFailed:
    - details: added (EthereumIngressEgress.DepositFailed.details.1.vaultWitness.outputAsset.19)
  - DepositFinalised:
    - action: added (EthereumIngressEgress.DepositFinalised.action.4.egressId.0.8)
  - TransactionRejectionFailed:
    - reason: added (EthereumIngressEgress.TransactionRejectionFailed.reason)
  - TransferFallbackRequested:
    - egressDetails: added (EthereumIngressEgress.TransferFallbackRequested.egressDetails.egressId.0.8)

Flip:
  - FlipDistributed: added
  - PalletConfigUpdated:
    - update: added (Flip.PalletConfigUpdated.update.2)

Funding:
  - Funded:
    - source: added (Funding.Funded.source.2.asset.19)

LendingPools:
  - BoostFundsAdded:
    - boostPool: added (LendingPools.BoostFundsAdded.boostPool.asset.19)
  - BoostPoolCreated:
    - boostPool: added (LendingPools.BoostPoolCreated.boostPool.asset.19)
  - LendingFundsAdded:
    - asset: added (LendingPools.LendingFundsAdded.asset.19)
  - LendingFundsRemoved:
    - asset: added (LendingPools.LendingFundsRemoved.asset.19)
  - LendingPoolCreated:
    - asset: added (LendingPools.LendingPoolCreated.asset.19)
  - LiquidationFeeTaken:
    - brokerFee: removed (LendingPools.LiquidationFeeTaken.brokerFee)
  - LoanCreated:
    - asset: added (LendingPools.LoanCreated.asset.19)
  - OriginationFeeTaken:
    - brokerFee: removed (LendingPools.OriginationFeeTaken.brokerFee)
  - PalletConfigUpdated:
    - update: added (LendingPools.PalletConfigUpdated.update.0.config.minimumAddFundsAmount.key.19)
  - StoppedBoosting:
    - boostPool: added (LendingPools.StoppedBoosting.boostPool.asset.19)
  - WhitelistUpdated: removed

LiquidityPools:
  - AssetSwapped:
    - from: added (LiquidityPools.AssetSwapped.from.19)
    - to: added (LiquidityPools.AssetSwapped.to.19)
  - LimitOrderUpdated:
    - baseAsset: added (LiquidityPools.LimitOrderUpdated.baseAsset.19)
    - quoteAsset: added (LiquidityPools.LimitOrderUpdated.quoteAsset.19)
  - NewPoolCreated:
    - baseAsset: added (LiquidityPools.NewPoolCreated.baseAsset.19)
    - quoteAsset: added (LiquidityPools.NewPoolCreated.quoteAsset.19)
  - OrderDeletionFailed:
    - order: added (LiquidityPools.OrderDeletionFailed.order.0.baseAsset.19)
  - PalletConfigUpdated:
    - update: added (LiquidityPools.PalletConfigUpdated.update.1)
  - PoolFeeSet:
    - baseAsset: added (LiquidityPools.PoolFeeSet.baseAsset.19)
    - quoteAsset: added (LiquidityPools.PoolFeeSet.quoteAsset.19)
  - PriceImpactLimitSet:
    - assetPair: added (LiquidityPools.PriceImpactLimitSet.assetPair.assets.base.19)
  - RangeOrderUpdated:
    - baseAsset: added (LiquidityPools.RangeOrderUpdated.baseAsset.19)
    - quoteAsset: added (LiquidityPools.RangeOrderUpdated.quoteAsset.19)

LiquidityProvider:
  - AssetBalancePurgeFailed:
    - asset: added (LiquidityProvider.AssetBalancePurgeFailed.asset.19)
  - AssetBalancePurged:
    - asset: added (LiquidityProvider.AssetBalancePurged.asset.19)
    - egressId: added (LiquidityProvider.AssetBalancePurged.egressId.0.8)
    - destinationAddress: added (LiquidityProvider.AssetBalancePurged.destinationAddress.7)
  - AssetTransferred:
    - asset: added (LiquidityProvider.AssetTransferred.asset.19)
  - LiquidityDepositAddressReady:
    - asset: added (LiquidityProvider.LiquidityDepositAddressReady.asset.19)
    - depositAddress: added (LiquidityProvider.LiquidityDepositAddressReady.depositAddress.7)
  - LiquidityRefundAddressRegistered:
    - chain: added (LiquidityProvider.LiquidityRefundAddressRegistered.chain.8)
    - address: added (LiquidityProvider.LiquidityRefundAddressRegistered.address.7)
  - WithdrawalEgressScheduled:
    - egressId: added (LiquidityProvider.WithdrawalEgressScheduled.egressId.0.8)
    - asset: added (LiquidityProvider.WithdrawalEgressScheduled.asset.19)
    - destinationAddress: added (LiquidityProvider.WithdrawalEgressScheduled.destinationAddress.7)

PolkadotIngressEgress:
  - BatchBroadcastRequested:
    - egressIds: added (PolkadotIngressEgress.BatchBroadcastRequested.egressIds.0.8)
  - CcmBroadcastRequested:
    - egressId: added (PolkadotIngressEgress.CcmBroadcastRequested.egressId.0.8)
  - CcmEgressInvalid:
    - egressId: added (PolkadotIngressEgress.CcmEgressInvalid.egressId.0.8)
  - DepositBoosted:
    - action: added (PolkadotIngressEgress.DepositBoosted.action.4.egressId.0.8)
  - DepositFailed:
    - details: added (PolkadotIngressEgress.DepositFailed.details.1.vaultWitness.outputAsset.19)
  - DepositFinalised:
    - action: added (PolkadotIngressEgress.DepositFinalised.action.4.egressId.0.8)
  - TransactionRejectionFailed:
    - reason: added (PolkadotIngressEgress.TransactionRejectionFailed.reason)
  - TransferFallbackRequested:
    - egressDetails: added (PolkadotIngressEgress.TransferFallbackRequested.egressDetails.egressId.0.8)

Reputation:
  - OffencePenalty:
    - offence: added (Reputation.OffencePenalty.offence.8.8)
  - PenaltyUpdated:
    - offence: added (Reputation.PenaltyUpdated.offence.8.8)

SolanaIngressEgress:
  - BatchBroadcastRequested:
    - egressIds: added (SolanaIngressEgress.BatchBroadcastRequested.egressIds.0.8)
  - CcmBroadcastRequested:
    - egressId: added (SolanaIngressEgress.CcmBroadcastRequested.egressId.0.8)
  - CcmEgressInvalid:
    - egressId: added (SolanaIngressEgress.CcmEgressInvalid.egressId.0.8)
  - DepositBoosted:
    - action: added (SolanaIngressEgress.DepositBoosted.action.4.egressId.0.8)
  - DepositFailed:
    - details: added (SolanaIngressEgress.DepositFailed.details.1.vaultWitness.outputAsset.19)
  - DepositFinalised:
    - action: added (SolanaIngressEgress.DepositFinalised.action.4.egressId.0.8)
  - TransactionRejectionFailed:
    - reason: added (SolanaIngressEgress.TransactionRejectionFailed.reason)
  - TransferFallbackRequested:
    - egressDetails: added (SolanaIngressEgress.TransferFallbackRequested.egressDetails.egressId.0.8)

Swapping:
  - AccountCreationDepositAddressReady:
    - asset: added (Swapping.AccountCreationDepositAddressReady.asset.19)
    - depositAddress: added (Swapping.AccountCreationDepositAddressReady.depositAddress.7)
    - refundAddress: added (Swapping.AccountCreationDepositAddressReady.refundAddress.7)
  - BatchSwapFailed:
    - asset: added (Swapping.BatchSwapFailed.asset.19)
  - CreditedOnChain:
    - asset: added (Swapping.CreditedOnChain.asset.19)
  - FlipTransferToGatewaySkipped: added
  - PalletConfigUpdated:
    - update: added (Swapping.PalletConfigUpdated.update.0.asset.19)
  - RefundEgressIgnored:
    - asset: added (Swapping.RefundEgressIgnored.asset.19)
  - RefundEgressScheduled:
    - egressId: added (Swapping.RefundEgressScheduled.egressId.0.8)
    - asset: added (Swapping.RefundEgressScheduled.asset.19)
    - egressFee: added (Swapping.RefundEgressScheduled.egressFee.1.19)
  - RefundedOnChain:
    - asset: added (Swapping.RefundedOnChain.asset.19)
  - SentFlipToGateway: added
  - SwapAmountConfiscated:
    - asset: added (Swapping.SwapAmountConfiscated.asset.19)
  - SwapDepositAddressReady:
    - depositAddress: added (Swapping.SwapDepositAddressReady.depositAddress.7)
    - destinationAddress: added (Swapping.SwapDepositAddressReady.destinationAddress.7)
    - sourceAsset: added (Swapping.SwapDepositAddressReady.sourceAsset.19)
    - destinationAsset: added (Swapping.SwapDepositAddressReady.destinationAsset.19)
    - refundParameters: added (Swapping.SwapDepositAddressReady.refundParameters.refundAddress.7)
  - SwapEgressIgnored:
    - asset: added (Swapping.SwapEgressIgnored.asset.19)
  - SwapEgressScheduled:
    - egressId: added (Swapping.SwapEgressScheduled.egressId.0.8)
    - asset: added (Swapping.SwapEgressScheduled.asset.19)
    - egressFee: added (Swapping.SwapEgressScheduled.egressFee.1.19)
  - SwapExecuted:
    - inputAsset: added (Swapping.SwapExecuted.inputAsset.19)
    - outputAsset: added (Swapping.SwapExecuted.outputAsset.19)
  - SwapRequested:
    - inputAsset: added (Swapping.SwapRequested.inputAsset.19)
    - outputAsset: added (Swapping.SwapRequested.outputAsset.19)
    - origin: added (Swapping.SwapRequested.origin.0.depositAddress.7)
    - requestType: added (Swapping.SwapRequested.requestType.2.outputAction.0.ccmDepositMetadata.sourceChain.8)
    - priceLimitsAndExpiry: added (Swapping.SwapRequested.priceLimitsAndExpiry.expiryBehaviour.1.refundAddress.1.7)
  - WithdrawalRequested:
    - egressId: added (Swapping.WithdrawalRequested.egressId.0.8)
    - egressAsset: added (Swapping.WithdrawalRequested.egressAsset.19)
    - destinationAddress: added (Swapping.WithdrawalRequested.destinationAddress.7)

TokenholderGovernance:
  - GovKeyUpdatedHasFailed:
    - chain: added (TokenholderGovernance.GovKeyUpdatedHasFailed.chain.8)
  - GovKeyUpdatedWasSuccessful:
    - chain: added (TokenholderGovernance.GovKeyUpdatedWasSuccessful.chain.8)
  - ProposalEnacted:
    - proposal: added (TokenholderGovernance.ProposalEnacted.proposal.0.0.8)
  - ProposalPassed:
    - proposal: added (TokenholderGovernance.ProposalPassed.proposal.0.0.8)
  - ProposalRejected:
    - proposal: added (TokenholderGovernance.ProposalRejected.proposal.0.0.8)
  - ProposalSubmitted:
    - proposal: added (TokenholderGovernance.ProposalSubmitted.proposal.0.0.8)

TradingStrategy:
  - FundsAddedToStrategy:
    - amounts: added (TradingStrategy.FundsAddedToStrategy.amounts.key.19)
  - PalletConfigUpdated:
    - update: added (TradingStrategy.PalletConfigUpdated.update.0.asset.19)
  - StrategyDeployed:
    - strategy: added (TradingStrategy.StrategyDeployed.strategy.0.baseAsset.19)

TronIngressEgress:
  - BatchBroadcastRequested:
    - egressIds: added (TronIngressEgress.BatchBroadcastRequested.egressIds.0.8)
  - CcmBroadcastRequested:
    - egressId: added (TronIngressEgress.CcmBroadcastRequested.egressId.0.8)
  - CcmEgressInvalid:
    - egressId: added (TronIngressEgress.CcmEgressInvalid.egressId.0.8)
  - DepositBoosted:
    - action: added (TronIngressEgress.DepositBoosted.action.4.egressId.0.8)
  - DepositFailed:
    - details: added (TronIngressEgress.DepositFailed.details.1.vaultWitness.outputAsset.19)
  - DepositFinalised:
    - action: added (TronIngressEgress.DepositFinalised.action.4.egressId.0.8)
  - TransactionRejectionFailed:
    - reason: added (TronIngressEgress.TransactionRejectionFailed.reason)
  - TransferFallbackRequested:
    - egressDetails: added (TronIngressEgress.TransferFallbackRequested.egressDetails.egressId.0.8)

Validator:
  - WitnessingTaskRestarted:
    - task: added (Validator.WitnessingTaskRestarted.task.7)
