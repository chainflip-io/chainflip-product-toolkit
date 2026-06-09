import { z } from 'zod';
import { frameSupportDispatchDispatchInfo } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const systemExtrinsicSuccess = z.object({ dispatchInfo: frameSupportDispatchDispatchInfo });

export const systemExtrinsicSuccessEvent = defineEvent(
  'System.ExtrinsicSuccess',
  systemExtrinsicSuccess,
);
