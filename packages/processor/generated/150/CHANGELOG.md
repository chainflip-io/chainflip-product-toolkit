New or removed pallets:
  AssetBalances: added
  SolanaBroadcaster: added
  SolanaChainTracking: added
  SolanaIngressEgress: added
  SolanaThresholdSigner: added
  SolanaVault: added

ArbitrumIngressEgress:
  - BatchBroadcastRequested:
    - egressIds: added (ArbitrumIngressEgress.BatchBroadcastRequested.egressIds.0.5)
  - CcmBroadcastRequested:
    - egressId: added (ArbitrumIngressEgress.CcmBroadcastRequested.egressId.0.5)
  - CcmEgressInvalid:
    - egressId: added (ArbitrumIngressEgress.CcmEgressInvalid.egressId.0.5)
  - DepositBoosted:
    - blockHeight: added (ArbitrumIngressEgress.DepositBoosted.blockHeight)
    - depositDetails: added (ArbitrumIngressEgress.DepositBoosted.depositDetails)
  - DepositFinalised:
    - blockHeight: added (ArbitrumIngressEgress.DepositFinalised.blockHeight)
    - depositDetails: added (ArbitrumIngressEgress.DepositFinalised.depositDetails)
  - DepositIgnored:
    - depositDetails: added (ArbitrumIngressEgress.DepositIgnored.depositDetails)
  - DepositWitnessRejected:
    - depositWitness: added (ArbitrumIngressEgress.DepositWitnessRejected.depositWitness.depositDetails)
  - MaxSwapRetryDurationSet: added

BitcoinIngressEgress:
  - BatchBroadcastRequested:
    - egressIds: added (BitcoinIngressEgress.BatchBroadcastRequested.egressIds.0.5)
  - CcmBroadcastRequested:
    - egressId: added (BitcoinIngressEgress.CcmBroadcastRequested.egressId.0.5)
  - CcmEgressInvalid:
    - egressId: added (BitcoinIngressEgress.CcmEgressInvalid.egressId.0.5)
  - DepositBoosted:
    - blockHeight: added (BitcoinIngressEgress.DepositBoosted.blockHeight)
  - DepositFinalised:
    - blockHeight: added (BitcoinIngressEgress.DepositFinalised.blockHeight)
  - MaxSwapRetryDurationSet: added

Emissions:
  - NetworkFeeBurned:
    - egressId: added (Emissions.NetworkFeeBurned.egressId.0.5)

Environment:
  - RuntimeSafeModeUpdated:
    - safeMode: added (Environment.RuntimeSafeModeUpdated.safeMode.2.assetBalances)

EthereumIngressEgress:
  - BatchBroadcastRequested:
    - egressIds: added (EthereumIngressEgress.BatchBroadcastRequested.egressIds.0.5)
  - CcmBroadcastRequested:
    - egressId: added (EthereumIngressEgress.CcmBroadcastRequested.egressId.0.5)
  - CcmEgressInvalid:
    - egressId: added (EthereumIngressEgress.CcmEgressInvalid.egressId.0.5)
  - DepositBoosted:
    - blockHeight: added (EthereumIngressEgress.DepositBoosted.blockHeight)
    - depositDetails: added (EthereumIngressEgress.DepositBoosted.depositDetails)
  - DepositFinalised:
    - blockHeight: added (EthereumIngressEgress.DepositFinalised.blockHeight)
    - depositDetails: added (EthereumIngressEgress.DepositFinalised.depositDetails)
  - DepositIgnored:
    - depositDetails: added (EthereumIngressEgress.DepositIgnored.depositDetails)
  - DepositWitnessRejected:
    - depositWitness: added (EthereumIngressEgress.DepositWitnessRejected.depositWitness.depositDetails)
  - MaxSwapRetryDurationSet: added

