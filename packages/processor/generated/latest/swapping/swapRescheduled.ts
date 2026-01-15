import { z } from 'zod';
import { swappingSwapRescheduled as vNewer } from '../../200/swapping/swapRescheduled';
import { swappingSwapRescheduled as vOlder } from '../../11200/swapping/swapRescheduled';

export function swappingSwapRescheduled(): z.ZodUnion<[typeof vNewer, typeof vOlder]>;
export function swappingSwapRescheduled(
  transform: (input: z.output<typeof vOlder>) => z.output<typeof vNewer>,
): z.ZodUnion<
  [typeof vNewer, z.ZodEffects<typeof vOlder, z.output<typeof vNewer>, z.input<typeof vOlder>>]
>;
export function swappingSwapRescheduled(
  transform?: (input: z.output<typeof vOlder>) => z.output<typeof vNewer>,
) {
  return transform ? z.union([vNewer, vOlder.transform(transform)]) : z.union([vNewer, vOlder]);
}
