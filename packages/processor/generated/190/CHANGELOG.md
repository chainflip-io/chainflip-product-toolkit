New or removed pallets:
  AssethubBroadcaster: added
  AssethubChainTracking: added
  AssethubIngressEgress: added
  AssethubVault: added
  TradingStrategy: added

ArbitrumIngressEgress:
  - BatchBroadcastRequested:
    - egressIds: added
  - CcmBroadcastRequested:
    - egressId: added
  - CcmEgressInvalid:
    - egressId: added
    - error: added
  - DepositBoosted:
    - action: added
  - DepositFailed:
    - reason: removed
    - details: changed
  - DepositFinalised:
    - action: added
  - FailedToBuildAllBatchCall:
    - error: added
  - TransferFallbackRequested:
    - egressDetails: added

AssetBalances:
  - AccountCredited:
    - asset: added
  - AccountDebited:
    - asset: added
  - RefundScheduled:
    - egressId: added
    - destination: added
  - RefundSkipped:
    - chain: added
    - address: added
  - VaultDeficitDetected:
    - chain: added

BitcoinIngressEgress:
  - BatchBroadcastRequested:
    - egressIds: added
  - CcmBroadcastRequested:
    - egressId: added
  - CcmEgressInvalid:
    - egressId: added
    - error: added
  - DepositBoosted:
    - action: added
  - DepositFailed:
    - reason: removed
    - details: changed
  - DepositFinalised:
    - action: added
  - FailedToBuildAllBatchCall:
    - error: added
  - TransferFallbackRequested:
    - egressDetails: added

Emissions:
  - NetworkFeeBurned:
    - egressId: added

Environment:
  - AssethubVaultAccountSet: added
  - RuntimeSafeModeUpdated:
    - safeMode: added

EthereumIngressEgress:
  - BatchBroadcastRequested:
    - egressIds: added
  - CcmBroadcastRequested:
    - egressId: added
  - CcmEgressInvalid:
    - egressId: added
    - error: added
  - DepositBoosted:
    - action: added
  - DepositFailed:
    - reason: removed
    - details: changed
  - DepositFinalised:
    - action: added
  - FailedToBuildAllBatchCall:
    - error: added
  - TransferFallbackRequested:
    - egressDetails: added

Flip:
  - PalletConfigUpdated: added
  - SlashingRateUpdated: removed

LiquidityPools:
  - AssetSwapped:
    - from: added
    - to: added
  - LimitOrderUpdated:
    - baseAsset: added
    - quoteAsset: added
  - NewPoolCreated:
    - baseAsset: added
    - quoteAsset: added
  - OrderDeletionFailed:
    - order: added
  - PalletConfigUpdated: added
  - PoolFeeSet:
    - baseAsset: added
    - quoteAsset: added
  - PriceImpactLimitSet:
    - assetPair: added
  - RangeOrderUpdated:
    - baseAsset: added
    - quoteAsset: added

LiquidityProvider:
  - AssetTransferred:
    - asset: added
  - LiquidityDepositAddressReady:
    - asset: added
    - depositAddress: added
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
    - error: added
  - DepositBoosted:
    - action: added
  - DepositFailed:
    - reason: removed
    - details: changed
  - DepositFinalised:
    - action: added
  - FailedToBuildAllBatchCall:
    - error: added
  - TransferFallbackRequested:
    - egressDetails: added

Reputation:
  - OffencePenalty:
    - offence: added
  - PenaltyUpdated:
    - offence: added

SolanaIngressEgress:
  - BatchBroadcastRequested:
    - egressIds: added
  - CcmBroadcastRequested:
    - egressId: added
  - CcmEgressInvalid:
    - egressId: added
    - error: added
  - DepositBoosted:
    - action: added
  - DepositFailed:
    - reason: removed
    - details: changed
  - DepositFinalised:
    - action: added
  - FailedToBuildAllBatchCall:
    - error: added
  - TransferFallbackRequested:
    - egressDetails: added

SolanaThresholdSigner:
  - ThresholdSignatureRequest:
    - payload: added

Swapping:
  - BatchSwapFailed:
    - asset: added
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
    - asset: added
  - RefundEgressScheduled:
    - egressId: added
    - asset: added
    - egressFee: added
  - RefundedOnChain: added
  - SwapAmountConfiscated:
    - asset: added
  - SwapDepositAddressReady:
    - depositAddress: added
    - destinationAddress: added
    - sourceAsset: added
    - destinationAsset: added
    - refundParameters: added
  - SwapEgressIgnored:
    - asset: added
  - SwapEgressScheduled:
    - egressId: added
    - asset: added
    - egressFee: added
  - SwapExecuted:
    - inputAsset: added
    - outputAsset: added
  - SwapRequested:
    - inputAsset: added
    - outputAsset: added
    - origin: added
    - requestType: added
    - refundParameters: added
  - SwapRetryDelaySet: removed
  - VaultSwapMinimumBrokerFeeSet: added
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
