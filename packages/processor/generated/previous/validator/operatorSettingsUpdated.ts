import { z } from 'zod';
import { validatorOperatorSettingsUpdated as vNewer } from '../../11200/validator/operatorSettingsUpdated';
import { validatorOperatorSettingsUpdated as vOlder } from '../../11100/validator/operatorSettingsUpdated';

export function validatorOperatorSettingsUpdated(): z.ZodUnion<[typeof vNewer, typeof vOlder]>;
export function validatorOperatorSettingsUpdated(
  transform: (input: z.output<typeof vOlder>) => z.output<typeof vNewer>,
): z.ZodUnion<
  [typeof vNewer, z.ZodEffects<typeof vOlder, z.output<typeof vNewer>, z.input<typeof vOlder>>]
>;
export function validatorOperatorSettingsUpdated(
  transform?: (input: z.output<typeof vOlder>) => z.output<typeof vNewer>,
) {
  return transform ? z.union([vNewer, vOlder.transform(transform)]) : z.union([vNewer, vOlder]);
}
