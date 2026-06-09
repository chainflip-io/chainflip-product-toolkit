import { z } from 'zod';
import { stateChainRuntimeChainflipBitcoinElectionsBitcoinElectoralEvents } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const bitcoinElectionsElectoralEvent =
  stateChainRuntimeChainflipBitcoinElectionsBitcoinElectoralEvents;

export const bitcoinElectionsElectoralEventEvent = defineEvent(
  'BitcoinElections.ElectoralEvent',
  bitcoinElectionsElectoralEvent,
);
