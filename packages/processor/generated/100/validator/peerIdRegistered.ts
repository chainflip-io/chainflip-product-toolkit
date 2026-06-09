import { z } from 'zod';
import { accountId, hexString, numberOrHex } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const validatorPeerIdRegistered = z.tuple([accountId, hexString, z.number(), numberOrHex]);

export const validatorPeerIdRegisteredEvent = defineEvent(
  'Validator.PeerIdRegistered',
  validatorPeerIdRegistered,
);
