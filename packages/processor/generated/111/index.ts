import { z } from 'zod';
import { InternalEventHandler, EventHandler, wrapHandler } from '../utils';
import { ethereumBroadcasterThresholdSignatureInvalid } from './ethereumBroadcaster/thresholdSignatureInvalid';
import { ethereumBroadcasterCallResigned } from './ethereumBroadcaster/callResigned';
import { polkadotBroadcasterThresholdSignatureInvalid } from './polkadotBroadcaster/thresholdSignatureInvalid';
import { polkadotBroadcasterCallResigned } from './polkadotBroadcaster/callResigned';
import { bitcoinBroadcasterThresholdSignatureInvalid } from './bitcoinBroadcaster/thresholdSignatureInvalid';
import { bitcoinBroadcasterCallResigned } from './bitcoinBroadcaster/callResigned';
import { ethereumIngressEgressTransferFallbackRequested } from './ethereumIngressEgress/transferFallbackRequested';
import { ethereumIngressEgressCcmBroadcastFailed } from './ethereumIngressEgress/ccmBroadcastFailed';
import { ethereumIngressEgressFailedForeignChainCallResigned } from './ethereumIngressEgress/failedForeignChainCallResigned';
import { ethereumIngressEgressFailedForeignChainCallExpired } from './ethereumIngressEgress/failedForeignChainCallExpired';
import { polkadotIngressEgressTransferFallbackRequested } from './polkadotIngressEgress/transferFallbackRequested';
import { polkadotIngressEgressCcmBroadcastFailed } from './polkadotIngressEgress/ccmBroadcastFailed';
import { polkadotIngressEgressFailedForeignChainCallResigned } from './polkadotIngressEgress/failedForeignChainCallResigned';
import { polkadotIngressEgressFailedForeignChainCallExpired } from './polkadotIngressEgress/failedForeignChainCallExpired';
import { bitcoinIngressEgressTransferFallbackRequested } from './bitcoinIngressEgress/transferFallbackRequested';
import { bitcoinIngressEgressCcmBroadcastFailed } from './bitcoinIngressEgress/ccmBroadcastFailed';
import { bitcoinIngressEgressFailedForeignChainCallResigned } from './bitcoinIngressEgress/failedForeignChainCallResigned';
import { bitcoinIngressEgressFailedForeignChainCallExpired } from './bitcoinIngressEgress/failedForeignChainCallExpired';
import { liquidityPoolsNewPoolCreated } from './liquidityPools/newPoolCreated';
import { liquidityPoolsRangeOrderUpdated } from './liquidityPools/rangeOrderUpdated';
import { liquidityPoolsLimitOrderUpdated } from './liquidityPools/limitOrderUpdated';
import { liquidityPoolsPoolFeeSet } from './liquidityPools/poolFeeSet';
import { liquidityPoolsScheduledLimitOrderUpdateDispatchSuccess } from './liquidityPools/scheduledLimitOrderUpdateDispatchSuccess';
import { liquidityPoolsScheduledLimitOrderUpdateDispatchFailure } from './liquidityPools/scheduledLimitOrderUpdateDispatchFailure';
import { liquidityPoolsLimitOrderSetOrUpdateScheduled } from './liquidityPools/limitOrderSetOrUpdateScheduled';

export type EthereumBroadcasterThresholdSignatureInvalid = EventHandler<
  z.output<typeof ethereumBroadcasterThresholdSignatureInvalid>
>;
export type EthereumBroadcasterCallResigned = EventHandler<
  z.output<typeof ethereumBroadcasterCallResigned>
>;
export type PolkadotBroadcasterThresholdSignatureInvalid = EventHandler<
  z.output<typeof polkadotBroadcasterThresholdSignatureInvalid>
>;
export type PolkadotBroadcasterCallResigned = EventHandler<
  z.output<typeof polkadotBroadcasterCallResigned>
>;
export type BitcoinBroadcasterThresholdSignatureInvalid = EventHandler<
  z.output<typeof bitcoinBroadcasterThresholdSignatureInvalid>
>;
export type BitcoinBroadcasterCallResigned = EventHandler<
  z.output<typeof bitcoinBroadcasterCallResigned>
