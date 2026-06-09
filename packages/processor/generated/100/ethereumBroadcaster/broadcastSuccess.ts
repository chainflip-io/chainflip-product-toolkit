import { z } from 'zod';
import { cfChainsEvmSchnorrVerificationComponents } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumBroadcasterBroadcastSuccess = z.object({
  broadcastId: z.number(),
  transactionOutId: cfChainsEvmSchnorrVerificationComponents,
});

export const ethereumBroadcasterBroadcastSuccessEvent = defineEvent(
  'EthereumBroadcaster.BroadcastSuccess',
  ethereumBroadcasterBroadcastSuccess,
);
