import { z } from 'zod';
import { ethereumIngressEgressPalletConfigUpdated as vNewer } from '../../11200/ethereumIngressEgress/palletConfigUpdated';
import { ethereumIngressEgressPalletConfigUpdated as vOlder } from '../../11100/ethereumIngressEgress/palletConfigUpdated';

export function ethereumIngressEgressPalletConfigUpdated(): z.ZodUnion<
  [typeof vNewer, typeof vOlder]
>;
export function ethereumIngressEgressPalletConfigUpdated(
  transform: (input: z.output<typeof vOlder>) => z.output<typeof vNewer>,
): z.ZodUnion<
  [typeof vNewer, z.ZodEffects<typeof vOlder, z.output<typeof vNewer>, z.input<typeof vOlder>>]
>;
export function ethereumIngressEgressPalletConfigUpdated(
  transform?: (input: z.output<typeof vOlder>) => z.output<typeof vNewer>,
) {
  return transform ? z.union([vNewer, vOlder.transform(transform)]) : z.union([vNewer, vOlder]);
}
