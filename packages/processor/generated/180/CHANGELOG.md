ArbitrumIngressEgress:
  - CcmEgressInvalid:
    - error: changed
  - CcmFailed:
    - reason: removed
    - depositMetadata: added
    - origin: added
  - DepositBoosted:
    - maxBoostFeeBps: added
    - originType: added
    - depositAddress: added
    - channelId: added
    - action: added
  - DepositFinalised:
    - maxBoostFeeBps: added
    - originType: added
    - depositAddress: added
    - action: added
    - channelId: added
  - DepositIgnored:
    - depositAddress: added
  - FailedToBuildAllBatchCall:
    - error: changed
  - InsufficientBoostLiquidity:
    - originType: added
    - channelId: added
  - NetworkFeeDeductionFromBoostSet: added
  - UnknownAffiliate: added
  - UnknownBroker: added

BitcoinIngressEgress:
  - CcmEgressInvalid:
    - error: changed
  - CcmFailed:
    - reason: removed
    - depositMetadata: added
    - origin: added
  - DepositBoosted:
    - maxBoostFeeBps: added
    - originType: added
    - depositAddress: added
    - channelId: added
    - action: added
  - DepositFinalised:
    - maxBoostFeeBps: added
    - originType: added
    - depositAddress: added
    - action: added
    - channelId: added
  - DepositIgnored:
    - depositAddress: added
  - FailedToBuildAllBatchCall:
    - error: changed
  - InsufficientBoostLiquidity:
    - originType: added
    - channelId: added
  - NetworkFeeDeductionFromBoostSet: added
  - UnknownAffiliate: added
  - UnknownBroker: added

EthereumIngressEgress:
  - CcmEgressInvalid:
    - error: changed
  - CcmFailed:
    - reason: removed
    - depositMetadata: added
    - origin: added
  - DepositBoosted:
    - maxBoostFeeBps: added
    - originType: added
    - depositAddress: added
    - channelId: added
    - action: added
  - DepositFinalised:
    - maxBoostFeeBps: added
    - originType: added
    - depositAddress: added
    - action: added
    - channelId: added
  - DepositIgnored:
    - depositAddress: added
  - FailedToBuildAllBatchCall:
    - error: changed
  - InsufficientBoostLiquidity:
    - originType: added
    - channelId: added
  - NetworkFeeDeductionFromBoostSet: added
  - UnknownAffiliate: added
  - UnknownBroker: added

PolkadotIngressEgress:
  - CcmEgressInvalid:
    - error: changed
  - CcmFailed:
    - reason: removed
    - depositMetadata: added
    - origin: added
  - DepositBoosted:
    - maxBoostFeeBps: added
    - originType: added
    - depositAddress: removed
    - channelId: added
    - action: added
  - DepositFinalised:
    - maxBoostFeeBps: added
    - originType: added
    - depositAddress: removed
    - action: added
    - channelId: added
  - DepositIgnored:
    - depositAddress: removed
  - FailedToBuildAllBatchCall:
    - error: changed
  - InsufficientBoostLiquidity:
    - originType: added
    - channelId: added
  - NetworkFeeDeductionFromBoostSet: added
  - UnknownAffiliate: added
  - UnknownBroker: added

SolanaBroadcaster:
  - TransactionBroadcastRequest:
    - transactionPayload: added

SolanaIngressEgress:
  - CcmEgressInvalid:
    - error: changed
  - CcmFailed:
    - reason: removed
    - depositMetadata: added
    - origin: added
  - DepositBoosted:
    - maxBoostFeeBps: added
    - originType: added
    - depositAddress: removed
    - channelId: added
    - action: added
  - DepositFinalised:
    - maxBoostFeeBps: added
    - originType: added
    - depositAddress: removed
    - action: added
    - channelId: added
  - DepositIgnored:
    - depositAddress: removed
  - FailedToBuildAllBatchCall:
    - error: changed
  - InsufficientBoostLiquidity:
    - originType: added
    - channelId: added
  - NetworkFeeDeductionFromBoostSet: added
  - TransactionRejectionRequestExpired:
    - txId: added
  - TransactionRejectionRequestReceived:
    - txId: added
  - UnknownAffiliate: added
  - UnknownBroker: added

Swapping:
  - AffiliateRegistrationUpdated: added
  - BrokerBondSet: added
  - PrivateBrokerChannelClosed: added
  - PrivateBrokerChannelOpened: added
  - SwapDepositAddressReady:
    - channelMetadata: added
    - affiliateFees: changed
  - SwapRequested:
    - brokerFees: added
    - origin: added
    - requestType: added