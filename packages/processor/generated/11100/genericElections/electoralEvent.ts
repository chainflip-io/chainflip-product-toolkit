import { z } from 'zod';
import { stateChainRuntimeChainflipGenericElectionsGenericElectoralEvents } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const genericElectionsElectoralEvent =
  stateChainRuntimeChainflipGenericElectionsGenericElectoralEvents;

export const genericElectionsElectoralEventEvent = defineEvent(
  'GenericElections.ElectoralEvent',
  genericElectionsElectoralEvent,
);
