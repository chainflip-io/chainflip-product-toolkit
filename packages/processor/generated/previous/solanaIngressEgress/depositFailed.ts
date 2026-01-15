import { z } from 'zod';
import { solanaIngressEgressDepositFailed as vNewer } from '../../11200/solanaIngressEgress/depositFailed';
import { solanaIngressEgressDepositFailed as vOlder } from '../../11100/solanaIngressEgress/depositFailed';

export function solanaIngressEgressDepositFailed(): z.ZodUnion<[typeof vNewer, typeof vOlder]>;
export function solanaIngressEgressDepositFailed(
  transform: (input: z.output<typeof vOlder>) => z.output<typeof vNewer>,
): z.ZodUnion<
  [typeof vNewer, z.ZodEffects<typeof vOlder, z.output<typeof vNewer>, z.input<typeof vOlder>>]
>;
export function solanaIngressEgressDepositFailed(
  transform?: (input: z.output<typeof vOlder>) => z.output<typeof vNewer>,
) {
  return transform ? z.union([vNewer, vOlder.transform(transform)]) : z.union([vNewer, vOlder]);
}
