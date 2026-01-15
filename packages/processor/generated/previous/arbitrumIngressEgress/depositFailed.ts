import { z } from 'zod';
import { arbitrumIngressEgressDepositFailed as vNewer } from '../../11200/arbitrumIngressEgress/depositFailed';
import { arbitrumIngressEgressDepositFailed as vOlder } from '../../11100/arbitrumIngressEgress/depositFailed';

export function arbitrumIngressEgressDepositFailed(): z.ZodUnion<[typeof vNewer, typeof vOlder]>;
export function arbitrumIngressEgressDepositFailed(
  transform: (input: z.output<typeof vOlder>) => z.output<typeof vNewer>,
): z.ZodUnion<
  [typeof vNewer, z.ZodEffects<typeof vOlder, z.output<typeof vNewer>, z.input<typeof vOlder>>]
>;
export function arbitrumIngressEgressDepositFailed(
  transform?: (input: z.output<typeof vOlder>) => z.output<typeof vNewer>,
) {
  return transform ? z.union([vNewer, vOlder.transform(transform)]) : z.union([vNewer, vOlder]);
}
