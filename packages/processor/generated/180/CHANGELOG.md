ArbitrumChainTracking:
  - ChainStateUpdated:
    - newChainState: added

ArbitrumIngressEgress:
  - CcmEgressInvalid:
    - error: added
  - CcmFailed: removed
  - CcmFallbackScheduled: removed
  - DepositBoosted:
    - maxBoostFeeBps: added
    - originType: added
    - depositAddress: added
    - channelId: added
    - action: removed
  - DepositFailed: added
  - DepositFinalised:
    - maxBoostFeeBps: added
    - originType: added
    - depositAddress: added
    - action: removed
    - channelId: added
  - DepositIgnored: removed
  - DepositWitnessRejected: removed
  - FailedToBuildAllBatchCall:
    - error: added
  - InsufficientBoostLiquidity:
    - originType: added
    - channelId: added
  - NetworkFeeDeductionFromBoostSet: added
  - TransferFallbackRequested:
    - egressDetails: added
  - UnknownAffiliate: added
  - UnknownBroker: added

BitcoinIngressEgress:
  - CcmEgressInvalid:
    - error: added
  - CcmFailed: removed
  - CcmFallbackScheduled: removed
  - DepositBoosted:
    - maxBoostFeeBps: added
    - originType: added
    - depositAddress: added
    - channelId: added
    - action: removed
  - DepositFailed: added
  - DepositFinalised:
    - maxBoostFeeBps: added
    - originType: added
    - depositAddress: added
    - action: removed
    - channelId: added
  - DepositIgnored: removed
  - DepositWitnessRejected: removed
  - FailedToBuildAllBatchCall:
    - error: added
  - InsufficientBoostLiquidity:
    - originType: added
    - channelId: added
  - NetworkFeeDeductionFromBoostSet: added
  - TransferFallbackRequested:
    - egressDetails: added
  - UnknownAffiliate: added
  - UnknownBroker: added

Environment:
  - SolanaGovCallDispatched: added

EthereumIngressEgress:
  - CcmEgressInvalid:
    - error: added
  - CcmFailed: removed
  - CcmFallbackScheduled: removed
  - DepositBoosted:
    - maxBoostFeeBps: added
    - originType: added
    - depositAddress: added
    - channelId: added
    - action: removed
  - DepositFailed: added
  - DepositFinalised:
    - maxBoostFeeBps: added
    - originType: added
    - depositAddress: added
    - action: removed
    - channelId: added
  - DepositIgnored: removed
  - DepositWitnessRejected: removed
  - FailedToBuildAllBatchCall:
    - error: added
  - InsufficientBoostLiquidity:
    - originType: added
    - channelId: added
  - NetworkFeeDeductionFromBoostSet: added
  - TransferFallbackRequested:
    - egressDetails: added
  - UnknownAffiliate: added
  - UnknownBroker: added

PolkadotIngressEgress:
  - CcmEgressInvalid:
    - error: added
  - CcmFailed: removed
  - CcmFallbackScheduled: removed
  - DepositBoosted:
    - maxBoostFeeBps: added
    - originType: added
    - depositAddress: removed
    - channelId: added
    - action: removed
  - DepositFailed: added
  - DepositFinalised:
    - maxBoostFeeBps: added
    - originType: added
    - depositAddress: removed
    - action: removed
    - channelId: added
  - DepositIgnored: removed
  - DepositWitnessRejected: removed
  - FailedToBuildAllBatchCall:
    - error: added
  - InsufficientBoostLiquidity:
    - originType: added
    - channelId: added
  - NetworkFeeDeductionFromBoostSet: added
  - TransferFallbackRequested:
    - egressDetails: added
  - UnknownAffiliate: added
  - UnknownBroker: added

SolanaBroadcaster:
  - TransactionBroadcastRequest:
    - transactionPayload: added

SolanaElections:
  - UnknownElection: added

SolanaIngressEgress:
  - CcmEgressInvalid:
    - error: added
  - CcmFailed: removed
  - CcmFallbackScheduled: removed
  - DepositBoosted:
    - maxBoostFeeBps: added
    - originType: added
    - depositAddress: removed
    - channelId: added
    - action: removed
  - DepositFailed: added
  - DepositFinalised:
    - maxBoostFeeBps: added
    - originType: added
    - depositAddress: removed
    - action: removed
    - channelId: added
  - DepositIgnored: removed
  - DepositWitnessRejected: removed
  - FailedToBuildAllBatchCall:
    - error: added
  - InsufficientBoostLiquidity:
    - originType: added
    - channelId: added
  - NetworkFeeDeductionFromBoostSet: added
  - TransactionRejectionRequestExpired:
    - txId: added
  - TransactionRejectionRequestReceived:
    - txId: added
  - TransferFallbackRequested:
    - egressDetails: added
  - UnknownAffiliate: added
  - UnknownBroker: added

SolanaThresholdSigner:
  - ThresholdSignatureRequest:
    - payload: changed

Swapping:
  - AffiliateRegistration: added
  - BrokerBondSet: added
  - MinimumNetworkFeeSet: added
  - PrivateBrokerChannelClosed: added
  - PrivateBrokerChannelOpened: added
  - RefundEgressScheduled:
    - egressFee: added
  - SwapDepositAddressReady:
    - brokerId: added
    - channelMetadata: added
    - affiliateFees: changed
    - refundParameters: changed
  - SwapEgressScheduled:
    - egressFee: added
  - SwapRequested:
    - brokerFees: added
    - origin: added
    - requestType: removed
    - refundParameters: changed
  - SwapScheduled:
    - swapType: removed
  - WithdrawalRequested:
    - accountId: added
