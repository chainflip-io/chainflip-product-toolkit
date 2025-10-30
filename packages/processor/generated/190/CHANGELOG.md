New or removed pallets:
  AssethubBroadcaster: added
  AssethubChainTracking: added
  AssethubIngressEgress: added
  AssethubVault: added
  TradingStrategy: added

ArbitrumIngressEgress:
  - BatchBroadcastRequested:
    - egressIds: added (ArbitrumIngressEgress.BatchBroadcastRequested.egressIds.0.6)
  - CcmBroadcastRequested:
    - egressId: added (ArbitrumIngressEgress.CcmBroadcastRequested.egressId.0.6)
  - CcmEgressInvalid:
    - egressId: added (ArbitrumIngressEgress.CcmEgressInvalid.egressId.0.6)
    - error: added (ArbitrumIngressEgress.CcmEgressInvalid.error.3)
  - DepositBoosted:
    - action: added (ArbitrumIngressEgress.DepositBoosted.action.4)
  - DepositFailed:
    - reason: removed (ArbitrumIngressEgress.DepositFailed.reason.4)
    - details: changed (ArbitrumIngressEgress.DepositFailed.details.0.name)
  - DepositFinalised:
    - action: added (ArbitrumIngressEgress.DepositFinalised.action.4)
  - FailedToBuildAllBatchCall:
    - error: added (ArbitrumIngressEgress.FailedToBuildAllBatchCall.error.5.6.5)
  - TransferFallbackRequested:
    - egressDetails: added (ArbitrumIngressEgress.TransferFallbackRequested.egressDetails.egressId.0.6)

AssetBalances:
  - AccountCredited:
    - asset: added (AssetBalances.AccountCredited.asset.11)
  - AccountDebited:
    - asset: added (AssetBalances.AccountDebited.asset.11)
  - RefundScheduled:
    - egressId: added (AssetBalances.RefundScheduled.egressId.0.6)
    - destination: added (AssetBalances.RefundScheduled.destination.5)
  - RefundSkipped:
    - chain: added (AssetBalances.RefundSkipped.chain.6)
    - address: added (AssetBalances.RefundSkipped.address.5)
  - VaultDeficitDetected:
    - chain: added (AssetBalances.VaultDeficitDetected.chain.6)

BitcoinIngressEgress:
  - BatchBroadcastRequested:
    - egressIds: added (BitcoinIngressEgress.BatchBroadcastRequested.egressIds.0.6)
  - CcmBroadcastRequested:
    - egressId: added (BitcoinIngressEgress.CcmBroadcastRequested.egressId.0.6)
  - CcmEgressInvalid:
    - egressId: added (BitcoinIngressEgress.CcmEgressInvalid.egressId.0.6)
    - error: added (BitcoinIngressEgress.CcmEgressInvalid.error.3)
  - DepositBoosted:
    - action: added (BitcoinIngressEgress.DepositBoosted.action.4)
  - DepositFailed:
    - reason: removed (BitcoinIngressEgress.DepositFailed.reason.4)
    - details: changed (BitcoinIngressEgress.DepositFailed.details.0.name)
  - DepositFinalised:
    - action: added (BitcoinIngressEgress.DepositFinalised.action.4)
  - FailedToBuildAllBatchCall:
    - error: added (BitcoinIngressEgress.FailedToBuildAllBatchCall.error.5.6.5)
  - TransferFallbackRequested:
    - egressDetails: added (BitcoinIngressEgress.TransferFallbackRequested.egressDetails.egressId.0.6)

Emissions:
  - NetworkFeeBurned:
    - egressId: added (Emissions.NetworkFeeBurned.egressId.0.6)

Environment:
  - AssethubVaultAccountSet: added
  - RuntimeSafeModeUpdated:
    - safeMode: added (Environment.RuntimeSafeModeUpdated.safeMode.2.tradingStrategies)

EthereumIngressEgress:
  - BatchBroadcastRequested:
    - egressIds: added (EthereumIngressEgress.BatchBroadcastRequested.egressIds.0.6)
  - CcmBroadcastRequested:
    - egressId: added (EthereumIngressEgress.CcmBroadcastRequested.egressId.0.6)
  - CcmEgressInvalid:
    - egressId: added (EthereumIngressEgress.CcmEgressInvalid.egressId.0.6)
    - error: added (EthereumIngressEgress.CcmEgressInvalid.error.3)
  - DepositBoosted:
    - action: added (EthereumIngressEgress.DepositBoosted.action.4)
  - DepositFailed:
    - reason: removed (EthereumIngressEgress.DepositFailed.reason.4)
    - details: changed (EthereumIngressEgress.DepositFailed.details.0.name)
  - DepositFinalised:
    - action: added (EthereumIngressEgress.DepositFinalised.action.4)
  - FailedToBuildAllBatchCall:
    - error: added (EthereumIngressEgress.FailedToBuildAllBatchCall.error.5.6.5)
  - TransferFallbackRequested:
    - egressDetails: added (EthereumIngressEgress.TransferFallbackRequested.egressDetails.egressId.0.6)

