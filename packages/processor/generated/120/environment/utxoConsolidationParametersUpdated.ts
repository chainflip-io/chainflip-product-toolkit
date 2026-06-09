import { z } from 'zod';
import { cfChainsBtcConsolidationParameters } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const environmentUtxoConsolidationParametersUpdated = z.object({
  params: cfChainsBtcConsolidationParameters,
});

export const environmentUtxoConsolidationParametersUpdatedEvent = defineEvent(
  'Environment.UtxoConsolidationParametersUpdated',
  environmentUtxoConsolidationParametersUpdated,
);
