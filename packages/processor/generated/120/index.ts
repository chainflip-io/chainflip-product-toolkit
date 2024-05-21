import { z } from 'zod';
import { InternalEventHandler, EventHandler, wrapHandler } from '../utils';
import { environmentUtxoConsolidationParametersUpdated } from './environment/utxoConsolidationParametersUpdated';
import { emissionsBackupRewardsDistributed } from './emissions/backupRewardsDistributed';
import { emissionsNetworkFeeBurned } from './emissions/networkFeeBurned';
import { emissionsFlipBurnSkipped } from './emissions/flipBurnSkipped';
import { bitcoinChainTrackingChainStateUpdated } from './bitcoinChainTracking/chainStateUpdated';
import { ethereumBroadcasterTransactionBroadcastRequest } from './ethereumBroadcaster/transactionBroadcastRequest';
import { ethereumBroadcasterBroadcastRetryScheduled } from './ethereumBroadcaster/broadcastRetryScheduled';
import { ethereumBroadcasterBroadcastTimeout } from './ethereumBroadcaster/broadcastTimeout';
import { ethereumBroadcasterThresholdSignatureInvalid } from './ethereumBroadcaster/thresholdSignatureInvalid';
import { polkadotBroadcasterTransactionBroadcastRequest } from './polkadotBroadcaster/transactionBroadcastRequest';
import { polkadotBroadcasterBroadcastRetryScheduled } from './polkadotBroadcaster/broadcastRetryScheduled';
import { polkadotBroadcasterBroadcastTimeout } from './polkadotBroadcaster/broadcastTimeout';
import { polkadotBroadcasterThresholdSignatureInvalid } from './polkadotBroadcaster/thresholdSignatureInvalid';
import { bitcoinBroadcasterTransactionBroadcastRequest } from './bitcoinBroadcaster/transactionBroadcastRequest';
import { bitcoinBroadcasterBroadcastRetryScheduled } from './bitcoinBroadcaster/broadcastRetryScheduled';
import { bitcoinBroadcasterBroadcastTimeout } from './bitcoinBroadcaster/broadcastTimeout';
import { bitcoinBroadcasterThresholdSignatureInvalid } from './bitcoinBroadcaster/thresholdSignatureInvalid';
import { swappingSwapExecuted } from './swapping/swapExecuted';
import { swappingSwapEgressScheduled } from './swapping/swapEgressScheduled';
import { swappingWithdrawalRequested } from './swapping/withdrawalRequested';
import { swappingCcmFailed } from './swapping/ccmFailed';
import { swappingSwapEgressIgnored } from './swapping/swapEgressIgnored';
import { liquidityProviderWithdrawalEgressScheduled } from './liquidityProvider/withdrawalEgressScheduled';
import { liquidityProviderLiquidityDepositCredited } from './liquidityProvider/liquidityDepositCredited';
import { ethereumIngressEgressDepositReceived } from './ethereumIngressEgress/depositReceived';
import { ethereumIngressEgressDepositIgnored } from './ethereumIngressEgress/depositIgnored';
import { ethereumIngressEgressUtxoConsolidation } from './ethereumIngressEgress/utxoConsolidation';
import { polkadotIngressEgressDepositReceived } from './polkadotIngressEgress/depositReceived';
import { polkadotIngressEgressDepositIgnored } from './polkadotIngressEgress/depositIgnored';
import { polkadotIngressEgressUtxoConsolidation } from './polkadotIngressEgress/utxoConsolidation';
import { bitcoinIngressEgressDepositReceived } from './bitcoinIngressEgress/depositReceived';
import { bitcoinIngressEgressDepositIgnored } from './bitcoinIngressEgress/depositIgnored';
import { bitcoinIngressEgressUtxoConsolidation } from './bitcoinIngressEgress/utxoConsolidation';

export type EnvironmentUtxoConsolidationParametersUpdated = EventHandler<
  z.output<typeof environmentUtxoConsolidationParametersUpdated>
