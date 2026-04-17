New or removed pallets:
  TronBroadcaster: added
  TronChainTracking: added
  TronElections: added
  TronIngressEgress: added
  TronVault: added

ArbitrumBroadcaster:
  - CallResigned:
    - transactionPayload: added (ArbitrumBroadcaster.CallResigned.transactionPayload)

ArbitrumIngressEgress:
  - BatchBroadcastRequested:
    - egressIds: added (ArbitrumIngressEgress.BatchBroadcastRequested.egressIds.0.7)
  - CcmBroadcastRequested:
    - egressId: added (ArbitrumIngressEgress.CcmBroadcastRequested.egressId.0.7)
  - CcmEgressInvalid:
    - egressId: added (ArbitrumIngressEgress.CcmEgressInvalid.egressId.0.7)
  - DepositBoosted:
    - action: added (ArbitrumIngressEgress.DepositBoosted.action.4.egressId.0.7)
  - DepositFailed:
    - details: added (ArbitrumIngressEgress.DepositFailed.details.1.vaultWitness.outputAsset.17)
  - DepositFinalised:
    - action: added (ArbitrumIngressEgress.DepositFinalised.action.4.egressId.0.7)
  - TransferFallbackRequested:
    - egressDetails: added (ArbitrumIngressEgress.TransferFallbackRequested.egressDetails.egressId.0.7)

AssetBalances:
  - AccountCredited:
    - asset: added (AssetBalances.AccountCredited.asset.17)
  - AccountDebited:
    - asset: added (AssetBalances.AccountDebited.asset.17)
  - RefundScheduled:
    - egressId: added (AssetBalances.RefundScheduled.egressId.0.7)
    - destination: added (AssetBalances.RefundScheduled.destination.6)
  - RefundSkipped:
    - chain: added (AssetBalances.RefundSkipped.chain.7)
    - address: added (AssetBalances.RefundSkipped.address.6)
  - VaultDeficitDetected:
    - chain: added (AssetBalances.VaultDeficitDetected.chain.7)

AssethubBroadcaster:
  - CallResigned:
    - transactionPayload: added (AssethubBroadcaster.CallResigned.transactionPayload)

AssethubIngressEgress:
  - BatchBroadcastRequested:
    - egressIds: added (AssethubIngressEgress.BatchBroadcastRequested.egressIds.0.7)
  - CcmBroadcastRequested:
    - egressId: added (AssethubIngressEgress.CcmBroadcastRequested.egressId.0.7)
  - CcmEgressInvalid:
    - egressId: added (AssethubIngressEgress.CcmEgressInvalid.egressId.0.7)
  - DepositBoosted:
    - action: added (AssethubIngressEgress.DepositBoosted.action.4.egressId.0.7)
  - DepositFailed:
    - details: added (AssethubIngressEgress.DepositFailed.details.1.vaultWitness.outputAsset.17)
  - DepositFinalised:
    - action: added (AssethubIngressEgress.DepositFinalised.action.4.egressId.0.7)
  - TransferFallbackRequested:
    - egressDetails: added (AssethubIngressEgress.TransferFallbackRequested.egressDetails.egressId.0.7)

BitcoinBroadcaster:
  - CallResigned:
    - transactionPayload: added (BitcoinBroadcaster.CallResigned.transactionPayload)

BitcoinIngressEgress:
  - BatchBroadcastRequested:
    - egressIds: added (BitcoinIngressEgress.BatchBroadcastRequested.egressIds.0.7)
  - CcmBroadcastRequested:
    - egressId: added (BitcoinIngressEgress.CcmBroadcastRequested.egressId.0.7)
  - CcmEgressInvalid:
    - egressId: added (BitcoinIngressEgress.CcmEgressInvalid.egressId.0.7)
  - DepositBoosted:
    - action: added (BitcoinIngressEgress.DepositBoosted.action.4.egressId.0.7)
  - DepositFailed:
    - details: added (BitcoinIngressEgress.DepositFailed.details.1.vaultWitness.outputAsset.17)
  - DepositFinalised:
    - action: added (BitcoinIngressEgress.DepositFinalised.action.4.egressId.0.7)
  - TransferFallbackRequested:
    - egressDetails: added (BitcoinIngressEgress.TransferFallbackRequested.egressDetails.egressId.0.7)

