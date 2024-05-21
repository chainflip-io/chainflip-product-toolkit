import { z } from 'zod';
import { cfChainsBtcConsolidationParameters } from '../common';

export const environmentUtxoConsolidationParametersUpdated = z.object({
  params: cfChainsBtcConsolidationParameters,
});
