import { z } from 'zod';
import { numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumThresholdSignerKeygenFailure = numberOrHex;

export const ethereumThresholdSignerKeygenFailureEvent = defineEvent(
  'EthereumThresholdSigner.KeygenFailure',
  ethereumThresholdSignerKeygenFailure,
);
