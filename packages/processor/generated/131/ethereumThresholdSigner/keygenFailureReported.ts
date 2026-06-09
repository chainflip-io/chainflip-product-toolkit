import { z } from 'zod';
import { accountId } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumThresholdSignerKeygenFailureReported = accountId;

export const ethereumThresholdSignerKeygenFailureReportedEvent = defineEvent(
  'EthereumThresholdSigner.KeygenFailureReported',
  ethereumThresholdSignerKeygenFailureReported,
);