Emissions:
  - NetworkFeeBurned:
    - egressId: added (Emissions.NetworkFeeBurned.egressId.0.7)

Environment:
  - RuntimeSafeModeUpdated:
    - safeMode: added (Environment.RuntimeSafeModeUpdated.safeMode.2.broadcastTron)
  - TronInitialized: added

EthereumBroadcaster:
  - CallResigned:
    - transactionPayload: added (EthereumBroadcaster.CallResigned.transactionPayload)

EthereumIngressEgress:
  - BatchBroadcastRequested:
    - egressIds: added (EthereumIngressEgress.BatchBroadcastRequested.egressIds.0.7)
  - CcmBroadcastRequested:
    - egressId: added (EthereumIngressEgress.CcmBroadcastRequested.egressId.0.7)
  - CcmEgressInvalid:
    - egressId: added (EthereumIngressEgress.CcmEgressInvalid.egressId.0.7)
  - DepositBoosted:
    - action: added (EthereumIngressEgress.DepositBoosted.action.4.egressId.0.7)
  - DepositFailed:
    - details: added (EthereumIngressEgress.DepositFailed.details.1.vaultWitness.outputAsset.17)
  - DepositFinalised:
    - action: added (EthereumIngressEgress.DepositFinalised.action.4.egressId.0.7)
  - TransferFallbackRequested:
    - egressDetails: added (EthereumIngressEgress.TransferFallbackRequested.egressDetails.egressId.0.7)

Funding:
  - Funded:
    - source: added (Funding.Funded.source.2.asset.17)

LendingPools:
  - BoostFundsAdded:
    - boostPool: added (LendingPools.BoostFundsAdded.boostPool.asset.17)
  - BoostPoolCreated:
    - boostPool: added (LendingPools.BoostPoolCreated.boostPool.asset.17)
  - CollateralAdded:
    - collateral: added (LendingPools.CollateralAdded.collateral.key.17)
  - CollateralRemoved:
    - collateral: added (LendingPools.CollateralRemoved.collateral.key.17)
  - CollateralTopupAssetUpdated:
    - collateralTopupAsset: added (LendingPools.CollateralTopupAssetUpdated.collateralTopupAsset.17)
  - LendingFundsAdded:
    - asset: added (LendingPools.LendingFundsAdded.asset.17)
  - LendingFundsRemoved:
    - asset: added (LendingPools.LendingFundsRemoved.asset.17)
  - LendingPoolCreated:
    - asset: added (LendingPools.LendingPoolCreated.asset.17)
  - LoanCreated:
    - asset: added (LendingPools.LoanCreated.asset.17)
  - PalletConfigUpdated:
    - update: added (LendingPools.PalletConfigUpdated.update.0.config.minimumAddFundsAmount.key.17)
  - StoppedBoosting:
    - boostPool: added (LendingPools.StoppedBoosting.boostPool.asset.17)

LiquidityPools:
  - AssetSwapped:
    - from: added (LiquidityPools.AssetSwapped.from.17)
    - to: added (LiquidityPools.AssetSwapped.to.17)
  - LimitOrderUpdated:
    - baseAsset: added (LiquidityPools.LimitOrderUpdated.baseAsset.17)
    - quoteAsset: added (LiquidityPools.LimitOrderUpdated.quoteAsset.17)
  - NewPoolCreated:
    - baseAsset: added (LiquidityPools.NewPoolCreated.baseAsset.17)
    - quoteAsset: added (LiquidityPools.NewPoolCreated.quoteAsset.17)
  - OrderDeletionFailed:
    - order: added (LiquidityPools.OrderDeletionFailed.order.0.baseAsset.17)
  - PalletConfigUpdated:
    - update: added (LiquidityPools.PalletConfigUpdated.update.0.asset.17)
  - PoolFeeSet:
    - baseAsset: added (LiquidityPools.PoolFeeSet.baseAsset.17)
    - quoteAsset: added (LiquidityPools.PoolFeeSet.quoteAsset.17)
  - PriceImpactLimitSet:
    - assetPair: added (LiquidityPools.PriceImpactLimitSet.assetPair.assets.base.17)
  - RangeOrderUpdated:
    - baseAsset: added (LiquidityPools.RangeOrderUpdated.baseAsset.17)
    - quoteAsset: added (LiquidityPools.RangeOrderUpdated.quoteAsset.17)

