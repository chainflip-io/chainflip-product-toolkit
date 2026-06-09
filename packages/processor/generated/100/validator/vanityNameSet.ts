import { z } from 'zod';
import { accountId, hexString } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const validatorVanityNameSet = z.tuple([accountId, hexString]);

export const validatorVanityNameSetEvent = defineEvent(
  'Validator.VanityNameSet',
  validatorVanityNameSet,
);