>;
export type EmissionsBackupRewardsDistributed = EventHandler<
  z.output<typeof emissionsBackupRewardsDistributed>
>;
export type EmissionsNetworkFeeBurned = EventHandler<z.output<typeof emissionsNetworkFeeBurned>>;
export type EmissionsFlipBurnSkipped = EventHandler<z.output<typeof emissionsFlipBurnSkipped>>;
export type BitcoinChainTrackingChainStateUpdated = EventHandler<
  z.output<typeof bitcoinChainTrackingChainStateUpdated>
>;
export type EthereumBroadcasterTransactionBroadcastRequest = EventHandler<
  z.output<typeof ethereumBroadcasterTransactionBroadcastRequest>
>;
export type EthereumBroadcasterBroadcastRetryScheduled = EventHandler<
  z.output<typeof ethereumBroadcasterBroadcastRetryScheduled>
>;
export type EthereumBroadcasterBroadcastTimeout = EventHandler<
  z.output<typeof ethereumBroadcasterBroadcastTimeout>
>;
export type EthereumBroadcasterThresholdSignatureInvalid = EventHandler<
  z.output<typeof ethereumBroadcasterThresholdSignatureInvalid>
>;
export type PolkadotBroadcasterTransactionBroadcastRequest = EventHandler<
  z.output<typeof polkadotBroadcasterTransactionBroadcastRequest>
>;
export type PolkadotBroadcasterBroadcastRetryScheduled = EventHandler<
  z.output<typeof polkadotBroadcasterBroadcastRetryScheduled>
>;
export type PolkadotBroadcasterBroadcastTimeout = EventHandler<
  z.output<typeof polkadotBroadcasterBroadcastTimeout>
>;
export type PolkadotBroadcasterThresholdSignatureInvalid = EventHandler<
  z.output<typeof polkadotBroadcasterThresholdSignatureInvalid>
>;
export type BitcoinBroadcasterTransactionBroadcastRequest = EventHandler<
  z.output<typeof bitcoinBroadcasterTransactionBroadcastRequest>
>;
export type BitcoinBroadcasterBroadcastRetryScheduled = EventHandler<
  z.output<typeof bitcoinBroadcasterBroadcastRetryScheduled>
>;
export type BitcoinBroadcasterBroadcastTimeout = EventHandler<
  z.output<typeof bitcoinBroadcasterBroadcastTimeout>
>;
export type BitcoinBroadcasterThresholdSignatureInvalid = EventHandler<
  z.output<typeof bitcoinBroadcasterThresholdSignatureInvalid>
>;
export type SwappingSwapExecuted = EventHandler<z.output<typeof swappingSwapExecuted>>;
export type SwappingSwapEgressScheduled = EventHandler<
  z.output<typeof swappingSwapEgressScheduled>
>;
export type SwappingWithdrawalRequested = EventHandler<
  z.output<typeof swappingWithdrawalRequested>
>;
export type SwappingCcmFailed = EventHandler<z.output<typeof swappingCcmFailed>>;
export type SwappingSwapEgressIgnored = EventHandler<z.output<typeof swappingSwapEgressIgnored>>;
export type LiquidityProviderWithdrawalEgressScheduled = EventHandler<
  z.output<typeof liquidityProviderWithdrawalEgressScheduled>
>;
export type LiquidityProviderLiquidityDepositCredited = EventHandler<
  z.output<typeof liquidityProviderLiquidityDepositCredited>
>;
export type EthereumIngressEgressDepositReceived = EventHandler<
  z.output<typeof ethereumIngressEgressDepositReceived>
>;
export type EthereumIngressEgressDepositIgnored = EventHandler<
  z.output<typeof ethereumIngressEgressDepositIgnored>
>;
export type EthereumIngressEgressUtxoConsolidation = EventHandler<
  z.output<typeof ethereumIngressEgressUtxoConsolidation>
>;
export type PolkadotIngressEgressDepositReceived = EventHandler<
  z.output<typeof polkadotIngressEgressDepositReceived>
