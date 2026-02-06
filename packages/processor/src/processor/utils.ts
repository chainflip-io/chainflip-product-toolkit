import assert from 'assert';
import type Processor from './Processor';
import type { IndexerStore, ProcessorStore, Semver } from './types';

export const generatePalletEventName = <
  const C extends readonly string[],
  const P extends string,
  const E extends readonly string[],
>(
  chains: C,
  pallet: P,
  events: E,
) =>
  Object.fromEntries(
    chains.map((c) => [
      `${c}${pallet}` as const,
      Object.fromEntries(events.map((e) => [e, `${c}${pallet}.${e}`] as const)),
    ]),
  ) as {
    [Ch in C[number] as `${Ch}${P}`]: {
      [K in E[number]]: `${Ch}${P}.${K}`;
    };
  };

export const parseSemver = (specId: string): Semver => {
  // the specId is in the format of "chainflip-node@<specId>"
  const specNumber = Number.parseInt(specId.split('@')[1], 10);
  if (Number.isNaN(specNumber)) throw new Error('Invalid specId');
  const specStr = specNumber.toString();
  const segmentLength = Math.ceil(specStr.length / 3);
  const padded = specStr.padStart(segmentLength * 3, '0');
  const major = padded.slice(0, segmentLength);
  const minor = padded.slice(segmentLength, segmentLength * 2);
  const patch = padded.slice(segmentLength * 2, segmentLength * 3);
  return `${Number(major)}.${Number(minor)}.${Number(patch)}`;
};

export function timedMethod<P extends ProcessorStore<any, any>, I extends IndexerStore>(
  target: Processor<P, I>,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const method = descriptor.value;
  assert(typeof method === 'function');
  // eslint-disable-next-line no-param-reassign
  descriptor.value = async function (
    this: Processor<ProcessorStore<any, any>, IndexerStore>,
    ...args: unknown[]
  ) {
    const start = performance.now();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const result = await method.apply(this, args);
    this.timings[propertyKey] = performance.now() - start;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return result;
  };
}
