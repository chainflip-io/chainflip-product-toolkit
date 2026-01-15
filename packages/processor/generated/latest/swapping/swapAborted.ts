import { z } from 'zod';
import { swappingSwapAborted as vNewer } from '../../200/swapping/swapAborted';
import { swappingSwapAborted as vOlder } from '../../11200/swapping/swapAborted';

export function swappingSwapAborted(): z.ZodUnion<[typeof vNewer, typeof vOlder]>;
export function swappingSwapAborted(
  transform: (input: z.output<typeof vOlder>) => z.output<typeof vNewer>,
): z.ZodUnion<
  [typeof vNewer, z.ZodEffects<typeof vOlder, z.output<typeof vNewer>, z.input<typeof vOlder>>]
>;
export function swappingSwapAborted(
  transform?: (input: z.output<typeof vOlder>) => z.output<typeof vNewer>,
) {
  return transform ? z.union([vNewer, vOlder.transform(transform)]) : z.union([vNewer, vOlder]);
}