Flip:
  - PalletConfigUpdated: added
  - SlashingRateUpdated: removed

LiquidityPools:
  - AssetSwapped:
    - from: added (LiquidityPools.AssetSwapped.from.11)
    - to: added (LiquidityPools.AssetSwapped.to.11)
  - LimitOrderUpdated:
    - baseAsset: added (LiquidityPools.LimitOrderUpdated.baseAsset.11)
    - quoteAsset: added (LiquidityPools.LimitOrderUpdated.quoteAsset.11)
  - NewPoolCreated:
    - baseAsset: added (LiquidityPools.NewPoolCreated.baseAsset.11)
    - quoteAsset: added (LiquidityPools.NewPoolCreated.quoteAsset.11)
  - OrderDeletionFailed:
    - order: added (LiquidityPools.OrderDeletionFailed.order.0.baseAsset.11)
  - PalletConfigUpdated: added
  - PoolFeeSet:
    - baseAsset: added (LiquidityPools.PoolFeeSet.baseAsset.11)
    - quoteAsset: added (LiquidityPools.PoolFeeSet.quoteAsset.11)
  - PriceImpactLimitSet:
    - assetPair: added (LiquidityPools.PriceImpactLimitSet.assetPair.assets.base.11)
  - RangeOrderUpdated:
    - baseAsset: added (LiquidityPools.RangeOrderUpdated.baseAsset.11)
    - quoteAsset: added (LiquidityPools.RangeOrderUpdated.quoteAsset.11)

LiquidityProvider:
  - AssetTransferred:
    - asset: added (LiquidityProvider.AssetTransferred.asset.11)
  - LiquidityDepositAddressReady:
    - asset: added (LiquidityProvider.LiquidityDepositAddressReady.asset.11)
    - depositAddress: added (LiquidityProvider.LiquidityDepositAddressReady.depositAddress.5)
  - LiquidityRefundAddressRegistered:
    - chain: added (LiquidityProvider.LiquidityRefundAddressRegistered.chain.6)
    - address: added (LiquidityProvider.LiquidityRefundAddressRegistered.address.5)
  - WithdrawalEgressScheduled:
    - egressId: added (LiquidityProvider.WithdrawalEgressScheduled.egressId.0.6)
    - asset: added (LiquidityProvider.WithdrawalEgressScheduled.asset.11)
    - destinationAddress: added (LiquidityProvider.WithdrawalEgressScheduled.destinationAddress.5)

PolkadotIngressEgress:
  - BatchBroadcastRequested:
    - egressIds: added (PolkadotIngressEgress.BatchBroadcastRequested.egressIds.0.6)
  - CcmBroadcastRequested:
    - egressId: added (PolkadotIngressEgress.CcmBroadcastRequested.egressId.0.6)
  - CcmEgressInvalid:
    - egressId: added (PolkadotIngressEgress.CcmEgressInvalid.egressId.0.6)
    - error: added (PolkadotIngressEgress.CcmEgressInvalid.error.3)
  - DepositBoosted:
    - action: added (PolkadotIngressEgress.DepositBoosted.action.4)
  - DepositFailed:
    - reason: removed (PolkadotIngressEgress.DepositFailed.reason.4)
    - details: changed (PolkadotIngressEgress.DepositFailed.details.0.name)
  - DepositFinalised:
    - action: added (PolkadotIngressEgress.DepositFinalised.action.4)
  - FailedToBuildAllBatchCall:
    - error: added (PolkadotIngressEgress.FailedToBuildAllBatchCall.error.5.6.5)
  - TransferFallbackRequested:
    - egressDetails: added (PolkadotIngressEgress.TransferFallbackRequested.egressDetails.egressId.0.6)

Reputation:
  - OffencePenalty:
    - offence: added (Reputation.OffencePenalty.offence.8.6)
  - PenaltyUpdated:
    - offence: added (Reputation.PenaltyUpdated.offence.8.6)

