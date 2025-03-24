New or removed pallets:
  TradingStrategy: added

ArbitrumIngressEgress:
  - CcmEgressInvalid:
    - error: added
  - FailedToBuildAllBatchCall:
    - error: added
  - WitnessSafetyMarginSet: removed

BitcoinIngressEgress:
  - CcmEgressInvalid:
    - error: added
  - FailedToBuildAllBatchCall:
    - error: added
  - WitnessSafetyMarginSet: removed

EthereumIngressEgress:
  - CcmEgressInvalid:
    - error: added
  - FailedToBuildAllBatchCall:
    - error: added
  - WitnessSafetyMarginSet: removed

LiquidityPools:
  - LimitOrderUpdated:
    - sellAmountChange: changed
  - RangeOrderUpdated:
    - sizeChange: changed

PolkadotIngressEgress:
  - CcmEgressInvalid:
    - error: added
  - FailedToBuildAllBatchCall:
    - error: added
  - WitnessSafetyMarginSet: removed

SolanaIngressEgress:
  - CcmEgressInvalid:
    - error: added
  - FailedToBuildAllBatchCall:
    - error: added
  - WitnessSafetyMarginSet: removed

SolanaThresholdSigner:
  - ThresholdSignatureRequest:
    - payload: added

Swapping:
  - CreditedOnChain: added
  - RefundedOnChain: added
  - SwapRequested:
    - origin: added
    - requestType: added
    - refundParameters: changed
