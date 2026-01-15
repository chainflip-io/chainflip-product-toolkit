import { z } from 'zod';
import { validatorPalletConfigUpdated as vNewer } from '../../11200/validator/palletConfigUpdated';
import { validatorPalletConfigUpdated as vOlder } from '../../11100/validator/palletConfigUpdated';

export function validatorPalletConfigUpdated(): z.ZodUnion<[typeof vNewer, typeof vOlder]>;
export function validatorPalletConfigUpdated(
  transform: (input: z.output<typeof vOlder>) => z.output<typeof vNewer>,
): z.ZodUnion<
  [typeof vNewer, z.ZodEffects<typeof vOlder, z.output<typeof vNewer>, z.input<typeof vOlder>>]
>;
export function validatorPalletConfigUpdated(
  transform?: (input: z.output<typeof vOlder>) => z.output<typeof vNewer>,
) {
  return transform ? z.union([vNewer, vOlder.transform(transform)]) : z.union([vNewer, vOlder]);
}