>;
export type EthereumIngressEgressTransferFallbackRequested = EventHandler<
  z.output<typeof ethereumIngressEgressTransferFallbackRequested>
>;
export type EthereumIngressEgressCcmBroadcastFailed = EventHandler<
  z.output<typeof ethereumIngressEgressCcmBroadcastFailed>
>;
export type EthereumIngressEgressFailedForeignChainCallResigned = EventHandler<
  z.output<typeof ethereumIngressEgressFailedForeignChainCallResigned>
>;
export type EthereumIngressEgressFailedForeignChainCallExpired = EventHandler<
  z.output<typeof ethereumIngressEgressFailedForeignChainCallExpired>
>;
export type PolkadotIngressEgressTransferFallbackRequested = EventHandler<
  z.output<typeof polkadotIngressEgressTransferFallbackRequested>
>;
export type PolkadotIngressEgressCcmBroadcastFailed = EventHandler<
  z.output<typeof polkadotIngressEgressCcmBroadcastFailed>
>;
export type PolkadotIngressEgressFailedForeignChainCallResigned = EventHandler<
  z.output<typeof polkadotIngressEgressFailedForeignChainCallResigned>
>;
export type PolkadotIngressEgressFailedForeignChainCallExpired = EventHandler<
  z.output<typeof polkadotIngressEgressFailedForeignChainCallExpired>
>;
export type BitcoinIngressEgressTransferFallbackRequested = EventHandler<
  z.output<typeof bitcoinIngressEgressTransferFallbackRequested>
>;
export type BitcoinIngressEgressCcmBroadcastFailed = EventHandler<
  z.output<typeof bitcoinIngressEgressCcmBroadcastFailed>
>;
export type BitcoinIngressEgressFailedForeignChainCallResigned = EventHandler<
  z.output<typeof bitcoinIngressEgressFailedForeignChainCallResigned>
>;
export type BitcoinIngressEgressFailedForeignChainCallExpired = EventHandler<
  z.output<typeof bitcoinIngressEgressFailedForeignChainCallExpired>
>;
export type LiquidityPoolsNewPoolCreated = EventHandler<
  z.output<typeof liquidityPoolsNewPoolCreated>
>;
export type LiquidityPoolsRangeOrderUpdated = EventHandler<
  z.output<typeof liquidityPoolsRangeOrderUpdated>
>;
export type LiquidityPoolsLimitOrderUpdated = EventHandler<
  z.output<typeof liquidityPoolsLimitOrderUpdated>
>;
export type LiquidityPoolsPoolFeeSet = EventHandler<z.output<typeof liquidityPoolsPoolFeeSet>>;
export type LiquidityPoolsScheduledLimitOrderUpdateDispatchSuccess = EventHandler<
  z.output<typeof liquidityPoolsScheduledLimitOrderUpdateDispatchSuccess>
>;
export type LiquidityPoolsScheduledLimitOrderUpdateDispatchFailure = EventHandler<
  z.output<typeof liquidityPoolsScheduledLimitOrderUpdateDispatchFailure>
>;
export type LiquidityPoolsLimitOrderSetOrUpdateScheduled = EventHandler<
  z.output<typeof liquidityPoolsLimitOrderSetOrUpdateScheduled>
>;

