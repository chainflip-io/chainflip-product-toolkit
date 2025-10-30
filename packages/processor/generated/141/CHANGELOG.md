New or removed pallets:
  ArbitrumBroadcaster: added
  ArbitrumChainTracking: added
  ArbitrumIngressEgress: added
  ArbitrumVault: added
  EthereumThresholdSigner: removed
  EvmThresholdSigner: added

AccountRoles:
  - AccountRoleDeregistered: added
  - VanityNameSet: added

BitcoinIngressEgress:
  - BatchBroadcastRequested:
    - egressIds: added (BitcoinIngressEgress.BatchBroadcastRequested.egressIds.0.4)
  - BoostFundsAdded: added
  - BoostPoolCreated: added
  - CcmBroadcastRequested:
    - egressId: added (BitcoinIngressEgress.CcmBroadcastRequested.egressId.0.4)
  - CcmEgressInvalid:
    - egressId: added (BitcoinIngressEgress.CcmEgressInvalid.egressId.0.4)
  - DepositBoosted: added
  - DepositFinalised: added
  - DepositReceived: removed
  - InsufficientBoostLiquidity: added
  - StoppedBoosting: added

BitcoinVault:
  - ChainInitialized: added

Emissions:
  - NetworkFeeBurned:
    - egressId: added (Emissions.NetworkFeeBurned.egressId.0.4)

Environment:
  - AddedNewArbAsset: added
  - ArbitrumInitialized: added
  - RuntimeSafeModeUpdated:
    - safeMode: added (Environment.RuntimeSafeModeUpdated.safeMode.2.thresholdSignatureEvm)
  - StaleUtxosDiscarded: added
  - UpdatedArbAsset: added

EthereumIngressEgress:
  - BatchBroadcastRequested:
    - egressIds: added (EthereumIngressEgress.BatchBroadcastRequested.egressIds.0.4)
  - BoostFundsAdded: added
  - BoostPoolCreated: added
  - CcmBroadcastRequested:
    - egressId: added (EthereumIngressEgress.CcmBroadcastRequested.egressId.0.4)
  - CcmEgressInvalid:
    - egressId: added (EthereumIngressEgress.CcmEgressInvalid.egressId.0.4)
  - DepositBoosted: added
  - DepositFinalised: added
  - DepositReceived: removed
  - InsufficientBoostLiquidity: added
  - StoppedBoosting: added

EthereumVault:
  - ChainInitialized: added

Funding:
  - StartedBidding: removed
  - StoppedBidding: removed

LiquidityPools:
  - AssetSwapped:
    - from: changed (LiquidityPools.AssetSwapped.from.6.name)
    - to: changed (LiquidityPools.AssetSwapped.to.6.name)
  - LimitOrderUpdated:
    - baseAsset: changed (LiquidityPools.LimitOrderUpdated.baseAsset.6.name)
    - quoteAsset: changed (LiquidityPools.LimitOrderUpdated.quoteAsset.6.name)
  - NewPoolCreated:
    - baseAsset: changed (LiquidityPools.NewPoolCreated.baseAsset.6.name)
    - quoteAsset: changed (LiquidityPools.NewPoolCreated.quoteAsset.6.name)
  - PoolFeeSet:
    - baseAsset: changed (LiquidityPools.PoolFeeSet.baseAsset.6.name)
    - quoteAsset: changed (LiquidityPools.PoolFeeSet.quoteAsset.6.name)
  - PriceImpactLimitSet: added
  - RangeOrderUpdated:
    - baseAsset: changed (LiquidityPools.RangeOrderUpdated.baseAsset.6.name)
    - quoteAsset: changed (LiquidityPools.RangeOrderUpdated.quoteAsset.6.name)

LiquidityProvider:
  - AccountCredited:
    - asset: changed (LiquidityProvider.AccountCredited.asset.6.name)
  - AccountDebited:
    - asset: changed (LiquidityProvider.AccountDebited.asset.6.name)
  - AssetTransferred: added
  - LiquidityDepositAddressReady:
    - asset: changed (LiquidityProvider.LiquidityDepositAddressReady.asset.6.name)
    - depositAddress: added (LiquidityProvider.LiquidityDepositAddressReady.depositAddress.3)
  - LiquidityDepositCredited:
    - asset: changed (LiquidityProvider.LiquidityDepositCredited.asset.6.name)
  - LiquidityRefundAddressRegistered:
    - chain: added (LiquidityProvider.LiquidityRefundAddressRegistered.chain.4)
    - address: added (LiquidityProvider.LiquidityRefundAddressRegistered.address.3)
  - WithdrawalEgressScheduled:
    - egressId: added (LiquidityProvider.WithdrawalEgressScheduled.egressId.0.4)
    - asset: changed (LiquidityProvider.WithdrawalEgressScheduled.asset.6.name)
    - destinationAddress: added (LiquidityProvider.WithdrawalEgressScheduled.destinationAddress.3)