>;
export type PolkadotIngressEgressDepositIgnored = EventHandler<
  z.output<typeof polkadotIngressEgressDepositIgnored>
>;
export type PolkadotIngressEgressUtxoConsolidation = EventHandler<
  z.output<typeof polkadotIngressEgressUtxoConsolidation>
>;
export type BitcoinIngressEgressDepositReceived = EventHandler<
  z.output<typeof bitcoinIngressEgressDepositReceived>
>;
export type BitcoinIngressEgressDepositIgnored = EventHandler<
  z.output<typeof bitcoinIngressEgressDepositIgnored>
>;
export type BitcoinIngressEgressUtxoConsolidation = EventHandler<
  z.output<typeof bitcoinIngressEgressUtxoConsolidation>
>;

type HandlerMap = {
  Environment?: {
    UtxoConsolidationParametersUpdated?: EnvironmentUtxoConsolidationParametersUpdated;
  };
  Emissions?: {
    BackupRewardsDistributed?: EmissionsBackupRewardsDistributed;
    NetworkFeeBurned?: EmissionsNetworkFeeBurned;
    FlipBurnSkipped?: EmissionsFlipBurnSkipped;
  };
  BitcoinChainTracking?: {
    ChainStateUpdated?: BitcoinChainTrackingChainStateUpdated;
  };
  EthereumBroadcaster?: {
    TransactionBroadcastRequest?: EthereumBroadcasterTransactionBroadcastRequest;
    BroadcastRetryScheduled?: EthereumBroadcasterBroadcastRetryScheduled;
    BroadcastTimeout?: EthereumBroadcasterBroadcastTimeout;
    ThresholdSignatureInvalid?: EthereumBroadcasterThresholdSignatureInvalid;
  };
  PolkadotBroadcaster?: {
    TransactionBroadcastRequest?: PolkadotBroadcasterTransactionBroadcastRequest;
    BroadcastRetryScheduled?: PolkadotBroadcasterBroadcastRetryScheduled;
    BroadcastTimeout?: PolkadotBroadcasterBroadcastTimeout;
    ThresholdSignatureInvalid?: PolkadotBroadcasterThresholdSignatureInvalid;
  };
  BitcoinBroadcaster?: {
    TransactionBroadcastRequest?: BitcoinBroadcasterTransactionBroadcastRequest;
    BroadcastRetryScheduled?: BitcoinBroadcasterBroadcastRetryScheduled;
    BroadcastTimeout?: BitcoinBroadcasterBroadcastTimeout;
    ThresholdSignatureInvalid?: BitcoinBroadcasterThresholdSignatureInvalid;
  };
  Swapping?: {
    SwapExecuted?: SwappingSwapExecuted;
    SwapEgressScheduled?: SwappingSwapEgressScheduled;
    WithdrawalRequested?: SwappingWithdrawalRequested;
    CcmFailed?: SwappingCcmFailed;
    SwapEgressIgnored?: SwappingSwapEgressIgnored;
  };
  LiquidityProvider?: {
    WithdrawalEgressScheduled?: LiquidityProviderWithdrawalEgressScheduled;
    LiquidityDepositCredited?: LiquidityProviderLiquidityDepositCredited;
  };
  EthereumIngressEgress?: {
    DepositReceived?: EthereumIngressEgressDepositReceived;
    DepositIgnored?: EthereumIngressEgressDepositIgnored;
    UtxoConsolidation?: EthereumIngressEgressUtxoConsolidation;
  };
  PolkadotIngressEgress?: {
    DepositReceived?: PolkadotIngressEgressDepositReceived;
    DepositIgnored?: PolkadotIngressEgressDepositIgnored;
    UtxoConsolidation?: PolkadotIngressEgressUtxoConsolidation;
  };
  BitcoinIngressEgress?: {
    DepositReceived?: BitcoinIngressEgressDepositReceived;
    DepositIgnored?: BitcoinIngressEgressDepositIgnored;
    UtxoConsolidation?: BitcoinIngressEgressUtxoConsolidation;
  };
};