type HandlerMap = {
  EthereumBroadcaster?: {
    ThresholdSignatureInvalid?: EthereumBroadcasterThresholdSignatureInvalid;
    CallResigned?: EthereumBroadcasterCallResigned;
  };
  PolkadotBroadcaster?: {
    ThresholdSignatureInvalid?: PolkadotBroadcasterThresholdSignatureInvalid;
    CallResigned?: PolkadotBroadcasterCallResigned;
  };
  BitcoinBroadcaster?: {
    ThresholdSignatureInvalid?: BitcoinBroadcasterThresholdSignatureInvalid;
    CallResigned?: BitcoinBroadcasterCallResigned;
  };
  EthereumIngressEgress?: {
    TransferFallbackRequested?: EthereumIngressEgressTransferFallbackRequested;
    CcmBroadcastFailed?: EthereumIngressEgressCcmBroadcastFailed;
    FailedForeignChainCallResigned?: EthereumIngressEgressFailedForeignChainCallResigned;
    FailedForeignChainCallExpired?: EthereumIngressEgressFailedForeignChainCallExpired;
  };
  PolkadotIngressEgress?: {
    TransferFallbackRequested?: PolkadotIngressEgressTransferFallbackRequested;
    CcmBroadcastFailed?: PolkadotIngressEgressCcmBroadcastFailed;
    FailedForeignChainCallResigned?: PolkadotIngressEgressFailedForeignChainCallResigned;
    FailedForeignChainCallExpired?: PolkadotIngressEgressFailedForeignChainCallExpired;
  };
  BitcoinIngressEgress?: {
    TransferFallbackRequested?: BitcoinIngressEgressTransferFallbackRequested;
    CcmBroadcastFailed?: BitcoinIngressEgressCcmBroadcastFailed;
    FailedForeignChainCallResigned?: BitcoinIngressEgressFailedForeignChainCallResigned;
    FailedForeignChainCallExpired?: BitcoinIngressEgressFailedForeignChainCallExpired;
  };
  LiquidityPools?: {
    NewPoolCreated?: LiquidityPoolsNewPoolCreated;
    RangeOrderUpdated?: LiquidityPoolsRangeOrderUpdated;
    LimitOrderUpdated?: LiquidityPoolsLimitOrderUpdated;
    PoolFeeSet?: LiquidityPoolsPoolFeeSet;
    ScheduledLimitOrderUpdateDispatchSuccess?: LiquidityPoolsScheduledLimitOrderUpdateDispatchSuccess;
    ScheduledLimitOrderUpdateDispatchFailure?: LiquidityPoolsScheduledLimitOrderUpdateDispatchFailure;
    LimitOrderSetOrUpdateScheduled?: LiquidityPoolsLimitOrderSetOrUpdateScheduled;
  };
};

