New or removed pallets:
  AssetBalances: added
  SolanaBroadcaster: added
  SolanaChainTracking: added
  SolanaIngressEgress: added
  SolanaThresholdSigner: added
  SolanaVault: added

ArbitrumIngressEgress:
  - BatchBroadcastRequested:
    - egressIds: added
  - CcmBroadcastRequested:
    - egressId: added
  - CcmEgressInvalid:
    - egressId: added
  - DepositBoosted:
    - blockHeight: added
    - depositDetails: added
  - DepositFinalised:
    - blockHeight: added
    - depositDetails: added
  - DepositIgnored:
    - depositDetails: added
  - DepositWitnessRejected:
    - depositWitness: added
  - MaxSwapRetryDurationSet: added

BitcoinIngressEgress:
  - BatchBroadcastRequested:
    - egressIds: added
  - CcmBroadcastRequested:
    - egressId: added
  - CcmEgressInvalid:
    - egressId: added
  - DepositBoosted:
    - blockHeight: added
  - DepositFinalised:
    - blockHeight: added
  - MaxSwapRetryDurationSet: added

Emissions:
  - NetworkFeeBurned:
    - egressId: added

Environment:
  - RuntimeSafeModeUpdated:
    - safeMode: added

EthereumIngressEgress:
  - BatchBroadcastRequested:
    - egressIds: added
  - CcmBroadcastRequested:
    - egressId: added
  - CcmEgressInvalid:
    - egressId: added
  - DepositBoosted:
    - blockHeight: added
    - depositDetails: added
  - DepositFinalised:
    - blockHeight: added
    - depositDetails: added
  - DepositIgnored:
    - depositDetails: added
  - DepositWitnessRejected:
    - depositWitness: added
  - MaxSwapRetryDurationSet: added

LiquidityPools:
  - AssetSwapped:
    - from: added
    - to: added
  - LimitOrderUpdated:
    - baseAsset: added
    - quoteAsset: added
  - NetworkFeeTaken: removed
  - NewPoolCreated:
    - baseAsset: added
    - quoteAsset: added
  - PoolFeeSet:
    - baseAsset: added
    - quoteAsset: added
  - PriceImpactLimitSet:
    - assetPair: added
  - RangeOrderUpdated:
    - baseAsset: added
    - quoteAsset: added
  - UpdatedBuyInterval: removed

LiquidityProvider:
  - AccountCredited:
    - asset: added
  - AccountDebited:
    - asset: added
  - AssetTransferred:
    - asset: added
  - LiquidityDepositAddressReady:
    - asset: added
    - depositAddress: added
  - LiquidityDepositCredited:
    - asset: added
  - LiquidityRefundAddressRegistered:
    - chain: added
    - address: added
  - WithdrawalEgressScheduled:
    - egressId: added
    - asset: added
    - destinationAddress: added

PolkadotIngressEgress:
  - BatchBroadcastRequested:
    - egressIds: added
  - CcmBroadcastRequested:
    - egressId: added
  - CcmEgressInvalid:
    - egressId: added
  - DepositBoosted:
    - blockHeight: added
    - depositDetails: changed
  - DepositFinalised:
    - blockHeight: added
    - depositDetails: changed
  - DepositIgnored:
    - depositDetails: changed
  - DepositWitnessRejected:
    - depositWitness: changed
  - MaxSwapRetryDurationSet: added

Swapping:
  - BatchSwapFailed:
    - asset: added
  - BuyIntervalSet: added
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
    - asset: added
  - NetworkFeeTaken: added
  - RefundEgressIgnored: added
  - RefundEgressScheduled: added
  - SwapAmountConfiscated:
    - sourceAsset: added
    - destinationAsset: added
  - SwapDepositAddressReady:
    - refundParameters: added
    - depositAddress: added
    - destinationAddress: added
    - sourceAsset: added
    - destinationAsset: added
  - SwapEgressIgnored:
    - asset: added
  - SwapEgressScheduled:
    - egressId: added
    - asset: added
  - SwapExecuted:
    - sourceAsset: added
    - destinationAsset: added
    - swapType: added
  - SwapRescheduled: added
  - SwapRetryDelaySet: added
  - SwapScheduled:
    - sourceAsset: added
    - destinationAsset: added
    - destinationAddress: added
    - origin: added
    - swapType: added
  - WithdrawalRequested:
    - egressId: added
    - egressAsset: added
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
  - PeerIdRegistered: removed
  - PeerIdUnregistered: removed