PolkadotIngressEgress:
  - BatchBroadcastRequested:
    - egressIds: added (PolkadotIngressEgress.BatchBroadcastRequested.egressIds.0.4)
  - BoostFundsAdded: added
  - BoostPoolCreated: added
  - CcmBroadcastRequested:
    - egressId: added (PolkadotIngressEgress.CcmBroadcastRequested.egressId.0.4)
  - CcmEgressInvalid:
    - egressId: added (PolkadotIngressEgress.CcmEgressInvalid.egressId.0.4)
  - DepositBoosted: added
  - DepositFinalised: added
  - DepositReceived: removed
  - InsufficientBoostLiquidity: added
  - StoppedBoosting: added

PolkadotVault:
  - ChainInitialized: added

Swapping:
  - BatchSwapFailed:
    - asset: changed (Swapping.BatchSwapFailed.asset.6.name)
  - CcmDepositReceived:
    - destinationAddress: added (Swapping.CcmDepositReceived.destinationAddress.3)
    - depositMetadata: added (Swapping.CcmDepositReceived.depositMetadata.sourceChain.4)
  - CcmEgressScheduled:
    - egressId: added (Swapping.CcmEgressScheduled.egressId.0.4)
  - CcmFailed:
    - destinationAddress: added (Swapping.CcmFailed.destinationAddress.3)
    - depositMetadata: added (Swapping.CcmFailed.depositMetadata.sourceChain.4)
    - origin: added (Swapping.CcmFailed.origin.0.depositAddress.3)
  - MaximumSwapAmountSet:
    - asset: changed (Swapping.MaximumSwapAmountSet.asset.6.name)
  - SwapAmountConfiscated:
    - sourceAsset: changed (Swapping.SwapAmountConfiscated.sourceAsset.6.name)
    - destinationAsset: changed (Swapping.SwapAmountConfiscated.destinationAsset.6.name)
  - SwapDepositAddressReady:
    - affiliateFees: added (Swapping.SwapDepositAddressReady.affiliateFees)
    - depositAddress: added (Swapping.SwapDepositAddressReady.depositAddress.3)
    - destinationAddress: added (Swapping.SwapDepositAddressReady.destinationAddress.3)
    - sourceAsset: changed (Swapping.SwapDepositAddressReady.sourceAsset.6.name)
    - destinationAsset: changed (Swapping.SwapDepositAddressReady.destinationAsset.6.name)
  - SwapEgressIgnored:
    - asset: changed (Swapping.SwapEgressIgnored.asset.6.name)
  - SwapEgressScheduled:
    - egressId: added (Swapping.SwapEgressScheduled.egressId.0.4)
    - asset: changed (Swapping.SwapEgressScheduled.asset.6.name)
  - SwapExecuted:
    - swapType: added (Swapping.SwapExecuted.swapType)
    - sourceAsset: changed (Swapping.SwapExecuted.sourceAsset.6.name)
    - destinationAsset: changed (Swapping.SwapExecuted.destinationAsset.6.name)
  - SwapScheduled:
    - brokerFee: added (Swapping.SwapScheduled.brokerFee)
    - sourceAsset: changed (Swapping.SwapScheduled.sourceAsset.6.name)
    - destinationAsset: changed (Swapping.SwapScheduled.destinationAsset.6.name)
    - destinationAddress: added (Swapping.SwapScheduled.destinationAddress.3)
    - origin: added (Swapping.SwapScheduled.origin.0.depositAddress.3)
    - swapType: added (Swapping.SwapScheduled.swapType.4)
  - WithdrawalRequested:
    - egressId: added (Swapping.WithdrawalRequested.egressId.0.4)
    - egressAsset: changed (Swapping.WithdrawalRequested.egressAsset.6.name)
    - destinationAddress: added (Swapping.WithdrawalRequested.destinationAddress.3)

TokenholderGovernance:
  - GovKeyUpdatedHasFailed:
    - chain: added (TokenholderGovernance.GovKeyUpdatedHasFailed.chain.4)
  - GovKeyUpdatedWasSuccessful:
    - chain: added (TokenholderGovernance.GovKeyUpdatedWasSuccessful.chain.4)
  - ProposalEnacted:
    - proposal: added (TokenholderGovernance.ProposalEnacted.proposal.0.0.4)
  - ProposalPassed:
    - proposal: added (TokenholderGovernance.ProposalPassed.proposal.0.0.4)
  - ProposalRejected:
    - proposal: added (TokenholderGovernance.ProposalRejected.proposal.0.0.4)
  - ProposalSubmitted:
    - proposal: added (TokenholderGovernance.ProposalSubmitted.proposal.0.0.4)

Validator:
  - RotationPhaseUpdated:
    - newPhase: added (Validator.RotationPhaseUpdated.newPhase.5)
  - StartedBidding: added
  - StoppedBidding: added
  - VanityNameSet: removed

Witnesser:
  - CallDispatched: added
  - ReportedWitnessingFailures: added