LiquidityPools:
  - AssetSwapped:
    - from: added (LiquidityPools.AssetSwapped.from.9)
    - to: added (LiquidityPools.AssetSwapped.to.9)
  - LimitOrderUpdated:
    - baseAsset: added (LiquidityPools.LimitOrderUpdated.baseAsset.9)
    - quoteAsset: added (LiquidityPools.LimitOrderUpdated.quoteAsset.9)
  - NetworkFeeTaken: removed
  - NewPoolCreated:
    - baseAsset: added (LiquidityPools.NewPoolCreated.baseAsset.9)
    - quoteAsset: added (LiquidityPools.NewPoolCreated.quoteAsset.9)
  - PoolFeeSet:
    - baseAsset: added (LiquidityPools.PoolFeeSet.baseAsset.9)
    - quoteAsset: added (LiquidityPools.PoolFeeSet.quoteAsset.9)
  - PriceImpactLimitSet:
    - assetPair: added (LiquidityPools.PriceImpactLimitSet.assetPair.assets.base.9)
  - RangeOrderUpdated:
    - baseAsset: added (LiquidityPools.RangeOrderUpdated.baseAsset.9)
    - quoteAsset: added (LiquidityPools.RangeOrderUpdated.quoteAsset.9)
  - UpdatedBuyInterval: removed

LiquidityProvider:
  - AccountCredited:
    - asset: added (LiquidityProvider.AccountCredited.asset.9)
  - AccountDebited:
    - asset: added (LiquidityProvider.AccountDebited.asset.9)
  - AssetTransferred:
    - asset: added (LiquidityProvider.AssetTransferred.asset.9)
  - LiquidityDepositAddressReady:
    - asset: added (LiquidityProvider.LiquidityDepositAddressReady.asset.9)
    - depositAddress: added (LiquidityProvider.LiquidityDepositAddressReady.depositAddress.4)
  - LiquidityDepositCredited:
    - asset: added (LiquidityProvider.LiquidityDepositCredited.asset.9)
  - LiquidityRefundAddressRegistered:
    - chain: added (LiquidityProvider.LiquidityRefundAddressRegistered.chain.5)
    - address: added (LiquidityProvider.LiquidityRefundAddressRegistered.address.4)
  - WithdrawalEgressScheduled:
    - egressId: added (LiquidityProvider.WithdrawalEgressScheduled.egressId.0.5)
    - asset: added (LiquidityProvider.WithdrawalEgressScheduled.asset.9)
    - destinationAddress: added (LiquidityProvider.WithdrawalEgressScheduled.destinationAddress.4)

PolkadotIngressEgress:
  - BatchBroadcastRequested:
    - egressIds: added (PolkadotIngressEgress.BatchBroadcastRequested.egressIds.0.5)
  - CcmBroadcastRequested:
    - egressId: added (PolkadotIngressEgress.CcmBroadcastRequested.egressId.0.5)
  - CcmEgressInvalid:
    - egressId: added (PolkadotIngressEgress.CcmEgressInvalid.egressId.0.5)
  - DepositBoosted:
    - blockHeight: added (PolkadotIngressEgress.DepositBoosted.blockHeight)
    - depositDetails: changed (PolkadotIngressEgress.DepositBoosted.depositDetails)
  - DepositFinalised:
    - blockHeight: added (PolkadotIngressEgress.DepositFinalised.blockHeight)
    - depositDetails: changed (PolkadotIngressEgress.DepositFinalised.depositDetails)
  - DepositIgnored:
    - depositDetails: changed (PolkadotIngressEgress.DepositIgnored.depositDetails)
  - DepositWitnessRejected:
    - depositWitness: changed (PolkadotIngressEgress.DepositWitnessRejected.depositWitness.depositDetails)
  - MaxSwapRetryDurationSet: added