export const handleEvents = (map: HandlerMap) => ({
  spec: 111,
  handlers: [
    {
      name: 'EthereumBroadcaster.ThresholdSignatureInvalid',
      handler: wrapHandler(
        map.EthereumBroadcaster?.ThresholdSignatureInvalid,
        ethereumBroadcasterThresholdSignatureInvalid,
      ),
    },
    {
      name: 'EthereumBroadcaster.CallResigned',
      handler: wrapHandler(map.EthereumBroadcaster?.CallResigned, ethereumBroadcasterCallResigned),
    },
    {
      name: 'PolkadotBroadcaster.ThresholdSignatureInvalid',
      handler: wrapHandler(
        map.PolkadotBroadcaster?.ThresholdSignatureInvalid,
        polkadotBroadcasterThresholdSignatureInvalid,
      ),
    },
    {
      name: 'PolkadotBroadcaster.CallResigned',
      handler: wrapHandler(map.PolkadotBroadcaster?.CallResigned, polkadotBroadcasterCallResigned),
    },
    {
      name: 'BitcoinBroadcaster.ThresholdSignatureInvalid',
      handler: wrapHandler(
        map.BitcoinBroadcaster?.ThresholdSignatureInvalid,
        bitcoinBroadcasterThresholdSignatureInvalid,
      ),
    },
    {
      name: 'BitcoinBroadcaster.CallResigned',
      handler: wrapHandler(map.BitcoinBroadcaster?.CallResigned, bitcoinBroadcasterCallResigned),
    },
    {
      name: 'EthereumIngressEgress.TransferFallbackRequested',
      handler: wrapHandler(
        map.EthereumIngressEgress?.TransferFallbackRequested,
        ethereumIngressEgressTransferFallbackRequested,
      ),
    },
    {
      name: 'EthereumIngressEgress.CcmBroadcastFailed',
      handler: wrapHandler(
        map.EthereumIngressEgress?.CcmBroadcastFailed,
        ethereumIngressEgressCcmBroadcastFailed,
      ),
    },
    {
      name: 'EthereumIngressEgress.FailedForeignChainCallResigned',
      handler: wrapHandler(
        map.EthereumIngressEgress?.FailedForeignChainCallResigned,
        ethereumIngressEgressFailedForeignChainCallResigned,
      ),
    },
    {
      name: 'EthereumIngressEgress.FailedForeignChainCallExpired',
      handler: wrapHandler(
        map.EthereumIngressEgress?.FailedForeignChainCallExpired,
        ethereumIngressEgressFailedForeignChainCallExpired,
      ),
    },
    {
      name: 'PolkadotIngressEgress.TransferFallbackRequested',
      handler: wrapHandler(
        map.PolkadotIngressEgress?.TransferFallbackRequested,
        polkadotIngressEgressTransferFallbackRequested,
      ),
    },
    {
      name: 'PolkadotIngressEgress.CcmBroadcastFailed',
      handler: wrapHandler(
        map.PolkadotIngressEgress?.CcmBroadcastFailed,
        polkadotIngressEgressCcmBroadcastFailed,
      ),
    },
    {
      name: 'PolkadotIngressEgress.FailedForeignChainCallResigned',
      handler: wrapHandler(
        map.PolkadotIngressEgress?.FailedForeignChainCallResigned,
        polkadotIngressEgressFailedForeignChainCallResigned,
      ),
    },
    {
      name: 'PolkadotIngressEgress.FailedForeignChainCallExpired',
      handler: wrapHandler(
        map.PolkadotIngressEgress?.FailedForeignChainCallExpired,
        polkadotIngressEgressFailedForeignChainCallExpired,
      ),
    },
    {
      name: 'BitcoinIngressEgress.TransferFallbackRequested',
      handler: wrapHandler(
        map.BitcoinIngressEgress?.TransferFallbackRequested,
        bitcoinIngressEgressTransferFallbackRequested,
      ),
    },
    {
      name: 'BitcoinIngressEgress.CcmBroadcastFailed',
      handler: wrapHandler(
        map.BitcoinIngressEgress?.CcmBroadcastFailed,
        bitcoinIngressEgressCcmBroadcastFailed,
      ),
    },
    {
      name: 'BitcoinIngressEgress.FailedForeignChainCallResigned',
      handler: wrapHandler(
        map.BitcoinIngressEgress?.FailedForeignChainCallResigned,
        bitcoinIngressEgressFailedForeignChainCallResigned,
      ),
    },
    {
      name: 'BitcoinIngressEgress.FailedForeignChainCallExpired',
      handler: wrapHandler(
        map.BitcoinIngressEgress?.FailedForeignChainCallExpired,
        bitcoinIngressEgressFailedForeignChainCallExpired,
      ),
    },
    {
      name: 'LiquidityPools.NewPoolCreated',
      handler: wrapHandler(map.LiquidityPools?.NewPoolCreated, liquidityPoolsNewPoolCreated),
    },
    {
      name: 'LiquidityPools.RangeOrderUpdated',
      handler: wrapHandler(map.LiquidityPools?.RangeOrderUpdated, liquidityPoolsRangeOrderUpdated),
    },
    {
      name: 'LiquidityPools.LimitOrderUpdated',
      handler: wrapHandler(map.LiquidityPools?.LimitOrderUpdated, liquidityPoolsLimitOrderUpdated),
    },
    {
      name: 'LiquidityPools.PoolFeeSet',
      handler: wrapHandler(map.LiquidityPools?.PoolFeeSet, liquidityPoolsPoolFeeSet),
    },
    {
      name: 'LiquidityPools.ScheduledLimitOrderUpdateDispatchSuccess',
      handler: wrapHandler(
        map.LiquidityPools?.ScheduledLimitOrderUpdateDispatchSuccess,
        liquidityPoolsScheduledLimitOrderUpdateDispatchSuccess,
      ),
    },
    {
      name: 'LiquidityPools.ScheduledLimitOrderUpdateDispatchFailure',
      handler: wrapHandler(
        map.LiquidityPools?.ScheduledLimitOrderUpdateDispatchFailure,
        liquidityPoolsScheduledLimitOrderUpdateDispatchFailure,
      ),
    },
    {
      name: 'LiquidityPools.LimitOrderSetOrUpdateScheduled',
      handler: wrapHandler(
        map.LiquidityPools?.LimitOrderSetOrUpdateScheduled,
        liquidityPoolsLimitOrderSetOrUpdateScheduled,
      ),
    },
  ].filter((h): h is { name: string; handler: InternalEventHandler } => h.handler !== undefined),
});
