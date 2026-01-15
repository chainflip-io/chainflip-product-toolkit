import { z } from 'zod';
import { assethubIngressEgressPalletConfigUpdated as vNewer } from '../../11200/assethubIngressEgress/palletConfigUpdated';
import { assethubIngressEgressPalletConfigUpdated as vOlder } from '../../11100/assethubIngressEgress/palletConfigUpdated';

export function assethubIngressEgressPalletConfigUpdated(): z.ZodUnion<
  [typeof vNewer, typeof vOlder]
>;
export function assethubIngressEgressPalletConfigUpdated(
  transform: (input: z.output<typeof vOlder>) => z.output<typeof vNewer>,
): z.ZodUnion<
  [typeof vNewer, z.ZodEffects<typeof vOlder, z.output<typeof vNewer>, z.input<typeof vOlder>>]
>;
export function assethubIngressEgressPalletConfigUpdated(
  transform?: (input: z.output<typeof vOlder>) => z.output<typeof vNewer>,
) {
  return transform ? z.union([vNewer, vOlder.transform(transform)]) : z.union([vNewer, vOlder]);
}
