import { z } from 'zod';
import { palletCfBroadcastBroadcastAttemptId } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const polkadotBroadcasterThresholdSignatureInvalid = z.object({
  broadcastAttemptId: palletCfBroadcastBroadcastAttemptId,
});

export const polkadotBroadcasterThresholdSignatureInvalidEvent = defineEvent(
  'PolkadotBroadcaster.ThresholdSignatureInvalid',
  polkadotBroadcasterThresholdSignatureInvalid,
);
