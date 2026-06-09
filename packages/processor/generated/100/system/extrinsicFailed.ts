import { z } from 'zod';
import { frameSupportDispatchDispatchInfo, spRuntimeDispatchError } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const systemExtrinsicFailed = z.object({
  dispatchError: spRuntimeDispatchError,
  dispatchInfo: frameSupportDispatchDispatchInfo,
});

export const systemExtrinsicFailedEvent = defineEvent(
  'System.ExtrinsicFailed',
  systemExtrinsicFailed,
);