SolanaIngressEgress:
  - BatchBroadcastRequested:
    - egressIds: added (SolanaIngressEgress.BatchBroadcastRequested.egressIds.0.6)
  - CcmBroadcastRequested:
    - egressId: added (SolanaIngressEgress.CcmBroadcastRequested.egressId.0.6)
  - CcmEgressInvalid:
    - egressId: added (SolanaIngressEgress.CcmEgressInvalid.egressId.0.6)
    - error: added (SolanaIngressEgress.CcmEgressInvalid.error.3)
  - DepositBoosted:
    - action: added (SolanaIngressEgress.DepositBoosted.action.4)
  - DepositFailed:
    - reason: removed (SolanaIngressEgress.DepositFailed.reason.4)
    - details: changed (SolanaIngressEgress.DepositFailed.details.0.name)
  - DepositFinalised:
    - action: added (SolanaIngressEgress.DepositFinalised.action.4)
  - FailedToBuildAllBatchCall:
    - error: added (SolanaIngressEgress.FailedToBuildAllBatchCall.error.5.6.5)
  - TransferFallbackRequested:
    - egressDetails: added (SolanaIngressEgress.TransferFallbackRequested.egressDetails.egressId.0.6)

SolanaThresholdSigner:
  - ThresholdSignatureRequest:
    - payload: added (SolanaThresholdSigner.ThresholdSignatureRequest.payload)

Swapping:
  - BatchSwapFailed:
    - asset: added (Swapping.BatchSwapFailed.asset.11)
  - BrokerBondSet: removed
  - BuyIntervalSet: removed
  - CreditedOnChain: added
  - MaxSwapRequestDurationSet: removed
  - MaxSwapRetryDurationSet: removed
  - MaximumSwapAmountSet: removed
  - MinimumChunkSizeSet: removed
  - MinimumNetworkFeeSet: removed
  - PalletConfigUpdated: added
  - RefundEgressIgnored:
    - asset: added (Swapping.RefundEgressIgnored.asset.11)
  - RefundEgressScheduled:
    - egressId: added (Swapping.RefundEgressScheduled.egressId.0.6)
    - asset: added (Swapping.RefundEgressScheduled.asset.11)
    - egressFee: added (Swapping.RefundEgressScheduled.egressFee.1.11)
  - RefundedOnChain: added
  - SwapAmountConfiscated:
    - asset: added (Swapping.SwapAmountConfiscated.asset.11)
  - SwapDepositAddressReady:
    - depositAddress: added (Swapping.SwapDepositAddressReady.depositAddress.5)
    - destinationAddress: added (Swapping.SwapDepositAddressReady.destinationAddress.5)
    - sourceAsset: added (Swapping.SwapDepositAddressReady.sourceAsset.11)
    - destinationAsset: added (Swapping.SwapDepositAddressReady.destinationAsset.11)
    - refundParameters: added (Swapping.SwapDepositAddressReady.refundParameters.refundAddress.5)
  - SwapEgressIgnored:
    - asset: added (Swapping.SwapEgressIgnored.asset.11)
  - SwapEgressScheduled:
    - egressId: added (Swapping.SwapEgressScheduled.egressId.0.6)
    - asset: added (Swapping.SwapEgressScheduled.asset.11)
    - egressFee: added (Swapping.SwapEgressScheduled.egressFee.1.11)
  - SwapExecuted:
    - inputAsset: added (Swapping.SwapExecuted.inputAsset.11)
    - outputAsset: added (Swapping.SwapExecuted.outputAsset.11)
  - SwapRequested:
    - inputAsset: added (Swapping.SwapRequested.inputAsset.11)
    - outputAsset: added (Swapping.SwapRequested.outputAsset.11)
    - origin: added (Swapping.SwapRequested.origin.3)
    - requestType: added (Swapping.SwapRequested.requestType.2.outputAction)
    - refundParameters: added (Swapping.SwapRequested.refundParameters.refundDestination)
  - SwapRetryDelaySet: removed
  - VaultSwapMinimumBrokerFeeSet: added
  - WithdrawalRequested:
    - egressId: added (Swapping.WithdrawalRequested.egressId.0.6)
    - egressAsset: added (Swapping.WithdrawalRequested.egressAsset.11)
    - destinationAddress: added (Swapping.WithdrawalRequested.destinationAddress.5)

TokenholderGovernance:
  - GovKeyUpdatedHasFailed:
    - chain: added (TokenholderGovernance.GovKeyUpdatedHasFailed.chain.6)
  - GovKeyUpdatedWasSuccessful:
    - chain: added (TokenholderGovernance.GovKeyUpdatedWasSuccessful.chain.6)
  - ProposalEnacted:
    - proposal: added (TokenholderGovernance.ProposalEnacted.proposal.0.0.6)
  - ProposalPassed:
    - proposal: added (TokenholderGovernance.ProposalPassed.proposal.0.0.6)
  - ProposalRejected:
    - proposal: added (TokenholderGovernance.ProposalRejected.proposal.0.0.6)
  - ProposalSubmitted:
    - proposal: added (TokenholderGovernance.ProposalSubmitted.proposal.0.0.6)