LiquidityProvider:
  - AssetBalancePurgeFailed:
    - asset: added (LiquidityProvider.AssetBalancePurgeFailed.asset.17)
  - AssetBalancePurged:
    - asset: added (LiquidityProvider.AssetBalancePurged.asset.17)
    - egressId: added (LiquidityProvider.AssetBalancePurged.egressId.0.7)
    - destinationAddress: added (LiquidityProvider.AssetBalancePurged.destinationAddress.6)
  - AssetTransferred:
    - asset: added (LiquidityProvider.AssetTransferred.asset.17)
  - LiquidityDepositAddressReady:
    - asset: added (LiquidityProvider.LiquidityDepositAddressReady.asset.17)
    - depositAddress: added (LiquidityProvider.LiquidityDepositAddressReady.depositAddress.6)
  - LiquidityRefundAddressRegistered:
    - chain: added (LiquidityProvider.LiquidityRefundAddressRegistered.chain.7)
    - address: added (LiquidityProvider.LiquidityRefundAddressRegistered.address.6)
  - WithdrawalEgressScheduled:
    - egressId: added (LiquidityProvider.WithdrawalEgressScheduled.egressId.0.7)
    - asset: added (LiquidityProvider.WithdrawalEgressScheduled.asset.17)
    - destinationAddress: added (LiquidityProvider.WithdrawalEgressScheduled.destinationAddress.6)

PolkadotBroadcaster:
  - CallResigned:
    - transactionPayload: added (PolkadotBroadcaster.CallResigned.transactionPayload)

PolkadotIngressEgress:
  - BatchBroadcastRequested:
    - egressIds: added (PolkadotIngressEgress.BatchBroadcastRequested.egressIds.0.7)
  - CcmBroadcastRequested:
    - egressId: added (PolkadotIngressEgress.CcmBroadcastRequested.egressId.0.7)
  - CcmEgressInvalid:
    - egressId: added (PolkadotIngressEgress.CcmEgressInvalid.egressId.0.7)
  - DepositBoosted:
    - action: added (PolkadotIngressEgress.DepositBoosted.action.4.egressId.0.7)
  - DepositFailed:
    - details: added (PolkadotIngressEgress.DepositFailed.details.1.vaultWitness.outputAsset.17)
  - DepositFinalised:
    - action: added (PolkadotIngressEgress.DepositFinalised.action.4.egressId.0.7)
  - TransferFallbackRequested:
    - egressDetails: added (PolkadotIngressEgress.TransferFallbackRequested.egressDetails.egressId.0.7)

Reputation:
  - OffencePenalty:
    - offence: added (Reputation.OffencePenalty.offence.8.7)
  - PenaltyUpdated:
    - offence: added (Reputation.PenaltyUpdated.offence.8.7)

SolanaBroadcaster:
  - CallResigned:
    - transactionPayload: added (SolanaBroadcaster.CallResigned.transactionPayload)

SolanaIngressEgress:
  - BatchBroadcastRequested:
    - egressIds: added (SolanaIngressEgress.BatchBroadcastRequested.egressIds.0.7)
  - CcmBroadcastRequested:
    - egressId: added (SolanaIngressEgress.CcmBroadcastRequested.egressId.0.7)
  - CcmEgressInvalid:
    - egressId: added (SolanaIngressEgress.CcmEgressInvalid.egressId.0.7)
  - DepositBoosted:
    - action: added (SolanaIngressEgress.DepositBoosted.action.4.egressId.0.7)
  - DepositFailed:
    - details: added (SolanaIngressEgress.DepositFailed.details.1.vaultWitness.outputAsset.17)
  - DepositFinalised:
    - action: added (SolanaIngressEgress.DepositFinalised.action.4.egressId.0.7)
  - TransferFallbackRequested:
    - egressDetails: added (SolanaIngressEgress.TransferFallbackRequested.egressDetails.egressId.0.7)

