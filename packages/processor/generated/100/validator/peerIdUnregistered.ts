import { z } from 'zod';
import { accountId, hexString } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const validatorPeerIdUnregistered = z.tuple([accountId, hexString]);

export const validatorPeerIdUnregisteredEvent = defineEvent(
  'Validator.PeerIdUnregistered',
  validatorPeerIdUnregistered,
);
