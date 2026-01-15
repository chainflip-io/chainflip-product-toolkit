import { z } from 'zod';
import { environmentRuntimeSafeModeUpdated as vNewer } from '../../200/environment/runtimeSafeModeUpdated';
import { environmentRuntimeSafeModeUpdated as vOlder } from '../../11200/environment/runtimeSafeModeUpdated';

export function environmentRuntimeSafeModeUpdated(): z.ZodUnion<[typeof vNewer, typeof vOlder]>;
export function environmentRuntimeSafeModeUpdated(
  transform: (input: z.output<typeof vOlder>) => z.output<typeof vNewer>,
): z.ZodUnion<
  [typeof vNewer, z.ZodEffects<typeof vOlder, z.output<typeof vNewer>, z.input<typeof vOlder>>]
>;
export function environmentRuntimeSafeModeUpdated(
  transform?: (input: z.output<typeof vOlder>) => z.output<typeof vNewer>,
) {
  return transform ? z.union([vNewer, vOlder.transform(transform)]) : z.union([vNewer, vOlder]);
}
