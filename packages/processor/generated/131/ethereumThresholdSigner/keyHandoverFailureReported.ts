import { z } from 'zod';
import { accountId } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const ethereumThresholdSignerKeyHandoverFailureReported = accountId;

export const ethereumThresholdSignerKeyHandoverFailureReportedEvent = defineEvent(
  'EthereumThresholdSigner.KeyHandoverFailureReported',
  ethereumThresholdSignerKeyHandoverFailureReported,
);