Swapping:
  - BatchSwapFailed:
    - asset: added (Swapping.BatchSwapFailed.asset.9)
  - BuyIntervalSet: added
  - CcmDepositReceived:
    - destinationAddress: added (Swapping.CcmDepositReceived.destinationAddress.4)
    - depositMetadata: added (Swapping.CcmDepositReceived.depositMetadata.sourceChain.5)
  - CcmEgressScheduled:
    - egressId: added (Swapping.CcmEgressScheduled.egressId.0.5)
  - CcmFailed:
    - destinationAddress: added (Swapping.CcmFailed.destinationAddress.4)
    - depositMetadata: added (Swapping.CcmFailed.depositMetadata.sourceChain.5)
    - origin: added (Swapping.CcmFailed.origin.0.depositAddress.4)
  - MaximumSwapAmountSet:
    - asset: added (Swapping.MaximumSwapAmountSet.asset.9)
  - NetworkFeeTaken: added
  - RefundEgressIgnored: added
  - RefundEgressScheduled: added
  - SwapAmountConfiscated:
    - sourceAsset: added (Swapping.SwapAmountConfiscated.sourceAsset.9)
    - destinationAsset: added (Swapping.SwapAmountConfiscated.destinationAsset.9)
  - SwapDepositAddressReady:
    - refundParameters: added (Swapping.SwapDepositAddressReady.refundParameters)
    - depositAddress: added (Swapping.SwapDepositAddressReady.depositAddress.4)
    - destinationAddress: added (Swapping.SwapDepositAddressReady.destinationAddress.4)
    - sourceAsset: added (Swapping.SwapDepositAddressReady.sourceAsset.9)
    - destinationAsset: added (Swapping.SwapDepositAddressReady.destinationAsset.9)
  - SwapEgressIgnored:
    - asset: added (Swapping.SwapEgressIgnored.asset.9)
  - SwapEgressScheduled:
    - egressId: added (Swapping.SwapEgressScheduled.egressId.0.5)
    - asset: added (Swapping.SwapEgressScheduled.asset.9)
  - SwapExecuted:
    - sourceAsset: added (Swapping.SwapExecuted.sourceAsset.9)
    - destinationAsset: added (Swapping.SwapExecuted.destinationAsset.9)
    - swapType: added (Swapping.SwapExecuted.swapType.0.4)
  - SwapRescheduled: added
  - SwapRetryDelaySet: added
  - SwapScheduled:
    - sourceAsset: added (Swapping.SwapScheduled.sourceAsset.9)
    - destinationAsset: added (Swapping.SwapScheduled.destinationAsset.9)
    - destinationAddress: added (Swapping.SwapScheduled.destinationAddress.4)
    - origin: added (Swapping.SwapScheduled.origin.0.depositAddress.4)
    - swapType: added (Swapping.SwapScheduled.swapType.0.4)
  - WithdrawalRequested:
    - egressId: added (Swapping.WithdrawalRequested.egressId.0.5)
    - egressAsset: added (Swapping.WithdrawalRequested.egressAsset.9)
    - destinationAddress: added (Swapping.WithdrawalRequested.destinationAddress.4)

TokenholderGovernance:
  - GovKeyUpdatedHasFailed:
    - chain: added (TokenholderGovernance.GovKeyUpdatedHasFailed.chain.5)
  - GovKeyUpdatedWasSuccessful:
    - chain: added (TokenholderGovernance.GovKeyUpdatedWasSuccessful.chain.5)
  - ProposalEnacted:
    - proposal: added (TokenholderGovernance.ProposalEnacted.proposal.0.0.5)
  - ProposalPassed:
    - proposal: added (TokenholderGovernance.ProposalPassed.proposal.0.0.5)
  - ProposalRejected:
    - proposal: added (TokenholderGovernance.ProposalRejected.proposal.0.0.5)
  - ProposalSubmitted:
    - proposal: added (TokenholderGovernance.ProposalSubmitted.proposal.0.0.5)

Validator:
  - PeerIdRegistered: removed
  - PeerIdUnregistered: removed
