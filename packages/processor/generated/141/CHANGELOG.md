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
    - egressIds: added
  - BoostFundsAdded: added
  - BoostPoolCreated: added
  - CcmBroadcastRequested:
    - egressId: added
  - CcmEgressInvalid:
    - egressId: added
  - DepositBoosted: added
  - DepositFinalised: added
  - DepositReceived: removed
  - InsufficientBoostLiquidity: added
  - StoppedBoosting: added

BitcoinVault:
  - ChainInitialized: added

Emissions:
  - NetworkFeeBurned:
    - egressId: added

Environment:
  - AddedNewArbAsset: added
  - ArbitrumInitialized: added
  - RuntimeSafeModeUpdated:
    - safeMode: added
  - StaleUtxosDiscarded: added
  - UpdatedArbAsset: added
  - UtxoConsolidationParametersUpdated:
    - params: changed

EthereumIngressEgress:
  - BatchBroadcastRequested:
    - egressIds: added
  - BoostFundsAdded: added
  - BoostPoolCreated: added
  - CcmBroadcastRequested:
    - egressId: added
  - CcmEgressInvalid:
    - egressId: added
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
    - from: changed
    - to: changed
  - LimitOrderUpdated:
    - baseAsset: changed
    - quoteAsset: changed
  - NewPoolCreated:
    - baseAsset: changed
    - quoteAsset: changed
  - PoolFeeSet:
    - baseAsset: changed
    - quoteAsset: changed
  - PriceImpactLimitSet: added
  - RangeOrderUpdated:
    - baseAsset: changed
    - quoteAsset: changed

LiquidityProvider:
  - AccountCredited:
    - asset: changed
  - AccountDebited:
    - asset: changed
  - AssetTransferred: added
  - LiquidityDepositAddressReady:
    - asset: changed
    - depositAddress: added
  - LiquidityDepositCredited:
    - asset: changed
  - LiquidityRefundAddressRegistered:
    - chain: added
    - address: added
  - WithdrawalEgressScheduled:
    - egressId: added
    - asset: changed
    - destinationAddress: added

PolkadotIngressEgress:
  - BatchBroadcastRequested:
    - egressIds: added
  - BoostFundsAdded: added
  - BoostPoolCreated: added
  - CcmBroadcastRequested:
    - egressId: added
  - CcmEgressInvalid:
    - egressId: added
  - DepositBoosted: added
  - DepositFinalised: added
  - DepositReceived: removed
  - InsufficientBoostLiquidity: added
  - StoppedBoosting: added

PolkadotVault:
  - ChainInitialized: added

Swapping:
  - BatchSwapFailed:
    - asset: changed
  - CcmDepositReceived:
    - destinationAddress: added
    - depositMetadata: added
  - CcmEgressScheduled:
    - egressId: added
  - CcmFailed:
    - destinationAddress: added
    - depositMetadata: added
    - origin: added
  - MaximumSwapAmountSet:
    - asset: changed
  - SwapAmountConfiscated:
    - sourceAsset: changed
    - destinationAsset: changed
  - SwapDepositAddressReady:
    - affiliateFees: added
    - depositAddress: added
    - destinationAddress: added
    - sourceAsset: changed
    - destinationAsset: changed
  - SwapEgressIgnored:
    - asset: changed
  - SwapEgressScheduled:
    - egressId: added
    - asset: changed
  - SwapExecuted:
    - swapType: added
    - sourceAsset: changed
    - destinationAsset: changed
  - SwapScheduled:
    - brokerFee: added
    - sourceAsset: changed
    - destinationAsset: changed
    - destinationAddress: added
    - origin: added
    - swapType: added
  - WithdrawalRequested:
    - egressId: added
    - egressAsset: changed
    - destinationAddress: added

TokenholderGovernance:
  - GovKeyUpdatedHasFailed:
    - chain: added
  - GovKeyUpdatedWasSuccessful:
    - chain: added
  - ProposalEnacted:
    - proposal: added
  - ProposalPassed:
    - proposal: added
  - ProposalRejected:
    - proposal: added
  - ProposalSubmitted:
    - proposal: added

Validator:
  - RotationPhaseUpdated:
    - newPhase: added
  - StartedBidding: added
  - StoppedBidding: added
  - VanityNameSet: removed

Witnesser:
  - CallDispatched: added
  - ReportedWitnessingFailures: added