export const handleEvents = (map: HandlerMap) => ({
  spec: 120,
  handlers: [
    {
      name: 'Environment.UtxoConsolidationParametersUpdated',
      handler: wrapHandler(
        map.Environment?.UtxoConsolidationParametersUpdated,
        environmentUtxoConsolidationParametersUpdated,
      ),
    },
    {
      name: 'Emissions.BackupRewardsDistributed',
      handler: wrapHandler(
        map.Emissions?.BackupRewardsDistributed,
        emissionsBackupRewardsDistributed,
      ),
    },
    {
      name: 'Emissions.NetworkFeeBurned',
      handler: wrapHandler(map.Emissions?.NetworkFeeBurned, emissionsNetworkFeeBurned),
    },
    {
      name: 'Emissions.FlipBurnSkipped',
      handler: wrapHandler(map.Emissions?.FlipBurnSkipped, emissionsFlipBurnSkipped),
    },
    {
      name: 'BitcoinChainTracking.ChainStateUpdated',
      handler: wrapHandler(
        map.BitcoinChainTracking?.ChainStateUpdated,
        bitcoinChainTrackingChainStateUpdated,
      ),
    },
    {
      name: 'EthereumBroadcaster.TransactionBroadcastRequest',
      handler: wrapHandler(
        map.EthereumBroadcaster?.TransactionBroadcastRequest,
        ethereumBroadcasterTransactionBroadcastRequest,
      ),
    },
    {
      name: 'EthereumBroadcaster.BroadcastRetryScheduled',
      handler: wrapHandler(
        map.EthereumBroadcaster?.BroadcastRetryScheduled,
        ethereumBroadcasterBroadcastRetryScheduled,
      ),
    },
    {
      name: 'EthereumBroadcaster.BroadcastTimeout',
      handler: wrapHandler(
        map.EthereumBroadcaster?.BroadcastTimeout,
        ethereumBroadcasterBroadcastTimeout,
      ),
    },
    {
      name: 'EthereumBroadcaster.ThresholdSignatureInvalid',
      handler: wrapHandler(
        map.EthereumBroadcaster?.ThresholdSignatureInvalid,
        ethereumBroadcasterThresholdSignatureInvalid,
      ),
    },
    {
      name: 'PolkadotBroadcaster.TransactionBroadcastRequest',
      handler: wrapHandler(
        map.PolkadotBroadcaster?.TransactionBroadcastRequest,
        polkadotBroadcasterTransactionBroadcastRequest,
      ),
    },
    {
      name: 'PolkadotBroadcaster.BroadcastRetryScheduled',
      handler: wrapHandler(
        map.PolkadotBroadcaster?.BroadcastRetryScheduled,
        polkadotBroadcasterBroadcastRetryScheduled,
      ),
    },
    {
      name: 'PolkadotBroadcaster.BroadcastTimeout',
      handler: wrapHandler(
        map.PolkadotBroadcaster?.BroadcastTimeout,
        polkadotBroadcasterBroadcastTimeout,
      ),
    },
    {
      name: 'PolkadotBroadcaster.ThresholdSignatureInvalid',
      handler: wrapHandler(
        map.PolkadotBroadcaster?.ThresholdSignatureInvalid,
        polkadotBroadcasterThresholdSignatureInvalid,
      ),
    },
    {
      name: 'BitcoinBroadcaster.TransactionBroadcastRequest',
      handler: wrapHandler(
        map.BitcoinBroadcaster?.TransactionBroadcastRequest,
        bitcoinBroadcasterTransactionBroadcastRequest,
      ),
    },
    {
      name: 'BitcoinBroadcaster.BroadcastRetryScheduled',
      handler: wrapHandler(
        map.BitcoinBroadcaster?.BroadcastRetryScheduled,
        bitcoinBroadcasterBroadcastRetryScheduled,
      ),
    },
    {
      name: 'BitcoinBroadcaster.BroadcastTimeout',
      handler: wrapHandler(
        map.BitcoinBroadcaster?.BroadcastTimeout,
        bitcoinBroadcasterBroadcastTimeout,
      ),
    },
    {
      name: 'BitcoinBroadcaster.ThresholdSignatureInvalid',
      handler: wrapHandler(
        map.BitcoinBroadcaster?.ThresholdSignatureInvalid,
        bitcoinBroadcasterThresholdSignatureInvalid,
      ),
    },
    {
      name: 'Swapping.SwapExecuted',
      handler: wrapHandler(map.Swapping?.SwapExecuted, swappingSwapExecuted),
    },
    {
      name: 'Swapping.SwapEgressScheduled',
      handler: wrapHandler(map.Swapping?.SwapEgressScheduled, swappingSwapEgressScheduled),
    },
    {
      name: 'Swapping.WithdrawalRequested',
      handler: wrapHandler(map.Swapping?.WithdrawalRequested, swappingWithdrawalRequested),
    },
    {
      name: 'Swapping.CcmFailed',
      handler: wrapHandler(map.Swapping?.CcmFailed, swappingCcmFailed),
    },
    {
      name: 'Swapping.SwapEgressIgnored',
      handler: wrapHandler(map.Swapping?.SwapEgressIgnored, swappingSwapEgressIgnored),
    },
    {
      name: 'LiquidityProvider.WithdrawalEgressScheduled',
      handler: wrapHandler(
        map.LiquidityProvider?.WithdrawalEgressScheduled,
        liquidityProviderWithdrawalEgressScheduled,
      ),
    },
    {
      name: 'LiquidityProvider.LiquidityDepositCredited',
      handler: wrapHandler(
        map.LiquidityProvider?.LiquidityDepositCredited,
        liquidityProviderLiquidityDepositCredited,
      ),
    },
    {
      name: 'EthereumIngressEgress.DepositReceived',
      handler: wrapHandler(
        map.EthereumIngressEgress?.DepositReceived,
        ethereumIngressEgressDepositReceived,
      ),
    },
    {
      name: 'EthereumIngressEgress.DepositIgnored',
      handler: wrapHandler(
        map.EthereumIngressEgress?.DepositIgnored,
        ethereumIngressEgressDepositIgnored,
      ),
    },
    {
      name: 'EthereumIngressEgress.UtxoConsolidation',
      handler: wrapHandler(
        map.EthereumIngressEgress?.UtxoConsolidation,
        ethereumIngressEgressUtxoConsolidation,
      ),
    },
    {
      name: 'PolkadotIngressEgress.DepositReceived',
      handler: wrapHandler(
        map.PolkadotIngressEgress?.DepositReceived,
        polkadotIngressEgressDepositReceived,
      ),
    },
    {
      name: 'PolkadotIngressEgress.DepositIgnored',
      handler: wrapHandler(
        map.PolkadotIngressEgress?.DepositIgnored,
        polkadotIngressEgressDepositIgnored,
      ),
    },
    {
      name: 'PolkadotIngressEgress.UtxoConsolidation',
      handler: wrapHandler(
        map.PolkadotIngressEgress?.UtxoConsolidation,
        polkadotIngressEgressUtxoConsolidation,
      ),
    },
    {
      name: 'BitcoinIngressEgress.DepositReceived',
      handler: wrapHandler(
        map.BitcoinIngressEgress?.DepositReceived,
        bitcoinIngressEgressDepositReceived,
      ),
    },
    {
      name: 'BitcoinIngressEgress.DepositIgnored',
      handler: wrapHandler(
        map.BitcoinIngressEgress?.DepositIgnored,
        bitcoinIngressEgressDepositIgnored,
      ),
    },
    {
      name: 'BitcoinIngressEgress.UtxoConsolidation',
      handler: wrapHandler(
        map.BitcoinIngressEgress?.UtxoConsolidation,
        bitcoinIngressEgressUtxoConsolidation,
      ),
    },
  ].filter((h): h is { name: string; handler: InternalEventHandler } => h.handler !== undefined),
});
