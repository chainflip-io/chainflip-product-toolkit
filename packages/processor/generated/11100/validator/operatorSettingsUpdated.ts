import { z } from 'zod';
import { accountId, palletCfValidatorDelegationOperatorSettings } from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const validatorOperatorSettingsUpdated = z.object({
  operator: accountId,
  preferences: palletCfValidatorDelegationOperatorSettings,
});

export const validatorOperatorSettingsUpdatedEvent = defineEvent(
  'Validator.OperatorSettingsUpdated',
  validatorOperatorSettingsUpdated,
);
