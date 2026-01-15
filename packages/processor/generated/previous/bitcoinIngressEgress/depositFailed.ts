import { z } from 'zod';
import { bitcoinIngressEgressDepositFailed as vNewer } from '../../11200/bitcoinIngressEgress/depositFailed';
import { bitcoinIngressEgressDepositFailed as vOlder } from '../../11100/bitcoinIngressEgress/depositFailed';

export function bitcoinIngressEgressDepositFailed(): z.ZodUnion<[typeof vNewer, typeof vOlder]>;
export function bitcoinIngressEgressDepositFailed(
  transform: (input: z.output<typeof vOlder>) => z.output<typeof vNewer>,
): z.ZodUnion<
  [typeof vNewer, z.ZodEffects<typeof vOlder, z.output<typeof vNewer>, z.input<typeof vOlder>>]
>;
export function bitcoinIngressEgressDepositFailed(
  transform?: (input: z.output<typeof vOlder>) => z.output<typeof vNewer>,
) {
  return transform ? z.union([vNewer, vOlder.transform(transform)]) : z.union([vNewer, vOlder]);
}