Swapping:
  - AccountCreationDepositAddressReady:
    - asset: added (Swapping.AccountCreationDepositAddressReady.asset.17)
    - depositAddress: added (Swapping.AccountCreationDepositAddressReady.depositAddress.6)
    - refundAddress: added (Swapping.AccountCreationDepositAddressReady.refundAddress.6)
  - AffiliateDeregistration: added
  - BatchSwapFailed:
    - asset: added (Swapping.BatchSwapFailed.asset.17)
  - CreditedOnChain:
    - asset: added (Swapping.CreditedOnChain.asset.17)
  - PalletConfigUpdated:
    - update: added (Swapping.PalletConfigUpdated.update.0.asset.17)
  - RefundEgressIgnored:
    - asset: added (Swapping.RefundEgressIgnored.asset.17)
  - RefundEgressScheduled:
    - egressId: added (Swapping.RefundEgressScheduled.egressId.0.7)
    - asset: added (Swapping.RefundEgressScheduled.asset.17)
    - egressFee: added (Swapping.RefundEgressScheduled.egressFee.1.17)
  - RefundedOnChain:
    - asset: added (Swapping.RefundedOnChain.asset.17)
  - SwapAmountConfiscated:
    - asset: added (Swapping.SwapAmountConfiscated.asset.17)
  - SwapDepositAddressReady:
    - depositAddress: added (Swapping.SwapDepositAddressReady.depositAddress.6)
    - destinationAddress: added (Swapping.SwapDepositAddressReady.destinationAddress.6)
    - sourceAsset: added (Swapping.SwapDepositAddressReady.sourceAsset.17)
    - destinationAsset: added (Swapping.SwapDepositAddressReady.destinationAsset.17)
    - refundParameters: added (Swapping.SwapDepositAddressReady.refundParameters.refundAddress.6)
  - SwapEgressIgnored:
    - asset: added (Swapping.SwapEgressIgnored.asset.17)
  - SwapEgressScheduled:
    - egressId: added (Swapping.SwapEgressScheduled.egressId.0.7)
    - asset: added (Swapping.SwapEgressScheduled.asset.17)
    - egressFee: added (Swapping.SwapEgressScheduled.egressFee.1.17)
  - SwapExecuted:
    - inputAsset: added (Swapping.SwapExecuted.inputAsset.17)
    - outputAsset: added (Swapping.SwapExecuted.outputAsset.17)
  - SwapRequested:
    - inputAsset: added (Swapping.SwapRequested.inputAsset.17)
    - outputAsset: added (Swapping.SwapRequested.outputAsset.17)
    - origin: added (Swapping.SwapRequested.origin.0.depositAddress.6)
    - requestType: added (Swapping.SwapRequested.requestType.2.outputAction.0.ccmDepositMetadata.sourceChain.7)
    - priceLimitsAndExpiry: added (Swapping.SwapRequested.priceLimitsAndExpiry.expiryBehaviour.1.refundAddress.1.6)
  - WithdrawalRequested:
    - egressId: added (Swapping.WithdrawalRequested.egressId.0.7)
    - egressAsset: added (Swapping.WithdrawalRequested.egressAsset.17)
    - destinationAddress: added (Swapping.WithdrawalRequested.destinationAddress.6)

TokenholderGovernance:
  - GovKeyUpdatedHasFailed:
    - chain: added (TokenholderGovernance.GovKeyUpdatedHasFailed.chain.7)
  - GovKeyUpdatedWasSuccessful:
    - chain: added (TokenholderGovernance.GovKeyUpdatedWasSuccessful.chain.7)
  - ProposalEnacted:
    - proposal: added (TokenholderGovernance.ProposalEnacted.proposal.0.0.7)
  - ProposalPassed:
    - proposal: added (TokenholderGovernance.ProposalPassed.proposal.0.0.7)
  - ProposalRejected:
    - proposal: added (TokenholderGovernance.ProposalRejected.proposal.0.0.7)
  - ProposalSubmitted:
    - proposal: added (TokenholderGovernance.ProposalSubmitted.proposal.0.0.7)

TradingStrategy:
  - FundsAddedToStrategy:
    - amounts: added (TradingStrategy.FundsAddedToStrategy.amounts.key.17)
  - PalletConfigUpdated:
    - update: added (TradingStrategy.PalletConfigUpdated.update.0.asset.17)
  - StrategyDeployed:
    - strategy: added (TradingStrategy.StrategyDeployed.strategy.3)

Validator:
  - WitnessingTaskRestarted: added
